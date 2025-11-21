import type { ScheduledTransfer } from "@/features/dashboard/types";
import {
  formatTransferAmount,
  formatTransferDate,
  getInitials,
} from "@/features/dashboard/utils/scheduled-transfer-utils";

const scheduledTransfers: ScheduledTransfer[] = [
  {
    id: "st-1",
    name: "Monica Parker",
    image: null,
    date: "2025-04-17T12:30:00.000Z",
    amount: -860,
    currency: "USD",
    status: "scheduled",
  },
  {
    id: "st-2",
    name: "Atlas Studio",
    image: null,
    date: "2025-04-18T09:15:00.000Z",
    amount: -1250,
    currency: "USD",
    status: "processing",
  },
  {
    id: "st-3",
    name: "Lydia Flynn",
    image: null,
    date: "2025-04-19T16:45:00.000Z",
    amount: 2400,
    currency: "USD",
    status: "scheduled",
  },
];

const ScheduledTransfersCard = () => {
  if (!scheduledTransfers.length) {
    return null;
  }

  return (
    <section className="rounded-3xl bg-white px-6 py-5 shadow-sm">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <span className="text-lg font-semibold">Scheduled Transfers</span>
        <button
          type="button"
          aria-label="View all scheduled transfers"
          className="flex items-center gap-2 text-sm font-semibold text-emerald-600"
        >
          View All
          <span aria-hidden>›</span>
        </button>
      </div>
      <div className="mt-6 space-y-4">
        {scheduledTransfers.map((transfer) => {
          const formattedAmount = formatTransferAmount(
            transfer.amount,
            transfer.currency
          );
          const isIncoming = transfer.amount >= 0;

          return (
            <article
              key={transfer.id}
              className="flex flex-col gap-3 rounded-2xl border border-slate-100 px-4 py-4 sm:flex-row sm:items-center sm:justify-between"
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
              <div className="text-right">
                <p
                  className={`text-base font-semibold ${
                    isIncoming ? "text-emerald-600" : "text-slate-900"
                  }`}
                >
                  {formattedAmount}
                </p>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
};

export { ScheduledTransfersCard };
