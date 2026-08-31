import { Link, useLocation, useNavigate } from "@tanstack/react-router";
import {
  Bell,
  ChevronRight,
  FileText,
  Home,
  LogOut,
  Menu,
  Search,
  Store,
  UserRound,
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
] as const;

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
    const value = window.localStorage.getItem(key);

    if (!value) {
      continue;
    }

    try {
      const parsed: unknown = JSON.parse(value);

      if (
        parsed &&
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

  const [sidebarOpen, setSidebarOpen] =
    useState(false);

  const [profileOpen, setProfileOpen] =
    useState(false);

  const [user, setUser] =
    useState<User | null>(null);

  /* =========================================================
     LOAD USER
  ========================================================== */

  useEffect(() => {
    setUser(getUser());
  }, []);

  /* =========================================================
     CLOSE MENUS ON ROUTE CHANGE
  ========================================================== */

  useEffect(() => {
    setSidebarOpen(false);
    setProfileOpen(false);
  }, [location.pathname]);

  /* =========================================================
     PREVENT BACKGROUND SCROLL WHEN SIDEBAR IS OPEN
  ========================================================== */

  useEffect(() => {
    if (typeof document === "undefined") {
      return;
    }

    if (sidebarOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [sidebarOpen]);

  /* =========================================================
     ESCAPE KEY
  ========================================================== */

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setSidebarOpen(false);
        setProfileOpen(false);
      }
    }

    window.addEventListener(
      "keydown",
      handleKeyDown,
    );

    return () => {
      window.removeEventListener(
        "keydown",
        handleKeyDown,
      );
    };
  }, []);

  /* =========================================================
     USER DATA
  ========================================================== */

  const displayName =
    user?.fullName ||
    user?.name ||
    "Business Owner";

  const email =
    user?.email || "";

  const initials =
    getInitials(displayName);

  /* =========================================================
     SIDEBAR
  ========================================================== */

  function toggleSidebar() {
    setSidebarOpen((value) => !value);
    setProfileOpen(false);
  }

  function closeSidebar() {
    setSidebarOpen(false);
  }

  /* =========================================================
     LOGOUT
  ========================================================== */

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
    setSidebarOpen(false);

    navigate({
      to: "/login",
      replace: true,
    });
  }

  return (
    <div className="app-shell min-h-screen bg-background text-foreground">

      {/* =========================================================
          SIDEBAR OVERLAY
      ========================================================== */}

      <button
        type="button"
        aria-label="Close navigation"
        aria-hidden={!sidebarOpen}
        tabIndex={sidebarOpen ? 0 : -1}
        className={cn(
          "app-shell-overlay fixed inset-0 z-40",
          "bg-black/60 backdrop-blur-[2px]",
          "transition-opacity duration-300",
          "lg:hidden",
          sidebarOpen
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0",
        )}
        onClick={closeSidebar}
      />

      {/* =========================================================
          SIDEBAR
      ========================================================== */}

      <aside
        aria-label="Main navigation"
        className={cn(
          "fixed inset-y-0 left-0 z-50 flex",
          "app-shell-sidebar w-[min(86vw,270px)] flex-col",
          "border-r border-border/60",
          "bg-background/98 backdrop-blur-2xl",
          "shadow-2xl shadow-black/20",
          "transition-transform duration-300 ease-out",
          sidebarOpen
            ? "translate-x-0"
            : "-translate-x-full",
        )}
      >

        {/* =======================================================
            SIDEBAR HEADER
        ======================================================== */}

        <div className="app-shell-sidebar-header flex min-h-[68px] items-center justify-between border-b border-border/60 px-4">

          <Link
            to="/dashboard"
            onClick={closeSidebar}
            className="flex min-w-0 items-center gap-3"
          >
            <Logo size={36} />

            <div className="min-w-0">
              <p className="app-shell-logo-title truncate text-[15px] font-bold leading-tight tracking-tight text-foreground">
                Bharat Udyam
              </p>

              <p className="app-shell-logo-subtitle mt-0.5 truncate text-[9px] font-medium uppercase leading-tight tracking-[0.10em] text-muted-foreground">
                For the Businesses That Build Bharat.
              </p>
            </div>
          </Link>

          {/* CLOSE BUTTON */}

          <button
            type="button"
            onClick={closeSidebar}
            className="ml-2 flex size-9 shrink-0 items-center justify-center rounded-lg border border-border/60 bg-surface/40 text-muted-foreground transition-all hover:bg-surface hover:text-foreground active:scale-95"
            aria-label="Close navigation"
          >
            <X className="size-[18px]" />
          </button>
        </div>

        {/* =======================================================
            NAVIGATION
        ======================================================== */}

        <div className="app-shell-nav-scroll flex-1 overflow-y-auto px-3 py-5">

          <p className="app-shell-nav-label mb-2.5 px-2.5 text-[10px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
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
                  onClick={closeSidebar}
                  className={cn(
                    "group flex min-h-[44px] items-center gap-3 rounded-lg px-3 py-2.5",
                    "app-shell-nav-link text-[14px] font-medium",
                    "transition-all duration-200",
                    active
                      ? "bg-gold/10 text-gold"
                      : "text-muted-foreground hover:bg-surface hover:text-foreground",
                  )}
                >

                  {/* ICON */}

                  <span
                    className={cn(
                      "flex size-8 shrink-0 items-center justify-center rounded-lg",
                      "transition-colors",
                      active
                        ? "bg-gold/10"
                        : "bg-transparent group-hover:bg-surface-2",
                    )}
                  >
                    <Icon className="size-[18px]" />
                  </span>

                  {/* LABEL */}

                  <span className="min-w-0 flex-1 truncate">
                    {item.label}
                  </span>

                  {/* ACTIVE INDICATOR */}

                  {active && (
                    <span className="size-1.5 shrink-0 rounded-full bg-gold shadow-[0_0_9px_var(--gold)]" />
                  )}

                  {/* HOVER ARROW */}

                  {!active && (
                    <ChevronRight className="size-3.5 shrink-0 opacity-0 transition-all group-hover:translate-x-0.5 group-hover:opacity-50" />
                  )}

                </Link>
              );
            })}

          </nav>
        </div>

        {/* =======================================================
            SIDEBAR USER
        ======================================================== */}

        <div className="app-shell-user border-t border-border/60 p-3">

          <div className="flex items-center gap-3 rounded-xl bg-surface/40 p-3">

            {/* AVATAR */}

            <div className="app-shell-avatar flex size-9 shrink-0 items-center justify-center rounded-full bg-gradient-gold">

              <span className="app-shell-avatar-text text-[12px] font-bold text-primary-foreground">
                {initials}
              </span>

            </div>

            {/* USER INFO */}

            <div className="min-w-0 flex-1">

              <p className="app-shell-user-name truncate text-[13px] font-semibold text-foreground">
                {displayName}
              </p>

              <p className="app-shell-user-email truncate text-[11px] text-muted-foreground">
                {email || "Business account"}
              </p>

            </div>

            {/* LOGOUT */}

            <button
              type="button"
              onClick={handleLogout}
              className="flex size-8 shrink-0 items-center justify-center rounded-lg text-muted-foreground transition-all hover:bg-destructive/10 hover:text-destructive active:scale-95"
              aria-label="Logout"
              title="Logout"
            >
              <LogOut className="size-[15px]" />
            </button>

          </div>
        </div>

      </aside>

      {/* =========================================================
          MAIN AREA
      ========================================================== */}

      <div
        className={cn(
          "min-h-screen min-w-0",
          "transition-[padding] duration-300 ease-out",
          sidebarOpen
            ? "lg:pl-[270px]"
            : "lg:pl-0",
        )}
      >

        {/* =======================================================
            TOP NAVBAR
        ======================================================== */}

        <header className="app-shell-topbar sticky top-0 z-30 border-b border-border/60 bg-background/85 backdrop-blur-xl">

          <div className="app-shell-topbar-inner flex min-h-[64px] items-center justify-between gap-3 px-3 sm:px-5 lg:px-8">

            {/* =================================================
                LEFT SIDE
            ================================================== */}

            <div className="flex min-w-0 items-center gap-3">

              {/* MENU BUTTON */}

              <button
                type="button"
                onClick={toggleSidebar}
                className={cn(
                  "flex size-10 shrink-0 items-center justify-center rounded-xl",
                  "border border-border bg-surface/40",
                  "text-muted-foreground",
                  "transition-all duration-200",
                  "hover:bg-surface hover:text-foreground",
                  "active:scale-95",
                )}
                aria-label={
                  sidebarOpen
                    ? "Close navigation"
                    : "Open navigation"
                }
                aria-expanded={sidebarOpen}
              >
                {sidebarOpen ? (
                  <X className="size-[18px]" />
                ) : (
                  <Menu className="size-[18px]" />
                )}
              </button>

              {/* DESKTOP BREADCRUMB */}

              <div className="app-shell-breadcrumb hidden min-w-0 items-center gap-2 text-[13px] text-muted-foreground sm:flex">

                <span className="shrink-0">
                  Bharat Udyam
                </span>

                <span className="shrink-0 text-muted-foreground/60">
                  /
                </span>

                <span className="app-shell-breadcrumb-current truncate font-medium capitalize text-foreground">
                  {location.pathname
                    .replace(/^\/+/, "")
                    .replace(/-/g, " ")
                    .replace(/\//g, " / ") ||
                    "dashboard"}
                </span>

              </div>

              {/* MOBILE TITLE */}

              <div className="app-shell-mobile-title flex min-w-0 items-center sm:hidden">

                <p className="app-shell-mobile-title-text truncate text-[14px] font-semibold text-foreground">
                  {location.pathname
                    .replace(/^\/+/, "")
                    .replace(/-/g, " ")
                    .replace(/\//g, " / ") ||
                    "Dashboard"}
                </p>

              </div>

            </div>

            {/* =================================================
                RIGHT SIDE
            ================================================== */}

            <div className="flex shrink-0 items-center gap-2">

              {/* SEARCH */}

              <button
                type="button"
                className="app-shell-search hidden h-10 items-center gap-2 rounded-xl border border-border bg-surface/40 px-3 text-[13px] text-muted-foreground transition-all hover:border-gold/25 hover:bg-surface hover:text-foreground md:flex"
              >

                <Search className="size-4" />

                <span>
                  Search
                </span>

                <kbd className="app-shell-search-shortcut ml-2 rounded border border-border px-1.5 py-0.5 text-[10px]">
                  /
                </kbd>

              </button>

              {/* NOTIFICATIONS */}

              <Link
                to="/notifications"
                className="app-shell-profile-trigger relative flex size-10 items-center justify-center rounded-xl border border-border bg-surface/40 text-muted-foreground transition-all hover:bg-surface hover:text-foreground active:scale-95"
                aria-label="Notifications"
              >

                <Bell className="size-[17px]" />

                <span className="absolute right-2.5 top-2 size-1.5 rounded-full bg-gold shadow-[0_0_8px_var(--gold)]" />

              </Link>

              {/* PROFILE */}

              <div className="relative">

                <button
                  type="button"
                  onClick={() =>
                    setProfileOpen(
                      (value) => !value,
                    )
                  }
                  className="flex h-10 items-center gap-2 rounded-xl border border-border bg-surface/40 p-1.5 pr-2.5 transition-all hover:bg-surface active:scale-[0.98]"
                  aria-expanded={profileOpen}
                  aria-haspopup="menu"
                >

                  {/* PROFILE AVATAR */}

                  <span className="flex size-7 items-center justify-center rounded-lg bg-gradient-gold">

                    <span className="app-shell-profile-initials text-[10px] font-bold text-primary-foreground">
                      {initials}
                    </span>

                  </span>

                  {/* PROFILE NAME */}

                  <span className="app-shell-profile-name hidden max-w-[140px] truncate text-[13px] font-semibold sm:block">
                    {displayName}
                  </span>

                </button>

                {/* =================================================
                    PROFILE DROPDOWN
                ================================================== */}

                {profileOpen && (
                  <div
                    className="app-shell-profile-menu absolute right-0 top-[calc(100%+8px)] z-50 w-[min(290px,calc(100vw-24px))] overflow-hidden rounded-2xl border border-border bg-background p-1.5 shadow-2xl"
                    role="menu"
                  >

                    {/* USER INFO */}

                    <div className="app-shell-profile-info border-b border-border px-3 py-3">

                      <div className="flex items-center gap-3">

                        <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-gradient-gold">

                          <span className="app-shell-avatar-text text-[12px] font-bold text-primary-foreground">
                            {initials}
                          </span>

                        </div>

                        <div className="min-w-0">

                          <p className="app-shell-profile-user truncate text-[13px] font-semibold">
                            {displayName}
                          </p>

                          <p className="app-shell-profile-email mt-0.5 truncate text-[11px] text-muted-foreground">
                            {email || "Business account"}
                          </p>

                        </div>

                      </div>

                    </div>

                    {/* MY PROFILE */}

                    <Link
                      to="/profile"
                      onClick={() =>
                        setProfileOpen(false)
                      }
                      className="app-shell-profile-item mt-1 flex min-h-[44px] w-full items-center gap-3 rounded-xl px-3 py-2.5 text-[13px] font-medium text-foreground transition-colors hover:bg-surface"
                      role="menuitem"
                    >

                      <span className="flex size-8 items-center justify-center rounded-lg bg-gold/10">

                        <UserRound className="size-4 text-gold" />

                      </span>

                      <div className="text-left">

                        <p className="text-[13px] font-semibold">
                          My Profile
                        </p>

                        <p className="app-shell-profile-item-description text-[11px] text-muted-foreground">
                          View your account details
                        </p>

                      </div>

                      <ChevronRight className="ml-auto size-4 text-muted-foreground" />

                    </Link>

                    {/* LOGOUT */}

                    <button
                      type="button"
                      onClick={handleLogout}
                      className="app-shell-profile-logout mt-1 flex min-h-[44px] w-full items-center gap-3 rounded-xl px-3 py-2.5 text-[13px] text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive"
                      role="menuitem"
                    >

                      <span className="flex size-8 items-center justify-center rounded-lg bg-destructive/10">

                        <LogOut className="size-4" />

                      </span>

                      Logout

                    </button>

                  </div>
                )}

              </div>

            </div>

          </div>

        </header>

        {/* =======================================================
            PAGE CONTENT
        ======================================================== */}

        <main className="min-w-0 w-full">

          <div className="app-shell-content mx-auto w-full max-w-[1500px] px-3 py-5 sm:px-5 sm:py-7 lg:px-8 lg:py-9">

            {children}

          </div>

        </main>

      </div>

    </div>
  );
}