'use client';

import { Card } from '@/components/ui';
import { financeMetrics } from '@/lib/mock-data';

export default function FinancePage() {
  return (
    <main className="min-h-screen bg-slate-50 px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl space-y-6">
        <section className="rounded-3xl bg-white p-6 shadow-soft">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.32em] text-orange-600">Financial Hub</p>
              <h1 className="mt-3 text-3xl font-semibold text-slate-900">Revenue, collections and cash flow</h1>
              <p className="mt-2 text-slate-600">Monitor invoices, payments, and profitability from one executive view.</p>
            </div>
          </div>
        </section>

        <div className="grid gap-6 lg:grid-cols-4">
          {financeMetrics.map((metric) => (
            <Card key={metric.label} className="p-5">
              <p className="text-sm font-medium uppercase tracking-[0.24em] text-slate-500">{metric.label}</p>
              <h2 className="mt-4 text-3xl font-semibold text-slate-900">{metric.value}</h2>
              <p className="mt-3 text-xs text-slate-500">{metric.label === 'Pending Invoices' ? 'Payment status and follow-up' : 'Live insight across the business'}</p>
            </Card>
          ))}
        </div>

        <Card className="rounded-3xl p-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-xl font-semibold text-slate-900">Cash flow snapshot</h2>
              <p className="text-sm text-slate-500">Compare actual receipts to projected cash position.</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-slate-500">Current cash forecast</p>
              <p className="text-2xl font-semibold text-slate-900">KES 2.3M</p>
            </div>
          </div>
          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            <div className="rounded-3xl bg-slate-100 p-5">
              <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Forecast gap</p>
              <p className="mt-3 text-xl font-semibold text-orange-600">KES 230K</p>
            </div>
            <div className="rounded-3xl bg-slate-100 p-5">
              <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Unpaid invoices</p>
              <p className="mt-3 text-xl font-semibold text-slate-900">KES 640K</p>
            </div>
            <div className="rounded-3xl bg-slate-100 p-5">
              <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Collection rate</p>
              <p className="mt-3 text-xl font-semibold text-slate-900">96.4%</p>
            </div>
          </div>
        </Card>
      </div>
    </main>
  );
}
