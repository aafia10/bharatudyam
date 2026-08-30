import { z } from "zod";

// India-specific mobile number: 10 digits, starts 6-9
const mobileRegex = /^[6-9]\d{9}$/;

// Strong password: 8+ chars, upper, lower, digit, special char
const strongPasswordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/;

export const loginSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .email("Enter a valid email address"),
  password: z.string().min(1, "Password is required"),
  rememberMe: z.boolean().optional(),
});

export type LoginValues = z.infer<typeof loginSchema>;

export const signupSchema = z
  .object({
    fullName: z
      .string()
      .min(2, "Enter your full name")
      .max(80, "Name is too long")
      .regex(/^[a-zA-Z\s.'-]+$/, "Name can only contain letters"),
    mobile: z
      .string()
      .min(1, "Mobile number is required")
      .regex(mobileRegex, "Enter a valid 10-digit Indian mobile number"),
    email: z
      .string()
      .min(1, "Email is required")
      .email("Enter a valid email address"),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .regex(
        strongPasswordRegex,
        "Include an uppercase letter, lowercase letter, number and symbol"
      ),
    confirmPassword: z.string().min(1, "Confirm your password"),
    businessName: z
      .string()
      .min(2, "Enter your business name")
      .max(120, "Business name is too long"),
    state: z.string().min(1, "Select a state"),
    city: z
      .string()
      .min(2, "Enter your city")
      .max(60, "City name is too long"),
    terms: z.literal(true, {
      errorMap: () => ({ message: "You must accept the Terms & Privacy Policy" }),
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type SignupValues = z.infer<typeof signupSchema>;

/**
 * Simple password strength scorer (0-4) used for the strength meter.
 * Purely client-side/UX — replace with real backend policy check later.
 */
export function getPasswordStrength(password: string) {
  let score = 0;
  if (password.length >= 8) score++;
  if (/[A-Z]/.test(password) && /[a-z]/.test(password)) score++;
  if (/\d/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;

  const labels = ["Too weak", "Weak", "Fair", "Good", "Strong"];
  return { score, label: labels[score] };
}