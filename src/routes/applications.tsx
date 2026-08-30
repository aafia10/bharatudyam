import { createFileRoute } from "@tanstack/react-router";
import {
  AlertCircle,
  ArrowRight,
  Calendar,
  CheckCircle2,
  Clock,
  FileText,
  Maximize2,
  Sparkles,
} from "lucide-react";

import { AppShell } from "@/components/app/AppShell";
import { applications } from "@/lib/app-data";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/applications")({
  head: () => ({
    meta: [
      {
        title: "Your Applications — Bharat Udyam",
      },
      {
        name: "description",
        content:
          "Track and manage your Bharat Udyam scheme applications, approvals, reviews and pending documents.",
      },
      {
        property: "og:title",
        content: "Your Applications — Bharat Udyam",
      },
      {
        property: "og:description",
        content:
          "Track the status of your government scheme applications.",
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

  component: ApplicationsPage,
});

const statusStyles = {
  Approved: {
    className:
      "bg-mint/12 text-mint border-mint/15",
    icon: CheckCircle2,
  },

  "Under Review": {
    className:
      "bg-gold/12 text-gold border-gold/15",
    icon: Clock,
  },

  "Pending Documents": {
    className:
      "bg-destructive/12 text-destructive border-destructive/15",
    icon: AlertCircle,
  },
} as const;

function ApplicationsPage() {
  const approved = applications.filter(
    (application) =>
      application.status === "Approved",
  ).length;

  const inProgress =
    applications.length - approved;

  return (
    <AppShell>
      <main className="bu-app-page w-full min-w-0">

        {/* =========================================================
            PAGE HEADER
        ========================================================= */}

        <section className="relative overflow-hidden">

          {/* Decorative background glow */}
          <div className="bu-app-glow pointer-events-none absolute -right-16 -top-16 size-40 rounded-full bg-gold/[0.06] blur-3xl sm:size-56" />

          <div className="relative">

            <div className="flex items-center gap-2">
              <span className="flex size-7 items-center justify-center rounded-lg bg-gold/10 text-gold">
                <FileText className="size-3.5" />
              </span>

              <p className="text-[9px] font-semibold uppercase tracking-[0.18em] text-gold sm:text-[10px]">
                Application Centre
              </p>
            </div>

            <h1 className="mt-3 text-[28px] font-bold tracking-[-0.025em] text-foreground sm:text-4xl">
              Applications
            </h1>

            <p className="mt-2 max-w-2xl text-[12px] leading-5.5 text-muted-foreground sm:text-[14px] sm:leading-6">
              Track and manage your scheme applications,
              review their progress, and stay updated on
              pending actions.
            </p>
          </div>
        </section>

        {/* =========================================================
            SUMMARY CARDS
        ========================================================= */}

        <section className="mt-6 grid gap-3 sm:mt-8 sm:grid-cols-3">

          <SummaryCard
            value={applications.length}
            label="Total Applied"
            tone="neutral"
            delay={0}
          />

          <SummaryCard
            value={approved}
            label="Approved"
            tone="mint"
            delay={100}
          />

          <SummaryCard
            value={inProgress}
            label="In Progress"
            tone="gold"
            delay={200}
          />

        </section>

        {/* =========================================================
            APPLICATION LIST
        ========================================================= */}

        <section className="mt-6 space-y-4 sm:mt-8 sm:space-y-5">

          {applications.length === 0 ? (
            <EmptyApplications />
          ) : (
            applications.map((app, index) => {

              const status =
                statusStyles[app.status];

              const StatusIcon =
                status.icon;

              return (
                <article
                  key={app.id}
                  className="
                    bu-app-card
                    glass
                    card-edge
                    relative
                    overflow-hidden
                    rounded-2xl
                    p-4
                    sm:p-6
                    lg:p-7
                  "
                  style={{
                    animationDelay:
                      `${index * 110}ms`,
                  }}
                >

                  {/* Status glow */}
                  <div
                    className={cn(
                      "pointer-events-none absolute -right-16 -top-16 size-36 rounded-full blur-3xl",
                      app.status === "Approved"
                        ? "bg-mint/[0.045]"
                        : app.status === "Under Review"
                          ? "bg-gold/[0.045]"
                          : "bg-destructive/[0.035]",
                    )}
                  />

                  <div className="relative">

                    {/* =================================================
                        TOP CONTENT
                    ================================================= */}

                    <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">

                      {/* LEFT */}
                      <div className="min-w-0 flex-1">

                        <div className="flex flex-wrap items-center gap-2.5">

                          <h2 className="text-[18px] font-bold text-foreground sm:text-xl">
                            {app.code}
                          </h2>

                          <span
                            className={cn(
                              "flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[9px] font-semibold sm:text-[10px]",
                              status.className,
                            )}
                          >
                            <StatusIcon className="bu-app-status-icon size-3.5" />

                            {app.status}
                          </span>

                        </div>

                        <p className="mt-2 max-w-2xl text-[11.5px] leading-5 text-muted-foreground sm:text-sm">
                          {app.name}
                        </p>

                        {/* Metadata */}
                        <div className="mt-3 flex flex-wrap gap-x-4 gap-y-2 text-[9.5px] text-muted-foreground/75 sm:gap-x-5 sm:text-xs">

                          <span className="flex items-center gap-1.5">
                            <FileText className="size-3 sm:size-3.5" />

                            <span>
                              {app.id}
                            </span>
                          </span>

                          <span className="flex items-center gap-1.5">
                            <Calendar className="size-3 sm:size-3.5" />

                            <span>
                              Applied:{" "}
                              {app.applied}
                            </span>
                          </span>

                        </div>
                      </div>

                      {/* =================================================
                          SUBSIDY
                      ================================================= */}

                      <div
                        className="
                          flex
                          items-center
                          justify-between
                          rounded-xl
                          border
                          border-border/40
                          bg-surface/20
                          px-3
                          py-2.5
                          sm:block
                          sm:border-0
                          sm:bg-transparent
                          sm:p-0
                          sm:text-right
                        "
                      >

                        <p className="text-[9px] uppercase tracking-[0.1em] text-muted-foreground sm:text-[10px]">
                          Estimated Subsidy
                        </p>

                        <p className="text-gradient-gold text-[18px] font-bold sm:mt-1 sm:text-xl">
                          {app.subsidy}
                        </p>

                      </div>

                    </div>

                    {/* =================================================
                        PROGRESS
                    ================================================= */}

                    <div className="mt-6 sm:mt-7">

                      {/* Desktop progress */}
                      <div className="hidden sm:block">

                        <div className="flex items-center">

                          {[0, 1, 2, 3, 4].map(
                            (step) => {

                              const completed =
                                step < app.step;

                              const active =
                                step === app.step;

                              return (
                                <div
                                  key={step}
                                  className="flex flex-1 items-center last:flex-none"
                                >

                                  <span
                                    className={cn(
                                      "bu-app-number flex size-6 shrink-0 items-center justify-center rounded-full text-[9px] font-bold",
                                      completed
                                        ? "bg-mint/15 text-mint"
                                        : active
                                          ? "bg-gold/15 text-gold ring-1 ring-gold/20"
                                          : "bg-surface-2 text-muted-foreground/45",
                                    )}
                                    style={{
                                      animationDelay:
                                        `${step * 70}ms`,
                                    }}
                                  >
                                    {completed
                                      ? "✓"
                                      : step + 1}
                                  </span>

                                  {step < 4 && (
                                    <div className="mx-2 h-px flex-1 overflow-hidden rounded-full bg-border">

                                      <div
                                        className={cn(
                                          "bu-app-progress h-full rounded-full",
                                          completed
                                            ? "bg-mint/45"
                                            : "bg-border",
                                        )}
                                        style={{
                                          width:
                                            completed
                                              ? "100%"
                                              : "0%",
                                        }}
                                      />

                                    </div>
                                  )}

                                </div>
                              );
                            },
                          )}

                        </div>

                        <div className="mt-2 flex items-center justify-between">

                          <p className="text-[10px] text-muted-foreground">
                            Application progress
                          </p>

                          <p className="text-[10px] font-medium text-muted-foreground">
                            {app.step}/5 steps
                          </p>

                        </div>

                      </div>

                      {/* Mobile progress */}
                      <div className="sm:hidden">

                        <div className="flex items-center justify-between">

                          <p className="text-[9px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">
                            Progress
                          </p>

                          <p className="text-[10px] font-semibold text-gold">
                            {app.step}/5
                          </p>

                        </div>

                        <div className="mt-2 flex gap-1.5">

                          {[0, 1, 2, 3, 4].map(
                            (step) => (

                              <div
                                key={step}
                                className="h-1.5 flex-1 overflow-hidden rounded-full bg-surface-2"
                              >

                                <div
                                  className={cn(
                                    "bu-app-progress h-full rounded-full",
                                    step < app.step
                                      ? "bg-mint"
                                      : step === app.step
                                        ? "bg-gold"
                                        : "bg-transparent",
                                  )}
                                  style={{
                                    width:
                                      step <= app.step
                                        ? "100%"
                                        : "0%",
                                  }}
                                />

                              </div>

                            ),
                          )}

                        </div>

                        <div className="mt-2 flex justify-between text-[8px] text-muted-foreground/60">

                          <span>
                            Started
                          </span>

                          <span>
                            Under review
                          </span>

                          <span>
                            Completed
                          </span>

                        </div>

                      </div>

                    </div>

                    {/* =================================================
                        ACTIONS
                    ================================================= */}

                    <div className="mt-5 grid gap-2.5 sm:mt-6 sm:grid-cols-2">

                      <button
                        type="button"
                        className="
                          bu-app-button
                          group
                          flex
                          min-h-10
                          items-center
                          justify-center
                          gap-2
                          rounded-xl
                          border
                          border-border
                          bg-surface-2/50
                          px-4
                          py-2.5
                          text-[11px]
                          font-medium
                          text-muted-foreground
                          hover:border-gold/25
                          hover:bg-surface-2/80
                          hover:text-foreground
                          sm:text-[12px]
                        "
                      >

                        <Maximize2 className="size-3.5" />

                        View Details

                        <ArrowRight className="bu-app-arrow size-3 opacity-0 transition-opacity duration-300 group-hover:opacity-70" />

                      </button>

                      {app.status !== "Approved" ? (

                        <button
                          type="button"
                          className="
                            bu-app-button
                            group
                            flex
                            min-h-10
                            items-center
                            justify-center
                            gap-2
                            rounded-xl
                            bg-gradient-gold
                            px-4
                            py-2.5
                            text-[11px]
                            font-semibold
                            text-primary-foreground
                            shadow-gold
                            sm:text-[12px]
                          "
                        >

                          Track Status

                          <ArrowRight className="bu-app-arrow size-3.5" />

                        </button>

                      ) : (

                        <div className="flex min-h-10 items-center justify-center gap-2 rounded-xl border border-mint/10 bg-mint/[0.045] px-4 py-2.5 text-[10px] font-medium text-mint sm:text-[11px]">

                          <CheckCircle2 className="size-3.5" />

                          Application Approved

                        </div>

                      )}

                    </div>

                  </div>

                </article>
              );
            })
          )}

        </section>

      </main>
    </AppShell>
  );
}


/* =========================================================
   SUMMARY CARD
========================================================= */

function SummaryCard({
  value,
  label,
  tone,
  delay,
}: {
  value: number;
  label: string;
  tone: "neutral" | "mint" | "gold";
  delay: number;
}) {

  const valueClass = {
    neutral: "text-foreground",
    mint: "text-mint",
    gold: "text-gold",
  }[tone];

  const iconClass = {
    neutral:
      "bg-surface-2 text-muted-foreground",
    mint:
      "bg-mint/10 text-mint",
    gold:
      "bg-gold/10 text-gold",
  }[tone];

  return (
    <div
      className="
        bu-app-summary
        glass
        card-edge
        group
        rounded-2xl
        p-4
        sm:p-5
      "
      style={{
        animationDelay: `${delay}ms`,
      }}
    >

      <div className="flex items-center justify-between">

        <div
          className={cn(
            "flex size-9 items-center justify-center rounded-xl transition-transform duration-300 group-hover:scale-110",
            iconClass,
          )}
        >

          {tone === "mint" ? (
            <CheckCircle2 className="size-4" />
          ) : tone === "gold" ? (
            <Clock className="size-4" />
          ) : (
            <FileText className="size-4" />
          )}

        </div>

        <span
          className={cn(
            "bu-app-number text-[27px] font-bold leading-none sm:text-[30px]",
            valueClass,
          )}
        >
          {value}
        </span>

      </div>

      <p className="mt-3 text-[10px] text-muted-foreground sm:text-[12px]">
        {label}
      </p>

    </div>
  );
}


/* =========================================================
   EMPTY STATE
========================================================= */

function EmptyApplications() {
  return (
    <div className="bu-app-card glass card-edge rounded-2xl p-7 text-center sm:p-12">

      <div className="bu-app-empty-icon mx-auto flex size-12 items-center justify-center rounded-2xl bg-gold/10 text-gold">

        <Sparkles className="size-5" />

      </div>

      <h2 className="mt-4 text-[17px] font-semibold text-foreground sm:text-lg">
        No applications yet
      </h2>

      <p className="mx-auto mt-2 max-w-md text-[11px] leading-5 text-muted-foreground sm:text-sm sm:leading-6">
        Once you apply for a government scheme,
        your application and status will appear here.
      </p>

    </div>
  );
}