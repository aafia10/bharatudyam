import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import {
  ArrowLeft,
  ArrowRight,
  Building2,
  CheckCircle2,
  ChevronDown,
  Fingerprint,
  Landmark,
  Loader2,
  Mail,
  MapPin,
  Phone,
  ShieldCheck,
  User,
  UserRound,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { supabase } from "@/lib/supabase";

export const Route = createFileRoute("/nbfc-signup")({
  head: () => ({
    meta: [
      {
        title: "NBFC Registration — Bharat Udyam",
      },
      {
        name: "description",
        content:
          "Register your NBFC team with Bharat Udyam.",
      },
    ],
  }),
  component: NbfcSignupPage,
});

const ROLES = [
  "RM / Field Officer",
  "Branch Manager",
  "Credit Analyst",
  "Operations / Disbursement",
  "System Admin",
];

/**
 * Maps the role selected during NBFC registration to its own workspace.
 * Operations and System Admin are intentionally kept as placeholders
 * until their dedicated dashboards are created.
 */
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

const BRANCHES = [
  "Andheri West",
  "Andheri East",
  "Bandra",
  "Borivali",
  "Thane",
  "Navi Mumbai",
  "Pune",
];

const REGIONS = [
  "Mumbai North",
  "Mumbai South",
  "Mumbai Central",
  "Thane Region",
  "Navi Mumbai Region",
  "Pune Region",
];

type FormState = {
  fullName: string;
  employeeId: string;
  email: string;
  mobile: string;
  role: string;
  branch: string;
  region: string;
  pin: string;
  confirmPin: string;
};

function NbfcSignupPage() {
  const navigate = useNavigate();
  const pageRef = useRef<HTMLElement | null>(null);

  const [step, setStep] = useState(1);

  const [sendingOtp, setSendingOtp] = useState(false);
  const [verifyingOtp, setVerifyingOtp] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [resendTimer, setResendTimer] = useState(0);

  const [completed, setCompleted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  function fillDemoNbfc() {
    const randomNum = Math.floor(1000 + Math.random() * 9000);
    setForm({
      fullName: "Anand Verma",
      employeeId: `NBFC-RM-${randomNum}`,
      email: `rm.anand_${randomNum}@nbfc-finance.com`,
      mobile: "9876543210",
      role: "RM / Field Officer",
      branch: "Andheri West",
      region: "Mumbai North",
      pin: "1234",
      confirmPin: "1234",
    });
    toast.success("Demo NBFC details pre-filled!");
  }

  const [form, setForm] = useState<FormState>({
    fullName: "",
    employeeId: "",
    email: "",
    mobile: "",
    role: "",
    branch: "",
    region: "",
    pin: "",
    confirmPin: "",
  });

  /*
   * ============================================================
   * SCROLL / STEP ANIMATION
   * ============================================================
   */

  useEffect(() => {
    const root = pageRef.current;

    if (!root) return;

    const elements =
      root.querySelectorAll<HTMLElement>(".bu-nbfc-reveal");

    if (!elements.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add(
              "bu-nbfc-reveal-visible",
            );
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px",
      },
    );

    elements.forEach((element) => {
      observer.observe(element);
    });

    return () => observer.disconnect();
  }, [step]);

  /*
   * ============================================================
   * OTP TIMER
   * ============================================================
   */

  useEffect(() => {
    if (resendTimer <= 0) return;

    const timer = window.setInterval(() => {
      setResendTimer((current) =>
        current > 0 ? current - 1 : 0,
      );
    }, 1000);

    return () => window.clearInterval(timer);
  }, [resendTimer]);

  /*
   * ============================================================
   * FORM UPDATE
   * ============================================================
   */

  function updateField(
    field: keyof FormState,
    value: string,
  ) {
    setForm((current) => ({
      ...current,
      [field]: value,
    }));
  }

  /*
   * ============================================================
   * STEP 1 VALIDATION
   * ============================================================
   */

  function validateIdentity() {
    if (!form.fullName.trim()) {
      toast.error("Please enter your full name.");
      return false;
    }

    if (!form.employeeId.trim()) {
      toast.error("Please enter your Employee ID.");
      return false;
    }

    if (!form.email.trim()) {
      toast.error("Please enter your corporate email.");
      return false;
    }

    if (!form.email.includes("@")) {
      toast.error("Please enter a valid corporate email.");
      return false;
    }

    if (!/^\d{10}$/.test(form.mobile)) {
      toast.error(
        "Please enter a valid 10-digit mobile number.",
      );
      return false;
    }

    return true;
  }

  /*
   * ============================================================
   * STEP 2 VALIDATION
   * ============================================================
   */

  function validateHierarchy() {
    if (!form.role) {
      toast.error("Please select your role.");
      return false;
    }

    if (!form.branch) {
      toast.error("Please select your branch.");
      return false;
    }

    if (!form.region) {
      toast.error("Please select your region.");
      return false;
    }

    return true;
  }

  /*
   * ============================================================
   * SEND OTP
   *
   * FRONTEND DEMO ONLY
   * ============================================================
   */

  function sendOtp() {
    if (!form.employeeId.trim() && !form.mobile.trim()) {
      toast.error(
        "Enter your Employee ID or mobile number.",
      );
      return;
    }

    setSendingOtp(true);

    window.setTimeout(() => {
      setSendingOtp(false);
      setOtpSent(true);
      setResendTimer(30);

      toast.success(
        "Demo OTP sent to your registered mobile number.",
      );
    }, 900);
  }

  /*
   * ============================================================
   * VERIFY OTP
   *
   * DEMO OTP = 123456
   * ============================================================
   */

  function verifyOtp() {
    if (!/^\d{6}$/.test(otp)) {
      toast.error("Enter the 6-digit OTP.");
      return;
    }

    setVerifyingOtp(true);

    window.setTimeout(() => {
      setVerifyingOtp(false);

      if (otp !== "123456") {
        toast.error(
          "Incorrect OTP. Use 123456 for this demo.",
        );
        return;
      }

      toast.success("Mobile number verified.");
      setStep(4);
    }, 700);
  }

  /*
   * ============================================================
   * RESEND OTP
   * ============================================================
   */

  function resendOtp() {
    if (resendTimer > 0) return;

    setOtp("");

    sendOtp();
  }

  /*
   * ============================================================
   * FINAL REGISTRATION
   *
   * FRONTEND ONLY
   * ============================================================
   */

  async function finishRegistration() {
    if (form.pin.length !== 4) {
      toast.error("PIN must contain 4 digits.");
      return;
    }

    if (form.pin !== form.confirmPin) {
      toast.error("PINs do not match.");
      return;
    }

    setSubmitting(true);

    try {
      const authPassword = `nbfc_pin_${form.pin}`;
      const { data, error } = await supabase.auth.signUp({
        email: form.email.trim().toLowerCase(),
        password: authPassword,
        options: {
          data: {
            fullName: form.fullName.trim(),
            employeeId: form.employeeId.trim(),
            mobile: form.mobile.trim(),
            role: form.role,
            branch: form.branch,
            region: form.region,
            userType: "NBFC",
            pin: form.pin,
          },
        },
      });

      if (error) {
        toast.error(error.message || "Failed to register NBFC account.");
        setSubmitting(false);
        return;
      }

      const dashboardRoute = getDashboardRoute(form.role);

      const nbfcUser = {
        fullName: form.fullName.trim(),
        employeeId: form.employeeId.trim(),
        email: form.email.trim().toLowerCase(),
        mobile: form.mobile.trim(),
        role: form.role,
        branch: form.branch,
        region: form.region,
        userType: "NBFC",
        dashboardRoute,
      };

      localStorage.setItem(
        "bharat-udyam-nbfc-user",
        JSON.stringify(nbfcUser),
      );

      localStorage.setItem(
        "bharat-udyam-user",
        JSON.stringify(nbfcUser),
      );

      localStorage.setItem(
        "bharat-udyam-authenticated",
        "true",
      );

      setCompleted(true);

      toast.success(
        "NBFC profile registered successfully in Supabase!",
      );
    } catch (err: any) {
      console.error("NBFC signup error:", err);
      toast.error(err?.message || "Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  /*
   * ============================================================
   * NEXT
   * ============================================================
   */

  function handleNext() {
    if (step === 1) {
      if (!validateIdentity()) return;

      setStep(2);
      return;
    }

    if (step === 2) {
      if (!validateHierarchy()) return;

      setStep(3);
      return;
    }

    if (step === 3) {
      if (!otpSent) {
        sendOtp();
      } else {
        verifyOtp();
      }

      return;
    }

    if (step === 4) {
      finishRegistration();
    }
  }

  /*
   * ============================================================
   * COMPLETED SCREEN
   * ============================================================
   */

  if (completed) {
    return (
      <main className="bu-nbfc-page min-h-screen">
        <div
          aria-hidden="true"
          className="pointer-events-none fixed inset-0 overflow-hidden"
        >
          <div className="bu-nbfc-aurora absolute inset-0" />
          <div className="bu-nbfc-grid absolute inset-0" />
        </div>

        <div className="bu-nbfc-container relative mx-auto flex min-h-screen w-full max-w-3xl items-center justify-center px-4 py-10 sm:px-6">

          <div className="bu-nbfc-success-card w-full rounded-3xl border border-border/70 bg-background/85 p-7 text-center backdrop-blur-xl sm:p-10">

            <div className="bu-nbfc-success-icon mx-auto mb-6 flex size-16 items-center justify-center rounded-2xl border border-mint/20 bg-mint/10">
              <CheckCircle2 className="size-8 text-mint" />
            </div>

            <p className="text-xs font-bold uppercase tracking-[0.2em] text-gold">
              Registration complete
            </p>

            <h1 className="mt-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Welcome to{" "}
              <span className="text-gradient-gold">
                Bharat Udyam
              </span>
            </h1>

            <p className="mx-auto mt-4 max-w-lg text-sm leading-6 text-muted-foreground">
              Your NBFC team profile has been created
              successfully. You will continue to the
              workspace assigned to your role.
            </p>

            <div className="mt-7 rounded-2xl border border-border/60 bg-surface-2/30 p-4 text-left">

              <div className="flex items-center gap-3">

                <div className="flex size-10 items-center justify-center rounded-xl bg-gold/10">
                  <UserRound className="size-5 text-gold" />
                </div>

                <div>
                  <p className="text-sm font-semibold text-foreground">
                    {form.fullName}
                  </p>

                  <p className="text-xs text-muted-foreground">
                    {form.role} · {form.branch}
                  </p>
                  <p className="mt-1 text-xs font-semibold text-mint">
                    {getDashboardRoute(form.role)}
                  </p>
                </div>

              </div>

            </div>

            <button
              type="button"
              onClick={() =>
                navigate({
                  to: getDashboardRoute(form.role),
                  replace: true,
                })
              }
              className="bu-nbfc-primary-button mt-7 flex min-h-12 w-full items-center justify-center gap-2 rounded-xl px-5 py-3.5 text-sm font-bold"
            >
              Continue to workspace
              <ArrowRight className="size-4" />
            </button>

            <Link
              to="/"
              className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-gold"
            >
              <ArrowLeft className="size-4" />
              Back to home
            </Link>

          </div>
        </div>
      </main>
    );
  }

  /*
   * ============================================================
   * MAIN PAGE
   * ============================================================
   */

  return (
    <main
      ref={pageRef}
      className="bu-nbfc-page min-h-screen overflow-x-hidden"
    >

      {/* BACKGROUND */}

      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 overflow-hidden"
      >
        <div className="bu-nbfc-aurora absolute inset-0" />
        <div className="bu-nbfc-grid absolute inset-0" />
      </div>

      <div className="bu-nbfc-container relative mx-auto w-full max-w-3xl px-4 py-5 sm:px-6 sm:py-9 lg:px-8">

        {/* NAV */}

        <div className="bu-nbfc-nav mb-7 flex items-center justify-between sm:mb-9">

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
            Already registered?
          </Link>

        </div>

        {/* HEADER */}

        <header className="bu-nbfc-header mb-8 text-center sm:mb-10">

          <div className="bu-nbfc-brand-icon mx-auto mb-5 flex size-14 items-center justify-center rounded-2xl border border-gold/20 bg-gold/10">
            <Landmark className="size-6 text-gold" />
          </div>

          <p className="text-xs font-bold uppercase tracking-[0.2em] text-gold">
            NBFC Partner Registration
          </p>

          <h1 className="mt-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
            Join{" "}
            <span className="text-gradient-gold">
              Bharat Udyam
            </span>
          </h1>

          <p className="mx-auto mt-4 max-w-xl text-sm leading-6 text-muted-foreground sm:text-[15px]">
            Register your NBFC team and securely access
            business and credit opportunities across
            Bharat.
          </p>

        </header>

        {/* PROGRESS */}

        <div className="bu-nbfc-progress mb-6 rounded-2xl border border-border/60 bg-background/70 p-3 backdrop-blur-xl sm:p-4">

          <div className="flex items-center justify-between">

            {[1, 2, 3, 4].map((item) => (
              <div
                key={item}
                className="flex items-center"
              >

                <div
                  className={[
                    "bu-nbfc-progress-number flex size-8 items-center justify-center rounded-full text-xs font-bold sm:size-9",
                    step >= item
                      ? "bu-nbfc-progress-active"
                      : "bu-nbfc-progress-inactive",
                  ].join(" ")}
                >
                  {step > item ? (
                    <CheckCircle2 className="size-4" />
                  ) : (
                    item
                  )}
                </div>

                {item !== 4 && (
                  <div
                    className={[
                      "bu-nbfc-progress-line mx-1.5 h-px w-8 sm:mx-3 sm:w-12",
                      step > item
                        ? "bu-nbfc-progress-line-active"
                        : "",
                    ].join(" ")}
                  />
                )}

              </div>
            ))}

          </div>

          <div className="mt-2 hidden grid-cols-4 text-center sm:grid">
            <span className="text-[10px] font-medium text-muted-foreground">
              Identity
            </span>
            <span className="text-[10px] font-medium text-muted-foreground">
              Role
            </span>
            <span className="text-[10px] font-medium text-muted-foreground">
              Verify
            </span>
            <span className="text-[10px] font-medium text-muted-foreground">
              Secure
            </span>
          </div>

        </div>

        {/* MAIN CARD */}

        <div className="bu-nbfc-card overflow-hidden rounded-3xl border border-border/70 bg-background/80 backdrop-blur-xl">

          <div className="space-y-7 p-5 sm:p-8 lg:p-10">

            {/* ==================================================
                STEP 1 — IDENTITY
            ================================================== */}

            {step === 1 && (
              <section className="bu-nbfc-reveal bu-nbfc-reveal-visible">

                <div className="bu-nbfc-section-heading mb-5">

                  <div className="flex items-center gap-3">

                    <div className="bu-nbfc-section-icon flex size-9 shrink-0 items-center justify-center rounded-xl bg-primary/10">
                      <User className="size-4 text-primary" />
                    </div>

                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-gold">
                        Step 1
                      </p>

                      <h2 className="text-lg font-semibold text-foreground">
                        Identity details
                      </h2>
                    </div>

                  </div>

                  <p className="mt-2 text-sm text-muted-foreground">
                    Enter your official employee information.
                  </p>

                </div>

                <div className="mb-4 flex justify-end">
                  <button
                    type="button"
                    onClick={fillDemoNbfc}
                    className="inline-flex items-center gap-1.5 rounded-lg border border-dashed border-mint/40 bg-mint/5 hover:bg-mint/10 px-3 py-1.5 text-xs font-semibold text-mint transition-colors cursor-pointer"
                  >
                    Auto-fill Demo NBFC Details
                  </button>
                </div>

                <div className="bu-nbfc-fields space-y-5">

                  {/* NAME */}

                  <div>
                    <label className="mb-2 block text-sm font-semibold text-foreground">
                      Full name
                    </label>

                    <div className="bu-nbfc-input-wrapper relative">
                      <User className="absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />

                      <input
                        value={form.fullName}
                        onChange={(e) =>
                          updateField(
                            "fullName",
                            e.target.value,
                          )
                        }
                        placeholder="Enter your full name"
                        className="bu-nbfc-input h-12 w-full rounded-xl border border-input bg-surface-2/40 pl-10 pr-4 text-sm text-foreground outline-none placeholder:text-muted-foreground/60"
                      />
                    </div>
                  </div>

                  {/* EMPLOYEE ID */}

                  <div>
                    <label className="mb-2 block text-sm font-semibold text-foreground">
                      Employee ID
                    </label>

                    <div className="bu-nbfc-input-wrapper relative">
                      <Building2 className="absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />

                      <input
                        value={form.employeeId}
                        onChange={(e) =>
                          updateField(
                            "employeeId",
                            e.target.value.toUpperCase(),
                          )
                        }
                        placeholder="e.g. NBFC-10245"
                        className="bu-nbfc-input h-12 w-full rounded-xl border border-input bg-surface-2/40 pl-10 pr-4 text-sm uppercase text-foreground outline-none placeholder:text-muted-foreground/60"
                      />
                    </div>

                    <p className="mt-1.5 text-xs text-muted-foreground">
                      Your unique employee identifier.
                    </p>
                  </div>

                  {/* EMAIL */}

                  <div>
                    <label className="mb-2 block text-sm font-semibold text-foreground">
                      Corporate email
                    </label>

                    <div className="bu-nbfc-input-wrapper relative">
                      <Mail className="absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />

                      <input
                        type="email"
                        value={form.email}
                        onChange={(e) =>
                          updateField(
                            "email",
                            e.target.value,
                          )
                        }
                        placeholder="name@company.com"
                        className="bu-nbfc-input h-12 w-full rounded-xl border border-input bg-surface-2/40 pl-10 pr-4 text-sm text-foreground outline-none placeholder:text-muted-foreground/60"
                      />
                    </div>
                  </div>

                  {/* MOBILE */}

                  <div>
                    <label className="mb-2 block text-sm font-semibold text-foreground">
                      Registered mobile number
                    </label>

                    <div className="bu-nbfc-input-wrapper relative">
                      <Phone className="absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />

                      <input
                        type="tel"
                        inputMode="numeric"
                        maxLength={10}
                        value={form.mobile}
                        onChange={(e) =>
                          updateField(
                            "mobile",
                            e.target.value.replace(
                              /\D/g,
                              "",
                            ),
                          )
                        }
                        placeholder="9876543210"
                        className="bu-nbfc-input h-12 w-full rounded-xl border border-input bg-surface-2/40 pl-10 pr-4 text-sm text-foreground outline-none placeholder:text-muted-foreground/60"
                      />
                    </div>

                    <div className="mt-2 flex items-center gap-2 text-xs text-muted-foreground">
                      <ShieldCheck className="size-3.5 text-mint" />
                      OTP will be sent to this number.
                    </div>
                  </div>

                </div>

              </section>
            )}

            {/* ==================================================
                STEP 2 — ROLE
            ================================================== */}

            {step === 2 && (
              <section className="bu-nbfc-reveal bu-nbfc-reveal-visible">

                <div className="bu-nbfc-section-heading mb-5">

                  <div className="flex items-center gap-3">

                    <div className="bu-nbfc-section-icon flex size-9 shrink-0 items-center justify-center rounded-xl bg-gold/10">
                      <Building2 className="size-4 text-gold" />
                    </div>

                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-gold">
                        Step 2
                      </p>

                      <h2 className="text-lg font-semibold text-foreground">
                        Role & hierarchy
                      </h2>
                    </div>

                  </div>

                  <p className="mt-2 text-sm text-muted-foreground">
                    Map your responsibilities and branch
                    hierarchy.
                  </p>

                </div>

                <div className="bu-nbfc-fields space-y-5">

                  {/* ROLE */}

                  <div>
                    <label className="mb-2 block text-sm font-semibold text-foreground">
                      Role
                    </label>

                    <div className="relative">
                      <select
                        value={form.role}
                        onChange={(e) =>
                          updateField(
                            "role",
                            e.target.value,
                          )
                        }
                        className="bu-nbfc-input bu-nbfc-select h-12 w-full appearance-none rounded-xl border border-input bg-surface-2/40 px-4 pr-10 text-sm text-foreground outline-none"
                      >
                        <option value="">
                          Select your role
                        </option>

                        {ROLES.map((role) => (
                          <option
                            key={role}
                            value={role}
                          >
                            {role}
                          </option>
                        ))}
                      </select>

                      <ChevronDown className="pointer-events-none absolute right-4 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                    </div>
                  </div>

                  {/* BRANCH */}

                  <div>
                    <label className="mb-2 block text-sm font-semibold text-foreground">
                      Branch
                    </label>

                    <div className="relative">
                      <MapPin className="absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />

                      <select
                        value={form.branch}
                        onChange={(e) =>
                          updateField(
                            "branch",
                            e.target.value,
                          )
                        }
                        className="bu-nbfc-input bu-nbfc-select h-12 w-full appearance-none rounded-xl border border-input bg-surface-2/40 pl-10 pr-10 text-sm text-foreground outline-none"
                      >
                        <option value="">
                          Select branch
                        </option>

                        {BRANCHES.map(
                          (branch) => (
                            <option
                              key={branch}
                              value={branch}
                            >
                              {branch}
                            </option>
                          ),
                        )}
                      </select>

                      <ChevronDown className="pointer-events-none absolute right-4 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                    </div>
                  </div>

                  {/* REGION */}

                  <div>
                    <label className="mb-2 block text-sm font-semibold text-foreground">
                      Region / Zone
                    </label>

                    <div className="relative">
                      <MapPin className="absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />

                      <select
                        value={form.region}
                        onChange={(e) =>
                          updateField(
                            "region",
                            e.target.value,
                          )
                        }
                        className="bu-nbfc-input bu-nbfc-select h-12 w-full appearance-none rounded-xl border border-input bg-surface-2/40 pl-10 pr-10 text-sm text-foreground outline-none"
                      >
                        <option value="">
                          Select region
                        </option>

                        {REGIONS.map(
                          (region) => (
                            <option
                              key={region}
                              value={region}
                            >
                              {region}
                            </option>
                          ),
                        )}
                      </select>

                      <ChevronDown className="pointer-events-none absolute right-4 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                    </div>
                  </div>

                </div>

                {/* MAPPING PREVIEW */}

                {form.branch &&
                  form.region &&
                  form.role && (
                    <div className="bu-nbfc-mapping-preview mt-6 rounded-2xl border border-gold/15 bg-gold/5 p-4">

                      <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-gold">
                        Your mapping
                      </p>

                      <div className="mt-3 grid gap-3 sm:grid-cols-3">

                        <div>
                          <p className="text-[11px] text-muted-foreground">
                            Role
                          </p>

                          <p className="mt-0.5 text-sm font-semibold text-foreground">
                            {form.role}
                          </p>
                        </div>

                        <div>
                          <p className="text-[11px] text-muted-foreground">
                            Branch
                          </p>

                          <p className="mt-0.5 text-sm font-semibold text-foreground">
                            {form.branch}
                          </p>
                        </div>

                        <div>
                          <p className="text-[11px] text-muted-foreground">
                            Region
                          </p>

                          <p className="mt-0.5 text-sm font-semibold text-foreground">
                            {form.region}
                          </p>
                        </div>

                      </div>

                    </div>
                  )}

              </section>
            )}

            {/* ==================================================
                STEP 3 — OTP
            ================================================== */}

            {step === 3 && (
              <section className="bu-nbfc-reveal bu-nbfc-reveal-visible">

                <div className="bu-nbfc-section-heading mb-5">

                  <div className="flex items-center gap-3">

                    <div className="bu-nbfc-section-icon flex size-9 shrink-0 items-center justify-center rounded-xl bg-mint/10">
                      <ShieldCheck className="size-4 text-mint" />
                    </div>

                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-gold">
                        Step 3
                      </p>

                      <h2 className="text-lg font-semibold text-foreground">
                        Verify your identity
                      </h2>
                    </div>

                  </div>

                  <p className="mt-2 text-sm text-muted-foreground">
                    Verify your registered mobile number
                    before accessing the workspace.
                  </p>

                </div>

                {/* USER DETAILS */}

                <div className="bu-nbfc-identity-summary rounded-2xl border border-border/60 bg-surface-2/30 p-4 sm:p-5">

                  <div className="flex items-start gap-3">

                    <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-gold/10">
                      <UserRound className="size-5 text-gold" />
                    </div>

                    <div className="min-w-0">

                      <p className="text-xs text-muted-foreground">
                        Employee ID
                      </p>

                      <p className="mt-0.5 text-sm font-semibold text-foreground">
                        {form.employeeId}
                      </p>

                      <p className="mt-2 text-xs text-muted-foreground">
                        Registered mobile
                      </p>

                      <p className="mt-0.5 text-sm font-semibold text-foreground">
                        +91 ••••••{form.mobile.slice(-4)}
                      </p>

                    </div>

                  </div>

                </div>

                {!otpSent ? (
                  <div className="bu-nbfc-otp-ready mt-5 rounded-2xl border border-mint/15 bg-mint/5 p-4">

                    <div className="flex gap-3">

                      <ShieldCheck className="mt-0.5 size-5 shrink-0 text-mint" />

                      <div>
                        <p className="text-sm font-semibold text-foreground">
                          Ready to verify
                        </p>

                        <p className="mt-1 text-xs leading-5 text-muted-foreground">
                          A 6-digit verification code will
                          be sent to your registered mobile
                          number.
                        </p>
                      </div>

                    </div>

                  </div>
                ) : (
                  <div className="bu-nbfc-otp-box mt-5">

                    <label className="mb-2 block text-sm font-semibold text-foreground">
                      Enter 6-digit OTP
                    </label>

                    <input
                      autoFocus
                      inputMode="numeric"
                      maxLength={6}
                      value={otp}
                      onChange={(e) =>
                        setOtp(
                          e.target.value.replace(
                            /\D/g,
                            "",
                          ),
                        )
                      }
                      placeholder="••••••"
                      className="bu-nbfc-otp-input h-14 w-full rounded-xl border border-input bg-surface-2/40 px-4 text-center text-xl font-bold tracking-[0.45em] text-foreground outline-none placeholder:text-muted-foreground/40"
                    />

                    <div className="mt-3 flex items-center justify-between">

                      <p className="text-xs text-muted-foreground">
                        Didn't receive the code?
                      </p>

                      <button
                        type="button"
                        disabled={resendTimer > 0}
                        onClick={resendOtp}
                        className="text-xs font-semibold text-gold transition-opacity disabled:cursor-not-allowed disabled:opacity-40"
                      >
                        {resendTimer > 0
                          ? `Resend in ${resendTimer}s`
                          : "Resend OTP"}
                      </button>

                    </div>

                    <div className="bu-nbfc-demo-otp mt-5 rounded-xl border border-gold/15 bg-gold/5 p-3">
                      <p className="text-center text-xs text-muted-foreground">
                        Frontend demo OTP:{" "}
                        <strong className="text-gold">
                          123456
                        </strong>
                      </p>
                    </div>

                  </div>
                )}

              </section>
            )}

            {/* ==================================================
                STEP 4 — SECURITY
            ================================================== */}

            {step === 4 && (
              <section className="bu-nbfc-reveal bu-nbfc-reveal-visible">

                <div className="bu-nbfc-section-heading mb-5">

                  <div className="flex items-center gap-3">

                    <div className="bu-nbfc-section-icon flex size-9 shrink-0 items-center justify-center rounded-xl bg-mint/10">
                      <Fingerprint className="size-4 text-mint" />
                    </div>

                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-gold">
                        Step 4
                      </p>

                      <h2 className="text-lg font-semibold text-foreground">
                        Secure your access
                      </h2>
                    </div>

                  </div>

                  <p className="mt-2 text-sm text-muted-foreground">
                    Create a 4-digit PIN for quick future
                    access.
                  </p>

                </div>

                <div className="bu-nbfc-fields space-y-5">

                  {/* PIN */}

                  <div>
                    <label className="mb-2 block text-sm font-semibold text-foreground">
                      Create PIN
                    </label>

                    <input
                      type="password"
                      inputMode="numeric"
                      maxLength={4}
                      value={form.pin}
                      onChange={(e) =>
                        updateField(
                          "pin",
                          e.target.value.replace(
                            /\D/g,
                            "",
                          ),
                        )
                      }
                      placeholder="••••"
                      className="bu-nbfc-pin-input h-12 w-full rounded-xl border border-input bg-surface-2/40 px-4 text-center text-lg font-bold tracking-[0.5em] text-foreground outline-none placeholder:text-muted-foreground/40"
                    />
                  </div>

                  {/* CONFIRM */}

                  <div>
                    <label className="mb-2 block text-sm font-semibold text-foreground">
                      Confirm PIN
                    </label>

                    <input
                      type="password"
                      inputMode="numeric"
                      maxLength={4}
                      value={form.confirmPin}
                      onChange={(e) =>
                        updateField(
                          "confirmPin",
                          e.target.value.replace(
                            /\D/g,
                            "",
                          ),
                        )
                      }
                      placeholder="••••"
                      className="bu-nbfc-pin-input h-12 w-full rounded-xl border border-input bg-surface-2/40 px-4 text-center text-lg font-bold tracking-[0.5em] text-foreground outline-none placeholder:text-muted-foreground/40"
                    />
                  </div>

                </div>

                {/* BIOMETRIC */}

                <div className="bu-nbfc-biometric mt-6 rounded-2xl border border-border/60 bg-surface-2/30 p-4">

                  <div className="flex items-center gap-3">

                    <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-mint/10">
                      <Fingerprint className="size-5 text-mint" />
                    </div>

                    <div className="min-w-0 flex-1">

                      <p className="text-sm font-semibold text-foreground">
                        Biometric login
                      </p>

                      <p className="mt-0.5 text-xs text-muted-foreground">
                        Enable device biometrics after your
                        first successful login.
                      </p>

                    </div>

                    <span className="rounded-full border border-border bg-background px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                      Coming soon
                    </span>

                  </div>

                </div>

                <div className="mt-5 flex items-start gap-2 px-1">
                  <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-mint" />

                  <p className="text-xs leading-5 text-muted-foreground">
                    Your identity is verified. Your account and 4-digit PIN
                    access will be securely registered in Supabase.
                  </p>
                </div>

              </section>
            )}

            {/* ==================================================
                ACTION BUTTONS
            ================================================== */}

            <div className="bu-nbfc-actions flex flex-col gap-3 pt-2 sm:flex-row">

              {step > 1 && (
                <button
                  type="button"
                  disabled={submitting}
                  onClick={() => {
                    setStep(
                      (current) =>
                        current - 1,
                    );

                    if (step === 3) {
                      setOtpSent(false);
                      setOtp("");
                    }
                  }}
                  className="bu-nbfc-back-button flex min-h-12 items-center justify-center gap-2 rounded-xl border border-border bg-surface-2/40 px-5 py-3.5 text-sm font-semibold text-muted-foreground sm:w-auto disabled:cursor-not-allowed disabled:opacity-60"
                >
                  <ArrowLeft className="size-4" />
                  Back
                </button>
              )}

              <button
                type="button"
                onClick={handleNext}
                disabled={
                  sendingOtp ||
                  verifyingOtp ||
                  submitting
                }
                className="bu-nbfc-primary-button flex min-h-12 flex-1 items-center justify-center gap-2 rounded-xl px-5 py-3.5 text-sm font-bold disabled:cursor-not-allowed disabled:opacity-60"
              >

                {submitting ? (
                  <>
                    <Loader2 className="size-4 animate-spin" />
                    Registering with Supabase...
                  </>
                ) : sendingOtp ? (
                  <>
                    <Loader2 className="size-4 animate-spin" />
                    Sending OTP...
                  </>
                ) : verifyingOtp ? (
                  <>
                    <Loader2 className="size-4 animate-spin" />
                    Verifying...
                  </>
                ) : step === 3 && !otpSent ? (
                  <>
                    Send OTP
                    <ArrowRight className="size-4" />
                  </>
                ) : step === 3 ? (
                  <>
                    Verify OTP
                    <ShieldCheck className="size-4" />
                  </>
                ) : step === 4 ? (
                  <>
                    Complete registration
                    <CheckCircle2 className="size-4" />
                  </>
                ) : (
                  <>
                    Continue
                    <ArrowRight className="size-4" />
                  </>
                )}

              </button>

            </div>

            {/* TRUST */}

            <div className="bu-nbfc-trust flex items-start justify-center gap-2 px-2">

              <ShieldCheck className="mt-0.5 size-4 shrink-0 text-mint" />

              <p className="text-center text-xs leading-5 text-muted-foreground">
                Designed for secure NBFC employee onboarding
                and role-based access.
              </p>

            </div>

          </div>
        </div>

        {/* FOOTER */}

        <p className="bu-nbfc-footer mt-6 pb-4 text-center text-xs text-muted-foreground">
          © {new Date().getFullYear()} Bharat Udyam ·
          Empowering Indian businesses
        </p>

      </div>
    </main>
  );
}