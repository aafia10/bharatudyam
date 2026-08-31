import { Link, createFileRoute } from "@tanstack/react-router";
import {
  ArrowLeft,
  ArrowRight,
  BadgeCheck,
  Building2,
  Check,
  CheckCircle2,
  CircleHelp,
  Download,
  FileCheck2,
  FileText,
  Filter,
  IndianRupee,
  MapPin,
  Search,
  ShieldCheck,
  Sparkles,
  Upload,
  X,
  type LucideIcon,
} from "lucide-react";
import { useMemo, useState, type ReactNode } from "react";


import { AppShell } from "@/components/app/AppShell";
import { useAuthGuard } from "@/hooks/use-auth-guard";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/dashboard-schemes")({
  head: () => ({
    meta: [
      { title: "Schemes — Bharat Udyam" },
      {
        name: "description",
        content:
          "Discover Central and State government schemes and incentives matched to your MSME profile.",
      },
    ],
  }),
  component: SchemesPage,
});

type Scheme = {
  id: string;
  name: string;
  shortName: string;
  ministry: string;
  category: "Credit" | "Subsidy" | "Technology" | "Market" | "Growth";
  states: string[];
  sectors: string[];
  businessTypes: string[];
  stage: "New" | "Existing" | "Both";
  womenFriendly?: boolean;
  scStFriendly?: boolean;
  exporter?: boolean;
  ruralFriendly?: boolean;
  benefit: string;
  amount: string;
  description: string;
  whyMatch: string[];
  documents: string[];
  questions: string[];
  source: string;
  officialUrl: string;
};

const BUSINESS_TYPES = [
  "Proprietorship",
  "Partnership",
  "Private Limited",
  "LLP",
];

const STATES = [
  "All States",
  "Maharashtra",
  "Gujarat",
  "Karnataka",
  "Tamil Nadu",
  "Telangana",
  "Uttar Pradesh",
];

const SECTORS = ["Manufacturing", "Service"];

const CATEGORIES = [
  "All",
  "Credit",
  "Subsidy",
  "Technology",
  "Market",
  "Growth",
];

const central = (x: Omit<Scheme, "states">): Scheme => ({
  ...x,
  states: ["All India"],
});

const stateScheme = (
  state: string,
  x: Omit<Scheme, "states">,
): Scheme => ({
  ...x,
  states: [state],
});

