import { AlertCircle, Eye, EyeOff } from "lucide-react";
import { useState, type InputHTMLAttributes, type ReactNode } from "react";
import { cn } from "@/lib/utils";

type BaseProps = {
  label: string;
  error?: string | undefined;
  hint?: ReactNode;
  icon?: ReactNode;
};

const controlClass =
  "w-full rounded-xl border border-input bg-surface-2/60 px-4 py-3 text-[15px] text-foreground outline-none transition-all duration-300 placeholder:text-muted-foreground/60 focus:border-gold/60 focus:ring-2 focus:ring-ring";

export function FieldShell({
  label,
  error,
  hint,
  children,
}: BaseProps & { children: ReactNode }) {
  return (
    <label className="block">
      <span className="mb-2 block text-[13px] font-semibold text-foreground/90">{label}</span>
      {children}
      {error ? (
        <span className="mt-2 flex items-center gap-1.5 text-[12.5px] font-medium text-destructive">
          <AlertCircle className="size-3.5 shrink-0" />
          {error}
        </span>
      ) : hint ? (
        <span className="mt-2 block text-[12.5px] text-muted-foreground">{hint}</span>
      ) : null}
    </label>
  );
}

export function TextField({
  label,
  error,
  hint,
  icon,
  className,
  ...props
}: BaseProps & InputHTMLAttributes<HTMLInputElement>) {
  return (
    <FieldShell label={label} error={error} hint={hint}>
      <span className="relative block">
        {icon ? (
          <span className="pointer-events-none absolute top-1/2 left-4 -translate-y-1/2 text-muted-foreground">
            {icon}
          </span>
        ) : null}
        <input
          {...props}
          aria-invalid={Boolean(error)}
          className={cn(
            controlClass,
            icon && "pl-11",
            error && "border-destructive/60 focus:border-destructive focus:ring-destructive/25",
            className,
          )}
        />
      </span>
    </FieldShell>
  );
}

export function PasswordField({
  label,
  error,
  hint,
  ...props
}: BaseProps & InputHTMLAttributes<HTMLInputElement>) {
  const [visible, setVisible] = useState(false);
  return (
    <FieldShell label={label} error={error} hint={hint}>
      <span className="relative block">
        <input
          {...props}
          type={visible ? "text" : "password"}
          aria-invalid={Boolean(error)}
          className={cn(
            controlClass,
            "pr-12",
            error && "border-destructive/60 focus:border-destructive focus:ring-destructive/25",
          )}
        />
        <button
          type="button"
          onClick={() => setVisible((value) => !value)}
          aria-label={visible ? "Hide password" : "Show password"}
          className="absolute top-1/2 right-3 -translate-y-1/2 rounded-lg p-1.5 text-muted-foreground transition-colors hover:text-gold"
        >
          {visible ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
        </button>
      </span>
    </FieldShell>
  );
}

export function SelectField({
  label,
  error,
  hint,
  options,
  placeholder,
  ...props
}: BaseProps & {
  options: readonly string[];
  placeholder: string;
} & InputHTMLAttributes<HTMLSelectElement>) {
  return (
    <FieldShell label={label} error={error} hint={hint}>
      <select
        {...(props as object)}
        aria-invalid={Boolean(error)}
        className={cn(
          controlClass,
          "appearance-none",
          error && "border-destructive/60 focus:border-destructive focus:ring-destructive/25",
        )}
      >
        <option value="">{placeholder}</option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </FieldShell>
  );
}