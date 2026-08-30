import {
  Link,
  useLocation,
  useNavigate,
} from "@tanstack/react-router";

import {
  Bell,
  FileText,
  HelpCircle,
  Home,
  LogOut,
  Menu,
  Search,
  Sparkles,
  Store,
  X,
} from "lucide-react";

import {
  type ReactNode,
  useEffect,
  useState,
} from "react";

import { Logo } from "@/components/msme/Logo";
import { cn } from "@/lib/utils";

type AppShellProps = {
  children: ReactNode;
};

const navigation = [
  {
    label: "Dashboard",
    to: "/dashboard",
    icon: Home,
  },
  {
    label: "Schemes",
    to: "/dashboard-schemes",
    icon: Store,
  },
  {
    label: "AI Eligibility",
    to: "/personalized",
    icon: Sparkles,
  },
  {
    label: "Applications",
    to: "/applications",
    icon: FileText,
  },
  {
    label: "Documents",
    to: "/documents",
    icon: FileText,
  },
  {
    label: "Notifications",
    to: "/notifications",
    icon: Bell,
  },
  {
    label: "Help Center",
    to: "/help",
    icon: HelpCircle,
  },
] as const;

type User = {
  fullName?: string;
  name?: string;
  email?: string;
  businessName?: string;
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
    const value = window.localStorage.getItem(key);

    if (!value) {
      continue;
    }

    try {
      const parsed: unknown = JSON.parse(value);

      if (
        parsed !== null &&
        typeof parsed === "object" &&
        !Array.isArray(parsed)
      ) {
        return parsed as User;
      }
    } catch {
      // Ignore malformed localStorage values.
    }
  }

  return null;
}

function getInitials(name: string): string {
  const parts = name
    .trim()
    .split(/\s+/)
    .filter(Boolean);

  if (parts.length === 0) {
    return "BU";
  }

  if (parts.length === 1) {
    return parts[0].slice(0, 2).toUpperCase();
  }

  return (
    parts[0][0] +
    parts[parts.length - 1][0]
  ).toUpperCase();
}

