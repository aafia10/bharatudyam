import { Star } from "lucide-react";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

const testimonials = [
  { quote: "Found ₹15L subsidy in just 2 days!", name: "Rajesh Kumar", role: "Manufacturing Unit Owner" },
  {
    quote: "AI recommendations were spot on. Highly recommended!",
    name: "Priya Sharma",
    role: "Textile Business",
  },
  {
    quote: "Simplified the entire process. Got approval in record time.",
    name: "Amit Patel",
    role: "Food Processing MSME",
  },
];

export function Testimonials() {
  return (
    <section className="mx-auto max-w-[1400px] px-6 py-24">
      <SectionHeading plain="Trusted by" highlight="MSMEs" />

      <div className="mt-16 grid gap-8 md:grid-cols-3">
        {testimonials.map((item, i) => (
          <Reveal key={item.name} delay={i * 110}>
            <div className="h-full rounded-2xl border border-border bg-card p-8 shadow-card transition-all duration-500 hover:-translate-y-2 hover:border-gold/35">
              <div className="flex gap-1">
                {Array.from({ length: 5 }).map((_, s) => (
                  <Star key={s} className="size-5 fill-star text-star" />
                ))}
              </div>
              <p className="mt-6 text-[17px] leading-relaxed text-foreground/90">{item.quote}</p>
              <p className="mt-7 text-[17px] font-semibold text-foreground">{item.name}</p>
              <p className="mt-1 text-[15px] text-muted-foreground">{item.role}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
