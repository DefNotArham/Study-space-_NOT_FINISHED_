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

export function CheckIcon({ className }: IconProps) {
  return (
    <svg {...iconBase} className={className}>
      <path d="M4.5 12.5 9.5 17.5 19.5 6.5" />
    </svg>
  );
}

export function HomeIcon({ className }: IconProps) {
  return (
    <svg {...iconBase} className={className}>
      <path d="M4 11.5 12 4l8 7.5" />
      <path d="M6 10v9.5a1 1 0 0 0 1 1h3.5v-6h3v6H17a1 1 0 0 0 1-1V10" />
    </svg>
  );
}

export function BookIcon({ className }: IconProps) {
  return (
    <svg {...iconBase} className={className}>
      <path d="M4 5.5c2.2-1 5-1.2 8 .3v13c-3-1.5-5.8-1.3-8-.3Z" />
      <path d="M20 5.5c-2.2-1-5-1.2-8 .3v13c3-1.5 5.8-1.3 8-.3Z" />
    </svg>
  );
}

export function ChecklistIcon({ className }: IconProps) {
  return (
    <svg {...iconBase} className={className}>
      <rect x="4.5" y="4" width="15" height="16" rx="2.5" />
      <path d="M8 9.5 9.5 11l3-3.2" />
      <path d="M8 16h8" />
      <path d="M8 12.5h3.5" />
    </svg>
  );
}

export function NotebookIcon({ className }: IconProps) {
  return (
    <svg {...iconBase} className={className}>
      <rect x="5" y="3.5" width="14" height="17" rx="2" />
      <path d="M8.5 3.5v17" />
      <path d="M12 8.5h4M12 12h4" />
    </svg>
  );
}

export function GearIcon({ className }: IconProps) {
  return (
    <svg {...iconBase} className={className}>
      <circle cx="12" cy="12" r="3" />
      <path d="M12 3.5v2.2M12 18.3v2.2M18.5 6.3l-1.55 1.55M7.05 16.15 5.5 17.7M20.5 12h-2.2M5.7 12H3.5M18.5 17.7l-1.55-1.55M7.05 7.85 5.5 6.3" />
    </svg>
  );
}

export function LogoutIcon({ className }: IconProps) {
  return (
    <svg {...iconBase} className={className}>
      <path d="M9.5 4.5H6a1.5 1.5 0 0 0-1.5 1.5v12A1.5 1.5 0 0 0 6 19.5h3.5" />
      <path d="M14.5 15.5 19 11l-4.5-4.5" />
      <path d="M19 11H9.5" />
    </svg>
  );
}

export function PlayIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className}>
      <path d="M8 5.5v13l11-6.5Z" fill="currentColor" />
    </svg>
  );
}

export function PauseIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className}>
      <rect x="6.5" y="5" width="4" height="14" rx="1" fill="currentColor" />
      <rect x="13.5" y="5" width="4" height="14" rx="1" fill="currentColor" />
    </svg>
  );
}

export function MenuIcon({ className }: IconProps) {
  return (
    <svg {...iconBase} className={className}>
      <path d="M4 6.5h16M4 12h16M4 17.5h16" />
    </svg>
  );
}

export function CloseIcon({ className }: IconProps) {
  return (
    <svg {...iconBase} className={className}>
      <path d="M5.5 5.5l13 13M18.5 5.5l-13 13" />
    </svg>
  );
}

export function KanbanIcon({ className }: IconProps) {
  return (
    <svg {...iconBase} className={className}>
      <rect x="4" y="4" width="16" height="16" rx="2.5" />
      <path d="M9 4v16M15 4v16" />
      <path d="M6.5 7.5h1M11.5 7.5h1M17 7.5h.5" />
    </svg>
  );
}

export function PomodoroIcon({ className }: IconProps) {
  return (
    <svg {...iconBase} className={className}>
      <path d="M9.5 4.2c1-.9 2.2-1.3 2.5-1.3s1.5.4 2.5 1.3" />
      <circle cx="12" cy="13.5" r="7.3" />
      <path d="M12 9.5v4l2.6 1.6" />
    </svg>
  );
}

export function AnalyticsIcon({ className }: IconProps) {
  return (
    <svg {...iconBase} className={className}>
      <path d="M4 16.5 9 11l4 4 6.5-7" />
      <path d="M15 7.5h4.5V12" />
    </svg>
  );
}

export function StudyRoomsIcon({ className }: IconProps) {
  return (
    <svg {...iconBase} className={className}>
      <circle cx="9" cy="8" r="3" />
      <path d="M3.5 20c1-3.4 3.4-5.2 5.5-5.2s4.5 1.8 5.5 5.2" />
      <circle cx="16.5" cy="8.5" r="2.5" />
      <path d="M14.7 12.4c.6-.15 1.15-.25 1.8-.25 2.1 0 4.5 1.8 5.5 5.2" />
    </svg>
  );
}

export function SettingsIcon({ className }: IconProps) {
  return (
    <svg {...iconBase} className={className}>
      <path d="M4 7h16" />
      <path d="M4 12h16" />
      <path d="M4 17h16" />
      <circle cx="9" cy="7" r="1.75" fill="currentColor" stroke="none" />
      <circle cx="15" cy="12" r="1.75" fill="currentColor" stroke="none" />
      <circle cx="10" cy="17" r="1.75" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function SearchIcon({ className }: IconProps) {
  return (
    <svg {...iconBase} className={className}>
      <circle cx="10.8" cy="10.8" r="6.3" />
      <path d="m16 16 4.5 4.5" />
    </svg>
  );
}

export function PlusIcon({ className }: IconProps) {
  return (
    <svg {...iconBase} className={className}>
      <path d="M12 5v14M5 12h14" />
    </svg>
  );
}

export function MoreIcon({ className }: IconProps) {
  return (
    <svg {...iconBase} className={className}>
      <circle cx="5" cy="12" r="1" fill="currentColor" stroke="none" />
      <circle cx="12" cy="12" r="1" fill="currentColor" stroke="none" />
      <circle cx="19" cy="12" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function ChevronDownIcon({ className }: IconProps) {
  return (
    <svg {...iconBase} className={className}>
      <path d="m6.5 9 5.5 5.5L17.5 9" />
    </svg>
  );
}
