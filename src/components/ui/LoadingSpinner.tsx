import React from "react";

export type LoadingSpinnerSize = "sm" | "md" | "lg";

export type LoadingSpinnerProps = {
  /** Optional label shown under the spinner, e.g. "Signing in..." */
  text?: string;
  /** Visual size of the spinner. Defaults to 'md'. */
  size?: LoadingSpinnerSize;
  /** Extra classes for the outer wrapper, if needed for placement. */
  className?: string;
};

const RING_SIZES: Record<LoadingSpinnerSize, string> = {
  sm: "h-6 w-6 border-2",
  md: "h-10 w-10 border-[3px]",
  lg: "h-16 w-16 border-4",
};

const TEXT_SIZES: Record<LoadingSpinnerSize, string> = {
  sm: "text-[12px]",
  md: "text-[13.5px]",
  lg: "text-[15px]",
};

const GLOW_SIZES: Record<LoadingSpinnerSize, string> = {
  sm: "h-8 w-8",
  md: "h-14 w-14",
  lg: "h-24 w-24",
};

/**
 * Reusable loading indicator for Study Space. Self-contained — no imports
 * from the rest of the app — so it can be dropped into any page or
 * component. Not wired to any auth/data flow; just visual state.
 *
 * @example
 * <LoadingSpinner />
 * <LoadingSpinner text="Signing in..." />
 * <LoadingSpinner size="lg" text="Creating account..." />
 */
export default function LoadingSpinner({
  text,
  size = "md",
  className = "",
}: LoadingSpinnerProps) {
  return (
    <div
      className={`flex flex-col items-center justify-center gap-3 ${className}`}
    >
      <div className="relative flex items-center justify-center">
        <span
          className={`pointer-events-none absolute rounded-full bg-[#E3A567]/25 blur-md animate-pulse ${GLOW_SIZES[size]}`}
        />
        <span
          className={`relative rounded-full border-[#3A2C22] border-t-[#E3A567] animate-spin [animation-duration:0.85s] ${RING_SIZES[size]}`}
        />
      </div>

      {text && (
        <p
          className={`text-[#B8A99A] ${TEXT_SIZES[size]}`}
          style={{ fontFamily: "'Manrope', sans-serif" }}
        >
          {text}
        </p>
      )}
    </div>
  );
}
