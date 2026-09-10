import { useNavigate, useLocation } from "react-router-dom";
import type { ComponentType } from "react";
import {
  HomeIcon,
  ChecklistIcon,
  NotebookIcon,
  FlameIcon,
  LogoutIcon,
  KanbanIcon,
  PomodoroIcon,
  AnalyticsIcon,
  StudyRoomsIcon,
  SettingsIcon,
} from "../icons/icons";
import Logo from "../icons/logo";
import LoadingSpinner from "../ui/LoadingSpinner";
import { useAuthStore } from "../../stores/auth.store";

/* ------------------------------------------------------------------ */
/*  Local icons — same visual language as ../icons/icons.tsx, kept      */
/*  here because these four have no shared icon yet.                    */
/* ------------------------------------------------------------------ */

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

      <div>
        <button
          type="button"
          className={`flex w-full items-center gap-3 rounded-xl px-3.5 py-2.5 text-[14px] font-medium text-[#9C8D7E] transition-colors duration-200 hover:bg-[#1B140F] hover:text-[#F3E9DC] cursor-pointer`}
        >
          <SettingsIcon className="h-5 w-5 text-[#8A7B6C]" />
          <span>Settings</span>
        </button>

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
    </div>
  );
}
export default SidebarContents;
