import type { ReactNode } from "react";

type IconCircleButtonProps = {
  ariaLabel: string;
  icon: ReactNode;
  onClick: () => void;
};

const IconCircleButton = ({
  ariaLabel,
  icon,
  onClick,
}: IconCircleButtonProps) => (
  <button
    type="button"
    aria-label={ariaLabel}
    onClick={onClick}
    className="flex h-11 w-11 items-center justify-center rounded-full bg-white text-slate-500 transition hover:bg-slate-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-300"
  >
    {icon}
  </button>
);

export { IconCircleButton };
