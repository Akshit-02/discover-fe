import { cn } from "@/lib/utils/cn";

const Skeleton = ({ className }: { className?: string }) => (
  <div
    className={cn(
      "animate-shimmer rounded-lg bg-[linear-gradient(90deg,#EFECE7_0px,#F8F6F3_120px,#EFECE7_240px)] bg-[length:800px_100%]",
      className,
    )}
  />
);

export default Skeleton;
