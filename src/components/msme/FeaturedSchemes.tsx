import {
  ArrowRight,
  BadgeCheck,
  Building2,
  CheckCircle2,
  CircleHelp,
  FileText,
  IndianRupee,
  ShieldCheck,
  X,
} from "lucide-react";
import { useState } from "react";

import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

type Scheme = {
  name: string;
  shortName: string;
  desc: string;
  tag: string;
  category: string;
  overview: string;
  benefits: string[];
  eligibility: string[];
  documents: string[];
  application: string;
};

export const schemes: Scheme[] = [
  {
    name: "Prime Minister's Employment Generation Programme",
    shortName: "PMEGP",
    desc: "Credit-linked subsidy programme for establishing new micro enterprises.",
    tag: "15–35% Subsidy",
    category: "Finance & Employment",
    overview:
      "PMEGP is a credit-linked subsidy programme designed to create self-employment opportunities by supporting the establishment of new micro-enterprises in the non-farm sector.",
    benefits: [
      "Margin money subsidy for eligible applicants",
      "Project support for manufacturing activities",
      "Project support for business and service activities",
      "Designed to encourage self-employment and job creation",
    ],
    eligibility: [
      "Primarily supports new projects",
      "Individual entrepreneurs can apply",
      "Manufacturing and service activities are covered subject to scheme conditions",
      "Applicant must satisfy the applicable PMEGP requirements",
    ],
    documents: [
      "Identity proof",
      "Address proof",
      "Business/project information",
      "Project report",
      "Bank-related documents",
      "Applicable registration documents",
    ],
    application:
      "Bharat Udyam will guide you through the application process. Before starting, we will check your basic eligibility, identify the documents required and help you complete the necessary steps.",
  },

  {
    name: "Credit Guarantee Scheme for Micro & Small Enterprises",
    shortName: "CGTMSE",
    desc: "Credit guarantee support that helps eligible MSEs access institutional credit.",
    tag: "Up to ₹10Cr",
    category: "Credit & Finance",
    overview:
      "CGTMSE provides credit guarantee support to eligible micro and small enterprises through member lending institutions, helping improve access to institutional credit where collateral may otherwise be a constraint.",
    benefits: [
      "Credit guarantee support for eligible facilities",
      "Helps reduce collateral-related barriers",
      "Supports institutional lending to MSEs",
      "Guarantee coverage varies according to applicable conditions",
    ],
    eligibility: [
      "Eligible micro and small enterprises",
      "Credit facility must be from an eligible lending institution",
      "The proposed facility must satisfy CGTMSE guidelines",
      "Final eligibility depends on applicable lending and guarantee conditions",
    ],
    documents: [
      "Udyam registration details",
      "PAN",
      "GST details where applicable",
      "Financial statements",
      "Banking information",
      "Loan/project documents",
    ],
    application:
      "Bharat Udyam will first assess your business and financial profile, then guide you through the required pre-qualification and documentation process before proceeding with the application.",
  },

  {
    name: "Zero Defect Zero Effect Certification",
    shortName: "ZED Certification",
    desc: "Quality and sustainability support helping MSMEs improve manufacturing standards.",
    tag: "Cost Assistance",
    category: "Quality & Sustainability",
    overview:
      "The ZED initiative encourages MSMEs to improve product quality while reducing environmental impact. It focuses on manufacturing competitiveness, quality systems and sustainable production.",
    benefits: [
      "Support towards ZED certification",
      "Encourages improved product quality",
      "Promotes environmentally responsible manufacturing",
      "Helps businesses improve competitiveness",
    ],
    eligibility: [
      "MSMs meeting the applicable certification requirements",
      "Udyam registration may be relevant to scheme participation",
      "Business must satisfy the applicable ZED criteria",
    ],
    documents: [
      "Udyam registration",
      "Business information",
      "Manufacturing details",
      "Quality-related information",
      "Certification-related documents",
    ],
    application:
      "Bharat Udyam will guide you through the certification journey, including eligibility assessment, document preparation and the next steps required for your business.",
  },

  {
    name: "Credit Linked Capital Subsidy – Technology Upgradation",
    shortName: "CLCS-TUS",
    desc: "Technology-upgradation support for eligible micro and small enterprises.",
    tag: "Capital Subsidy",
    category: "Technology",
    overview:
      "Technology upgradation programmes help eligible MSEs modernise their production capabilities, improve productivity and adopt better technology.",
    benefits: [
      "Support for technology upgradation",
      "Improved production efficiency",
      "Encourages modern machinery and technology",
      "Can improve product quality and competitiveness",
    ],
    eligibility: [
      "Eligible micro and small enterprises",
      "Technology or machinery must satisfy applicable programme conditions",
      "Business must meet the relevant scheme guidelines",
    ],
    documents: [
      "Udyam registration",
      "Business registration details",
      "Machinery quotation or invoices",
      "Financial information",
      "Technology/project details",
    ],
    application:
      "Bharat Udyam will evaluate your business profile and technology requirement first, then guide you through the required documents, eligibility checks and application preparation.",
  },

  {
    name: "Lean Manufacturing Competitiveness Scheme",
    shortName: "Lean Manufacturing",
    desc: "Support for improving productivity, efficiency and manufacturing competitiveness.",
    tag: "Up to 90% Cost",
    category: "Manufacturing",
    overview:
      "The Lean Manufacturing initiative helps MSMEs reduce waste, improve productivity and strengthen manufacturing processes through structured lean practices.",
    benefits: [
      "Improved operational efficiency",
      "Reduction of manufacturing waste",
      "Better productivity and quality",
      "Support for adoption of lean manufacturing practices",
    ],
    eligibility: [
      "Eligible MSMEs",
      "Manufacturing enterprises can benefit from applicable interventions",
      "Participation is subject to the current programme guidelines",
    ],
    documents: [
      "Udyam registration",
      "Business details",
      "Manufacturing process information",
      "Enterprise information",
      "Applicable project documents",
    ],
    application:
      "Bharat Udyam will take you through a guided eligibility and documentation process before you proceed with the scheme application.",
  },

  {
    name: "Digital MSME",
    shortName: "Digital MSME",
    desc: "Support for adopting digital tools and solutions for MSME operations.",
    tag: "Up to ₹2L",
    category: "Digital Transformation",
    overview:
      "Digitalisation initiatives help MSMEs adopt digital solutions that can improve business operations, productivity, market access and competitiveness.",
    benefits: [
      "Support for digital adoption",
      "Improved business efficiency",
      "Technology-enabled operations",
      "Better access to digital business tools",
    ],
    eligibility: [
      "Eligible MSMEs",
      "Enterprise must satisfy the applicable programme conditions",
      "Digital solution or activity must fall within the supported scope",
    ],
    documents: [
      "Udyam registration",
      "Business information",
      "Digitalisation/project details",
      "Invoices or quotations where applicable",
      "Bank/account information where required",
    ],
    application:
      "Bharat Udyam will help you determine whether the scheme fits your business, collect the required information and guide you through the application journey.",
  },
];

