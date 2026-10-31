import { useState } from "react";

import {
  PlusIcon,
  CloseIcon,
  ChecklistIcon,
  CheckIcon,
} from "../components/icons/icons";
import Logo from "../components/icons/logo";
import LoFiBackground from "../components/background";
import SidebarContents from "../components/auth/SideBarContents";

/* ------------------------------------------------------------------ */
/*  Static placeholder content: visual design only, nothing is wired    */
/* ------------------------------------------------------------------ */

type Priority = "low" | "medium" | "high";

type KanbanTask = {
  id: string;
  title: string;
  subject: string;
  priority: Priority;
  due: string;
};

type KanbanColumn = {
  id: string;
  title: string;
  accent: string;
  completed?: boolean;
  tasks: KanbanTask[];
};

const PRIORITY_STYLES: Record<Priority, { label: string; color: string }> = {
  high: { label: "High", color: "#C2694A" },
  medium: { label: "Medium", color: "#E3A567" },
  low: { label: "Low", color: "#6E8377" },
};

const COLUMNS: KanbanColumn[] = [
  {
    id: "todo",
    title: "To Do",
    accent: "#7C8FA6",
    tasks: [
      {
        id: "a1",
        title: "Study for math quiz",
        subject: "Mathematics",
        priority: "high",
        due: "Fri, Oct 31",
      },
      {
        id: "a2",
        title: "Review SQL joins",
        subject: "Databases",
        priority: "medium",
        due: "Nov 2",
      },
      {
        id: "a3",
        title: "Finish history notes",
        subject: "History",
        priority: "low",
        due: "Nov 4",
      },
    ],
  },
  {
    id: "progress",
    title: "In Progress",
    accent: "#E3A567",
    tasks: [
      {
        id: "b1",
        title: "AP Computer Science assignment",
        subject: "Computer Science",
        priority: "high",
        due: "Today",
      },
      {
        id: "b2",
        title: "Practice JavaScript problems",
        subject: "Computer Science",
        priority: "medium",
        due: "Nov 1",
      },
    ],
  },
  {
    id: "done",
    title: "Completed",
    accent: "#5B7A5E",
    completed: true,
    tasks: [
      {
        id: "c1",
        title: "Read Chapter 4: Cell Biology",
        subject: "Biology",
        priority: "medium",
        due: "Oct 28",
      },
      {
        id: "c2",
        title: "Organize study desk",
        subject: "General",
        priority: "low",
        due: "Oct 27",
      },
    ],
  },
];

/* ------------------------------------------------------------------ */
/*  Pieces                                                              */
/* ------------------------------------------------------------------ */

function TaskCard({
  task,
  completed,
}: {
  task: KanbanTask;
  completed?: boolean;
}) {
  const priority = PRIORITY_STYLES[task.priority];

  return (
    <div className="group rounded-xl border border-[#3A2C22]/70 bg-[#1D1611] p-4 shadow-[0_10px_30px_-18px_rgba(0,0,0,0.7)] transition-all duration-200 hover:-translate-y-0.5 hover:border-[#4A392C] hover:shadow-[0_16px_34px_-16px_rgba(0,0,0,0.8)]">
      <div className="mb-3 flex items-center justify-between gap-2">
        <span className="truncate rounded-full border border-[#E3A56755] px-2.5 py-0.5 text-[11.5px] text-[#E3A567]">
          {task.subject}
        </span>

        {completed && (
          <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#5B7A5E]/25 ring-1 ring-[#5B7A5E]/50">
            <CheckIcon className="h-3 w-3 text-[#8FB093]" />
          </span>
        )}
      </div>

      <p
        className={`text-[14.5px] font-medium leading-snug ${
          completed ? "text-[#6B5D50] line-through" : "text-[#F3E9DC]"
        }`}
      >
        {task.title}
      </p>

      <div className="mt-4 flex items-center justify-between border-t border-[#3A2C22]/60 pt-3">
        <span className="flex items-center gap-1.5 text-[12.5px] text-[#9C8D7E]">
          <span
            className="h-2 w-2 rounded-full"
            style={{ backgroundColor: priority.color }}
          />
          {priority.label}
        </span>
        <span className="text-[12.5px] text-[#8A7B6C]">Due {task.due}</span>
      </div>
    </div>
  );
}

