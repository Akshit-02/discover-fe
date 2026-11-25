"use client";

import { Plus } from "@phosphor-icons/react";
import Button from "@/components/ui/Button";

/** Top-ups aren't available yet, so this stays disabled. */
const BuyCreditsButton = ({ className, fullWidth }: { className?: string; fullWidth?: boolean }) => (
  <Button
    variant="dark"
    size="sm"
    disabled
    fullWidth={fullWidth}
    className={className}
    leftIcon={<Plus size={14} weight="bold" />}
    title="Top-ups are coming soon"
  >
    Buy more credits
    <span className="rounded-full bg-white/15 px-1.5 py-0.5 text-[9.5px] font-bold uppercase tracking-wider">Soon</span>
  </Button>
);

export default BuyCreditsButton;
