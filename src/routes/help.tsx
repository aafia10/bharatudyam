import { createFileRoute } from "@tanstack/react-router";
import {
  ArrowRight,
  Bot,
  BookOpen,
  CheckCircle2,
  ChevronDown,
  Clock3,
  FileCheck2,
  HelpCircle,
  Mail,
  MessageCircle,
  Phone,
  Send,
  Sparkles,
  Upload,
  UserRound,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";

import { AppShell } from "@/components/app/AppShell";
import { useAuthGuard } from "@/hooks/use-auth-guard";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/help")({
  head: () => ({
    meta: [
      { title: "Help Center — Bharat Udyam" },
      {
        name: "description",
        content:
          "Get AI-powered guidance about MSME schemes, eligibility, documents and applications.",
      },
      {
        property: "og:title",
        content: "Help Center — Bharat Udyam",
      },
      {
        property: "og:description",
        content:
          "AI assistance and human support for MSME scheme guidance.",
      },
      {
        property: "og:type",
        content: "website",
      },
    ],
  }),
  component: HelpPage,
});

type Message = {
  id: number;
  from: "ai" | "user";
  text: string;
};

const suggestedQuestions = [
  "Which schemes am I eligible for?",
  "What documents do I need?",
  "How do I apply for PMEGP?",
  "Check my application status",
];

const quickActions = [
  {
    title: "Scheme Guides",
    description: "Understand schemes and benefits",
    icon: BookOpen,
  },
  {
    title: "Document Checklist",
    description: "See required documents",
    icon: FileCheck2,
  },
  {
    title: "Upload Help",
    description: "Understand verification",
    icon: Upload,
  },
];

const faqs = [
  {
    question: "How does AI eligibility work?",
    answer:
      "The eligibility engine reviews your business profile, industry, turnover, employee count, location and available documents to identify schemes that may be relevant to your business.",
  },
  {
    question: "Why do I need to upload documents?",
    answer:
      "Documents help build and verify your business profile. Information such as PAN, GST, Udyam and financial details can be extracted and used to improve scheme matching.",
  },
  {
    question: "What happens after I upload a document?",
    answer:
      "The document enters verification. Information can be extracted using OCR, checked against your profile and then marked as verified or sent for review.",
  },
  {
    question: "Can I edit extracted information?",
    answer:
      "Yes. You can review the generated profile and correct information where editing is available.",
  },
  {
    question: "Where can I track applications?",
    answer:
      "Open Applications from the sidebar to see your submitted applications, current status, progress and pending actions.",
  },
];

