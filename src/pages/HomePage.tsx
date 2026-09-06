import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  HomeIcon,
  BookIcon,
  ChecklistIcon,
  NotebookIcon,
  GearIcon,
  LogoutIcon,
  PlayIcon,
  PauseIcon,
  MenuIcon,
  CloseIcon,
} from "../components/icons/icons";
import Logo from "../components/icons/logo";
import LoFiBackground from "../components/background";

/* ------------------------------------------------------------------ */
/*  Mock data — replace with real data once the backend exists          */
/* ------------------------------------------------------------------ */

const STUDENT_NAME = "Ada";

const STUDY_GOAL_MINUTES = 240;
const STUDIED_MINUTES = 135;
const FOCUS_SESSIONS_TODAY = 3;
const CURRENT_STREAK_DAYS = 5;

type Subject = { name: string; progress: number; color: string };

const SUBJECTS: Subject[] = [
  { name: "Mathematics", progress: 72, color: "#E3A567" },
  { name: "Biology", progress: 45, color: "#5B7A5E" },
  { name: "History", progress: 90, color: "#7C8FA6" },
  { name: "Literature", progress: 30, color: "#C97D4A" },
];

type Task = { id: string; title: string; subject: string; done: boolean };

const INITIAL_TASKS: Task[] = [
  {
    id: "t1",
    title: "Finish calculus problem set",
    subject: "Mathematics",
    done: false,
  },
  {
    id: "t2",
    title: "Read Chapter 4: Cell Biology",
    subject: "Biology",
    done: true,
  },
  { id: "t3", title: "Review lecture notes", subject: "History", done: false },
  {
    id: "t4",
    title: "Write essay outline",
    subject: "Literature",
    done: false,
  },
  {
    id: "t5",
    title: "Practice derivative shortcuts",
    subject: "Mathematics",
    done: true,
  },
];

const NAV_ITEMS = [
  { label: "Home", icon: HomeIcon },
  { label: "Subjects", icon: BookIcon },
  { label: "Tasks", icon: ChecklistIcon },
  { label: "Notes", icon: NotebookIcon },
  { label: "Settings", icon: GearIcon },
];

/* ------------------------------------------------------------------ */
/*  Small shared bits, local to this page                              */
/* ------------------------------------------------------------------ */

function ProgressBar({
  percent,
  color = "#E3A567",
}: {
  percent: number;
  color?: string;
}) {
  return (
    <div className="h-2 w-full overflow-hidden rounded-full bg-[#150F0B]">
      <div
        className="h-full rounded-full transition-all duration-500"
        style={{
          width: `${Math.min(100, Math.max(0, percent))}%`,
          backgroundColor: color,
        }}
      />
    </div>
  );
}

