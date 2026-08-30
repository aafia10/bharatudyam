import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowLeft,
  ArrowUpRight,
  Bell,
  BellRing,
  CheckCircle2,
  Clock3,
  FileText,
  Info,
  Sparkles,
  TrendingUp,
  AlertCircle,
  X,
} from "lucide-react";
import { useMemo, useState } from "react";

import { AppShell } from "@/components/app/AppShell";
import { notifications } from "@/lib/app-data";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/notifications")({
  head: () => ({
    meta: [
      {
        title: "Notifications — Bharat Udyam",
      },
      {
        name: "description",
        content:
          "View your latest Bharat Udyam notifications and updates.",
      },
    ],
  }),

  component: NotificationsPage,
});

type FilterType = "all" | "unread";

function NotificationsPage() {
  const [filter, setFilter] = useState<FilterType>("all");
  const [readNotifications, setReadNotifications] = useState<string[]>([]);

  const unreadCount = notifications.filter(
    (note) =>
      note.unread &&
      !readNotifications.includes(`${note.title}-${note.time}`),
  ).length;

  const visibleNotifications = useMemo(() => {
    if (filter === "unread") {
      return notifications.filter(
        (note) =>
          note.unread &&
          !readNotifications.includes(`${note.title}-${note.time}`),
      );
    }

    return notifications;
  }, [filter, readNotifications]);

  function markAsRead(title: string, time: string) {
    const id = `${title}-${time}`;

    setReadNotifications((previous) =>
      previous.includes(id) ? previous : [...previous, id],
    );
  }

  function markAllAsRead() {
    setReadNotifications(
      notifications.map((note) => `${note.title}-${note.time}`),
    );
  }

  return (
    <AppShell>
      <main className="bu-notifications-page min-w-0">
        {/* ================================================================ */}
        {/* HEADER                                                           */}
        {/* ================================================================ */}

        <section className="bu-notifications-header animate-fade-up">
          <Link
            to="/dashboard"
            className="bu-back-link mb-5 inline-flex items-center gap-2 text-[12px] font-medium text-muted-foreground"
          >
            <ArrowLeft className="size-3.5" />
            Back to dashboard
          </Link>

          <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <span className="bu-section-dot" />

                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-gold">
                  Updates & Alerts
                </p>
              </div>

              <h1 className="mt-2 text-[30px] font-bold tracking-tight text-foreground sm:text-[38px]">
                Notifications
              </h1>

              <p className="mt-2 max-w-2xl text-[13.5px] leading-6 text-muted-foreground sm:text-[14px]">
                Stay informed about your applications, documents, schemes and
                personalized Bharat Udyam recommendations.
              </p>
            </div>

            {/* Notification counter */}
            <div className="bu-notification-counter shrink-0">
              <div className="bu-counter-icon">
                <BellRing className="size-5" />
              </div>

              <div>
                <p className="text-[20px] font-bold leading-none text-foreground">
                  {unreadCount}
                </p>

                <p className="mt-1 text-[10.5px] text-muted-foreground">
                  Unread updates
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ================================================================ */}
        {/* TOOLBAR                                                          */}
        {/* ================================================================ */}

        <section className="bu-notification-toolbar">
          <div className="bu-filter-group">
            <button
              type="button"
              onClick={() => setFilter("all")}
              className={cn(
                "bu-filter-button",
                filter === "all" && "bu-filter-active",
              )}
            >
              All
              <span>{notifications.length}</span>
            </button>

            <button
              type="button"
              onClick={() => setFilter("unread")}
              className={cn(
                "bu-filter-button",
                filter === "unread" && "bu-filter-active",
              )}
            >
              Unread
              <span>{unreadCount}</span>
            </button>
          </div>

          {unreadCount > 0 ? (
            <button
              type="button"
              onClick={markAllAsRead}
              className="bu-mark-all"
            >
              <CheckCircle2 className="size-3.5" />
              Mark all as read
            </button>
          ) : (
            <span className="bu-all-read">
              <CheckCircle2 className="size-3.5" />
              All caught up
            </span>
          )}
        </section>

        {/* ================================================================ */}
        {/* NOTIFICATIONS                                                     */}
        {/* ================================================================ */}

        <section className="mt-5 space-y-3.5">
          {visibleNotifications.length > 0 ? (
            visibleNotifications.map((note, index) => {
              const id = `${note.title}-${note.time}`;
              const isRead =
                !note.unread || readNotifications.includes(id);

              return (
                <NotificationCard
                  key={`${id}-${index}`}
                  title={note.title}
                  body={note.body}
                  time={note.time}
                  kind={note.kind}
                  unread={!isRead}
                  index={index}
                  onRead={() => markAsRead(note.title, note.time)}
                />
              );
            })
          ) : (
            <div className="bu-empty-state">
              <div className="bu-empty-icon">
                <CheckCircle2 className="size-7" />
              </div>

              <h2 className="mt-5 text-[17px] font-bold text-foreground">
                Nothing new here
              </h2>

              <p className="mx-auto mt-2 max-w-sm text-[13px] leading-6 text-muted-foreground">
                You have read all your notifications. New application,
                document and scheme updates will appear here.
              </p>

              <Link
                to="/dashboard"
                className="bu-empty-button mt-5 inline-flex items-center gap-2"
              >
                Go to dashboard
                <ArrowUpRight className="size-3.5" />
              </Link>
            </div>
          )}
        </section>

        {/* ================================================================ */}
        {/* AI UPDATE                                                        */}
        {/* ================================================================ */}

        <section className="bu-ai-notification-card">
          <div className="bu-ai-orb bu-ai-orb-one" />
          <div className="bu-ai-orb bu-ai-orb-two" />

          <div className="relative z-10 flex flex-col gap-5 sm:flex-row sm:items-start">
            <div className="bu-ai-icon">
              <Sparkles className="size-5" />
            </div>

            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-gold">
                  Bharat Udyam AI
                </p>

                <span className="bu-ai-live">
                  <span />
                  Active
                </span>
              </div>

              <h2 className="mt-1.5 text-[18px] font-bold text-foreground sm:text-[20px]">
                Smart recommendations are active
              </h2>

              <p className="mt-2 max-w-2xl text-[13px] leading-6 text-muted-foreground">
                Your notifications are personalized using your business
                profile, document status, application progress and scheme
                eligibility.
              </p>

              <div className="mt-4 grid gap-2.5 sm:grid-cols-3">
                <div className="bu-ai-stat">
                  <TrendingUp className="size-3.5 text-mint" />
                  <span>Eligibility updates</span>
                </div>

                <div className="bu-ai-stat">
                  <FileText className="size-3.5 text-gold" />
                  <span>Document alerts</span>
                </div>

                <div className="bu-ai-stat">
                  <Bell className="size-3.5 text-violet" />
                  <span>Scheme updates</span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </AppShell>
  );
}

