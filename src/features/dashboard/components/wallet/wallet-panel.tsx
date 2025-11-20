import {
  CardChipIcon,
  ContactlessIcon,
} from "@/features/dashboard/components/icons/dashboard-icons";
import type { WalletCard } from "@/features/dashboard/types";

const walletCards: WalletCard[] = [
  {
    id: "primary",
    bank: "Universal Bank",
    number: "5495 7381 3759 2321",
    expiry: "08/27",
    brand: "visa",
    background:
      "bg-gradient-to-br from-[#1b1d22] via-[#191b20] to-[#0f1014] text-white shadow-[0_20px_50px_rgba(15,16,20,0.45)]",
    textColor: "text-white",
    accentColor: "text-white/60",
    chipBg: "bg-[#c8c2bb]",
    contactlessColor: "text-white/60",
  },
  {
    id: "secondary",
    bank: "Commercial Bank",
    number: "8595 2548 ****",
    expiry: "09/25",
    brand: "mastercard",
    background:
      "bg-gradient-to-b from-[#d9d6d2] via-white to-white text-[#0f172a] shadow-[0_25px_40px_rgba(29,33,45,0.12)]",
    textColor: "text-[#0f172a]",
    accentColor: "text-[#7d869c]",
    chipBg: "bg-[#bfbab3]",
    contactlessColor: "text-[#4b5563]",
  },
];

const WalletPanel = () => {
  if (!walletCards.length) {
    return null;
  }

  return (
    <section className="rounded-3xl bg-white p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-slate-500">Wallet</p>
          <p className="text-2xl font-semibold">Active cards</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-slate-900" />
          <span className="h-1.5 w-1.5 rounded-full bg-slate-200" />
          <span className="h-1.5 w-1.5 rounded-full bg-slate-200" />
        </div>
      </div>
      <div className="mt-6 flex flex-col gap-4">
        {walletCards.map((card, index) => (
          <article
            key={card.id}
            className={`overflow-hidden rounded-[32px] p-6 transition ${
              card.background
            } ${index === 1 ? "ml-6" : ""}`}
          >
            <div className="flex items-center justify-between">
              <div
                className={`flex items-center gap-3 text-lg font-semibold ${card.textColor}`}
              >
                <span>Maglo.</span>
                <span className="text-base font-normal text-white/60">|</span>
                <span className={`text-sm font-medium ${card.accentColor}`}>
                  {card.bank}
                </span>
              </div>
              <ContactlessIcon className={card.contactlessColor} />
            </div>
            <div className="mt-8 flex items-center gap-3">
              <span
                className={`flex h-10 w-10 items-center justify-center rounded-lg ${card.chipBg} text-slate-700`}
              >
                <CardChipIcon />
              </span>
            </div>
            <div
              className={`mt-6 space-y-2 text-xl font-semibold tracking-[0.3em] ${card.textColor}`}
            >
              <p>{card.number}</p>
            </div>
            <div className="mt-6 flex items-center justify-between text-sm font-semibold">
              <div className={`flex flex-col ${card.accentColor}`}>
                <span className="text-xs">Valid thru</span>
                <span className={card.textColor}>{card.expiry}</span>
              </div>
              {card.brand === "visa" ? <VisaBadge /> : <MastercardBadge />}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

const VisaBadge = () => (
  <span className="rounded-lg bg-[#1a1f71] px-3 py-1 text-xs font-semibold text-white">
    VISA
  </span>
);

const MastercardBadge = () => (
  <div className="flex items-center gap-1 rounded-lg bg-white/70 px-3 py-1">
    <span className="h-4 w-4 rounded-full bg-[#eb001b]" />
    <span className="h-4 w-4 -ml-2 rounded-full bg-[#f79e1b] opacity-90" />
  </div>
);

export { WalletPanel };
