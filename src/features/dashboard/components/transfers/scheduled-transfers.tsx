import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import type {
  ScheduledTransfer,
  ScheduledTransfersSummary,
} from "@/features/dashboard/types";
import { useAuth } from "@/features/auth/context/use-auth";
import { getScheduledTransfers } from "@/features/dashboard/api/get-scheduled-transfers";
import { formatCurrency } from "@/features/dashboard/utils/currency-utils";
import {
  formatTransferAmount,
  formatTransferDate,
  getInitials,
} from "@/features/dashboard/utils/scheduled-transfer-utils";

const ScheduledTransfers = () => {
  const { accessToken } = useAuth();
  const resolvedToken = accessToken ?? "";

  const { data, isPending, isError, refetch } = useQuery({
    queryKey: ["scheduled-transfers", resolvedToken],
    queryFn: () => getScheduledTransfers(resolvedToken),
    enabled: Boolean(resolvedToken),
  });

  const transfers = useMemo<ScheduledTransfer[]>(
    () => data?.transfers ?? [],
    [data?.transfers]
  );

  const summary: ScheduledTransfersSummary | undefined = data?.summary;

  if (!resolvedToken || isPending) {
    return (
      <section className="rounded-3xl bg-white px-6 py-5 shadow-sm">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <span className="h-6 w-40 animate-pulse rounded-full bg-slate-100" />
          <span className="h-6 w-24 animate-pulse rounded-full bg-slate-100" />
        </div>
        <div className="mt-6 space-y-4">
          {Array.from({ length: 3 }).map((_, index) => (
            <div
              key={index}
              className="flex animate-pulse items-center justify-between rounded-2xl border border-slate-100 px-4 py-4"
            >
              <span className="h-10 w-10 rounded-full bg-slate-100" />
              <span className="h-4 w-32 rounded-full bg-slate-100" />
              <span className="h-4 w-20 rounded-full bg-slate-100" />
            </div>
          ))}
        </div>
      </section>
    );
  }

  if (isError) {
    return (
      <section className="rounded-3xl bg-white px-6 py-5 shadow-sm">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-lg font-semibold text-slate-900">
              Scheduled Transfers
            </p>
            <p className="text-sm text-slate-500">
              We couldn’t load your scheduled transfers. Please try again.
            </p>
          </div>
          <button
            type="button"
            className="rounded-full border border-emerald-600 px-4 py-2 text-sm font-semibold text-emerald-600"
            onClick={() => refetch()}
          >
            Retry
          </button>
        </div>
      </section>
    );
  }

  if (!transfers.length) {
    return null;
  }

  const getFormattedAmount = (value: number, currencyCode: string) => {
    if (currencyCode.length === 3) {
      return formatCurrency(value, {
        currency: currencyCode,
        includeSign: true,
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      });
    }
    return formatTransferAmount(value, currencyCode);
  };

  return (
    <section className="rounded-3xl bg-white px-6 py-5 shadow-sm">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <span className="text-lg font-semibold text-slate-900">
            Scheduled Transfers
          </span>
          {summary ? (
            <p className="text-sm text-slate-500">
              {summary.count} upcoming ·{" "}
              {getFormattedAmount(
                summary.totalScheduledAmount,
                transfers[0]?.currency ?? "$"
              )}{" "}
              total
            </p>
          ) : null}
        </div>
        <button
          type="button"
          className="flex items-center gap-2 text-sm font-semibold text-emerald-600"
        >
          View All
          <span aria-hidden>›</span>
        </button>
      </div>
      <div className="mt-6 space-y-4">
        {transfers.map((transfer) => {
          return (
            <article
              key={transfer.id}
              className="flex flex-col gap-3 rounded-2xl px-4 py-4 sm:flex-row sm:items-center sm:justify-between"
            >
              <div className="flex items-center gap-4">
                {transfer.image ? (
                  <img
                    src={transfer.image}
                    alt={transfer.name}
                    className="h-10 w-10 rounded-full object-cover"
                    loading="lazy"
                  />
                ) : (
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 text-sm font-semibold text-slate-600">
                    {getInitials(transfer.name)}
                  </span>
                )}
                <div>
                  <p className="text-sm font-semibold text-slate-900">
                    {transfer.name}
                  </p>
                  <p className="text-xs text-slate-400">
                    {formatTransferDate(transfer.date)}
                  </p>
                </div>
              </div>
              <div className="flex flex-col items-start gap-2 text-right sm:flex-row sm:items-center sm:gap-4">
                <p className="text-base font-semibold text-slate-900">
                  {getFormattedAmount(transfer.amount, transfer.currency)}
                </p>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
};

export { ScheduledTransfers };
