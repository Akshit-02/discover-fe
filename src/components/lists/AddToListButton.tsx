"use client";

import { MouseEvent } from "react";
import { FolderSimplePlus, FolderSimpleStar } from "@phosphor-icons/react";
import { Creator } from "@/lib/models/creator";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import { openListPicker } from "@/lib/store/slices/listsSlice";
import { cn } from "@/lib/utils/cn";

interface AddToListButtonProps {
  creator: Creator;
  variant?: "icon" | "full";
  className?: string;
}

const AddToListButton = ({ creator, variant = "icon", className }: AddToListButtonProps) => {
  const dispatch = useAppDispatch();
  const count = useAppSelector((s) => s.lists.membership[creator.id]?.length ?? 0);
  const inLists = count > 0;

  const open = (e: MouseEvent) => {
    e.stopPropagation();
    dispatch(openListPicker(creator));
  };

  const Icon = inLists ? FolderSimpleStar : FolderSimplePlus;

  if (variant === "full") {
    return (
      <button
        onClick={open}
        className={cn(
          "inline-flex h-11 items-center justify-center gap-2 rounded-xl border px-4 text-sm font-semibold transition-all",
          inLists
            ? "border-coral/30 bg-coral-50 text-coral-700 hover:bg-coral-100"
            : "border-sand-200 bg-white text-charcoal shadow-soft hover:border-sand-300",
          className,
        )}
      >
        <Icon size={18} weight={inLists ? "fill" : "bold"} />
        {inLists ? `In ${count} ${count === 1 ? "list" : "lists"}` : "Add to list"}
      </button>
    );
  }

  return (
    <button
      onClick={open}
      aria-label="Add to list"
      title={inLists ? `In ${count} ${count === 1 ? "list" : "lists"}` : "Add to list"}
      className={cn(
        "flex h-9 w-9 items-center justify-center rounded-xl border transition-all duration-200",
        inLists
          ? "border-coral/30 bg-coral-50 text-coral"
          : "border-sand-200 bg-white text-charcoal-300 hover:border-coral/40 hover:text-coral",
        className,
      )}
    >
      <Icon size={17} weight={inLists ? "fill" : "bold"} />
    </button>
  );
};

export default AddToListButton;