const SCHEMES: Scheme[] = [
  /* ---------------------------------------------------------------------- */
  /* CENTRAL SCHEMES                                                        */
  /* ---------------------------------------------------------------------- */

  central({
    id: "pmegp",
    name: "Prime Minister's Employment Generation Programme",
    shortName: "PMEGP",
    ministry: "Government of India · Ministry of MSME",
    category: "Subsidy",
    sectors: ["Manufacturing", "Service"],
    businessTypes: BUSINESS_TYPES,
    stage: "New",
    womenFriendly: true,
    ruralFriendly: true,
    benefit:
      "Credit-linked margin money subsidy for eligible new micro enterprises.",
    amount: "Project support varies by category and location.",
    description:
      "Supports eligible new micro enterprises in the non-farm sector through bank-linked finance and margin money subsidy.",
    whyMatch: [
      "Useful for setting up a new enterprise",
      "Available across India",
      "Manufacturing and service activities can qualify",
    ],
    documents: [
      "PAN",
      "Aadhaar",
      "Udyam certificate",
      "Project report",
      "Bank details",
    ],
    questions: [
      "Is this a new business or project?",
      "Do you have a project report?",
      "Have you already received a subsidy for this project?",
    ],
    source: "Government of India · PMEGP",
    officialUrl: "https://pmegp.msme.gov.in/",
  }),

  central({
    id: "cgtmse",
    name: "Credit Guarantee Scheme for Micro & Small Enterprises",
    shortName: "CGTMSE",
    ministry: "Government of India · CGTMSE",
    category: "Credit",
    sectors: ["Manufacturing", "Service"],
    businessTypes: BUSINESS_TYPES,
    stage: "Both",
    womenFriendly: true,
    benefit:
      "Credit guarantee support for eligible lending to micro and small enterprises.",
    amount:
      "Credit limits depend on the applicable scheme and lender.",
    description:
      "Provides guarantee support to eligible lending institutions for credit facilities extended to micro and small enterprises.",
    whyMatch: [
      "Useful when collateral is limited",
      "Relevant to new and existing MSEs",
      "Can support business finance through participating lenders",
    ],
    documents: [
      "Udyam certificate",
      "PAN",
      "GST certificate",
      "Bank statement",
      "Financial records",
    ],
    questions: [
      "Are you planning to seek business finance?",
      "Is the facility for working capital, term loan, or both?",
      "Do you have a valid Udyam registration?",
    ],
    source: "Government of India · CGTMSE",
    officialUrl: "https://www.cgtmse.in/",
  }),

  central({
    id: "mse-cdp",
    name: "Micro & Small Enterprises Cluster Development Programme",
    shortName: "MSE-CDP",
    ministry: "Government of India · Ministry of MSME",
    category: "Growth",
    sectors: ["Manufacturing"],
    businessTypes: BUSINESS_TYPES,
    stage: "Both",
    benefit:
      "Support for common facilities and cluster infrastructure.",
    amount: "Project-based assistance.",
    description:
      "Supports cluster development and common infrastructure that can improve the competitiveness of micro and small enterprises.",
    whyMatch: [
      "Designed for manufacturing clusters",
      "Useful where shared facilities are required",
      "Supports common infrastructure",
    ],
    documents: [
      "Udyam certificate",
      "PAN",
      "GST certificate",
      "Business proof",
      "Project proposal",
    ],
    questions: [
      "Are you part of an MSME cluster?",
      "Would a common facility benefit your enterprise?",
      "Is the proposed activity manufacturing?",
    ],
    source: "Government of India · Ministry of MSME",
    officialUrl: "https://msme.gov.in/",
  }),

  central({
    id: "pms",
    name: "Procurement and Marketing Support Scheme",
    shortName: "PMS",
    ministry: "Government of India · Ministry of MSME",
    category: "Market",
    sectors: ["Manufacturing", "Service"],
    businessTypes: BUSINESS_TYPES,
    stage: "Both",
    exporter: true,
    benefit:
      "Support for selected marketing, trade-fair and market-access activities.",
    amount: "Assistance varies by activity.",
    description:
      "Helps eligible MSEs improve market access, marketing capability and participation in selected activities.",
    whyMatch: [
      "Useful for businesses expanding their market",
      "Relevant to product-based MSMEs",
      "Can support market visibility",
    ],
    documents: [
      "Udyam certificate",
      "GST certificate",
      "PAN",
      "Business profile",
    ],
    questions: [
      "Are you planning a trade fair or buyer-seller activity?",
      "Do you have a valid Udyam registration?",
      "Are your business and GST details current?",
    ],
    source: "Government of India · Ministry of MSME",
    officialUrl: "https://msme.gov.in/",
  }),

  central({
    id: "ic",
    name: "International Cooperation Scheme",
    shortName: "IC Scheme",
    ministry: "Government of India · Ministry of MSME",
    category: "Market",
    sectors: ["Manufacturing", "Service"],
    businessTypes: BUSINESS_TYPES,
    stage: "Both",
    exporter: true,
    benefit:
      "Support for selected international market-access activities.",
    amount: "Activity-specific assistance.",
    description:
      "Supports eligible MSMEs participating in international cooperation and market-development activities.",
    whyMatch: [
      "Strong fit for exporters",
      "Useful for international market expansion",
      "Relevant to market-development activities",
    ],
    documents: [
      "Udyam certificate",
      "IEC, if applicable",
      "PAN",
      "GST certificate",
    ],
    questions: [
      "Is your business currently exporting?",
      "Do you have an IEC where required?",
      "Are you planning to enter a new international market?",
    ],
    source: "Government of India · Ministry of MSME",
    officialUrl: "https://msme.gov.in/",
  }),

  central({
    id: "nssh",
    name: "National SC-ST Hub",
    shortName: "NSSH",
    ministry: "Government of India · Ministry of MSME",
    category: "Growth",
    sectors: ["Manufacturing", "Service"],
    businessTypes: BUSINESS_TYPES,
    stage: "Both",
    scStFriendly: true,
    benefit:
      "Support and handholding for eligible SC/ST entrepreneurs.",
    amount: "Support varies by component.",
    description:
      "Promotes participation of SC/ST entrepreneurs in public procurement and entrepreneurship through handholding and capacity building.",
    whyMatch: [
      "Designed for eligible SC/ST entrepreneurs",
      "Useful for procurement readiness",
      "Can provide capacity-building support",
    ],
    documents: [
      "Udyam certificate",
      "PAN",
      "SC/ST certificate",
      "GST certificate",
    ],
    questions: [
      "Is the enterprise owned or promoted by an eligible SC/ST entrepreneur?",
      "Do you have a valid Udyam registration?",
      "Are you interested in government procurement?",
    ],
    source: "Government of India · Ministry of MSME",
    officialUrl: "https://msme.gov.in/",
  }),

  central({
    id: "zed",
    name: "MSME Sustainable (ZED) Certification",
    shortName: "ZED",
    ministry: "Government of India · Ministry of MSME",
    category: "Technology",
    sectors: ["Manufacturing"],
    businessTypes: BUSINESS_TYPES,
    stage: "Both",
    womenFriendly: true,
    benefit:
      "Support towards quality, sustainability and ZED certification activities.",
    amount: "Certification support varies.",
    description:
      "Encourages MSMEs to adopt zero-defect and zero-effect practices and improve quality and sustainability.",
    whyMatch: [
      "Strong manufacturing fit",
      "Improves quality and process maturity",
      "Useful for sustainability-focused businesses",
    ],
    documents: [
      "Udyam certificate",
      "GST certificate",
      "PAN",
      "Business profile",
    ],
    questions: [
      "Is your enterprise currently manufacturing products?",
      "Do you have a valid Udyam registration?",
      "Are you willing to undertake certification activities?",
    ],
    source: "Government of India · Ministry of MSME",
    officialUrl: "https://msme.gov.in/",
  }),

  central({
    id: "lean",
    name: "MSME Competitive (Lean) Scheme",
    shortName: "Lean",
    ministry: "Government of India · Ministry of MSME",
    category: "Technology",
    sectors: ["Manufacturing"],
    businessTypes: BUSINESS_TYPES,
    stage: "Both",
    benefit:
      "Support for lean manufacturing practices and process improvement.",
    amount: "Assistance varies by applicable intervention.",
    description:
      "Encourages MSMEs to reduce waste, improve quality and increase productivity through lean practices.",
    whyMatch: [
      "Manufacturing-first programme",
      "Useful for improving operational efficiency",
      "Relevant to businesses scaling production",
    ],
    documents: [
      "Udyam certificate",
      "PAN",
      "GST certificate",
      "Business profile",
    ],
    questions: [
      "Do you operate a manufacturing unit?",
      "Are you looking to improve productivity or reduce process waste?",
      "Do you have a valid Udyam registration?",
    ],
    source: "Government of India · Ministry of MSME",
    officialUrl: "https://msme.gov.in/",
  }),

  central({
    id: "design",
    name: "Design Clinic Scheme",
    shortName: "Design Clinic",
    ministry: "Government of India · Ministry of MSME",
    category: "Technology",
    sectors: ["Manufacturing"],
    businessTypes: BUSINESS_TYPES,
    stage: "Both",
    benefit:
      "Support for design improvement and professional design intervention.",
    amount: "Activity-specific assistance.",
    description:
      "Helps MSMEs improve products and processes through design expertise and interventions.",
    whyMatch: [
      "Useful for product manufacturers",
      "Supports product and packaging improvement",
      "Can help businesses become more market-ready",
    ],
    documents: [
      "Udyam certificate",
      "PAN",
      "Product photographs",
      "Business profile",
    ],
    questions: [
      "Does your business manufacture a physical product?",
      "Do you need product, packaging or process design support?",
      "Do you have a valid Udyam registration?",
    ],
    source: "Government of India · Ministry of MSME",
    officialUrl: "https://msme.gov.in/",
  }),

  central({
    id: "startup-india",
    name: "Startup India — Startup Support",
    shortName: "Startup India",
    ministry: "DPIIT · Government of India",
    category: "Growth",
    sectors: ["Manufacturing", "Service"],
    businessTypes: ["Private Limited", "LLP", "Partnership"],
    stage: "New",
    benefit:
      "Startup recognition and access to eligible ecosystem benefits.",
    amount:
      "Benefit depends on eligibility and programme.",
    description:
      "A startup ecosystem programme relevant to eligible innovation-led businesses seeking recognition and ecosystem support.",
    whyMatch: [
      "Relevant to innovation-led startups",
      "Useful for formal startup recognition",
      "Can unlock ecosystem opportunities",
    ],
    documents: [
      "PAN",
      "Incorporation certificate",
      "Business plan",
    ],
    questions: [
      "Is the business incorporated as an eligible startup entity?",
      "Is the business innovation or improvement driven?",
      "Is it within the applicable recognition period?",
    ],
    source: "DPIIT · Startup India",
    officialUrl: "https://www.startupindia.gov.in/",
  }),

  /* ---------------------------------------------------------------------- */
  /* MAHARASHTRA                                                           */
  /* ---------------------------------------------------------------------- */

  stateScheme("Maharashtra", {
    id: "mh-cmegp",
    name: "Chief Minister Employment Generation Programme",
    shortName: "CMEGP",
    ministry: "Government of Maharashtra · Industries Department",
    category: "Subsidy",
    sectors: ["Manufacturing", "Service"],
    businessTypes: BUSINESS_TYPES,
    stage: "New",
    womenFriendly: true,
    ruralFriendly: true,
    benefit:
      "Margin money subsidy and loan assistance for new micro and small enterprises.",
    amount:
      "Up to 35% margin money subsidy; loan assistance up to ₹50 lakh for manufacturing and ₹10 lakh for services.",
    description:
      "Supports new micro and small enterprises in Maharashtra with credit-linked assistance, encouraging self-employment and job creation in urban and rural areas.",
    whyMatch: [
      "Specific to Maharashtra",
      "Strong fit for a new enterprise",
      "Supports manufacturing and service businesses",
    ],
    documents: [
      "PAN",
      "Aadhaar",
      "Udyam certificate",
      "Project report",
      "Bank documents",
    ],
    questions: [
      "Is this a new enterprise in Maharashtra?",
      "Is the proposed activity manufacturing or service?",
      "Do you have a project report?",
    ],
    source: "MSME Council · Maharashtra state-scheme reference",
    officialUrl:
      "https://msmecouncil.org/schemes-and-incentives/state-schemes/schemes-and-initiatives-by-maharashtra-government/chief-minister-employment-generation-programme-cmegp/",
  }),

  stateScheme("Maharashtra", {
    id: "mh-loan",
    name: "Maha MSME Project Loan Scheme",
    shortName: "Maha MSME Project Loan",
    ministry: "Government of Maharashtra",
    category: "Credit",
    sectors: ["Manufacturing", "Service"],
    businessTypes: BUSINESS_TYPES,
    stage: "Both",
    benefit:
      "Term-loan support for establishing new projects and expanding existing MSMEs.",
    amount:
      "Loan support is project- and eligibility-dependent.",
    description:
      "A Maharashtra MSME financing option intended for establishment of new projects and expansion of existing units.",
    whyMatch: [
      "Specific to Maharashtra",
      "Useful for establishment or expansion",
      "Relevant to project finance requirements",
    ],
    documents: [
      "Udyam certificate",
      "PAN",
      "GST certificate",
      "Project report",
      "Financial documents",
    ],
    questions: [
      "Is the project located in Maharashtra?",
      "Is the finance for a new project or expansion?",
      "Are your registrations current?",
    ],
    source: "MSME Council · Maharashtra state-scheme reference",
    officialUrl:
      "https://msmecouncil.org/schemes-and-incentives/state-schemes/schemes-and-initiatives-by-maharashtra-government/",
  }),

  stateScheme("Maharashtra", {
    id: "mh-machinery",
    name: "Maha MSME Machinery & Equipment Scheme",
    shortName: "Maha Machinery",
    ministry: "Government of Maharashtra",
    category: "Technology",
    sectors: ["Manufacturing"],
    businessTypes: BUSINESS_TYPES,
    stage: "Both",
    benefit:
      "Financial support for purchasing new machinery and upgrading existing equipment.",
    amount:
      "Loan and assistance limits depend on applicable scheme conditions.",
    description:
      "Helps Maharashtra MSMEs modernise machinery, automate operations and improve production efficiency.",
    whyMatch: [
      "Strong manufacturing fit",
      "Useful for plant and machinery upgrades",
      "Supports productivity and modernisation",
    ],
    documents: [
      "Udyam certificate",
      "PAN",
      "GST certificate",
      "Machinery quotation",
      "Investment proof",
    ],
    questions: [
      "Are you planning to purchase or upgrade machinery?",
      "Is the unit located in Maharashtra?",
      "Is the machinery related to eligible business activity?",
    ],
    source: "MSME Council · Maharashtra state-scheme reference",
    officialUrl:
      "https://msmecouncil.org/schemes-and-incentives/state-schemes/schemes-and-initiatives-by-maharashtra-government/maha-msme-machinery-equipment-scheme/",
  }),

  stateScheme("Maharashtra", {
    id: "mh-msicdp",
    name: "Maharashtra State Industrial Cluster Development Programme",
    shortName: "MSI-CDP",
    ministry: "Government of Maharashtra",
    category: "Growth",
    sectors: ["Manufacturing"],
    businessTypes: BUSINESS_TYPES,
    stage: "Both",
    benefit:
      "Cluster-level support for common facilities and shared industrial infrastructure.",
    amount: "Project and cluster based assistance.",
    description:
      "Supports testing labs, training centres, marketplaces and other common facilities that improve MSME cluster competitiveness.",
    whyMatch: [
      "Strong fit for cluster-based manufacturers",
      "Useful where common facilities are needed",
      "Supports shared infrastructure",
    ],
    documents: [
      "Udyam certificate",
      "PAN",
      "GST certificate",
      "Cluster proposal",
      "Business proof",
    ],
    questions: [
      "Are you part of an industrial or MSME cluster?",
      "Would a shared facility benefit your business?",
      "Is the proposed activity manufacturing?",
    ],
    source: "MSME Council · Maharashtra state-scheme reference",
    officialUrl:
      "https://msmecouncil.org/schemes-and-incentives/state-schemes/schemes-and-initiatives-by-maharashtra-government/",
  }),

  stateScheme("Maharashtra", {
    id: "mh-policy",
    name: "Subsidy & Incentive Scheme under Maharashtra Industrial Policy",
    shortName: "Maharashtra Industrial Policy",
    ministry: "Government of Maharashtra",
    category: "Subsidy",
    sectors: ["Manufacturing", "Service"],
    businessTypes: BUSINESS_TYPES,
    stage: "Both",
    womenFriendly: true,
    scStFriendly: true,
    ruralFriendly: true,
    benefit:
      "Fiscal incentives covering areas such as power, interest, stamp duty and eligible investment support.",
    amount:
      "Benefits vary by location, investment, sector and enterprise category.",
    description:
      "Provides fiscal incentives and subsidies to Maharashtra MSMEs to reduce operating costs, encourage investment and support regional development.",
    whyMatch: [
      "State-specific industrial incentives",
      "Relevant to investment and expansion",
      "Additional focus may apply to priority entrepreneur groups",
    ],
    documents: [
      "Udyam certificate",
      "GST certificate",
      "PAN",
      "Investment proof",
      "Land/lease documents",
    ],
    questions: [
      "Is the unit located in Maharashtra?",
      "Is the project investment eligible?",
      "Is the enterprise registered as required?",
    ],
    source: "MSME Council · Maharashtra state-scheme reference",
    officialUrl:
      "https://msmecouncil.org/schemes-and-incentives/state-schemes/schemes-and-initiatives-by-maharashtra-government/subsidy-incentive-scheme-under-maharashtra-industrial-policy/",
  }),

  /* ---------------------------------------------------------------------- */
  /* GUJARAT                                                               */
  /* ---------------------------------------------------------------------- */

  stateScheme("Gujarat", {
    id: "gj-policy",
    name: "Gujarat Industrial Policy 2020 — Updated for 2025",
    shortName: "Gujarat Industrial Policy",
    ministry: "Government of Gujarat",
    category: "Subsidy",
    sectors: ["Manufacturing", "Service"],
    businessTypes: BUSINESS_TYPES,
    stage: "Both",
    womenFriendly: true,
    benefit:
      "Investment, interest, technology, employment, export and green-industry incentives.",
    amount:
      "The source describes capital subsidy up to 30% for eligible new industrial units, subject to ceilings and conditions.",
    description:
      "The updated policy focuses on industrial growth, sustainable development, technological innovation, skill development and investment.",
    whyMatch: [
      "State-specific Gujarat incentives",
      "Useful for investment and expansion",
      "Strong fit for technology and manufacturing projects",
    ],
    documents: [
      "Udyam certificate",
      "PAN",
      "GST certificate",
      "Investment proposal",
      "Financial documents",
    ],
    questions: [
      "Is the project located in Gujarat?",
      "Is the investment in an eligible activity?",
      "Are you seeking investment or technology support?",
    ],
    source: "MSME Council · Gujarat state-scheme reference",
    officialUrl:
      "https://msmecouncil.org/schemes-and-incentives/state-schemes/schemes-and-initiatives-by-gujarat-government/gujarat-industrial-policy-2020-updated-for-2025/",
  }),

  stateScheme("Gujarat", {
    id: "gj-msme",
    name: "Gujarat MSME Policy 2019",
    shortName: "Gujarat MSME Policy",
    ministry: "Government of Gujarat",
    category: "Subsidy",
    sectors: ["Manufacturing", "Service"],
    businessTypes: BUSINESS_TYPES,
    stage: "Both",
    womenFriendly: true,
    ruralFriendly: true,
    benefit:
      "Capital investment, interest, employment, infrastructure and technology-upgradation incentives.",
    amount:
      "The source describes capital subsidy by enterprise size and 7% interest subsidy on eligible loans up to ₹50 lakh, subject to conditions.",
    description:
      "Supports Gujarat MSMEs through financial incentives, infrastructure assistance, technology adoption and capacity building.",
    whyMatch: [
      "Designed specifically around Gujarat MSMEs",
      "Useful for investment and technology upgrades",
      "Includes employment and infrastructure support",
    ],
    documents: [
      "Udyam certificate",
      "PAN",
      "GST certificate",
      "Investment proof",
      "Employment records",
    ],
    questions: [
      "Is the MSME located in Gujarat?",
      "Are you making an eligible capital investment?",
      "Are you planning technology or capacity expansion?",
    ],
    source: "MSME Council · Gujarat state-scheme reference",
    officialUrl:
      "https://msmecouncil.org/schemes-and-incentives/state-schemes/schemes-and-initiatives-by-gujarat-government/gujarat-msme-policy-2019/",
  }),

  stateScheme("Gujarat", {
    id: "gj-export",
    name: "Gujarat Export Policy 2025",
    shortName: "Gujarat Export Policy",
    ministry: "Government of Gujarat",
    category: "Market",
    sectors: ["Manufacturing", "Service"],
    businessTypes: BUSINESS_TYPES,
    stage: "Both",
    exporter: true,
    benefit:
      "Export finance, market-access, infrastructure and international trade support.",
    amount:
      "The source describes export incentives and 5% interest subsidy on eligible export loans, subject to conditions.",
    description:
      "Creates an export-friendly framework for Gujarat businesses with support for market diversification, export finance and trade participation.",
    whyMatch: [
      "Strong fit for export-oriented businesses",
      "Useful for entering new international markets",
      "Supports trade and market development",
    ],
    documents: [
      "Udyam certificate",
      "IEC",
      "PAN",
      "GST certificate",
      "Export records",
    ],
    questions: [
      "Is your business based in Gujarat?",
      "Do you have an IEC where required?",
      "Are you planning to start or increase exports?",
    ],
    source: "MSME Council · Gujarat state-scheme reference",
    officialUrl:
      "https://msmecouncil.org/schemes-and-incentives/state-schemes/schemes-and-initiatives-by-gujarat-government/gujarat-export-policy-2025/",
  }),

  stateScheme("Gujarat", {
    id: "gj-startup",
    name: "Startup Gujarat",
    shortName: "Startup Gujarat",
    ministry: "Government of Gujarat",
    category: "Growth",
    sectors: ["Manufacturing", "Service"],
    businessTypes: ["Private Limited", "LLP", "Partnership"],
    stage: "New",
    benefit:
      "Startup-oriented funding, mentoring and ecosystem support.",
    amount:
      "Benefits depend on the applicable startup programme and eligibility.",
    description:
      "Supports emerging Gujarat startups through funding, mentoring, incubation and innovation-focused assistance.",
    whyMatch: [
      "Useful for innovation-led startups",
      "State-specific startup ecosystem support",
      "Relevant to early-stage businesses",
    ],
    documents: [
      "PAN",
      "Incorporation certificate",
      "Business plan",
      "Startup recognition documents",
    ],
    questions: [
      "Is your business an eligible startup?",
      "Is the venture innovation or technology driven?",
      "Are you seeking incubation or funding support?",
    ],
    source: "MSME Council · Gujarat state-scheme reference",
    officialUrl:
      "https://msmecouncil.org/schemes-and-incentives/state-schemes/schemes-and-initiatives-by-gujarat-government/",
  }),

  /* ---------------------------------------------------------------------- */
  /* KARNATAKA                                                             */
  /* ---------------------------------------------------------------------- */

  stateScheme("Karnataka", {
    id: "ka-policy",
    name: "Karnataka Industrial Policy 2025–30",
    shortName: "Karnataka Industrial Policy",
    ministry: "Government of Karnataka",
    category: "Growth",
    sectors: ["Manufacturing", "Service"],
    businessTypes: BUSINESS_TYPES,
    stage: "Both",
    womenFriendly: true,
    scStFriendly: true,
    benefit:
      "Investment and regional-development incentives focused on future sectors, manufacturing, logistics and green industry.",
    amount:
      "Incentives vary by sector, investment, zone and policy conditions.",
    description:
      "The 2025–30 policy focuses on investment, job creation, future sectors, advanced manufacturing, logistics, green industries and balanced regional development.",
    whyMatch: [
      "Current Karnataka industrial policy reference",
      "Relevant to new investment and expansion",
      "Strong fit for advanced manufacturing and future sectors",
    ],
    documents: [
      "Udyam certificate",
      "PAN",
      "GST certificate",
      "Investment proposal",
      "Project report",
    ],
    questions: [
      "Is the project located in Karnataka?",
      "Is your activity covered by the policy?",
      "Are you planning new investment or expansion?",
    ],
    source: "MSME Council · Karnataka state-scheme reference",
    officialUrl:
      "https://msmecouncil.org/schemes-and-incentives/state-schemes/schemes-and-initiatives-by-karnataka-government-2/karnataka-industrial-policy-2025-30/",
  }),

  stateScheme("Karnataka", {
    id: "ka-udyogini",
    name: "Udyogini Scheme",
    shortName: "Udyogini",
    ministry: "Karnataka State Women’s Development Corporation",
    category: "Credit",
    sectors: ["Manufacturing", "Service"],
    businessTypes: BUSINESS_TYPES,
    stage: "New",
    womenFriendly: true,
    benefit:
      "Financial assistance and subsidy support for women starting or expanding micro-enterprises.",
    amount:
      "Loan and subsidy support depend on category and programme conditions.",
    description:
      "Supports women entrepreneurs in Karnataka through finance and assistance for income-generating activities.",
    whyMatch: [
      "Designed for women entrepreneurs",
      "State-specific Karnataka support",
      "Useful for starting a micro-enterprise",
    ],
    documents: [
      "Identity proof",
      "Address proof",
      "Business/project details",
      "Bank documents",
    ],
    questions: [
      "Is the enterprise owned or promoted by a woman entrepreneur?",
      "Is the business located in Karnataka?",
      "Do you have a viable project plan?",
    ],
    source: "MSME Council · Karnataka state-scheme reference",
    officialUrl:
      "https://msmecouncil.org/schemes-and-incentives/state-schemes/schemes-and-initiatives-by-karnataka-government-2/udyogini-scheme-karnataka/",
  }),

  /* ---------------------------------------------------------------------- */
  /* TAMIL NADU                                                            */
  /* ---------------------------------------------------------------------- */

  stateScheme("Tamil Nadu", {
    id: "tn-ambedkar",
    name: "Annal Ambedkar Entrepreneurship Development Scheme",
    shortName: "Annal Ambedkar EDS",
    ministry: "Government of Tamil Nadu",
    category: "Subsidy",
    sectors: ["Manufacturing", "Service"],
    businessTypes: BUSINESS_TYPES,
    stage: "Both",
    scStFriendly: true,
    benefit:
      "Capital subsidy and interest subvention for eligible SC/ST entrepreneurs.",
    amount:
      "35% capital subsidy up to ₹1.5 crore and 6% interest subvention for eligible applicants.",
    description:
      "Promotes entrepreneurship among SC/ST entrepreneurs in Tamil Nadu and supports both new and existing enterprises.",
    whyMatch: [
      "Strong fit for eligible SC/ST entrepreneurs",
      "Supports manufacturing and service activities",
      "Can support new and existing enterprises",
    ],
    documents: [
      "Community certificate",
      "Udyam certificate",
      "PAN",
      "Project report",
      "Bank documents",
    ],
    questions: [
      "Are you an eligible SC/ST entrepreneur?",
      "Is the enterprise located in Tamil Nadu?",
      "Is the proposed activity eligible?",
    ],
    source: "MSME Council · Tamil Nadu state-scheme reference",
    officialUrl:
      "https://msmecouncil.org/schemes-and-incentives/state-schemes/schemes-and-initiatives-by-tamil-nadu-government/annal-ambedkar-entrepreneurship-development-scheme-2023-24/",
  }),

  stateScheme("Tamil Nadu", {
    id: "tn-kalaignar",
    name: "Kalaignar Kaivinai Thittam",
    shortName: "Kalaignar Kaivinai",
    ministry: "Government of Tamil Nadu",
    category: "Credit",
    sectors: ["Manufacturing", "Service"],
    businessTypes: BUSINESS_TYPES,
    stage: "Both",
    benefit:
      "Credit-linked support for artisans and craft enterprises.",
    amount:
      "The source describes loan support up to ₹3 lakh with 25% subsidy up to ₹50,000, subject to conditions.",
    description:
      "Supports artisans and craftspersons in traditional and modern trades with finance, training, branding and market linkages.",
    whyMatch: [
      "Strong fit for artisan and craft businesses",
      "Tamil Nadu-specific support",
      "Combines finance with capability and market support",
    ],
    documents: [
      "Identity proof",
      "Trade/craft proof",
      "Business details",
      "Bank documents",
    ],
    questions: [
      "Are you engaged in an eligible artisan or craft trade?",
      "Is your business located in Tamil Nadu?",
      "Do you need finance for your enterprise?",
    ],
    source: "MSME Council · Tamil Nadu state-scheme reference",
    officialUrl:
      "https://msmecouncil.org/schemes-and-incentives/state-schemes/schemes-and-initiatives-by-tamil-nadu-government/",
  }),

  stateScheme("Tamil Nadu", {
    id: "tn-needs",
    name: "New Entrepreneur-cum-Enterprise Development Scheme",
    shortName: "NEEDS",
    ministry: "Government of Tamil Nadu",
    category: "Growth",
    sectors: ["Manufacturing", "Service"],
    businessTypes: BUSINESS_TYPES,
    stage: "New",
    womenFriendly: true,
    benefit:
      "Financial assistance, training and mentoring for first-generation entrepreneurs.",
    amount:
      "Loans up to ₹1 crore are described by the source, subject to eligibility and conditions.",
    description:
      "Helps first-generation entrepreneurs establish new enterprises with finance, training and mentoring support.",
    whyMatch: [
      "Designed for first-generation entrepreneurs",
      "Strong fit for a new enterprise",
      "Supports finance and entrepreneurship development",
    ],
    documents: [
      "PAN",
      "Aadhaar",
      "Business plan",
      "Project report",
      "Bank documents",
    ],
    questions: [
      "Are you a first-generation entrepreneur?",
      "Is the enterprise being established in Tamil Nadu?",
      "Do you have a viable project report?",
    ],
    source: "MSME Council · Tamil Nadu state-scheme reference",
    officialUrl:
      "https://msmecouncil.org/schemes-and-incentives/state-schemes/schemes-and-initiatives-by-tamil-nadu-government/new-entrepreneur-cum-enterprise-development-scheme-needs-tamil-nadu/",
  }),

  stateScheme("Tamil Nadu", {
    id: "tn-svep",
    name: "Startup Village Entrepreneurship Programme",
    shortName: "SVEP",
    ministry: "DAY-NRLM / Government-supported programme",
    category: "Growth",
    sectors: ["Manufacturing", "Service"],
    businessTypes: BUSINESS_TYPES,
    stage: "New",
    womenFriendly: true,
    ruralFriendly: true,
    benefit:
      "Training, mentoring, seed capital and bank linkage for rural non-farm enterprises.",
    amount:
      "Seed and programme support varies by implementation and eligibility.",
    description:
      "Supports rural individuals in establishing non-farm enterprises with mentoring, seed capital and institutional support.",
    whyMatch: [
      "Strong rural-enterprise fit",
      "Useful for new micro-enterprises",
      "Includes training and mentoring support",
    ],
    documents: [
      "Identity proof",
      "Business plan",
      "Bank details",
      "Enterprise information",
    ],
    questions: [
      "Is the enterprise located in a rural area?",
      "Is this a new non-farm enterprise?",
      "Would mentoring or seed support help you start?",
    ],
    source: "MSME Council · Tamil Nadu state-scheme reference",
    officialUrl:
      "https://msmecouncil.org/schemes-and-incentives/state-schemes/schemes-and-initiatives-by-tamil-nadu-government/",
  }),

  /* ---------------------------------------------------------------------- */
  /* TELANGANA                                                             */
  /* ---------------------------------------------------------------------- */

  stateScheme("Telangana", {
    id: "tg-tidea",
    name: "T-IDEA Incentive Scheme",
    shortName: "T-IDEA",
    ministry: "Government of Telangana",
    category: "Subsidy",
    sectors: ["Manufacturing", "Service"],
    businessTypes: BUSINESS_TYPES,
    stage: "Both",
    womenFriendly: true,
    scStFriendly: true,
    benefit:
      "Investment, stamp-duty, land, SGST, power and interest-related incentives.",
    amount:
      "The source describes around 15% investment subsidy for MSEs plus other incentives, subject to category and ceilings.",
    description:
      "Telangana's T-IDEA supports new and existing enterprises and gives priority to women-owned, SC/ST and first-generation entrepreneurs.",
    whyMatch: [
      "State-specific Telangana incentives",
      "Useful for new investment or expansion",
      "Additional support can apply to priority groups",
    ],
    documents: [
      "Udyam certificate",
      "PAN",
      "GST certificate",
      "Investment proof",
      "Project report",
    ],
    questions: [
      "Is the enterprise located in Telangana?",
      "Are you making an eligible investment?",
      "Do you belong to a priority entrepreneur category, if applicable?",
    ],
    source: "MSME Council · Telangana state-scheme reference",
    officialUrl:
      "https://msmecouncil.org/schemes-and-incentives/state-schemes/schemes-and-initiatives-by-telangana-government/t-idea-incentive-scheme-telangana/",
  }),

  stateScheme("Telangana", {
    id: "tg-pride",
    name: "TS-PRIDE",
    shortName: "TS-PRIDE",
    ministry: "Government of Telangana",
    category: "Subsidy",
    sectors: ["Manufacturing", "Service"],
    businessTypes: BUSINESS_TYPES,
    stage: "Both",
    scStFriendly: true,
    womenFriendly: true,
    benefit:
      "Dedicated industrial and financial support for eligible SC entrepreneurs.",
    amount:
      "The source describes capital subsidy and additional support for eligible SC and women SC entrepreneurs, subject to conditions.",
    description:
      "Promotes entrepreneurship among Dalit/SC communities through financial incentives, infrastructure, skill development and market linkages.",
    whyMatch: [
      "Strong fit for eligible SC entrepreneurs",
      "Supports first-generation entrepreneurship",
      "Includes institutional and market support",
    ],
    documents: [
      "SC certificate",
      "Udyam certificate",
      "PAN",
      "Project report",
      "Bank documents",
    ],
    questions: [
      "Is the enterprise owned or promoted by an eligible SC entrepreneur?",
      "Is the business located in Telangana?",
      "Are you setting up or expanding an enterprise?",
    ],
    source: "MSME Council · Telangana state-scheme reference",
    officialUrl:
      "https://msmecouncil.org/schemes-and-incentives/state-schemes/schemes-and-initiatives-by-telangana-government/ts-pride-telangana-state-program-for-rapid-incubation-of-dalit-entrepreneurs/",
  }),

  /* ---------------------------------------------------------------------- */
  /* UTTAR PRADESH                                                         */
  /* ---------------------------------------------------------------------- */

  stateScheme("Uttar Pradesh", {
    id: "up-policy",
    name: "Uttar Pradesh MSME Promotion Policy 2022",
    shortName: "UP MSME Policy",
    ministry: "Government of Uttar Pradesh",
    category: "Subsidy",
    sectors: ["Manufacturing", "Service"],
    businessTypes: BUSINESS_TYPES,
    stage: "Both",
    womenFriendly: true,
    benefit:
      "Capital, interest, power, infrastructure, skill and market-development support.",
    amount:
      "The source describes capital subsidies ranging from 20% to 50%, with caps depending on sector and location.",
    description:
      "Creates a business-friendly ecosystem for UP MSMEs, supporting new units, expansion, investment, employment and competitiveness.",
    whyMatch: [
      "State-specific UP MSME support",
      "Useful for new units and expansion",
      "Additional support may apply in backward districts and priority sectors",
    ],
    documents: [
      "Udyam certificate",
      "PAN",
      "GST certificate",
      "Investment proof",
      "Project report",
    ],
    questions: [
      "Is the enterprise located in Uttar Pradesh?",
      "Is the investment in an eligible sector or activity?",
      "Is the unit eligible for the applicable location-based incentive?",
    ],
    source: "MSME Council · Uttar Pradesh state-scheme reference",
    officialUrl:
      "https://msmecouncil.org/schemes-and-incentives/state-schemes/schemes-and-initiatives-by-uttar-pradesh-government/uttar-pradesh-micro-small-medium-enterprises-promotion-policy-2022/",
  }),

  stateScheme("Uttar Pradesh", {
    id: "up-yuva",
    name: "Mukhyamantri Yuva Swarozgar Yojana",
    shortName: "MYSY",
    ministry: "Government of Uttar Pradesh",
    category: "Credit",
    sectors: ["Manufacturing", "Service"],
    businessTypes: BUSINESS_TYPES,
    stage: "New",
    benefit:
      "Loan, subsidy, training and guidance for youth entrepreneurship.",
    amount:
      "Loan support varies by business and applicable programme conditions.",
    description:
      "Encourages youth in Uttar Pradesh to establish micro-enterprises and become self-employed through finance and skill support.",
    whyMatch: [
      "Strong fit for young entrepreneurs",
      "Useful for starting a new enterprise",
      "Combines finance with training and guidance",
    ],
    documents: [
      "Age/identity proof",
      "PAN",
      "Project report",
      "Bank documents",
      "Business details",
    ],
    questions: [
      "Are you eligible under the age and programme conditions?",
      "Is the proposed enterprise located in Uttar Pradesh?",
      "Do you have a viable business plan?",
    ],
    source: "MSME Council · Uttar Pradesh state-scheme reference",
    officialUrl:
      "https://msmecouncil.org/schemes-and-incentives/state-schemes/schemes-and-initiatives-by-uttar-pradesh-government/mukhyamantri-yuva-swarozgar-yojana/",
  }),
];

