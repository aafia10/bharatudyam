import { zodResolver } from "@hookform/resolvers/zod";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import {
  ArrowLeft,
  ArrowRight,
  Building2,
  CheckCircle2,
  Loader2,
  Mail,
  MapPin,
  Phone,
  ShieldCheck,
  User,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import {
  PasswordField,
  SelectField,
  TextField,
} from "@/components/auth/Field";
import { PasswordMeter } from "@/components/auth/PasswordMeter";
import {
  signupSchema,
  suggestEmailFix,
} from "@/lib/auth-validation";
import type { SignupValues } from "@/lib/auth-validation";
import { supabase } from "@/lib/supabase";

const STATES = [
  "Andhra Pradesh",
  "Arunachal Pradesh",
  "Assam",
  "Bihar",
  "Chhattisgarh",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Madhya Pradesh",
  "Maharashtra",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Odisha",
  "Punjab",
  "Rajasthan",
  "Sikkim",
  "Tamil Nadu",
  "Telangana",
  "Tripura",
  "Uttar Pradesh",
  "Uttarakhand",
  "West Bengal",
  "Andaman and Nicobar Islands",
  "Chandigarh",
  "Dadra and Nagar Haveli and Daman and Diu",
  "Delhi",
  "Jammu and Kashmir",
  "Ladakh",
  "Lakshadweep",
  "Puducherry",
];

export const Route = createFileRoute("/signup")({
  head: () => ({
    meta: [
      {
        title: "Create your account — Bharat Udyam",
      },
      {
        name: "description",
        content:
          "Create a free Bharat Udyam account to discover government schemes, subsidies and loans matched to your business profile.",
      },
      {
        property: "og:title",
        content: "Create your account — Bharat Udyam",
      },
      {
        property: "og:description",
        content:
          "Join Bharat Udyam and get AI-matched scheme recommendations for your business.",
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
  component: SignupPage,
});

function SignupPage() {
  const navigate = useNavigate();
  const pageRef = useRef<HTMLElement | null>(null);

  const [suggestion, setSuggestion] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<SignupValues>({
    resolver: zodResolver(signupSchema),
    mode: "onBlur",
    defaultValues: {
      fullName: "",
      email: "",
      mobile: "",
      businessName: "",
      city: "",
      state: "",
      password: "",
      confirmPassword: "",
      acceptTerms: false,
    },
  });

  const password = watch("password") ?? "";

  /*
   * Scroll reveal.
   *
   * This is the missing part from the previous version.
   * The CSS only works after these elements receive
   * the "bu-reveal-visible" class.
   */
  useEffect(() => {
    const root = pageRef.current;

    if (!root) return;

    const elements =
      root.querySelectorAll<HTMLElement>(".bu-reveal");

    if (!elements.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("bu-reveal-visible");
          }
        });
      },
      {
        threshold: 0.12,
        rootMargin: "0px 0px -70px 0px",
      },
    );

    elements.forEach((element) => {
      observer.observe(element);
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  async function onSubmit(values: SignupValues) {
    try {
      const { data, error } = await supabase.auth.signUp({
        email: values.email.trim(),
        password: values.password,
        options: {
          data: {
            fullName: values.fullName,
            mobile: values.mobile,
            businessName: values.businessName,
            city: values.city,
            state: values.state,
          }
        }
      });

      if (error) {
        toast.error(error.message || "Signup failed. Please try again.");
        return;
      }

      const user = {
        fullName: values.fullName,
        email: values.email,
        mobile: values.mobile,
        businessName: values.businessName,
        city: values.city,
        state: values.state,
      };

      localStorage.setItem(
        "bharat-udyam-user",
        JSON.stringify(user),
      );

      localStorage.setItem(
        "bharat-udyam-user-name",
        values.fullName,
      );

      localStorage.setItem(
        "bharat-udyam-authenticated",
        "true",
      );

      localStorage.setItem(
        "bharat-udyam-demo-email",
        values.email,
      );

      localStorage.setItem(
        "bharat-udyam-demo-password",
        values.password,
      );

      toast.success("Account created successfully!");

      navigate({
        to: "/dashboard",
        replace: true,
      });
    } catch (error: any) {
      console.error("Signup error:", error);
      toast.error(
        error?.message || "Something went wrong. Please try again.",
      );
    }
  }

  function handleGoogleClick() {
    toast.info(
      "Google sign-in will be available after authentication is connected.",
    );
  }

  return (
    <main
      ref={pageRef}
      className="bu-page min-h-screen overflow-x-hidden bg-background"
    >
      {/* Ambient background */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 overflow-hidden"
      >
        <div className="bg-aurora absolute inset-0 opacity-35" />
        <div className="bg-grid absolute inset-0 opacity-20" />
      </div>

      {/* Content */}
      <div className="bu-container relative mx-auto w-full max-w-3xl px-4 py-5 sm:px-6 sm:py-9 lg:px-8">

        {/* Navigation */}
        <div className="bu-nav mb-7 flex items-center justify-between sm:mb-9">
          <Link
            to="/"
            className="group inline-flex items-center gap-2 rounded-lg px-2 py-2 text-sm font-medium text-muted-foreground transition-all duration-300 hover:-translate-x-0.5 hover:text-foreground"
          >
            <ArrowLeft className="size-4 transition-transform duration-300 group-hover:-translate-x-0.5" />
            <span>Back to home</span>
          </Link>

          <Link
            to="/login"
            className="hidden text-sm font-medium text-muted-foreground transition-colors duration-300 hover:text-gold sm:block"
          >
            Already have an account?
          </Link>
        </div>

        {/* Header */}
        <header className="bu-header mb-8 text-center sm:mb-10">

          <div
            className="bu-brand-icon mx-auto mb-5 flex size-14 items-center justify-center rounded-2xl border border-gold/20 bg-gold/10"
          >
            <Building2 className="size-6 text-gold" />
          </div>

          <p className="text-xs font-bold tracking-[0.2em] text-gold uppercase">
            Get started free
          </p>

          <h1 className="mt-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
            Create your{" "}
            <span className="text-gradient-gold">
              Bharat Udyam
            </span>{" "}
            account
          </h1>

          <p className="mx-auto mt-4 max-w-xl text-sm leading-6 text-muted-foreground sm:text-[15px]">
            Tell us about your business once and we'll help
            you discover government schemes, subsidies and
            funding opportunities you're eligible for.
          </p>
        </header>

        {/* Main card */}
        <div className="bu-main-card overflow-hidden rounded-3xl border border-border/70 bg-background/80 backdrop-blur-xl">

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-7 p-5 sm:p-8 lg:p-10"
            noValidate
          >

            {/* =========================
                STEP 1
            ========================== */}

            <section className="bu-reveal">
              <div className="bu-section-heading mb-5">

                <div className="flex items-center gap-3">

                  <div className="bu-section-icon flex size-9 shrink-0 items-center justify-center rounded-xl bg-primary/10">
                    <User className="size-4 text-primary" />
                  </div>

                  <div>
                    <p className="text-[10px] font-bold tracking-[0.18em] text-gold uppercase">
                      Step 1
                    </p>

                    <h2 className="text-lg font-semibold text-foreground">
                      Personal information
                    </h2>
                  </div>

                </div>

                <p className="mt-2 text-sm text-muted-foreground">
                  Basic details we'll use to personalize your
                  account.
                </p>

              </div>

              <div className="bu-fields space-y-5">

                <TextField
                  label="Full name"
                  autoComplete="name"
                  placeholder="Aafia Shaikh"
                  icon={<User className="size-4" />}
                  error={errors.fullName?.message}
                  {...register("fullName")}
                />

                <div>
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
                      className="mt-2 text-left text-xs font-medium text-gold transition-colors hover:text-gold-soft hover:underline"
                      onClick={() => {
                        setValue(
                          "email",
                          suggestion,
                          {
                            shouldValidate: true,
                            shouldDirty: true,
                          },
                        );

                        setSuggestion(null);
                      }}
                    >
                      Did you mean {suggestion}?
                    </button>
                  )}
                </div>

                <TextField
                  label="Mobile number"
                  type="tel"
                  inputMode="numeric"
                  autoComplete="tel"
                  placeholder="9876543210"
                  icon={<Phone className="size-4" />}
                  error={errors.mobile?.message}
                  {...register("mobile")}
                />

              </div>
            </section>

            {/* Divider */}
            <div className="bu-divider h-px bg-border/60" />

            {/* =========================
                STEP 2
            ========================== */}

            <section className="bu-reveal">
              <div className="bu-section-heading mb-5">

                <div className="flex items-center gap-3">

                  <div className="bu-section-icon flex size-9 shrink-0 items-center justify-center rounded-xl bg-gold/10">
                    <Building2 className="size-4 text-gold" />
                  </div>

                  <div>
                    <p className="text-[10px] font-bold tracking-[0.18em] text-gold uppercase">
                      Step 2
                    </p>

                    <h2 className="text-lg font-semibold text-foreground">
                      Business information
                    </h2>
                  </div>

                </div>

                <p className="mt-2 text-sm text-muted-foreground">
                  Help us understand where your business
                  operates.
                </p>

              </div>

              <div className="bu-fields space-y-5">

                <TextField
                  label="Business name"
                  autoComplete="organization"
                  placeholder="Your business name"
                  icon={<Building2 className="size-4" />}
                  error={errors.businessName?.message}
                  {...register("businessName")}
                />

                <TextField
                  label="City"
                  autoComplete="address-level2"
                  placeholder="Mumbai"
                  icon={<MapPin className="size-4" />}
                  error={errors.city?.message}
                  {...register("city")}
                />

                <SelectField
                  label="State"
                  error={errors.state?.message}
                  {...register("state")}
                  options={STATES}
                />

              </div>
            </section>

            {/* Divider */}
            <div className="bu-divider h-px bg-border/60" />

            {/* =========================
                STEP 3
            ========================== */}

            <section className="bu-reveal">
              <div className="bu-section-heading mb-5">

                <div className="flex items-center gap-3">

                  <div className="bu-section-icon flex size-9 shrink-0 items-center justify-center rounded-xl bg-mint/10">
                    <ShieldCheck className="size-4 text-mint" />
                  </div>

                  <div>
                    <p className="text-[10px] font-bold tracking-[0.18em] text-gold uppercase">
                      Step 3
                    </p>

                    <h2 className="text-lg font-semibold text-foreground">
                      Account security
                    </h2>
                  </div>

                </div>

                <p className="mt-2 text-sm text-muted-foreground">
                  Create a strong password to protect your
                  account.
                </p>

              </div>

              <div className="bu-fields space-y-5">

                <div>
                  <PasswordField
                    label="Password"
                    autoComplete="new-password"
                    placeholder="Create a strong password"
                    error={errors.password?.message}
                    {...register("password")}
                  />

                  <PasswordMeter password={password} />
                </div>

                <PasswordField
                  label="Confirm password"
                  autoComplete="new-password"
                  placeholder="Re-enter your password"
                  error={errors.confirmPassword?.message}
                  {...register("confirmPassword")}
                />

              </div>
            </section>

            {/* Terms */}
            <div className="bu-terms rounded-2xl border border-border/60 bg-surface-2/30 p-4 sm:p-5">

              <label className="flex cursor-pointer items-start gap-3">

                <input
                  type="checkbox"
                  className="mt-1 size-4 shrink-0 rounded border-input accent-gold"
                  {...register("acceptTerms")}
                />

                <span className="text-sm leading-6 text-muted-foreground">
                  I agree to the{" "}
                  <Link
                    to="/terms"
                    className="font-semibold text-primary transition-colors hover:text-gold hover:underline"
                  >
                    Terms
                  </Link>{" "}
                  and{" "}
                  <Link
                    to="/privacy"
                    className="font-semibold text-primary transition-colors hover:text-gold hover:underline"
                  >
                    Privacy Policy
                  </Link>
                  .
                </span>

              </label>

              {errors.acceptTerms?.message && (
                <p className="mt-3 text-sm text-destructive">
                  {errors.acceptTerms.message}
                </p>
              )}

            </div>

            {/* Submit */}
            <div className="bu-submit-area space-y-4">

              <button
                type="submit"
                disabled={isSubmitting}
                className="bu-submit flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-gradient-gold px-5 py-3.5 text-sm font-bold text-primary-foreground disabled:cursor-not-allowed disabled:opacity-60 sm:text-[15px]"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="size-4 animate-spin" />
                    Creating your account...
                  </>
                ) : (
                  <>
                    Create account
                    <ArrowRight className="bu-arrow size-4" />
                  </>
                )}
              </button>

              {/* Divider */}
              <div className="flex items-center gap-3">

                <span className="h-px flex-1 bg-border" />

                <span className="text-[11px] font-medium tracking-wider text-muted-foreground uppercase">
                  or
                </span>

                <span className="h-px flex-1 bg-border" />

              </div>

              {/* Google */}
              <button
                type="button"
                onClick={handleGoogleClick}
                className="bu-google flex min-h-12 w-full items-center justify-center gap-3 rounded-xl border border-input bg-surface-2/40 px-4 py-3 text-sm font-semibold text-foreground sm:text-[15px]"
              >
                <svg
                  viewBox="0 0 24 24"
                  className="size-[18px] shrink-0"
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

            {/* Trust */}
            <div className="bu-trust flex items-start justify-center gap-2 px-2">

              <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-mint" />

              <p className="text-center text-xs leading-5 text-muted-foreground">
                Your information helps Bharat Udyam provide
                relevant scheme recommendations for your
                business.
              </p>

            </div>

            {/* Mobile login */}
            <p className="pb-2 text-center text-sm text-muted-foreground sm:hidden">
              Already have an account?{" "}
              <Link
                to="/login"
                className="font-semibold text-gold transition-colors hover:text-gold-soft hover:underline"
              >
                Log in
              </Link>
            </p>

          </form>
        </div>

        {/* Footer */}
        <p className="bu-footer mt-6 pb-4 text-center text-xs text-muted-foreground">
          © {new Date().getFullYear()} Bharat Udyam ·
          Empowering Indian businesses
        </p>

      </div>
    </main>
  );
}