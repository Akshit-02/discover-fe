import { WarningCircle, CheckCircle } from "@phosphor-icons/react";
import { cn } from "@/lib/utils/cn";

const FormAlert = ({ message, tone = "error" }: { message?: string | null; tone?: "error" | "success" }) =>
  message ? (
    <div
      role="alert"
      className={cn(
        "flex animate-fade-up items-start gap-2.5 rounded-xl border px-3.5 py-3 text-[13.5px] font-medium",
        tone === "error"
          ? "border-red-200 bg-red-50 text-red-700"
          : "border-emerald-200 bg-emerald-50 text-emerald-700",
      )}
    >
      {tone === "error" ? (
        <WarningCircle size={18} weight="duotone" className="mt-px shrink-0" />
      ) : (
        <CheckCircle size={18} weight="duotone" className="mt-px shrink-0" />
      )}
      {message}
    </div>
  ) : null;

export default FormAlert;
