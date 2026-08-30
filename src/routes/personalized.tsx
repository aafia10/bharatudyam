import { createFileRoute } from "@tanstack/react-router";
import {
  ArrowRight,
  BrainCircuit,
  Check,
  CheckCircle2,
  ChevronRight,
  Clock3,
  FileCheck2,
  Gauge,
  Lightbulb,
  RefreshCw,
  ShieldCheck,
  Sparkles,
  Target,
  TrendingUp,
  UserRound,
  Zap,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";

import { AppShell } from "@/components/app/AppShell";
import { useAuthGuard } from "@/hooks/use-auth-guard";
import { documents, recommendations } from "@/lib/app-data";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/personalized")({
  head: () => ({
    meta: [
      {
        title: "AI Eligibility Engine — Bharat Udyam",
      },
      {
        name: "description",
        content:
          "Get personalized MSME government scheme recommendations based on your business profile and documents.",
      },
      {
        property: "og:title",
        content: "AI Eligibility Engine — Bharat Udyam",
      },
      {
        property: "og:description",
        content:
          "Personalized government scheme recommendations for your MSME.",
      },
      {
        property: "og:type",
        content: "website",
      },
      {
        name: "twitter:card",
        content: "summary_large_image",
      },
    ],
  }),
  component: PersonalizedPage,
});

type AnalysisState = "idle" | "running" | "done";

