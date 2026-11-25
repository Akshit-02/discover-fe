"use client";

import { ReactNode } from "react";
import { ArrowClockwise, CloudWarning, MagnifyingGlassMinus } from "@phosphor-icons/react";
import Button from "@/components/ui/Button";
import Skeleton from "@/components/ui/Skeleton";

export const StatePanel = ({
  icon,
  title,
  description,
  action,
}: {
  icon: ReactNode;
  title: string;
  description: string;
  action?: ReactNode;
}) => (
  <div className="flex flex-col items-center rounded-3xl border border-dashed border-sand-300 bg-white/60 px-6 py-16 text-center">
    <span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-coral-50 text-coral shadow-soft">
      {icon}
    </span>
    <h3 className="mt-5 text-lg font-bold tracking-tight text-charcoal">{title}</h3>
    <p className="mt-1.5 max-w-sm text-sm leading-relaxed text-charcoal-400">{description}</p>
    {action && <div className="mt-6">{action}</div>}
  </div>
);

export const NoResults = ({ onReset }: { onReset: () => void }) => (
  <StatePanel
    icon={<MagnifyingGlassMinus size={30} weight="duotone" />}
    title="No creators match these filters"
    description="Try widening your follower tier, lowering the engagement threshold or removing a niche."
    action={
      <Button variant="secondary" onClick={onReset}>
        Reset filters
      </Button>
    }
  />
);

export const LoadError = ({ message, onRetry }: { message: string; onRetry: () => void }) => (
  <StatePanel
    icon={<CloudWarning size={30} weight="duotone" />}
    title="We couldn't load creators"
    description={message}
    action={
      <Button variant="dark" onClick={onRetry} leftIcon={<ArrowClockwise size={16} weight="bold" />}>
        Try again
      </Button>
    }
  />
);

export const CardSkeletons = ({ count = 6 }: { count?: number }) => (
  <div className="grid gap-4 sm:grid-cols-2 2xl:grid-cols-3">
    {Array.from({ length: count }).map((_, i) => (
      <div key={i} className="rounded-3xl border border-sand-200/80 bg-white p-5 shadow-soft">
        <div className="flex items-center gap-3">
          <Skeleton className="h-11 w-11 rounded-full" />
          <div className="flex-1 space-y-2">
            <Skeleton className="h-3.5 w-2/3" />
            <Skeleton className="h-3 w-1/3" />
          </div>
        </div>
        <Skeleton className="mt-5 h-[68px] rounded-2xl" />
        <div className="mt-4 flex gap-2">
          <Skeleton className="h-6 w-16 rounded-full" />
          <Skeleton className="h-6 w-20 rounded-full" />
        </div>
        <Skeleton className="mt-5 h-8" />
      </div>
    ))}
  </div>
);

export const TableSkeleton = ({ rows = 8 }: { rows?: number }) => (
  <div className="overflow-hidden rounded-3xl border border-sand-200/80 bg-white shadow-soft">
    <div className="border-b border-sand-100 bg-sand-50/60 px-5 py-3.5">
      <Skeleton className="h-3 w-1/3" />
    </div>
    {Array.from({ length: rows }).map((_, i) => (
      <div key={i} className="flex items-center gap-4 border-b border-sand-100 px-5 py-3.5 last:border-0">
        <Skeleton className="h-10 w-10 shrink-0 rounded-full" />
        <div className="w-48 space-y-2">
          <Skeleton className="h-3.5 w-3/4" />
          <Skeleton className="h-3 w-1/2" />
        </div>
        <Skeleton className="ml-auto h-3.5 w-14" />
        <Skeleton className="h-3.5 w-12" />
        <Skeleton className="hidden h-3.5 w-14 md:block" />
        <Skeleton className="hidden h-6 w-24 rounded-full lg:block" />
      </div>
    ))}
  </div>
);
