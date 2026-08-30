import { zodResolver } from "@hookform/resolvers/zod";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Loader2, Mail, MailCheck } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { AuthShell } from "@/components/auth/AuthShell";
import { TextField } from "@/components/auth/Field";
import {
  forgotPasswordSchema,
  suggestEmailFix,
} from "@/lib/auth-validation";
import type { z } from "zod";

type ForgotValues = z.infer<typeof forgotPasswordSchema>;

export const Route = createFileRoute("/forgot-password")({
  head: () => ({
    meta: [
      { title: "Reset your password — MSME Assist" },
      {
        name: "description",
        content:
          "Request a secure password reset link for your MSME Assist account and regain access to your scheme dashboard.",
      },
      {
        property: "og:title",
        content: "Reset your password — MSME Assist",
      },
      {
        property: "og:description",
        content:
          "Send yourself a secure reset link for your MSME Assist account.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ForgotPasswordPage,
});

function ForgotPasswordPage() {
  const [sent, setSent] = useState(false);
  const [suggestion, setSuggestion] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<ForgotValues>({
    resolver: zodResolver(forgotPasswordSchema),
    mode: "onBlur",
    defaultValues: {
      email: "",
    },
  });

  async function onSubmit(values: ForgotValues) {
    try {
      // Temporary frontend-only password recovery.
      // Connect your backend/authentication service here later.
      console.log("Password reset requested for:", values.email);

      await new Promise((resolve) => setTimeout(resolve, 800));

      setSent(true);

      toast.success(
        "If that email is registered, a reset link is on its way."
      );
    } catch {
      toast.error("Something went wrong. Please try again.");
    }
  }

  return (
    <AuthShell
      eyebrow="Account recovery"
      title={
        <>
          Reset your{" "}
          <span className="text-gradient-gold">password</span>
        </>
      }
      subtitle="We'll email you a secure, single-use link to set a new password."
    >
      {sent ? (
        <div className="glass card-edge space-y-4 rounded-2xl p-8 text-center">
          <span className="mx-auto flex size-14 items-center justify-center rounded-2xl bg-mint/10">
            <MailCheck className="size-6 text-mint" />
          </span>

          <h2 className="text-xl font-semibold text-foreground">
            Check your inbox
          </h2>

          <p className="text-[14.5px] text-muted-foreground">
            If an account exists for that address, you'll receive a password
            reset link within a few minutes.
          </p>

          <Link
            to="/login"
            className="inline-block text-[14px] font-semibold text-gold hover:underline"
          >
            Back to sign in
          </Link>
        </div>
      ) : (
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-5"
          noValidate
        >
          <div>
            <TextField
              label="Email address"
              type="email"
              autoComplete="email"
              placeholder="you@company.com"
              icon={<Mail className="size-4" />}
              error={errors.email?.message}
              {...register("email", {
                onBlur: (event) => {
                  setSuggestion(
                    suggestEmailFix(event.target.value)
                  );
                },
              })}
            />

            {suggestion ? (
              <button
                type="button"
                onClick={() => {
                  setValue("email", suggestion, {
                    shouldValidate: true,
                  });
                  setSuggestion(null);
                }}
                className="mt-2 text-[12.5px] font-medium text-gold hover:underline"
              >
                Did you mean {suggestion}?
              </button>
            ) : null}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-gradient-gold shadow-gold flex w-full items-center justify-center gap-2 rounded-xl px-6 py-3.5 text-[15px] font-semibold text-primary-foreground transition-transform duration-300 hover:scale-[1.02] disabled:opacity-70 disabled:hover:scale-100"
          >
            {isSubmitting ? (
              <Loader2 className="size-4 animate-spin" />
            ) : null}

            {isSubmitting ? "Sending link…" : "Send reset link"}
          </button>

          <p className="text-center text-[14px] text-muted-foreground">
            Remembered it?{" "}
            <Link
              to="/login"
              className="font-semibold text-gold hover:underline"
            >
              Sign in
            </Link>
          </p>
        </form>
      )}
    </AuthShell>
  );
}