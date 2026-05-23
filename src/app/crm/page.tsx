'use client';

import { useEffect, useMemo, useState } from 'react';
import { Bell, Plus, Search, ChevronRight } from 'lucide-react';
import { Card, Badge } from '@/components/ui';
import { initialLeads, leadStages, packageOptions, packageValues, initialProjects } from '@/lib/mock-data';
import { formatKES, formatShortDate, formatStageLabel, formatDateLabel, loadLocalData, saveLocalData } from '@/lib/utils';
import type { Lead, Project } from '@/lib/mock-data';

const STORAGE_LEADS = 'ingweplex-leads';
const STORAGE_PROJECTS = 'ingweplex-projects';

const emptyLead: Omit<Lead, 'id'> = {
  client: '',
  contact: '',
  package: 'STARTER',
  value: packageValues.STARTER,
  stage: 'NEW_LEAD',
  prob: 0.2,
  expectedClose: '2026-06-30',
  source: 'LinkedIn',
  notes: '',
  history: [],
};

export default function CrmPage() {
  const [leads, setLeads] = useState<Lead[]>(initialLeads);
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [draft, setDraft] = useState<Omit<Lead, 'id'>>(emptyLead);

  useEffect(() => {
    const storedLeads = loadLocalData<Lead[]>(STORAGE_LEADS, initialLeads);
    setLeads(storedLeads);
  }, []);

  useEffect(() => {
    saveLocalData(STORAGE_LEADS, leads);
  }, [leads]);

  const totals = useMemo(() => {
    const totalPipeline = leads.reduce((sum, lead) => sum + lead.value, 0);
    const expectedRevenue = leads.reduce((sum, lead) => sum + lead.value * lead.prob, 0);
    const activeLeads = leads.filter((lead) => lead.stage !== 'WON' && lead.stage !== 'LOST').length;
    return { totalPipeline, expectedRevenue, activeLeads };
  }, [leads]);

  const addLead = () => {
    setLeads((current) => [
      {
        id: `L${current.length + 1}`,
        ...draft,
        history: [`${formatDateLabel(new Date().toISOString())}: Lead added to CRM`],
      },
      ...current,
    ]);
    setDraft(emptyLead);
    setShowForm(false);
  };

  const updateLead = (id: string, changes: Partial<Lead>) => {
    setLeads((current) => current.map((lead) => (lead.id === id ? { ...lead, ...changes } : lead)));
    if (selectedLead?.id === id) {
      setSelectedLead({ ...selectedLead, ...changes });
    }
  };

  const createProjectIfWon = (lead: Lead) => {
    const storedProjects = loadLocalData<Project[]>(STORAGE_PROJECTS, initialProjects);
    const existing = storedProjects.find((project) => project.client === lead.client);
    if (existing) {
      return;
    }

    const newProject: Project = {
      id: `P${storedProjects.length + 1}`,
      name: `${lead.client} onboarding and delivery`,
      client: lead.client,
      status: 'ACTIVE',
      progress: 0,
      dueDate: lead.expectedClose,
      owner: 'Lead Consultant A',
      onboarding: ['Send Onboarding Pack (Day 1)', 'Confirm Deposit', 'Set up Client Folder referencing SOP-010', 'Schedule 90-minute Kick-off Call'],
      tasks: [
        { id: `P${storedProjects.length + 1}-T1`, title: 'Send Onboarding Pack', dueDate: lead.expectedClose, owner: 'Lead Consultant A', completed: false },
        { id: `P${storedProjects.length + 1}-T2`, title: 'Confirm Deposit', dueDate: lead.expectedClose, owner: 'Lead Consultant A', completed: false },
        { id: `P${storedProjects.length + 1}-T3`, title: 'Set up Client Folder', dueDate: lead.expectedClose, owner: 'Lead Consultant A', completed: false },
        { id: `P${storedProjects.length + 1}-T4`, title: 'Schedule Kick-off Call', dueDate: lead.expectedClose, owner: 'Lead Consultant A', completed: false },
      ],
    };

    saveLocalData(STORAGE_PROJECTS, [newProject, ...storedProjects]);
  };

  const handleStageChange = (lead: Lead, nextStage: Lead['stage']) => {
    updateLead(lead.id, { stage: nextStage });
    if (nextStage === 'WON') {
      createProjectIfWon(lead);
    }
  };

  const visibleLeads = useMemo(
    () => leadStages.map((stage) => leads.filter((lead) => lead.stage === stage)),
    [leads],
  );

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl space-y-6">
        <section className="rounded-3xl bg-white p-6 shadow-soft">
          <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.32em] text-orange-600">CRM Pipeline</p>
              <h1 className="mt-3 text-3xl font-semibold text-slate-900">Sales pipeline and lead management</h1>
              <p className="mt-2 text-slate-600">Track every opportunity from first contact through deal close and project handover.</p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <button
                onClick={() => setShowForm((current) => !current)}
                className="inline-flex items-center justify-center gap-2 rounded-2xl bg-orange-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-orange-700"
              >
                <Plus className="h-4 w-4" />
                New Lead
              </button>
              <div className="relative rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
                <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                <input
                  className="w-full bg-transparent pl-10 text-sm text-slate-700 outline-none"
                  placeholder="Search leads"
                  onChange={() => undefined}
                />
              </div>
            </div>
          </div>

          {showForm && (
            <div className="mt-6 rounded-3xl border border-slate-200 bg-slate-50 p-6">
              <div className="grid gap-4 lg:grid-cols-3">
                <label className="space-y-2 text-sm text-slate-700">
                  Client name
                  <input
                    value={draft.client}
                    onChange={(event) => setDraft((prev) => ({ ...prev, client: event.target.value }))}
                    className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none"
                  />
                </label>
                <label className="space-y-2 text-sm text-slate-700">
                  Contact
                  <input
                    value={draft.contact}
                    onChange={(event) => setDraft((prev) => ({ ...prev, contact: event.target.value }))}
                    className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none"
                  />
                </label>
                <label className="space-y-2 text-sm text-slate-700">
                  Lead source
                  <input
                    value={draft.source}
                    onChange={(event) => setDraft((prev) => ({ ...prev, source: event.target.value }))}
                    className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none"
                  />
                </label>
              </div>
              <div className="mt-4 grid gap-4 lg:grid-cols-3">
                <label className="space-y-2 text-sm text-slate-700">
                  Package
                  <select
                    value={draft.package}
                    onChange={(event) => {
                      const selectedPackage = event.target.value as keyof typeof packageValues;
                      setDraft((prev) => ({ ...prev, package: selectedPackage, value: packageValues[selectedPackage] }));
                    }}
                    className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none"
                  >
                    {packageOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </label>
                <label className="space-y-2 text-sm text-slate-700">
                  Expected close
                  <input
                    type="date"
                    value={draft.expectedClose}
                    onChange={(event) => setDraft((prev) => ({ ...prev, expectedClose: event.target.value }))}
                    className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none"
                  />
                </label>
                <label className="space-y-2 text-sm text-slate-700">
                  Probability
                  <input
                    type="number"
                    min={0}
                    max={100}
                    value={draft.prob * 100}
                    onChange={(event) => setDraft((prev) => ({ ...prev, prob: Number(event.target.value) / 100 }))}
                    className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none"
                  />
                </label>
              </div>
              <div className="mt-4 grid gap-4 lg:grid-cols-2">
                <label className="space-y-2 text-sm text-slate-700">
                  Notes
                  <textarea
                    value={draft.notes}
                    onChange={(event) => setDraft((prev) => ({ ...prev, notes: event.target.value }))}
                    className="w-full rounded-3xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none"
                    rows={3}
                  />
                </label>
                <div className="rounded-3xl bg-white p-5 shadow-sm">
                  <p className="text-xs uppercase tracking-[0.24em] text-slate-500">Deal value</p>
                  <p className="mt-3 text-3xl font-semibold text-slate-900">{formatKES(draft.value)}</p>
                  <p className="mt-2 text-sm text-slate-500">Auto-populated based on the selected package.</p>
                </div>
              </div>
              <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-end">
                <button onClick={() => setShowForm(false)} className="rounded-2xl border border-slate-300 px-5 py-3 text-sm text-slate-700 transition hover:bg-slate-100">
                  Cancel
                </button>
                <button onClick={addLead} className="rounded-2xl bg-orange-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-orange-700">
                  Save lead
                </button>
              </div>
            </div>
          )}
        </section>

        <section className="grid gap-6 xl:grid-cols-[1.4fr,0.9fr]">
          <div className="overflow-x-auto rounded-3xl bg-white p-4 shadow-soft">
            <div className="flex flex-col gap-4 lg:flex-row lg:justify-between lg:items-center">
              <div>
                <p className="text-sm uppercase tracking-[0.24em] text-slate-500">Pipeline board</p>
                <h2 className="mt-2 text-xl font-semibold text-slate-900">Interactive Kanban-style lead flow</h2>
              </div>
              <div className="rounded-3xl bg-slate-100 px-4 py-3 text-sm text-slate-600">Weighted expected revenue: {formatKES(totals.expectedRevenue)}</div>
            </div>

            <div className="mt-6 flex min-w-full gap-4 overflow-x-auto pb-4">
              {leadStages.map((stage, stageIndex) => {
                const stageLeads = visibleLeads[stageIndex];
                const totalValue = stageLeads.reduce((sum, lead) => sum + lead.value, 0);

                return (
                  <div key={stage} className="min-w-[320px] rounded-3xl bg-slate-100 p-4">
                    <div className="mb-3 flex items-center justify-between gap-3">
                      <h3 className="text-sm font-semibold uppercase tracking-[0.25em] text-slate-700">{formatStageLabel(stage)}</h3>
                      <Badge variant="brand">{stageLeads.length}</Badge>
                    </div>
                    <p className="text-xs text-slate-500 mb-4">{formatKES(totalValue)} pipeline</p>
                    <div className="space-y-3 max-h-[620px] overflow-y-auto pr-1 kanban-scroll">
                      {stageLeads.map((lead) => (
                        <Card key={lead.id} className="group cursor-pointer p-4 transition hover:border-orange-500 hover:bg-white" onClick={() => setSelectedLead(lead)}>
                          <div className="mb-3 flex items-start justify-between gap-3">
                            <Badge variant={lead.package === 'ENTERPRISE' ? 'brand' : 'default'}>{lead.package}</Badge>
                            <span className="text-xs font-semibold text-slate-500">{Math.round(lead.prob * 100)}% close</span>
                          </div>
                          <h3 className="text-sm font-semibold text-slate-900">{lead.client}</h3>
                          <p className="mt-1 text-xs text-slate-500">{lead.contact}</p>
                          <div className="mt-4 flex items-center justify-between gap-2 border-t border-slate-200 pt-3 text-xs text-slate-500">
                            <span className="font-semibold text-slate-700">{formatKES(lead.value)}</span>
                            <span className="flex items-center gap-1 text-slate-500"><Bell className="h-3.5 w-3.5" />{formatShortDate(lead.expectedClose)}</span>
                          </div>
                        </Card>
                      ))}
                      {stageLeads.length === 0 && (
                        <div className="flex h-24 items-center justify-center rounded-3xl border-2 border-dashed border-slate-300 text-xs text-slate-400">
                          Empty stage
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <aside className="space-y-6">
            <Card className="rounded-3xl p-6">
              <p className="text-sm uppercase tracking-[0.24em] text-slate-500">Sales summary</p>
              <div className="mt-6 grid gap-4">
                <div className="rounded-3xl bg-slate-50 p-4">
                  <p className="text-xs uppercase tracking-[0.24em] text-slate-500">Total pipeline</p>
                  <p className="mt-3 text-3xl font-semibold text-slate-900">{formatKES(totals.totalPipeline)}</p>
                </div>
                <div className="rounded-3xl bg-slate-50 p-4">
                  <p className="text-xs uppercase tracking-[0.24em] text-slate-500">Active leads</p>
                  <p className="mt-3 text-3xl font-semibold text-slate-900">{totals.activeLeads}</p>
                </div>
              </div>
            </Card>

            <Card className="rounded-3xl p-6">
              <p className="text-sm uppercase tracking-[0.24em] text-slate-500">Fast insights</p>
              <div className="mt-4 space-y-3 text-sm text-slate-600">
                <p>Winning stage: Proposal Sent</p>
                <p>Average close probability: {Math.round((leads.reduce((sum, lead) => sum + lead.prob, 0) / Math.max(leads.length, 1)) * 100)}%</p>
                <p>CRM volume: {leads.length} opportunities across the funnel.</p>
              </div>
            </Card>
          </aside>
        </section>

        {selectedLead && (
          <aside className="rounded-3xl bg-white p-6 shadow-soft">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-sm uppercase tracking-[0.24em] text-orange-600">Lead details</p>
                <h2 className="mt-2 text-2xl font-semibold text-slate-900">{selectedLead.client}</h2>
              </div>
              <button
                onClick={() => setSelectedLead(null)}
                className="rounded-2xl border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
              >
                Close
              </button>
            </div>

            <div className="mt-6 grid gap-6 lg:grid-cols-2">
              <div className="space-y-4">
                <div className="rounded-3xl bg-slate-50 p-4">
                  <p className="text-xs uppercase tracking-[0.24em] text-slate-500">Package</p>
                  <p className="mt-3 text-lg font-semibold text-slate-900">{selectedLead.package}</p>
                  <p className="mt-2 text-sm text-slate-500">{formatKES(selectedLead.value)} base deal value</p>
                </div>
                <div className="rounded-3xl bg-slate-50 p-4">
                  <p className="text-xs uppercase tracking-[0.24em] text-slate-500">Expected revenue</p>
                  <p className="mt-3 text-3xl font-semibold text-slate-900">{formatKES(Math.round(selectedLead.value * selectedLead.prob))}</p>
                  <p className="mt-2 text-sm text-slate-500">Risk-adjusted based on historical close probability.</p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="rounded-3xl bg-slate-50 p-4">
                  <p className="text-xs uppercase tracking-[0.24em] text-slate-500">Contact</p>
                  <p className="mt-3 text-base font-semibold text-slate-900">{selectedLead.contact}</p>
                  <p className="mt-2 text-sm text-slate-500">{selectedLead.source}</p>
                </div>
                <div className="space-y-3 rounded-3xl bg-slate-50 p-4">
                  <label className="text-sm font-semibold text-slate-700">Stage</label>
                  <select
                    value={selectedLead.stage}
                    onChange={(event) => handleStageChange(selectedLead, event.target.value as Lead['stage'])}
                    className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none"
                  >
                    {leadStages.map((stage) => (
                      <option key={stage} value={stage}>
                        {formatStageLabel(stage)}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            <div className="mt-6 grid gap-6 lg:grid-cols-[1.25fr,0.85fr]">
              <div className="rounded-3xl bg-slate-50 p-6">
                <p className="text-sm uppercase tracking-[0.24em] text-slate-500">Lead history</p>
                <div className="mt-4 space-y-3 text-sm text-slate-600">
                  {selectedLead.history.map((event, index) => (
                    <div key={index} className="rounded-3xl bg-white p-4 shadow-sm">
                      <p className="font-medium text-slate-900">{event}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="rounded-3xl bg-slate-50 p-6">
                <p className="text-sm uppercase tracking-[0.24em] text-slate-500">Notes</p>
                <p className="mt-4 text-sm text-slate-600">{selectedLead.notes || 'No additional notes.'}</p>
                <button
                  onClick={() => setSelectedLead(null)}
                  className="mt-6 inline-flex items-center gap-2 rounded-2xl bg-orange-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-orange-700"
                >
                  <ChevronRight className="h-4 w-4 rotate-180" />
                  Return to board
                </button>
              </div>
            </div>
          </aside>
        )}
      </div>
    </main>
  );
}
