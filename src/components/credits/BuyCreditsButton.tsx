"use client";

import { Plus } from "@phosphor-icons/react";
import Button from "@/components/ui/Button";
import { useAppDispatch } from "@/lib/store/hooks";
import { openBuyCredits } from "@/lib/store/slices/creditsSlice";

/** Opens the credit packs modal (rendered once in the dashboard layout). */
const BuyCreditsButton = ({ className, fullWidth }: { className?: string; fullWidth?: boolean }) => {
  const dispatch = useAppDispatch();
  return (
    <Button
      variant="dark"
      size="sm"
      fullWidth={fullWidth}
      className={className}
      leftIcon={<Plus size={14} weight="bold" />}
      onClick={() => dispatch(openBuyCredits())}
    >
      Buy more credits
    </Button>
  );
};

export default BuyCreditsButton;
