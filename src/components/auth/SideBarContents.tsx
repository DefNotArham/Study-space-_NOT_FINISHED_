import { useNavigate, useLocation } from "react-router-dom";
import type { ComponentType } from "react";
import {
  HomeIcon,
  ChecklistIcon,
  NotebookIcon,
  FlameIcon,
  LogoutIcon,
} from "../icons/icons";
import Logo from "../icons/logo";
import LoadingSpinner from "../ui/LoadingSpinner";
import { useAuthStore } from "../../stores/auth.store";

/* ------------------------------------------------------------------ */
/*  Local icons — same visual language as ../icons/icons.tsx, kept      */
/*  here because these four have no shared icon yet.                    */
/* ------------------------------------------------------------------ */

type IconProps = { className?: string };

const iconBase = {
  viewBox: "0 0 24 24",
  fill: "none" as const,
  stroke: "currentColor",
  strokeWidth: 1.75,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

function KanbanIcon({ className }: IconProps) {
  return (
    <svg {...iconBase} className={className}>
      <rect x="4" y="4" width="16" height="16" rx="2.5" />
      <path d="M9 4v16M15 4v16" />
      <path d="M6.5 7.5h1M11.5 7.5h1M17 7.5h.5" />
    </svg>
  );
}

function PomodoroIcon({ className }: IconProps) {
  return (
    <svg {...iconBase} className={className}>
      <path d="M9.5 4.2c1-.9 2.2-1.3 2.5-1.3s1.5.4 2.5 1.3" />
      <circle cx="12" cy="13.5" r="7.3" />
      <path d="M12 9.5v4l2.6 1.6" />
    </svg>
  );
}

function AnalyticsIcon({ className }: IconProps) {
  return (
    <svg {...iconBase} className={className}>
      <path d="M4 16.5 9 11l4 4 6.5-7" />
      <path d="M15 7.5h4.5V12" />
    </svg>
  );
}

function StudyRoomsIcon({ className }: IconProps) {
  return (
    <svg {...iconBase} className={className}>
      <circle cx="9" cy="8" r="3" />
      <path d="M3.5 20c1-3.4 3.4-5.2 5.5-5.2s4.5 1.8 5.5 5.2" />
      <circle cx="16.5" cy="8.5" r="2.5" />
      <path d="M14.7 12.4c.6-.15 1.15-.25 1.8-.25 2.1 0 4.5 1.8 5.5 5.2" />
    </svg>
  );
}

/* ------------------------------------------------------------------ */

type NavItem = {
  label: string;
  path: string;
  icon: ComponentType<{ className?: string }>;
};

const NAV_ITEMS: NavItem[] = [
  { label: "Home", path: "/", icon: HomeIcon },
  { label: "Tasks", path: "/tasks", icon: ChecklistIcon },
  { label: "Kanban", path: "/kanban", icon: KanbanIcon },
  { label: "Pomodoro", path: "/pomodoro", icon: PomodoroIcon },
  { label: "Journal", path: "/journal", icon: NotebookIcon },
  { label: "Analytics", path: "/analytics", icon: AnalyticsIcon },
  { label: "Study Streak", path: "/streak", icon: FlameIcon },
  { label: "Study Rooms", path: "/rooms", icon: StudyRoomsIcon },
];

function SidebarContents() {
  const navigate = useNavigate();
  const location = useLocation();
  const logout = useAuthStore((state) => state.logout);
  const logoutLoading = useAuthStore((state) => state.logoutLoading);
  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };
  return (
    <div className="flex h-full flex-col justify-between">
      <div>
        <div className="flex items-center gap-3 px-1">
          <Logo />
        </div>

        <nav className="mt-8 space-y-1">
          {NAV_ITEMS.map(({ label, path, icon: Icon }) => {
            const active = location.pathname === path;
            return (
              <button
                key={path}
                type="button"
                onClick={() => navigate(path)}
                className={`flex w-full items-center gap-3 rounded-xl px-3.5 py-2.5 text-[14px] font-medium transition-colors duration-200 cursor-pointer ${
                  active
                    ? "bg-[#2E2117] text-[#F3E9DC] shadow-[inset_0_0_0_1px_rgba(227,165,103,0.18)]"
                    : "text-[#9C8D7E] hover:bg-[#1B140F] hover:text-[#F3E9DC]"
                }`}
              >
                <Icon
                  className={`h-[18px] w-[18px] shrink-0 ${active ? "text-[#E3A567]" : "text-[#8A7B6C]"}`}
                />
                <span className="truncate">{label}</span>
              </button>
            );
          })}
        </nav>
      </div>

      <button
        type="button"
        onClick={() => handleLogout()}
        className={`flex w-full items-center gap-3 rounded-xl px-3.5 py-2.5 text-[14px] font-medium text-[#9C8D7E] transition-colors duration-200 hover:bg-[#1B140F] hover:text-[#F3E9DC] cursor-pointer ${logoutLoading ? "justify-center" : ""}`}
      >
        {logoutLoading ? (
          <LoadingSpinner size="sm" />
        ) : (
          <>
            <LogoutIcon className="h-[18px] w-[18px] text-[#8A7B6C]" />
            <span>Logout</span>
          </>
        )}
      </button>
    </div>
  );
}
export default SidebarContents;
