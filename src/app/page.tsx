'use client';

import Link from 'next/link';
import { Search } from 'lucide-react';
import { Card, Badge } from '@/components/ui';
import { dashboardStats } from '@/lib/mock-data';
import { navigation } from '@/lib/navigation';

export default function HomePage() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <section className="mb-8 rounded-[32px] bg-navy p-8 text-white shadow-soft">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-2xl">
              <p className="text-sm uppercase tracking-[0.38em] text-orange-300">Ingweplex Business Management System</p>
              <h1 className="mt-4 text-4xl font-semibold sm:text-5xl">A unified platform for CRM, Projects, Finance, and Marketing.</h1>
              <p className="mt-4 text-slate-200">Move beyond spreadsheets with a branded business dashboard that centralizes deals, projects, cash flow and campaign performance.</p>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              <Link href="/crm" className="rounded-2xl bg-orange-500 px-6 py-3 text-sm font-semibold text-white transition hover:bg-orange-600">Open CRM</Link>
              <Link href="/pmo" className="rounded-2xl border border-white/20 bg-white/10 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/20">Open PMO</Link>
            </div>
          </div>
        </section>

        <section className="grid gap-6 xl:grid-cols-[1fr,320px]">
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-2">
            {dashboardStats.map((metric) => (
              <Card key={metric.label} className="p-6">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-xs uppercase tracking-[0.24em] text-slate-500">{metric.label}</p>
                    <p className="mt-3 text-3xl font-semibold text-slate-900">{metric.value}</p>
                  </div>
                  <Badge variant={metric.label.includes('Rate') ? 'success' : 'brand'}>{metric.trend}</Badge>
                </div>
                <p className="mt-4 text-sm text-slate-500">{metric.trendLabel}</p>
              </Card>
            ))}
          </div>

          <Card className="p-6">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-xs uppercase tracking-[0.24em] text-slate-500">Revenue vs target</p>
                <h2 className="mt-3 text-2xl font-semibold text-slate-900">Quarterly growth check</h2>
              </div>
              <div className="rounded-2xl bg-slate-100 px-3 py-2 text-xs font-semibold text-slate-700">Live mock data</div>
            </div>
            <div className="mt-8 flex items-end gap-4 h-40">
              <div className="relative w-14 rounded-t-3xl bg-slate-200" style={{ height: '40%' }}>
                <span className="absolute -top-6 left-1/2 -translate-x-1/2 text-xs text-slate-500">Q1</span>
              </div>
              <div className="relative w-14 rounded-t-3xl bg-slate-200" style={{ height: '60%' }}>
                <span className="absolute -top-6 left-1/2 -translate-x-1/2 text-xs text-slate-500">Q2</span>
              </div>
              <div className="relative w-14 rounded-t-3xl bg-orange-500 shadow-lg" style={{ height: '85%' }}>
                <span className="absolute -top-6 left-1/2 -translate-x-1/2 text-xs font-bold text-orange-600">Q3</span>
              </div>
              <div className="relative w-14 rounded-t-3xl border border-dashed border-slate-300" style={{ height: '95%' }}>
                <span className="absolute -top-6 left-1/2 -translate-x-1/2 text-xs text-slate-500">Q4</span>
              </div>
            </div>
          </Card>
        </section>

        <section className="grid gap-6 lg:grid-cols-3">
          {navigation.slice(1).map((item) => (
            <Link key={item.title} href={item.href} className="group rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-100 text-orange-600">
                <item.icon className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold text-slate-900">{item.title}</h3>
              <p className="mt-3 text-sm text-slate-500">{item.description}</p>
            </Link>
          ))}
        </section>

        <section className="grid gap-6 lg:grid-cols-[1fr,320px]">
          <Card className="p-6">
            <h2 className="text-xl font-semibold text-slate-900">Recent activity</h2>
            <div className="mt-6 space-y-4">
              {[
                { label: 'Invoice paid', detail: 'ING-2026-004 (Acme Corp)', time: '1hr ago', tone: 'green' },
                { label: 'Deal won', detail: 'TechVentures Enterprise', time: '3hrs ago', tone: 'orange' },
                { label: 'Task overdue', detail: 'Global Importers Audit', time: '1 day ago', tone: 'red' },
              ].map((item) => (
                <div key={item.label} className="flex gap-3">
                  <span className={`mt-2 h-2.5 w-2.5 rounded-full ${item.tone === 'green' ? 'bg-emerald-500' : item.tone === 'orange' ? 'bg-orange-500' : 'bg-rose-500'}`} />
                  <div>
                    <p className="text-sm font-semibold text-slate-900">{item.label}</p>
                    <p className="text-xs text-slate-500">{item.detail} · {item.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          <Card className="rounded-3xl bg-warm p-6 text-center">
            <h2 className="text-lg font-semibold text-navy">Brand pulse</h2>
            <p className="mt-3 text-sm text-slate-600">A polished, executive-grade experience aligned with the Ingweplex brand.</p>
            <div className="mt-8 flex items-end justify-center gap-4">
              <div className="w-16 rounded-t-3xl bg-slate-200 h-20" />
              <div className="w-16 rounded-t-3xl bg-slate-200 h-28" />
              <div className="w-16 rounded-t-3xl bg-orange-500 h-34 shadow-lg" />
              <div className="w-16 rounded-t-3xl border border-dashed border-slate-300 h-38" />
            </div>
          </Card>
        </section>
      </div>
    </main>
  );
}
