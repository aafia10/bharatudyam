import { Link } from "@tanstack/react-router";
import {
  Building2,
  ChevronDown,
  FileText,
  Home,
  Landmark,
  LogIn,
  Menu,
  UserPlus,
  X,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";

import { cn } from "@/lib/utils";
import { Logo } from "./Logo";

const navItems = [
  {
    to: "/",
    label: "Home",
    icon: Home,
  },
  {
    to: "/schemes",
    label: "Schemes",
    icon: FileText,
  },
] as const;

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [getStartedOpen, setGetStartedOpen] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);

  /* Close dropdown when clicking outside */
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(
          event.target as Node,
        )
      ) {
        setGetStartedOpen(false);
      }
    }

    document.addEventListener(
      "mousedown",
      handleClickOutside,
    );

    return () => {
      document.removeEventListener(
        "mousedown",
        handleClickOutside,
      );
    };
  }, []);

  /* Close everything on route/navigation */
  function closeMenus() {
    setMobileOpen(false);
    setGetStartedOpen(false);
  }

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-navbar/95 backdrop-blur-xl">
      <div className="mx-auto flex h-[70px] max-w-[1400px] items-center justify-between px-4 sm:h-[74px] sm:px-6">

        {/* =====================================================
            LOGO
        ====================================================== */}

        <Link
          to="/"
          className="group flex min-w-0 items-center gap-2.5"
          onClick={closeMenus}
        >
          <Logo
            size={42}
            className="shrink-0 transition-transform duration-500 group-hover:scale-110"
          />

          <span className="min-w-0 leading-tight">
            <span className="block truncate text-[16px] font-bold text-foreground sm:text-[17px]">
              Bharat Udyam
            </span>

            <span className="hidden text-[12px] font-medium text-gold/80 sm:block sm:text-[13px]">
              For the Businesses That Build Bharat.
            </span>
          </span>
        </Link>

        {/* =====================================================
            DESKTOP NAVIGATION
        ====================================================== */}

        <nav className="hidden items-center gap-2 md:flex">
          {navItems.map(
            ({ to, label, icon: Icon }) => (
              <Link
                key={to}
                to={to}
                activeOptions={{
                  exact: to === "/",
                }}
                className="group flex items-center gap-2 rounded-full px-5 py-2.5 text-[15px] font-medium text-muted-foreground transition-all duration-300 hover:bg-accent/60 hover:text-foreground"
                activeProps={{
                  className:
                    "bg-accent text-gold hover:text-gold",
                }}
              >
                {({ isActive }) => (
                  <>
                    <Icon
                      className={cn(
                        "size-4 transition-transform duration-300 group-hover:scale-110",
                        isActive && "text-gold",
                      )}
                    />

                    {label}
                  </>
                )}
              </Link>
            ),
          )}
        </nav>

        {/* =====================================================
            DESKTOP ACTIONS
        ====================================================== */}

        <div className="hidden items-center gap-4 sm:flex">

          {/* LOGIN */}

          <Link
            to="/login"
            className="flex items-center gap-2 text-[15px] font-medium text-muted-foreground transition-colors duration-300 hover:text-foreground"
          >
            <LogIn className="size-4" />
            Login
          </Link>

          {/* GET STARTED DROPDOWN */}

          <div
            ref={dropdownRef}
            className="relative"
          >
            <button
              type="button"
              onClick={() =>
                setGetStartedOpen(
                  (value) => !value,
                )
              }
              className="flex items-center gap-2 rounded-full bg-gradient-gold px-5 py-2.5 text-[14px] font-semibold text-primary-foreground shadow-gold transition-all duration-300 hover:scale-[1.03] active:scale-100 sm:px-6 sm:py-3 sm:text-[15px]"
              aria-expanded={getStartedOpen}
              aria-haspopup="menu"
            >
              <UserPlus
                className="size-4"
                strokeWidth={2.4}
              />

              Get Started

              <ChevronDown
                className={cn(
                  "size-4 transition-transform duration-200",
                  getStartedOpen &&
                    "rotate-180",
                )}
              />
            </button>

            {/* DROPDOWN */}

            {getStartedOpen && (
              <div
                className="absolute right-0 top-[calc(100%+10px)] z-[60] w-[285px] overflow-hidden rounded-2xl border border-border bg-background/98 p-1.5 shadow-2xl backdrop-blur-xl"
                role="menu"
              >

                {/* Dropdown heading */}

                <div className="px-3 py-2.5">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                    Create an account
                  </p>

                  <p className="mt-0.5 text-[12px] text-muted-foreground/70">
                    Choose your account type
                  </p>
                </div>

                {/* BUSINESS OWNER */}

                <Link
                  to="/signup"
                  onClick={() =>
                    setGetStartedOpen(false)
                  }
                  className="group flex items-center gap-3 rounded-xl px-3 py-3 transition-all duration-200 hover:bg-accent"
                  role="menuitem"
                >
                  <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-gold/10 text-gold transition-colors group-hover:bg-gold/15">
                    <Building2 className="size-[18px]" />
                  </span>

                  <span className="min-w-0 flex-1">
                    <span className="block text-[14px] font-semibold text-foreground">
                      Business Owner
                    </span>

                    <span className="mt-0.5 block text-[12px] text-muted-foreground">
                      Register your business
                    </span>
                  </span>

                  <span className="text-muted-foreground opacity-0 transition-all group-hover:translate-x-0.5 group-hover:opacity-100">
                    →
                  </span>
                </Link>

                {/* NBFC */}

                <Link
                  to="/nbfc-signup"
                  onClick={() =>
                    setGetStartedOpen(false)
                  }
                  className="group mt-1 flex items-center gap-3 rounded-xl px-3 py-3 transition-all duration-200 hover:bg-accent"
                  role="menuitem"
                >
                  <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-mint/10 text-mint transition-colors group-hover:bg-mint/15">
                    <Landmark className="size-[18px]" />
                  </span>

                  <span className="min-w-0 flex-1">
                    <span className="block text-[14px] font-semibold text-foreground">
                      NBFC
                    </span>

                    <span className="mt-0.5 block text-[12px] text-muted-foreground">
                      Register as an NBFC
                    </span>
                  </span>

                  <span className="text-muted-foreground opacity-0 transition-all group-hover:translate-x-0.5 group-hover:opacity-100">
                    →
                  </span>
                </Link>

              </div>
            )}
          </div>
        </div>

        {/* =====================================================
            MOBILE MENU BUTTON
        ====================================================== */}

        <button
          type="button"
          className="msme-mobile-menu-button"
          aria-label={
            mobileOpen
              ? "Close navigation"
              : "Open navigation"
          }
          aria-expanded={mobileOpen}
          onClick={() =>
            setMobileOpen(
              (value) => !value,
            )
          }
        >
          {mobileOpen ? (
            <X className="size-5" />
          ) : (
            <Menu className="size-5" />
          )}
        </button>
      </div>

      {/* =====================================================
          MOBILE MENU
      ====================================================== */}

      <div
        className={cn(
          "msme-mobile-menu md:hidden",
          mobileOpen &&
            "msme-mobile-menu-open",
        )}
      >
        <nav className="mx-4 mb-4 rounded-2xl border border-border bg-surface/95 p-2 shadow-card backdrop-blur-xl">

          {/* HOME + SCHEMES */}

          {navItems.map(
            ({ to, label, icon: Icon }) => (
              <Link
                key={to}
                to={to}
                activeOptions={{
                  exact: to === "/",
                }}
                onClick={closeMenus}
                className="flex items-center gap-3 rounded-xl px-4 py-3.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
                activeProps={{
                  className:
                    "bg-accent text-gold hover:text-gold",
                }}
              >
                <Icon className="size-4" />
                {label}
              </Link>
            ),
          )}

          <div className="my-2 h-px bg-border" />

          {/* LOGIN */}

          <Link
            to="/login"
            onClick={closeMenus}
            className="flex items-center gap-3 rounded-xl px-4 py-3.5 text-sm font-medium text-muted-foreground hover:bg-accent hover:text-foreground"
          >
            <LogIn className="size-4" />
            Login
          </Link>

          {/* MOBILE ACCOUNT OPTIONS */}

          <div className="mt-2 rounded-xl border border-border/70 bg-background/40 p-1.5">

            <div className="px-3 py-2">
              <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                Create an account
              </p>
            </div>

            {/* BUSINESS OWNER */}

            <Link
              to="/signup"
              onClick={closeMenus}
              className="group flex items-center gap-3 rounded-lg px-3 py-3 transition-colors hover:bg-accent"
            >
              <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-gold/10 text-gold">
                <Building2 className="size-4" />
              </span>

              <span>
                <span className="block text-sm font-semibold text-foreground">
                  Business Owner
                </span>

                <span className="block text-xs text-muted-foreground">
                  Register your business
                </span>
              </span>
            </Link>

            {/* NBFC */}

            <Link
              to="/nbfc-signup"
              onClick={closeMenus}
              className="group flex items-center gap-3 rounded-lg px-3 py-3 transition-colors hover:bg-accent"
            >
              <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-mint/10 text-mint">
                <Landmark className="size-4" />
              </span>

              <span>
                <span className="block text-sm font-semibold text-foreground">
                  NBFC
                </span>

                <span className="block text-xs text-muted-foreground">
                  Register as an NBFC
                </span>
              </span>
            </Link>

          </div>
        </nav>
      </div>
    </header>
  );
}