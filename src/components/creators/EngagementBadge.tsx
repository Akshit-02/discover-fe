import { Lightning } from "@phosphor-icons/react";
import Badge from "@/components/ui/Badge";
import { engagementQuality } from "@/lib/utils/format";

const tones = {
  great: "success",
  good: "coral",
  ok: "warning",
  low: "neutral",
  neutral: "neutral",
} as const;

const EngagementBadge = ({ rate }: { rate?: number | null }) => {
  const quality = engagementQuality(rate);
  if (quality.tone === "neutral") return null;
  return (
    <Badge tone={tones[quality.tone]} icon={<Lightning size={12} weight="fill" />}>
      {quality.label} engagement
    </Badge>
  );
};

export default EngagementBadge;
