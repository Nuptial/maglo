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
        className="rounded-3xl border border-[rgba(245,245,245,1)] bg-white px-6 py-5 shadow-sm"
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
        className="rounded-3xl border border-[rgba(245,245,245,1)] bg-white px-6 py-5 shadow-sm"
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
    <section className="rounded-3xl border border-[rgba(245,245,245,1)] bg-white px-6 py-5 shadow-sm">
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
              className="flex flex-col gap-3 py-5 text-sm text-slate-900 md:grid md:grid-cols-12 md:items-center"
            >
              <div className="flex items-center gap-4 md:col-span-4">
                <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-2xl bg-slate-50">
                  <img
                    src={transaction.image}
                    alt={`${transaction.name} logo`}
                    className="h-8 w-8 rounded-full object-cover"
                    loading="lazy"
                  />
                </div>
                <div className="flex flex-col text-left">
                  <p className="text-base font-semibold text-slate-900">
                    {transaction.name}
                  </p>
                  <p className="text-xs text-slate-400">
                    {transaction.business}
                  </p>
                </div>
              </div>
              <div className="flex items-center justify-between text-slate-500 md:col-span-2 md:justify-center">
                <span className="text-xs font-medium uppercase text-slate-400 md:hidden">
                  Type
                </span>
                <span className="text-sm font-semibold md:text-base">
                  {transaction.type}
                </span>
              </div>
              <div className="flex flex-col items-start gap-1 font-semibold md:col-span-3 md:flex-row md:items-center md:justify-center">
                <span className="text-xs font-medium uppercase text-slate-400 md:hidden">
                  Amount
                </span>
                <span className="text-base text-slate-900">
                  {formatCurrency(transaction.amount, {
                    currency: transaction.currency,
                    includeSign: true,
                    minimumFractionDigits: 2,
                  })}
                </span>
              </div>
              <div className="flex flex-col items-start gap-1 text-slate-400 md:col-span-3 md:flex-row md:items-center md:justify-center">
                <span className="text-xs font-medium uppercase text-slate-400 md:hidden">
                  Date
                </span>
                <span className="text-base text-slate-900 md:text-slate-500">
                  {formatDateLabel(transaction.date)}
                </span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export { RecentTransactions };
