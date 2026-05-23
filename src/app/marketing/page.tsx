'use client';

import { Card } from '@/components/ui';
import { marketingMetrics } from '@/lib/mock-data';

export default function MarketingPage() {
  return (
    <main className="min-h-screen bg-slate-50 px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl space-y-6">
        <section className="rounded-3xl bg-white p-6 shadow-soft">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.32em] text-orange-600">Marketing Analytics</p>
              <h1 className="mt-3 text-3xl font-semibold text-slate-900">Performance insights and content signal</h1>
              <p className="mt-2 text-slate-600">Capture engagement trends and identify the highest-performing content themes.</p>
            </div>
          </div>
        </section>

        <div className="grid gap-6 lg:grid-cols-4">
          {marketingMetrics.map((metric) => (
            <Card key={metric.label} className="p-5">
              <p className="text-sm font-medium uppercase tracking-[0.24em] text-slate-500">{metric.label}</p>
              <h2 className="mt-4 text-3xl font-semibold text-slate-900">{metric.value}</h2>
              <p className="mt-3 text-xs text-slate-500">{metric.delta}</p>
            </Card>
          ))}
        </div>

        <Card className="rounded-3xl p-6">
          <h2 className="text-xl font-semibold text-slate-900">Content leaderboard snapshot</h2>
          <p className="mt-2 text-sm text-slate-500">A future integration will automatically rank posts, campaigns, and conversion signals.</p>
          <div className="mt-6 space-y-3">
            <div className="flex items-center justify-between rounded-3xl border border-slate-200 bg-slate-50 p-4">
              <div>
                <p className="text-sm font-semibold text-slate-900">Top performing channel</p>
                <p className="text-xs text-slate-500">LinkedIn — highest discovery call conversion</p>
              </div>
              <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-800">Strong</span>
            </div>
            <div className="flex items-center justify-between rounded-3xl border border-slate-200 bg-slate-50 p-4">
              <div>
                <p className="text-sm font-semibold text-slate-900">Weakest performing theme</p>
                <p className="text-xs text-slate-500">Generic brand posts — lower engagement rate</p>
              </div>
              <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold text-amber-800">Improve</span>
            </div>
          </div>
        </Card>
      </div>
    </main>
  );
}