export function FeaturedSchemes() {
  const [selectedScheme, setSelectedScheme] = useState<Scheme | null>(null);

  return (
    <>
      <section className="relative mx-auto max-w-[1400px] px-5 py-20 sm:px-6 sm:py-24">
        <div className="bg-aurora pointer-events-none absolute inset-x-0 top-10 -z-10 h-[520px] blur-2xl" />

        <SectionHeading
          plain="Featured MSME"
          highlight="Schemes"
          subtitle="Explore popular government support programmes for Indian businesses"
        />

        <div className="mt-12 grid gap-6 sm:mt-16 md:grid-cols-2 lg:grid-cols-3">
          {schemes.map((scheme, i) => (
            <Reveal key={scheme.shortName} delay={(i % 3) * 110}>
              <article className="glass card-edge hover-glow group flex h-full flex-col rounded-2xl p-6 transition-all duration-500 hover:-translate-y-2 hover:border-gold/35 sm:p-8">
                <div className="flex items-start justify-between gap-4">
                  <span className="flex size-13 shrink-0 items-center justify-center rounded-2xl bg-gradient-gold transition-transform duration-500 group-hover:rotate-6">
                    <Building2
                      className="size-6 text-primary-foreground"
                      strokeWidth={2.2}
                    />
                  </span>

                  <span className="rounded-full bg-gradient-gold px-3 py-1.5 text-[11px] font-semibold text-primary-foreground sm:text-[12px]">
                    {scheme.tag}
                  </span>
                </div>

                <div className="mt-6">
                  <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-gold">
                    {scheme.category}
                  </span>

                  <h3 className="mt-2 text-xl font-bold text-foreground sm:text-2xl">
                    {scheme.shortName}
                  </h3>

                  <p className="mt-3 line-clamp-3 text-[14px] leading-6 text-muted-foreground sm:text-[15px]">
                    {scheme.desc}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => setSelectedScheme(scheme)}
                  className="mt-7 flex w-full items-center justify-center gap-2 rounded-xl bg-secondary py-3.5 text-[14px] font-semibold text-secondary-foreground transition-all duration-300 hover:bg-secondary/80 hover:text-gold"
                >
                  View Scheme Details
                  <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
                </button>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      {selectedScheme ? (
        <SchemeDetails
          scheme={selectedScheme}
          onClose={() => setSelectedScheme(null)}
        />
      ) : null}
    </>
  );
}

function SchemeDetails({
  scheme,
  onClose,
}: {
  scheme: Scheme;
  onClose: () => void;
}) {
  return (
    <div
      className="fixed inset-0 z-[100] flex items-end justify-center bg-black/60 p-0 backdrop-blur-sm sm:items-center sm:p-6"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
    >
      <div className="relative max-h-[92vh] w-full overflow-hidden rounded-t-3xl border border-border bg-background shadow-2xl sm:max-w-4xl sm:rounded-3xl">
        {/* Header */}
        <div className="border-b border-border bg-surface/80 px-5 py-5 sm:px-7 sm:py-6">
          <div className="flex items-start justify-between gap-5">
            <div className="flex min-w-0 items-start gap-4">
              <span className="hidden size-12 shrink-0 items-center justify-center rounded-xl bg-gradient-gold sm:flex">
                <Building2 className="size-5 text-primary-foreground" />
              </span>

              <div className="min-w-0">
                <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-gold">
                  {scheme.category}
                </p>

                <h2 className="mt-1 text-xl font-bold text-foreground sm:text-2xl">
                  {scheme.name}
                </h2>

                <p className="mt-1 text-sm text-muted-foreground">
                  {scheme.shortName} · {scheme.tag}
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="flex size-9 shrink-0 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
              aria-label="Close scheme details"
            >
              <X className="size-4" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="max-h-[calc(92vh-100px)] overflow-y-auto px-5 py-6 sm:px-7 sm:py-7">
          <div className="grid gap-8 lg:grid-cols-[1.5fr_1fr]">
            <div className="space-y-7">
              {/* Overview */}
              <section>
                <SectionTitle
                  icon={<FileText className="size-4" />}
                  title="Overview"
                />

                <p className="mt-3 text-[14px] leading-7 text-muted-foreground">
                  {scheme.overview}
                </p>
              </section>

              {/* Benefits */}
              <section>
                <SectionTitle
                  icon={<IndianRupee className="size-4" />}
                  title="Key Benefits"
                />

                <ul className="mt-3 space-y-3">
                  {scheme.benefits.map((benefit) => (
                    <li
                      key={benefit}
                      className="flex items-start gap-3 text-[13.5px] leading-6 text-muted-foreground"
                    >
                      <CheckCircle2 className="mt-1 size-4 shrink-0 text-mint" />
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
              </section>

              {/* Eligibility */}
              <section>
                <SectionTitle
                  icon={<BadgeCheck className="size-4" />}
                  title="Eligibility"
                />

                <ul className="mt-3 space-y-3">
                  {scheme.eligibility.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-3 text-[13.5px] leading-6 text-muted-foreground"
                    >
                      <span className="mt-2 size-1.5 shrink-0 rounded-full bg-gold" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </section>
            </div>

            <aside className="space-y-5">
              {/* Documents */}
              <div className="rounded-2xl border border-border bg-surface/50 p-5">
                <SectionTitle
                  icon={<FileText className="size-4" />}
                  title="Documents Usually Required"
                />

                <ul className="mt-4 space-y-3">
                  {scheme.documents.map((document) => (
                    <li
                      key={document}
                      className="flex items-start gap-2.5 text-[13px] text-muted-foreground"
                    >
                      <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-mint" />
                      {document}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Application path */}
              <div className="rounded-2xl border border-gold/20 bg-gold/5 p-5">
                <SectionTitle
                  icon={<ShieldCheck className="size-4" />}
                  title="How to Apply"
                />

                <p className="mt-3 text-[13px] leading-6 text-muted-foreground">
                  {scheme.application}
                </p>

                {/* Future internal application button */}
                <button
                  type="button"
                  onClick={() => {
                    // Future:
                    // Open Bharat Udyam's guided application flow.
                    //
                    // Planned flow:
                    // 1. Pre-qualification
                    // 2. Eligibility assessment
                    // 3. Document checklist
                    // 4. Document upload
                    // 5. Financial assessment
                    // 6. Application preparation
                    // 7. Application submission
                    // 8. Status tracking
                  }}
                  className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-gold px-4 py-3 text-[13px] font-semibold text-primary-foreground transition-all hover:-translate-y-0.5"
                >
                  Start Application
                  <ArrowRight className="size-4" />
                </button>
              </div>

              {/* Information note */}
              <div className="flex gap-3 rounded-xl border border-border bg-surface-2/40 p-4">
                <CircleHelp className="mt-0.5 size-4 shrink-0 text-muted-foreground" />

                <p className="text-[11.5px] leading-5 text-muted-foreground">
                  Eligibility, benefits, limits and documentation can depend
                  on the current government guidelines and your business
                  profile. Bharat Udyam will perform a detailed eligibility
                  assessment before you proceed.
                </p>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </div>
  );
}

function SectionTitle({
  icon,
  title,
}: {
  icon: React.ReactNode;
  title: string;
}) {
  return (
    <div className="flex items-center gap-2 text-[15px] font-semibold text-foreground">
      <span className="flex size-7 items-center justify-center rounded-lg bg-gold/10 text-gold">
        {icon}
      </span>

      {title}
    </div>
  );
}