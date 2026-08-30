export type HealthMetric = {
  label: string;
  verdict: string;
  score: number;
  delta: number;
  color: string;
};


export const healthMetrics: HealthMetric[] = [
  { label: "Financial Stability", verdict: "Excellent", score: 82, delta: 4, color: "var(--gold)" },
  { label: "Credit Readiness", verdict: "Good", score: 74, delta: 8, color: "var(--cyan)" },
  { label: "Liquidity", verdict: "Moderate", score: 68, delta: -2, color: "var(--violet)" },
  { label: "Profitability", verdict: "Excellent", score: 89, delta: 12, color: "var(--mint)" },
  { label: "Growth", verdict: "Good", score: 77, delta: 6, color: "var(--gold-soft)" },
  { label: "Leverage", verdict: "Moderate", score: 63, delta: -1, color: "var(--destructive)" },
];

export const overallScore = 75;

export type Recommendation = {
  code: string;
  name: string;
  tag: "Highly Eligible" | "Eligible";
  match: number;
  amount: string;
};

export const recommendations: Recommendation[] = [
  {
    code: "PMEGP",
    name: "Prime Minister Employment Generation Programme",
    tag: "Highly Eligible",
    match: 94,
    amount: "₹15–25L",
  },
  {
    code: "CGTMSE",
    name: "Credit Guarantee Scheme for MSMEs",
    tag: "Eligible",
    match: 87,
    amount: "Up to ₹5Cr",
  },
  {
    code: "ZED Certification",
    name: "Zero Defect Zero Effect Scheme",
    tag: "Highly Eligible",
    match: 91,
    amount: "80% subsidy",
  },
];

export type AppStatus = "Approved" | "Under Review" | "Pending Documents";

export const applications: {
  code: string;
  name: string;
  id: string;
  applied: string;
  status: AppStatus;
  step: number;
  subsidy: string;
}[] = [
  {
    code: "PMEGP",
    name: "Prime Minister Employment Generation Programme",
    id: "APP-2024-001",
    applied: "2024-04-15",
    status: "Approved",
    step: 4,
    subsidy: "₹20L",
  },
  {
    code: "CGTMSE",
    name: "Credit Guarantee Scheme for MSMEs",
    id: "APP-2024-002",
    applied: "2024-05-10",
    status: "Under Review",
    step: 2,
    subsidy: "Up to ₹5Cr",
  },
  {
    code: "ZED",
    name: "Zero Defect Zero Effect Certification",
    id: "APP-2024-003",
    applied: "2024-05-15",
    status: "Pending Documents",
    step: 1,
    subsidy: "80% cost",
  },
];

export const newSchemes = [
  {
    name: "PM Vishwakarma Yojana",
    ministry: "Ministry of MSME",
    date: "Jan 2025",
    category: "Skill Development",
    badge: "New",
  },
  {
    name: "RAMP Scheme",
    ministry: "Ministry of Finance",
    date: "Mar 2025",
    category: "Competitiveness",
    badge: "New",
  },
  {
    name: "SFURTI 2.0",
    ministry: "Ministry of MSME",
    date: "Feb 2025",
    category: "Cluster Development",
    badge: "Updated",
  },
  {
    name: "Digital Commerce for MSMEs",
    ministry: "DPIIT",
    date: "Apr 2025",
    category: "E-Commerce",
    badge: "New",
  },
] as const;

export type NotificationKind = "success" | "info" | "doc" | "warning" | "trend";