type Answers = Record<string, "yes" | "no" | "">;

function getProfile() {
  const fallback = {
    fullName: "",
    businessName: "Your business",
    city: "",
    state: "Maharashtra",
    sector: "Manufacturing",
    businessType: "Proprietorship",
    turnover: "",
    employees: "",
    plantInvestment: "",
    womenOwned: false,
    scStOwned: false,
    exporter: false,
  };

  if (typeof window === "undefined") {
    return fallback;
  }

  try {
    const parsed = JSON.parse(
      localStorage.getItem("bharat-udyam-user") || "{}",
    );

    return {
      ...fallback,
      fullName: parsed.fullName ?? "",
      businessName: parsed.businessName ?? "Your business",
      city: parsed.city ?? "",
      state: parsed.state ?? "Maharashtra",
      sector:
        parsed.industrySector ??
        parsed.sector ??
        "Manufacturing",
      businessType:
        parsed.businessType ??
        "Proprietorship",
      turnover:
        parsed.annualTurnover ??
        parsed.turnover ??
        "",
      employees:
        parsed.numberOfEmployees ??
        parsed.employees ??
        "",
      plantInvestment:
        parsed.plantInvestment ??
        "",
      womenOwned: Boolean(parsed.womenOwned),
      scStOwned: Boolean(parsed.scStOwned),
      exporter: Boolean(parsed.exporter),
    };
  } catch {
    return fallback;
  }
}

