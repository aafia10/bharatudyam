import {
  createFileRoute,
  useNavigate,
} from "@tanstack/react-router";

import {
  Activity,
  ArrowUpRight,
  BarChart3,
  Bell,
  BriefcaseBusiness,
  Building2,
  Calculator,
  CalendarDays,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  ClipboardCheck,
  FileCheck2,
  FileText,
  Gauge,
  LayoutDashboard,
  Menu,
  MessageSquare,
  Plus,
  Search,
  Settings,
  ShieldCheck,
  Sparkles,
  Upload,
  Users,
  WalletCards,
  X,
  Zap,
} from "lucide-react";

import {
  useEffect,
  useMemo,
  useState,
} from "react";

import { Logo } from "@/components/msme/Logo";

export const Route = createFileRoute("/rm-dashboard")({
  component: RMDashboard,
});

/* =========================================================
   TYPES
========================================================= */

type NBFCUser = {
  fullName: string;
  employeeId: string;
  email: string;
  mobile: string;
  role: string;
  branch: string;
  region: string;
  userType: string;
};

type ApplicationStatus =
  | "BM Review"
  | "Temp Reject"
  | "Approved"
  | "In Progress"
  | "Rejected";

type Application = {
  id: string;
  applicant: string;
  type: string;
  amount: string;
  stage: string;
  status: ApplicationStatus;
  bureau: string;
};

type ReviewItem = {
  name: string;
  id: string;
  amount: string;
  priority: "high" | "medium" | "low";
};

type ActivityItem = {
  time: string;
  title: string;
  description: string;
  type: "success" | "review" | "info";
};

type DashboardRoute =
  | "/rm-dashboard"
  | "/bm-dashboard"
  | "/ca-dashboard";

/* =========================================================
   MOCK DATA
========================================================= */

const applications: Application[] = [
  {
    id: "APP-28841",
    applicant: "Kapoor Pharma",
    type: "SENP",
    amount: "₹50L",
    stage: "BM Review",
    status: "BM Review",
    bureau: "772",
  },
  {
    id: "APP-20843",
    applicant: "Jain Textiles",
    type: "SEP",
    amount: "₹9L",
    stage: "Hard Knock-off",
    status: "Temp Reject",
    bureau: "—",
  },
  {
    id: "APP-20839",
    applicant: "Rao Auto Works",
    type: "SENP",
    amount: "₹22L",
    stage: "Credit Review",
    status: "Approved",
    bureau: "810",
  },
  {
    id: "APP-20836",
    applicant: "Sharma Dairy",
    type: "SEP",
    amount: "₹7L",
    stage: "Income Assessment",
    status: "In Progress",
    bureau: "748",
  },
  {
    id: "APP-20835",
    applicant: "Mehta Enterprises",
    type: "Salaried",
    amount: "₹18L",
    stage: "KYC & Dedupe",
    status: "In Progress",
    bureau: "—",
  },
  {
    id: "APP-20831",
    applicant: "Verma Logistics",
    type: "SENP",
    amount: "₹35L",
    stage: "BM Review",
    status: "BM Review",
    bureau: "798",
  },
  {
    id: "APP-20828",
    applicant: "Gupta Electricals",
    type: "Salaried",
    amount: "₹6L",
    stage: "BM Review",
    status: "Rejected",
    bureau: "658",
  },
];

const recentActivity: ActivityItem[] = [
  {
    time: "10:42 AM",
    title: "Rao Auto Works approved",
    description:
      "Application APP-20839 moved to Approved.",
    type: "success",
  },
  {
    time: "10:18 AM",
    title: "Kapoor Pharma sent for BM review",
    description:
      "₹50L application is awaiting branch approval.",
    type: "review",
  },
  {
    time: "09:54 AM",
    title: "Bureau check completed",
    description:
      "Jain Textiles bureau response received.",
    type: "info",
  },
  {
    time: "09:26 AM",
    title: "New lead created",
    description:
      "Mehta Enterprises added to your pipeline.",
    type: "success",
  },
];

const reviewQueue: ReviewItem[] = [
  {
    name: "Kapoor Pharma",
    id: "APP-28841",
    amount: "₹50L",
    priority: "high",
  },
  {
    name: "Mishra Retail",
    id: "APP-20838",
    amount: "₹12L",
    priority: "medium",
  },
  {
    name: "Patel Builders",
    id: "APP-20835",
    amount: "₹30L",
    priority: "low",
  },
];

