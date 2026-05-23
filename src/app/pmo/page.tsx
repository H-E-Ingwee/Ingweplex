'use client';

import { useEffect, useMemo, useState } from 'react';
import { CheckCircle2, ClipboardList, Clock3, Flag, ShieldCheck } from 'lucide-react';
import { Badge, Card } from '@/components/ui';
import { initialProjects } from '@/lib/mock-data';
import { formatKES, formatShortDate, getRelativeRisk, loadLocalData, saveLocalData } from '@/lib/utils';
import type { Project, ProjectTask } from '@/lib/mock-data';

const STORAGE_PROJECTS = 'ingweplex-projects';

const getStatusVariant = (status: Project['status']) => {
  switch (status) {
    case 'ACTIVE':
      return 'brand';
    case 'COMPLETED':
      return 'success';
    case 'ON_HOLD':
      return 'warning';
    case 'OVERDUE':
    case 'AT_RISK':
      return 'danger';
    default:
      return 'default';
  }
};

export default function PmoPage() {
  const [projects, setProjects] = useState<Project[]>(initialProjects);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [statusFilter, setStatusFilter] = useState<Project['status'] | 'ALL'>('ALL');

  useEffect(() => {
    const storedProjects = loadLocalData<Project[]>(STORAGE_PROJECTS, initialProjects);
    setProjects(storedProjects);
  }, []);

  useEffect(() => {
    saveLocalData(STORAGE_PROJECTS, projects);
  }, [projects]);

  const filteredProjects = useMemo(
    () => projects.filter((project) => statusFilter === 'ALL' || project.status === statusFilter),
    [projects, statusFilter],
  );

  const selectedTasks = selectedProject?.tasks ?? [];

  const updateTask = (projectId: string, taskId: string, completed: boolean) => {
    setProjects((current) =>
      current.map((project) => {
        if (project.id !== projectId) {
          return project;
        }

        const updatedTasks = project.tasks.map((task) => (task.id === taskId ? { ...task, completed } : task));
        const completedCount = updatedTasks.filter((task) => task.completed).length;
        const progress = Math.round((completedCount / updatedTasks.length) * 100);
        const status: Project['status'] = progress === 100 ? 'COMPLETED' : project.status === 'OVERDUE' ? 'OVERDUE' : project.status;

        return { ...project, tasks: updatedTasks, progress, status };
      }),
    );
  };

  const projectsAtRisk = projects.filter((project) => project.status === 'OVERDUE' || (new Date(project.dueDate) < new Date() && project.progress < 100)).length;

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl space-y-6">
        <section className="rounded-3xl bg-white p-6 shadow-soft">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.32em] text-orange-600">Project Management Office</p>
              <h1 className="mt-3 text-3xl font-semibold text-slate-900">Active engagements and milestone tracking</h1>
              <p className="mt-2 text-slate-600">Keep delivery on track, identify at-risk work, and ensure SOP-driven onboarding.</p>
            </div>
            <div className="grid gap-3 sm:grid-cols-3">
              <div className="rounded-3xl bg-slate-50 px-5 py-4 text-sm text-slate-700">
                <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Active projects</p>
                <p className="mt-2 text-2xl font-semibold text-slate-900">{projects.length}</p>
              </div>
              <div className="rounded-3xl bg-slate-50 px-5 py-4 text-sm text-slate-700">
                <p className="text-xs uppercase tracking-[0.2em] text-slate-500">At risk</p>
                <p className="mt-2 text-2xl font-semibold text-rose-600">{projectsAtRisk}</p>
              </div>
              <div className="rounded-3xl bg-slate-50 px-5 py-4 text-sm text-slate-700">
                <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Average progress</p>
                <p className="mt-2 text-2xl font-semibold text-slate-900">{Math.round(projects.reduce((sum, project) => sum + project.progress, 0) / Math.max(projects.length, 1))}%</p>
              </div>
            </div>
          </div>
        </section>

        <section className="grid gap-6 xl:grid-cols-[1.5fr,0.9fr]">
          <Card className="overflow-hidden">
            <div className="border-b border-slate-200 bg-slate-50 px-6 py-5">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Project workspace</p>
                  <h2 className="mt-2 text-lg font-semibold text-slate-900">Delivery pipeline</h2>
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  <select
                    value={statusFilter}
                    onChange={(event) => setStatusFilter(event.target.value as Project['status'] | 'ALL')}
                    className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none"
                  >
                    <option value="ALL">All statuses</option>
                    <option value="ACTIVE">Active</option>
                    <option value="COMPLETED">Completed</option>
                    <option value="ON_HOLD">On hold</option>
                    <option value="OVERDUE">Overdue</option>
                    <option value="AT_RISK">At risk</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[900px] text-left text-sm text-slate-600">
                <thead className="bg-white text-xs uppercase tracking-[0.2em] text-slate-500">
                  <tr>
                    <th className="px-6 py-4">Project</th>
                    <th className="px-6 py-4">Client</th>
                    <th className="px-6 py-4">Status</th>
                    <th className="px-6 py-4">Progress</th>
                    <th className="px-6 py-4">Due date</th>
                    <th className="px-6 py-4">Lead</th>
                    <th className="px-6 py-4">Workspace</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredProjects.map((project, index) => {
                    const isRisk = project.status === 'OVERDUE' || project.status === 'AT_RISK';
                    return (
                      <tr key={project.id} className={`${index % 2 === 0 ? 'bg-white' : 'bg-warm'} border-b border-slate-200 ${isRisk ? 'ring-1 ring-rose-200' : ''}`}>
                        <td className="px-6 py-4 font-semibold text-slate-900">{project.name}</td>
                        <td className="px-6 py-4">{project.client}</td>
                        <td className="px-6 py-4"><Badge variant={getStatusVariant(project.status)}>{project.status.replaceAll('_', ' ')}</Badge></td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="h-2.5 w-full overflow-hidden rounded-full bg-slate-200">
                              <div className="h-2.5 rounded-full bg-orange-600" style={{ width: `${project.progress}%` }} />
                            </div>
                            <span className="text-xs font-semibold text-slate-500">{project.progress}%</span>
                          </div>
                        </td>
                        <td className={`px-6 py-4 font-medium ${isRisk ? 'text-rose-600' : 'text-slate-600'}`}>{formatShortDate(project.dueDate)}</td>
                        <td className="px-6 py-4">{project.owner}</td>
                        <td className="px-6 py-4">
                          <button
                            onClick={() => setSelectedProject(project)}
                            className="rounded-2xl bg-slate-100 px-4 py-2 text-xs font-semibold text-slate-700 transition hover:bg-slate-200"
                          >
                            View Workspace
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </Card>

          <aside className="space-y-6">
            <Card className="rounded-3xl p-6">
              <div className="flex items-center gap-3 text-slate-700">
                <ShieldCheck className="h-5 w-5 text-orange-600" />
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Risk overview</p>
                  <p className="mt-2 text-lg font-semibold text-slate-900">Projects at risk</p>
                </div>
              </div>
              <p className="mt-4 text-sm text-slate-600">The platform flags overdue deliverables automatically, so leadership can intervene before deadlines slip.</p>
            </Card>
            <Card className="rounded-3xl p-6">
              <div className="flex items-center gap-3 text-slate-700">
                <Flag className="h-5 w-5 text-orange-600" />
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-slate-500">SOP Activation</p>
                  <p className="mt-2 text-lg font-semibold text-slate-900">Automated onboarding checklist</p>
                </div>
              </div>
              <div className="mt-4 space-y-3 text-sm text-slate-600">
                <p>New projects are seeded with the Ingweplex onboarding workflow on deal close.</p>
                <p>Milestones are tracked and progress updates flow into the delivery dashboard.</p>
              </div>
            </Card>
          </aside>
        </section>

        {selectedProject && (
          <section className="rounded-3xl bg-white p-6 shadow-soft">
            <div className="flex flex-col gap-4 xl:flex-row xl:items-start xl:justify-between">
              <div>
                <p className="text-sm uppercase tracking-[0.24em] text-orange-600">Project workspace</p>
                <h2 className="mt-2 text-2xl font-semibold text-slate-900">{selectedProject.name}</h2>
                <p className="mt-2 text-slate-600">{selectedProject.client} · {selectedProject.owner}</p>
              </div>
              <button
                onClick={() => setSelectedProject(null)}
                className="rounded-2xl border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
              >
                Close workspace
              </button>
            </div>

            <div className="mt-6 grid gap-6 xl:grid-cols-[1.35fr,0.85fr]">
              <div className="space-y-6">
                <Card className="rounded-3xl bg-slate-50 p-6">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <p className="text-xs uppercase tracking-[0.24em] text-slate-500">Project progress</p>
                      <p className="mt-2 text-2xl font-semibold text-slate-900">{selectedProject.progress}%</p>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-slate-500">
                      <Clock3 className="h-4 w-4" />
                      <span>{getRelativeRisk(selectedProject.dueDate, selectedProject.progress)}</span>
                    </div>
                  </div>
                  <div className="mt-6 h-3 rounded-full bg-slate-200">
                    <div className="h-3 rounded-full bg-orange-600" style={{ width: `${selectedProject.progress}%` }} />
                  </div>
                </Card>

                <Card className="rounded-3xl bg-slate-50 p-6">
                  <p className="text-sm uppercase tracking-[0.24em] text-slate-500">Onboarding checklist</p>
                  <ul className="mt-4 space-y-3">
                    {selectedProject.onboarding.map((item) => (
                      <li key={item} className="flex items-start gap-3 rounded-3xl bg-white p-4 shadow-sm">
                        <span className="mt-1 inline-flex h-3.5 w-3.5 rounded-full bg-orange-600" />
                        <p className="text-sm text-slate-700">{item}</p>
                      </li>
                    ))}
                  </ul>
                </Card>

                <Card className="rounded-3xl bg-slate-50 p-6">
                  <div className="flex items-center gap-3 text-slate-700">
                    <ClipboardList className="h-5 w-5 text-orange-600" />
                    <p className="text-sm uppercase tracking-[0.24em] text-slate-500">Task list</p>
                  </div>
                  <div className="mt-4 space-y-3">
                    {selectedTasks.map((task) => (
                      <div key={task.id} className="flex flex-col gap-3 rounded-3xl bg-white p-4 shadow-sm sm:flex-row sm:items-center sm:justify-between">
                        <div>
                          <p className="font-semibold text-slate-900">{task.title}</p>
                          <p className="text-xs text-slate-500">Due {formatShortDate(task.dueDate)} · {task.owner}</p>
                        </div>
                        <button
                          onClick={() => updateTask(selectedProject.id, task.id, !task.completed)}
                          className={`rounded-2xl px-4 py-2 text-sm font-semibold transition ${task.completed ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'}`}
                        >
                          {task.completed ? 'Completed' : 'Mark complete'}
                        </button>
                      </div>
                    ))}
                  </div>
                </Card>
              </div>

              <aside className="space-y-6">
                <Card className="rounded-3xl bg-slate-50 p-6">
                  <div className="flex items-center gap-3 text-slate-700">
                    <CheckCircle2 className="h-5 w-5 text-orange-600" />
                    <div>
                      <p className="text-xs uppercase tracking-[0.24em] text-slate-500">Delivery health</p>
                      <p className="mt-2 text-lg font-semibold text-slate-900">{selectedProject.status.replaceAll('_', ' ')}</p>
                    </div>
                  </div>
                  <p className="mt-4 text-sm text-slate-600">Project status and timeline are connected with every task update.</p>
                </Card>
                <Card className="rounded-3xl bg-slate-50 p-6">
                  <div className="flex items-center gap-3 text-slate-700">
                    <Flag className="h-5 w-5 text-orange-600" />
                    <div>
                      <p className="text-xs uppercase tracking-[0.24em] text-slate-500">Next milestone</p>
                      <p className="mt-2 text-lg font-semibold text-slate-900">{selectedTasks.find((task) => !task.completed)?.title ?? 'All tasks complete'}</p>
                    </div>
                  </div>
                  <p className="mt-4 text-sm text-slate-600">Automated milestone tracking keeps leadership informed before deadlines slip.</p>
                </Card>
              </aside>
            </div>
          </section>
        )}
      </div>
    </main>
  );
}
