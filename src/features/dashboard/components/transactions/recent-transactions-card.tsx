import type { RecentTransaction } from "@/features/dashboard/types";

const recentTransactions: RecentTransaction[] = [
  {
    id: "iphone",
    title: "Iphone 13 Pro MAX",
    business: "Apple. Inc",
    type: "Mobile",
    amount: "$420.84",
    dateLabel: "14 Apr 2022",
    logoUrl:
      "https://images.unsplash.com/photo-1603899123208-42f4bde1d15a?auto=format&fit=crop&w=80&q=80",
    logoBg: "bg-slate-100",
  },
  {
    id: "netflix",
    title: "Netflix Subscription",
    business: "Netflix",
    type: "Entertainment",
    amount: "$100.00",
    dateLabel: "05 Apr 2022",
    logoUrl:
      "https://upload.wikimedia.org/wikipedia/commons/6/69/Netflix_logo.svg",
    logoBg: "bg-[#f6ede8]",
  },
  {
    id: "figma",
    title: "Figma Subscription",
    business: "Figma. Inc",
    type: "Software",
    amount: "$244.20",
    dateLabel: "02 Apr 2022",
    logoUrl:
      "https://upload.wikimedia.org/wikipedia/commons/3/33/Figma-logo.svg",
    logoBg: "bg-[#f1f5fd]",
  },
];

const RecentTransactionsCard = () => {
  if (!recentTransactions.length) {
    return null;
  }

  return (
    <section className="rounded-3xl bg-white p-6 shadow-sm">
      <div className="flex items-center justify-between">
        <p className="text-2xl font-semibold text-slate-900">
          Recent Transaction
        </p>
        <button
          type="button"
          className="flex items-center gap-2 text-sm font-semibold text-emerald-600"
        >
          View All
          <span aria-hidden>›</span>
        </button>
      </div>
      <div className="mt-6">
        <div className="grid grid-cols-[3fr,1fr,1fr,1fr] gap-4 text-xs font-semibold uppercase tracking-wide text-slate-400">
          <span>Name/Business</span>
          <span>Type</span>
          <span className="text-right">Amount</span>
          <span className="text-right">Date</span>
        </div>
        <div className="mt-4 divide-y divide-slate-100">
          {recentTransactions.map((transaction) => (
            <article
              key={transaction.id}
              className="grid grid-cols-[3fr,1fr,1fr,1fr] gap-4 py-4 text-sm text-slate-900"
            >
              <div className="flex items-center gap-3">
                <span
                  className={`flex h-12 w-12 items-center justify-center rounded-2xl ${transaction.logoBg}`}
                >
                  <img
                    src={transaction.logoUrl}
                    alt=""
                    aria-hidden
                    className="h-8 w-8 object-contain"
                    loading="lazy"
                  />
                </span>
                <div>
                  <p className="font-semibold">{transaction.title}</p>
                  <p className="text-xs text-slate-400">
                    {transaction.business}
                  </p>
                </div>
              </div>
              <div className="flex items-center text-slate-500">
                {transaction.type}
              </div>
              <div className="flex items-center justify-end font-semibold">
                {transaction.amount}
              </div>
              <div className="flex items-center justify-end text-slate-400">
                {transaction.dateLabel}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export { RecentTransactionsCard };