function scoreScheme(
  scheme: Scheme,
  profile: ReturnType<typeof getProfile>,
) {
  let score = 48;

  const isCentral = scheme.states.includes("All India");

  if (scheme.states.includes(profile.state)) {
    score += 22;
  } else if (isCentral) {
    score += 10;
  }

  if (scheme.sectors.includes(profile.sector)) {
    score += 12;
  } else {
    score -= 10;
  }

  if (scheme.businessTypes.includes(profile.businessType)) {
    score += 5;
  }

  if (scheme.stage === "Both") {
    score += 3;
  }

  if (scheme.womenFriendly && profile.womenOwned) {
    score += 8;
  }

  if (scheme.scStFriendly && profile.scStOwned) {
    score += 10;
  }

  if (scheme.exporter && profile.exporter) {
    score += 8;
  }

  return Math.max(40, Math.min(98, score));
}

function SchemesPage() {
  const { loading } = useAuthGuard();

  const profile = useMemo(
    () => getProfile(),
    [],
  );

  const [state, setState] = useState(
    STATES.includes(profile.state)
      ? profile.state
      : "Maharashtra",
  );

  const [sector, setSector] = useState(
    SECTORS.includes(profile.sector)
      ? profile.sector
      : "Manufacturing",
  );

  const [category, setCategory] = useState("All");

  const [schemeType, setSchemeType] = useState<
    "all" | "central" | "state"
  >("all");

  const [search, setSearch] = useState("");

  const [selectedScheme, setSelectedScheme] =
    useState<Scheme | null>(null);

  const [applicationOpen, setApplicationOpen] =
    useState(false);

  const [answers, setAnswers] = useState<Answers>({});

  const [files, setFiles] = useState<
    Record<string, File | null>
  >({});

  const [submitted, setSubmitted] = useState(false);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();

    return SCHEMES
      .filter((scheme) => {
        const isCentral =
          scheme.states.includes("All India");

        const stateMatch =
          state === "All States" ||
          isCentral ||
          scheme.states.includes(state);

        const typeMatch =
          schemeType === "all" ||
          (schemeType === "central" && isCentral) ||
          (schemeType === "state" && !isCentral);

        const categoryMatch =
          category === "All" ||
          scheme.category === category;

        const sectorMatch =
          scheme.sectors.includes(sector);

        const queryMatch =
          !q ||
          [
            scheme.name,
            scheme.shortName,
            scheme.ministry,
            scheme.category,
            scheme.description,
          ].some((value) =>
            value.toLowerCase().includes(q),
          );

        return (
          stateMatch &&
          typeMatch &&
          categoryMatch &&
          sectorMatch &&
          queryMatch
        );
      })
      .map((scheme) => ({
        scheme,
        match: scoreScheme(scheme, {
          ...profile,
          state,
          sector,
        }),
      }))
      .sort((a, b) => b.match - a.match);
  }, [
    state,
    sector,
    category,
    schemeType,
    search,
    profile,
  ]);

  const recommended = filtered.filter(
    (item) => item.match >= 75,
  );

  const otherMatches = filtered.filter(
    (item) => item.match < 75,
  );

  const centralCount = filtered.filter(
    (item) =>
      item.scheme.states.includes("All India"),
  ).length;

  const stateCount =
    filtered.length - centralCount;

  function openScheme(scheme: Scheme) {
    setSelectedScheme(scheme);
    setApplicationOpen(false);
    setSubmitted(false);
    setAnswers({});
    setFiles({});
  }

  function startApplication() {
    if (!selectedScheme) return;

    setApplicationOpen(true);
    setSubmitted(false);
  }

  function finishApplication() {
    if (!selectedScheme) return;

    const yes = Object.values(answers).filter(
      (value) => value === "yes",
    ).length;

    const ratio =
      yes /
      Math.max(
        1,
        selectedScheme.questions.length,
      );

    const eligibilityScore = Math.min(
      98,
      Math.round(
        scoreScheme(selectedScheme, {
          ...profile,
          state,
          sector,
        }) *
          0.7 +
          ratio * 30,
      ),
    );

    const financialScore = Math.min(
      96,
      Math.max(
        42,
        68 +
          (profile.turnover ? 8 : 0) +
          (profile.plantInvestment ? 6 : 0),
      ),
    );

    const application = {
      id: `BU-${Date.now()
        .toString()
        .slice(-8)}`,
      schemeId: selectedScheme.id,
      schemeName: selectedScheme.name,
      status: "Submitted",
      eligibilityScore,
      financialScore,
      submittedAt:
        new Date().toISOString(),
    };

    try {
      const existing = JSON.parse(
        localStorage.getItem(
          "bharat-udyam-applications",
        ) || "[]",
      );

      localStorage.setItem(
        "bharat-udyam-applications",
        JSON.stringify([
          application,
          ...existing,
        ]),
      );
    } catch {
      // Ignore storage failures.
    }

    setSubmitted(true);
  }

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-4">
          <div className="size-10 animate-spin rounded-full border-2 border-border border-t-gold" />

          <p className="text-sm text-muted-foreground">
            Loading your schemes...
          </p>
        </div>
      </div>
    );
  }

  return (
    <AppShell>

      <main className="schemes-page relative min-w-0 overflow-hidden">
        <div className="pointer-events-none absolute -right-32 top-0 size-80 rounded-full bg-gold/[0.055] blur-3xl scheme-glow" />

        <div className="pointer-events-none absolute -left-40 top-[34%] size-72 rounded-full bg-mint/[0.035] blur-3xl scheme-glow" />

        <div className="relative mx-auto w-full max-w-[1320px] px-3 pb-6 pt-2 sm:px-5 lg:px-8">
          {/* HEADER */}

          <section className="scheme-enter">
            <Link
              to="/dashboard"
              className="mb-4 inline-flex items-center gap-2 text-[11px] font-semibold text-muted-foreground hover:text-gold sm:mb-5 sm:text-[12px]"
            >
              <ArrowLeft className="size-3.5" />
              Back to dashboard
            </Link>

            <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-gold/15 bg-gold/5 px-2.5 py-1 schemes-badge font-semibold uppercase tracking-[0.14em] text-gold">
                    <Sparkles className="size-3" />
                    Scheme Discovery
                  </span>

                  <span className="rounded-full bg-surface/60 px-2.5 py-1 schemes-state-badge text-muted-foreground">
                    {state}
                  </span>
                </div>

                <h1 className="mt-3 max-w-3xl text-[28px] font-bold leading-[1.05] tracking-[-0.035em] text-foreground sm:mt-4 sm:text-[40px]">
                  Find the right{" "}
                  <span className="text-gradient-gold">
                    scheme for you.
                  </span>
                </h1>

                <p className="mt-2 max-w-2xl text-[12px] leading-5 text-muted-foreground sm:mt-3 sm:text-[14px] sm:leading-6">
                  Discover Central and State government
                  schemes matched to your state, sector and
                  available business-profile information.
                </p>

                <p className="mt-2 schemes-tagline text-muted-foreground/55">
                  For the Businesses That Build Bharat.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-2 sm:flex sm:gap-3">
                <MiniStat
                  icon={Sparkles}
                  label="Strong matches"
                  value={recommended.length}
                />

                <MiniStat
                  icon={FileCheck2}
                  label="Schemes found"
                  value={filtered.length}
                />
              </div>
            </div>
          </section>

          {/* FILTERS */}

          <section className="scheme-enter mt-5 rounded-2xl border border-border/60 bg-surface/35 p-3.5 shadow-[0_18px_55px_rgba(0,0,0,.07)] sm:mt-7 sm:p-4">
            <div className="grid gap-2.5 md:grid-cols-[minmax(0,1fr)_190px_170px]">
              <label className="flex min-w-0 items-center gap-2.5 rounded-xl border border-border/70 bg-background/35 px-3.5 py-3 focus-within:border-gold/35">
                <Search className="size-3.5 shrink-0 text-muted-foreground" />

                <input
                  value={search}
                  onChange={(e) =>
                    setSearch(e.target.value)
                  }
                  placeholder="Search schemes, policies or benefits..."
                  className="min-w-0 flex-1 bg-transparent filter-input text-foreground outline-none placeholder:text-muted-foreground/60"
                />

                {search && (
                  <button
                    type="button"
                    onClick={() => setSearch("")}
                    className="rounded-md p-1 text-muted-foreground hover:text-foreground"
                    aria-label="Clear search"
                  >
                    <X className="size-3" />
                  </button>
                )}
              </label>

              <SelectControl
                icon={MapPin}
                value={state}
                onChange={setState}
                options={STATES}
              />

              <SelectControl
                icon={Building2}
                value={sector}
                onChange={setSector}
                options={SECTORS}
              />
            </div>

            <div className="mt-3 flex gap-1.5 overflow-x-auto pb-0.5">
              {(
                [
                  ["all", "All schemes"],
                  ["central", "Central"],
                  ["state", "State"],
                ] as const
              ).map(([value, label]) => (
                <button
                  key={value}
                  type="button"
                  onClick={() =>
                    setSchemeType(value)
                  }
                  className={cn(
                    "shrink-0 rounded-full border px-3 py-1.5 filter-button font-semibold",
                    schemeType === value
                      ? "border-gold/30 bg-gold/10 text-gold"
                      : "border-border/60 bg-background/20 text-muted-foreground hover:border-gold/20 hover:text-foreground",
                  )}
                >
                  {label}
                </button>
              ))}

              <span className="mx-1 hidden h-5 w-px bg-border/60 sm:block" />

              <div className="flex shrink-0 items-center gap-1.5 category-label font-semibold text-muted-foreground">
                <Filter className="size-3" />
                Category
              </div>

              {CATEGORIES.map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() =>
                    setCategory(item)
                  }
                  className={cn(
                    "shrink-0 rounded-full border px-3 py-1.5 filter-button font-semibold",
                    category === item
                      ? "border-gold/30 bg-gold/10 text-gold"
                      : "border-border/60 bg-background/20 text-muted-foreground hover:border-gold/20 hover:text-foreground",
                  )}
                >
                  {item}
                </button>
              ))}
            </div>
          </section>

          {/* SUMMARY */}

          <section className="scheme-enter mt-4 grid gap-2 sm:grid-cols-3">
            <SummaryCard
              label="Current state"
              value={state}
              icon={MapPin}
              detail={`${stateCount} state schemes`}
            />

            <SummaryCard
              label="Central schemes"
              value={`${centralCount}`}
              icon={Building2}
              detail="Available across India"
            />

            <SummaryCard
              label="Profile signal"
              value={`${recommended.length}`}
              icon={Sparkles}
              detail="Strong discovery matches"
            />
          </section>

          {/* RECOMMENDED */}

          <section className="scheme-enter mt-7 sm:mt-9">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="section-kicker font-semibold uppercase tracking-[0.18em] text-gold">
                  Recommended from your profile
                </p>

                <h2 className="mt-1 section-title font-bold tracking-tight text-foreground">
                  Best matches
                </h2>

                <p className="mt-1 max-w-xl section-description leading-4 text-muted-foreground">
                  Discovery scores use your selected state,
                  sector and available profile signals. They
                  are not final government eligibility
                  decisions.
                </p>
              </div>

              <p className="section-meta text-muted-foreground">
                {state} · {sector}
              </p>
            </div>

            {recommended.length ? (
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                {recommended
                  .slice(0, 6)
                  .map(
                    (
                      { scheme, match },
                      index,
                    ) => (
                      <SchemeCard
                        key={scheme.id}
                        scheme={scheme}
                        match={match}
                        featured
                        delay={index}
                        onClick={() =>
                          openScheme(scheme)
                        }
                      />
                    ),
                  )}
              </div>
            ) : (
              <EmptyState
                title="No strong matches for these filters"
                text="Try another category, sector or scheme type."
              />
            )}
          </section>

          {/* OTHER SCHEMES */}

          <section className="scheme-enter mt-9 pb-8 sm:mt-11">
            <div className="flex items-end justify-between gap-4">
              <div>
                <p className="text-[9px] font-semibold uppercase tracking-[0.18em] text-muted-foreground sm:text-[10px]">
                  Explore more
                </p>

                <h2 className="mt-1 section-title font-bold text-foreground">
                  Other schemes
                </h2>
              </div>

              <span className="section-meta text-muted-foreground">
                {otherMatches.length} results
              </span>
            </div>

            {otherMatches.length ? (
              <div className="mt-4 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
                {otherMatches.map(
                  ({ scheme, match }, index) => (
                    <SchemeCard
                      key={scheme.id}
                      scheme={scheme}
                      match={match}
                      delay={index}
                      onClick={() =>
                        openScheme(scheme)
                      }
                    />
                  ),
                )}
              </div>
            ) : !filtered.length ? (
              <EmptyState
                title="No schemes match these filters"
                text="Try another state, sector, category or search term."
              />
            ) : null}

            <div className="mt-7 rounded-2xl border border-border/50 bg-surface/20 p-3.5 sm:p-4">
              <div className="flex items-start gap-3">
                <ShieldCheck className="mt-0.5 size-4 shrink-0 text-mint" />

                <div>
                  <p className="document-name font-semibold text-foreground">
                    Verify before you apply
                  </p>

                  <p className="mt-1 verify-text leading-4 text-muted-foreground">
                    Scheme information is presented for
                    discovery. Eligibility, benefit amounts,
                    deadlines, application windows and state
                    conditions can change. Always verify the
                    latest official notification before
                    submitting an application.
                  </p>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>

      {selectedScheme && (
        <SchemeDrawer
          scheme={selectedScheme}
          match={scoreScheme(
            selectedScheme,
            {
              ...profile,
              state,
              sector,
            },
          )}
          applicationOpen={applicationOpen}
          answers={answers}
          files={files}
          submitted={submitted}
          onClose={() =>
            setSelectedScheme(null)
          }
          onStart={startApplication}
          onAnswer={(question, value) =>
            setAnswers((current) => ({
              ...current,
              [question]: value,
            }))
          }
          onFile={(name, file) =>
            setFiles((current) => ({
              ...current,
              [name]: file,
            }))
          }
          onSubmit={finishApplication}
        />
      )}
    </AppShell>
  );
}

