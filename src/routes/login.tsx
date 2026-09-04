import { zodResolver } from "@hookform/resolvers/zod";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Loader2,
  Lock,
  Mail,
  ShieldCheck,
} from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { PasswordField, TextField } from "@/components/auth/Field";
import {
  loginSchema,
  suggestEmailFix,
} from "@/lib/auth-validation";
import type { LoginValues } from "@/lib/auth-validation";
import { supabase } from "@/lib/supabase";

function getDashboardRoute(role: string) {
  switch (role) {
    case "RM / Field Officer":
      return "/rm-dashboard";
    case "Branch Manager":
      return "/bm-dashboard";
    case "Credit Analyst":
      return "/ca-dashboard";
    case "Operations / Disbursement":
      return "/rm-dashboard";
    case "System Admin":
      return "/rm-dashboard";
    default:
      return "/rm-dashboard";
  }
}

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      {
        title: "Sign in — Bharat Udyam",
      },
      {
        name: "description",
        content:
          "Sign in to Bharat Udyam to track your scheme applications, eligibility scores and business profile.",
      },
      {
        property: "og:title",
        content: "Sign in — Bharat Udyam",
      },
      {
        property: "og:description",
        content:
          "Access your Bharat Udyam dashboard and scheme matches.",
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
  component: LoginPage,
});