function Card({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`rounded-2xl border border-[#3A2C22]/70 bg-[#1D1611]/85 p-6 shadow-[0_20px_50px_-20px_rgba(0,0,0,0.6)] backdrop-blur-sm ${className}`}
    >
      {children}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Sidebar (also used as the mobile drawer's contents)                 */
/* ------------------------------------------------------------------ */

function SidebarContents({ onNavigate }: { onNavigate?: () => void }) {
  const navigate = useNavigate();

  return (
    <div className="flex h-full flex-col justify-between">
      <div>
        <div className="mb-8 px-1">
          <Logo />
        </div>

        <nav className="space-y-1">
          {NAV_ITEMS.map(({ label, icon: Icon }) => {
            const active = label === "Home";
            return (
              <button
                key={label}
                type="button"
                onClick={onNavigate}
                className={`flex w-full items-center gap-3 rounded-xl px-3.5 py-2.5 text-[14px] font-medium transition-colors duration-200 ${
                  active
                    ? "bg-[#2E2117] text-[#F3E9DC] shadow-[inset_0_0_0_1px_rgba(227,165,103,0.18)]"
                    : "text-[#9C8D7E] hover:bg-[#1B140F] hover:text-[#F3E9DC]"
                }`}
              >
                <Icon
                  className={`h-[18px] w-[18px] ${active ? "text-[#E3A567]" : "text-[#8A7B6C]"}`}
                />
                {label}
              </button>
            );
          })}
        </nav>
      </div>

      <button
        type="button"
        onClick={() => navigate("/login")}
        className="flex w-full items-center gap-3 rounded-xl px-3.5 py-2.5 text-[14px] font-medium text-[#9C8D7E] transition-colors duration-200 hover:bg-[#1B140F] hover:text-[#F3E9DC]"
      >
        <LogoutIcon className="h-[18px] w-[18px] text-[#8A7B6C]" />
        Logout
      </button>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Today's Study Progress card                                         */
/* ------------------------------------------------------------------ */

function StudyProgressCard() {
  const percent = Math.round((STUDIED_MINUTES / STUDY_GOAL_MINUTES) * 100);
  const hours = Math.floor(STUDIED_MINUTES / 60);
  const minutes = STUDIED_MINUTES % 60;
  const goalHours = STUDY_GOAL_MINUTES / 60;

  return (
    <Card>
      <div className="mb-4 flex items-baseline justify-between">
        <h2 className="text-[15px] font-semibold text-[#F3E9DC]">
          Today&apos;s study progress
        </h2>
        <span className="text-[13px] text-[#8A7B6C]">{percent}%</span>
      </div>

      <p className="mb-3 text-[13.5px] text-[#B8A99A]">
        {hours}h {minutes}m of your {goalHours}h goal
      </p>

      <ProgressBar percent={percent} />

      <div className="mt-5 grid grid-cols-2 gap-4">
        <div>
          <p className="text-[20px] font-semibold text-[#F3E9DC]">
            {FOCUS_SESSIONS_TODAY}
          </p>
          <p className="text-[12.5px] text-[#8A7B6C]">Focus sessions</p>
        </div>
        <div>
          <p className="text-[20px] font-semibold text-[#F3E9DC]">
            {CURRENT_STREAK_DAYS} days
          </p>
          <p className="text-[12.5px] text-[#8A7B6C]">Current streak</p>
        </div>
      </div>
    </Card>
  );
}

/* ------------------------------------------------------------------ */
/*  Subjects overview card                                              */
/* ------------------------------------------------------------------ */

function SubjectsCard() {
  return (
    <Card>
      <h2 className="mb-4 text-[15px] font-semibold text-[#F3E9DC]">
        Subjects
      </h2>
      <div className="space-y-4">
        {SUBJECTS.map((subject) => (
          <div key={subject.name}>
            <div className="mb-1.5 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span
                  className="h-2 w-2 rounded-full"
                  style={{ backgroundColor: subject.color }}
                />
                <span className="text-[13.5px] text-[#D8CBBE]">
                  {subject.name}
                </span>
              </div>
              <span className="text-[12.5px] text-[#8A7B6C]">
                {subject.progress}%
              </span>
            </div>
            <ProgressBar percent={subject.progress} color={subject.color} />
          </div>
        ))}
      </div>
    </Card>
  );
}

/* ------------------------------------------------------------------ */
/*  Study timer card                                                    */
/* ------------------------------------------------------------------ */

function StudyTimerCard() {
  // UI-only toggle — no real countdown or timer logic yet.
  const [running, setRunning] = useState(false);

  return (
    <Card className="flex flex-col items-center text-center">
      <h2 className="mb-1 self-start text-[15px] font-semibold text-[#F3E9DC]">
        Study timer
      </h2>
      <p className="mb-5 self-start text-[13px] text-[#8A7B6C]">
        {running ? "Focus session in progress" : "Ready when you are"}
      </p>

      <div className="mb-5 flex h-32 w-32 items-center justify-center rounded-full bg-[#150F0B] ring-1 ring-[#3A2C22]">
        <span
          className="text-[28px] font-semibold tracking-tight text-[#F3E9DC]"
          style={{ fontFamily: "'Manrope', sans-serif" }}
        >
          25:00
        </span>
      </div>

      <div className="flex w-full items-center gap-3">
        <button
          type="button"
          onClick={() => setRunning((r) => !r)}
          className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-gradient-to-b from-[#E8B679] to-[#C97D4A] py-2.5 text-[14px] font-semibold text-[#221407] shadow-[0_8px_20px_-6px_rgba(201,125,74,0.55)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_12px_26px_-6px_rgba(201,125,74,0.7)] active:translate-y-0"
        >
          {running ? (
            <PauseIcon className="h-4 w-4" />
          ) : (
            <PlayIcon className="h-4 w-4" />
          )}
          {running ? "Pause" : "Start focus"}
        </button>
        <button
          type="button"
          onClick={() => setRunning(false)}
          className="rounded-xl border border-[#3A2C22] px-4 py-2.5 text-[14px] font-medium text-[#9C8D7E] transition-colors duration-200 hover:border-[#4A392C] hover:text-[#F3E9DC]"
        >
          Reset
        </button>
      </div>
    </Card>
  );
}

/* ------------------------------------------------------------------ */
/*  Today's tasks                                                       */
/* ------------------------------------------------------------------ */

function TasksCard() {
  const [tasks, setTasks] = useState<Task[]>(INITIAL_TASKS);

  const toggleTask = (id: string) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, done: !t.done } : t)),
    );
  };

  const remaining = tasks.filter((t) => !t.done).length;

  return (
    <Card>
      <div className="mb-4 flex items-baseline justify-between">
        <h2 className="text-[15px] font-semibold text-[#F3E9DC]">
          Today&apos;s tasks
        </h2>
        <span className="text-[13px] text-[#8A7B6C]">
          {remaining} remaining
        </span>
      </div>

      <ul className="divide-y divide-[#3A2C22]/60">
        {tasks.map((task) => (
          <li
            key={task.id}
            className="flex items-center gap-3 py-3 first:pt-0 last:pb-0"
          >
            <button
              type="button"
              onClick={() => toggleTask(task.id)}
              aria-pressed={task.done}
              aria-label={
                task.done ? "Mark task as not done" : "Mark task as done"
              }
              className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-md border transition-colors duration-200 ${
                task.done
                  ? "border-[#E3A567] bg-[#E3A567]"
                  : "border-[#4A392C] bg-transparent hover:border-[#E3A567]/60"
              }`}
            >
              {task.done && (
                <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 text-[#221407]">
                  <path
                    d="M4.5 12.5 9.5 17.5 19.5 6.5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2.5}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              )}
            </button>

            <div className="min-w-0 flex-1">
              <p
                className={`truncate text-[14px] ${
                  task.done ? "text-[#6B5D50] line-through" : "text-[#F3E9DC]"
                }`}
              >
                {task.title}
              </p>
            </div>

            <span className="shrink-0 rounded-full border border-[#3A2C22] px-2.5 py-0.5 text-[11.5px] text-[#8A7B6C]">
              {task.subject}
            </span>
          </li>
        ))}
      </ul>
    </Card>
  );
}

/* ------------------------------------------------------------------ */
/*  Page                                                                */
/* ------------------------------------------------------------------ */

export default function HomePage() {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  const hour = new Date().getHours();
  const timeGreeting =
    hour < 12 ? "Good morning" : hour < 18 ? "Good afternoon" : "Good evening";
  const today = new Date().toLocaleDateString(undefined, {
    weekday: "long",
    month: "long",
    day: "numeric",
  });

  return (
    <div
      className="relative min-h-screen bg-[#120C09]"
      style={{ fontFamily: "'Manrope', sans-serif" }}
    >
      <LoFiBackground />

      <div className="relative z-10 flex min-h-screen">
        {/* Desktop sidebar */}
        <aside className="hidden w-64 shrink-0 border-r border-[#3A2C22]/70 bg-[#150F0B]/90 px-4 py-6 backdrop-blur-sm md:fixed md:inset-y-0 md:flex md:flex-col">
          <SidebarContents />
        </aside>

        {/* Mobile top bar */}
        <header className="fixed inset-x-0 top-0 z-30 flex items-center justify-between border-b border-[#3A2C22]/70 bg-[#150F0B]/90 px-4 py-3 backdrop-blur-sm md:hidden">
          <Logo />
          <button
            type="button"
            onClick={() => setMobileNavOpen(true)}
            className="flex h-9 w-9 items-center justify-center rounded-lg text-[#B8A99A] transition-colors duration-200 hover:bg-[#1B140F] hover:text-[#F3E9DC]"
            aria-label="Open menu"
          >
            <MenuIcon className="h-5 w-5" />
          </button>
        </header>

        {/* Mobile drawer */}
        {mobileNavOpen && (
          <div className="fixed inset-0 z-40 md:hidden">
            <button
              type="button"
              aria-label="Close menu"
              onClick={() => setMobileNavOpen(false)}
              className="absolute inset-0 bg-black/60"
            />
            <div className="absolute inset-y-0 left-0 w-72 border-r border-[#3A2C22]/70 bg-[#150F0B] px-4 py-6 shadow-[0_0_40px_rgba(0,0,0,0.5)]">
              <div className="mb-2 flex justify-end">
                <button
                  type="button"
                  onClick={() => setMobileNavOpen(false)}
                  className="flex h-8 w-8 items-center justify-center rounded-lg text-[#B8A99A] hover:bg-[#1B140F] hover:text-[#F3E9DC]"
                  aria-label="Close menu"
                >
                  <CloseIcon className="h-4 w-4" />
                </button>
              </div>
              <SidebarContents onNavigate={() => setMobileNavOpen(false)} />
            </div>
          </div>
        )}

        {/* Main content */}
        <main className="min-w-0 flex-1 px-5 pb-12 pt-20 md:ml-64 md:px-10 md:pt-10">
          <div className="mx-auto max-w-5xl">
            <div className="mb-8 animate-[ss-fade-up_0.5s_cubic-bezier(0.16,1,0.3,1)_both]">
              <h1
                className="text-[1.7rem] italic tracking-tight text-[#F3E9DC]"
                style={{ fontFamily: "'Fraunces', serif" }}
              >
                {timeGreeting}, {STUDENT_NAME}
              </h1>
              <p className="mt-1 text-[14px] text-[#8A7B6C]">
                {today} — let&apos;s make it count.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
              <div className="lg:col-span-2">
                <StudyProgressCard />
              </div>
              <StudyTimerCard />

              <div className="lg:col-span-2">
                <TasksCard />
              </div>
              <SubjectsCard />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
