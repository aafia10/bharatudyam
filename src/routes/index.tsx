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
      {
        title: "Bharat Udyam — AI-Powered MSME Scheme Discovery",
      },
      {
        name: "description",
        content:
          "Discover government schemes, subsidies, loans and incentives for your MSME across India with AI-powered scheme discovery.",
      },
      {
        property: "og:title",
        content:
          "Bharat Udyam — AI-Powered MSME Scheme Discovery",
      },
      {
        property: "og:description",
        content:
          "Discover government schemes, subsidies, loans and incentives for your MSME across India.",
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

  component: Index,
});

function Index() {
  return (
    <div className="min-h-screen overflow-x-hidden bg-background">
      <Navbar />

      <main>
        <Hero />

        <HowItWorks />

        <div id="featured-schemes">
          <FeaturedSchemes />
        </div>

        <Stats />

        <WhyChooseUs />

        <Testimonials />
      </main>

      <Footer />
    </div>
  );
}