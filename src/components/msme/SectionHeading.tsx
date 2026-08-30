import { Reveal } from "./Reveal";

export function SectionHeading({
  plain,
  highlight,
  subtitle,
}: {
  plain: string;
  highlight: string;
  subtitle?: string;
}) {
  return (
    <Reveal className="text-center">
      <h2 className="text-[44px] font-bold leading-tight text-foreground sm:text-[54px]">
        {plain} <span className="text-gradient-gold">{highlight}</span>
      </h2>
      {subtitle ? <p className="mt-5 text-lg text-muted-foreground">{subtitle}</p> : null}
    </Reveal>
  );
}
