export interface CreditPack {
  id: "starter" | "growth" | "pro" | "agency";
  name: string;
  priceInr: number;
  credits: number;
  tagline: string;
  popular?: boolean;
}

export const CREDIT_PACKS: CreditPack[] = [
  { id: "starter", name: "Starter", priceInr: 249, credits: 50, tagline: "Try a few searches" },
  { id: "growth", name: "Growth", priceInr: 599, credits: 150, tagline: "For a single campaign" },
  { id: "pro", name: "Pro", priceInr: 1399, credits: 400, tagline: "For regular outreach", popular: true },
  { id: "agency", name: "Agency", priceInr: 2999, credits: 1000, tagline: "For teams and agencies" },
];

const BASE_RATE = CREDIT_PACKS[0].priceInr / CREDIT_PACKS[0].credits;

export const perCredit = (pack: CreditPack) => pack.priceInr / pack.credits;

/** Percent saved per credit compared with Starter, rounded down. */
export const savingsPercent = (pack: CreditPack) => Math.floor((1 - perCredit(pack) / BASE_RATE) * 100);

export const formatInr = (amount: number, decimals = 0) =>
  `₹${amount.toLocaleString("en-IN", { minimumFractionDigits: decimals, maximumFractionDigits: decimals })}`;
