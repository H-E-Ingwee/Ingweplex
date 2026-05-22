import Link from 'next/link';

export default function ReportsPage() {
  return (
    <main className="min-h-screen bg-slate-50 px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl rounded-3xl bg-white p-8 shadow-soft">
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-sky-600">Reports</p>
            <h1 className="mt-3 text-3xl font-semibold text-slate-900">Business intelligence and performance snapshots</h1>
            <p className="mt-2 text-slate-600">Generate financial summaries, sales trends, customer metrics, and operational KPIs in one centralized report view.</p>
          </div>
          <Link href="/" className="rounded-full bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800">Back to dashboard</Link>
        </div>
        <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6">
          <p className="text-slate-500">This page is a placeholder for charts, tables, export options, and executive summaries. Integrate it with your analytics backend for real-time visibility.</p>
        </div>
      </div>
    </main>
  );
}