function PersonalizedPage() {
  const { user, name, loading } = useAuthGuard();

  const [state, setState] =
    useState<AnalysisState>("idle");

  const [progress, setProgress] =
    useState(0);

  const displayName =
    name || "there";

  const businessName =
    user?.businessName ||
    "your business";

  /* ================================================================ */
  /* DOCUMENT CALCULATIONS                                             */
  /* ================================================================ */

  const uploadedDocuments = useMemo(
    () =>
      documents.filter(
        (doc) =>
          doc.state !== "missing",
      ).length,
    [],
  );

  const totalDocuments =
    documents.length;

  const verifiedDocuments = useMemo(
    () =>
      documents.filter(
        (doc) =>
          doc.state === "verified",
      ).length,
    [],
  );

  /* ================================================================ */
  /* PROFILE COMPLETION                                                */
  /* ================================================================ */

  const profileFields = [
    user?.businessName,
    user?.businessType,
    user?.industrySector ||
      user?.sector,
    user?.state,
    user?.annualTurnover ||
      user?.turnover,
    user?.numberOfEmployees ||
      user?.employees,
  ];

  const completedProfileFields =
    profileFields.filter(Boolean)
      .length;

  const profileCompletion = Math.round(
    (completedProfileFields /
      profileFields.length) *
      100,
  );

  const documentCompletion =
    Math.round(
      (uploadedDocuments /
        totalDocuments) *
        100,
    );

  const readinessScore = Math.round(
    profileCompletion * 0.6 +
      documentCompletion * 0.4,
  );

  /* ================================================================ */
  /* ANALYSIS ANIMATION                                                */
  /* ================================================================ */

  useEffect(() => {
    if (state !== "running") {
      return;
    }

    setProgress(0);

    const interval =
      window.setInterval(() => {
        setProgress((current) => {
          if (current >= 100) {
            window.clearInterval(
              interval,
            );

            return 100;
          }

          return Math.min(
            current + 4,
            100,
          );
        });
      }, 60);

    const timeout =
      window.setTimeout(() => {
        setState("done");
      }, 1650);

    return () => {
      window.clearInterval(
        interval,
      );

      window.clearTimeout(timeout);
    };
  }, [state]);

  /* ================================================================ */
  /* LOADING                                                           */
  /* ================================================================ */

  if (loading) {
    return (
      <AppShell>
        <div className="flex min-h-[65vh] items-center justify-center px-4">
          <div className="flex flex-col items-center">

            <div className="relative flex size-16 items-center justify-center">

              <div className="absolute inset-0 animate-spin rounded-full border border-gold/10 border-t-gold" />

              <div className="absolute inset-2 animate-pulse rounded-full bg-gold/5" />

              <Sparkles className="relative size-5 text-gold" />

            </div>

            <p className="mt-5 text-sm text-muted-foreground">
              Loading your eligibility profile...
            </p>

          </div>
        </div>
      </AppShell>
    );
  }

  const runAnalysis = () => {
    setProgress(0);
    setState("running");
  };

  return (
    <AppShell>

      <style>{`

        /* ============================================================
           ENTRY
        ============================================================ */

        @keyframes bu-ai-enter {
          from {
            opacity: 0;
            transform:
              translateY(22px)
              scale(.985);
          }

          to {
            opacity: 1;
            transform:
              translateY(0)
              scale(1);
          }
        }

        .bu-ai-enter {
          animation:
            bu-ai-enter
            .7s
            cubic-bezier(.16,1,.3,1)
            both;
        }

        .bu-ai-delay-1 {
          animation-delay: .08s;
        }

        .bu-ai-delay-2 {
          animation-delay: .16s;
        }

        .bu-ai-delay-3 {
          animation-delay: .24s;
        }

        .bu-ai-delay-4 {
          animation-delay: .32s;
        }

        /* ============================================================
           SCALE
        ============================================================ */

        @keyframes bu-ai-scale {
          from {
            opacity: 0;
            transform: scale(.94);
          }

          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        .bu-ai-scale {
          animation:
            bu-ai-scale
            .55s
            cubic-bezier(.16,1,.3,1)
            both;
        }

        /* ============================================================
           FLOAT
        ============================================================ */

        @keyframes bu-ai-float {
          0%,
          100% {
            transform: translateY(0);
          }

          50% {
            transform: translateY(-7px);
          }
        }

        .bu-ai-float {
          animation:
            bu-ai-float
            4s
            ease-in-out
            infinite;
        }

        /* ============================================================
           ORB PULSE
        ============================================================ */

        @keyframes bu-ai-orb {
          0%,
          100% {
            opacity: .35;
            transform: scale(.9);
          }

          50% {
            opacity: .8;
            transform: scale(1.08);
          }
        }

        .bu-ai-orb {
          animation:
            bu-ai-orb
            3.2s
            ease-in-out
            infinite;
        }

        /* ============================================================
           ROTATING RING
        ============================================================ */

        @keyframes bu-ai-ring {
          from {
            transform:
              rotate(0deg);
          }

          to {
            transform:
              rotate(360deg);
          }
        }

        .bu-ai-ring {
          animation:
            bu-ai-ring
            14s
            linear
            infinite;
        }

        .bu-ai-ring-reverse {
          animation:
            bu-ai-ring
            18s
            linear
            infinite
            reverse;
        }

        /* ============================================================
           SHIMMER
        ============================================================ */

        @keyframes bu-ai-shimmer {
          from {
            transform:
              translateX(-140%);
          }

          to {
            transform:
              translateX(140%);
          }
        }

        .bu-ai-shimmer {
          position: relative;
          overflow: hidden;
        }

        .bu-ai-shimmer::after {
          content: "";
          position: absolute;
          top: 0;
          bottom: 0;
          left: 0;
          width: 35%;

          background:
            linear-gradient(
              90deg,
              transparent,
              rgba(255,255,255,.09),
              transparent
            );

          transform:
            translateX(-140%);

          animation:
            bu-ai-shimmer
            3.5s
            ease-in-out
            infinite;
        }

        /* ============================================================
           CARD HOVER
        ============================================================ */

        .bu-ai-card {
          transition:
            transform .35s
              cubic-bezier(.16,1,.3,1),
            border-color .35s ease,
            background-color .35s ease,
            box-shadow .35s ease;
        }

        .bu-ai-card:hover {
          transform:
            translateY(-4px);

          border-color:
            rgba(240,190,70,.2);

          box-shadow:
            0 18px 45px
            rgba(0,0,0,.13);
        }

        /* ============================================================
           ICON HOVER
        ============================================================ */

        .bu-ai-icon {
          transition:
            transform .35s
              cubic-bezier(.16,1,.3,1);
        }

        .group:hover .bu-ai-icon {
          transform:
            scale(1.08)
            rotate(-3deg);
        }

        /* ============================================================
           PROGRESS
        ============================================================ */

        @keyframes bu-ai-progress {
          from {
            width: 0;
          }
        }

        .bu-ai-progress {
          animation:
            bu-ai-progress
            1.2s
            cubic-bezier(.16,1,.3,1)
            both;
        }

        /* ============================================================
           REDUCED MOTION
        ============================================================ */

        @media (
          prefers-reduced-motion: reduce
        ) {
          .bu-ai-enter,
          .bu-ai-scale,
          .bu-ai-float,
          .bu-ai-orb,
          .bu-ai-ring,
          .bu-ai-ring-reverse,
          .bu-ai-progress {
            animation: none !important;
          }

          .bu-ai-card,
          .bu-ai-icon {
            transition: none !important;
          }

          .bu-ai-shimmer::after {
            display: none;
          }
        }

      `}</style>

      <main className="min-w-0">

        <div className="mx-auto w-full max-w-[1380px] px-3 pb-10 pt-2 sm:px-5 sm:pb-12 lg:px-7 xl:px-8">

          {/* ============================================================
             HERO
          ============================================================ */}

          <section className="bu-ai-enter relative overflow-hidden rounded-[24px] border border-border/60 bg-surface/25 p-5 sm:rounded-[30px] sm:p-8 lg:p-10">

            {/* ambient glow */}

            <div className="pointer-events-none absolute -right-28 -top-28 size-72 rounded-full bg-gold/[.07] blur-3xl bu-ai-orb" />

            <div className="pointer-events-none absolute -bottom-28 left-1/3 size-64 rounded-full bg-cyan/[.04] blur-3xl" />

            <div className="relative z-10 grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">

              {/* HERO TEXT */}

              <div className="min-w-0">

                <div className="flex flex-wrap items-center gap-2">

                  <span className="flex items-center gap-1.5 rounded-full border border-gold/20 bg-gold/[.06] px-3 py-1.5 text-[9px] font-semibold uppercase tracking-[.15em] text-gold sm:text-[10px]">

                    <Sparkles className="size-3" />

                    AI Eligibility Engine

                  </span>

                  <span className="hidden text-[11px] text-muted-foreground sm:block">
                    Bharat Udyam Intelligence
                  </span>

                </div>

                <h1 className="mt-5 max-w-3xl text-[28px] font-bold leading-[1.08] tracking-[-.035em] text-foreground sm:text-[40px] lg:text-[48px]">

                  Find schemes that fit{" "}

                  <span className="text-gradient-gold">
                    {displayName}
                  </span>

                </h1>

                <p className="mt-4 max-w-2xl text-[12.5px] leading-6 text-muted-foreground sm:text-[14px] sm:leading-7">

                  Our eligibility engine analyzes your
                  business profile and uploaded documents
                  to identify government schemes that are
                  most relevant to{" "}

                  <span className="font-medium text-foreground">
                    {businessName}
                  </span>
                  .

                </p>

                <div className="mt-5 grid max-w-xl grid-cols-1 gap-2 sm:grid-cols-2 sm:gap-3">

                  <FeaturePill
                    icon={UserRound}
                    text="Profile-based analysis"
                  />

                  <FeaturePill
                    icon={FileCheck2}
                    text="Document-aware matching"
                  />

                </div>

              </div>

              {/* AI ORB */}

              <div className="mx-auto lg:mx-0">

                <div className="relative flex size-36 items-center justify-center sm:size-44">

                  <div className="absolute inset-0 rounded-full bg-gold/10 blur-2xl bu-ai-orb" />

                  <div className="bu-ai-ring absolute inset-1 rounded-full border border-dashed border-gold/15" />

                  <div className="bu-ai-ring-reverse absolute inset-4 rounded-full border border-gold/10" />

                  <div className="absolute inset-8 rounded-full border border-gold/10" />

                  <div className="bu-ai-float relative flex size-20 items-center justify-center rounded-[22px] bg-gradient-gold shadow-gold sm:size-24 sm:rounded-[26px]">

                    <BrainCircuit
                      className="size-9 text-primary-foreground sm:size-11"
                      strokeWidth={1.8}
                    />

                  </div>

                  <span className="absolute right-5 top-4 size-1.5 rounded-full bg-mint bu-ai-orb" />

                  <span className="absolute bottom-7 left-4 size-1 rounded-full bg-gold bu-ai-orb" />

                </div>

              </div>

            </div>

          </section>

          {/* ============================================================
             READINESS
          ============================================================ */}

          <section className="bu-ai-enter bu-ai-delay-1 mt-5 grid gap-3 sm:mt-6 md:grid-cols-3">

            <ReadinessCard
              icon={UserRound}
              label="Business Profile"
              value={`${profileCompletion}%`}
              description={
                profileCompletion >= 80
                  ? "Ready for analysis"
                  : "Complete more details for better matching"
              }
              progress={
                profileCompletion
              }
              tone="gold"
            />

            <ReadinessCard
              icon={FileCheck2}
              label="Documents"
              value={`${uploadedDocuments}/${totalDocuments}`}
              description={`${verifiedDocuments} verified documents`}
              progress={
                documentCompletion
              }
              tone="mint"
            />

            <ReadinessCard
              icon={Gauge}
              label="Eligibility Readiness"
              value={`${readinessScore}%`}
              description={
                readinessScore >= 80
                  ? "Strong profile readiness"
                  : "More information can improve results"
              }
              progress={
                readinessScore
              }
              tone="violet"
            />

          </section>

          {/* ============================================================
             ANALYSIS
          ============================================================ */}

          <section className="bu-ai-enter bu-ai-delay-2 relative mt-5 overflow-hidden rounded-[24px] border border-border/60 bg-surface/25 p-5 sm:mt-6 sm:p-7 lg:p-8">

            <div className="pointer-events-none absolute -right-24 -top-24 size-64 rounded-full bg-gold/[.05] blur-3xl" />

            <div className="relative">

              {/* HEADER */}

              <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">

                <div className="min-w-0">

                  <div className="flex items-center gap-2">

                    <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-gold/10 text-gold sm:size-9">

                      <Target className="size-4" />

                    </span>

                    <span className="text-[9px] font-semibold uppercase tracking-[.16em] text-gold sm:text-[10px]">
                      Smart Matching
                    </span>

                  </div>

                  <h2 className="mt-3 text-[20px] font-bold text-foreground sm:text-[25px]">
                    Run your eligibility analysis
                  </h2>

                  <p className="mt-2 max-w-2xl text-[11.5px] leading-5.5 text-muted-foreground sm:text-[13px] sm:leading-6">

                    We compare your business characteristics,
                    industry, financial information and verified
                    documents against scheme requirements.

                  </p>

                </div>

                {state === "done" ? (

                  <span className="flex w-fit shrink-0 items-center gap-1.5 rounded-full bg-mint/10 px-2.5 py-1.5 text-[9px] font-semibold text-mint sm:px-3 sm:text-[10px]">

                    <CheckCircle2 className="size-3.5" />

                    Analysis Complete

                  </span>

                ) : (

                  <span className="flex w-fit shrink-0 items-center gap-1.5 rounded-full border border-border/60 bg-surface/40 px-2.5 py-1.5 text-[9px] text-muted-foreground sm:px-3 sm:text-[10px]">

                    <Zap className="size-3 text-gold" />

                    Ready to analyze

                  </span>

                )}

              </div>

              {/* ANALYSIS STEPS */}

              <div className="mt-6 grid gap-2.5 sm:grid-cols-2 lg:grid-cols-4">

                <AnalysisStep
                  number="01"
                  title="Profile"
                  description="Business details"
                  complete={
                    profileCompletion > 0
                  }
                  delay={0}
                />

                <AnalysisStep
                  number="02"
                  title="Documents"
                  description="Uploaded records"
                  complete={
                    uploadedDocuments > 0
                  }
                  delay={80}
                />

                <AnalysisStep
                  number="03"
                  title="Eligibility"
                  description="Scheme criteria"
                  complete={
                    state === "done"
                  }
                  delay={160}
                />

                <AnalysisStep
                  number="04"
                  title="Matches"
                  description="Personalized results"
                  complete={
                    state === "done"
                  }
                  delay={240}
                />

              </div>

              {/* RUNNING */}

              {state === "running" && (

                <div className="bu-ai-scale mt-5 rounded-2xl border border-gold/15 bg-gold/[.045] p-4 sm:mt-6 sm:p-5">

                  <div className="flex items-center justify-between gap-3">

                    <div className="flex min-w-0 items-center gap-3">

                      <span className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-gold/10">

                        <RefreshCw className="size-4 animate-spin text-gold" />

                      </span>

                      <div className="min-w-0">

                        <p className="truncate text-[11.5px] font-semibold text-foreground sm:text-[13px]">
                          Analyzing your business profile
                        </p>

                        <p className="mt-0.5 truncate text-[9px] text-muted-foreground sm:text-[10.5px]">
                          Comparing profile and document signals...
                        </p>

                      </div>

                    </div>

                    <span className="shrink-0 text-[13px] font-bold text-gold sm:text-sm">
                      {progress}%
                    </span>

                  </div>

                  <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-surface-2">

                    <div
                      className="h-full rounded-full bg-gradient-gold transition-all duration-100"
                      style={{
                        width: `${progress}%`,
                      }}
                    />

                  </div>

                  <div className="mt-3 flex items-center justify-between text-[8px] text-muted-foreground">

                    <span>
                      Processing eligibility signals
                    </span>

                    <span>
                      Please wait
                    </span>

                  </div>

                </div>

              )}

              {/* BUTTON */}

              <button
                type="button"
                disabled={
                  state === "running"
                }
                onClick={
                  runAnalysis
                }
                className={cn(
                  "bu-ai-shimmer mt-5 flex min-h-12 w-full items-center justify-center gap-2 rounded-xl px-5 py-3.5 text-[12px] font-semibold transition-all duration-300 sm:mt-6 sm:min-h-13 sm:rounded-2xl sm:text-[13px]",
                  state === "running"
                    ? "cursor-not-allowed bg-surface-2 text-muted-foreground"
                    : "bg-gradient-gold text-primary-foreground shadow-gold hover:-translate-y-0.5 hover:shadow-[0_12px_35px_rgba(240,190,70,.2)] active:translate-y-0",
                )}
              >

                {state ===
                "running" ? (
                  <>
                    <RefreshCw className="size-4 animate-spin" />

                    Analyzing your eligibility...

                  </>
                ) : state ===
                  "done" ? (
                  <>
                    <RefreshCw className="size-4" />

                    Re-analyze Eligibility

                  </>
                ) : (
                  <>
                    <Sparkles className="size-4" />

                    Analyze My Eligibility

                    <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />

                  </>
                )}

              </button>

            </div>

          </section>

          {/* ============================================================
             RESULTS
          ============================================================ */}

          {state === "done" ? (

            <section className="bu-ai-scale mt-8 sm:mt-10">

              <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">

                <div>

                  <div className="flex items-center gap-2">

                    <span className="bu-ai-orb size-1.5 rounded-full bg-mint" />

                    <span className="text-[9px] font-semibold uppercase tracking-[.17em] text-mint sm:text-[10px]">
                      Personalized Results
                    </span>

                  </div>

                  <h2 className="mt-2 text-[22px] font-bold tracking-tight text-foreground sm:text-[27px]">
                    Your top scheme matches
                  </h2>

                  <p className="mt-1 text-[11px] text-muted-foreground sm:text-[13px]">
                    Based on the information currently available in your profile.
                  </p>

                </div>

                <div className="flex items-center gap-1.5 text-[9px] text-muted-foreground sm:text-xs">

                  <ShieldCheck className="size-3.5 text-mint sm:size-4" />

                  Matching completed

                </div>

              </div>

              <div className="mt-5 grid gap-3.5 sm:mt-6 lg:grid-cols-3">

                {recommendations.map(
                  (
                    scheme,
                    index,
                  ) => (

                    <SchemeMatchCard
                      key={
                        scheme.code
                      }
                      scheme={
                        scheme
                      }
                      index={
                        index
                      }
                    />

                  ),
                )}

              </div>

              <div className="mt-4 flex items-start gap-3 rounded-2xl border border-gold/15 bg-gold/[.045] p-4 sm:mt-6 sm:gap-4 sm:p-5">

                <span className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-gold/10 text-gold sm:size-10">

                  <Lightbulb className="size-4 sm:size-5" />

                </span>

                <div>

                  <p className="text-[11.5px] font-semibold text-foreground sm:text-[13.5px]">
                    Improve your matching accuracy
                  </p>

                  <p className="mt-1 text-[10px] leading-4.5 text-muted-foreground sm:text-[12px] sm:leading-5">

                    Upload the remaining financial documents
                    and complete missing business information.
                    Your recommendations can become more precise
                    as your profile gets richer.

                  </p>

                </div>

              </div>

            </section>

          ) : (

            <section className="bu-ai-enter bu-ai-delay-3 mt-5 grid gap-3 sm:mt-7 md:grid-cols-3">

              <InfoCard
                icon={BrainCircuit}
                title="Profile Intelligence"
                text="Your business information helps identify schemes that may fit your enterprise."
              />

              <InfoCard
                icon={FileCheck2}
                title="Document Signals"
                text="Verified documents provide stronger signals for matching and profile completion."
              />

              <InfoCard
                icon={TrendingUp}
                title="Personalized Ranking"
                text="Potentially relevant schemes are ranked so you can focus on better opportunities."
              />

            </section>

          )}

        </div>

      </main>

    </AppShell>
  );
}

