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
import { formatCurrency } from "@/features/dashboard/utils/format-currency";

const workingCapitalData: WorkingCapitalDatum[] = [
  { dateLabel: "Apr 14", income: 5300, expenses: 5600 },
  { dateLabel: "Apr 15", income: 6900, expenses: 6100 },
  { dateLabel: "Apr 16", income: 6400, expenses: 5700 },
  {
    dateLabel: "Apr 17",
    income: 5500,
    expenses: 7100,
    highlight: true,
    displayValue: "$5,500",
  },
  { dateLabel: "Apr 18", income: 4700, expenses: 6400 },
  { dateLabel: "Apr 19", income: 6200, expenses: 5200 },
  { dateLabel: "Apr 20", income: 6600, expenses: 6900 },
];

const WorkingCapitalCard = () => {
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

  return (
    <section className="rounded-3xl bg-white p-6 shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <p className="text-2xl font-semibold text-slate-900">Working Capital</p>
        <div className="flex flex-wrap items-center gap-4 text-sm font-semibold text-slate-500">
          <LegendItem label="Income" color="#0bb77f" />
          <LegendItem label="Expenses" color="#c6f01f" />
          <button
            type="button"
            className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-xs font-semibold text-slate-700 shadow-sm"
          >
            Last 7 days
            <ChevronDownIcon />
          </button>
        </div>
      </div>
      <div className="mt-6 h-80">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={workingCapitalData}
            margin={{ top: 10, right: 24, left: 0, bottom: 0 }}
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
              dy={10}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tickFormatter={(value) => `${Math.round(value / 1000)}K`}
              tick={{ fill: "#94a3b8", fontSize: 12 }}
              ticks={[0, 3000, 5000, 7000, 10000]}
              domain={[0, 10000]}
            />
            {highlightStart && highlightEnd ? (
              <ReferenceArea
                x1={highlightStart}
                x2={highlightEnd}
                strokeOpacity={0}
                fill="url(#workingCapitalHighlight)"
              />
            ) : null}
            <Tooltip cursor={false} content={<WorkingCapitalTooltip />} />
            <Line
              type="monotone"
              dataKey="income"
              stroke="#0bb77f"
              strokeWidth={3}
              dot={false}
            />
            <Line
              type="monotone"
              dataKey="expenses"
              stroke="#c6f01f"
              strokeWidth={3}
              dot={<HighlightedDot />}
              activeDot={false}
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
}: TooltipProps<number, string>) => {
  if (!active || !payload?.length) {
    return null;
  }
  const point = payload[0]?.payload as WorkingCapitalDatum | undefined;
  if (!point?.highlight) {
    return null;
  }

  return (
    <div className="rounded-2xl bg-white px-3 py-2 text-sm font-semibold text-slate-900 shadow-lg ring-1 ring-black/5">
      {point.displayValue ?? formatCurrency(point.income)}
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

export { WorkingCapitalCard };