/* -------------------------------------------------------------------------- */
/* SMALL COMPONENTS                                                           */
/* -------------------------------------------------------------------------- */

function MiniStat({
  icon: Icon,
  label,
  value,
}: {
  icon: LucideIcon;
  label: string;
  value: number;
}) {
  return (
    <div className="mini-stat min-w-0 rounded-xl border border-border/60 bg-background/25 px-3 py-2.5 sm:min-w-[112px] sm:px-4 sm:py-3">
      <Icon className="size-3.5 text-gold" />

      <p className="mt-1.5 mini-stat-value font-bold text-foreground">
        {value}
      </p>

      <p className="schemes-state-badge text-muted-foreground sm:text-[10px]">
        {label}
      </p>
    </div>
  );
}

function SummaryCard({
  icon: Icon,
  label,
  value,
  detail,
}: {
  icon: LucideIcon;
  label: string;
  value: string;
  detail: string;
}) {
  return (
    <div className="flex min-w-0 items-center gap-3 rounded-xl border border-border/55 bg-surface/25 px-3.5 py-3">
      <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-gold/8">
        <Icon className="size-3.5 text-gold" />
      </span>

      <div className="min-w-0">
        <p className="summary-label font-semibold uppercase tracking-[0.12em] text-muted-foreground">
          {label}
        </p>

        <p className="summary-value truncate font-bold text-foreground">
          {value}
        </p>

        <p className="scheme-card-ministry truncate text-muted-foreground">
          {detail}
        </p>
      </div>
    </div>
  );
}

