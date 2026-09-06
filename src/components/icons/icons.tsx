type IconProps = { className?: string };

const iconBase = {
  viewBox: "0 0 24 24",
  fill: "none" as const,
  stroke: "currentColor",
  strokeWidth: 1.75,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

export function MailIcon({ className }: IconProps) {
  return (
    <svg {...iconBase} className={className}>
      <rect x="3" y="5" width="18" height="14" rx="2.5" />
      <path d="M3.5 6.5 12 13l8.5-6.5" />
    </svg>
  );
}

export function LockIcon({ className }: IconProps) {
  return (
    <svg {...iconBase} className={className}>
      <rect x="4.5" y="10.5" width="15" height="10" rx="2.5" />
      <path d="M7.5 10.5V7.75a4.5 4.5 0 0 1 9 0v2.75" />
    </svg>
  );
}

export function UserIcon({ className }: IconProps) {
  return (
    <svg {...iconBase} className={className}>
      <circle cx="12" cy="8" r="3.5" />
      <path d="M4.5 20c1.2-3.6 4-5.5 7.5-5.5s6.3 1.9 7.5 5.5" />
    </svg>
  );
}

export function EyeIcon({ className }: IconProps) {
  return (
    <svg {...iconBase} className={className}>
      <path d="M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12Z" />
      <circle cx="12" cy="12" r="2.75" />
    </svg>
  );
}

export function EyeOffIcon({ className }: IconProps) {
  return (
    <svg {...iconBase} className={className}>
      <path d="M3.5 3.5l17 17" />
      <path d="M10.6 5.7A10.6 10.6 0 0 1 12 5.5c6 0 9.5 6.5 9.5 6.5a13.6 13.6 0 0 1-3.15 3.85M7.4 7.35C4.9 8.85 3.5 11 2.5 12c0 0 3.06 6.13 8.6 6.48" />
      <path d="M9.7 10.2a2.75 2.75 0 0 0 3.95 3.8" />
    </svg>
  );
}

export function FlameIcon({ className }: IconProps) {
  return (
    <svg {...iconBase} className={className} strokeWidth={1.6}>
      <path d="M12 3.5c.6 2.1-.4 3.4-1.6 4.6-1.6 1.6-2.9 3.2-2.9 5.4a4.5 4.5 0 0 0 9 0c0-1.3-.4-2.2-1-3.1-.3.9-.9 1.5-1.6 1.5-.9 0-1.5-.8-1.3-1.7.3-1.5-.3-3-1.6-3.9-.2 1-.6 1.7-1.3 2.2-.3-1.7 0-3.4 1.3-5Z" />
    </svg>
  );
}