/* ========================================================================= */
/* FEATURE PILL                                                              */
/* ========================================================================= */

function FeaturePill({
  icon: Icon,
  text,
}: {
  icon: typeof UserRound;
  text: string;
}) {
  return (
    <div className="flex min-w-0 items-center gap-2 rounded-xl border border-border/50 bg-surface/30 px-3 py-2.5">

      <span className="flex size-7 shrink-0 items-center justify-center rounded-lg bg-gold/10 text-gold">

        <Icon className="size-3.5" />

      </span>

      <span className="truncate text-[9.5px] font-medium text-muted-foreground sm:text-[10.5px]">
        {text}
      </span>

    </div>
  );
}

/* ========================================================================= */
/* READINESS CARD                                                            */
/* ========================================================================= */

function ReadinessCard({
  icon: Icon,
  label,
  value,
  description,
  progress,
  tone,
}: {
  icon: typeof Gauge;
  label: string;
  value: string;
  description: string;
  progress: number;
  tone:
    | "gold"
    | "mint"
    | "violet";
}) {
  const toneClasses = {
    gold: {
      icon:
        "bg-gold/10 text-gold",
      progress:
        "bg-gradient-gold",
      value:
        "text-gold",
    },

    mint: {
      icon:
        "bg-mint/10 text-mint",
      progress:
        "bg-mint",
      value:
        "text-mint",
    },

    violet: {
      icon:
        "bg-violet/10 text-violet",
      progress:
        "bg-violet",
      value:
        "text-violet",
    },
  };

  const styles =
    toneClasses[tone];

  return (
    <div className="bu-ai-card group rounded-2xl border border-border/55 bg-surface/20 p-4 sm:p-5">

      <div className="flex items-start justify-between gap-3">

        <span
          className={cn(
            "bu-ai-icon flex size-9 items-center justify-center rounded-xl sm:size-10",
            styles.icon,
          )}
        >
          <Icon className="size-4 sm:size-4.5" />
        </span>

        <span
          className={cn(
            "text-[21px] font-bold sm:text-[23px]",
            styles.value,
          )}
        >
          {value}
        </span>

      </div>

      <p className="mt-3 text-[11.5px] font-semibold text-foreground sm:mt-4 sm:text-[13.5px]">
        {label}
      </p>

      <p className="mt-1 min-h-[30px] text-[9.5px] leading-4 text-muted-foreground sm:min-h-[38px] sm:text-[11px] sm:leading-5">
        {description}
      </p>

      <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-surface-2 sm:mt-4">

        <div
          className={cn(
            "bu-ai-progress h-full rounded-full",
            styles.progress,
          )}
          style={{
            width: `${progress}%`,
          }}
        />

      </div>

    </div>
  );
}