function SelectControl({
  icon: Icon,
  value,
  onChange,
  options,
}: {
  icon: LucideIcon;
  value: string;
  onChange: (value: string) => void;
  options: string[];
}) {
  return (
    <label className="flex min-w-0 items-center gap-2.5 rounded-xl border border-border/70 bg-background/35 px-3.5 py-3">
      <Icon className="size-3.5 shrink-0 text-gold" />

      <select
        value={value}
        onChange={(e) =>
          onChange(e.target.value)
        }
        className="w-full min-w-0 bg-transparent filter-select font-medium text-foreground outline-none"
      >
        {options.map((option) => (
          <option
            key={option}
            value={option}
            className="bg-background"
          >
            {option}
          </option>
        ))}
      </select>
    </label>
  );
}

/* -------------------------------------------------------------------------- */
/* SCHEME CARD                                                                */
/* -------------------------------------------------------------------------- */

function SchemeCard({
  scheme,
  match,
  featured = false,
  delay = 0,
  onClick,
}: {
  scheme: Scheme;
  match: number;
  featured?: boolean;
  delay?: number;
  onClick: () => void;
}) {
  const isCentral =
    scheme.states.includes("All India");

  return (
    <button
      type="button"
      onClick={onClick}
      style={{
        animationDelay: `${
          Math.min(delay, 8) * 45
        }ms`,
      }}
      className={cn(
        "scheme-enter group relative w-full overflow-hidden rounded-2xl border p-4 text-left transition-all duration-250 hover:-translate-y-0.5 hover:border-gold/25 sm:p-4.5",
        featured
          ? "border-gold/12 bg-gradient-to-br from-gold/[0.06] via-surface/35 to-surface/20"
          : "border-border/60 bg-surface/25 hover:bg-surface/45",
      )}
    >
      <div className="pointer-events-none absolute -right-10 -top-10 size-28 rounded-full bg-gold/[0.045] blur-2xl transition-transform duration-500 group-hover:scale-150" />

      <div className="relative">
        <div className="flex items-start gap-3">
          <span className="flex size-9 shrink-0 items-center justify-center rounded-xl border border-gold/10 bg-gold/5">
            <FileCheck2 className="size-4 text-gold" />
          </span>

          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-1.5">
              <span className="scheme-card-category font-bold uppercase tracking-[0.12em] text-muted-foreground">
                {scheme.category}
              </span>

              <span
                className={cn(
                  "rounded-full px-1.5 py-0.5 scheme-card-location font-semibold",
                  isCentral
                    ? "bg-mint/10 text-mint"
                    : "bg-cyan/10 text-cyan",
                )}
              >
                {isCentral
                  ? "Central"
                  : scheme.states[0]}
              </span>
            </div>

            <h3 className="mt-1 scheme-card-title font-bold leading-4.5 text-foreground">
              {scheme.name}
            </h3>

            <p className="mt-0.5 scheme-card-ministry truncate text-muted-foreground">
              {scheme.ministry}
            </p>
          </div>

          <div className="shrink-0 text-right">
            <span className="scheme-card-match-label uppercase tracking-[0.1em] text-muted-foreground">
              Match
            </span>

            <span className="scheme-card-match text-gradient-gold block font-bold leading-none">
              {match}%
            </span>
          </div>
        </div>

        <div className="mt-3 rounded-xl border border-border/40 bg-background/20 p-2.5">
          <p className="scheme-card-location font-semibold uppercase tracking-[0.1em] text-muted-foreground">
            Key benefit
          </p>

          <p className="mt-1 line-clamp-2 scheme-card-benefit-text font-medium leading-4 text-foreground">
            {scheme.benefit}
          </p>
        </div>

        <p className="mt-2.5 line-clamp-2 scheme-card-description leading-4 text-muted-foreground">
          {scheme.description}
        </p>

        <div className="mt-2.5 flex flex-wrap gap-1">
          {scheme.womenFriendly && (
            <Tag>Women friendly</Tag>
          )}

          {scheme.scStFriendly && (
            <Tag>SC/ST support</Tag>
          )}

          {scheme.exporter && (
            <Tag>Export</Tag>
          )}

          {scheme.ruralFriendly && (
            <Tag>Rural</Tag>
          )}
        </div>

        <div className="mt-3 h-1 overflow-hidden rounded-full bg-surface-2">
          <div
            className="h-full rounded-full bg-gradient-gold transition-all duration-700"
            style={{
              width: `${match}%`,
            }}
          />
        </div>

        <div className="mt-3 flex items-center justify-between gap-3">
          <span className="flex min-w-0 items-center gap-1 scheme-card-amount font-semibold text-mint">
            <IndianRupee className="size-3 shrink-0" />

            <span className="truncate">
              {scheme.amount}
            </span>
          </span>

          <span className="flex shrink-0 items-center gap-1 filter-button font-semibold text-foreground group-hover:text-gold">
            View details

            <ArrowRight className="size-3 group-hover:translate-x-0.5" />
          </span>
        </div>
      </div>
    </button>
  );
}

