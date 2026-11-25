"use client";

import { Eye, Heart, UsersThree } from "@phosphor-icons/react";
import Badge from "@/components/ui/Badge";
import { Creator } from "@/lib/models/creator";
import { formatCompact, formatPercent, getTier } from "@/lib/utils/format";
import CreatorIdentity from "./CreatorIdentity";
import EngagementBadge from "./EngagementBadge";
import AddToListButton from "@/components/lists/AddToListButton";

interface CreatorCardProps {
  creator: Creator;
  onOpen: (creator: Creator) => void;
  index?: number;
  renderAction?: (creator: Creator) => React.ReactNode;
}

const Metric = ({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) => (
  <div className="min-w-0">
    <p className="flex items-center gap-1 whitespace-nowrap text-[11px] font-medium text-charcoal-400">
      {icon}
      {label}
    </p>
    <p className="mt-0.5 truncate text-[17px] font-bold tracking-tight text-charcoal">{value}</p>
  </div>
);

const CreatorCard = ({ creator, onOpen, index = 0, renderAction }: CreatorCardProps) => {
  const tier = getTier(creator.followers);

  return (
    <article
      role="button"
      tabIndex={0}
      onClick={() => onOpen(creator)}
      onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && (e.preventDefault(), onOpen(creator))}
      style={{ animationDelay: `${Math.min(index, 12) * 30}ms` }}
      className="group relative flex animate-fade-up cursor-pointer flex-col rounded-3xl border border-sand-200/80 bg-white p-5 shadow-soft transition-all duration-300 hover:-translate-y-0.5 hover:border-coral/30 hover:shadow-lift focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-coral/20"
    >
      <div className="flex items-start justify-between gap-3">
        <CreatorIdentity creator={creator} />
        <div className="flex shrink-0 gap-1.5">
          <AddToListButton creator={creator} />
          {renderAction?.(creator)}
        </div>
      </div>

      <div className="mt-4 flex flex-wrap gap-1.5">
        {tier && <Badge tone="dark">{tier}</Badge>}
        <EngagementBadge rate={creator.avgEngagementRate} />
      </div>

      <div className="mt-4 grid grid-cols-3 gap-3 rounded-2xl bg-cream/70 px-4 py-3.5">
        <Metric
          icon={<UsersThree size={13} weight="duotone" />}
          label="Followers"
          value={formatCompact(creator.followers)}
        />
        <Metric
          icon={<Heart size={13} weight="duotone" />}
          label="Eng."
          value={formatPercent(creator.avgEngagementRate)}
        />
        <Metric
          icon={<Eye size={13} weight="duotone" />}
          label="Views"
          value={formatCompact(creator.avgViews)}
        />
      </div>

      <div className="mt-3 flex items-center gap-4 px-1 pb-1 text-[12px] font-medium text-charcoal-400">
        <span className="flex items-center gap-1">
          <Heart size={13} weight="fill" className="text-coral-300" />
          {formatCompact(creator.avgLikes)} likes
        </span>
      </div>

    </article>
  );
};

export default CreatorCard;
