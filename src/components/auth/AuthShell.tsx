import { Link } from "@tanstack/react-router";
import { ArrowLeft, ShieldCheck, Sparkles, Lock } from "lucide-react";
import type { ReactNode } from "react";
import { Logo } from "@/components/msme/Logo";

const highlights = [
  { icon: Sparkles, text: "AI matches you to schemes in seconds" },
  { icon: ShieldCheck, text: "Verified business profiles, bank-grade checks" },
  { icon: Lock, text: "Your documents stay encrypted and private" },
];

export function AuthShell({
  eyebrow,
  title,
  subtitle,
  children,
  wide = false,
}: {
  eyebrow: string;
  title: ReactNode;
  subtitle: string;
  children: ReactNode;
  wide?: boolean;
}) {
  return (
    <div className="bg-hero relative min-h-screen overflow-hidden bg-background">
      <div className="bg-aurora pointer-events-none absolute inset-0 opacity-70" />
      <div className="bg-grid pointer-events-none absolute inset-0 opacity-60" />

      <div className="relative mx-auto flex min-h-screen max-w-[1400px] flex-col gap-10 px-6 py-8 lg:flex-row lg:items-center lg:gap-16 lg:py-14">
        {/* Brand panel */}
        <div className="flex-1">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-[14px] font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="size-4" />
            Back to home
          </Link>

          <div className="mt-10 flex items-center gap-4">
            <Logo size={56} />
            <span className="leading-tight">
              <span className="block text-2xl font-bold text-foreground">MSME Assist</span>
              <span className="block text-[13px] font-medium text-gold/80">
                AI-Powered Platform
              </span>
            </span>
          </div>

          <p className="mt-8 max-w-md text-[32px] leading-[1.2] font-bold text-foreground lg:text-[40px]">
            <span className="text-gradient-gold">Unlock</span> the schemes your business already
            qualifies for.
          </p>

          <ul className="mt-9 space-y-4">
            {highlights.map(({ icon: Icon, text }) => (
              <li key={text} className="flex items-center gap-3 text-[15px] text-muted-foreground">
                <span className="glass flex size-10 items-center justify-center rounded-xl">
                  <Icon className="size-[18px] text-mint" strokeWidth={2.2} />
                </span>
                {text}
              </li>
            ))}
          </ul>
        </div>

        {/* Form panel */}
        <div className={wide ? "w-full lg:max-w-[620px]" : "w-full lg:max-w-[460px]"}>
          <div className="glass relative overflow-hidden p-7 sm:p-9">
            <div className="bg-gradient-gold absolute inset-x-0 top-0 h-px opacity-70" />
            <p className="text-[12px] font-semibold tracking-[0.18em] text-gold uppercase">
              {eyebrow}
            </p>
            <h1 className="mt-3 text-[26px] leading-tight font-bold text-foreground">{title}</h1>
            <p className="mt-2 text-[14px] leading-relaxed text-muted-foreground">{subtitle}</p>
            <div className="mt-7">{children}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
