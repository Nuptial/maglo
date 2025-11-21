import type { CSSProperties } from "react";
import type { WalletCardApi } from "@/features/dashboard/types";

type CardPresentation = {
  backgroundStyle: CSSProperties;
  textColor: string;
  accentColor: string;
  chipBg: string;
  contactlessColor: string;
  shadow: string;
  stackClass?: string;
  numberTracking: string;
  badgeClass: string;
  cornerAccent?: "mastercard";
};

const normalizeHexColor = (color: string) => {
  if (!color) {
    return "#0f1116";
  }

  const trimmed = color.trim();
  if (trimmed.startsWith("#")) {
    if (trimmed.length === 4) {
      return `#${trimmed[1]}${trimmed[1]}${trimmed[2]}${trimmed[2]}${trimmed[3]}${trimmed[3]}`;
    }
    if (trimmed.length === 7) {
      return trimmed;
    }
    return "#0f1116";
  }

  const sanitized = trimmed.replace(/[^0-9a-f]/gi, "").slice(0, 6);
  return sanitized ? `#${sanitized.padEnd(6, "0")}` : "#0f1116";
};

const hexWithAlpha = (hex: string, alpha: number) => {
  const normalized = normalizeHexColor(hex).replace("#", "");
  const alphaHex = Math.round(alpha * 255)
    .toString(16)
    .padStart(2, "0");
  return `#${normalized}${alphaHex}`;
};

const getCardPresentation = (
  card: WalletCardApi,
  index: number
): CardPresentation => {
  const isPrimary = card.isDefault || index === 0;
  const baseColor = normalizeHexColor(
    card.color || (isPrimary ? "#1f1f1f" : "#f5f5f5")
  );

  const backgroundStyle: CSSProperties = isPrimary
    ? {
        background: `linear-gradient(120deg, ${hexWithAlpha(
          baseColor,
          0.95
        )} 0%, #05070c 100%)`,
      }
    : {
        background: `linear-gradient(180deg, ${hexWithAlpha(
          baseColor,
          0.2
        )} 0%, ${hexWithAlpha(baseColor, 0.6)} 100%)`,
      };

  return {
    backgroundStyle,
    textColor: isPrimary ? "text-white" : "text-[#0f172a]",
    accentColor: isPrimary ? "text-white/70" : "text-slate-500",
    chipBg: isPrimary ? "bg-white/20" : "bg-white/80",
    contactlessColor: isPrimary ? "text-white/80" : "text-slate-500",
    shadow: isPrimary
      ? "shadow-[0_20px_55px_rgba(12,13,15,0.5)]"
      : "shadow-[0_28px_36px_rgba(17,24,39,0.15)]",
    stackClass: isPrimary ? "" : "-mt-14 ml-4 mr-4",
    numberTracking: isPrimary ? "tracking-[0.32em]" : "tracking-[0.2em]",
    badgeClass: isPrimary
      ? "bg-white/10 text-white/80"
      : "bg-white text-slate-700",
    cornerAccent:
      card.network?.toLowerCase() === "mastercard" ? "mastercard" : undefined,
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