function LoginPage() {
  const navigate = useNavigate();

  const [suggestion, setSuggestion] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<LoginValues>({
    resolver: zodResolver(loginSchema),
    mode: "onBlur",
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: LoginValues) {
    try {
      let authPassword = values.password;
      if (/^\d{4}$/.test(values.password)) {
        authPassword = `nbfc_pin_${values.password}`;
      }

      let { data, error } = await supabase.auth.signInWithPassword({
        email: values.email.trim(),
        password: authPassword,
      });

      // If that failed and we transformed a 4-digit password, try original password
      if (error && authPassword !== values.password) {
        const retry = await supabase.auth.signInWithPassword({
          email: values.email.trim(),
          password: values.password,
        });
        if (!retry.error) {
          data = retry.data;
          error = null;
        }
      }

      if (error) {
        toast.error(error.message || "Invalid email or password.");
        return;
      }

      if (!data.user) {
        toast.error("Authentication failed. No user returned.");
        return;
      }

      const isNbfc = data.user.user_metadata?.userType === "NBFC";

      if (isNbfc) {
        const nbfcRole = data.user.user_metadata?.role || "RM / Field Officer";
        const dashboardRoute = getDashboardRoute(nbfcRole);

        const nbfcUser = {
          fullName: data.user.user_metadata?.fullName || "NBFC User",
          employeeId: data.user.user_metadata?.employeeId || "",
          email: data.user.email,
          mobile: data.user.user_metadata?.mobile || "",
          role: nbfcRole,
          branch: data.user.user_metadata?.branch || "",
          region: data.user.user_metadata?.region || "",
          userType: "NBFC",
          dashboardRoute,
        };

        localStorage.setItem("bharat-udyam-nbfc-user", JSON.stringify(nbfcUser));
        localStorage.setItem("bharat-udyam-user", JSON.stringify(nbfcUser));
        localStorage.setItem("bharat-udyam-authenticated", "true");
        localStorage.setItem("bharat-udyam-demo-email", data.user.email || "");

        toast.success(`Welcome back, ${nbfcUser.fullName}!`);

        navigate({
          to: dashboardRoute,
          replace: true,
        });
        return;
      }

      // Maintain getStoredUser and other pages' expectations
      const user = {
        fullName: data.user.user_metadata?.fullName || data.user.user_metadata?.name || data.user.email?.split('@')[0] || "User",
        name: data.user.user_metadata?.fullName || data.user.user_metadata?.name || data.user.email?.split('@')[0] || "User",
        email: data.user.email,
        mobile: data.user.user_metadata?.mobile || "",
        businessName: data.user.user_metadata?.businessName || "",
        city: data.user.user_metadata?.city || "",
        state: data.user.user_metadata?.state || "",
      };

      localStorage.setItem("bharat-udyam-user", JSON.stringify(user));
      localStorage.setItem("bharat-udyam-authenticated", "true");
      localStorage.setItem("bharat-udyam-demo-email", data.user.email || "");

      toast.success("Welcome back!");

      navigate({
        to: "/dashboard",
        replace: true,
      });
    } catch (error: any) {
      console.error("Login error:", error);
      toast.error(error?.message || "Something went wrong. Please try again.");
    }
  }

  function handleTestLogin() {
    setValue("email", "test@gmail.com", { shouldValidate: true });
    setValue("password", "123456", { shouldValidate: true });
    
    // We delay slightly to let React Hook Form update form state before submitting
    setTimeout(() => {
      handleSubmit(onSubmit)();
    }, 100);
  }

  function handleTestNbfcLogin() {
    setValue("email", "test_nbfc_probe@example.com", { shouldValidate: true });
    setValue("password", "1234", { shouldValidate: true });

    setTimeout(() => {
      handleSubmit(onSubmit)();
    }, 100);
  }

  function handleGoogleClick() {
    toast.info(
      "Google sign-in will be available after authentication is connected.",
    );
  }

  return (
    <main className="login-page relative min-h-screen overflow-x-hidden bg-background">
      {/* Animated background */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="login-aurora absolute inset-0 opacity-50" />
        <div className="bg-grid absolute inset-0 opacity-30" />

        <div className="login-orb login-orb-one" />
        <div className="login-orb login-orb-two" />
        <div className="login-orb login-orb-three" />
      </div>

      {/* Main content */}
      <div className="relative mx-auto flex min-h-screen w-full max-w-xl flex-col px-4 py-6 sm:px-6 sm:py-10 lg:px-8">

        {/* Navigation */}
        <div className="login-nav mb-8 flex items-center justify-between">
          <Link
            to="/"
            className="group inline-flex items-center gap-2 rounded-lg px-2 py-2 text-sm font-medium text-muted-foreground transition-all duration-300 hover:-translate-x-0.5 hover:text-foreground"
          >
            <ArrowLeft className="size-4 transition-transform duration-300 group-hover:-translate-x-1" />
            <span>Back to home</span>
          </Link>

          <Link
            to="/signup"
            className="hidden text-sm font-medium text-muted-foreground transition-all duration-300 hover:text-gold sm:block"
          >
            Create account
          </Link>
        </div>

        {/* Header */}
        <header className="login-header mb-8 text-center sm:mb-10">
          <div className="login-icon mx-auto mb-5 flex size-14 items-center justify-center rounded-2xl border border-gold/20 bg-gold/10 shadow-lg shadow-gold/5">
            <ShieldCheck className="size-6 text-gold" />
          </div>

          <p className="text-xs font-bold tracking-[0.2em] text-gold uppercase">
            Welcome back
          </p>

          <h1 className="mt-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Sign in to{" "}
            <span className="text-gradient-gold">
              Bharat Udyam
            </span>
          </h1>

          <p className="mx-auto mt-4 max-w-md text-sm leading-6 text-muted-foreground sm:text-[15px]">
            Access your business profile, scheme matches,
            eligibility information and applications.
          </p>
        </header>

        {/* Login card */}
        <div className="login-card overflow-hidden rounded-3xl border border-border/70 bg-background/80 shadow-2xl shadow-black/10 backdrop-blur-xl">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-6 p-5 sm:p-8 lg:p-9"
            noValidate
          >
            {/* Card heading */}
            <div className="login-section">
              <div className="flex items-center gap-3">
                <div className="login-section-icon flex size-9 items-center justify-center rounded-xl bg-primary/10">
                  <Lock className="size-4 text-primary" />
                </div>

                <div>
                  <p className="text-xs font-bold tracking-[0.15em] text-gold uppercase">
                    Account access
                  </p>

                  <h2 className="text-lg font-semibold text-foreground">
                    Sign in to your account
                  </h2>
                </div>
              </div>
            </div>

            {/* Email */}
            <div className="login-field">
              <TextField
                label="Email address"
                type="email"
                autoComplete="email"
                placeholder="you@example.com"
                icon={<Mail className="size-4" />}
                error={errors.email?.message}
                {...register("email", {
                  onChange: () => {
                    setSuggestion(null);
                  },

                  onBlur: (event) => {
                    setSuggestion(
                      suggestEmailFix(
                        event.target.value,
                      ),
                    );
                  },
                })}
              />

              {suggestion && (
                <button
                  type="button"
                  onClick={() => {
                    setValue("email", suggestion, {
                      shouldValidate: true,
                      shouldDirty: true,
                    });

                    setSuggestion(null);
                  }}
                  className="mt-2 text-left text-xs font-medium text-gold transition-all duration-200 hover:translate-x-0.5 hover:underline"
                >
                  Did you mean {suggestion}?
                </button>
              )}
            </div>

            {/* Password */}
            <div className="login-field">
              <PasswordField
                label="Password"
                autoComplete="current-password"
                placeholder="Enter your password"
                error={errors.password?.message}
                {...register("password")}
              />
            </div>

            {/* Forgot password */}
            <div className="login-field flex items-center justify-between gap-4">
              <Link
                to="/forgot-password"
                className="text-xs font-medium text-muted-foreground transition-all duration-300 hover:translate-x-0.5 hover:text-gold sm:text-[13px]"
              >
                Forgot password?
              </Link>

              <span className="flex items-center gap-1.5 text-[11px] text-muted-foreground sm:text-xs">
                <Lock className="size-3.5 text-mint" />
                Secure sign-in
              </span>
            </div>

            {/* Test Login Buttons */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              <button
                type="button"
                onClick={handleTestLogin}
                className="w-full flex items-center justify-center gap-1.5 rounded-xl border border-dashed border-gold/40 hover:border-gold bg-gold/5 hover:bg-gold/10 px-3 py-2.5 text-xs font-bold text-gold transition-all duration-300 cursor-pointer shadow-sm hover:shadow active:scale-[0.99]"
              >
                Test MSME Login
              </button>
              <button
                type="button"
                onClick={handleTestNbfcLogin}
                className="w-full flex items-center justify-center gap-1.5 rounded-xl border border-dashed border-mint/40 hover:border-mint bg-mint/5 hover:bg-mint/10 px-3 py-2.5 text-xs font-bold text-mint transition-all duration-300 cursor-pointer shadow-sm hover:shadow active:scale-[0.99]"
              >
                Test NBFC RM Login
              </button>
            </div>

            {/* Sign in */}
            <div className="login-button">
              <button
                type="submit"
                disabled={isSubmitting}
                className="group flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-gradient-gold px-5 py-3.5 text-sm font-bold text-primary-foreground shadow-gold transition-all duration-300 hover:-translate-y-0.5 hover:scale-[1.01] hover:shadow-xl active:translate-y-0 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0 disabled:hover:scale-100 sm:text-[15px]"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="size-4 animate-spin" />
                    Signing in...
                  </>
                ) : (
                  <>
                    Sign in
                    <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </>
                )}
              </button>
            </div>

            {/* Divider */}
            <div className="login-divider flex items-center gap-3">
              <span className="h-px flex-1 bg-border" />

              <span className="text-[11px] font-medium tracking-wider text-muted-foreground uppercase">
                or
              </span>

              <span className="h-px flex-1 bg-border" />
            </div>

            {/* Google */}
            <div className="login-button">
              <button
                type="button"
                onClick={handleGoogleClick}
                className="group flex min-h-12 w-full items-center justify-center gap-3 rounded-xl border border-input bg-surface-2/40 px-4 py-3 text-sm font-semibold text-foreground transition-all duration-300 hover:-translate-y-0.5 hover:border-gold/40 hover:bg-surface-2 hover:shadow-lg active:translate-y-0 sm:text-[15px]"
              >
                <svg
                  viewBox="0 0 24 24"
                  className="size-[18px] shrink-0 transition-transform duration-300 group-hover:scale-110"
                  aria-hidden="true"
                >
                  <path
                    fill="#EA4335"
                    d="M12 10.2v3.9h5.5c-.24 1.4-1.7 4.1-5.5 4.1A6.2 6.2 0 1 1 12 5.8c1.6 0 2.9.6 3.8 1.5l2.7-2.6A9.6 9.6 0 0 0 12 2a10 10 0 1 0 0 20c5.8 0 9.6-4.1 9.6-9.8 0-.7-.1-1.3-.2-2z"
                  />
                </svg>

                Continue with Google
              </button>
            </div>

            {/* Security message */}
            <div className="login-trust flex items-start justify-center gap-2 px-2 pt-1">
              <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-mint" />

              <p className="text-center text-xs leading-5 text-muted-foreground">
                Your account information stays on this
                device while authentication is in demo mode.
              </p>
            </div>

            {/* Signup & NBFC Links */}
            <div className="login-signup pt-1 text-center space-y-2">
              <p className="text-sm text-muted-foreground">
                New to Bharat Udyam?{" "}
                <Link
                  to="/signup"
                  className="font-semibold text-gold transition-all duration-300 hover:underline"
                >
                  Create an account
                </Link>
              </p>
              <p className="text-xs text-muted-foreground">
                NBFC Partner Team?{" "}
                <Link
                  to="/nbfc-signup"
                  className="font-semibold text-mint transition-all duration-300 hover:underline"
                >
                  Register as NBFC
                </Link>
              </p>
            </div>
          </form>
        </div>

        {/* Footer */}
        <p className="login-footer mt-6 pb-4 text-center text-xs text-muted-foreground">
          © {new Date().getFullYear()} Bharat Udyam ·
          Empowering Indian businesses
        </p>
      </div>
    </main>
  );
}