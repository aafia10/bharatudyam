import { Link } from "@tanstack/react-router";
import {
  FileText,
  Home,
  LogIn,
  Menu,
  UserPlus,
  X,
} from "lucide-react";
import { useState } from "react";

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

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-navbar/95 backdrop-blur-xl">
      <div className="mx-auto flex h-[70px] max-w-[1400px] items-center justify-between px-4 sm:h-[74px] sm:px-6">
        {/* Logo */}
        <Link
          to="/"
          className="group flex min-w-0 items-center gap-2.5"
          onClick={() => setMobileOpen(false)}
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

        {/* Desktop navigation */}
        <nav className="hidden items-center gap-2 md:flex">
          {navItems.map(({ to, label, icon: Icon }) => (
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
          ))}
        </nav>

        {/* Desktop actions */}
        <div className="hidden items-center gap-4 sm:flex">
          <Link
            to="/login"
            className="flex items-center gap-2 text-[15px] font-medium text-muted-foreground transition-colors duration-300 hover:text-foreground"
          >
            <LogIn className="size-4" />
            Login
          </Link>

          <Link
            to="/signup"
            className="flex items-center gap-2 rounded-full bg-gradient-gold px-5 py-2.5 text-[14px] font-semibold text-primary-foreground shadow-gold transition-transform duration-300 hover:scale-[1.03] active:scale-100 sm:px-6 sm:py-3 sm:text-[15px]"
          >
            <UserPlus
              className="size-4"
              strokeWidth={2.4}
            />

            Get Started
          </Link>
        </div>

        {/* Mobile menu button */}
        <button
          type="button"
          className="msme-mobile-menu-button"
          aria-label={
            mobileOpen ? "Close navigation" : "Open navigation"
          }
          aria-expanded={mobileOpen}
          onClick={() => setMobileOpen((value) => !value)}
        >
          {mobileOpen ? (
            <X className="size-5" />
          ) : (
            <Menu className="size-5" />
          )}
        </button>
      </div>

      {/* Mobile menu */}
      <div
        className={cn(
          "msme-mobile-menu md:hidden",
          mobileOpen && "msme-mobile-menu-open",
        )}
      >
        <nav className="mx-4 mb-4 rounded-2xl border border-border bg-surface/95 p-2 shadow-card backdrop-blur-xl">
          {navItems.map(({ to, label, icon: Icon }) => (
            <Link
              key={to}
              to={to}
              activeOptions={{
                exact: to === "/",
              }}
              onClick={() => setMobileOpen(false)}
              className="flex items-center gap-3 rounded-xl px-4 py-3.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
              activeProps={{
                className:
                  "bg-accent text-gold hover:text-gold",
              }}
            >
              <Icon className="size-4" />
              {label}
            </Link>
          ))}

          <div className="my-2 h-px bg-border" />

          <Link
            to="/login"
            onClick={() => setMobileOpen(false)}
            className="flex items-center gap-3 rounded-xl px-4 py-3.5 text-sm font-medium text-muted-foreground hover:bg-accent hover:text-foreground"
          >
            <LogIn className="size-4" />
            Login
          </Link>

          <Link
            to="/signup"
            onClick={() => setMobileOpen(false)}
            className="mt-1 flex items-center justify-center gap-2 rounded-xl bg-gradient-gold px-4 py-3.5 text-sm font-semibold text-primary-foreground shadow-gold"
          >
            <UserPlus className="size-4" />
            Get Started
          </Link>
        </nav>
      </div>
    </header>
  );
}