function HelpPage() {
  const { name } = useAuthGuard();

  const firstName =
    name && name !== "there"
      ? name.split(" ")[0]
      : "there";

  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      from: "ai",
      text: `Hi ${firstName}! I'm your Bharat Udyam AI Assistant. I can help you with schemes, eligibility, documents and application status.`,
    },
  ]);

  const [draft, setDraft] = useState("");
  const [typing, setTyping] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const chatRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatRef.current?.scrollTo({
      top: chatRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages, typing]);

  function getAIResponse(question: string) {
    const lower = question.toLowerCase();

    if (
      lower.includes("eligible") ||
      lower.includes("scheme")
    ) {
      return "Based on the information available in your profile, schemes such as PMEGP, CGTMSE and ZED may be relevant. Open AI Eligibility to run a detailed eligibility analysis.";
    }

    if (
      lower.includes("document") ||
      lower.includes("upload") ||
      lower.includes("pan") ||
      lower.includes("aadhaar") ||
      lower.includes("gst")
    ) {
      return "Your Document Vault lets you upload and verify identity, business and financial documents. Extracted information can then help build your business profile.";
    }

    if (
      lower.includes("pmegp") ||
      lower.includes("apply")
    ) {
      return "PMEGP supports eligible employment-generating enterprises. Bharat Udyam will provide the application guidance and required steps within the platform.";
    }

    if (
      lower.includes("status") ||
      lower.includes("application")
    ) {
      return "You can track submitted applications from the Applications section. You can see whether an application is approved, under review or requires additional documents.";
    }

    return "I can help you with MSME schemes, eligibility, document verification and application tracking. Try asking me about your eligible schemes or required documents.";
  }

  function sendMessage(text: string) {
    const cleaned = text.trim();

    if (!cleaned || typing) return;

    setMessages((previous) => [
      ...previous,
      {
        id: Date.now(),
        from: "user",
        text: cleaned,
      },
    ]);

    setDraft("");
    setTyping(true);

    window.setTimeout(() => {
      setTyping(false);

      setMessages((previous) => [
        ...previous,
        {
          id: Date.now() + 1,
          from: "ai",
          text: getAIResponse(cleaned),
        },
      ]);
    }, 750);
  }

  return (
    <AppShell>
      {/* Page heading */}
      <section className="relative">
        <div className="pointer-events-none absolute -left-16 -top-10 size-48 rounded-full bg-violet/10 blur-3xl" />
        <div className="pointer-events-none absolute right-10 -top-10 size-48 rounded-full bg-gold/8 blur-3xl" />

        <div className="relative flex items-end justify-between gap-4">
          <div>
            <div className="mb-2 inline-flex items-center gap-1.5 rounded-full border border-gold/20 bg-gold/5 px-2.5 py-1 text-[10px] font-semibold tracking-[0.13em] text-gold uppercase">
              <Sparkles className="size-3" />
              AI Assistance
            </div>

            <h1 className="text-[26px] font-bold tracking-tight text-foreground sm:text-[30px]">
              Help <span className="text-gradient-gold">Center</span>
            </h1>

            <p className="mt-1 max-w-xl text-[12.5px] leading-5 text-muted-foreground sm:text-[13.5px]">
              Get instant guidance about schemes, eligibility, documents and
              your MSME applications.
            </p>
          </div>

          <div className="hidden items-center gap-2.5 rounded-xl border border-mint/15 bg-mint/5 px-3 py-2 sm:flex">
            <span className="relative flex size-8 items-center justify-center rounded-lg bg-mint/10">
              <Bot className="size-4 text-mint" />
              <span className="absolute right-0.5 top-0.5 size-1.5 rounded-full bg-mint" />
            </span>

            <div>
              <p className="text-[11px] font-semibold text-foreground">
                AI Assistant
              </p>
              <p className="text-[9.5px] text-mint">
                Online · Ready to help
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Main */}
      <div className="mt-6 grid gap-5 lg:grid-cols-[minmax(0,1.65fr)_320px] xl:grid-cols-[minmax(0,1.7fr)_350px]">
        {/* CHAT */}
        <section className="glass card-edge hover-glow flex h-[calc(100vh-205px)] min-h-[540px] max-h-[700px] flex-col overflow-hidden">
          {/* Header */}
          <div className="relative shrink-0 border-b border-border/60 px-4 py-4 sm:px-5">
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-gold/[0.035] via-transparent to-violet/[0.035]" />

            <div className="relative flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="relative flex size-10 items-center justify-center rounded-xl bg-gradient-gold shadow-gold">
                  <Bot
                    className="size-5 text-primary-foreground"
                    strokeWidth={2.2}
                  />

                  <span className="absolute -bottom-1 -right-1 size-3.5 rounded-full border-2 border-background bg-mint" />
                </div>

                <div>
                  <h2 className="text-[14px] font-bold text-foreground sm:text-[15px]">
                    Bharat Udyam AI Assistant
                  </h2>

                  <p className="mt-0.5 flex items-center gap-1.5 text-[10.5px] text-mint">
                    <span className="size-1.5 rounded-full bg-mint" />
                    Online · Personalized assistance
                  </p>
                </div>
              </div>

              <span className="hidden items-center gap-1.5 rounded-full border border-border bg-surface/50 px-2.5 py-1.5 text-[9.5px] text-muted-foreground sm:flex">
                <Sparkles className="size-3 text-gold" />
                AI powered
              </span>
            </div>
          </div>

          {/* Messages */}
          <div
            ref={chatRef}
            className="flex-1 overflow-y-auto px-4 py-4 sm:px-5 sm:py-5"
          >
            <div className="space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={cn(
                    "flex animate-fade-up",
                    message.from === "user"
                      ? "justify-end"
                      : "justify-start",
                  )}
                >
                  <div
                    className={cn(
                      "flex max-w-[88%] items-end gap-2 sm:max-w-[74%]",
                      message.from === "user"
                        ? "flex-row-reverse"
                        : "",
                    )}
                  >
                    <span
                      className={cn(
                        "mb-0.5 flex size-7 shrink-0 items-center justify-center rounded-lg",
                        message.from === "ai"
                          ? "bg-gradient-gold shadow-gold"
                          : "bg-surface-2",
                      )}
                    >
                      {message.from === "ai" ? (
                        <Bot className="size-3.5 text-primary-foreground" />
                      ) : (
                        <UserRound className="size-3.5 text-muted-foreground" />
                      )}
                    </span>

                    <div>
                      <div
                        className={cn(
                          "rounded-xl px-3.5 py-2.5 text-[12px] leading-5 sm:text-[12.5px]",
                          message.from === "user"
                            ? "rounded-br-sm bg-gradient-gold font-medium text-primary-foreground"
                            : "rounded-bl-sm border border-border/70 bg-surface-2/55 text-foreground",
                        )}
                      >
                        {message.text}
                      </div>

                      <p
                        className={cn(
                          "mt-1 px-1 text-[8.5px] text-muted-foreground/50",
                          message.from === "user"
                            ? "text-right"
                            : "",
                        )}
                      >
                        {message.from === "ai"
                          ? "Bharat Udyam AI"
                          : "You"}
                      </p>
                    </div>
                  </div>
                </div>
              ))}

              {typing && (
                <div className="flex items-end gap-2 animate-fade-up">
                  <span className="flex size-7 items-center justify-center rounded-lg bg-gradient-gold">
                    <Bot className="size-3.5 text-primary-foreground" />
                  </span>

                  <div className="rounded-xl rounded-bl-sm border border-border/70 bg-surface-2/55 px-3.5 py-3">
                    <div className="flex gap-1">
                      <span className="size-1.5 animate-bounce rounded-full bg-gold [animation-delay:-0.3s]" />
                      <span className="size-1.5 animate-bounce rounded-full bg-gold [animation-delay:-0.15s]" />
                      <span className="size-1.5 animate-bounce rounded-full bg-gold" />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Suggestions */}
          <div className="shrink-0 border-t border-border/50 bg-surface/[0.15] px-4 py-3 sm:px-5">
            <div className="mb-2 flex items-center gap-1.5">
              <Sparkles className="size-3 text-gold" />
              <p className="text-[9.5px] font-semibold tracking-[0.13em] text-gold uppercase">
                Suggested
              </p>
            </div>

            <div className="flex flex-wrap gap-1.5">
              {suggestedQuestions.map((question) => (
                <button
                  key={question}
                  type="button"
                  disabled={typing}
                  onClick={() => sendMessage(question)}
                  className="rounded-full border border-violet/20 bg-violet/8 px-2.5 py-1.5 text-[9.5px] font-medium text-muted-foreground transition-all duration-200 hover:border-gold/30 hover:bg-gold/8 hover:text-foreground disabled:opacity-40"
                >
                  {question}
                </button>
              ))}
            </div>
          </div>

          {/* Input */}
          <form
            onSubmit={(event) => {
              event.preventDefault();
              sendMessage(draft);
            }}
            className="shrink-0 border-t border-border/50 p-3 sm:p-4"
          >
            <div className="flex items-center gap-2 rounded-xl border border-border bg-surface-2/40 p-1">
              <input
                value={draft}
                onChange={(event) => setDraft(event.target.value)}
                disabled={typing}
                placeholder="Ask about schemes, documents or eligibility..."
                className="min-w-0 flex-1 bg-transparent px-2.5 py-2 text-[11.5px] text-foreground outline-none placeholder:text-muted-foreground/45 sm:text-[12px]"
              />

              <button
                type="submit"
                disabled={!draft.trim() || typing}
                aria-label="Send message"
                className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-gradient-gold text-primary-foreground shadow-gold transition-all duration-200 hover:scale-105 active:scale-95 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:scale-100"
              >
                <Send className="size-3.5" />
              </button>
            </div>
          </form>
        </section>

        {/* RIGHT SIDEBAR */}
        <aside className="space-y-4">
          {/* Quick help */}
          <section className="glass card-edge hover-glow p-4 sm:p-5">
            <div className="flex items-center gap-2.5">
              <span className="flex size-8 items-center justify-center rounded-lg bg-violet/10">
                <Sparkles className="size-3.5 text-violet" />
              </span>

              <div>
                <h2 className="text-[14px] font-bold text-foreground">
                  Quick Help
                </h2>
                <p className="text-[9.5px] text-muted-foreground">
                  Jump to what you need
                </p>
              </div>
            </div>

            <div className="mt-4 space-y-2">
              {quickActions.map(
                ({ title, description, icon: Icon }) => (
                  <button
                    key={title}
                    type="button"
                    className="group flex w-full items-center gap-2.5 rounded-xl border border-border/60 bg-surface-2/25 p-2.5 text-left transition-all duration-200 hover:-translate-y-0.5 hover:border-gold/25 hover:bg-surface-2/60"
                  >
                    <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-gold/8 text-gold">
                      <Icon className="size-3.5" />
                    </span>

                    <span className="min-w-0 flex-1">
                      <span className="block text-[11px] font-semibold text-foreground">
                        {title}
                      </span>

                      <span className="mt-0.5 block truncate text-[9px] text-muted-foreground">
                        {description}
                      </span>
                    </span>

                    <ArrowRight className="size-3 text-muted-foreground/40 transition-transform group-hover:translate-x-0.5 group-hover:text-gold" />
                  </button>
                ),
              )}
            </div>
          </section>

          {/* Human support */}
          <section className="group relative overflow-hidden rounded-2xl border border-gold/20 bg-gradient-to-br from-surface via-surface to-gold/[0.035] p-4 sm:p-5">
            <div className="pointer-events-none absolute -right-12 -top-12 size-28 rounded-full bg-gold/8 blur-2xl" />

            <div className="relative">
              <div className="flex items-center justify-between">
                <span className="flex size-9 items-center justify-center rounded-xl bg-violet/10">
                  <MessageCircle className="size-4 text-violet" />
                </span>

                <span className="flex items-center gap-1 rounded-full bg-mint/8 px-2 py-1 text-[8.5px] font-semibold text-mint">
                  <span className="size-1.5 rounded-full bg-mint" />
                  Available
                </span>
              </div>

              <h2 className="mt-4 text-[15px] font-bold text-foreground">
                Need Human Support?
              </h2>

              <p className="mt-1 text-[10px] leading-4.5 text-muted-foreground">
                Our support team can help with application and verification
                questions.
              </p>

              <div className="mt-3.5 space-y-2">
                <div className="flex items-center gap-2.5 text-[10.5px] text-muted-foreground">
                  <Phone className="size-3.5 text-mint" />
                  1800 123 4567
                </div>

                <div className="flex items-center gap-2.5 text-[10.5px] text-muted-foreground">
                  <Mail className="size-3.5 text-mint" />
                  support@bharatudyam.in
                </div>

                <div className="flex items-center gap-2.5 text-[10.5px] text-muted-foreground">
                  <Clock3 className="size-3.5 text-mint" />
                  Mon–Sat · 9 AM – 7 PM IST
                </div>
              </div>
            </div>
          </section>

          {/* FAQ */}
          <section className="glass card-edge p-4 sm:p-5">
            <div className="flex items-center gap-2.5">
              <span className="flex size-8 items-center justify-center rounded-lg bg-gold/8">
                <HelpCircle className="size-3.5 text-gold" />
              </span>

              <div>
                <h2 className="text-[14px] font-bold text-foreground">
                  Frequently Asked
                </h2>
                <p className="text-[9.5px] text-muted-foreground">
                  Common questions
                </p>
              </div>
            </div>

            <div className="mt-3 divide-y divide-border/50">
              {faqs.map((faq, index) => {
                const open = openFaq === index;

                return (
                  <div key={faq.question}>
                    <button
                      type="button"
                      onClick={() =>
                        setOpenFaq(open ? null : index)
                      }
                      className="flex w-full items-center justify-between gap-3 py-2.5 text-left"
                    >
                      <span className="text-[10.5px] font-medium leading-4 text-foreground">
                        {faq.question}
                      </span>

                      <ChevronDown
                        className={cn(
                          "size-3 shrink-0 text-muted-foreground transition-transform duration-200",
                          open && "rotate-180 text-gold",
                        )}
                      />
                    </button>

                    <div
                      className={cn(
                        "grid transition-all duration-250",
                        open
                          ? "grid-rows-[1fr] pb-2.5"
                          : "grid-rows-[0fr]",
                      )}
                    >
                      <div className="overflow-hidden">
                        <p className="text-[9.5px] leading-4 text-muted-foreground">
                          {faq.answer}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          {/* Trust note */}
          <div className="flex items-start gap-2.5 rounded-xl border border-mint/10 bg-mint/[0.025] p-3">
            <CheckCircle2 className="mt-0.5 size-3.5 shrink-0 text-mint" />

            <p className="text-[9px] leading-4 text-muted-foreground">
              Review extracted information before submitting an official
              application.
            </p>
          </div>
        </aside>
      </div>
    </AppShell>
  );
}