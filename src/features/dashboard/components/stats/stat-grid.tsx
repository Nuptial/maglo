import {
  PiggyIcon,
  WalletFilledIcon,
  WalletMinimalIcon,
} from "@/features/dashboard/components/icons/dashboard-icons";
import type { DashboardStat } from "@/features/dashboard/types";
import type { ReactNode } from "react";

const stats: DashboardStat[] = [
  {
    id: "balance",
    label: "Total balance",
    value: "$5240.21",
    helper: "",
    change: "",
    trend: "up",
  },
  {
    id: "spending",
    label: "Total spending",
    value: "$250.80",
    helper: "",
    change: "",
    trend: "down",
  },
  {
    id: "saved",
    label: "Total saved",
    value: "$550.25",
    helper: "",
    change: "",
    trend: "up",
  },
];

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
  if (!stats.length) {
    return null;
  }

  return (
    <section
      aria-label="Key performance indicators"
      className="max-h-[105px] grid gap-4 md:grid-cols-2 xl:grid-cols-3"
    >
      {stats.map((stat) => {
        const style = statStyleMap[stat.id];
        return (
          <article
            key={stat.id}
            className={`flex items-center gap-[15px] rounded-[10px] py-6 px-5 ${style.card}`}
          >
            <span
              className={`flex h-12 w-12 items-center justify-center rounded-full ${style.iconBg}`}
            >
              {style.icon}
            </span>
            <div className="flex flex-col gap-[10px]">
              <p className={`text-sm font-medium ${style.label}`}>
                {stat.label}
              </p>
              <p className={`text-3xl font-semibold ${style.value}`}>
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