function Column({ column }: { column: KanbanColumn }) {
  return (
    <section className="flex min-h-[320px] flex-col rounded-2xl border border-[#3A2C22]/70 bg-[#150F0B]/80 p-4 shadow-[0_20px_50px_-20px_rgba(0,0,0,0.6)] backdrop-blur-sm">
      <header className="mb-4 flex items-center justify-between px-1">
        <div className="flex items-center gap-2.5">
          <span
            className="h-2.5 w-2.5 rounded-full"
            style={{ backgroundColor: column.accent }}
          />
          <h2 className="text-[14.5px] font-semibold text-[#F3E9DC]">
            {column.title}
          </h2>
          <span className="rounded-full bg-[#2A1F17] px-2 py-0.5 text-[11.5px] font-medium text-[#8A7B6C]">
            {column.tasks.length}
          </span>
        </div>

        <button
          type="button"
          aria-label={`Add task to ${column.title}`}
          className="flex h-7 w-7 items-center justify-center rounded-lg text-[#8A7B6C] transition-colors duration-200 hover:bg-[#1B140F] hover:text-[#E3A567]"
        >
          <PlusIcon className="h-4 w-4" />
        </button>
      </header>

      <div className="flex flex-1 flex-col gap-3">
        {column.tasks.map((task) => (
          <TaskCard key={task.id} task={task} completed={column.completed} />
        ))}

        <button
          type="button"
          className="mt-auto flex items-center justify-center gap-1.5 rounded-xl border border-dashed border-[#3A2C22] py-2.5 text-[13px] font-medium text-[#6B5D50] transition-colors duration-200 hover:border-[#4A392C] hover:text-[#B8A99A]"
        >
          <PlusIcon className="h-3.5 w-3.5" />
          Add task
        </button>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Page                                                                */
/* ------------------------------------------------------------------ */

const KanbanPage = () => {
  // UI-only state for the mobile menu drawer.
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

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
            <ChecklistIcon className="h-5 w-5" />
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
              <SidebarContents />
            </div>
          </div>
        )}

        {/* Main content */}
        <main className="min-w-0 flex-1 px-5 pb-16 pt-20 md:ml-64 md:px-10 md:pt-10">
          <div className="mx-auto max-w-6xl">
            {/* Header */}
            <div className="mb-8 flex flex-wrap items-start justify-between gap-4 animate-[ss-fade-up_0.5s_cubic-bezier(0.16,1,0.3,1)_both]">
              <div>
                <h1
                  className="text-[1.7rem] italic tracking-tight text-[#F3E9DC]"
                  style={{ fontFamily: "'Fraunces', serif" }}
                >
                  Kanban
                </h1>
                <p className="mt-1 text-[14px] text-[#8A7B6C]">
                  See your study work move from start to finish.
                </p>
              </div>

              <button
                type="button"
                className="flex items-center gap-1.5 rounded-xl bg-gradient-to-b from-[#E8B679] to-[#C97D4A] px-4 py-2.5 text-[14px] font-semibold text-[#221407] shadow-[0_8px_20px_-6px_rgba(201,125,74,0.55)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_12px_26px_-6px_rgba(201,125,74,0.7)] active:translate-y-0"
              >
                <PlusIcon className="h-4 w-4" />
                Add task
              </button>
            </div>

            {/* Board */}
            <div className="grid grid-cols-1 gap-5 lg:grid-cols-3 animate-[ss-fade-up_0.6s_cubic-bezier(0.16,1,0.3,1)_both]">
              {COLUMNS.map((column) => (
                <Column key={column.id} column={column} />
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default KanbanPage;
