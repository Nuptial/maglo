import type { ReactNode } from "react";

type IconCircleButtonProps = {
  ariaLabel: string;
  icon: ReactNode;
  onClick: () => void;
  className?: string;
  ariaPressed?: boolean;
  ariaExpanded?: boolean;
};

const IconCircleButton = ({
  ariaLabel,
  icon,
  onClick,
  className,
  ariaPressed,
  ariaExpanded,
}: IconCircleButtonProps) => (
  <button
    type="button"
    aria-label={ariaLabel}
    aria-pressed={ariaPressed}
    aria-expanded={ariaExpanded}
    onClick={onClick}
    className={`flex h-11 w-11 items-center justify-center rounded-full bg-white text-slate-500 transition hover:bg-slate-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-300 ${className ?? ""}`}
  >
    {icon}
  </button>
);

export { IconCircleButton };
