import type { ReactNode } from "react";

type ComingSoonPanelProps = {
  title: string;
  description: ReactNode;
};

const ComingSoonPanel = ({ title, description }: ComingSoonPanelProps) => (
  <section
    aria-label={`${title} coming soon`}
    className="flex flex-col items-center justify-center gap-4 rounded-3xl border border-dashed border-slate-200 bg-slate-50 px-6 py-16 text-center shadow-sm"
  >
    <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-white text-3xl">
      ✨
    </div>
    <div className="space-y-2 max-w-xl">
      <h2 className="text-2xl font-semibold text-slate-900">{title}</h2>
      <p className="text-sm text-slate-500">{description}</p>
    </div>
    <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
      Coming soon
    </p>
  </section>
);

export { ComingSoonPanel };

