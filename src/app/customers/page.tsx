import Link from 'next/link';

export default function CustomersPage() {
  return (
    <main className="min-h-screen bg-slate-50 px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl rounded-3xl bg-white p-8 shadow-soft">
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-sky-600">Customers</p>
            <h1 className="mt-3 text-3xl font-semibold text-slate-900">Client management and relationship tracking</h1>
            <p className="mt-2 text-slate-600">Store contacts, segment accounts, and make every interaction measurable for your sales and service teams.</p>
          </div>
          <Link href="/" className="rounded-full bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800">Back to dashboard</Link>
        </div>
        <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6">
          <p className="text-slate-500">This page is a placeholder for customer lists, segmentation, customer profiles, activity feeds, and import/export tools. Connect this screen to a database to manage real customer records.</p>
        </div>
      </div>
    </main>
  );
}
