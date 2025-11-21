import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import type { RecentTransaction } from "@/features/dashboard/types";
import { getRecentTransactions } from "@/features/dashboard/api/get-recent-transactions";
import { useAuth } from "@/features/auth/context/use-auth";
import { formatCurrency } from "@/shared/utils/currency";
import { formatDateLabel } from "@/shared/utils/date";

const TRANSACTION_LIMIT = 3;

const RecentTransactions = () => {
  const { accessToken } = useAuth();
  const resolvedToken = accessToken ?? "";

  const { data, isPending, isError, refetch } = useQuery({
    queryKey: ["recent-transactions", TRANSACTION_LIMIT, resolvedToken],
    queryFn: () =>
      getRecentTransactions({
        limit: TRANSACTION_LIMIT,
        accessToken: resolvedToken,
      }),
    enabled: Boolean(resolvedToken),
  });

  const transactions = useMemo<RecentTransaction[]>(
    () => data?.transactions ?? [],
    [data?.transactions]
  );

  if (!resolvedToken || isPending) {
    return (
      <section
        aria-label="Recent transactions loading"
        aria-busy="true"
        className="rounded-3xl bg-white px-6 py-5 shadow-sm"
      >
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-2xl font-semibold text-slate-900">
            Recent Transaction
          </p>
          <span className="text-sm font-medium text-slate-400">
            Fetching latest activity…
          </span>
        </div>
        <div className="mt-6 space-y-4">
          {Array.from({ length: TRANSACTION_LIMIT }).map((_, index) => (
            <div
              key={index}
              className="flex animate-pulse flex-col gap-4 rounded-2xl border border-slate-100 p-4"
            >
              <div className="flex items-center gap-4">
                <span className="h-10 w-10 rounded-full bg-slate-100" />
                <div className="flex-1 space-y-2">
                  <span className="block h-3 w-1/2 rounded-full bg-slate-100" />
                  <span className="block h-3 w-1/3 rounded-full bg-slate-100" />
                </div>
              </div>
              <span className="block h-3 w-1/4 rounded-full bg-slate-100" />
              <span className="block h-3 w-1/3 rounded-full bg-slate-100" />
            </div>
          ))}
        </div>
      </section>
    );
  }

  if (isError) {
    return (
      <section
        aria-label="Recent transactions unavailable"
        role="alert"
        aria-live="polite"
        className="rounded-3xl bg-white px-6 py-5 shadow-sm"
      >
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-2xl font-semibold text-slate-900">
            Recent Transaction
          </p>
          <button
            type="button"
            onClick={() => refetch()}
            className="text-sm font-semibold text-emerald-600"
          >
            Retry
          </button>
        </div>
        <p className="mt-6 text-sm text-slate-500">
          We could not reach your recent transactions right now. Please try
          again in a few moments.
        </p>
      </section>
    );
  }

  if (!transactions.length) {
    return null;
  }

  return (
    <section className="rounded-3xl bg-white px-6 py-5 shadow-sm">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-2xl font-semibold text-slate-900">
          Recent Transaction
        </p>
        <button
          type="button"
          aria-label="View all recent transactions"
          className="flex items-center gap-2 text-sm font-semibold text-emerald-600"
        >
          View All
          <span aria-hidden>›</span>
        </button>
      </div>
      <div className="mt-6">
        <div className="hidden grid-cols-12 gap-4 text-xs font-semibold uppercase tracking-wide text-slate-400 md:grid">
          <span className="col-span-4">Name/Business</span>
          <span className="col-span-2 text-center">Type</span>
          <span className="col-span-3 text-center">Amount</span>
          <span className="col-span-3 text-center">Date</span>
        </div>
        <div className="mt-5 flex flex-col divide-y divide-slate-100">
          {transactions.slice(0, TRANSACTION_LIMIT).map((transaction) => (
            <article
              key={transaction.id}
              className="grid grid-cols-2 gap-4 py-4 text-sm text-slate-900 md:grid-cols-12 md:items-center"
            >
              <div className="col-span-2 flex items-center gap-4 md:col-span-4">
                <img
                  src={transaction.image}
                  alt={`${transaction.name} logo`}
                  className="h-10 w-10 rounded-full bg-slate-100 object-cover"
                  loading="lazy"
                />
                <div>
                  <p className="font-semibold">{transaction.name}</p>
                  <p className="text-xs text-slate-400">
                    {transaction.business}
                  </p>
                </div>
              </div>
              <div className="flex items-center justify-center text-slate-500 md:col-span-2">
                <span className="md:hidden text-xs font-medium uppercase text-slate-400">
                  Type:&nbsp;
                </span>
                <div className="flex flex-wrap items-center gap-2">
                  <span>{transaction.type}</span>
                </div>
              </div>
              <div className="flex flex-col items-center font-semibold md:col-span-3 md:flex-row md:justify-center">
                <span className="md:hidden text-xs font-medium uppercase text-slate-400">
                  Amount
                </span>
                <span className="font-semibold">
                  {formatCurrency(transaction.amount, {
                    currency: transaction.currency,
                    includeSign: true,
                    minimumFractionDigits: 2,
                  })}
                </span>
              </div>
              <div className="flex flex-col items-center text-slate-400 md:col-span-3 md:flex-row md:justify-center">
                <span className="md:hidden text-xs font-medium uppercase text-slate-400">
                  Date
                </span>
                <span>{formatDateLabel(transaction.date)}</span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export { RecentTransactions };
