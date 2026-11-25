"use client";

import { ArrowUpRight, InstagramLogo, SealCheck } from "@phosphor-icons/react";
import CreatorAvatar from "./CreatorAvatar";
import { Creator } from "@/lib/models/creator";
import { cn } from "@/lib/utils/cn";
import { displayName, instagramUrl } from "@/lib/utils/format";

interface CreatorIdentityProps {
  creator: Creator;
  size?: "sm" | "md" | "lg";
  className?: string;
  /** Make the @username open the Instagram profile in a new tab. */
  linkUsername?: boolean;
}

const CreatorIdentity = ({ creator, size = "md", className, linkUsername }: CreatorIdentityProps) => (
  <div className={cn("flex min-w-0 items-center gap-3", className)}>
    <CreatorAvatar name={displayName(creator)} username={creator.username} size={size} ring />
    <div className="min-w-0">
      <p className="flex items-center gap-1 truncate text-[15px] font-bold tracking-tight text-charcoal">
        <span className="truncate">{displayName(creator)}</span>
        {creator.isVerified && (
          <SealCheck size={16} weight="fill" className="shrink-0 text-coral" aria-label="Verified" />
        )}
      </p>
      {linkUsername ? (
        <a
          href={instagramUrl(creator.username)}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()}
          onKeyDown={(e) => e.stopPropagation()}
          title={`Open @${creator.username} on Instagram`}
          className="group/ig inline-flex max-w-full items-center gap-1 truncate rounded text-[12.5px] font-medium text-charcoal-400 transition-colors hover:text-coral-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-coral/30"
        >
          <InstagramLogo size={14} weight="duotone" className="shrink-0" />
          <span className="truncate underline-offset-2 group-hover/ig:underline">@{creator.username}</span>
          <ArrowUpRight size={12} weight="bold" className="shrink-0 opacity-0 transition-opacity group-hover/ig:opacity-100" />
        </a>
      ) : (
        <p className="flex items-center gap-1 truncate text-[12.5px] font-medium text-charcoal-400">
          <InstagramLogo size={14} weight="duotone" className="shrink-0" />@{creator.username}
        </p>
      )}
    </div>
  </div>
);

export default CreatorIdentity;