function Tag({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <span className="rounded-full bg-surface-2/65 px-2 py-1 scheme-tag font-medium text-muted-foreground">
      {children}
    </span>
  );
}

function EmptyState({
  title,
  text,
}: {
  title: string;
  text: string;
}) {
  return (
    <div className="mt-4 rounded-2xl border border-dashed border-border p-8 text-center sm:p-10">
      <CircleHelp className="mx-auto size-6 text-muted-foreground" />

      <h3 className="mt-3 text-sm font-semibold text-foreground">
        {title}
      </h3>

      <p className="mx-auto mt-1 max-w-md text-[10.5px] leading-5 text-muted-foreground sm:text-xs">
        {text}
      </p>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* DRAWER                                                                     */
/* -------------------------------------------------------------------------- */

function SchemeDrawer({
  scheme,
  match,
  applicationOpen,
  answers,
  files,
  submitted,
  onClose,
  onStart,
  onAnswer,
  onFile,
  onSubmit,
}: {
  scheme: Scheme;
  match: number;
  applicationOpen: boolean;
  answers: Answers;
  files: Record<string, File | null>;
  submitted: boolean;
  onClose: () => void;
  onStart: () => void;
  onAnswer: (
    question: string,
    value: "yes" | "no",
  ) => void;
  onFile: (
    name: string,
    file: File | null,
  ) => void;
  onSubmit: () => void;
}) {
  const isCentral =
    scheme.states.includes("All India");

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/55 backdrop-blur-sm">
      <button
        type="button"
        aria-label="Close scheme details"
        onClick={onClose}
        className="absolute inset-0 cursor-default"
      />

      <aside className="scheme-drawer relative flex h-full w-full max-w-[580px] flex-col border-l border-border/70 bg-background shadow-2xl">
        <div className="flex shrink-0 items-center justify-between border-b border-border/60 px-4 py-3.5 sm:px-6">
          <div className="flex items-center gap-2 text-[10px] font-semibold text-muted-foreground sm:text-[11px]">
            <FileCheck2 className="size-4 text-gold" />
            Scheme details
          </div>

          <button
            type="button"
            onClick={onClose}
            className="flex size-9 items-center justify-center rounded-xl border border-border text-muted-foreground hover:border-gold/25 hover:text-foreground"
          >
            <X className="size-4" />
          </button>
        </div>

        <div className="min-h-0 flex-1 overflow-y-auto px-4 py-5 sm:px-6 sm:py-6">
          {!applicationOpen && !submitted ? (
            <>
              <div className="flex flex-wrap gap-1.5">
                <span className="rounded-full bg-gold/10 px-2.5 py-1 text-[8.5px] font-semibold text-gold">
                  {scheme.category}
                </span>

                <span
                  className={cn(
                    "rounded-full px-2.5 py-1 text-[8.5px] font-semibold",
                    isCentral
                      ? "bg-mint/10 text-mint"
                      : "bg-cyan/10 text-cyan",
                  )}
                >
                  {isCentral
                    ? "Central Government"
                    : scheme.states[0]}
                </span>

                <span className="rounded-full bg-surface-2/70 px-2.5 py-1 text-[8.5px] font-semibold text-muted-foreground">
                  {match}% profile match
                </span>
              </div>

              <h2 className="mt-4 text-[23px] font-bold leading-tight tracking-[-0.025em] text-foreground sm:text-[28px]">
                {scheme.name}
              </h2>

              <p className="mt-2 drawer-ministry font-medium text-muted-foreground">
                {scheme.ministry}
              </p>

              <div className="mt-5 rounded-2xl border border-gold/10 bg-gold/[0.045] p-4 sm:p-5">
                <p className="drawer-benefit-label font-semibold uppercase tracking-[0.16em] text-gold">
                  What this scheme offers
                </p>

                <p className="mt-2 drawer-benefit-text font-semibold leading-5 text-foreground">
                  {scheme.benefit}
                </p>

                <p className="mt-2 application-description leading-5 text-muted-foreground">
                  {scheme.amount}
                </p>
              </div>

              <InfoSection title="About the scheme">
                <p className="drawer-body leading-5 text-muted-foreground">
                  {scheme.description}
                </p>
              </InfoSection>

              <InfoSection title="Why it matched your profile">
                <ul className="space-y-2">
                  {scheme.whyMatch.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-2.5 drawer-body leading-5 text-muted-foreground"
                    >
                      <CheckCircle2 className="mt-0.5 size-3.5 shrink-0 text-mint sm:size-4" />
                      {item}
                    </li>
                  ))}
                </ul>
              </InfoSection>

              <InfoSection title="Before you apply">
                <div className="grid gap-2 sm:grid-cols-2">
                  {scheme.documents.map(
                    (document) => (
                      <div
                        key={document}
                        className="flex items-center gap-2 rounded-xl border border-border/50 bg-surface/25 px-3 py-2.5 drawer-document text-foreground"
                      >
                        <FileText className="size-3.5 shrink-0 text-gold" />

                        {document}
                      </div>
                    ),
                  )}
                </div>
              </InfoSection>

              <div className="mt-6 grid gap-2.5 sm:grid-cols-2">
                <button
                  type="button"
                  onClick={onStart}
                  className="flex min-h-11 items-center justify-center gap-2 rounded-xl bg-gradient-gold px-4 py-3 success-dashboard-button font-semibold text-primary-foreground"
                >
                  Start application

                  <ArrowRight className="size-3.5" />
                </button>

                <a
                  href={scheme.officialUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex min-h-11 items-center justify-center gap-2 rounded-xl border border-border px-4 py-3 drawer-secondary-button font-semibold text-foreground hover:border-gold/25"
                >
                  View source

                  <Download className="size-3.5" />
                </a>
              </div>

              <p className="mt-4 drawer-source leading-4 text-muted-foreground/55">
                {scheme.source}. Always verify the latest
                official notification, eligibility conditions
                and application window before submission.
              </p>
            </>
          ) : submitted ? (
            <SubmissionSuccess
              scheme={scheme}
            />
          ) : (
            <ApplicationFlow
              scheme={scheme}
              answers={answers}
              files={files}
              onAnswer={onAnswer}
              onFile={onFile}
              onSubmit={onSubmit}
            />
          )}
        </div>
      </aside>
    </div>
  );
}

