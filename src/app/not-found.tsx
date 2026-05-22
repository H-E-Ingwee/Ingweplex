import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="min-h-screen bg-slate-50 px-4 py-20 text-center sm:px-6 lg:px-8">
      <div className="mx-auto max-w-xl rounded-3xl bg-white p-10 shadow-soft">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-sky-600">404</p>
        <h1 className="mt-4 text-4xl font-semibold text-slate-900">Page not found</h1>
        <p className="mt-3 text-slate-500">The requested page doesn’t exist or has moved. Return to the business dashboard.</p>
        <Link href="/" className="mt-8 inline-flex rounded-full bg-sky-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-sky-700">
          Back to dashboard
        </Link>
      </div>
    </main>
  );
}
