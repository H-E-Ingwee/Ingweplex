import Link from 'next/link';
import { Activity, Briefcase, FileText, Settings, Users } from 'lucide-react';
import { stats, navigation } from '@/lib/navigation';

export default function HomePage() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-white p-8 shadow-soft">
          <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-sky-600">Ingweplex Business System</p>
              <h1 className="mt-3 text-3xl font-semibold sm:text-4xl">A modern platform to manage your business operations.</h1>
              <p className="mt-4 max-w-2xl text-slate-600">Track sales, customers, finance, projects, inventory and reports in one unified dashboard built for fast decision-making and growth.</p>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              <Link href="/customers" className="rounded-2xl border border-slate-200 bg-slate-50 px-5 py-3 text-center font-medium text-slate-900 transition hover:bg-slate-100">Customers</Link>
              <Link href="/sales" className="rounded-2xl border border-slate-200 bg-slate-50 px-5 py-3 text-center font-medium text-slate-900 transition hover:bg-slate-100">Sales</Link>
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {stats.map((item) => (
              <article key={item.label} className="rounded-3xl border border-slate-200 bg-slate-50 p-6">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-sky-100 text-sky-700">
                  <item.icon className="h-6 w-6" />
                </div>
                <p className="text-sm text-slate-500">{item.label}</p>
                <p className="mt-3 text-3xl font-semibold text-slate-900">{item.value}</p>
              </article>
            ))}
          </div>

          <section className="mt-10 grid gap-6 lg:grid-cols-3">
            {navigation.map((item) => (
              <Link key={item.title} href={item.href} className="group rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-100 text-sky-600">
                  <item.icon className="h-6 w-6" />
                </div>
                <h2 className="text-xl font-semibold text-slate-900">{item.title}</h2>
                <p className="mt-2 text-slate-500">{item.description}</p>
              </Link>
            ))}
          </section>
        </div>
      </div>
    </main>
  );
}
