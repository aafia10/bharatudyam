import { createFileRoute } from "@tanstack/react-router";
import {
  AlertCircle,
  ArrowRight,
  Building2,
  Check,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Download,
  Eye,
  FileCheck2,
  FileText,
  Hourglass,
  Pencil,
  ScanLine,
  ShieldCheck,
  Sparkles,
  Upload,
  UserRound,
  X,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import type { ChangeEvent, ReactNode } from "react";

import { AppShell } from "@/components/app/AppShell";
import { useAuthGuard } from "@/hooks/use-auth-guard";
import { documents as initialDocuments } from "@/lib/app-data";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/documents")({
  head: () => ({
    meta: [
      {
        title: "Document Vault — Bharat Udyam",
      },
      {
        name: "description",
        content:
          "Upload, verify and manage your MSME documents with AI-powered profile extraction.",
      },
      {
        property: "og:title",
        content: "Document Vault — Bharat Udyam",
      },
      {
        property: "og:description",
        content:
          "Upload documents and automatically build your verified MSME profile.",
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

  component: DocumentsPage,
});

/* =========================================================
   TYPES
========================================================= */

type Tab = "documents" | "profile" | "business";

type WorkflowState =
  | "missing"
  | "uploaded"
  | "scanning"
  | "extracting"
  | "review"
  | "verified";

type ExtractedField = {
  label: string;
  value: string;
};

type DocumentItem = {
  name: string;
  category: "Identity" | "Business" | "Financial";
  size?: string;
  uploaded?: string;
  state: WorkflowState;
  fileName?: string;
  extracted?: ExtractedField[];
};

type EditableProfile = {
  fullName: string;
  email: string;
  mobile: string;
  city: string;
  state: string;
  businessName: string;
  businessType: string;
  industrySector: string;
};

/* =========================================================
   TABS
========================================================= */

const tabs: {
  id: Tab;
  label: string;
  icon: typeof Upload;
}[] = [
  {
    id: "documents",
    label: "Document Upload",
    icon: Upload,
  },
  {
    id: "profile",
    label: "My Profile",
    icon: Sparkles,
  },
  {
    id: "business",
    label: "Business Details",
    icon: Building2,
  },
];

/* =========================================================
   INITIAL DOCUMENT STATE
========================================================= */

const initialDocumentState: DocumentItem[] =
  initialDocuments.map((doc) => ({
    ...doc,
    state:
      doc.state === "verified"
        ? "verified"
        : doc.state === "review"
          ? "review"
          : "missing",
  }));

const PROFILE_COMPLETE_START = 71;

/* =========================================================
   PAGE
========================================================= */

function DocumentsPage() {
  const { user, loading } = useAuthGuard();

  const [tab, setTab] = useState<Tab>("documents");

  const [documents, setDocuments] =
    useState<DocumentItem[]>(initialDocumentState);

  const [expanded, setExpanded] =
    useState<string | null>(null);

  const [processing, setProcessing] =
    useState<string | null>(null);

  const [editingProfile, setEditingProfile] =
    useState(false);

  const [savingProfile, setSavingProfile] =
    useState(false);

  const [savedProfile, setSavedProfile] =
    useState(false);

  const fileInputRef =
    useRef<HTMLInputElement | null>(null);

  const selectedDocumentRef =
    useRef<string | null>(null);

  /* =======================================================
     EDITABLE PROFILE STATE
  ======================================================= */

  const [profile, setProfile] =
    useState<EditableProfile>({
      fullName: "",
      email: "",
      mobile: "",
      city: "",
      state: "",
      businessName: "",
      businessType: "",
      industrySector: "",
    });

  /* =======================================================
     LOAD USER PROFILE
  ======================================================= */

  useEffect(() => {
    if (!user) return;

    setProfile({
      fullName:
        user.fullName ||
        user.name ||
        "",

      email:
        user.email ||
        "",

      mobile:
        user.mobile ||
        user.phone ||
        "",

      city:
        user.city ||
        "",

      state:
        user.state ||
        "",

      businessName:
        user.businessName ||
        "",

      businessType:
        user.businessType ||
        "",

      industrySector:
        user.industrySector ||
        user.sector ||
        "",
    });
  }, [user]);

  /* =======================================================
     LOADING
  ======================================================= */

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-4">
          <div className="size-10 animate-spin rounded-full border-2 border-gold/20 border-t-gold" />

          <p className="text-sm text-muted-foreground">
            Loading your profile...
          </p>
        </div>
      </div>
    );
  }

  /* =======================================================
     PROFILE VALUES
  ======================================================= */

  const fullName =
    profile.fullName ||
    "Your Name";

  const email =
    profile.email;

  const businessName =
    profile.businessName ||
    "Your Business";

  const city =
    profile.city;

  const state =
    profile.state;

  const industry =
    profile.industrySector ||
    "Not provided";

  const businessType =
    profile.businessType ||
    "Not provided";

  const mobile =
    profile.mobile;

  /* =======================================================
     DOCUMENT COUNTS
  ======================================================= */

  const uploadedCount =
    documents.filter(
      (doc) =>
        doc.state !== "missing",
    ).length;

  const verifiedCount =
    documents.filter(
      (doc) =>
        doc.state === "verified",
    ).length;

  const reviewCount =
    documents.filter(
      (doc) =>
        doc.state === "review",
    ).length;

  const missingCount =
    documents.filter(
      (doc) =>
        doc.state === "missing",
    ).length;

  const profileComplete =
    Math.min(
      100,
      PROFILE_COMPLETE_START +
        verifiedCount * 4 +
        (verifiedCount >= 3 ? 5 : 0),
    );

  /* =======================================================
     UPDATE PROFILE FIELD
  ======================================================= */

  function updateProfileField(
    field: keyof EditableProfile,
    value: string,
  ) {
    setProfile((current) => ({
      ...current,
      [field]: value,
    }));

    setSavedProfile(false);
  }

  /* =======================================================
     SAVE PROFILE
  ======================================================= */

  function saveProfile() {
    if (typeof window === "undefined") {
      return;
    }

    setSavingProfile(true);

    try {
      const existingRaw =
        localStorage.getItem(
          "bharat-udyam-user",
        );

      let existingUser: Record<
        string,
        unknown
      > = {};

      if (existingRaw) {
        try {
          const parsed =
            JSON.parse(existingRaw);

          if (
            parsed &&
            typeof parsed === "object" &&
            !Array.isArray(parsed)
          ) {
            existingUser = parsed;
          }
        } catch {
          existingUser = {};
        }
      }

      const updatedUser = {
        ...existingUser,

        fullName:
          profile.fullName,

        name:
          profile.fullName,

        email:
          profile.email,

        mobile:
          profile.mobile,

        phone:
          profile.mobile,

        city:
          profile.city,

        state:
          profile.state,

        businessName:
          profile.businessName,

        businessType:
          profile.businessType,

        industrySector:
          profile.industrySector,

        sector:
          profile.industrySector,
      };

      localStorage.setItem(
        "bharat-udyam-user",
        JSON.stringify(updatedUser),
      );

      /*
       * Keep existing user stores synchronized
       * only if they already exist.
       */

      if (
        localStorage.getItem(
          "currentUser",
        )
      ) {
        localStorage.setItem(
          "currentUser",
          JSON.stringify(updatedUser),
        );
      }

      if (
        localStorage.getItem("user")
      ) {
        localStorage.setItem(
          "user",
          JSON.stringify(updatedUser),
        );
      }

      setTimeout(() => {
        setSavingProfile(false);
        setSavedProfile(true);
        setEditingProfile(false);

        setTimeout(() => {
          setSavedProfile(false);
        }, 3500);
      }, 500);
    } catch (error) {
      console.error(
        "Failed to save profile:",
        error,
      );

      setSavingProfile(false);
    }
  }

  /* =======================================================
     CANCEL PROFILE EDIT
  ======================================================= */

  function cancelProfileEditing() {
    if (!user) return;

    setProfile({
      fullName:
        user.fullName ||
        user.name ||
        "",

      email:
        user.email ||
        "",

      mobile:
        user.mobile ||
        user.phone ||
        "",

      city:
        user.city ||
        "",

      state:
        user.state ||
        "",

      businessName:
        user.businessName ||
        "",

      businessType:
        user.businessType ||
        "",

      industrySector:
        user.industrySector ||
        user.sector ||
        "",
    });

    setEditingProfile(false);
    setSavedProfile(false);
  }

  /* =======================================================
     UPDATE DOCUMENT
  ======================================================= */

  function updateDocument(
    name: string,
    changes: Partial<DocumentItem>,
  ) {
    setDocuments((current) =>
      current.map((doc) =>
        doc.name === name
          ? {
              ...doc,
              ...changes,
            }
          : doc,
      ),
    );
  }

  /* =======================================================
     AI EXTRACTION DATA
  ======================================================= */

  function getExtraction(
    name: string,
  ): ExtractedField[] {
    const location = [
      city,
      state,
    ]
      .filter(Boolean)
      .join(", ");

    switch (name) {
      case "Aadhaar Card":
        return [
          {
            label: "Full Name",
            value: fullName,
          },
          {
            label: "Date of Birth",
            value: "15 March 1980",
          },
          {
            label: "Gender",
            value:
              "Not extracted in demo",
          },
          {
            label: "Address",
            value:
              location ||
              "Address will be extracted",
          },
          {
            label: "Aadhaar Number",
            value:
              "XXXX XXXX 8842",
          },
        ];

      case "PAN Card":
        return [
          {
            label: "Full Name",
            value: fullName,
          },
          {
            label: "PAN Number",
            value:
              "ABCDE1234F",
          },
          {
            label: "Date of Birth",
            value:
              "15 March 1980",
          },
        ];

      case "GST Certificate":
        return [
          {
            label: "Business Name",
            value: businessName,
          },
          {
            label: "GST Number",
            value:
              "27ABCDE1234F1Z5",
          },
          {
            label: "Registered Address",
            value:
              location ||
              "Business address will be extracted",
          },
          {
            label: "State",
            value:
              state ||
              "Not provided",
          },
          {
            label: "Registration Date",
            value:
              "15 April 2018",
          },
        ];

      case "Udyam Certificate":
        return [
          {
            label: "Enterprise Name",
            value: businessName,
          },
          {
            label: "Udyam Registration",
            value:
              "UDYAM-XX-00-0012345",
          },
          {
            label: "Enterprise Type",
            value:
              "Small Enterprise",
          },
          {
            label: "Organisation Type",
            value:
              "Private Limited Company",
          },
          {
            label: "Major Activity",
            value:
              industry !==
              "Not provided"
                ? industry
                : "Manufacturing",
          },
          {
            label: "NIC Codes",
            value:
              "1311, 1312",
          },
          {
            label: "Registration Date",
            value:
              "15 April 2018",
          },
          {
            label: "District",
            value:
              city ||
              "Not provided",
          },
          {
            label: "State",
            value:
              state ||
              "Not provided",
          },
        ];

      case "Balance Sheet":
        return [
          {
            label: "Financial Year",
            value:
              "2024–25",
          },
          {
            label: "Annual Turnover",
            value:
              "₹2.80 Cr",
          },
          {
            label: "Total Assets",
            value:
              "₹4.15 Cr",
          },
          {
            label: "Total Liabilities",
            value:
              "₹1.35 Cr",
          },
          {
            label: "Net Worth",
            value:
              "₹2.80 Cr",
          },
        ];

      case "Bank Statements":
        return [
          {
            label: "Account Type",
            value:
              "Current Account",
          },
          {
            label:
              "Average Monthly Balance",
            value:
              "₹8.40 L",
          },
          {
            label:
              "Statement Period",
            value:
              "April 2024 – March 2025",
          },
          {
            label:
              "Bank Transactions",
            value:
              "486 transactions",
          },
          {
            label:
              "Financial Activity",
            value:
              "Active",
          },
        ];

      case "ITR":
        return [
          {
            label:
              "Assessment Year",
            value:
              "2025–26",
          },
          {
            label:
              "Declared Turnover",
            value:
              "₹2.80 Cr",
          },
          {
            label:
              "Taxable Income",
            value:
              "₹34.60 L",
          },
          {
            label:
              "ITR Status",
            value:
              "Filed",
          },
          {
            label:
              "Financial Year",
            value:
              "2024–25",
          },
        ];

      default:
        return [];
    }
  }

  /* =======================================================
     START UPLOAD
  ======================================================= */

  function startUpload(
    documentName: string,
  ) {
    selectedDocumentRef.current =
      documentName;

    fileInputRef.current?.click();
  }

  /* =======================================================
     HANDLE FILE
  ======================================================= */

  function handleFileSelected(
    event: ChangeEvent<HTMLInputElement>,
  ) {
    const file =
      event.target.files?.[0];

    const documentName =
      selectedDocumentRef.current;

    if (
      !file ||
      !documentName
    ) {
      return;
    }

    updateDocument(
      documentName,
      {
        state: "uploaded",
        fileName: file.name,
        size: `${Math.max(
          file.size /
            1024 /
            1024,
          0.1,
        ).toFixed(1)} MB`,
        uploaded:
          new Date()
            .toISOString()
            .slice(0, 10),
      },
    );

    setProcessing(
      documentName,
    );

    setTimeout(() => {
      updateDocument(
        documentName,
        {
          state: "scanning",
        },
      );
    }, 700);

    setTimeout(() => {
      updateDocument(
        documentName,
        {
          state: "extracting",
        },
      );
    }, 1600);

    setTimeout(() => {
      updateDocument(
        documentName,
        {
          state: "review",
          extracted:
            getExtraction(
              documentName,
            ),
        },
      );

      setExpanded(
        documentName,
      );

      setProcessing(null);
    }, 3000);

    event.target.value = "";
  }

  /* =======================================================
     CONFIRM AI EXTRACTION
  ======================================================= */

  function confirmExtraction(
    document: DocumentItem,
  ) {
    if (
      !document.extracted
    ) {
      return;
    }

    updateDocument(
      document.name,
      {
        state: "verified",
      },
    );

    setExpanded(null);

    try {
      const existingUser =
        JSON.parse(
          localStorage.getItem(
            "bharat-udyam-user",
          ) || "{}",
        );

      const extracted =
        Object.fromEntries(
          document.extracted.map(
            (field) => [
              field.label,
              field.value,
            ],
          ),
        );

      const updatedUser = {
        ...existingUser,

        ...(document.name ===
          "PAN Card" && {
          fullName:
            existingUser.fullName ||
            extracted[
              "Full Name"
            ] ||
            fullName,
        }),

        ...(document.name ===
          "GST Certificate" && {
          businessName:
            extracted[
              "Business Name"
            ] ||
            existingUser.businessName ||
            businessName,

          state:
            extracted[
              "State"
            ] ||
            existingUser.state ||
            state,
        }),

        ...(document.name ===
          "Udyam Certificate" && {
          businessName:
            extracted[
              "Enterprise Name"
            ] ||
            existingUser.businessName ||
            businessName,

          industrySector:
            extracted[
              "Major Activity"
            ] ||
            existingUser.industrySector ||
            industry,

          businessType:
            extracted[
              "Organisation Type"
            ] ||
            existingUser.businessType ||
            businessType,
        }),
      };

      localStorage.setItem(
        "bharat-udyam-user",
        JSON.stringify(
          updatedUser,
        ),
      );

      /*
       * Immediately update the visible UI too.
       */
      setProfile(
        (current) => ({
          ...current,

          fullName:
            updatedUser.fullName ||
            current.fullName,

          businessName:
            updatedUser.businessName ||
            current.businessName,

          state:
            updatedUser.state ||
            current.state,

          industrySector:
            updatedUser.industrySector ||
            current.industrySector,

          businessType:
            updatedUser.businessType ||
            current.businessType,
        }),
      );
    } catch (error) {
      console.error(
        "Failed to save extracted profile:",
        error,
      );
    }
  }

  /* =======================================================
     STATUS LABEL
  ======================================================= */

  function statusLabel(
    state: WorkflowState,
  ) {
    switch (state) {
      case "uploaded":
        return "Uploaded";

      case "scanning":
        return "Scanning";

      case "extracting":
        return "AI Extracting";

      case "review":
        return "Review Required";

      case "verified":
        return "Verified";

      default:
        return "Not uploaded";
    }
  }

  /* =======================================================
     STATUS ICON
  ======================================================= */

  function statusIcon(
    state: WorkflowState,
  ) {
    if (
      state === "verified"
    ) {
      return (
        <CheckCircle2 className="size-3.5" />
      );
    }

    if (
      state === "review"
    ) {
      return (
        <Hourglass className="size-3.5" />
      );
    }

    if (
      state === "scanning" ||
      state === "extracting"
    ) {
      return (
        <ScanLine className="size-3.5 animate-pulse" />
      );
    }

    return null;
  }

  /* =======================================================
     STATUS CLASS
  ======================================================= */

  function statusClass(
    state: WorkflowState,
  ) {
    if (
      state === "verified"
    ) {
      return "bg-mint/12 text-mint";
    }

    if (
      state === "review"
    ) {
      return "bg-gold/12 text-gold";
    }

    if (
      state === "scanning" ||
      state === "extracting"
    ) {
      return "bg-violet/12 text-violet";
    }

    return "bg-surface-2 text-muted-foreground";
  }

  /* =======================================================
     PROFILE VIEW
  ======================================================= */

  function renderProfile() {
    return (
      <div className="bu-doc-content mt-6 space-y-5 sm:mt-8 sm:space-y-6">

        {/* Profile overview */}

        <div className="bu-doc-profile bu-doc-animate glass card-edge overflow-hidden p-5 sm:p-8">

          <div className="flex flex-col gap-5 sm:flex-row sm:items-center">

            <div className="bu-doc-avatar flex size-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-gold text-base font-bold text-primary-foreground shadow-gold sm:size-16 sm:text-lg">
              {getInitials(
                fullName,
              )}
            </div>

            <div className="min-w-0 flex-1">

              <p className="text-[9px] font-semibold uppercase tracking-[0.18em] text-gold sm:text-xs">
                Generated Profile
              </p>

              <h2 className="mt-1 truncate text-xl font-bold text-foreground sm:text-2xl">
                {fullName}
              </h2>

              <p className="mt-1 truncate text-xs text-muted-foreground sm:text-sm">
                {businessName}
              </p>

              <div className="mt-3 flex flex-wrap gap-3 text-[10px] text-muted-foreground sm:text-xs">

                {email ? (
                  <span>
                    {email}
                  </span>
                ) : null}

                {mobile ? (
                  <span>
                    {mobile}
                  </span>
                ) : null}

                {city ||
                state ? (
                  <span>
                    {[city, state]
                      .filter(
                        Boolean,
                      )
                      .join(", ")}
                  </span>
                ) : null}

              </div>
            </div>

            <div className="sm:min-w-[150px] sm:text-right">

              <p className="text-gradient-gold text-3xl font-bold">
                {profileComplete}%
              </p>

              <p className="text-[10px] text-muted-foreground sm:text-xs">
                Profile Complete
              </p>

            </div>
          </div>

          <div className="mt-5 h-2 overflow-hidden rounded-full bg-surface-2">

            <div
              className="bu-doc-profile-progress h-full rounded-full bg-gradient-gold"
              style={{
                width: `${profileComplete}%`,
              }}
            />

          </div>

          <div className="mt-5 flex items-start gap-3 rounded-xl border border-mint/15 bg-mint/5 p-3.5 sm:p-4">

            <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-mint sm:size-5" />

            <div>

              <p className="text-xs font-semibold text-foreground sm:text-sm">
                Profile automatically generated
              </p>

              <p className="mt-1 text-[10.5px] leading-5 text-muted-foreground sm:text-xs sm:leading-6">
                Confirmed information from your uploaded
                documents is automatically added to your
                Bharat Udyam profile.
              </p>

            </div>
          </div>
        </div>

        {/* Personal information */}

        <EditableProfileSection
          icon={
            <UserRound className="size-4 text-gold" />
          }
          title="Personal Information"
          editing={editingProfile}
        >
          <div className="grid gap-3 sm:grid-cols-2">

            <EditableField
              label="Full Name"
              value={profile.fullName}
              editing={editingProfile}
              onChange={(value) =>
                updateProfileField(
                  "fullName",
                  value,
                )
              }
            />

            <EditableField
              label="Email Address"
              value={profile.email}
              editing={editingProfile}
              type="email"
              onChange={(value) =>
                updateProfileField(
                  "email",
                  value,
                )
              }
            />

            <EditableField
              label="Mobile Number"
              value={profile.mobile}
              editing={editingProfile}
              onChange={(value) =>
                updateProfileField(
                  "mobile",
                  value,
                )
              }
            />

            <EditableField
              label="City"
              value={profile.city}
              editing={editingProfile}
              onChange={(value) =>
                updateProfileField(
                  "city",
                  value,
                )
              }
            />

            <EditableField
              label="State"
              value={profile.state}
              editing={editingProfile}
              onChange={(value) =>
                updateProfileField(
                  "state",
                  value,
                )
              }
            />

          </div>
        </EditableProfileSection>

        {/* Business information */}

        <EditableProfileSection
          icon={
            <Building2 className="size-4 text-gold" />
          }
          title="Business Information"
          editing={editingProfile}
        >
          <div className="grid gap-3 sm:grid-cols-2">

            <EditableField
              label="Business Name"
              value={profile.businessName}
              editing={editingProfile}
              onChange={(value) =>
                updateProfileField(
                  "businessName",
                  value,
                )
              }
            />

            <EditableField
              label="Business Type"
              value={profile.businessType}
              editing={editingProfile}
              onChange={(value) =>
                updateProfileField(
                  "businessType",
                  value,
                )
              }
            />

            <EditableField
              label="Industry Sector"
              value={profile.industrySector}
              editing={editingProfile}
              onChange={(value) =>
                updateProfileField(
                  "industrySector",
                  value,
                )
              }
            />

            <EditableField
              label="State"
              value={profile.state}
              editing={editingProfile}
              onChange={(value) =>
                updateProfileField(
                  "state",
                  value,
                )
              }
            />

          </div>
        </EditableProfileSection>

        {/* Verification */}

        <ProfileSection
          icon={
            <FileCheck2 className="size-4 text-mint" />
          }
          title="Verification Summary"
          fields={[
            [
              "Documents Uploaded",
              `${uploadedCount} of ${documents.length}`,
            ],
            [
              "Documents Verified",
              `${verifiedCount}`,
            ],
            [
              "Documents Requiring Review",
              `${reviewCount}`,
            ],
            [
              "Verification Status",
              verifiedCount >= 3
                ? "Profile building"
                : "In progress",
            ],
          ]}
        />

        {/* Save / edit controls */}

        <div className="bu-doc-editor-actions glass card-edge rounded-2xl p-4 sm:p-5">

          {!editingProfile ? (
            <button
              type="button"
              onClick={() => {
                setEditingProfile(
                  true,
                );
                setSavedProfile(
                  false,
                );
              }}
              className="bu-doc-action flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-gold px-5 py-3 text-xs font-bold text-primary-foreground shadow-gold transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg sm:py-3.5 sm:text-sm"
            >
              <Pencil className="size-4" />

              Review / Edit Profile

              <ArrowRight className="size-4" />
            </button>
          ) : (
            <div className="flex flex-col gap-2 sm:flex-row">

              <button
                type="button"
                onClick={
                  cancelProfileEditing
                }
                className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-border bg-surface-2/50 px-5 py-3 text-xs font-semibold text-muted-foreground transition-all duration-300 hover:border-gold/30 hover:text-foreground sm:py-3.5 sm:text-sm"
              >
                <X className="size-4" />
                Cancel
              </button>

              <button
                type="button"
                onClick={
                  saveProfile
                }
                disabled={
                  savingProfile
                }
                className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-gradient-gold px-5 py-3 text-xs font-bold text-primary-foreground shadow-gold transition-all duration-300 hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60 sm:py-3.5 sm:text-sm"
              >
                {savingProfile ? (
                  <>
                    <span className="size-4 animate-spin rounded-full border-2 border-primary-foreground/30 border-t-primary-foreground" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Check className="size-4" />
                    Save Changes
                  </>
                )}
              </button>

            </div>
          )}

          {savedProfile ? (
            <div className="bu-doc-save-success mt-3 flex items-center gap-2 rounded-xl border border-mint/20 bg-mint/5 px-4 py-3 text-xs font-semibold text-mint">
              <CheckCircle2 className="size-4" />
              Your profile changes have been saved successfully.
            </div>
          ) : null}

        </div>
      </div>
    );
  }

  /* =======================================================
     BUSINESS VIEW
  ======================================================= */

  function renderBusiness() {
    return (
      <div className="bu-doc-content mt-6 space-y-5 sm:mt-8">

        <EditableProfileSection
          icon={
            <Building2 className="size-4 text-gold" />
          }
          title="Business Details"
          editing={editingProfile}
        >
          <div className="grid gap-3 sm:grid-cols-2">

            <EditableField
              label="Business Name"
              value={profile.businessName}
              editing={editingProfile}
              onChange={(value) =>
                updateProfileField(
                  "businessName",
                  value,
                )
              }
            />

            <EditableField
              label="Business Type"
              value={profile.businessType}
              editing={editingProfile}
              onChange={(value) =>
                updateProfileField(
                  "businessType",
                  value,
                )
              }
            />

            <EditableField
              label="Industry Sector"
              value={profile.industrySector}
              editing={editingProfile}
              onChange={(value) =>
                updateProfileField(
                  "industrySector",
                  value,
                )
              }
            />

            <EditableField
              label="City"
              value={profile.city}
              editing={editingProfile}
              onChange={(value) =>
                updateProfileField(
                  "city",
                  value,
                )
              }
            />

            <EditableField
              label="State"
              value={profile.state}
              editing={editingProfile}
              onChange={(value) =>
                updateProfileField(
                  "state",
                  value,
                )
              }
            />

          </div>
        </EditableProfileSection>

        {/* Business save controls */}

        <div className="glass card-edge rounded-2xl p-4 sm:p-5">

          {!editingProfile ? (
            <button
              type="button"
              onClick={() => {
                setEditingProfile(
                  true,
                );
                setSavedProfile(
                  false,
                );
              }}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-gold px-5 py-3 text-xs font-bold text-primary-foreground shadow-gold transition-all duration-300 hover:-translate-y-0.5 sm:py-3.5 sm:text-sm"
            >
              <Pencil className="size-4" />
              Review / Edit Business Details
              <ArrowRight className="size-4" />
            </button>
          ) : (
            <div className="flex flex-col gap-2 sm:flex-row">

              <button
                type="button"
                onClick={
                  cancelProfileEditing
                }
                className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-border bg-surface-2/50 px-5 py-3 text-xs font-semibold text-muted-foreground transition-all duration-300 hover:text-foreground sm:py-3.5 sm:text-sm"
              >
                <X className="size-4" />
                Cancel
              </button>

              <button
                type="button"
                onClick={
                  saveProfile
                }
                disabled={
                  savingProfile
                }
                className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-gradient-gold px-5 py-3 text-xs font-bold text-primary-foreground shadow-gold transition-all duration-300 hover:-translate-y-0.5 disabled:opacity-60 sm:py-3.5 sm:text-sm"
              >
                {savingProfile ? (
                  <>
                    <span className="size-4 animate-spin rounded-full border-2 border-primary-foreground/30 border-t-primary-foreground" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Check className="size-4" />
                    Save Changes
                  </>
                )}
              </button>

            </div>
          )}

          {savedProfile ? (
            <div className="mt-3 flex items-center gap-2 rounded-xl border border-mint/20 bg-mint/5 px-4 py-3 text-xs font-semibold text-mint">
              <CheckCircle2 className="size-4" />
              Business details saved successfully.
            </div>
          ) : null}

        </div>

        {/* AI enrichment */}

        <div className="bu-doc-info glass card-edge p-5 sm:p-6">

          <div className="flex items-start gap-3">

            <Sparkles className="mt-0.5 size-4 shrink-0 text-gold sm:size-5" />

            <div>

              <p className="text-xs font-semibold text-foreground sm:text-sm">
                AI-powered profile enrichment
              </p>

              <p className="mt-1 text-[11px] leading-5 text-muted-foreground sm:text-sm sm:leading-6">
                GST and Udyam documents can automatically
                enrich your business information after you
                confirm the extracted data.
              </p>

            </div>
          </div>
        </div>
      </div>
    );
  }

  /* =======================================================
     MAIN
  ======================================================= */

  return (
    <AppShell>
      <main className="bu-doc-page w-full min-w-0 pb-8">

        {/* Hidden file input */}

        <input
          ref={fileInputRef}
          type="file"
          accept=".pdf,.jpg,.jpeg,.png"
          className="hidden"
          onChange={
            handleFileSelected
          }
        />

        {/* =====================================================
            HEADER
        ===================================================== */}

        <section className="bu-doc-header relative overflow-hidden">

          <div className="bu-doc-orb bu-doc-orb-one" />
          <div className="bu-doc-orb bu-doc-orb-two" />

          <div className="relative">

            <div className="flex items-center gap-2">

              <span className="bu-doc-heading-icon flex size-8 items-center justify-center rounded-xl bg-gold/10 text-gold">
                <ShieldCheck className="size-4" />
              </span>

              <p className="text-[9px] font-bold uppercase tracking-[0.18em] text-gold sm:text-[10px]">
                Secure Document Centre
              </p>

            </div>

            <h1 className="mt-3 text-[27px] font-bold tracking-[-0.03em] text-foreground sm:text-4xl">
              Document Vault
            </h1>

            <p className="mt-2 max-w-2xl text-[11.5px] leading-5 text-muted-foreground sm:text-sm sm:leading-6">
              Upload your documents once. Our AI extracts the
              relevant information and helps build your verified
              MSME profile.
            </p>

          </div>
        </section>

        {/* =====================================================
            PROFILE SUMMARY
        ===================================================== */}

        <section className="bu-doc-profile glass card-edge mt-6 overflow-hidden p-4 sm:mt-8 sm:p-6">

          <div className="flex flex-col gap-4 sm:flex-row sm:items-center">

            <div className="bu-doc-avatar flex size-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-gold text-sm font-bold text-primary-foreground shadow-gold sm:size-14 sm:text-base">
              {getInitials(
                fullName,
              )}
            </div>

            <div className="min-w-0 flex-1">

              <p className="text-[9px] font-bold uppercase tracking-[0.18em] text-gold sm:text-[10px]">
                MSME Profile
              </p>

              <h2 className="mt-0.5 truncate text-lg font-bold text-foreground sm:text-xl">
                {fullName}
              </h2>

              <p className="truncate text-[11px] text-muted-foreground sm:text-xs">
                {businessName}
              </p>

              <div className="mt-2 flex flex-wrap items-center gap-2.5 text-[9px] sm:text-[10px]">

                <span className="flex items-center gap-1.5 text-mint">
                  <ShieldCheck className="size-3.5" />
                  Secure vault
                </span>

                <span className="text-muted-foreground">
                  {verifiedCount} verified
                </span>

                {reviewCount > 0 ? (
                  <span className="text-gold">
                    {reviewCount} review
                  </span>
                ) : null}

              </div>
            </div>

            <div className="flex items-center gap-4 sm:block sm:min-w-[145px] sm:text-right">

              <div className="flex-1">

                <p className="text-gradient-gold text-2xl font-bold sm:text-3xl">
                  {profileComplete}%
                </p>

                <p className="text-[9px] text-muted-foreground sm:text-[10px]">
                  Profile Complete
                </p>

              </div>

              <div className="mt-2 h-1.5 flex-1 overflow-hidden rounded-full bg-surface-2 sm:w-full">

                <div
                  className="bu-doc-profile-progress h-full rounded-full bg-gradient-gold"
                  style={{
                    width: `${profileComplete}%`,
                  }}
                />

              </div>

            </div>

          </div>
        </section>

        {/* =====================================================
            TABS
        ===================================================== */}

        <div className="bu-doc-tabs glass mt-5 flex gap-1.5 overflow-x-auto p-1.5 sm:mt-6 sm:flex-wrap sm:gap-2 sm:p-2">

          {tabs.map(
            ({
              id,
              label,
              icon: Icon,
            }) => (
              <button
                key={id}
                type="button"
                onClick={() =>
                  setTab(id)
                }
                className={cn(
                  "bu-doc-tab flex shrink-0 items-center justify-center gap-1.5 rounded-xl px-3 py-2.5 text-[10px] font-medium transition-all duration-300 sm:px-4 sm:py-3 sm:text-[13px]",
                  tab === id
                    ? "bg-accent text-gold ring-1 ring-gold/25 shadow-lg shadow-gold/5"
                    : "text-muted-foreground hover:bg-surface-2/40 hover:text-foreground",
                )}
              >
                <Icon className="size-3.5 sm:size-4" />

                <span>
                  {label}
                </span>
              </button>
            ),
          )}

        </div>

        {/* =====================================================
            DOCUMENT TAB
        ===================================================== */}

        {tab ===
        "documents" ? (
          <>

            {/* =================================================
                WORKFLOW
            ================================================= */}

            <section className="bu-doc-workflow mt-5 overflow-hidden rounded-2xl border border-gold/20 bg-gradient-to-br from-gold/[0.08] via-background to-mint/[0.04] p-4 sm:mt-7 sm:p-5">

              <div className="flex items-start gap-3">

                <div className="bu-doc-workflow-icon flex size-10 shrink-0 items-center justify-center rounded-xl bg-gold/10 text-gold sm:size-11">
                  <Sparkles className="size-4.5 sm:size-5" />
                </div>

                <div className="min-w-0 flex-1">

                  <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">

                    <p className="text-xs font-bold text-foreground sm:text-sm">
                      Smart document verification
                    </p>

                    <span className="flex items-center gap-1.5 text-[9px] font-semibold text-mint sm:text-[10px]">
                      <span className="size-1.5 animate-pulse rounded-full bg-mint" />
                      AI Extraction Enabled
                    </span>

                  </div>

                  <p className="mt-1 text-[10.5px] leading-5 text-muted-foreground sm:text-xs">
                    Upload → AI scans → Information is extracted →
                    You review → Confirm → Profile is updated.
                  </p>

                </div>
              </div>

              {/* Mini process */}

              <div className="bu-doc-process mt-4 grid grid-cols-5 gap-1.5 sm:gap-2">

                {[
                  ["01", "Upload"],
                  ["02", "Scan"],
                  ["03", "Extract"],
                  ["04", "Review"],
                  ["05", "Verify"],
                ].map(
                  (
                    [number, label],
                    index,
                  ) => (
                    <div
                      key={label}
                      className="bu-doc-process-step"
                      style={{
                        animationDelay:
                          `${index * 80}ms`,
                      }}
                    >
                      <span>
                        {number}
                      </span>

                      <p>
                        {label}
                      </p>
                    </div>
                  ),
                )}

              </div>
            </section>

            {/* =================================================
                DOCUMENT HEADER
            ================================================= */}

            <section className="bu-doc-list-header mt-7 sm:mt-9">

              <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">

                <div>

                  <div className="flex items-center gap-2">

                    <h2 className="text-xl font-bold text-foreground sm:text-[23px]">
                      Your Documents
                    </h2>

                    <span className="rounded-full bg-surface-2 px-2 py-0.5 text-[9px] font-semibold text-muted-foreground">
                      {documents.length}
                    </span>

                  </div>

                  <p className="mt-1 text-[11px] text-muted-foreground sm:text-sm">
                    {uploadedCount} of{" "}
                    {documents.length}{" "}
                    uploaded
                  </p>

                </div>

                <div className="flex w-fit items-center gap-2 rounded-full border border-border bg-surface-2/40 px-3 py-1.5 text-[9px] font-medium text-muted-foreground sm:px-4 sm:py-2 sm:text-xs">

                  <ScanLine className="size-3.5 text-gold sm:size-4" />

                  PDF · JPG · PNG

                </div>

              </div>

              {/* Progress */}

              <div className="mt-4 grid grid-cols-3 gap-2 sm:mt-5 sm:max-w-lg sm:gap-3">

                <MiniStat
                  label="Uploaded"
                  value={
                    uploadedCount
                  }
                  icon={
                    <Upload className="size-3.5" />
                  }
                  tone="gold"
                />

                <MiniStat
                  label="Verified"
                  value={
                    verifiedCount
                  }
                  icon={
                    <CheckCircle2 className="size-3.5" />
                  }
                  tone="mint"
                />

                <MiniStat
                  label="Pending"
                  value={
                    missingCount
                  }
                  icon={
                    <AlertCircle className="size-3.5" />
                  }
                  tone="neutral"
                />

              </div>
            </section>

            {/* =================================================
                DOCUMENT GRID
            ================================================= */}

            <section className="mt-4 grid gap-3.5 sm:mt-5 sm:gap-5 md:grid-cols-2">

              {documents.map(
                (
                  doc,
                  index,
                ) => {
                  const isProcessing =
                    processing ===
                      doc.name &&
                    (
                      doc.state ===
                        "uploaded" ||
                      doc.state ===
                        "scanning" ||
                      doc.state ===
                        "extracting"
                    );

                  const isExpanded =
                    expanded ===
                    doc.name;

                  return (
                    <article
                      key={doc.name}
                      className={cn(
                        "bu-doc-card glass card-edge group relative overflow-hidden rounded-2xl p-4 sm:p-6",
                        isExpanded &&
                          "bu-doc-card-expanded",
                        isProcessing &&
                          "bu-doc-card-processing",
                      )}
                      style={{
                        animationDelay:
                          `${index * 90}ms`,
                      }}
                    >

                      {/* Decorative orb */}

                      <div
                        className={cn(
                          "bu-doc-card-orb pointer-events-none absolute -right-16 -top-16 size-36 rounded-full blur-3xl",
                          doc.state ===
                            "verified"
                            ? "bg-mint/[0.05]"
                            : doc.state ===
                                "review"
                              ? "bg-gold/[0.05]"
                              : doc.state ===
                                    "scanning" ||
                                  doc.state ===
                                    "extracting"
                                ? "bg-violet/[0.05]"
                                : "bg-transparent",
                        )}
                      />

                      <div className="relative">

                        {/* CARD HEADER */}

                        <div className="flex items-start gap-3">

                          <div
                            className={cn(
                              "bu-doc-file-icon flex size-10 shrink-0 items-center justify-center rounded-xl sm:size-11",
                              doc.state ===
                                "verified"
                                ? "bg-mint/12 text-mint"
                                : doc.state ===
                                    "review"
                                  ? "bg-gold/12 text-gold"
                                  : doc.state ===
                                        "scanning" ||
                                      doc.state ===
                                        "extracting"
                                    ? "bg-violet/12 text-violet"
                                    : "bg-surface-2 text-muted-foreground",
                            )}
                          >

                            {doc.state ===
                            "verified" ? (
                              <CheckCircle2 className="size-5" />
                            ) : doc.state ===
                                  "scanning" ||
                                doc.state ===
                                  "extracting" ? (
                              <ScanLine className="size-5" />
                            ) : (
                              <FileText className="size-5" />
                            )}

                          </div>

                          <div className="min-w-0 flex-1">

                            <div className="flex items-start justify-between gap-2">

                              <div className="min-w-0">

                                <h3 className="truncate text-[13.5px] font-semibold text-foreground sm:text-[15.5px]">
                                  {doc.name}
                                </h3>

                                <p className="mt-0.5 truncate text-[9.5px] text-muted-foreground sm:text-xs">

                                  {doc.state ===
                                  "missing"
                                    ? "Required for profile verification"
                                    : doc.fileName ||
                                      `${doc.size || "Document"} · Uploaded ${
                                        doc.uploaded ||
                                        "today"
                                      }`}

                                </p>

                              </div>

                              <span className="shrink-0 rounded-full bg-gold/10 px-2 py-1 text-[8px] font-semibold text-gold sm:px-2.5 sm:text-[10px]">
                                {doc.category}
                              </span>

                            </div>

                          </div>
                        </div>

                        {/* STATUS */}

                        <div className="mt-3 flex flex-wrap items-center gap-1.5 sm:mt-4 sm:gap-2">

                          <span
                            className={cn(
                              "flex items-center gap-1 rounded-md px-2 py-1.5 text-[9px] font-semibold sm:px-2.5 sm:text-[11px]",
                              statusClass(
                                doc.state,
                              ),
                            )}
                          >
                            {statusIcon(
                              doc.state,
                            )}

                            {statusLabel(
                              doc.state,
                            )}
                          </span>

                          {doc.state ===
                          "verified" ? (
                            <span className="flex items-center gap-1 rounded-md bg-violet/12 px-2 py-1.5 text-[9px] font-semibold text-violet sm:px-2.5 sm:text-[11px]">
                              <ScanLine className="size-3" />
                              OCR Done
                            </span>
                          ) : null}

                          {doc.state ===
                          "review" ? (
                            <span className="flex items-center gap-1 rounded-md bg-gold/10 px-2 py-1.5 text-[9px] font-semibold text-gold sm:px-2.5 sm:text-[11px]">
                              <AlertCircle className="size-3" />
                              Review required
                            </span>
                          ) : null}

                        </div>

                        {/* PROCESSING */}

                        {isProcessing ? (
                          <div className="bu-doc-processing mt-4 rounded-xl border border-violet/15 bg-violet/5 p-3.5 sm:mt-5 sm:p-4">

                            <div className="flex items-center gap-3">

                              <div className="bu-doc-spinner flex size-7 shrink-0 items-center justify-center rounded-full bg-violet/10">

                                <div className="size-3.5 animate-spin rounded-full border-2 border-violet/20 border-t-violet" />

                              </div>

                              <div className="min-w-0">

                                <p className="text-[10.5px] font-semibold text-foreground sm:text-xs">

                                  {doc.state ===
                                  "uploaded"
                                    ? "Preparing document..."
                                    : doc.state ===
                                        "scanning"
                                      ? "Scanning document..."
                                      : "AI extracting information..."}

                                </p>

                                <p className="mt-0.5 text-[9px] text-muted-foreground sm:text-[11px]">
                                  Securely processing your
                                  document.
                                </p>

                              </div>
                            </div>

                            <div className="bu-doc-processing-bar mt-3 h-1 overflow-hidden rounded-full bg-surface-2">
                              <div className="h-full w-2/3 rounded-full bg-violet" />
                            </div>

                          </div>
                        ) : null}

                        {/* MISSING */}

                        {doc.state ===
                        "missing" ? (
                          <button
                            type="button"
                            onClick={() =>
                              startUpload(
                                doc.name,
                              )
                            }
                            className="bu-doc-upload mt-4 flex w-full items-center justify-center gap-2 rounded-xl border border-dashed border-gold/30 bg-gold/5 px-3 py-3 text-[10.5px] font-semibold text-gold sm:mt-5 sm:px-4 sm:py-3.5 sm:text-[13px]"
                          >
                            <Upload className="size-3.5 sm:size-4" />

                            Upload Document

                            <ArrowRight className="bu-doc-upload-arrow size-3.5" />
                          </button>
                        ) : null}

                        {/* ACTIONS */}

                        {doc.state !==
                          "missing" &&
                        !isProcessing ? (
                          <div className="mt-3 flex flex-wrap gap-1.5 sm:mt-4 sm:gap-2">

                            <button
                              type="button"
                              onClick={() =>
                                setExpanded(
                                  isExpanded
                                    ? null
                                    : doc.name,
                                )
                              }
                              className="bu-doc-small-button flex items-center gap-1.5 rounded-lg border border-border bg-surface-2/50 px-2.5 py-2 text-[9px] font-medium text-muted-foreground sm:px-3 sm:text-[12px]"
                            >

                              {isExpanded ? (
                                <ChevronUp className="size-3" />
                              ) : (
                                <Eye className="size-3" />
                              )}

                              {isExpanded
                                ? "Hide"
                                : "Review"}

                            </button>

                            <button
                              type="button"
                              className="bu-doc-small-button flex items-center gap-1.5 rounded-lg border border-border bg-surface-2/50 px-2.5 py-2 text-[9px] font-medium text-muted-foreground sm:px-3 sm:text-[12px]"
                            >
                              <Download className="size-3" />
                              Download
                            </button>

                            <button
                              type="button"
                              onClick={() =>
                                startUpload(
                                  doc.name,
                                )
                              }
                              className="bu-doc-small-button flex items-center gap-1.5 rounded-lg border border-border bg-surface-2/50 px-2.5 py-2 text-[9px] font-medium text-muted-foreground sm:px-3 sm:text-[12px]"
                            >
                              <Upload className="size-3" />
                              Replace
                            </button>

                          </div>
                        ) : null}

                        {/* =================================================
                            EXTRACTION REVIEW
                        ================================================= */}

                        {isExpanded &&
                        doc.extracted ? (
                          <div className="bu-doc-extraction mt-4 overflow-hidden rounded-xl border border-gold/20 bg-background/60 sm:mt-5 sm:rounded-2xl">

                            <div className="border-b border-border/60 bg-gold/5 p-3.5 sm:p-4">

                              <div className="flex items-start gap-2.5 sm:gap-3">

                                <div className="bu-doc-ai-icon flex size-8 shrink-0 items-center justify-center rounded-lg bg-gold/10 sm:size-9 sm:rounded-xl">
                                  <Sparkles className="size-3.5 text-gold sm:size-4" />
                                </div>

                                <div>

                                  <p className="text-xs font-bold text-foreground sm:text-sm">
                                    Information extracted
                                  </p>

                                  <p className="mt-0.5 text-[9px] leading-4 text-muted-foreground sm:mt-1 sm:text-[11px] sm:leading-5">
                                    Review the extracted information
                                    before confirming it.
                                  </p>

                                </div>
                              </div>
                            </div>

                            <div className="divide-y divide-border/50">

                              {doc.extracted.map(
                                (
                                  field,
                                  fieldIndex,
                                ) => (
                                  <div
                                    key={
                                      field.label
                                    }
                                    className="bu-doc-field grid gap-1 px-3.5 py-2.5 sm:grid-cols-[140px_1fr] sm:px-4 sm:py-3"
                                    style={{
                                      animationDelay:
                                        `${fieldIndex * 45}ms`,
                                    }}
                                  >

                                    <span className="text-[9px] text-muted-foreground sm:text-[11px]">
                                      {field.label}
                                    </span>

                                    <span className="break-words text-[10.5px] font-semibold text-foreground sm:text-[12.5px]">
                                      {field.value}
                                    </span>

                                  </div>
                                ),
                              )}

                            </div>

                            <div className="flex flex-col gap-2 border-t border-border/50 p-3 sm:flex-row sm:p-4">

                              <button
                                type="button"
                                onClick={() =>
                                  confirmExtraction(
                                    doc,
                                  )
                                }
                                className="bu-doc-confirm flex flex-1 items-center justify-center gap-2 rounded-xl bg-gradient-gold px-4 py-2.5 text-[10.5px] font-bold text-primary-foreground shadow-gold sm:py-3 sm:text-[12.5px]"
                              >
                                <Check className="size-3.5 sm:size-4" />
                                Confirm & Save
                              </button>

                              <button
                                type="button"
                                onClick={() =>
                                  setExpanded(
                                    null,
                                  )
                                }
                                className="bu-doc-review-button flex items-center justify-center gap-2 rounded-xl border border-border px-4 py-2.5 text-[10.5px] font-semibold text-muted-foreground sm:py-3 sm:text-[12.5px]"
                              >
                                <X className="size-3.5 sm:size-4" />
                                Review Later
                              </button>

                            </div>

                          </div>
                        ) : null}

                      </div>
                    </article>
                  );
                },
              )}

            </section>

            {/* =================================================
                PROFILE BUILDER
            ================================================= */}

            <section className="bu-doc-builder glass card-edge mt-5 overflow-hidden rounded-2xl p-4 sm:mt-7 sm:p-6">

              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-5">

                <div className="bu-doc-builder-icon flex size-11 shrink-0 items-center justify-center rounded-xl bg-gold/10 text-gold sm:size-12">
                  <Sparkles className="size-4.5 sm:size-5" />
                </div>

                <div className="min-w-0 flex-1">

                  <p className="text-xs font-bold text-foreground sm:text-sm">
                    AI Profile Builder
                  </p>

                  <p className="mt-1 text-[10px] leading-5 text-muted-foreground sm:text-xs">
                    Your confirmed documents automatically build
                    your personal, business and financial profile.
                  </p>

                </div>

                <button
                  type="button"
                  onClick={() =>
                    setTab(
                      "profile",
                    )
                  }
                  className="bu-doc-builder-button flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-gold px-4 py-2.5 text-[10.5px] font-bold text-primary-foreground shadow-gold sm:w-auto sm:px-5 sm:py-3 sm:text-xs"
                >
                  View Generated Profile
                  <ArrowRight className="size-3.5 sm:size-4" />
                </button>

              </div>

            </section>
          </>
        ) : null}

        {/* =====================================================
            PROFILE TAB
        ===================================================== */}

        {tab ===
        "profile"
          ? renderProfile()
          : null}

        {/* =====================================================
            BUSINESS TAB
        ===================================================== */}

        {tab ===
        "business"
          ? renderBusiness()
          : null}

      </main>
    </AppShell>
  );
}

/* =========================================================
   MINI STAT
========================================================= */

function MiniStat({
  label,
  value,
  icon,
  tone,
}: {
  label: string;
  value: number;
  icon: ReactNode;
  tone:
    | "gold"
    | "mint"
    | "neutral";
}) {
  return (
    <div
      className={cn(
        "bu-doc-mini-stat flex items-center gap-2 rounded-xl border border-border/60 bg-surface-2/30 px-2.5 py-2 sm:px-3 sm:py-2.5",
        tone ===
          "gold" &&
          "text-gold",
        tone ===
          "mint" &&
          "text-mint",
        tone ===
          "neutral" &&
          "text-muted-foreground",
      )}
    >
      <span className="flex size-6 shrink-0 items-center justify-center rounded-lg bg-current/10 sm:size-7">
        {icon}
      </span>

      <div className="min-w-0">

        <p className="text-[12px] font-bold leading-none sm:text-sm">
          {value}
        </p>

        <p className="mt-0.5 truncate text-[8px] text-muted-foreground sm:text-[9px]">
          {label}
        </p>

      </div>
    </div>
  );
}

/* =========================================================
   PROFILE SECTION
========================================================= */

function ProfileSection({
  icon,
  title,
  fields,
}: {
  icon: ReactNode;
  title: string;
  fields: [string, string][];
}) {
  return (
    <div className="bu-doc-profile-section bu-doc-animate glass card-edge overflow-hidden">

      <div className="flex items-center gap-3 border-b border-border/60 px-4 py-4 sm:px-6 sm:py-5">

        <span className="bu-doc-section-icon flex size-8 items-center justify-center rounded-xl bg-gold/10 sm:size-9">
          {icon}
        </span>

        <h2 className="text-sm font-bold text-foreground sm:text-[16px]">
          {title}
        </h2>

      </div>

      <div className="grid sm:grid-cols-2">

        {fields.map(
          (
            [label, value],
            index,
          ) => (
            <div
              key={label}
              className="bu-doc-profile-field border-b border-border/50 px-4 py-3.5 sm:px-6 sm:py-4"
              style={{
                animationDelay:
                  `${index * 60}ms`,
              }}
            >

              <p className="text-[9px] font-medium text-muted-foreground sm:text-[10.5px]">
                {label}
              </p>

              <p className="mt-1 break-words text-[11.5px] font-semibold text-foreground sm:text-[13.5px]">
                {value}
              </p>

            </div>
          ),
        )}

      </div>
    </div>
  );
}

/* =========================================================
   EDITABLE PROFILE SECTION
========================================================= */

function EditableProfileSection({
  icon,
  title,
  editing,
  children,
}: {
  icon: ReactNode;
  title: string;
  editing: boolean;
  children: ReactNode;
}) {
  return (
    <div className="bu-doc-profile-section bu-doc-animate glass card-edge overflow-hidden">

      <div className="flex items-center justify-between gap-3 border-b border-border/60 px-4 py-4 sm:px-6 sm:py-5">

        <div className="flex items-center gap-3">

          <span className="bu-doc-section-icon flex size-8 items-center justify-center rounded-xl bg-gold/10 sm:size-9">
            {icon}
          </span>

          <h2 className="text-sm font-bold text-foreground sm:text-[16px]">
            {title}
          </h2>

        </div>

        {editing ? (
          <span className="flex items-center gap-1.5 rounded-full bg-gold/10 px-2.5 py-1 text-[9px] font-semibold text-gold sm:text-[10px]">
            <Pencil className="size-3" />
            Editing
          </span>
        ) : null}

      </div>

      <div className="p-4 sm:p-6">
        {children}
      </div>
    </div>
  );
}

/* =========================================================
   EDITABLE FIELD
========================================================= */

function EditableField({
  label,
  value,
  editing,
  type = "text",
  onChange,
}: {
  label: string;
  value: string;
  editing: boolean;
  type?: string;
  onChange: (
    value: string,
  ) => void;
}) {
  return (
    <div className="bu-doc-edit-field rounded-xl border border-border/60 bg-surface-2/20 p-3.5 transition-all duration-300 hover:border-gold/20 sm:p-4">

      <p className="text-[9px] font-semibold uppercase tracking-[0.1em] text-muted-foreground sm:text-[10px]">
        {label}
      </p>

      {editing ? (
        <input
          type={type}
          value={value}
          onChange={(event) =>
            onChange(
              event.target.value,
            )
          }
          className="bu-doc-input mt-2 w-full rounded-lg border border-input bg-background/60 px-3 py-2.5 text-xs text-foreground outline-none transition-all duration-200 placeholder:text-muted-foreground/50 focus:border-gold/60 focus:ring-2 focus:ring-gold/10 sm:text-sm"
          placeholder={`Enter ${label.toLowerCase()}`}
        />
      ) : (
        <p className="mt-2 break-words text-xs font-semibold text-foreground sm:text-sm">
          {value || (
            <span className="font-normal text-muted-foreground/60">
              Not provided
            </span>
          )}
        </p>
      )}

    </div>
  );
}

/* =========================================================
   INITIALS
========================================================= */

function getInitials(
  name: string,
) {
  const words =
    name
      .trim()
      .split(/\s+/)
      .filter(Boolean);

  if (
    words.length ===
    0
  ) {
    return "U";
  }

  if (
    words.length ===
    1
  ) {
    return words[0]
      .slice(0, 2)
      .toUpperCase();
  }

  return `${words[0][0]}${
    words[words.length - 1][0]
  }`.toUpperCase();
}