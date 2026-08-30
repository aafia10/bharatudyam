import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/msme/Navbar";
import { FeaturedSchemes } from "@/components/msme/FeaturedSchemes";
import { Footer } from "@/components/msme/Footer";

export const Route = createFileRoute("/schemes")({
  head: () => ({
    meta: [
      { title: "MSME Schemes — Subsidies, Loans & Incentives | MSME Assist" },
      {
        name: "description",
        content:
          "Browse featured Indian MSME schemes including PMEGP, CGTMSE, ZED Certification, CLCS-TUS, Lean Manufacturing, and Digital MSME.",
      },
      { property: "og:title", content: "MSME Schemes — Subsidies, Loans & Incentives" },
      {
        property: "og:description",
        content: "Explore popular government schemes available for Indian MSMEs.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Schemes,
});

function Schemes() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="bg-hero">
        <FeaturedSchemes />
      </main>
      <Footer />
    </div>
  );
}
