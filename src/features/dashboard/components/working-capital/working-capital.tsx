import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  CartesianGrid,
  Line,
  LineChart,
  ReferenceArea,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import type { TooltipProps } from "recharts";

import { ChevronDownIcon } from "@/features/dashboard/components/icons/dashboard-icons";
import type { WorkingCapitalDatum } from "@/features/dashboard/types";
import { useAuth } from "@/features/auth/context/use-auth";
import { getWorkingCapital } from "@/features/dashboard/api/get-working-capital";
import { formatCurrency } from "@/shared/utils/currency";

const WorkingCapital = () => {
  const { accessToken } = useAuth();
  const resolvedToken = accessToken ?? "";

  const { data, isPending, isError, refetch } = useQuery({
    queryKey: ["working-capital", resolvedToken],
    queryFn: () => getWorkingCapital(resolvedToken),
    enabled: Boolean(resolvedToken),
  });

  const workingCapitalData = useMemo<WorkingCapitalDatum[]>(() => {
    if (!data?.data.length) {
      return [];
    }

    const lastIndex = data.data.length - 1;

    return data.data.map((point, index) => ({
      dateLabel: point.month,
      income: point.income,
      expenses: point.expense,
      net: point.net,
      highlight: index === lastIndex,
      displayValue: formatCurrency(point.net, {
        currency: data.currency,
        includeSign: true,
        minimumFractionDigits: 0,
      }),
    }));
  }, [data]);

  const yAxisTicks = useMemo(() => {
    if (!workingCapitalData.length) {
      return [0, 1000, 2000, 3000, 4000];
    }

    const values = workingCapitalData.flatMap((point) => [
      point.income,
      point.expenses,
      Math.max(point.net, 0),
    ]);

    const maxValue = Math.max(...values);
    const step = Math.max(1000, Math.ceil(maxValue / 4 / 1000) * 1000);
    const ticks: number[] = [];
    let current = 0;

    while (current <= maxValue + step) {
      ticks.push(current);
      current += step;
    }

    return ticks;
  }, [workingCapitalData]);

  const yAxisDomain: [number, number] = [
    0,
    yAxisTicks[yAxisTicks.length - 1] || 0,
  ];

  const formatYAxisLabel = (value: number) => `${Math.round(value / 1000)}K`;

  const highlightIndex = workingCapitalData.findIndex(
    (point) => point.highlight
  );
  const highlightStart =
    highlightIndex >= 0
      ? workingCapitalData[highlightIndex].dateLabel
      : undefined;
  const highlightEnd =
    highlightIndex >= 0
      ? workingCapitalData[
          Math.min(highlightIndex + 1, workingCapitalData.length - 1)
        ].dateLabel
      : undefined;

  const summary = data?.summary;
  const currency = data?.currency ?? "USD";
  const periodLabelMap: Record<string, string> = {
    last7Days: "Last 7 days",
    last30Days: "Last 30 days",
    last6Months: "Last 6 months",
    custom: "Custom",
  };
  const periodLabel =
    periodLabelMap[data?.period as keyof typeof periodLabelMap] ??
    "Last 7 days";

  if (!resolvedToken || isPending) {
    return (
      <section
        aria-label="Working capital loading"
        aria-busy="true"
        className="rounded-3xl bg-white px-6 py-5 shadow-sm"
      >
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="h-7 w-40 animate-pulse rounded-full bg-slate-100" />
          <div className="flex gap-4">
            {Array.from({ length: 3 }).map((_, index) => (
              <span
                key={index}
                className="h-5 w-20 animate-pulse rounded-full bg-slate-100"
              />
            ))}
          </div>
        </div>
        <div className="mt-8 h-60 rounded-2xl border border-dashed border-slate-100 bg-slate-50" />
      </section>
    );
  }

  if (isError) {
    return (
      <section
        aria-label="Working capital unavailable"
        role="alert"
        className="rounded-3xl bg-white px-6 py-5 shadow-sm"
      >
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-2xl font-semibold text-slate-900">
              Working Capital
            </p>
            <p className="text-sm text-slate-500">
              We couldn’t load your working capital trend. Please try again.
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

  if (!workingCapitalData.length || !summary) {
    return null;
  }

  return (
    <section className="rounded-3xl bg-white px-6 py-5 shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-2xl font-semibold text-slate-900">
            Working Capital
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-4 text-sm font-semibold text-slate-500">
          <LegendItem label="Income" color="#0bb77f" />
          <LegendItem label="Expense" color="#c6f01f" />
          <button
            type="button"
            aria-label="Select date range"
            className="inline-flex items-center justify-between gap-2 rounded-lg border border-slate-200 bg-slate-50 px-3 py-1.5 text-sm font-medium text-slate-900 shadow-none focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-300 focus-visible:ring-offset-2 focus-visible:ring-offset-white"
          >
            {periodLabel}
            <ChevronDownIcon />
          </button>
        </div>
      </div>
      <div className="mt-8 h-60">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={workingCapitalData}
            margin={{ top: 10, right: 24, left: 0, bottom: 20 }}
          >
            <defs>
              <linearGradient
                id="workingCapitalHighlight"
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >
                <stop offset="0%" stopColor="#e3edff" stopOpacity="0.9" />
                <stop offset="100%" stopColor="#f4f7ff" stopOpacity="0.3" />
              </linearGradient>
            </defs>
            <CartesianGrid
              vertical
              horizontal={false}
              stroke="#f5f0ff"
              strokeDasharray="4 16"
            />
            <XAxis
              dataKey="dateLabel"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#94a3b8", fontSize: 12 }}
              interval={0}
              tickMargin={8}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              width={40}
              tickFormatter={formatYAxisLabel}
              tick={{ fill: "#94a3b8", fontSize: 12 }}
              ticks={yAxisTicks}
              domain={yAxisDomain}
              interval={0}
            />
            {highlightStart && highlightEnd ? (
              <ReferenceArea
                x1={highlightStart}
                x2={highlightEnd}
                strokeOpacity={0}
                fill="url(#workingCapitalHighlight)"
              />
            ) : null}
            <Tooltip
              cursor={false}
              content={<WorkingCapitalTooltip currency={currency} />}
            />
            <Line
              type="monotone"
              dataKey="income"
              stroke="#0bb77f"
              strokeWidth={3}
              dot={false}
              activeDot={{
                r: 6,
                stroke: "#0bb77f",
                strokeWidth: 2,
                fill: "#fff",
              }}
            />
            <Line
              type="monotone"
              dataKey="expenses"
              stroke="#c6f01f"
              strokeWidth={3}
              dot={<HighlightedDot />}
              activeDot={{
                r: 6,
                stroke: "#c6f01f",
                strokeWidth: 2,
                fill: "#fff",
              }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
};

const LegendItem = ({ label, color }: { label: string; color: string }) => (
  <span className="flex items-center gap-2 text-sm font-semibold text-slate-500">
    <span
      className="h-2.5 w-2.5 rounded-full"
      style={{ backgroundColor: color }}
    />
    {label}
  </span>
);

const WorkingCapitalTooltip = ({
  active,
  payload,
  currency,
}: TooltipProps<number, string> & { currency: string }) => {
  if (!active || !payload?.length) {
    return null;
  }

  const point = payload[0]?.payload as WorkingCapitalDatum | undefined;
  if (!point) {
    return null;
  }

  const getFormattedValue = (value: number, includeSign = false) =>
    formatCurrency(value, {
      currency,
      includeSign,
      minimumFractionDigits: 0,
    });

  return (
    <div className="rounded-2xl bg-white px-4 py-3 text-sm text-slate-900 shadow-lg ring-1 ring-black/5">
      <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
        {point.dateLabel}
      </p>
      <div className="mt-2 space-y-1">
        <p className="flex items-center justify-between gap-6">
          <span className="text-slate-500">Income</span>
          <span className="font-semibold">
            {getFormattedValue(point.income)}
          </span>
        </p>
        <p className="flex items-center justify-between gap-6">
          <span className="text-slate-500">Expense</span>
          <span className="font-semibold">
            {getFormattedValue(point.expenses)}
          </span>
        </p>
        <p className="flex items-center justify-between gap-6">
          <span className="text-slate-500">Net</span>
          <span
            className={`font-semibold ${
              point.net >= 0 ? "text-emerald-600" : "text-rose-600"
            }`}
          >
            {getFormattedValue(point.net, true)}
          </span>
        </p>
      </div>
    </div>
  );
};

const HighlightedDot = ({
  cx = 0,
  cy = 0,
  payload,
}: {
  cx?: number;
  cy?: number;
  payload?: WorkingCapitalDatum;
}) => {
  if (!payload?.highlight) {
    return <g />;
  }
  return (
    <g>
      <circle cx={cx} cy={cy} r={10} fill="#e3dfff" opacity={0.8} />
      <circle
        cx={cx}
        cy={cy}
        r={6}
        fill="#6c5ce7"
        stroke="#fff"
        strokeWidth={2}
      />
    </g>
  );
};

export { WorkingCapital };
