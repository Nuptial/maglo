type InvoiceStatus = "pending" | "paid" | "overdue";

type Invoice = {
  id: string;
  client: string;
  amount: string;
  dueDate: string;
  status: InvoiceStatus;
};

type SummaryTone = "emerald" | "amber" | "slate";

const invoices: Invoice[] = [
  {
    id: "INV-1042",
    client: "Brightline Media",
    amount: "$12,400",
    dueDate: "Jan 12, 2025",
    status: "pending",
  },
  {
    id: "INV-1041",
    client: "Northwind Labs",
    amount: "$8,950",
    dueDate: "Jan 04, 2025",
    status: "overdue",
  },
  {
    id: "INV-1039",
    client: "Hummingbird Studio",
    amount: "$4,100",
    dueDate: "Dec 28, 2024",
    status: "paid",
  },
  {
    id: "INV-1036",
    client: "Copperline Ventures",
    amount: "$17,850",
    dueDate: "Dec 22, 2024",
    status: "pending",
  },
  {
    id: "INV-1032",
    client: "Moonbase Research",
    amount: "$6,120",
    dueDate: "Dec 14, 2024",
    status: "paid",
  },
];

const summaryCards: Array<{
  id: string;
  label: string;
  value: string;
  helper: string;
  tone: SummaryTone;
}> = [
  {
    id: "outstanding",
    label: "Outstanding",
    value: "$48,900",
    helper: "+12% vs last month",
    tone: "amber",
  },
  {
    id: "paid",
    label: "Paid in last 30d",
    value: "$31,050",
    helper: "94% collection rate",
    tone: "emerald",
  },
  {
    id: "drafts",
    label: "Draft invoices",
    value: "5 invoices",
    helper: "Ready to send",
    tone: "slate",
  },
];

const statusStyles: Record<InvoiceStatus, { label: string; classes: string }> =
  {
    pending: {
      label: "Pending",
      classes: "bg-amber-100 text-amber-800",
    },
    paid: {
      label: "Paid",
      classes: "bg-emerald-100 text-emerald-800",
    },
    overdue: {
      label: "Overdue",
      classes: "bg-rose-100 text-rose-800",
    },
  };

const summaryToneClasses: Record<SummaryTone, string> = {
  amber: "bg-amber-50 text-amber-900",
  emerald: "bg-emerald-50 text-emerald-900",
  slate: "bg-slate-50 text-slate-900",
};

const InvoicesPanel = () => (
  <section
    aria-label="Invoices table"
    className="rounded-3xl border border-slate-100 bg-white p-6 shadow-sm"
  >
    <div className="flex flex-wrap items-center justify-between gap-4">
      <div>
        <h2 className="text-2xl font-semibold text-slate-900">
          Manage billing and cash flow
        </h2>
        <p className="text-sm text-slate-500">
          Keep tabs on outstanding payments and stay proactive with follow-ups.
        </p>
      </div>
      <button
        type="button"
        className="rounded-full bg-slate-900 px-5 py-2 text-sm font-semibold text-white transition hover:bg-slate-800 focus-visible:ring-2 focus-visible:ring-slate-900 focus-visible:ring-offset-2 focus-visible:ring-offset-white"
        aria-label="Create a new invoice"
      >
        New invoice
      </button>
    </div>
    <div className="mt-6 grid gap-4 sm:grid-cols-3">
      {summaryCards.map((card) => (
        <article
          key={card.id}
          className={`rounded-2xl border border-slate-100 p-4 ${
            summaryToneClasses[card.tone]
          }`}
        >
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
            {card.label}
          </p>
          <p className="mt-2 text-2xl font-bold">{card.value}</p>
          <p className="text-sm text-slate-600">{card.helper}</p>
        </article>
      ))}
    </div>
    <div className="mt-8 overflow-hidden rounded-2xl border border-slate-100">
      <table className="w-full divide-y divide-slate-100 text-left text-sm">
        <thead className="bg-slate-50 text-xs font-semibold uppercase tracking-wide text-slate-500">
          <tr>
            <th scope="col" className="px-6 py-3">
              Invoice
            </th>
            <th scope="col" className="px-6 py-3">
              Client
            </th>
            <th scope="col" className="px-6 py-3">
              Amount
            </th>
            <th scope="col" className="px-6 py-3">
              Due date
            </th>
            <th scope="col" className="px-6 py-3">
              Status
            </th>
            <th scope="col" className="px-6 py-3 text-right">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100 bg-white">
          {invoices.map((invoice) => (
            <tr
              key={invoice.id}
              className="transition hover:bg-slate-50 focus-within:bg-slate-50"
            >
              <td className="px-6 py-4 font-semibold text-slate-900">
                {invoice.id}
              </td>
              <td className="px-6 py-4 text-slate-600">{invoice.client}</td>
              <td className="px-6 py-4 font-semibold text-slate-900">
                {invoice.amount}
              </td>
              <td className="px-6 py-4 text-slate-600">{invoice.dueDate}</td>
              <td className="px-6 py-4">
                <span
                  className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${
                    statusStyles[invoice.status].classes
                  }`}
                >
                  {statusStyles[invoice.status].label}
                </span>
              </td>
              <td className="px-6 py-4 text-right">
                <button
                  type="button"
                  className="rounded-full border border-slate-200 px-4 py-2 text-xs font-semibold text-slate-700 transition hover:border-slate-300 hover:bg-slate-50 focus-visible:ring-2 focus-visible:ring-slate-900 focus-visible:ring-offset-2 focus-visible:ring-offset-white"
                  aria-label={`Send reminder for ${invoice.id}`}
                >
                  Send reminder
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </section>
);

export { InvoicesPanel };
