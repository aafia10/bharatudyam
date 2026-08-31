import {
  createFileRoute,
  Link,
} from "@tanstack/react-router";

import {
  ArrowLeft,
  Building2,
  CheckCircle2,
  Mail,
  MapPin,
  Phone,
  UserRound,
} from "lucide-react";

import { useEffect, useState } from "react";

import { AppShell } from "@/components/app/AppShell";

export const Route = createFileRoute("/profile")({
  component: ProfilePage,
});

type User = {
  fullName?: string;
  name?: string;
  email?: string;
  mobile?: string;
  phone?: string;
  businessName?: string;
  city?: string;
  state?: string;
  industrySector?: string;
  sector?: string;
  businessType?: string;
  annualTurnover?: string;
  turnover?: string;
  numberOfEmployees?: string;
  employees?: string;
  plantInvestment?: string;
  womenOwned?: boolean;
  scStOwned?: boolean;
  exporter?: boolean;
};

function getUser(): User | null {
  if (typeof window === "undefined") {
    return null;
  }

  const keys = [
    "bharat-udyam-user",
    "currentUser",
    "user",
  ];

  for (const key of keys) {
    const value =
      window.localStorage.getItem(key);

    if (!value) continue;

    try {
      const parsed = JSON.parse(value);

      if (
        parsed &&
        typeof parsed === "object" &&
        !Array.isArray(parsed)
      ) {
        return parsed as User;
      }
    } catch {
      // Ignore invalid localStorage data.
    }
  }

  return null;
}

function getInitials(name: string) {
  const parts = name
    .trim()
    .split(/\s+/)
    .filter(Boolean);

  if (parts.length === 0) {
    return "BU";
  }

  if (parts.length === 1) {
    return parts[0]
      .slice(0, 2)
      .toUpperCase();
  }

  return (
    parts[0][0] +
    parts[parts.length - 1][0]
  ).toUpperCase();
}

function DetailItem({
  label,
  value,
  icon,
}: {
  label: string;
  value?: string;
  icon?: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-border/60 bg-surface/30 p-4">
      <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground">
        {icon}
        {label}
      </div>

      <p className="mt-2 text-[15px] font-semibold text-foreground sm:text-base">
        {value || "Not provided"}
      </p>
    </div>
  );
}

