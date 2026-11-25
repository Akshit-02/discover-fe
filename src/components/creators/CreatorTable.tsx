"use client";

import { nicheLabel } from "@/lib/constants/niches";
import { MapPin } from "@phosphor-icons/react";
import Badge from "@/components/ui/Badge";
import { Creator } from "@/lib/models/creator";
import { cn } from "@/lib/utils/cn";
import {
  compactList,
  engagementQuality,
  formatCompact,
  formatPercent,
  getTier,
  titleCase,
} from "@/lib/utils/format";
import CreatorIdentity from "./CreatorIdentity";
import AddToListButton from "@/components/lists/AddToListButton";

const erColor = {
  great: "text-emerald-600",
  good: "text-coral-600",
  ok: "text-tangerine-600",
  low: "text-charcoal-400",
  neutral: "text-charcoal-400",
};

const CreatorTable = ({
  creators,
  onOpen,
  renderAction,
  showNiches = true,
  showLocation = true,
}: {
  creators: Creator[];
  onOpen: (creator: Creator) => void;
  renderAction?: (creator: Creator) => React.ReactNode;
  showNiches?: boolean;
  showLocation?: boolean;
}) => (
  <div className="overflow-hidden rounded-3xl border border-sand-200/80 bg-white shadow-soft">
    <div className="scrollbar-thin overflow-x-auto">
      <table
        className={cn(
          "w-full text-left",
          showNiches || showLocation ? "min-w-[980px]" : "min-w-[720px]",
        )}
      >
        <thead>
          <tr className="border-b border-sand-100 bg-sand-50/60 text-[11px] font-semibold uppercase tracking-[0.08em] text-charcoal-400">
            <th className="px-5 py-3.5">Creator</th>
            <th className="px-4 py-3.5 text-right">Followers</th>
            <th className="px-4 py-3.5 text-right">Eng. rate</th>
            <th className="px-4 py-3.5 text-right">Avg. views</th>
            <th className="px-4 py-3.5 text-right">Avg. likes</th>
            {showNiches && <th className="px-4 py-3.5">Niches</th>}
            {showLocation && <th className="px-4 py-3.5">Location</th>}
            <th className="px-5 py-3.5" />
          </tr>
        </thead>
        <tbody>
          {creators.map((c) => {
            const niches = compactList(c.niches);
            const tier = getTier(c.followers);
            return (
              <tr
                key={c.id}
                onClick={() => onOpen(c)}
                className="group cursor-pointer border-b border-sand-100 transition-colors last:border-0 hover:bg-cream/60"
              >
                <td className="px-5 py-3.5">
                  <CreatorIdentity creator={c} size="lg" linkUsername />
                </td>
                <td className="px-4 py-3.5 text-right">
                  <p className="text-sm font-bold text-charcoal">
                    {formatCompact(c.followers)}
                  </p>
                  {tier && (
                    <p className="text-[11px] font-medium text-charcoal-300">
                      {tier}
                    </p>
                  )}
                </td>
                <td
                  className={cn(
                    "px-4 py-3.5 text-right text-sm font-bold",
                    erColor[engagementQuality(c.avgEngagementRate).tone],
                  )}
                >
                  {formatPercent(c.avgEngagementRate)}
                </td>
                <td className="px-4 py-3.5 text-right text-sm font-semibold text-charcoal-600">
                  {formatCompact(c.avgViews)}
                </td>
                <td className="px-4 py-3.5 text-right text-sm font-semibold text-charcoal-600">
                  {formatCompact(c.avgLikes)}
                </td>
                {showNiches && (
                  <td className="px-4 py-3.5">
                    <div className="flex max-w-[220px] flex-wrap gap-1">
                      {niches.slice(0, 2).map((n) => (
                        <Badge key={n} tone="outline">
                          {nicheLabel(n)}
                        </Badge>
                      ))}
                      {niches.length > 2 && <Badge>+{niches.length - 2}</Badge>}
                    </div>
                  </td>
                )}
                {showLocation && (
                  <td className="px-4 py-3.5">
                    <span className="flex items-center gap-1 text-[13px] text-charcoal-500">
                      <MapPin
                        size={14}
                        weight="duotone"
                        className="shrink-0 text-coral"
                      />
                      {titleCase(c.city || c.country) || "—"}
                    </span>
                  </td>
                )}
                <td className="px-5 py-3.5">
                  <div className="flex justify-end gap-1.5">
                    <AddToListButton creator={c} />
                    {renderAction?.(c)}
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  </div>
);

export default CreatorTable;
