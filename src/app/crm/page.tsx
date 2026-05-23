'use client';

import { Bell, Search } from 'lucide-react';
import { Card, Badge } from '@/components/ui';
import { initialLeads, leadStages } from '@/lib/mock-data';
import { formatKES, formatStageLabel, formatShortDate } from '@/lib/utils';

export default function CrmPage() {
  return (
    <main className="min-h-screen bg-slate-50 px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl space-y-6">
        <section className="rounded-3xl bg-white p-6 shadow-soft">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.32em] text-orange-600">CRM Pipeline</p>
              <h1 className="mt-3 text-3xl font-semibold text-slate-900">Sales pipeline and lead management</h1>
              <p className="mt-2 text-slate-600">Track your opportunity flow, weighted deal value, and expected close dates.</p>
            </div>
            <div className="flex items-center gap-3">
              <button className="rounded-2xl bg-orange-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-orange-700">+ New Lead</button>
              <div className="relative rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
                <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                <input className="w-full bg-transparent pl-10 text-sm text-slate-700 outline-none" placeholder="Search leads" />
              </div>
            </div>
          </div>
        </section>

        <section className="overflow-x-auto rounded-3xl bg-white p-4 shadow-soft">
          <div className="flex gap-4 pb-4">
            {leadStages.map((stage) => {
              const stageLeads = initialLeads.filter((lead) => lead.stage === stage);
              const totalValue = stageLeads.reduce((sum, lead) => sum + lead.value, 0);

              return (
                <div key={stage} className="min-w-[300px] rounded-3xl bg-slate-100 p-4">
                  <div className="mb-3 flex items-center justify-between gap-3">
                    <h2 className="text-sm font-semibold uppercase tracking-[0.25em] text-slate-700">{formatStageLabel(stage)}</h2>
                    <Badge variant="brand">{stageLeads.length}</Badge>
                  </div>
                  <p className="text-xs text-slate-500 mb-4">{formatKES(totalValue)} pipeline</p>
                  <div className="space-y-3 max-h-[460px] overflow-y-auto pr-1 kanban-scroll">
                    {stageLeads.map((lead) => (
                      <Card key={lead.id} className="p-4 hover:border-orange-500 transition-colors">
                        <div className="mb-3 flex items-start justify-between gap-3">
                          <Badge variant={lead.package === 'ENTERPRISE' ? 'brand' : 'default'}>{lead.package}</Badge>
                          <span className="text-xs font-semibold text-slate-500">{Math.round(lead.prob * 100)}%</span>
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
        </section>
      </div>
    </main>
  );
}
