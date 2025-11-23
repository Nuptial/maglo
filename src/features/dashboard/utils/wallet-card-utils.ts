import type { CSSProperties } from "react";
import type { WalletCardApi } from "@/features/dashboard/types";

type CardPresentation = {
  backgroundStyle?: CSSProperties;
  textColor: string;
  accentColor: string;
  chipBg: string;
  contactlessColor: string;
  shadow: string;
  stackClass?: string;
  numberTracking: string;
  badgeClass: string;
  cornerAccent?: "mastercard";
  backdropClass?: string;
  maxWidthClass: string;
  backdropStyle?: CSSProperties;
  borderStyle?: CSSProperties;
};

const getCardPresentation = (
  card: WalletCardApi,
  index: number
): CardPresentation => {
  const isPrimary = card.isDefault || index === 0;
  const backgroundStyle: CSSProperties | undefined = isPrimary
    ? {
        background:
          "linear-gradient(104.3deg, #4A4A49 2.66%, #20201F 90.57%)",
      }
    : undefined;

  return {
    backgroundStyle,
    textColor: isPrimary ? "text-white" : "text-[#1f283a]",
    accentColor: isPrimary ? "text-white/70" : "text-slate-500",
    chipBg: isPrimary ? "bg-white/20" : "bg-[#cfcfcf]/60",
    contactlessColor: isPrimary ? "text-white/80" : "text-slate-400",
    shadow: isPrimary
      ? "shadow-[0_25px_70px_rgba(9,9,11,0.55)]"
      : "shadow-[0_30px_60px_rgba(15,23,42,0.18)]",
    stackClass: isPrimary ? "" : "-mt-8 ml-4 mr-4",
    numberTracking: isPrimary ? "tracking-[0.28em]" : "tracking-[0.18em]",
    badgeClass: isPrimary
      ? "bg-white/10 text-white/80"
      : "bg-white text-slate-700",
    cornerAccent:
      card.network?.toLowerCase() === "mastercard" ? "mastercard" : undefined,
    backdropClass: isPrimary ? "" : "backdrop-blur-[16px]",
    maxWidthClass: isPrimary ? "max-w-[360px]" : "max-w-[328px]",
    backdropStyle: isPrimary
      ? undefined
      : {
          backdropFilter: "blur(18px)",
          background:
            "linear-gradient(180deg, rgba(255,255,255,0.52) 0%, rgba(255,255,255,0.64) 45%, #fefefe 100%)",
        },
    borderStyle: undefined,
  };
};

const mapCardsToPresentation = (cards: WalletCardApi[]) =>
  [...cards]
    .sort((a, b) => Number(b.isDefault) - Number(a.isDefault))
    .map((card, index) => ({
      card,
      presentation: getCardPresentation(card, index),
    }));

const formatExpiry = (month: number, year: number) => {
  if (!month || !year) {
    return "";
  }

  const paddedMonth = month.toString().padStart(2, "0");
  const shortYear = year.toString().slice(-2);
  return `${paddedMonth}/${shortYear}`;
};

export {
  formatExpiry,
  getCardPresentation,
  mapCardsToPresentation,
  type CardPresentation,
};