/* ========================================================================== */
/* NOTIFICATION CARD                                                          */
/* ========================================================================== */

type NotificationCardProps = {
  title: string;
  body: string;
  time: string;
  kind: "success" | "info" | "doc" | "warning" | "trend";
  unread: boolean;
  index: number;
  onRead: () => void;
};

function NotificationCard({
  title,
  body,
  time,
  kind,
  unread,
  index,
  onRead,
}: NotificationCardProps) {
  const config = {
    success: {
      icon: CheckCircle2,
      label: "Success",
      iconClass: "bu-note-success",
    },
    info: {
      icon: Info,
      label: "Information",
      iconClass: "bu-note-info",
    },
    doc: {
      icon: FileText,
      label: "Document",
      iconClass: "bu-note-doc",
    },
    warning: {
      icon: AlertCircle,
      label: "Action required",
      iconClass: "bu-note-warning",
    },
    trend: {
      icon: TrendingUp,
      label: "Insight",
      iconClass: "bu-note-trend",
    },
  }[kind];

  const Icon = config.icon;

  return (
    <article
      className={cn(
        "bu-notification-card",
        unread && "bu-notification-unread",
      )}
      style={{
        animationDelay: `${index * 70}ms`,
      }}
    >
      {/* Unread indicator */}
      {unread ? <span className="bu-unread-bar" /> : null}

      <div className="flex min-w-0 items-start gap-3.5 sm:gap-4">
        {/* Icon */}
        <div className={cn("bu-notification-icon", config.iconClass)}>
          <Icon className="size-[18px]" />
        </div>

        {/* Content */}
        <div className="min-w-0 flex-1">
          <div className="flex flex-col gap-1.5 sm:flex-row sm:items-start sm:justify-between sm:gap-4">
            <div className="flex min-w-0 items-center gap-2">
              <h2 className="min-w-0 break-words text-[14px] font-bold text-foreground sm:text-[15px]">
                {title}
              </h2>

              {unread ? <span className="bu-unread-dot" /> : null}
            </div>

            <div className="flex shrink-0 items-center gap-1.5 text-[10.5px] text-muted-foreground">
              <Clock3 className="size-3" />
              {time}
            </div>
          </div>

          <p className="mt-1.5 max-w-3xl text-[12.5px] leading-6 text-muted-foreground sm:text-[13px]">
            {body}
          </p>

          <div className="mt-3 flex flex-wrap items-center gap-2">
            <span className="bu-notification-type">
              <Icon className="size-3" />
              {config.label}
            </span>

            {unread ? (
              <button
                type="button"
                onClick={onRead}
                className="bu-read-button"
              >
                Mark as read
              </button>
            ) : (
              <span className="bu-read-label">
                <CheckCircle2 className="size-3" />
                Read
              </span>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}