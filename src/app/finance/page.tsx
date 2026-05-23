'use client';

import { useEffect, useMemo, useState } from 'react';
import { CheckCircle2, DollarSign, Folder, TrendingUp } from 'lucide-react';
import { Card, Badge } from '@/components/ui';
import { initialInvoices, initialProjects } from '@/lib/mock-data';
import { formatDateLabel, formatKES, loadLocalData, saveLocalData } from '@/lib/utils';
import type { Invoice, Project } from '@/lib/mock-data';

const STORAGE_INVOICES = 'ingweplex-invoices';
const STORAGE_PROJECTS = 'ingweplex-projects';

const nextInvoiceId = (invoiceCount: number) => `ING-2026-${String(invoiceCount + 1).padStart(3, '0')}`;

export default function FinancePage() {
  const [projects, setProjects] = useState<Project[]>(initialProjects);
  const [invoices, setInvoices] = useState<Invoice[]>(initialInvoices);
  const [selectedProjectId, setSelectedProjectId] = useState<string>(initialProjects[0]?.id ?? '');
  const [invoiceAmount, setInvoiceAmount] = useState(0);
  const [invoiceDueDate, setInvoiceDueDate] = useState('2026-06-30');
  const [invoiceMilestone, setInvoiceMilestone] = useState('Phase 1 Delivery');

  useEffect(() => {
    const storedInvoices = loadLocalData<Invoice[]>(STORAGE_INVOICES, initialInvoices);
    const storedProjects = loadLocalData<Project[]>(STORAGE_PROJECTS, initialProjects);
    setInvoices(storedInvoices);
    setProjects(storedProjects);
    if (storedProjects.length) {
      setSelectedProjectId(storedProjects[0].id);
    }
  }, []);

  useEffect(() => {
    saveLocalData(STORAGE_INVOICES, invoices);
  }, [invoices]);

  const invoiceMetrics = useMemo(() => {
    const paidTotal = invoices.filter((invoice) => invoice.status === 'PAID').reduce((sum, invoice) => sum + invoice.amount, 0);
    const pendingTotal = invoices.filter((invoice) => invoice.status === 'PENDING').reduce((sum, invoice) => sum + invoice.amount, 0);
    const partialTotal = invoices.filter((invoice) => invoice.status === 'PARTIAL').reduce((sum, invoice) => sum + invoice.amount * 0.5, 0);
    const collectionRate = invoices.length ? (invoices.filter((invoice) => invoice.status === 'PAID').length / invoices.length) * 100 : 0;
    const cashOnHand = paidTotal + partialTotal;
    return { paidTotal, pendingTotal, partialTotal, collectionRate, cashOnHand };
  }, [invoices]);

  const handleStatusUpdate = (invoiceId: string, status: Invoice['status']) => {
    setInvoices((current) => current.map((invoice) => (invoice.id === invoiceId ? { ...invoice, status } : invoice)));
  };

  const generateInvoice = () => {
    const project = projects.find((item) => item.id === selectedProjectId);
    if (!project) {
      return;
    }

    const id = nextInvoiceId(invoices.length);
    const newInvoice: Invoice = {
      id,
      client: project.client,
      project: project.name,
      amount: invoiceAmount || 78000,
      status: 'PENDING',
      dueDate: invoiceDueDate,
      milestone: invoiceMilestone,
    };

    setInvoices((current) => [newInvoice, ...current]);
    setInvoiceAmount(0);
    setInvoiceMilestone('Phase 1 Delivery');
  };

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl space-y-6">
        <section className="rounded-3xl bg-white p-6 shadow-soft">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.32em] text-orange-600">Financial Hub</p>
              <h1 className="mt-3 text-3xl font-semibold text-slate-900">Revenue, collections and cash flow</h1>
              <p className="mt-2 text-slate-600">Stay on top of the invoice lifecycle, cash forecast, and collection health.</p>
            </div>
          </div>
        </section>

        <div className="grid gap-6 lg:grid-cols-4">
          <Card className="rounded-3xl p-5">
            <div className="flex items-center gap-3 text-slate-700">
              <DollarSign className="h-5 w-5 text-orange-600" />
              <p className="text-xs uppercase tracking-[0.24em] text-slate-500">Collected revenue</p>
            </div>
            <p className="mt-4 text-3xl font-semibold text-slate-900">{formatKES(invoiceMetrics.paidTotal)}</p>
            <p className="mt-2 text-sm text-slate-500">Paid invoices to date.</p>
          </Card>
          <Card className="rounded-3xl p-5">
            <div className="flex items-center gap-3 text-slate-700">
              <TrendingUp className="h-5 w-5 text-orange-600" />
              <p className="text-xs uppercase tracking-[0.24em] text-slate-500">Cash on hand</p>
            </div>
            <p className="mt-4 text-3xl font-semibold text-slate-900">{formatKES(invoiceMetrics.cashOnHand)}</p>
            <p className="mt-2 text-sm text-slate-500">Actual cash position based on payments and partial receipts.</p>
          </Card>
          <Card className="rounded-3xl p-5">
            <div className="flex items-center gap-3 text-slate-700">
              <CheckCircle2 className="h-5 w-5 text-orange-600" />
              <p className="text-xs uppercase tracking-[0.24em] text-slate-500">Collection rate</p>
            </div>
            <p className="mt-4 text-3xl font-semibold text-slate-900">{Math.round(invoiceMetrics.collectionRate)}%</p>
            <p className="mt-2 text-sm text-slate-500">Target ≥ 95% collection performance.</p>
          </Card>
          <Card className="rounded-3xl p-5">
            <div className="flex items-center gap-3 text-slate-700">
              <Folder className="h-5 w-5 text-orange-600" />
              <p className="text-xs uppercase tracking-[0.24em] text-slate-500">Outstanding</p>
            </div>
            <p className="mt-4 text-3xl font-semibold text-slate-900">{formatKES(invoiceMetrics.pendingTotal)}</p>
            <p className="mt-2 text-sm text-slate-500">Pending invoices waiting for payment.</p>
          </Card>
        </div>

        <section className="grid gap-6 xl:grid-cols-[1.2fr,0.8fr]">
          <Card className="rounded-3xl p-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="text-xl font-semibold text-slate-900">Invoice ledger</h2>
                <p className="mt-2 text-sm text-slate-500">Track status updates and payments as they happen.</p>
              </div>
            </div>

            <div className="mt-6 overflow-x-auto">
              <table className="w-full min-w-[860px] text-left text-sm text-slate-600">
                <thead className="bg-slate-50 text-xs uppercase tracking-[0.2em] text-slate-500">
                  <tr>
                    <th className="px-6 py-4">Invoice ID</th>
                    <th className="px-6 py-4">Project</th>
                    <th className="px-6 py-4">Client</th>
                    <th className="px-6 py-4">Amount</th>
                    <th className="px-6 py-4">Due date</th>
                    <th className="px-6 py-4">Status</th>
                    <th className="px-6 py-4"></th>
                  </tr>
                </thead>
                <tbody>
                  {invoices.map((invoice, index) => (
                    <tr key={invoice.id} className={`${index % 2 === 0 ? 'bg-white' : 'bg-warm'} border-b border-slate-200`}>
                      <td className="px-6 py-4 font-medium text-slate-900">{invoice.id}</td>
                      <td className="px-6 py-4">{invoice.project}</td>
                      <td className="px-6 py-4">{invoice.client}</td>
                      <td className="px-6 py-4 font-semibold text-slate-900">{formatKES(invoice.amount)}</td>
                      <td className="px-6 py-4">{formatDateLabel(invoice.dueDate)}</td>
                      <td className="px-6 py-4">
                        <Badge variant={invoice.status === 'PAID' ? 'success' : invoice.status === 'PARTIAL' ? 'warning' : 'default'}>{invoice.status}</Badge>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex flex-wrap gap-2">
                          <button
                            onClick={() => handleStatusUpdate(invoice.id, 'PAID')}
                            className="rounded-2xl bg-slate-100 px-3 py-2 text-xs font-semibold text-slate-700 transition hover:bg-slate-200"
                          >
                            Mark Paid
                          </button>
                          <button
                            onClick={() => handleStatusUpdate(invoice.id, 'PARTIAL')}
                            className="rounded-2xl bg-slate-100 px-3 py-2 text-xs font-semibold text-slate-700 transition hover:bg-slate-200"
                          >
                            Mark Partial
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>

          <aside className="space-y-6">
            <Card className="rounded-3xl p-6">
              <div className="flex items-center gap-3 text-slate-700">
                <DollarSign className="h-5 w-5 text-orange-600" />
                <p className="text-sm uppercase tracking-[0.24em] text-slate-500">Generate invoice</p>
              </div>
              <div className="mt-5 space-y-4">
                <label className="block text-sm text-slate-700">
                  Project
                  <select
                    value={selectedProjectId}
                    onChange={(event) => setSelectedProjectId(event.target.value)}
                    className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none"
                  >
                    {projects.map((project) => (
                      <option key={project.id} value={project.id}>
                        {project.name}
                      </option>
                    ))}
                  </select>
                </label>
                <label className="block text-sm text-slate-700">
                  Milestone
                  <input
                    value={invoiceMilestone}
                    onChange={(event) => setInvoiceMilestone(event.target.value)}
                    className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none"
                  />
                </label>
                <label className="block text-sm text-slate-700">
                  Amount (KES)
                  <input
                    type="number"
                    value={invoiceAmount}
                    onChange={(event) => setInvoiceAmount(Number(event.target.value))}
                    className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none"
                  />
                </label>
                <label className="block text-sm text-slate-700">
                  Due date
                  <input
                    type="date"
                    value={invoiceDueDate}
                    onChange={(event) => setInvoiceDueDate(event.target.value)}
                    className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none"
                  />
                </label>
                <button
                  onClick={generateInvoice}
                  className="w-full rounded-2xl bg-orange-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-orange-700"
                >
                  Create invoice
                </button>
              </div>
            </Card>

            <Card className="rounded-3xl p-6">
              <p className="text-sm uppercase tracking-[0.24em] text-slate-500">Break-even watch</p>
              <div className="mt-5 space-y-4 text-sm text-slate-600">
                <p>Fixed costs: KES 464,000</p>
                <p>Variable costs: KES 190,000</p>
                <p>Revenue coverage: {invoiceMetrics.paidTotal > 654000 ? 'Above break-even' : 'Below break-even'}</p>
              </div>
            </Card>
          </aside>
        </section>
      </div>
    </main>
  );
}
