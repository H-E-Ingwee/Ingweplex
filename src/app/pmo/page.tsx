'use client';

import { Badge, Card } from '@/components/ui';
import { initialProjects } from '@/lib/mock-data';

const getStatusVariant = (status: string) => {
  switch (status) {
    case 'ACTIVE': return 'brand';
    case 'COMPLETED': return 'success';
    case 'ON_HOLD': return 'warning';
    case 'OVERDUE': return 'danger';
    default: return 'default';
  }
};

export default function PmoPage() {
  return (
    <main className="min-h-screen bg-slate-50 px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl space-y-6">
        <section className="rounded-3xl bg-white p-6 shadow-soft">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.32em] text-orange-600">Project Management Office</p>
              <h1 className="mt-3 text-3xl font-semibold text-slate-900">Active engagements and milestone tracking</h1>
              <p className="mt-2 text-slate-600">See project status, due dates, and team ownership in one dynamic table.</p>
            </div>
          </div>
        </section>

        <Card className="overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[900px] text-left text-sm text-slate-600">
              <thead className="bg-slate-50 text-xs uppercase tracking-[0.2em] text-slate-500">
                <tr>
                  <th className="px-6 py-4">Project</th>
                  <th className="px-6 py-4">Client</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4">Progress</th>
                  <th className="px-6 py-4">Due Date</th>
                  <th className="px-6 py-4">Lead</th>
                  <th className="px-6 py-4"></th>
                </tr>
              </thead>
              <tbody>
                {initialProjects.map((project, index) => (
                  <tr key={project.id} className={`${index % 2 === 0 ? 'bg-white' : 'bg-warm'} border-b border-slate-200`}>
                    <td className="px-6 py-4 font-medium text-slate-900">{project.name}</td>
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
                    <td className={`px-6 py-4 font-medium ${project.status === 'OVERDUE' ? 'text-rose-600' : 'text-slate-600'}`}>{project.dueDate}</td>
                    <td className="px-6 py-4">{project.owner}</td>
                    <td className="px-6 py-4 text-right">
                      <button className="text-xs font-semibold text-orange-600 hover:underline">View Workspace</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </main>
  );
}
