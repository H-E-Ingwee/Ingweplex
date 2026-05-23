'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Bell, LayoutDashboard } from 'lucide-react';
import { navigation } from '@/lib/navigation';

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen lg:flex">
      <aside className="hidden lg:flex h-screen w-80 flex-col border-r border-slate-200 bg-navy px-6 py-8 text-white">
        <div className="mb-10">
          <div className="flex items-center gap-3 rounded-3xl bg-white/5 px-4 py-3">
            <LayoutDashboard className="h-5 w-5 text-orange-300" />
            <div>
              <p className="text-xs uppercase tracking-[0.35em] text-orange-300">Ingweplex</p>
              <p className="text-sm font-semibold">Business Hub</p>
            </div>
          </div>
        </div>
        <div className="space-y-2">
          {navigation.map((item) => {
            const active = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href));
            return (
              <Link
                key={item.title}
                href={item.href}
                className={`flex items-center gap-3 rounded-3xl px-4 py-3 text-sm transition ${
                  active ? 'bg-orange-500 text-white shadow-soft' : 'text-slate-200 hover:bg-white/10'
                }`}
              >
                <item.icon className="h-5 w-5" />
                <div>
                  <p className="font-semibold">{item.title}</p>
                  <p className="text-xs text-slate-300">{item.description}</p>
                </div>
              </Link>
            );
          })}
        </div>
        <div className="mt-auto rounded-3xl bg-white/5 p-4 text-sm text-slate-300">
          <p className="font-semibold text-orange-300">Live workflow</p>
          <p className="mt-2 text-[13px] leading-5">From pipeline to billing, every step is connected in a single system.</p>
        </div>
      </aside>
      <div className="flex-1">
        <header className="sticky top-0 z-20 border-b border-slate-200 bg-white/90 px-4 py-4 backdrop-blur sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-xs uppercase tracking-[0.35em] text-slate-500">IBMS</p>
              <h1 className="mt-2 text-xl font-semibold text-slate-900">Integrated business management for Ingweplex</h1>
            </div>
            <div className="flex items-center gap-3">
              <button className="inline-flex items-center gap-2 rounded-2xl bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-200">
                <Bell className="h-4 w-4" /> Notifications
              </button>
            </div>
          </div>
        </header>
        <main>{children}</main>
      </div>
    </div>
  );
}
