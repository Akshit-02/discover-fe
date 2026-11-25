const DAY_MS = 86_400_000;

export const creditLabel = (n: number) => `${n} credit${n === 1 ? "" : "s"}`;

/** "Expires in 12 days", "Expires today", "Expired on 3 Dec". */
export const expiryLabel = (expiresAt: string | null, expired: boolean) => {
  if (!expiresAt) return expired ? "Expired" : "";
  const at = new Date(expiresAt);
  const date = at.toLocaleDateString(undefined, { day: "numeric", month: "short", year: "numeric" });
  if (expired) return `Expired on ${date}`;
  const days = Math.ceil((at.getTime() - Date.now()) / DAY_MS);
  if (days <= 1) return "Expires today";
  return `Expires in ${days} days · ${date}`;
};
