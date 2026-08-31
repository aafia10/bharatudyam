import {
  ArrowRight,
  Map,
  Sparkles,
} from "lucide-react";

import { IndiaMap } from "./IndiaMap";

export function Hero() {
  return (
    <section className="bg-hero msme-hero relative overflow-hidden">
      {/* Background grid */}
      <div className="bg-grid pointer-events-none absolute inset-0 [mask-image:radial-gradient(75%_70%_at_50%_20%,#000,transparent)]" />

      {/* Background glow */}
      <div className="msme-hero-orb msme-hero-orb-one pointer-events-none" />
      <div className="msme-hero-orb msme-hero-orb-two pointer-events-none" />

      {/* Main Hero */}
      <div className="relative mx-auto grid max-w-[1400px] items-center gap-12 px-5 pb-16 pt-14 sm:px-6 sm:pb-20 sm:pt-20 lg:grid-cols-[0.86fr_1.14fr] lg:gap-10 lg:px-8 lg:py-24">

        {/* =====================================================
            LEFT — HERO CONTENT
        ===================================================== */}

        <div className="relative z-10 max-w-2xl">

          {/* Eyebrow */}
          <div
            className="msme-hero-badge animate-fade-up"
            style={{ animationDelay: "0ms" }}
          >
            <span className="msme-hero-badge-icon">
              <Sparkles className="size-3.5" />
            </span>

            <span>Future of MSMEs in India</span>

            <span className="msme-hero-badge-live">
              AI-powered
            </span>
          </div>

          {/* Heading */}
          <h1
            className="msme-hero-title mt-7 animate-fade-up"
            style={{ animationDelay: "120ms" }}
          >
            Empowering MSMEs with{" "}
            <span className="text-gradient-gold">
              AI-Powered Scheme Discovery
            </span>
          </h1>

          {/* Description */}
          <p
            className="msme-hero-description mt-6 max-w-xl animate-fade-up"
            style={{ animationDelay: "240ms" }}
          >
            Discover government schemes, subsidies, loans and incentives
            matched to your business — across India, state by state.
          </p>

          {/* CTA */}
          <div
            className="msme-hero-actions mt-8 animate-fade-up"
            style={{ animationDelay: "360ms" }}
          >
            <a
              href="/signup"
              className="msme-hero-primary animate-glow group"
            >
              <span>Get Started</span>

              <span className="msme-hero-primary-icon">
                <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5" />
              </span>
            </a>
          </div>

          {/* Trust indicators */}
          <div
            className="msme-hero-trust mt-8 animate-fade-up sm:mt-10"
            style={{ animationDelay: "480ms" }}
          >
            <div className="msme-hero-trust-item">
              <span className="msme-hero-trust-dot" />

              <span>
                State-wise
                <strong> discovery</strong>
              </span>
            </div>

            <span className="msme-hero-trust-divider" />

            <div className="msme-hero-trust-item">
              <Map className="size-3.5 text-gold" />

              <span>
                Government
                <strong> schemes</strong>
              </span>
            </div>

            <span className="msme-hero-trust-divider" />

            <div className="msme-hero-trust-item">
              <Sparkles className="size-3.5 text-mint" />

              <span>
                AI-assisted
                <strong> matching</strong>
              </span>
            </div>
          </div>
        </div>

        {/* =====================================================
            RIGHT — INDIA MAP
        ===================================================== */}

        <div
          className="relative z-10 min-w-0 animate-fade-up"
          style={{ animationDelay: "180ms" }}
        >
          <IndiaMap />
        </div>
      </div>

      {/* Bottom fade */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-b from-transparent to-background" />
    </section>
  );
}