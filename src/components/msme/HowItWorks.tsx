import { FileCheck2, Search, Target, UploadCloud, User } from "lucide-react";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

const steps = [
  { icon: User, title: "Create Business Profile", text: "Add your business details in minutes" },
  { icon: Target, title: "AI Eligibility Check", text: "Our AI analyzes your data instantly" },
  { icon: UploadCloud, title: "Upload Documents", text: "Secure document verification" },
  { icon: Search, title: "Discover Schemes", text: "Get personalized matches" },
  { icon: FileCheck2, title: "Track Applications", text: "Monitor application status" },
];

export function HowItWorks() {
  return (
    <section className="mx-auto max-w-[1400px] px-6 py-24">
      <SectionHeading
        plain="How It"
        highlight="Works"
        subtitle="Simple steps to discover your eligible schemes"
      />

      <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
        {steps.map((step, i) => (
          <Reveal key={step.title} delay={i * 90}>
            <div className="glass card-edge hover-glow group h-full p-7 hover:-translate-y-2 hover:border-gold/35">
              <span className="flex size-14 items-center justify-center rounded-2xl bg-gradient-gold transition-transform duration-500 group-hover:scale-110">
                <step.icon className="size-6 text-primary-foreground" strokeWidth={2.2} />
              </span>
              <h3 className="mt-7 text-xl font-semibold text-foreground">{step.title}</h3>
              <p className="mt-3 text-[15px] leading-relaxed text-muted-foreground">{step.text}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
