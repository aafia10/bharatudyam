import { Link } from "@tanstack/react-router";
import { FileText, Home, LogIn, UserPlus } from "lucide-react";
import { cn } from "@/lib/utils";
import { Logo } from "./Logo";

const navItems = [
  { to: "/", label: "Home", icon: Home },
  { to: "/schemes", label: "Schemes", icon: FileText },
] as const;

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-navbar/95 backdrop-blur-xl">
      <div className="mx-auto flex h-[74px] max-w-[1400px] items-center justify-between px-6">
        <Link to="/" className="group flex items-center gap-3">
          <Logo
            size={44}
            className="transition-transform duration-500 group-hover:scale-110"
          />

          <span className="leading-tight">
            <span className="block text-[17px] font-bold text-foreground">
              Bharat Udyam
            </span>

            <span className="block text-[13px] font-medium text-gold/80">
              For the Businesses That Build Bharat.
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-2 md:flex">
          {navItems.map(({ to, label, icon: Icon }) => (
            <Link
              key={to}
              to={to}
              activeOptions={{ exact: to === "/" }}
              className="group flex items-center gap-2 rounded-full px-5 py-2.5 text-[15px] font-medium text-muted-foreground transition-all duration-300 hover:bg-accent/60 hover:text-foreground"
              activeProps={{
                className: "bg-accent text-gold hover:text-gold",
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

        <div className="flex items-center gap-4">

          {/* LOGIN → /login */}
          <Link
            to="/login"
            className="hidden items-center gap-2 text-[15px] font-medium text-muted-foreground transition-colors duration-300 hover:text-foreground sm:flex"
          >
            <LogIn className="size-4" />
            Login
          </Link>

          {/* GET STARTED → /signup */}
          <Link
            to="/signup"
            className="flex items-center gap-2 rounded-full bg-gradient-gold px-6 py-3 text-[15px] font-semibold text-primary-foreground shadow-gold transition-transform duration-300 hover:scale-[1.03] active:scale-100"
          >
            <UserPlus className="size-4" strokeWidth={2.4} />
            Get Started
          </Link>

        </div>
      </div>
    </header>
  );
}