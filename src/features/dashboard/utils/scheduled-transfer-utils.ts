import type { ScheduledTransfer } from "@/features/dashboard/types";
import { formatCurrency } from "@/shared/utils/currency";
import { formatTransferDate } from "@/shared/utils/date";

const formatTransferAmount = (value: number, currency: string) => {
  if (currency.length === 3) {
    return formatCurrency(value, {
      currency,
      includeSign: true,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  }

  const formatted = Math.abs(value).toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
  const prefix = value < 0 ? "- " : value > 0 ? "+ " : "";
  return `${prefix}${currency}${formatted}`;
};

const statusStyleMap: Record<
  ScheduledTransfer["status"],
  { badge: string; text: string }
> = {
  scheduled: {
    badge: "bg-amber-50 text-amber-700",
    text: "Scheduled",
  },
  processing: {
    badge: "bg-indigo-50 text-indigo-700",
    text: "Processing",
  },
  completed: {
    badge: "bg-emerald-50 text-emerald-700",
    text: "Completed",
  },
};

const getInitials = (name: string) =>
  name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

export {
  formatTransferAmount,
  formatTransferDate,
  getInitials,
  statusStyleMap,
};

