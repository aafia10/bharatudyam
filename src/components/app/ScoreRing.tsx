export function ScoreRing({
  score,
  color,
  size = 74,
}: {
  score: number;
  color: string;
  size?: number;
}) {
  const stroke = 7;
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  return (
    <svg width={size} height={size} className="shrink-0 -rotate-90">
      <circle
        cx={size / 2}
        cy={size / 2}
        r={r}
        fill="none"
        strokeWidth={stroke}
        stroke="var(--surface-2)"
      />
      <circle
        cx={size / 2}
        cy={size / 2}
        r={r}
        fill="none"
        strokeWidth={stroke}
        stroke={color}
        strokeLinecap="round"
        strokeDasharray={c}
        strokeDashoffset={c - (c * score) / 100}
        style={{ transition: "stroke-dashoffset 1.2s cubic-bezier(0.22,1,0.36,1)" }}
      />
      <text
        x="50%"
        y="50%"
        dominantBaseline="central"
        textAnchor="middle"
        className="fill-foreground text-[15px] font-bold"
        transform={`rotate(90 ${size / 2} ${size / 2})`}
      >
        {score}
      </text>
    </svg>
  );
}