import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/msme/Navbar";
import { Hero } from "@/components/msme/Hero";
import { HowItWorks } from "@/components/msme/HowItWorks";
import { FeaturedSchemes } from "@/components/msme/FeaturedSchemes";
import { Stats } from "@/components/msme/Stats";
import { WhyChooseUs } from "@/components/msme/WhyChooseUs";
import { Testimonials } from "@/components/msme/Testimonials";
import { Footer } from "@/components/msme/Footer";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "MSME Assist — AI-Powered MSME Scheme Discovery" },
      {
        name: "description",
        content:
          "Find government schemes, subsidies, loans, and incentives tailored to your MSME instantly with AI-powered eligibility matching.",
      },
      { property: "og:title", content: "MSME Assist — AI-Powered MSME Scheme Discovery" },
      {
        property: "og:description",
        content:
          "Discover subsidies, loans, and incentives for your business instantly with AI eligibility scoring.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <Hero />
        <HowItWorks />
        <FeaturedSchemes />
        <Stats />
        <WhyChooseUs />
        <Testimonials />
      </main>
      <Footer />
    </div>
  );
}