/* ========================================================================= */
/* ANALYSIS STEP                                                             */
/* ========================================================================= */

function AnalysisStep({
  number,
  title,
  description,
  complete,
  delay,
}: {
  number: string;
  title: string;
  description: string;
  complete: boolean;
  delay: number;
}) {
  return (
    <div
      className={cn(
        "group rounded-xl border p-3.5 transition-all duration-300 sm:p-4",
        complete
          ? "border-mint/15 bg-mint/[.045] hover:border-mint/25"
          : "border-border/50 bg-surface/20 hover:border-border",
      )}
      style={{
        animationDelay: `${delay}ms`,
      }}
    >

      <div className="flex items-center justify-between">

        <span className="text-[8px] font-bold tracking-[.15em] text-muted-foreground sm:text-[9px]">
          {number}
        </span>

        <span
          className={cn(
            "flex size-6 items-center justify-center rounded-full",
            complete
              ? "bg-mint/10 text-mint"
              : "bg-surface-2 text-muted-foreground/45",
          )}
        >

          {complete ? (
            <Check className="size-3" />
          ) : (
            <Clock3 className="size-3" />
          )}

        </span>

      </div>

      <p className="mt-2.5 text-[11px] font-semibold text-foreground sm:mt-3 sm:text-[13px]">
        {title}
      </p>

      <p className="mt-0.5 text-[9px] text-muted-foreground sm:text-[10.5px]">
        {description}
      </p>

    </div>
  );
}

