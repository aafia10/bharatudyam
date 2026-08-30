import logo from "../assets/msme-logo.png";
import { cn } from "@/lib/utils";

export function Logo({
  className,
  size = 44,
}: {
  className?: string;
  size?: number;
}) {
  return (
    <span
      className={cn("logo-ring relative inline-flex items-center justify-center", className)}
      style={{ width: size, height: size }}
    >
      <img
        src={logo}
        alt="MSME Assist logo"
        width={size}
        height={size}
        className="relative z-10 size-[72%] object-contain"
      />
    </span>
  );
}