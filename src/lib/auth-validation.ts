import { z } from "zod";


/** Disposable / throwaway mail providers are rejected at signup. */
const DISPOSABLE_DOMAINS = new Set([
  "mailinator.com",
  "yopmail.com",
  "guerrillamail.com",
  "10minutemail.com",
  "tempmail.com",
  "temp-mail.org",
  "trashmail.com",
  "sharklasers.com",
  "getnada.com",
  "dispostable.com",
  "fakeinbox.com",
  "throwawaymail.com",
  "maildrop.cc",
  "mintemail.com",
]);

/** Common typos we can confidently suggest a fix for. */
const DOMAIN_TYPOS: Record<string, string> = {
  "gmial.com": "gmail.com",
  "gmail.co": "gmail.com",
  "gmail.cm": "gmail.com",
  "gnail.com": "gmail.com",
  "gmai.com": "gmail.com",
  "yahho.com": "yahoo.com",
  "yaho.com": "yahoo.com",
  "hotmial.com": "hotmail.com",
  "outlok.com": "outlook.com",
  "rediffmial.com": "rediffmail.com",
};

export function emailDomain(email: string): string {
  return email.trim().toLowerCase().split("@")[1] ?? "";
}

export function suggestEmailFix(email: string): string | null {
  const domain = emailDomain(email);
  const fix = DOMAIN_TYPOS[domain];
  if (!fix) return null;
  return `${email.trim().toLowerCase().split("@")[0]}@${fix}`;
}

const emailField = z
  .string()
  .trim()
  .min(1, { message: "Email address is required" })
  .max(254, { message: "Email address is too long" })
  .email({ message: "Enter a valid email address" })
  .transform((value) => value.toLowerCase())
  .refine((value) => /^[^@\s]+@[^@\s.]+(\.[^@\s.]+)+$/.test(value), {
    message: "Enter a valid email address (example: name@company.com)",
  })
  .refine((value) => !DISPOSABLE_DOMAINS.has(emailDomain(value)), {
    message: "Temporary email addresses aren't allowed — use your business email",
  });

const passwordField = z
  .string()
  .min(10, { message: "Use at least 10 characters" })
  .max(72, { message: "Password must be 72 characters or fewer" })
  .regex(/[a-z]/, { message: "Add at least one lowercase letter" })
  .regex(/[A-Z]/, { message: "Add at least one uppercase letter" })
  .regex(/\d/, { message: "Add at least one number" })
  .regex(/[^A-Za-z0-9]/, { message: "Add at least one symbol" })
  .refine((value) => !/\s/.test(value), { message: "Password can't contain spaces" })
  .refine((value) => !/(.)\1{2,}/.test(value), {
    message: "Avoid repeating the same character 3+ times",
  });

export const loginSchema = z.object({
  email: emailField,
  password: z.string().min(1, { message: "Password is required" }),
});

export const signupSchema = z
  .object({
    fullName: z
      .string()
      .trim()
      .min(3, { message: "Enter your full name" })
      .max(80, { message: "Name must be under 80 characters" })
      .regex(/^[A-Za-z][A-Za-z\s.'-]*$/, { message: "Letters, spaces, apostrophes only" }),
    mobile: z
      .string()
      .trim()
      .transform((value) => value.replace(/[\s-]/g, "").replace(/^(\+91|0)/, ""))
      .refine((value) => /^[6-9]\d{9}$/.test(value), {
        message: "Enter a valid 10-digit Indian mobile number",
      }),
    email: emailField,
    businessName: z
      .string()
      .trim()
      .min(2, { message: "Enter your business name" })
      .max(120, { message: "Business name must be under 120 characters" }),
    city: z
      .string()
      .trim()
      .min(2, { message: "Enter your city" })
      .max(60, { message: "City must be under 60 characters" })
      .regex(/^[A-Za-z][A-Za-z\s.'-]*$/, { message: "Enter a valid city name" }),
    state: z.string().min(1, { message: "Select your state" }),
    password: passwordField,
    confirmPassword: z.string().min(1, { message: "Confirm your password" }),
    acceptTerms: z.literal(true, {
      errorMap: () => ({ message: "Please accept the Terms and Privacy Policy" }),
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords don't match",
  })
  .refine(
    (data) => !data.password.toLowerCase().includes(data.email.split("@")[0]?.toLowerCase() ?? "@"),
    { path: ["password"], message: "Password can't contain your email name" },
  )
  .refine(
    (data) =>
      !data.fullName
        .toLowerCase()
        .split(/\s+/)
        .some((part) => part.length > 2 && data.password.toLowerCase().includes(part)),
    { path: ["password"], message: "Password can't contain your name" },
  );

export const newPasswordSchema = z
  .object({
    password: passwordField,
    confirmPassword: z.string().min(1, { message: "Confirm your password" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords don't match",
  });

export const forgotPasswordSchema = z.object({ email: emailField });

export type LoginValues = z.infer<typeof loginSchema>;
export type SignupValues = z.infer<typeof signupSchema>;

export type PasswordCheck = { label: string; met: boolean };

export function passwordChecks(value: string): PasswordCheck[] {
  return [
    { label: "10+ characters", met: value.length >= 10 },
    { label: "Uppercase letter", met: /[A-Z]/.test(value) },
    { label: "Lowercase letter", met: /[a-z]/.test(value) },
    { label: "Number", met: /\d/.test(value) },
    { label: "Symbol", met: /[^A-Za-z0-9]/.test(value) },
  ];
}

export function friendlyAuthError(message: string): string {
  const normalized = message.toLowerCase();

  if (normalized.includes("user already registered")) {
    return "An account with this email already exists. Try logging in instead.";
  }

  if (normalized.includes("invalid login credentials")) {
    return "Incorrect email or password. Please check your details and try again.";
  }

  if (normalized.includes("email not confirmed")) {
    return "Please verify your email address before logging in.";
  }

  if (normalized.includes("rate limit")) {
    return "Too many attempts. Please wait a moment and try again.";
  }

  return "Something went wrong. Please try again.";
}