export const notifications: {
  title: string;
  body: string;
  time: string;
  kind: NotificationKind;
  unread: boolean;
}[] = [
  {
    title: "Application Approved",
    body: "Your CGTMSE application has been approved. Disbursement will begin shortly.",
    time: "2 hours ago",
    kind: "success",
    unread: true,
  },
  {
    title: "New Scheme Available",
    body: "Digital MSME Scheme is now accepting applications. You are highly eligible.",
    time: "5 hours ago",
    kind: "info",
    unread: true,
  },
  {
    title: "Document Verified",
    body: "Your Udyam Certificate has been successfully verified.",
    time: "1 day ago",
    kind: "doc",
    unread: false,
  },
  {
    title: "Pending Documents",
    body: "ZED Certification requires 2 additional documents. Upload now to avoid delays.",
    time: "1 day ago",
    kind: "warning",
    unread: false,
  },
  {
    title: "Eligibility Update",
    body: "Your eligibility score increased to 94% after profile update.",
    time: "2 days ago",
    kind: "trend",
    unread: false,
  },
  {
    title: "Profile Verified",
    body: "Your business profile has been verified successfully.",
    time: "3 days ago",
    kind: "success",
    unread: false,
  },
  {
    title: "Application Status Update",
    body: "PMEGP application moved to final review stage.",
    time: "4 days ago",
    kind: "info",
    unread: false,
  },
  {
    title: "Application Deadline",
    body: "CLCS-TUS scheme application deadline in 7 days.",
    time: "5 days ago",
    kind: "warning",
    unread: false,
  },
];

export type DocState = "verified" | "review" | "missing";

export const documents: {
  name: string;
  category: "Identity" | "Business" | "Financial";
  size?: string;
  uploaded?: string;
  state: DocState;
}[] = [
  {
    name: "Aadhaar Card",
    category: "Identity",
    size: "1.2 MB",
    uploaded: "2024-04-10",
    state: "verified",
  },
  {
    name: "PAN Card",
    category: "Identity",
    size: "0.8 MB",
    uploaded: "2024-04-10",
    state: "verified",
  },
  {
    name: "GST Certificate",
    category: "Business",
    size: "2.1 MB",
    uploaded: "2024-04-11",
    state: "verified",
  },
  {
    name: "Udyam Certificate",
    category: "Business",
    size: "1.5 MB",
    uploaded: "2024-04-11",
    state: "verified",
  },
  {
    name: "Balance Sheet",
    category: "Financial",
    size: "3.4 MB",
    uploaded: "2024-04-12",
    state: "review",
  },
  { name: "Bank Statements", category: "Financial", state: "missing" },
  { name: "ITR", category: "Financial", state: "missing" },
];

export const allSchemes = [
  {
    code: "PMEGP",
    name: "Prime Minister Employment Generation Programme",
    category: "Manufacturing",
    subsidy: "15–35%",
    max: "₹25L",
    eligibility: "New/Existing MSME",
  },
  {
    code: "CGTMSE",
    name: "Credit Guarantee Trust for Micro and Small Enterprises",
    category: "Finance",
    subsidy: "Credit Guarantee",
    max: "₹5Cr",
    eligibility: "MSMEs seeking loans",
  },
  {
    code: "ZED Certification",
    name: "Zero Defect Zero Effect",
    category: "Quality",
    subsidy: "80%",
    max: "Up to ₹10L",
    eligibility: "Manufacturing MSMEs",
  },
  {
    code: "CLCS-TUS",
    name: "Credit Linked Capital Subsidy for Technology Upgradation",
    category: "Technology",
    subsidy: "15%",
    max: "₹1Cr",
    eligibility: "Manufacturing MSMEs",
  },
  {
    code: "Lean Manufacturing",
    name: "Lean Manufacturing Competitiveness Scheme",
    category: "Manufacturing",
    subsidy: "90%",
    max: "Up to ₹7L",
    eligibility: "Manufacturing MSMEs",
  },
  {
    code: "Digital MSME",
    name: "Digital MSME Scheme",
    category: "Technology",
    subsidy: "50%",
    max: "₹2L",
    eligibility: "All MSMEs",
  },
  {
    code: "Marketing Assistance",
    name: "Marketing Assistance Scheme",
    category: "Marketing",
    subsidy: "75%",
    max: "₹5L",
    eligibility: "All MSMEs",
  },
  {
    code: "IPR Scheme",
    name: "Intellectual Property Rights Scheme",
    category: "Innovation",
    subsidy: "50%",
    max: "₹10L",
    eligibility: "Innovative MSMEs",
  },
] as const;

export const schemeCategories = [
  "All",
  "Manufacturing",
  "Finance",
  "Quality",
  "Technology",
  "Marketing",
  "Innovation",
] as const;