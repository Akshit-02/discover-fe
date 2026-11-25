import { Check, Circle } from "@phosphor-icons/react";
import { cn } from "@/lib/utils/cn";

export const PASSWORD_RULES = [
  { label: "8+ characters", test: (p: string) => p.length >= 8 },
  { label: "Uppercase", test: (p: string) => /[A-Z]/.test(p) },
  { label: "Lowercase", test: (p: string) => /[a-z]/.test(p) },
  { label: "Number", test: (p: string) => /\d/.test(p) },
  { label: "Symbol", test: (p: string) => /[^A-Za-z0-9]/.test(p) },
];

export const isStrongPassword = (password: string) =>
  PASSWORD_RULES.every((rule) => rule.test(password));

const PasswordStrength = ({ password }: { password: string }) => {
  const passed = PASSWORD_RULES.filter((r) => r.test(password)).length;
  const colors = ["bg-sand-200", "bg-red-400", "bg-red-400", "bg-tangerine", "bg-tangerine", "bg-emerald-500"];

  return (
    <div className="space-y-2.5 pt-1">
      <div className="flex gap-1.5">
        {PASSWORD_RULES.map((_, i) => (
          <span
            key={i}
            className={cn(
              "h-1 flex-1 rounded-full transition-colors duration-300",
              i < passed ? colors[passed] : "bg-sand-200",
            )}
          />
        ))}
      </div>
      <div className="flex flex-wrap gap-x-3 gap-y-1.5">
        {PASSWORD_RULES.map((rule) => {
          const ok = rule.test(password);
          return (
            <span
              key={rule.label}
              className={cn(
                "inline-flex items-center gap-1 text-xs font-medium transition-colors",
                ok ? "text-emerald-600" : "text-charcoal-300",
              )}
            >
              {ok ? <Check size={12} weight="bold" /> : <Circle size={10} weight="bold" />}
              {rule.label}
            </span>
          );
        })}
      </div>
    </div>
  );
};

export default PasswordStrength;
