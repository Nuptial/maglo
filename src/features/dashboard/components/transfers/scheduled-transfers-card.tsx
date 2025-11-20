import type { ScheduledTransfer } from "@/features/dashboard/types";

const scheduledTransfers: ScheduledTransfer[] = [
  {
    id: "st-1",
    recipient: "Monica Parker",
    bank: "Universal Bank · Checking",
    timeLabel: "Today · 12:30 PM",
    amount: "-$860.00",
    direction: "out",
    status: "Scheduled",
  },
  {
    id: "st-2",
    recipient: "Atlas Studio",
    bank: "Commercial Bank · ACH",
    timeLabel: "Tomorrow · 09:15 AM",
    amount: "-$1,250.00",
    direction: "out",
    status: "Processing",
  },
  {
    id: "st-3",
    recipient: "Lydia Flynn",
    bank: "Universal Bank · Savings",
    timeLabel: "Friday · 04:45 PM",
    amount: "+$2,400.00",
    direction: "in",
    status: "Scheduled",
  },
];

const ScheduledTransfersCard = () => {
  if (!scheduledTransfers.length) {
    return null;
  }

  return (
    <section>
      <div className="flex items-center justify-between">
        <span className="text-[18px] font-semibold">Scheduled Transfers</span>
        <button
          type="button"
          className="flex items-center gap-2 text-sm font-semibold text-emerald-600"
        >
          View All
          <span aria-hidden>›</span>
        </button>
      </div>
      <div className="mt-6 space-y-4">
        {scheduledTransfers.map((transfer, index) => (
          <article
            key={transfer.id}
            className={`flex items-center justify-between px-4 py-3 w-full ${
              index !== scheduledTransfers.length - 1
                ? "border-b border-[rgba(250,250,250,1)]"
                : ""
            }`}
          >
            <div className="flex items-center gap-4">
              <span className="flex h-10 w-10 items-center justify-center bg-slate-100 text-sm font-semibold text-slate-600">
                {transfer.recipient
                  .split(" ")
                  .map((part) => part[0])
                  .join("")
                  .slice(0, 2)}
              </span>
              <div>
                <p className="text-sm font-semibold text-slate-900">
                  {transfer.recipient}
                </p>
                <p className="text-xs text-slate-400">{transfer.timeLabel}</p>
              </div>
            </div>
            <div className="text-right">
              <p
                className={`text-base font-semibold ${
                  transfer.direction === "in"
                    ? "text-emerald-600"
                    : "text-slate-900"
                }`}
              >
                {transfer.amount}
              </p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

export { ScheduledTransfersCard };
