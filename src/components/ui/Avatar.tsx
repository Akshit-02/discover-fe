import { cn } from "@/lib/utils/cn";
import { initials } from "@/lib/utils/format";

const GRADIENTS = [
  "from-[#F36B4A] to-[#FFAD66]",
  "from-[#202124] to-[#55565C]",
  "from-[#E04E2B] to-[#F7A38A]",
  "from-[#FF9533] to-[#FFD6B0]",
  "from-[#3C3D42] to-[#F36B4A]",
  "from-[#B93B1D] to-[#FFAD66]",
];

const hash = (value: string) =>
  [...value].reduce((acc, ch) => (acc * 31 + ch.charCodeAt(0)) >>> 0, 7);

interface AvatarProps {
  name: string;
  seed?: string;
  size?: "sm" | "md" | "lg" | "xl";
  ring?: boolean;
  className?: string;
}

const sizes = {
  sm: "h-8 w-8 text-[11px]",
  md: "h-11 w-11 text-sm",
  lg: "h-14 w-14 text-base",
  xl: "h-20 w-20 text-2xl",
};

const Avatar = ({ name, seed, size = "md", ring, className }: AvatarProps) => (
  <span
    className={cn(
      "relative inline-flex shrink-0 select-none items-center justify-center rounded-full bg-gradient-to-br font-bold tracking-tight text-white",
      GRADIENTS[hash(seed || name) % GRADIENTS.length],
      ring && "ring-[3px] ring-white shadow-soft",
      sizes[size],
      className,
    )}
    aria-hidden
  >
    {initials(name) || "?"}
  </span>
);

export default Avatar;
