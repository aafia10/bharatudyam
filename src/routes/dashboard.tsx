import {
  createFileRoute,
  Link,
} from "@tanstack/react-router";

import {
  AlertCircle,
  ArrowRight,
  ArrowUpRight,
  Bell,
  CheckCircle2,
  ChevronRight,
  Clock3,
  FileCheck2,
  FileText,
  Search,
  ShieldCheck,
  Sparkles,
  TrendingDown,
  TrendingUp,
} from "lucide-react";

import {
  useMemo,
  useState,
} from "react";

import { AppShell } from "@/components/app/AppShell";
import { ScoreRing } from "@/components/app/ScoreRing";
import { useAuthGuard } from "@/hooks/use-auth-guard";

import {
  applications,
  healthMetrics,
  newSchemes,
  notifications,
  overallScore,
  recommendations,
} from "@/lib/app-data";

import { cn } from "@/lib/utils";

export const Route = createFileRoute(
  "/dashboard",
)({
  head: () => ({
    meta: [
      {
        title: "Dashboard — Bharat Udyam",
      },
      {
        name: "description",
        content:
          "Track your MSME schemes, applications, financial health and important updates in one place.",
      },
      {
        property: "og:title",
        content:
          "Dashboard — Bharat Udyam",
      },
      {
        property: "og:description",
        content:
          "Track your schemes, applications and financial health in one place.",
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

  component: DashboardPage,
});

/* ========================================================================= */
/* DASHBOARD                                                                 */
/* ========================================================================= */

function DashboardPage() {
  const {
    name,
    loading,
  } = useAuthGuard();

  const [search, setSearch] =
    useState("");

  const filteredRecommendations =
    useMemo(() => {
      const query =
        search.trim().toLowerCase();

      if (!query) {
        return recommendations.slice(
          0,
          4,
        );
      }

      return recommendations
        .filter((scheme) => {
          return (
            scheme.name
              .toLowerCase()
              .includes(query) ||
            scheme.code
              .toLowerCase()
              .includes(query) ||
            scheme.ministry
              .toLowerCase()
              .includes(query) ||
            scheme.tag
              .toLowerCase()
              .includes(query)
          );
        })
        .slice(0, 4);
    }, [search]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background px-6">
        <div className="flex flex-col items-center gap-5">
          <div className="relative size-14">
            <div className="absolute inset-0 rounded-full border border-gold/15" />

            <div className="absolute inset-0 animate-spin rounded-full border-2 border-transparent border-t-gold" />

            <div className="absolute inset-2 rounded-full bg-gold/5 animate-pulse" />

            <Sparkles className="absolute left-1/2 top-1/2 size-5 -translate-x-1/2 -translate-y-1/2 text-gold" />
          </div>

          <p className="text-sm text-muted-foreground">
            Loading your dashboard...
          </p>
        </div>
      </div>
    );
  }

  const firstName =
    name?.split(" ")[0] ||
    "there";

  let userProfile: {
    businessName?: string;
    city?: string;
    state?: string;
  } = {};

  if (
    typeof window !==
    "undefined"
  ) {
    try {
      const stored =
        window.localStorage.getItem(
          "bharat-udyam-user",
        );

      if (stored) {
        const parsed =
          JSON.parse(stored);

        if (
          parsed &&
          typeof parsed === "object" &&
          !Array.isArray(parsed)
        ) {
          userProfile = parsed;
        }
      }
    } catch {
      userProfile = {};
    }
  }

  const businessName =
    userProfile.businessName ||
    "Your business";

  const state =
    userProfile.state ||
    "India";

  const totalApplications =
    applications.length;

  const underReviewCount =
    applications.filter(
      (application) =>
        application.status ===
        "Under Review",
    ).length;

  const approvedCount =
    applications.filter(
      (application) =>
        application.status ===
        "Approved",
    ).length;

  const actionRequiredCount =
    applications.filter(
      (application) =>
        application.status !==
          "Approved" &&
        application.status !==
          "Under Review",
    ).length;

  return (
    <AppShell>
      <main className="min-w-0">
        <div className="mx-auto w-full max-w-[1400px]">
          {/* =========================================================
              HERO / HEADER
          ========================================================== */}

          <section className="bu-enter">
            <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-end lg:gap-10">
              <div className="min-w-0">
                <div className="flex min-w-0 items-center gap-2">
                  <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-gold/15 bg-gold/5 px-3 py-1.5 text-[9px] font-semibold uppercase tracking-[0.15em] text-gold sm:text-[10px]">
                    <Sparkles className="size-3" />

                    Bharat Udyam
                  </span>

                  <span className="truncate text-[11px] text-muted-foreground sm:text-[12px]">
                    {state}
                  </span>
                </div>

                <h1 className="mt-4 text-[34px] font-bold leading-[1.04] tracking-[-0.045em] text-foreground sm:text-[42px] lg:text-[50px]">
                  Welcome back,{" "}
                  <span className="text-gradient-gold">
                    {firstName}
                  </span>
                </h1>

                <p className="mt-3 max-w-2xl text-[13px] leading-6 text-muted-foreground sm:text-[15px] sm:leading-7">
                  Keep your business moving
                  forward. Track applications,
                  discover relevant schemes and
                  monitor your financial readiness.
                </p>

                <p className="mt-2 truncate text-[11px] font-medium text-muted-foreground/60 sm:text-[12px]">
                  {businessName}
                </p>
              </div>

              {/* SEARCH */}

              <label className="group flex h-12 w-full items-center gap-3 rounded-2xl border border-border/60 bg-surface/20 px-4 transition-all duration-300 focus-within:border-gold/40 focus-within:bg-surface/45 focus-within:shadow-[0_0_30px_rgba(255,193,7,.05)] sm:h-[52px] lg:w-[330px]">
                <Search className="size-[17px] shrink-0 text-muted-foreground transition-colors group-focus-within:text-gold" />

                <input
                  type="search"
                  value={search}
                  onChange={(event) =>
                    setSearch(
                      event.target.value,
                    )
                  }
                  placeholder="Search schemes..."
                  className="w-full min-w-0 bg-transparent text-[13px] text-foreground outline-none placeholder:text-muted-foreground sm:text-[14px]"
                />
              </label>
            </div>
          </section>

          {/* =========================================================
              STATS
          ========================================================== */}

          <section className="bu-enter bu-delay-1 mt-7 grid grid-cols-2 gap-3 sm:mt-8 sm:grid-cols-4 sm:gap-4">
            <DashboardStat
              href="/applications"
              icon={FileText}
              label="Applications"
              value={totalApplications}
              description="Total submitted"
              accent="gold"
            />

            <DashboardStat
              href="/applications"
              icon={Clock3}
              label="Under Review"
              value={underReviewCount}
              description="Awaiting decision"
              accent="gold"
            />

            <DashboardStat
              href="/applications"
              icon={AlertCircle}
              label="Action Required"
              value={actionRequiredCount}
              description="Needs attention"
              accent="red"
            />

            <DashboardStat
              href="/applications"
              icon={CheckCircle2}
              label="Approved"
              value={approvedCount}
              description="Successful"
              accent="mint"
            />
          </section>

          {/* =========================================================
              FINANCIAL HEALTH
          ========================================================== */}

          <section className="bu-enter bu-delay-2 relative mt-7 overflow-hidden rounded-2xl border border-border/60 bg-surface/20 sm:mt-8">
            {/* Glows */}

            <div className="pointer-events-none absolute -right-28 -top-28 size-72 rounded-full bg-gold/[0.05] blur-3xl bu-glow" />

            <div className="pointer-events-none absolute -bottom-28 -left-28 size-64 rounded-full bg-mint/[0.025] blur-3xl" />

            <div className="relative p-5 sm:p-7 lg:p-8">
              {/* Header */}

              <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="bu-pulse size-1.5 rounded-full bg-mint" />

                    <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-gold sm:text-[11px]">
                      Financial health
                    </p>
                  </div>

                  <h2 className="mt-2 text-[22px] font-bold tracking-tight text-foreground sm:text-[25px]">
                    Financial Health Score
                  </h2>

                  <p className="mt-1.5 max-w-xl text-[12px] leading-5 text-muted-foreground sm:text-[14px] sm:leading-6">
                    A snapshot of your current
                    business financial readiness.
                  </p>
                </div>

                {/* SCORE */}

                <div className="flex shrink-0 items-center gap-4 rounded-2xl border border-border/40 bg-background/20 p-3 sm:gap-5 sm:p-4">
                  <div className="bu-score-glow">
                    <ScoreRing
                      score={overallScore}
                      color="var(--gold)"
                      size={78}
                    />
                  </div>

                  <div>
                    <p className="text-[9px] uppercase tracking-[0.13em] text-muted-foreground sm:text-[10px]">
                      Overall
                    </p>

                    <p className="text-gradient-gold text-[31px] font-bold leading-none sm:text-[36px]">
                      {overallScore}
                    </p>

                    <p className="mt-2 flex items-center gap-1 text-[10px] font-semibold text-mint sm:text-[11px]">
                      <TrendingUp className="size-3" />

                      +5 pts this month
                    </p>
                  </div>
                </div>
              </div>

              {/* METRICS */}

              <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
                {healthMetrics.map(
                  (
                    metric,
                    index,
                  ) => (
                    <div
                      key={metric.label}
                      className="bu-card group rounded-2xl border border-border/45 bg-background/10 p-4"
                      style={{
                        animationDelay:
                          `${index * 70}ms`,
                      }}
                    >
                      <div className="flex items-center gap-3">
                        <div className="shrink-0 transition-transform duration-300 group-hover:scale-105">
                          <ScoreRing
                            score={
                              metric.score
                            }
                            color={
                              metric.color
                            }
                            size={48}
                          />
                        </div>

                        <div className="min-w-0">
                          <p className="truncate text-[12px] font-semibold text-foreground sm:text-[13px]">
                            {metric.label}
                          </p>

                          <p className="mt-0.5 truncate text-[10px] text-muted-foreground sm:text-[11px]">
                            {metric.verdict}
                          </p>

                          <p
                            className={cn(
                              "mt-1.5 flex items-center gap-1 text-[10px] font-semibold sm:text-[11px]",
                              metric.delta >=
                                0
                                ? "text-mint"
                                : "text-destructive",
                            )}
                          >
                            {metric.delta >=
                            0 ? (
                              <TrendingUp className="size-3" />
                            ) : (
                              <TrendingDown className="size-3" />
                            )}

                            {metric.delta >=
                            0
                              ? "+"
                              : ""}

                            {metric.delta} pts
                          </p>
                        </div>
                      </div>
                    </div>
                  ),
                )}
              </div>
            </div>
          </section>

          {/* =========================================================
              MAIN TWO COLUMN AREA
          ========================================================== */}

          <div className="mt-7 grid min-w-0 gap-8 lg:mt-8 lg:grid-cols-[minmax(0,1.35fr)_minmax(320px,.85fr)] lg:items-start">
            {/* =======================================================
                RECOMMENDED SCHEMES
            ======================================================== */}

            <section className="bu-enter bu-delay-3 min-w-0">
              <SectionHeader
                eyebrow="Matched to your profile"
                title="Recommended Schemes"
                description="Schemes that may be relevant to your business."
                href="/dashboard-schemes"
                linkText="View all"
              />

              <div className="mt-4 space-y-3">
                {filteredRecommendations.length >
                0 ? (
                  filteredRecommendations.map(
                    (
                      scheme,
                      index,
                    ) => (
                      <SchemeRow
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
                  )
                ) : (
                  <EmptySearch />
                )}
              </div>
            </section>

            {/* =======================================================
                APPLICATIONS
            ======================================================== */}

            <section className="bu-enter bu-delay-3 min-w-0">
              <SectionHeader
                eyebrow="Track progress"
                title="Applications"
                href="/applications"
                linkText="View all"
              />

              <div className="mt-4 space-y-3">
                {applications
                  .slice(0, 3)
                  .map(
                    (
                      application,
                      index,
                    ) => (
                      <ApplicationRow
                        key={
                          application.id
                        }
                        application={
                          application
                        }
                        index={
                          index
                        }
                      />
                    ),
                  )}
              </div>

              <Link
                to="/applications"
                className="group mt-4 flex min-h-11 items-center justify-center gap-2 rounded-xl border border-border/60 bg-surface/15 px-4 py-3 text-[12px] font-semibold text-foreground transition-all duration-300 hover:border-gold/25 hover:bg-gold/5 hover:text-gold"
              >
                Manage applications

                <ArrowRight className="size-3.5 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </section>
          </div>

          {/* =========================================================
              AI NEXT ACTION
          ========================================================== */}

          <section className="bu-enter bu-delay-4 relative mt-7 overflow-hidden rounded-2xl border border-gold/10 bg-gradient-to-br from-gold/[0.07] via-surface/30 to-surface/10 p-5 sm:mt-8 sm:p-7">
            <div className="pointer-events-none absolute -right-20 -top-24 size-64 rounded-full bg-gold/[0.06] blur-3xl bu-glow" />

            <div className="relative">
              <div className="flex items-start justify-between gap-4">
                <div className="flex min-w-0 items-center gap-3">
                  <span className="bu-float flex size-10 shrink-0 items-center justify-center rounded-xl border border-gold/15 bg-gold/10 sm:size-11">
                    <Sparkles className="size-5 text-gold" />
                  </span>

                  <div className="min-w-0">
                    <p className="text-[9px] font-semibold uppercase tracking-[0.16em] text-gold sm:text-[10px]">
                      Bharat Udyam AI
                    </p>

                    <h2 className="mt-0.5 text-[18px] font-bold text-foreground sm:text-[21px]">
                      Your next best action
                    </h2>
                  </div>
                </div>

                <span className="hidden shrink-0 items-center gap-1.5 rounded-full border border-mint/10 bg-mint/5 px-3 py-1.5 text-[9px] font-semibold text-mint sm:flex">
                  <span className="bu-pulse size-1.5 rounded-full bg-mint" />

                  Ready
                </span>
              </div>

              <p className="mt-5 max-w-3xl text-[12px] leading-6 text-muted-foreground sm:text-[14px] sm:leading-7">
                Your current financial health
                score is{" "}
                <span className="font-semibold text-foreground">
                  {overallScore}/100
                </span>
                . Keeping your business profile
                and documents updated can improve
                the accuracy of your scheme
                recommendations.
              </p>

              <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-3">
                <InsightItem
                  icon={ShieldCheck}
                  title="Profile"
                  text="Keep updated"
                />

                <InsightItem
                  icon={FileText}
                  title="Documents"
                  text="Upload missing"
                />

                <InsightItem
                  icon={Sparkles}
                  title="Schemes"
                  text="Explore matches"
                />
              </div>

              <div className="mt-5 flex flex-col gap-3 sm:flex-row">
                <Link
                  to="/dashboard-schemes"
                  className="group flex min-h-11 items-center justify-center gap-2 rounded-xl bg-gradient-gold px-5 py-3 text-[12px] font-semibold text-primary-foreground shadow-gold transition-all duration-300 hover:-translate-y-0.5 sm:text-[13px]"
                >
                  Explore schemes

                  <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>

                <Link
                  to="/documents"
                  className="group flex min-h-11 items-center justify-center gap-2 rounded-xl border border-border/60 bg-surface/20 px-5 py-3 text-[12px] font-semibold text-foreground transition-all duration-300 hover:-translate-y-0.5 hover:border-gold/25 hover:bg-gold/5 sm:text-[13px]"
                >
                  Review documents
                </Link>
              </div>
            </div>
          </section>

          {/* =========================================================
              LOWER CONTENT
          ========================================================== */}

          <div className="mt-7 grid min-w-0 gap-8 lg:mt-8 lg:grid-cols-2">
            {/* NEW SCHEMES */}

            <section className="bu-enter bu-delay-5 min-w-0">
              <SectionHeader
                eyebrow="Recently added"
                title="New Schemes"
                href="/dashboard-schemes"
                linkText="Browse all"
              />

              <div className="mt-4 grid min-w-0 gap-3 sm:grid-cols-2">
                {newSchemes
                  .slice(0, 4)
                  .map(
                    (
                      scheme,
                      index,
                    ) => (
                      <NewSchemeCard
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
            </section>

            {/* NOTIFICATIONS */}

            <section className="bu-enter bu-delay-5 min-w-0">
              <SectionHeader
                eyebrow="Updates"
                title="Recent Notifications"
                href="/notifications"
                linkText="View all"
              />

              <div className="mt-4 rounded-2xl border border-border/50 bg-surface/10 p-2 sm:p-3">
                {notifications
                  .slice(0, 4)
                  .map(
                    (
                      note,
                      index,
                    ) => (
                      <NotificationRow
                        key={`${note.title}-${note.time}`}
                        note={
                          note
                        }
                        index={
                          index
                        }
                      />
                    ),
                  )}
              </div>
            </section>
          </div>

          {/* =========================================================
              PROFILE STATUS
          ========================================================== */}

          <section className="bu-enter bu-delay-5 mt-7 rounded-2xl border border-border/50 bg-surface/10 p-5 sm:mt-8 sm:p-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex min-w-0 items-start gap-3">
                <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-mint/10">
                  <CheckCircle2 className="size-5 text-mint" />
                </span>

                <div className="min-w-0">
                  <p className="text-[13px] font-semibold text-foreground sm:text-[14px]">
                    Business profile
                  </p>

                  <p className="mt-1 max-w-2xl text-[11px] leading-5 text-muted-foreground sm:text-[12px] sm:leading-6">
                    Keep your business information
                    and supporting documents updated
                    for more accurate scheme
                    recommendations.
                  </p>
                </div>
              </div>

              <Link
                to="/documents"
                className="group flex min-h-10 shrink-0 items-center justify-center gap-2 rounded-xl border border-border/60 px-4 py-2.5 text-[11px] font-semibold text-foreground transition-all duration-300 hover:-translate-y-0.5 hover:border-gold/25 hover:bg-gold/5 hover:text-gold"
              >
                Manage documents

                <ArrowRight className="size-3.5 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </div>
          </section>

          {/* =========================================================
              FOOTER
          ========================================================== */}

          <footer className="pb-3 pt-9 text-center sm:pt-12">
            <p className="text-[9px] font-medium uppercase tracking-[0.2em] text-muted-foreground/30">
              Bharat Udyam
            </p>

            <p className="mt-1 text-[10px] text-muted-foreground/35">
              For the Businesses That Build Bharat.
            </p>
          </footer>
        </div>
      </main>
    </AppShell>
  );
}

/* ========================================================================= */
/* SECTION HEADER                                                            */
/* ========================================================================= */

function SectionHeader({
  eyebrow,
  title,
  description,
  href,
  linkText,
}: {
  eyebrow: string;
  title: string;
  description?: string;
  href: string;
  linkText: string;
}) {
  return (
    <div className="flex items-end justify-between gap-4">
      <div className="min-w-0">
        <p className="text-[9px] font-semibold uppercase tracking-[0.16em] text-gold sm:text-[10px]">
          {eyebrow}
        </p>

        <h2 className="mt-1.5 text-[21px] font-bold tracking-tight text-foreground sm:text-[24px]">
          {title}
        </h2>

        {description && (
          <p className="mt-1 hidden text-[12px] text-muted-foreground sm:block sm:text-[13px]">
            {description}
          </p>
        )}
      </div>

      <Link
        to={href}
        className="group flex shrink-0 items-center gap-1.5 text-[11px] font-semibold text-gold transition-opacity hover:opacity-75 sm:text-[12px]"
      >
        {linkText}

        <ArrowRight className="size-3.5 transition-transform duration-300 group-hover:translate-x-1" />
      </Link>
    </div>
  );
}

/* ========================================================================= */
/* DASHBOARD STAT                                                            */
/* ========================================================================= */

function DashboardStat({
  href,
  icon: Icon,
  label,
  value,
  description,
  accent,
}: {
  href: "/applications";
  icon: typeof FileText;
  label: string;
  value: number;
  description: string;
  accent:
    | "gold"
    | "mint"
    | "red";
}) {
  const styles = {
    gold: {
      icon: "bg-gold/8 text-gold",
      value: "text-gradient-gold",
      border:
        "hover:border-gold/25",
    },

    mint: {
      icon: "bg-mint/8 text-mint",
      value: "text-mint",
      border:
        "hover:border-mint/25",
    },

    red: {
      icon:
        "bg-destructive/8 text-destructive",
      value: "text-destructive",
      border:
        "hover:border-destructive/25",
    },
  };

  const current =
    styles[accent];

  return (
    <Link
      to={href}
      className={cn(
        "bu-card group relative min-w-0 overflow-hidden rounded-2xl border border-border/50 bg-surface/15 p-4 sm:p-5",
        current.border,
      )}
    >
      <div className="bu-shimmer" />

      <div className="relative">
        <div className="flex items-center justify-between gap-2">
          <span
            className={cn(
              "bu-icon flex size-9 shrink-0 items-center justify-center rounded-xl sm:size-10",
              current.icon,
            )}
          >
            <Icon className="size-4 sm:size-[17px]" />
          </span>

          <ArrowUpRight className="size-4 text-muted-foreground/35 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-gold" />
        </div>

        <p className="mt-4 text-[9px] font-medium uppercase tracking-[0.1em] text-muted-foreground sm:mt-5 sm:text-[10px]">
          {label}
        </p>

        <p
          className={cn(
            "mt-1 text-[28px] font-bold leading-none sm:text-[32px]",
            current.value,
          )}
        >
          {value}
        </p>

        <p className="mt-2 text-[10px] text-muted-foreground sm:text-[11px]">
          {description}
        </p>
      </div>
    </Link>
  );
}

/* ========================================================================= */
/* SCHEME ROW                                                                */
/* ========================================================================= */

function SchemeRow({
  scheme,
  index,
}: {
  scheme: (typeof recommendations)[number];
  index: number;
}) {
  return (
    <Link
      to="/dashboard-schemes"
      className="bu-card group relative block min-w-0 overflow-hidden rounded-2xl border border-border/50 bg-surface/15 p-4 sm:p-5"
      style={{
        animationDelay:
          `${index * 90}ms`,
      }}
    >
      <div className="bu-shimmer" />

      <div className="relative flex min-w-0 items-start gap-3.5 sm:gap-4">
        <span className="bu-icon flex size-10 shrink-0 items-center justify-center rounded-xl bg-gold/5 sm:size-11">
          <FileCheck2 className="size-4 text-gold sm:size-[18px]" />
        </span>

        <div className="min-w-0 flex-1">
          <div className="flex min-w-0 items-start justify-between gap-3">
            <div className="min-w-0">
              <h3 className="truncate text-[13px] font-bold text-foreground sm:text-[15px]">
                {scheme.name}
              </h3>

              <p className="mt-1 truncate text-[10px] text-muted-foreground sm:text-[11px]">
                {scheme.ministry}
              </p>
            </div>

            <div className="shrink-0 text-right">
              <span className="block text-[8px] uppercase tracking-[0.1em] text-muted-foreground sm:text-[9px]">
                Match
              </span>

              <span className="text-gradient-gold block text-[19px] font-bold leading-none sm:text-[21px]">
                {scheme.match}%
              </span>
            </div>
          </div>

          <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-surface-2">
            <div
              className="bu-progress h-full rounded-full bg-gradient-gold"
              style={{
                width: `${scheme.match}%`,
                animationDelay:
                  `${200 + index * 120}ms`,
              }}
            />
          </div>

          <div className="mt-3 flex min-w-0 items-center justify-between gap-3">
            <span className="truncate text-[10px] font-semibold text-mint sm:text-[11px]">
              Up to {scheme.amount}
            </span>

            <span className="flex shrink-0 items-center gap-1 text-[10px] font-semibold text-muted-foreground transition-colors group-hover:text-gold sm:text-[11px]">
              Explore

              <ArrowUpRight className="size-3.5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}

/* ========================================================================= */
/* APPLICATION ROW                                                           */
/* ========================================================================= */

function ApplicationRow({
  application,
  index,
}: {
  application: (typeof applications)[number];
  index: number;
}) {
  return (
    <Link
      to="/applications"
      className="bu-card group block min-w-0 rounded-2xl border border-border/50 bg-surface/15 p-4 sm:p-5"
      style={{
        animationDelay:
          `${index * 100}ms`,
      }}
    >
      <div className="flex min-w-0 items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="truncate text-[13px] font-bold text-foreground sm:text-[14px]">
            {application.code}
          </p>

          <p className="mt-1 truncate text-[10px] text-muted-foreground sm:text-[11px]">
            {application.id}
          </p>
        </div>

        <StatusBadge
          status={
            application.status
          }
        />
      </div>

      <div className="mt-4 flex items-center gap-1.5">
        {[0, 1, 2, 3, 4].map(
          (step) => (
            <span
              key={step}
              className={cn(
                "h-1.5 flex-1 rounded-full transition-all duration-700",
                step <
                  application.step
                  ? "bg-gradient-gold"
                  : "bg-surface-2",
              )}
            />
          ),
        )}
      </div>

      <div className="mt-3 flex items-center justify-between">
        <span className="text-[10px] text-muted-foreground sm:text-[11px]">
          Step {application.step} of 5
        </span>

        <span className="flex items-center gap-1 text-[10px] font-semibold text-muted-foreground transition-colors group-hover:text-gold sm:text-[11px]">
          View

          <ChevronRight className="size-3.5 transition-transform duration-300 group-hover:translate-x-0.5" />
        </span>
      </div>
    </Link>
  );
}

/* ========================================================================= */
/* STATUS BADGE                                                              */
/* ========================================================================= */

function StatusBadge({
  status,
}: {
  status: string;
}) {
  const classes =
    status === "Approved"
      ? "bg-mint/10 text-mint"
      : status === "Under Review"
        ? "bg-gold/10 text-gold"
        : "bg-destructive/10 text-destructive";

  return (
    <span
      className={cn(
        "shrink-0 rounded-full px-2.5 py-1.5 text-[9px] font-semibold sm:px-3 sm:text-[10px]",
        classes,
      )}
    >
      {status}
    </span>
  );
}

/* ========================================================================= */
/* NEW SCHEME CARD                                                           */
/* ========================================================================= */

function NewSchemeCard({
  scheme,
  index,
}: {
  scheme: (typeof newSchemes)[number];
  index: number;
}) {
  return (
    <Link
      to="/dashboard-schemes"
      className="bu-card group relative min-w-0 overflow-hidden rounded-2xl border border-border/50 bg-surface/10 p-4 sm:p-5"
      style={{
        animationDelay:
          `${index * 80}ms`,
      }}
    >
      <div className="bu-shimmer" />

      <div className="relative">
        <div className="flex items-start justify-between gap-3">
          <span className="bu-icon flex size-9 shrink-0 items-center justify-center rounded-xl border border-gold/10 bg-gold/5">
            <FileCheck2 className="size-4 text-gold" />
          </span>

          <span className="rounded-full bg-cyan/10 px-2.5 py-1.5 text-[8px] font-semibold text-cyan">
            {scheme.badge}
          </span>
        </div>

        <p className="mt-4 text-[13px] font-bold text-foreground sm:text-[14px]">
          {scheme.name}
        </p>

        <p className="mt-1.5 line-clamp-2 text-[10px] leading-5 text-muted-foreground sm:text-[11px]">
          {scheme.ministry}
        </p>

        <div className="mt-4 flex items-center justify-between gap-2">
          <span className="truncate text-[10px] text-muted-foreground sm:text-[11px]">
            {scheme.category}
          </span>

          <ArrowUpRight className="size-4 shrink-0 text-muted-foreground transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-gold" />
        </div>
      </div>
    </Link>
  );
}

/* ========================================================================= */
/* NOTIFICATION ROW                                                          */
/* ========================================================================= */

function NotificationRow({
  note,
  index,
}: {
  note: (typeof notifications)[number];
  index: number;
}) {
  return (
    <Link
      to="/notifications"
      className="group flex min-w-0 items-start gap-3 rounded-xl p-3 transition-all duration-300 hover:bg-surface/40 sm:p-3.5"
      style={{
        animationDelay:
          `${index * 70}ms`,
      }}
    >
      <span className="bu-icon flex size-9 shrink-0 items-center justify-center rounded-xl bg-gold/5">
        <Bell className="size-4 text-gold" />
      </span>

      <div className="min-w-0 flex-1">
        <div className="flex min-w-0 items-start justify-between gap-2">
          <p className="truncate text-[12px] font-semibold text-foreground sm:text-[13px]">
            {note.title}
          </p>

          {note.unread && (
            <span className="bu-pulse mt-1.5 size-1.5 shrink-0 rounded-full bg-gold" />
          )}
        </div>

        <p className="mt-1 line-clamp-2 text-[10px] leading-5 text-muted-foreground sm:text-[11px] sm:leading-5">
          {note.body}
        </p>

        <p className="mt-1.5 text-[9px] text-muted-foreground/55 sm:text-[10px]">
          {note.time}
        </p>
      </div>

      <ChevronRight className="mt-2 size-3.5 shrink-0 text-muted-foreground/30 transition-all duration-300 group-hover:translate-x-0.5 group-hover:text-gold" />
    </Link>
  );
}

/* ========================================================================= */
/* AI INSIGHT                                                                */
/* ========================================================================= */

function InsightItem({
  icon: Icon,
  title,
  text,
}: {
  icon: typeof ShieldCheck;
  title: string;
  text: string;
}) {
  return (
    <div className="bu-card min-w-0 rounded-xl border border-border/45 bg-background/10 p-3.5 sm:p-4">
      <div className="flex items-center gap-2.5">
        <span className="bu-icon flex size-8 shrink-0 items-center justify-center rounded-lg bg-gold/5 text-gold sm:size-9">
          <Icon className="size-3.5 sm:size-4" />
        </span>

        <div className="min-w-0">
          <p className="truncate text-[10px] font-semibold text-foreground sm:text-[11px]">
            {title}
          </p>

          <p className="mt-0.5 truncate text-[9px] text-muted-foreground sm:text-[10px]">
            {text}
          </p>
        </div>
      </div>
    </div>
  );
}

/* ========================================================================= */
/* EMPTY SEARCH                                                              */
/* ========================================================================= */

function EmptySearch() {
  return (
    <div className="rounded-2xl border border-dashed border-border/60 p-8 text-center sm:p-10">
      <Search className="mx-auto size-6 text-muted-foreground" />

      <p className="mt-3 text-[13px] font-semibold text-foreground sm:text-[14px]">
        No schemes found
      </p>

      <p className="mt-1.5 text-[10px] text-muted-foreground sm:text-[11px]">
        Try another search term.
      </p>
    </div>
  );
}