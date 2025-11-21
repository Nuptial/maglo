import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  PiggyIcon,
  WalletFilledIcon,
  WalletMinimalIcon,
} from "@/features/dashboard/components/icons/dashboard-icons";
import type { DashboardStat } from "@/features/dashboard/types";
import type { ReactNode } from "react";
import { useAuth } from "@/features/auth/context/use-auth";
import { getFinancialSummary } from "@/features/dashboard/api/get-financial-summary";
import { formatCurrency } from "@/shared/utils/currency";

const statStyleMap: Record<
  DashboardStat["id"],
  {
    card: string;
    label: string;
    value: string;
    iconBg: string;
    icon: ReactNode;
  }
> = {
  balance: {
    card: "bg-[#2b2f38] text-white shadow-none",
    label: "text-slate-200",
    value: "text-white",
    iconBg: "bg-white/10 text-[#ccff33]",
    icon: <WalletFilledIcon />,
  },
  spending: {
    card: "bg-[#fafafa] text-[#0f172a]",
    label: "text-[#9ea5b7]",
    value: "text-[#0f172a]",
    iconBg: "bg-[#ede9e8] text-[#2b2f38]",
    icon: <WalletMinimalIcon />,
  },
  saved: {
    card: "bg-[#fafafa] text-[#0f172a]",
    label: "text-[#9ea5b7]",
    value: "text-[#0f172a]",
    iconBg: "bg-[#efe9e5] text-[#2b2f38]",
    icon: <PiggyIcon />,
  },
};

const StatGrid = () => {
  const { accessToken } = useAuth();
  const resolvedToken = accessToken ?? "";

  const { data, isPending, isError, refetch } = useQuery({
    queryKey: ["financial-summary", resolvedToken],
    queryFn: () => getFinancialSummary(resolvedToken),
    enabled: Boolean(resolvedToken),
  });

  const stats: DashboardStat[] = useMemo(() => {
    if (!data) {
      return [];
    }

    return [
      {
        id: "balance",
        label: "Total balance",
        value: formatCurrency(data.totalBalance.amount, {
          currency: data.totalBalance.currency,
          minimumFractionDigits: 2,
        }),
        helper: "Last month",
        change: `${Math.abs(data.totalBalance.change.percentage).toFixed(1)}%`,
        trend: data.totalBalance.change.trend,
      },
      {
        id: "spending",
        label: "Total spending",
        value: formatCurrency(data.totalExpense.amount, {
          currency: data.totalExpense.currency,
          minimumFractionDigits: 2,
        }),
        helper: "vs previous month",
        change: `${Math.abs(data.totalExpense.change.percentage).toFixed(1)}%`,
        trend: data.totalExpense.change.trend,
      },
      {
        id: "saved",
        label: "Total saved",
        value: formatCurrency(data.totalSavings.amount, {
          currency: data.totalSavings.currency,
          minimumFractionDigits: 2,
        }),
        helper: "vs previous month",
        change: `${Math.abs(data.totalSavings.change.percentage).toFixed(1)}%`,
        trend: data.totalSavings.change.trend,
      },
    ];
  }, [data]);

  if (!resolvedToken || isPending) {
    return (
      <section
        aria-label="Key performance indicators loading"
        aria-busy="true"
        className="grid gap-4 md:grid-cols-2 xl:grid-cols-3"
      >
        {Array.from({ length: 3 }).map((_, index) => (
          <article
            key={index}
            className="flex animate-pulse items-center gap-4 rounded-2xl bg-white px-5 py-6"
          >
            <span className="h-12 w-12 rounded-full bg-slate-100" />
            <div className="flex flex-1 flex-col gap-3">
              <span className="h-3 w-24 rounded-full bg-slate-100" />
              <span className="h-5 w-32 rounded-full bg-slate-200" />
              <span className="h-3 w-20 rounded-full bg-slate-100" />
            </div>
          </article>
        ))}
      </section>
    );
  }

  if (isError) {
    return (
      <section
        aria-label="Key performance indicators unavailable"
        role="alert"
        className="rounded-3xl bg-white px-6 py-5 shadow-sm"
      >
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-2xl font-semibold text-slate-900">
              Financial overview unavailable
            </p>
            <p className="text-sm text-slate-500">
              We couldn’t load the latest summary. Please try again shortly.
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

  if (!stats.length) {
    return null;
  }

  return (
    <section
      aria-label="Key performance indicators"
      className="grid gap-4 md:grid-cols-2 xl:grid-cols-3"
    >
      {stats.map((stat) => {
        const style = statStyleMap[stat.id];
        return (
          <article
            key={stat.id}
            className={`flex flex-wrap gap-4 rounded-2xl px-5 py-6 ${style.card} sm:flex-nowrap sm:items-center`}
          >
            <span
              className={`flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full ${style.iconBg}`}
            >
              {style.icon}
            </span>
            <div className="flex min-w-0 flex-1 flex-col gap-1">
              <p className={`text-sm font-medium ${style.label}`}>
                {stat.label}
              </p>
              <p
                className={`break-words text-2xl font-semibold leading-snug sm:text-3xl ${style.value}`}
              >
                {stat.value}
              </p>
            </div>
          </article>
        );
      })}
    </section>
  );
};

export { StatGrid };