function ProfilePage() {
  const [user, setUser] =
    useState<User | null>(null);

  useEffect(() => {
    setUser(getUser());
  }, []);

  const displayName =
    user?.fullName ||
    user?.name ||
    "Business Owner";

  const email =
    user?.email || "";

  const mobile =
    user?.mobile ||
    user?.phone ||
    "";

  const businessName =
    user?.businessName || "";

  const initials =
    getInitials(displayName);

  return (
    <AppShell>

      <div className="mx-auto w-full max-w-5xl">

        {/* =====================================================
            BACK
        ====================================================== */}

        <Link
          to="/dashboard"
          className="group mb-6 inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-1" />
          Back to dashboard
        </Link>

        {/* =====================================================
            HEADER
        ====================================================== */}

        <section className="relative overflow-hidden rounded-3xl border border-border/70 bg-surface/40 p-5 shadow-card sm:p-7 lg:p-8">

          <div className="pointer-events-none absolute -right-20 -top-20 size-56 rounded-full bg-violet/10 blur-3xl" />

          <div className="relative flex flex-col gap-6 sm:flex-row sm:items-center">

            {/* AVATAR */}

            <div className="flex size-20 shrink-0 items-center justify-center rounded-3xl bg-gradient-gold shadow-gold sm:size-24">
              <span className="text-2xl font-bold text-primary-foreground sm:text-3xl">
                {initials}
              </span>
            </div>

            {/* NAME */}

            <div className="min-w-0">

              <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-mint/20 bg-mint/10 px-3 py-1">
                <CheckCircle2 className="size-3.5 text-mint" />

                <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-mint">
                  Account active
                </span>
              </div>

              <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl lg:text-4xl">
                {displayName}
              </h1>

              <p className="mt-1 text-sm text-muted-foreground sm:text-[15px]">
                {email || "Business account"}
              </p>

            </div>

          </div>

        </section>

        {/* =====================================================
            PERSONAL INFORMATION
        ====================================================== */}

        <section className="mt-6 rounded-3xl border border-border/70 bg-surface/30 p-5 shadow-card sm:p-7">

          <div className="mb-6 flex items-center gap-3">

            <div className="flex size-10 items-center justify-center rounded-xl bg-gold/10">
              <UserRound className="size-5 text-gold" />
            </div>

            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-gold">
                Personal
              </p>

              <h2 className="text-xl font-semibold text-foreground">
                Personal information
              </h2>
            </div>

          </div>

          <div className="grid gap-4 sm:grid-cols-2">

            <DetailItem
              label="Full name"
              value={displayName}
              icon={
                <UserRound className="size-3.5 text-gold" />
              }
            />

            <DetailItem
              label="Email address"
              value={email}
              icon={
                <Mail className="size-3.5 text-gold" />
              }
            />

            <DetailItem
              label="Mobile number"
              value={mobile}
              icon={
                <Phone className="size-3.5 text-gold" />
              }
            />

          </div>

        </section>

        {/* =====================================================
            BUSINESS INFORMATION
        ====================================================== */}

        <section className="mt-6 rounded-3xl border border-border/70 bg-surface/30 p-5 shadow-card sm:p-7">

          <div className="mb-6 flex items-center gap-3">

            <div className="flex size-10 items-center justify-center rounded-xl bg-gold/10">
              <Building2 className="size-5 text-gold" />
            </div>

            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-gold">
                Business
              </p>

              <h2 className="text-xl font-semibold text-foreground">
                Business information
              </h2>
            </div>

          </div>

          <div className="grid gap-4 sm:grid-cols-2">

            <DetailItem
              label="Business name"
              value={businessName}
              icon={
                <Building2 className="size-3.5 text-gold" />
              }
            />

            <DetailItem
              label="City"
              value={user?.city}
              icon={
                <MapPin className="size-3.5 text-gold" />
              }
            />

            <DetailItem
              label="State"
              value={user?.state}
              icon={
                <MapPin className="size-3.5 text-gold" />
              }
            />

            <DetailItem
              label="Business type"
              value={user?.businessType}
            />

            <DetailItem
              label="Industry / sector"
              value={
                user?.industrySector ||
                user?.sector
              }
            />

            <DetailItem
              label="Annual turnover"
              value={
                user?.annualTurnover ||
                user?.turnover
              }
            />

            <DetailItem
              label="Number of employees"
              value={
                user?.numberOfEmployees ||
                user?.employees
              }
            />

            <DetailItem
              label="Plant investment"
              value={user?.plantInvestment}
            />

          </div>

        </section>

        {/* =====================================================
            BUSINESS FLAGS
        ====================================================== */}

        {(user?.womenOwned ||
          user?.scStOwned ||
          user?.exporter) && (
          <section className="mt-6 rounded-3xl border border-border/70 bg-surface/30 p-5 shadow-card sm:p-7">

            <div className="mb-5">

              <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-gold">
                Additional details
              </p>

              <h2 className="mt-1 text-xl font-semibold">
                Business profile
              </h2>

            </div>

            <div className="flex flex-wrap gap-3">

              {user.womenOwned && (
                <span className="rounded-full border border-mint/20 bg-mint/10 px-4 py-2 text-xs font-semibold text-mint">
                  Women-owned business
                </span>
              )}

              {user.scStOwned && (
                <span className="rounded-full border border-violet/20 bg-violet/10 px-4 py-2 text-xs font-semibold text-violet">
                  SC/ST-owned business
                </span>
              )}

              {user.exporter && (
                <span className="rounded-full border border-cyan/20 bg-cyan/10 px-4 py-2 text-xs font-semibold text-cyan">
                  Exporter
                </span>
              )}

            </div>

          </section>
        )}

      </div>

    </AppShell>
  );
}