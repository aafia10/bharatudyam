import { useState } from "react";
import { toast } from "sonner";

export function GoogleButton({
  label = "Continue with Google",
}: {
  label?: string;
}) {
  const [loading, setLoading] = useState(false);

  function handleClick() {
    setLoading(true);

    // Google authentication will be connected later.
    setTimeout(() => {
      setLoading(false);
      toast.info("Google sign-in will be available soon.");
    }, 500);
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={loading}
      className="flex w-full items-center justify-center gap-3 rounded-xl border border-input bg-surface-2/50 px-4 py-3 text-[15px] font-semibold text-foreground transition-all duration-300 hover:border-gold/40 hover:bg-surface-2 disabled:opacity-60"
    >
      <svg
        viewBox="0 0 24 24"
        className="size-[18px]"
        aria-hidden="true"
      >
        <path
          fill="#EA4335"
          d="M12 10.2v3.9h5.5c-.24 1.4-1.7 4.1-5.5 4.1A6.2 6.2 0 0 1 12 5.8c1.6 0 2.9.6 3.8 1.5l2.7-2.6A9.6 9.6 0 0 0 12 2a10 10 0 0 0 0 20c5.8 0 9.6-4.1 9.6-9.8 0-.7-.1-1.3-.2-2z"
        />
      </svg>

      {loading ? "Connecting…" : label}
    </button>
  );
}