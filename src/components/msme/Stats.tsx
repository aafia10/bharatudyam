import { IndianRupee, Shield, Users } from "lucide-react";
import { Reveal } from "./Reveal";

const stats = [
  { icon: Users, value: "10,000+", label: "MSMEs Assisted" },
  { icon: IndianRupee, value: "₹100Cr+", label: "Subsidies Discovered" },
  { icon: Shield, value: "5,000+", label: "Verified Businesses" },
];

export function Stats() {
  return (
    <section className="mx-auto max-w-[1400px] px-6 py-16">
      <Reveal>
        <div className="panel grid gap-12 px-8 py-14 sm:grid-cols-3">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <stat.icon className="mx-auto size-10 text-violet" strokeWidth={2} />
              <p className="text-gradient-gold mt-6 text-[46px] font-bold leading-none">
                {stat.value}
              </p>
              <p className="mt-4 text-lg text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