/* =========================================================
   SIDEBAR
========================================================= */

const navSections = [
  {
    label: "CORE",
    items: [
      {
        label: "Dashboard",
        icon: LayoutDashboard,
      },
      {
        label: "Lead Management",
        icon: Users,
        count: "24",
      },
      {
        label: "Application Queue",
        icon: FileText,
        count: "9",
      },
      {
        label: "Credit Engine",
        icon: Gauge,
      },
    ],
  },
  {
    label: "REVIEW",
    items: [
      {
        label: "BM Review",
        icon: ClipboardCheck,
        count: "5",
      },
      {
        label: "Reports",
        icon: BarChart3,
      },
    ],
  },
  {
    label: "CONFIG",
    items: [
      {
        label: "System Config",
        icon: Settings,
      },
    ],
  },
];

/* =========================================================
   HELPERS
========================================================= */

function getDashboardRoute(
  role: string,
): DashboardRoute {
  switch (role) {
    case "Branch Manager":
      return "/bm-dashboard";

    case "Credit Analyst":
      return "/ca-dashboard";

    case "RM / Field Officer":
    default:
      return "/rm-dashboard";
  }
}

function getInitials(name: string) {
  if (!name.trim()) {
    return "RM";
  }

  const parts = name
    .trim()
    .split(/\s+/)
    .filter(Boolean);

  if (parts.length === 1) {
    return parts[0]
      .slice(0, 2)
      .toUpperCase();
  }

  return `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase();
}

function getStatusClass(
  status: ApplicationStatus,
) {
  switch (status) {
    case "Approved":
      return "rm-status-success";

    case "Rejected":
      return "rm-status-danger";

    case "Temp Reject":
      return "rm-status-warning";

    case "BM Review":
      return "rm-status-violet";

    case "In Progress":
    default:
      return "rm-status-info";
  }
}

function getBureauClass(value: string) {
  if (value === "—") {
    return "muted";
  }

  const score = Number(value);

  if (score >= 750) {
    return "good";
  }

  return "danger";
}

/* =========================================================
   DASHBOARD
========================================================= */

function RMDashboard() {
  const navigate = useNavigate();

  const [user, setUser] =
    useState<NBFCUser | null>(null);

  const [mobileSidebarOpen, setMobileSidebarOpen] =
    useState(false);

  /*
   * Desktop-only sidebar collapse. This is purely a
   * presentational toggle (icon-rail vs full sidebar) and
   * does not affect the mobile off-canvas sidebar behaviour.
   */
  const [desktopSidebarCollapsed, setDesktopSidebarCollapsed] =
    useState(false);

  const [activeTab, setActiveTab] =
    useState<"applications" | "activity">(
      "applications",
    );

  const [search, setSearch] =
    useState("");

  const [showNotifications, setShowNotifications] =
    useState(false);

  const [toast, setToast] =
    useState("");

  /* =======================================================
     AUTH / ROLE GUARD
  ======================================================= */

  useEffect(() => {
    try {
      const rawUser = localStorage.getItem(
        "bharat-udyam-nbfc-user",
      );

      if (!rawUser) {
        navigate({
          to: "/nbfc-signup",
          replace: true,
        });

        return;
      }

      const parsedUser =
        JSON.parse(rawUser) as NBFCUser;

      if (
        parsedUser.userType !== "NBFC"
      ) {
        navigate({
          to: "/nbfc-signup",
          replace: true,
        });

        return;
      }

      /*
       * If the logged-in user is not an RM,
       * send them to their correct dashboard.
       */

      if (
        parsedUser.role !==
        "RM / Field Officer"
      ) {
        navigate({
          to: getDashboardRoute(
            parsedUser.role,
          ),
          replace: true,
        });

        return;
      }

      setUser(parsedUser);
    } catch (error) {
      console.error(
        "Unable to load NBFC user:",
        error,
      );

      navigate({
        to: "/nbfc-signup",
        replace: true,
      });
    }
  }, [navigate]);

  /* =======================================================
     SEARCH
  ======================================================= */

  const filteredApplications =
    useMemo(() => {
      const query =
        search.trim().toLowerCase();

      if (!query) {
        return applications;
      }

      return applications.filter(
        (application) =>
          [
            application.id,
            application.applicant,
            application.type,
            application.amount,
            application.stage,
            application.status,
            application.bureau,
          ]
            .join(" ")
            .toLowerCase()
            .includes(query),
      );
    }, [search]);

  /* =======================================================
     TOAST
  ======================================================= */

  function showToast(message: string) {
    setToast(message);

    window.setTimeout(() => {
      setToast("");
    }, 2600);
  }

  function handleAction(message: string) {
    showToast(message);
  }

  /* =======================================================
     ROLE SWITCHER
  ======================================================= */

  function handleRoleChange(
    role: string,
  ) {
    navigate({
      to: getDashboardRoute(role),
    });
  }

  /* =======================================================
     LOADING
  ======================================================= */

  if (!user) {
    return (
      <div className="rm-loading-screen">
        <div className="rm-loading-spinner" />

        <span>
          Loading workspace...
        </span>
      </div>
    );
  }

  const initials =
    getInitials(user.fullName);

  /* =======================================================
     UI
  ======================================================= */

   return (
    <div
      className={`rm-dashboard ${
        desktopSidebarCollapsed ? "rm-desktop-collapsed" : ""
      }`}
    >
      {/* MOBILE OVERLAY */}

      {mobileSidebarOpen && (
        <button
          type="button"
          className="rm-mobile-overlay"
          aria-label="Close menu"
          onClick={() =>
            setMobileSidebarOpen(false)
          }
        />
      )}

      {/* ===================================================
          SIDEBAR
      =================================================== */}

      <aside
        className={`rm-sidebar ${
          mobileSidebarOpen
            ? "rm-sidebar-open"
            : ""
        } ${
          desktopSidebarCollapsed
            ? "rm-sidebar-collapsed"
            : ""
        }`}
      >
        {/* DESKTOP COLLAPSE TOGGLE */}

        <button
          type="button"
          className="rm-sidebar-collapse-toggle"
          onClick={() =>
            setDesktopSidebarCollapsed(
              (value) => !value,
            )
          }
          aria-label={
            desktopSidebarCollapsed
              ? "Expand sidebar"
              : "Collapse sidebar"
          }
          title={
            desktopSidebarCollapsed
              ? "Expand sidebar"
              : "Collapse sidebar"
          }
        >
          {desktopSidebarCollapsed ? (
            <ChevronRight size={14} />
          ) : (
            <ChevronLeft size={14} />
          )}
        </button>

        {/* BRAND */}

        <div className="rm-sidebar-brand">
          <div className="rm-logo-wrapper">
            <Logo size={38} />
          </div>

          <div className="rm-brand-copy">
            <strong>
              BHARAT UDYAM
            </strong>

            <span>
              For the Businesses That Build Bharat.
            </span>
          </div>

          <button
            type="button"
            className="rm-mobile-close"
            onClick={() =>
              setMobileSidebarOpen(false)
            }
            aria-label="Close sidebar"
          >
            <X size={16} />
          </button>
        </div>

        {/* NAVIGATION */}

        <div className="rm-sidebar-scroll">
          {navSections.map(
            (section) => (
              <div
                className="rm-nav-section"
                key={section.label}
              >
                <div className="rm-nav-label">
                  {section.label}
                </div>

                {section.items.map(
                  (item) => {
                    const Icon =
                      item.icon;

                    const isDashboard =
                      item.label ===
                      "Dashboard";

                    return (
                      <button
                        type="button"
                        key={item.label}
                        className={`rm-nav-item ${
                          isDashboard
                            ? "rm-nav-active"
                            : ""
                        }`}
                        title={item.label}
                        onClick={() => {
                          setMobileSidebarOpen(
                            false,
                          );

                          if (
                            isDashboard
                          ) {
                            navigate({
                              to: "/rm-dashboard",
                            });
                          } else {
                            showToast(
                              `${item.label} module selected`,
                            );
                          }
                        }}
                      >
                        <Icon size={17} />

                        <span>
                          {item.label}
                        </span>

                        {item.count && (
                          <em className="rm-nav-count">
                            {item.count}
                          </em>
                        )}
                      </button>
                    );
                  },
                )}
              </div>
            ),
          )}
        </div>

        {/* USER */}

        <div className="rm-sidebar-user">
          <div className="rm-avatar rm-avatar-small">
            {initials}
          </div>

          <div className="rm-sidebar-user-copy">
            <strong>
              {user.fullName}
            </strong>

            <span>
              #{user.employeeId} ·{" "}
              {user.region || "Mumbai"}
            </span>
          </div>

          <ArrowUpRight size={14} />
        </div>
      </aside>

      {/* ===================================================
          MAIN
      =================================================== */}

      <main className="rm-main">
        {/* TOPBAR */}

        <header className="rm-topbar">
          <button
            type="button"
            className="rm-mobile-menu"
            onClick={() =>
              setMobileSidebarOpen(true)
            }
            aria-label="Open menu"
          >
            <Menu size={19} />
          </button>

          {/* SEARCH */}

          <div className="rm-search">
            <Search size={17} />

            <input
              value={search}
              onChange={(event) =>
                setSearch(
                  event.target.value,
                )
              }
              placeholder="Search applications, leads, customers..."
            />

            <kbd>
              ⌘ K
            </kbd>
          </div>

          {/* ACTIONS */}

          <div className="rm-topbar-actions">
            <button
              type="button"
              className="rm-top-action rm-top-action-primary"
              onClick={() =>
                handleAction(
                  "New lead form opened",
                )
              }
            >
              <Plus size={16} />

              <span>
                New Lead
              </span>
            </button>

            <button
              type="button"
              className="rm-top-action"
              onClick={() =>
                handleAction(
                  "Bulk upload opened",
                )
              }
            >
              <Upload size={15} />

              <span>
                Bulk Upload
              </span>
            </button>

            <button
              type="button"
              className="rm-top-action"
              onClick={() =>
                handleAction(
                  "Bureau check started",
                )
              }
            >
              <ShieldCheck size={15} />

              <span>
                Run Bureau
              </span>
            </button>

            {/* ROLE SWITCHER */}

            <div className="rm-role-switcher">
              <button
                type="button"
                className="active"
                onClick={() =>
                  handleRoleChange(
                    "RM / Field Officer",
                  )
                }
              >
                RM
              </button>

              <button
                type="button"
                onClick={() =>
                  handleRoleChange(
                    "Branch Manager",
                  )
                }
              >
                BM
              </button>

              <button
                type="button"
                onClick={() =>
                  handleRoleChange(
                    "Credit Analyst",
                  )
                }
              >
                CA
              </button>
            </div>

            {/* NOTIFICATIONS */}

            <div className="rm-notification-wrap">
              <button
                type="button"
                className="rm-notification-button"
                onClick={() =>
                  setShowNotifications(
                    (value) => !value,
                  )
                }
                aria-label="Notifications"
              >
                <Bell size={18} />

                <span>
                  3
                </span>
              </button>

              {showNotifications && (
                <div className="rm-notification-popover">
                  <div className="rm-notification-header">
                    <strong>
                      Notifications
                    </strong>

                    <span>
                      3 new
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={() =>
                      handleAction(
                        "Opened Kapoor Pharma notification",
                      )
                    }
                  >
                    <span className="rm-notification-dot danger" />

                    <div>
                      <strong>
                        BM review pending
                      </strong>

                      <small>
                        Kapoor Pharma · ₹50L
                      </small>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      handleAction(
                        "Opened bureau notification",
                      )
                    }
                  >
                    <span className="rm-notification-dot info" />

                    <div>
                      <strong>
                        Bureau check completed
                      </strong>

                      <small>
                        Jain Textiles · 772
                      </small>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      handleAction(
                        "Opened new lead notification",
                      )
                    }
                  >
                    <span className="rm-notification-dot success" />

                    <div>
                      <strong>
                        New lead assigned
                      </strong>

                      <small>
                        Mehta Enterprises
                      </small>
                    </div>
                  </button>
                </div>
              )}
            </div>

            {/* PROFILE */}

            <button
              type="button"
              className="rm-avatar rm-avatar-top"
              onClick={() =>
                handleAction(
                  "Profile menu opened",
                )
              }
            >
              {initials}
            </button>
          </div>
        </header>

        {/* =================================================
            CONTENT
        ================================================== */}

        <div className="rm-content">
          {/* WELCOME */}

          <section className="rm-welcome">
            <div className="rm-welcome-main">
              <div className="rm-avatar rm-avatar-large">
                {initials}
              </div>

              <div>
                <p className="rm-eyebrow">
                  Relationship Manager
                  Workspace
                </p>

                <h1>
                  Welcome back,{" "}
                  {user.fullName}!
                </h1>

                <div className="rm-user-meta">
                  <span>
                    {user.role}
                  </span>

                  <span>
                    #{user.employeeId}
                  </span>

                  <span>
                    <Building2 size={13} />

                    {user.branch ||
                      "Mumbai HO"}
                  </span>
                </div>
              </div>
            </div>

            <div className="rm-welcome-metrics">
              <div>
                <strong>
                  148
                </strong>

                <span>
                  Leads MTD
                </span>
              </div>

              <div className="rm-welcome-divider" />

              <div>
                <strong className="green">
                  ₹2.4Cr
                </strong>

                <span>
                  Sanctioned
                </span>
              </div>

              <button
                type="button"
                onClick={() =>
                  handleAction(
                    "Dashboard tour started",
                  )
                }
              >
                Tour

                <ArrowUpRight
                  size={15}
                />
              </button>
            </div>
          </section>

          {/* KPI CARDS */}

          <section className="rm-stat-grid">
            <div className="rm-stat-card">
              <div className="rm-stat-icon cyan">
                <Users size={21} />
              </div>

              <div className="rm-stat-copy">
                <strong>
                  148
                </strong>

                <span>
                  Total Leads Created
                </span>
              </div>

              <span className="rm-trend positive">
                ↗ +12%
              </span>
            </div>

            <div className="rm-stat-card">
              <div className="rm-stat-icon amber">
                <Activity size={21} />
              </div>

              <div className="rm-stat-copy">
                <strong>
                  18
                </strong>

                <span>
                  Pending OCR &amp; Dedupe
                </span>
              </div>

              <span className="rm-trend warning">
                Action
              </span>
            </div>

            <div className="rm-stat-card">
              <div className="rm-stat-icon blue">
                <ClipboardCheck size={21} />
              </div>

              <div className="rm-stat-copy">
                <strong>
                  9
                </strong>

                <span>
                  BM Review Queue
                </span>
              </div>

              <span className="rm-trend info">
                Queue
              </span>
            </div>

            <div className="rm-stat-card">
              <div className="rm-stat-icon green">
                <WalletCards size={21} />
              </div>

              <div className="rm-stat-copy">
                <strong>
                  ₹2.4 Cr
                </strong>

                <span>
                  Sanctioned Value (MTD)
                </span>
              </div>

              <span className="rm-trend positive">
                ↗ +8.3%
              </span>
            </div>
          </section>

          {/* QUICK ACTIONS */}

          <section className="rm-quick-actions">
            <div className="rm-section-title">
              <Zap size={17} />

              <h2>
                Quick Actions
              </h2>
            </div>

            <div className="rm-action-row">
              <button
                type="button"
                className="rm-action-primary"
                onClick={() =>
                  handleAction(
                    "Create new lead",
                  )
                }
              >
                <Plus size={16} />
                Create New Lead
              </button>

              <button
                type="button"
                onClick={() =>
                  handleAction(
                    "Bulk Upload OCR selected",
                  )
                }
              >
                <Upload size={15} />
                Bulk Upload OCR
              </button>

              <button
                type="button"
                onClick={() =>
                  handleAction(
                    "Income calculator opened",
                  )
                }
              >
                <Calculator size={15} />
                Income Calculator
              </button>

              <button
                type="button"
                onClick={() =>
                  handleAction(
                    "Bureau check selected",
                  )
                }
              >
                <ShieldCheck size={15} />
                Run Bureau Check
              </button>

              <button
                type="button"
                onClick={() =>
                  handleAction(
                    "Activity log opened",
                  )
                }
              >
                <Activity size={15} />
                Activity Log
                <ArrowUpRight size={13} />
              </button>

              <button
                type="button"
                onClick={() =>
                  handleAction(
                    "Audit trail opened",
                  )
                }
              >
                <FileCheck2 size={15} />
                Audit Trail
                <ArrowUpRight size={13} />
              </button>
            </div>
          </section>

          {/* MAIN WORKSPACE */}

          <section className="rm-workspace-grid">
            {/* LEFT PANEL */}

            <div className="rm-main-panel">
              <div className="rm-panel-tabs">
                <button
                  type="button"
                  className={
                    activeTab ===
                    "applications"
                      ? "active"
                      : ""
                  }
                  onClick={() =>
                    setActiveTab(
                      "applications",
                    )
                  }
                >
                  Application Queue

                  <span>
                    9
                  </span>
                </button>

                <button
                  type="button"
                  className={
                    activeTab === "activity"
                      ? "active"
                      : ""
                  }
                  onClick={() =>
                    setActiveTab(
                      "activity",
                    )
                  }
                >
                  Recent Activity
                </button>

                <button
                  type="button"
                  className="rm-view-all"
                  onClick={() =>
                    handleAction(
                      "Viewing all applications",
                    )
                  }
                >
                  View all

                  <ArrowUpRight
                    size={14}
                  />
                </button>
              </div>

              {activeTab ===
              "applications" ? (
                <div
                  className="rm-table-wrap"
                  key="applications"
                >
                  <table className="rm-application-table">
                    <thead>
                      <tr>
                        <th>
                          APP ID
                        </th>

                        <th>
                          APPLICANT
                        </th>

                        <th>
                          TYPE
                        </th>

                        <th>
                          AMOUNT
                        </th>

                        <th>
                          STAGE
                        </th>

                        <th>
                          STATUS
                        </th>

                        <th>
                          BUREAU
                        </th>
                      </tr>
                    </thead>

                    <tbody>
                      {filteredApplications.map(
                        (application) => (
                          <tr
                            key={
                              application.id
                            }
                          >
                            <td>
                              <button
                                type="button"
                                className="rm-app-id"
                                onClick={() =>
                                  handleAction(
                                    `${application.id} opened`,
                                  )
                                }
                              >
                                {
                                  application.id
                                }
                              </button>
                            </td>

                            <td className="rm-applicant">
                              {
                                application.applicant
                              }
                            </td>

                            <td>
                              <span className="rm-type-pill">
                                {
                                  application.type
                                }
                              </span>
                            </td>

                            <td className="rm-amount">
                              {
                                application.amount
                              }
                            </td>

                            <td>
                              {
                                application.stage
                              }
                            </td>

                            <td>
                              <span
                                className={`rm-status ${getStatusClass(
                                  application.status,
                                )}`}
                              >
                                {
                                  application.status
                                }
                              </span>
                            </td>

                            <td>
                              <span
                                className={`rm-bureau ${getBureauClass(
                                  application.bureau,
                                )}`}
                              >
                                {
                                  application.bureau
                                }
                              </span>
                            </td>
                          </tr>
                        ),
                      )}
                    </tbody>
                  </table>

                  {filteredApplications.length ===
                    0 && (
                    <div className="rm-empty-state">
                      <Search
                        size={26}
                      />

                      <strong>
                        No applications found
                      </strong>

                      <span>
                        Try searching by applicant,
                        application ID or stage.
                      </span>
                    </div>
                  )}
                </div>
              ) : (
                <div
                  className="rm-activity-list"
                  key="activity"
                >
                  {recentActivity.map(
                    (item) => (
                      <div
                        className="rm-activity-item"
                        key={item.time}
                      >
                        <span
                          className={`rm-activity-dot ${item.type}`}
                        />

                        <span className="rm-activity-time">
                          {item.time}
                        </span>

                        <div>
                          <strong>
                            {item.title}
                          </strong>

                          <p>
                            {
                              item.description
                            }
                          </p>
                        </div>

                        <ChevronRight
                          size={16}
                        />
                      </div>
                    ),
                  )}
                </div>
              )}
            </div>

            {/* RIGHT COLUMN */}

            <div className="rm-right-column">
              {/* RULE ENGINE */}

              <div className="rm-side-card">
                <div className="rm-side-card-header">
                  <div>
                    <ShieldCheck
                      size={17}
                    />

                    <h2>
                      Rule Engine
                    </h2>
                  </div>

                  <span>
                    LIVE
                  </span>
                </div>

                <div className="rm-rule-list">
                  <div className="rm-rule-row">
                    <span>
                      Minimum Bureau Score
                    </span>

                    <strong>
                      650+
                    </strong>
                  </div>

                  <div className="rm-rule-row">
                    <span>
                      FOIR Limit
                    </span>

                    <strong>
                      ≤ 55%
                    </strong>
                  </div>

                  <div className="rm-rule-row">
                    <span>
                      Max Ticket Size
                    </span>

                    <strong>
                      ₹75L
                    </strong>
                  </div>

                  <div className="rm-rule-row">
                    <span>
                      Vintage Requirement
                    </span>

                    <strong>
                      3+ Years
                    </strong>
                  </div>

                  <div className="rm-rule-row warning">
                    <span>
                      Negative Pin Codes
                    </span>

                    <strong>
                      12 Active
                    </strong>
                  </div>
                </div>
              </div>

              {/* BM REVIEW */}

              <div className="rm-side-card">
                <div className="rm-side-card-header">
                  <div>
                    <ClipboardCheck
                      size={17}
                    />

                    <h2>
                      BM Review Queue
                    </h2>
                  </div>

                  <span className="rm-count-badge">
                    5
                  </span>
                </div>

                <div className="rm-review-list">
                  {reviewQueue.map(
                    (item) => (
                      <div
                        className="rm-review-item"
                        key={item.id}
                      >
                        <span
                          className={`rm-priority-dot ${item.priority}`}
                        />

                        <div>
                          <strong>
                            {item.name}
                          </strong>

                          <span>
                            {item.id} ·{" "}
                            {item.amount}
                          </span>
                        </div>

                        <button
                          type="button"
                          onClick={() =>
                            handleAction(
                              `Reviewing ${item.name}`,
                            )
                          }
                        >
                          Review
                        </button>
                      </div>
                    ))}
                </div>

                <button
                  type="button"
                  className="rm-side-link"
                  onClick={() =>
                    handleAction(
                      "Viewing all pending reviews",
                    )
                  }
                >
                  View all pending reviews

                  <ArrowUpRight
                    size={14}
                  />
                </button>
              </div>

              {/* PORTFOLIO */}

              <div className="rm-portfolio-card">
                <div className="rm-side-card-header">
                  <div>
                    <BriefcaseBusiness
                      size={17}
                    />

                    <h2>
                      My Portfolio
                    </h2>
                  </div>

                  <button
                    type="button"
                    onClick={() =>
                      handleAction(
                        "Portfolio opened",
                      )
                    }
                  >
                    <ArrowUpRight
                      size={15}
                    />
                  </button>
                </div>

                <div className="rm-portfolio-value">
                  <strong>
                    ₹8.72Cr
                  </strong>

                  <span>
                    Active book
                  </span>
                </div>

                <div className="rm-progress-track">
                  <span />
                </div>

                <div className="rm-portfolio-stats">
                  <div>
                    <strong>
                      126
                    </strong>

                    <span>
                      Active accounts
                    </span>
                  </div>

                  <div>
                    <strong>
                      2.1%
                    </strong>

                    <span>
                      Portfolio risk
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* BOTTOM SUMMARY */}

          <section className="rm-bottom-grid">
            <div className="rm-bottom-card">
              <div className="rm-bottom-icon">
                <CalendarDays
                  size={19}
                />
              </div>

              <div>
                <strong>
                  8 visits scheduled
                </strong>

                <span>
                  Field activity for today
                </span>
              </div>

              <button
                type="button"
                onClick={() =>
                  handleAction(
                    "Field visits opened",
                  )
                }
              >
                View

                <ArrowUpRight
                  size={13}
                />
              </button>
            </div>

            <div className="rm-bottom-card">
              <div className="rm-bottom-icon">
                <MessageSquare
                  size={19}
                />
              </div>

              <div>
                <strong>
                  3 unread messages
                </strong>

                <span>
                  From branch and credit teams
                </span>
              </div>

              <button
                type="button"
                onClick={() =>
                  handleAction(
                    "Messages opened",
                  )
                }
              >
                Open

                <ArrowUpRight
                  size={13}
                />
              </button>
            </div>

            <div className="rm-bottom-card">
              <div className="rm-bottom-icon">
                <Sparkles
                  size={19}
                />
              </div>

              <div>
                <strong>
                  92% of target achieved
                </strong>

                <span>
                  Current monthly performance
                </span>
              </div>

              <button
                type="button"
                onClick={() =>
                  handleAction(
                    "Performance opened",
                  )
                }
              >
                Details

                <ArrowUpRight
                  size={13}
                />
              </button>
            </div>
          </section>
        </div>

        {/* TOAST */}

        {toast && (
          <div className="rm-toast">
            <CheckCircle2
              size={17}
            />

            <span>
              {toast}
            </span>
          </div>
        )}
      </main>
    </div>
  );
}