import { Check, X } from "lucide-react";
import { passwordChecks } from "@/lib/auth-validation";
import { cn } from "@/lib/utils";

type PasswordMeterProps = {
  password: string;
};

export function PasswordMeter({
  password,
}: PasswordMeterProps) {
  const checks = passwordChecks(password);

  const score = checks.filter((check) => check.met).length;

  let label = "—";

  if (password.length > 0) {
    if (score <= 2) {
      label = "Weak";
    } else if (score === 3) {
      label = "Fair";
    } else if (score === 4) {
      label = "Good";
    } else {
      label = "Strong";
    }
  }

  return (
    <div className="mt-3">
      {/* Strength bars */}
      <div className="flex items-center gap-1.5">
        {[0, 1, 2, 3, 4].map((index) => (
          <span
            key={index}
            className={cn(
              "h-1.5 flex-1 rounded-full transition-all duration-500",
              index < score
                ? score <= 2
                  ? "bg-destructive"
                  : score === 3
                    ? "bg-gold"
                    : "bg-mint"
                : "bg-muted",
            )}
          />
        ))}
      </div>

      {/* Strength label */}
      <p className="mt-2 text-[12.5px] font-medium text-muted-foreground">
        Strength:{" "}
        <span className="text-foreground">
          {label}
        </span>
      </p>

      {/* Requirements */}
      <ul className="mt-2 flex flex-wrap gap-x-4 gap-y-1.5">
        {checks.map((check) => (
          <li
            key={check.label}
            className={cn(
              "flex items-center gap-1.5 text-[12px]",
              check.met
                ? "text-mint"
                : "text-muted-foreground",
            )}
          >
            {check.met ? (
              <Check className="size-3.5" />
            ) : (
              <X className="size-3.5" />
            )}

            {check.label}
          </li>
        ))}
      </ul>
    </div>
  );
}