/* ========================================================================= */
/* SCHEME MATCH CARD                                                         */
/* ========================================================================= */

function SchemeMatchCard({
  scheme,
  index,
}: {
  scheme: (typeof recommendations)[number];
  index: number;
}) {
  return (
    <div
      className={cn(
        "bu-ai-card group relative overflow-hidden rounded-[20px] border border-border/60 bg-surface/20 p-4 sm:rounded-[22px] sm:p-6",
        index === 0 &&
          "ring-1 ring-gold/10",
      )}
      style={{
        animationDelay:
          `${index * 120}ms`,
      }}
    >

      {/* TOP MATCH */}

      {index === 0 && (
        <div className="absolute right-0 top-0 rounded-bl-xl bg-gold/10 px-2.5 py-1.5 text-[7px] font-bold uppercase tracking-[.13em] text-gold sm:px-3 sm:text-[8px]">
          Top Match
        </div>
      )}

      <div className="flex items-start justify-between gap-3">

        <div className="bu-ai-icon flex size-10 items-center justify-center rounded-xl bg-gradient-gold shadow-gold sm:size-12 sm:rounded-2xl">

          <Target
            className="size-4.5 text-primary-foreground sm:size-5"
            strokeWidth={2}
          />

        </div>

        <span
          className={cn(
            "rounded-full px-2 py-1 text-[8px] font-semibold sm:px-2.5 sm:py-1.5 sm:text-[9px]",
            scheme.tag ===
              "Highly Eligible"
              ? "bg-mint/10 text-mint"
              : "bg-gold/10 text-gold",
          )}
        >
          {scheme.tag}
        </span>

      </div>

      <p className="mt-4 text-[16px] font-bold text-foreground sm:mt-6 sm:text-[18px]">
        {scheme.code}
      </p>

      <p className="mt-1.5 min-h-[48px] text-[10px] leading-4.5 text-muted-foreground sm:mt-2 sm:min-h-[52px] sm:text-[12px] sm:leading-5">
        {scheme.name}
      </p>

      <div className="mt-4 flex items-end justify-between gap-3 sm:mt-6">

        <div>

          <p className="text-[8px] uppercase tracking-[.12em] text-muted-foreground sm:text-[9px]">
            Match score
          </p>

          <p className="mt-1 text-[25px] font-bold text-mint sm:text-[28px]">
            {scheme.match}%
          </p>

        </div>

        <div className="text-right">

          <p className="text-[8px] uppercase tracking-[.12em] text-muted-foreground sm:text-[9px]">
            Benefit
          </p>

          <p className="mt-1 text-[11px] font-semibold text-gold sm:text-[13px]">
            {scheme.amount}
          </p>

        </div>

      </div>

      <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-surface-2 sm:mt-4 sm:h-2">

        <div
          className="bu-ai-progress h-full rounded-full bg-gradient-gold"
          style={{
            width: `${scheme.match}%`,
            animationDelay:
              `${index * 150}ms`,
          }}
        />

      </div>

      <button
        type="button"
        className="mt-4 flex min-h-10 w-full items-center justify-center gap-1.5 rounded-xl border border-border/50 bg-surface-2/30 px-3 py-2.5 text-[10px] font-medium text-muted-foreground transition-all duration-300 hover:border-gold/20 hover:bg-gold/5 hover:text-gold sm:mt-5 sm:text-[12px]"
      >

        Explore Scheme

        <ChevronRight className="size-3 transition-transform duration-300 group-hover:translate-x-0.5" />

      </button>

    </div>
  );
}

/* ========================================================================= */
/* INFO CARD                                                                 */
/* ========================================================================= */

function InfoCard({
  icon: Icon,
  title,
  text,
}: {
  icon: typeof BrainCircuit;
  title: string;
  text: string;
}) {
  return (
    <div className="bu-ai-card group rounded-2xl border border-border/55 bg-surface/15 p-4 sm:p-5">

      <span className="bu-ai-icon flex size-9 items-center justify-center rounded-xl bg-gold/8 text-gold sm:size-10">

        <Icon className="size-4 sm:size-4.5" />

      </span>

      <h3 className="mt-3 text-[12px] font-semibold text-foreground sm:mt-4 sm:text-[14px]">
        {title}
      </h3>

      <p className="mt-1.5 text-[9.5px] leading-4.5 text-muted-foreground sm:mt-2 sm:text-[11px] sm:leading-5">
        {text}
      </p>

    </div>
  );
}