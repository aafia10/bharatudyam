import { Award, BarChart3, Search, Sparkles, TrendingUp, Zap } from "lucide-react";

export function Hero() {
  return (
    <section className="bg-hero relative overflow-hidden">
      <div className="bg-grid pointer-events-none absolute inset-0 [mask-image:radial-gradient(70%_60%_at_50%_20%,#000,transparent)]" />
      <div className="relative mx-auto grid max-w-[1400px] items-center gap-16 px-6 py-24 lg:grid-cols-2 lg:py-28">
        <div>
          <div className="inline-flex animate-fade-up items-center gap-2 rounded-full border border-border bg-surface/70 px-5 py-3">
            <Sparkles className="size-4 text-violet" />
            <span className="text-[15px] font-medium text-foreground/90">
              Future of MSMEs in India
            </span>
          </div>

          <h1
            className="mt-10 animate-fade-up text-[56px] font-bold leading-[1.06] text-foreground sm:text-[68px] lg:text-[76px]"
            style={{ animationDelay: "120ms" }}
          >
            Empowering MSMEs with{" "}
            <span className="text-gradient-gold">AI-Powered Scheme Discovery</span>
          </h1>

          <p
            className="mt-8 max-w-xl animate-fade-up text-lg leading-relaxed text-muted-foreground"
            style={{ animationDelay: "240ms" }}
          >
            Find government schemes, subsidies, loans, and incentives tailored to your business
            instantly.
          </p>

          <div
            className="mt-10 flex animate-fade-up flex-wrap items-center gap-5"
            style={{ animationDelay: "360ms" }}
          >
            <button className="flex animate-glow items-center gap-3 rounded-full bg-gradient-gold px-9 py-4 text-lg font-semibold text-primary-foreground transition-transform duration-300 hover:scale-[1.03]">
              Get Started
              <Zap className="size-5" strokeWidth={2.4} />
            </button>
            <button className="flex items-center gap-3 rounded-full border border-border bg-surface/70 px-9 py-4 text-lg font-semibold text-foreground transition-all duration-300 hover:border-gold/40 hover:bg-surface-2">
              Explore Schemes
              <Search className="size-5" />
            </button>
          </div>
        </div>

        <div className="animate-float glass p-6" style={{ animationDelay: "200ms" }}>
          <div className="bg-eligibility flex items-center justify-between rounded-xl border border-border p-6">
            <div>
              <p className="text-[15px] text-muted-foreground">Eligibility Score</p>
              <p className="mt-1 text-4xl font-bold text-gold">94%</p>
            </div>
            <TrendingUp className="size-9 text-mint" strokeWidth={2.2} />
          </div>

          <div className="mt-5 grid grid-cols-2 gap-5">
            <div className="rounded-xl border border-border bg-surface-2/60 p-6">
              <BarChart3 className="size-6 text-violet" />
              <p className="mt-6 text-[15px] text-muted-foreground">Est. Subsidy</p>
              <p className="mt-1 text-2xl font-bold text-foreground">₹50L</p>
            </div>
            <div className="rounded-xl border border-border bg-surface-2/60 p-6">
              <Award className="size-6 text-violet" />
              <p className="mt-6 text-[15px] text-muted-foreground">Schemes Found</p>
              <p className="mt-1 text-2xl font-bold text-foreground">12</p>
            </div>
          </div>

          <div className="bg-eligibility mt-5 rounded-xl border border-border p-6">
            <div className="flex items-center gap-4">
              <span className="flex size-11 items-center justify-center rounded-full bg-gradient-gold">
                <Sparkles className="size-5 text-primary-foreground" />
              </span>
              <div>
                <p className="text-[17px] font-semibold text-foreground">PMEGP Scheme</p>
                <p className="text-[15px] text-mint">Highly Eligible</p>
              </div>
            </div>
            <div className="mt-5 h-2 w-full overflow-hidden rounded-full bg-surface-2">
              <div className="progress-bar h-full w-[88%] rounded-full bg-gradient-gold" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