export function AppShell({
  children,
}: AppShellProps) {
  const navigate = useNavigate();
  const location = useLocation();

  const [mobileOpen, setMobileOpen] =
    useState(false);

  const [profileOpen, setProfileOpen] =
    useState(false);

  const [user, setUser] =
    useState<User | null>(null);

  useEffect(() => {
    setUser(getUser());
  }, [location.pathname]);

  useEffect(() => {
    setMobileOpen(false);
    setProfileOpen(false);
  }, [location.pathname]);

  const displayName =
    user?.fullName ||
    user?.name ||
    "Business Owner";

  const email =
    user?.email ||
    "";

  const initials =
    getInitials(displayName);

  function handleLogout() {
    if (typeof window !== "undefined") {
      const authKeys = [
        "bharat-udyam-authenticated",
        "bharat-udyam-auth",
        "isAuthenticated",
        "authenticated",
        "isLoggedIn",
      ];

      const userKeys = [
        "bharat-udyam-user",
        "currentUser",
        "user",
        "bharat-udyam-user-name",
      ];

      [
        ...authKeys,
        ...userKeys,
      ].forEach((key) => {
        window.localStorage.removeItem(key);
      });
    }

    setUser(null);
    setProfileOpen(false);
    setMobileOpen(false);

    navigate({
      to: "/login",
      replace: true,
    });
  }

  return (
    <div className="min-h-screen bg-background text-foreground">

      {/* Mobile overlay */}
      {mobileOpen && (
        <button
          type="button"
          aria-label="Close navigation"
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 flex w-[270px] flex-col",
          "border-r border-border/60 bg-background/95 backdrop-blur-xl",
          "transition-transform duration-300",
          mobileOpen
            ? "translate-x-0"
            : "-translate-x-full lg:translate-x-0",
        )}
      >

        {/* Logo */}
        <div className="flex h-[76px] items-center justify-between border-b border-border/60 px-5">

          <Link
            to="/dashboard"
            className="flex items-center gap-3"
          >
            <Logo size={40} />

            <div>
              <p className="text-[15px] font-bold tracking-tight text-foreground">
                Bharat Udyam
              </p>

              <p className="text-[10px] font-medium uppercase tracking-[0.16em] text-muted-foreground">
                For the Businesses That Build Bharat.
              </p>
            </div>
          </Link>

          <button
            type="button"
            className="flex size-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-surface hover:text-foreground lg:hidden"
            onClick={() => setMobileOpen(false)}
            aria-label="Close menu"
          >
            <X className="size-5" />
          </button>

        </div>

        {/* Navigation */}
        <div className="flex-1 overflow-y-auto px-3 py-5">

          <p className="mb-3 px-3 text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
            Workspace
          </p>

          <nav className="space-y-1">

            {navigation.map((item) => {
              const Icon = item.icon;

              const active =
                location.pathname === item.to ||
                (
                  item.to !== "/dashboard" &&
                  location.pathname.startsWith(
                    `${item.to}/`,
                  )
                );

              return (
                <Link
                  key={item.to}
                  to={item.to}
                  className={cn(
                    "group flex items-center gap-3 rounded-xl px-3 py-2.5",
                    "text-[13px] font-medium transition-all duration-200",
                    active
                      ? "bg-gold/10 text-gold"
                      : "text-muted-foreground hover:bg-surface hover:text-foreground",
                  )}
                >

                  <span
                    className={cn(
                      "flex size-8 items-center justify-center rounded-lg transition-colors",
                      active
                        ? "bg-gold/10"
                        : "bg-transparent group-hover:bg-surface-2",
                    )}
                  >
                    <Icon className="size-[17px]" />
                  </span>

                  <span className="flex-1">
                    {item.label}
                  </span>

                  {active && (
                    <span className="size-1.5 rounded-full bg-gold" />
                  )}

                </Link>
              );
            })}

          </nav>
        </div>

        {/* User */}
        <div className="border-t border-border/60 p-3">

          <div className="flex items-center gap-3 rounded-xl bg-surface/40 p-3">

            <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-gradient-gold">
              <span className="text-[11px] font-bold text-primary-foreground">
                {initials}
              </span>
            </div>

            <div className="min-w-0 flex-1">

              <p className="truncate text-[12.5px] font-semibold text-foreground">
                {displayName}
              </p>

              <p className="truncate text-[10.5px] text-muted-foreground">
                {email || "Business account"}
              </p>

            </div>

            <button
              type="button"
              onClick={handleLogout}
              className="flex size-8 shrink-0 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive"
              aria-label="Logout"
              title="Logout"
            >
              <LogOut className="size-4" />
            </button>

          </div>
        </div>

      </aside>

      {/* Main */}
      <div className="min-h-screen lg:pl-[270px]">

        {/* Top bar */}
        <header className="sticky top-0 z-30 border-b border-border/60 bg-background/80 backdrop-blur-xl">

          <div className="flex h-[76px] items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">

            {/* Left */}
            <div className="flex items-center gap-3">

              <button
                type="button"
                onClick={() => setMobileOpen(true)}
                className="flex size-10 items-center justify-center rounded-xl border border-border bg-surface/40 text-muted-foreground transition-colors hover:bg-surface hover:text-foreground lg:hidden"
                aria-label="Open menu"
              >
                <Menu className="size-5" />
              </button>

              <div className="hidden items-center gap-2 text-[12px] text-muted-foreground sm:flex">

                <span>
                  Bharat Udyam
                </span>

                <span>/</span>

                <span className="font-medium capitalize text-foreground">
                  {location.pathname
                    .replace(/^\/+/, "")
                    .replace(/-/g, " ")
                    .replace(/\//g, " / ") ||
                    "dashboard"}
                </span>

              </div>

            </div>

            {/* Right */}
            <div className="flex items-center gap-2">

              <button
                type="button"
                className="hidden h-10 items-center gap-2 rounded-xl border border-border bg-surface/40 px-3 text-[12px] text-muted-foreground transition-colors hover:bg-surface hover:text-foreground md:flex"
              >
                <Search className="size-4" />

                <span>
                  Search
                </span>

                <kbd className="ml-3 rounded border border-border px-1.5 py-0.5 text-[9px]">
                  /
                </kbd>
              </button>

              <Link
                to="/notifications"
                className="relative flex size-10 items-center justify-center rounded-xl border border-border bg-surface/40 text-muted-foreground transition-colors hover:bg-surface hover:text-foreground"
                aria-label="Notifications"
              >
                <Bell className="size-[17px]" />

                <span className="absolute right-2.5 top-2 size-1.5 rounded-full bg-gold" />
              </Link>

              {/* Profile */}
              <div className="relative">

                <button
                  type="button"
                  onClick={() =>
                    setProfileOpen((value) => !value)
                  }
                  className="flex items-center gap-2 rounded-xl border border-border bg-surface/40 p-1.5 pr-2.5 transition-colors hover:bg-surface"
                >

                  <span className="flex size-7 items-center justify-center rounded-lg bg-gradient-gold">
                    <span className="text-[9px] font-bold text-primary-foreground">
                      {initials}
                    </span>
                  </span>

                  <span className="hidden max-w-[120px] truncate text-[11.5px] font-semibold sm:block">
                    {displayName}
                  </span>

                </button>

                {profileOpen && (
                  <div className="absolute right-0 top-[calc(100%+8px)] z-50 w-56 overflow-hidden rounded-xl border border-border bg-background p-1.5 shadow-2xl">

                    <div className="border-b border-border px-3 py-2.5">

                      <p className="truncate text-[12px] font-semibold">
                        {displayName}
                      </p>

                      <p className="mt-0.5 truncate text-[10.5px] text-muted-foreground">
                        {email || "Business account"}
                      </p>

                    </div>

                    <button
                      type="button"
                      onClick={handleLogout}
                      className="mt-1 flex w-full items-center gap-2 rounded-lg px-3 py-2 text-[12px] text-muted-foreground hover:bg-destructive/10 hover:text-destructive"
                    >
                      <LogOut className="size-3.5" />
                      Logout
                    </button>

                  </div>
                )}

              </div>

            </div>

          </div>

        </header>

        {/* Content */}
        <main className="w-full">

          <div className="mx-auto w-full max-w-[1500px] px-4 py-6 sm:px-6 sm:py-8 lg:px-8 lg:py-9">
            {children}
          </div>

        </main>

      </div>

    </div>
  );
}