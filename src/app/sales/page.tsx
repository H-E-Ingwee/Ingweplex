import Link from 'next/link';

export default function SalesPage() {
  return (
    <main className="min-h-screen bg-slate-50 px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl rounded-3xl bg-white p-8 shadow-soft">
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-sky-600">Sales</p>
            <h1 className="mt-3 text-3xl font-semibold text-slate-900">Order, invoice and revenue tracking</h1>
            <p className="mt-2 text-slate-600">Manage product and service sales, create invoices, record payments, and review pipeline performance.</p>
          </div>
          <Link href="/" className="rounded-full bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800">Back to dashboard</Link>
        </div>
        <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6">
          <p className="text-slate-500">This page is a placeholder for orders, invoices, revenue charts, payment history and sales workflows. Connect it with your business data source and automation rules.</p>
        </div>
      </div>
    </main>
  );
}
