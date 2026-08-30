import { useEffect, useState } from "react";
import { Logo } from "./Logo";

/** Full-screen branded splash that plays on every page load / refresh. */
export function BrandLoader() {
  const [phase, setPhase] = useState<"visible" | "leaving" | "gone">("visible");

  useEffect(() => {
    const reduced =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

    if (reduced) {
      setPhase("gone");
      return;
    }

    document.body.style.overflow = "hidden";
    const leave = window.setTimeout(() => setPhase("leaving"), 1500);
    const done = window.setTimeout(() => {
      setPhase("gone");
      document.body.style.overflow = "";
    }, 2100);

    return () => {
      window.clearTimeout(leave);
      window.clearTimeout(done);
      document.body.style.overflow = "";
    };
  }, []);

  if (phase === "gone") return null;

  return (
    <div
      aria-hidden
      className={`splash fixed inset-0 z-[200] flex flex-col items-center justify-center ${
        phase === "leaving" ? "splash-leaving" : ""
      }`}
    >
      <div className="splash-aurora pointer-events-none absolute inset-0" />

      <div className="relative flex flex-col items-center">
        <Logo size={104} className="splash-mark" />

        <p className="splash-word mt-8 text-3xl font-bold tracking-tight sm:text-4xl">
          Bharat Udyam
        </p>
        <p className="splash-sub mt-3 text-sm font-medium tracking-[0.28em] text-muted-foreground uppercase">
          For the Businesses That Build Bharat.
        </p>

        <div className="mt-10 h-[3px] w-56 overflow-hidden rounded-full bg-surface-2">
          <div className="splash-progress h-full rounded-full bg-gradient-gold" />
        </div>
      </div>
    </div>
  );
}
