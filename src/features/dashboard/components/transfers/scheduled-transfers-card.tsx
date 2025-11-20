import { Button } from "@/components/ui/button";
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
    <section className="rounded-3xl bg-white p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-slate-500">Scheduled</p>
          <p className="text-2xl font-semibold">Transfers</p>
        </div>
        <Button
          variant="ghost"
          className="w-auto px-3 py-2 text-xs text-slate-500"
        >
          View all
        </Button>
      </div>
      <div className="mt-6 space-y-4">
        {scheduledTransfers.map((transfer) => (
          <article
            key={transfer.id}
            className="flex items-center justify-between rounded-2xl border border-slate-100 px-4 py-3"
          >
            <div className="flex items-center gap-4">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 text-sm font-semibold text-slate-600">
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
                <p className="text-xs text-slate-500">{transfer.bank}</p>
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
              <span className="text-xs text-slate-400">{transfer.status}</span>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

export { ScheduledTransfersCard };