function InfoSection({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <section className="mt-6 sm:mt-7">
      <h3 className="drawer-section-title font-bold text-foreground">
        {title}
      </h3>

      <div className="mt-2.5">
        {children}
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/* APPLICATION                                                                */
/* -------------------------------------------------------------------------- */

function ApplicationFlow({
  scheme,
  answers,
  files,
  onAnswer,
  onFile,
  onSubmit,
}: {
  scheme: Scheme;
  answers: Answers;
  files: Record<string, File | null>;
  onAnswer: (
    question: string,
    value: "yes" | "no",
  ) => void;
  onFile: (
    name: string,
    file: File | null,
  ) => void;
  onSubmit: () => void;
}) {
  const allAnswered =
    scheme.questions.every(
      (question) => answers[question],
    );

  const uploaded =
    scheme.documents.every(
      (document) => files[document],
    );

  return (
    <>
      <div>
        <span className="application-kicker font-semibold uppercase tracking-[0.16em] text-gold">
          Pre-qualification
        </span>

        <h2 className="mt-1 application-title font-bold text-foreground">
          Check your application
        </h2>

        <p className="mt-2 application-description leading-5 text-muted-foreground">
          Answer a few questions and prepare your
          documents. This is a frontend discovery preview;
          final eligibility must be verified against the
          scheme rules.
        </p>
      </div>

      <div className="mt-5 space-y-2.5 sm:mt-7">
        {scheme.questions.map(
          (question, index) => (
            <div
              key={question}
              className="rounded-2xl border border-border/60 bg-surface/25 p-3.5 sm:p-4"
            >
              <div className="flex gap-3">
                <span className="flex size-7 shrink-0 items-center justify-center rounded-lg bg-gold/10 question-number font-bold text-gold">
                  {index + 1}
                </span>

                <div className="min-w-0 flex-1">
                  <p className="application-question font-semibold leading-5 text-foreground">
                    {question}
                  </p>

                  <div className="mt-2.5 flex gap-2">
                    {(
                      ["yes", "no"] as const
                    ).map((value) => (
                      <button
                        key={value}
                        type="button"
                        onClick={() =>
                          onAnswer(
                            question,
                            value,
                          )
                        }
                        className={cn(
                          "min-w-14 rounded-lg border px-3 py-2 answer-button font-semibold capitalize",
                          answers[question] ===
                            value
                            ? "border-gold/35 bg-gold/10 text-gold"
                            : "border-border bg-background/20 text-muted-foreground",
                        )}
                      >
                        {value}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ),
        )}
      </div>

      <section className="mt-6 sm:mt-7">
        <div className="flex items-end justify-between">
          <div>
            <h3 className="drawer-section-title font-bold text-foreground">
              Required documents
            </h3>

            <p className="mt-1 documents-description text-muted-foreground">
              Upload PDF, JPG or PNG files.
            </p>
          </div>

          <span className="documents-count font-semibold text-muted-foreground">
            {
              Object.values(files).filter(
                Boolean,
              ).length
            }
            /
            {scheme.documents.length}
          </span>
        </div>

        <div className="mt-3 space-y-2">
          {scheme.documents.map(
            (document) => (
              <label
                key={document}
                className={cn(
                  "flex cursor-pointer items-center gap-3 rounded-xl border border-dashed px-3 py-2.5",
                  files[document]
                    ? "border-mint/25 bg-mint/[0.04]"
                    : "border-border bg-surface/20",
                )}
              >
                <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-background/60">
                  {files[document] ? (
                    <Check className="size-3.5 text-mint" />
                  ) : (
                    <Upload className="size-3.5 text-gold" />
                  )}
                </span>

                <span className="min-w-0 flex-1">
                  <span className="block document-name font-semibold text-foreground">
                    {document}
                  </span>

                  <span className="mt-0.5 block scheme-card-ministry truncate text-muted-foreground">
                    {files[document]
                      ?.name ??
                      "Click to upload"}
                  </span>
                </span>

                <input
                  type="file"
                  accept=".pdf,.jpg,.jpeg,.png"
                  className="hidden"
                  onChange={(e) =>
                    onFile(
                      document,
                      e.target.files?.[0] ??
                        null,
                    )
                  }
                />
              </label>
            ),
          )}
        </div>
      </section>

      <div className="mt-6 rounded-2xl border border-mint/10 bg-mint/[0.035] p-3.5">
        <div className="flex items-start gap-3">
          <ShieldCheck className="mt-0.5 size-4 shrink-0 text-mint" />

          <div>
            <p className="what-next-title font-semibold text-foreground">
              What happens next
            </p>

            <p className="mt-1 what-next-text leading-5 text-muted-foreground">
              Bharat Udyam uses the profile and application
              information to prepare a readiness preview.
              This demo does not send uploaded documents to
              a server.
            </p>
          </div>
        </div>
      </div>

      <button
        type="button"
        disabled={
          !allAnswered || !uploaded
        }
        onClick={onSubmit}
        className="mt-5 flex min-h-11 w-full items-center justify-center gap-2 rounded-xl bg-gradient-gold px-4 py-3.5 success-dashboard-button font-semibold text-primary-foreground disabled:cursor-not-allowed disabled:opacity-40"
      >
        Submit application for review

        <ArrowRight className="size-3.5" />
      </button>

      <p className="mt-3 text-center document-file text-muted-foreground/55">
        Demo frontend only — documents are not
        uploaded to a server yet.
      </p>
    </>
  );
}

/* -------------------------------------------------------------------------- */
/* SUCCESS                                                                    */
/* -------------------------------------------------------------------------- */

function SubmissionSuccess({
  scheme,
}: {
  scheme: Scheme;
}) {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center text-center">
      <span className="flex size-14 items-center justify-center rounded-2xl bg-mint/10">
        <BadgeCheck className="size-7 text-mint" />
      </span>

      <p className="mt-5 success-kicker font-semibold uppercase tracking-[0.18em] text-mint">
        Application created
      </p>

      <h2 className="mt-2 success-title font-bold text-foreground">
        You&apos;re ready for the next step.
      </h2>

      <p className="mt-3 max-w-md success-description leading-5 text-muted-foreground">
        Your frontend application for{" "}
        <span className="font-semibold text-foreground">
          {scheme.shortName}
        </span>{" "}
        has been saved locally. The eligibility and
        financial scoring preview can be connected to the
        real backend later.
      </p>

      <div className="mt-5 grid w-full max-w-md grid-cols-2 gap-2.5">
        <ScorePreview
          title="Eligibility preview"
          score={86}
        />

        <ScorePreview
          title="Financial readiness"
          score={74}
        />
      </div>

      <Link
        to="/dashboard"
        className="mt-6 flex min-h-11 items-center gap-2 rounded-xl bg-gradient-gold px-5 py-3 success-dashboard-button font-semibold text-primary-foreground"
      >
        Go to dashboard

        <ArrowRight className="size-3.5" />
      </Link>
    </div>
  );
}

function ScorePreview({
  title,
  score,
}: {
  title: string;
  score: number;
}) {
  return (
    <div className="rounded-xl border border-border/60 bg-surface/25 p-3 text-left sm:p-4">
      <p className="score-title uppercase tracking-[0.12em] text-muted-foreground">
        {title}
      </p>

      <p className="mt-1 score-value font-bold text-gradient-gold">
        {score}
      </p>

      <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-surface-2">
        <div
          className="h-full rounded-full bg-gradient-gold"
          style={{
            width: `${score}%`,
          }}
        />
      </div>
    </div>
  );
}