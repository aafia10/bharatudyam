import { Building2, Clock, FileCheck2, Shield, Sparkles, Zap } from "lucide-react";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

const features = [
  { icon: Sparkles, title: "AI-Powered Recommendations", text: "Smart matching algorithms" },
  { icon: Shield, title: "Smart Document Verification", text: "Secure and fast processing" },
  { icon: Zap, title: "Faster Scheme Discovery", text: "Find schemes in minutes" },
  { icon: Building2, title: "Manufacturing MSME Focused", text: "Specialized for manufacturers" },
  { icon: FileCheck2, title: "Government Scheme Simplification", text: "Easy to understand process" },
  { icon: Clock, title: "24/7 Support", text: "AI chatbot assistance" },
];

export function WhyChooseUs() {
  return (
    <section className="mx-auto max-w-[1400px] px-6 py-24">
      <SectionHeading plain="Why Choose" highlight="Us" />

      <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {features.map((feature, i) => (
          <Reveal key={feature.title} delay={(i % 3) * 110}>
            <div className="group h-full rounded-2xl border border-border bg-card p-8 shadow-card transition-all duration-500 hover:-translate-y-2 hover:border-mint/30">
              <feature.icon
                className="size-8 text-mint transition-transform duration-500 group-hover:scale-110"
                strokeWidth={2}
              />
              <h3 className="mt-7 text-xl font-semibold text-foreground">{feature.title}</h3>
              <p className="mt-3 text-[15px] text-muted-foreground">{feature.text}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
