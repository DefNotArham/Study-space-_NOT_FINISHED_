import React, { useMemo, useState } from "react";
import type { FormEvent } from "react";

import {
  MenuIcon,
  CloseIcon,
  SearchIcon,
  PlusIcon,
  MoreIcon,
  ChevronDownIcon,
  ChecklistIcon,
} from "../components/icons/icons";

import Logo from "../components/icons/logo";
import LoFiBackground from "../components/background";
// NOTE: adjust this path if SidebarContents lives somewhere else in your tree —
// reused as-is, not redesigned here.
import SidebarContents from "../components/auth/SideBarContents";

/* ------------------------------------------------------------------ */
/*  Types + mock data — UI only, no backend/Supabase/CRUD               */
/* ------------------------------------------------------------------ */

type Priority = "high" | "medium" | "low";

type Task = {
  id: string;
  title: string;
  description?: string;
  subject: string;
  priority: Priority;
  dueLabel: string;
  completed: boolean;
};

const SUBJECT_COLORS: Record<string, string> = {
  "Computer Science": "#E3A567",
  Databases: "#7C8FA6",
  Mathematics: "#C97D4A",
  History: "#5B7A5E",
  General: "#8A7B6C",
};
const SUBJECTS = Object.keys(SUBJECT_COLORS);

const PRIORITY_STYLES: Record<Priority, { label: string; color: string }> = {
  high: { label: "High", color: "#C2694A" },
  medium: { label: "Medium", color: "#E3A567" },
  low: { label: "Low", color: "#6E8377" },
};

const INITIAL_TASKS: Task[] = [
  {
    id: "t1",
    title: "Finish AP Computer Science assignment",
    description: "Implement the sorting algorithm lab and submit before class.",
    subject: "Computer Science",
    priority: "high",
    dueLabel: "Today",
    completed: false,
  },
  {
    id: "t2",
    title: "Review SQL joins",
    description: "Go over INNER vs. LEFT JOIN examples from lecture 6.",
    subject: "Databases",
    priority: "medium",
    dueLabel: "Tomorrow",
    completed: true,
  },
  {
    id: "t3",
    title: "Study for math quiz",
    description: "Quiz covers derivatives and related rates.",
    subject: "Mathematics",
    priority: "high",
    dueLabel: "Fri, Sep 12",
    completed: false,
  },
  {
    id: "t4",
    title: "Finish history notes",
    description: "Summarize chapters 9–10 for the midterm review.",
    subject: "History",
    priority: "low",
    dueLabel: "Sep 14",
    completed: false,
  },
  {
    id: "t5",
    title: "Practice JavaScript problems",
    description: "Work through closures and async/await exercises.",
    subject: "Computer Science",
    priority: "medium",
    dueLabel: "Sep 10",
    completed: true,
  },
];

type StatusFilter = "all" | "active" | "completed";
type PriorityFilter = "all" | Priority;
type SortKey = "newest" | "oldest" | "priority";

const PRIORITY_ORDER: Record<Priority, number> = { high: 0, medium: 1, low: 2 };

/* ------------------------------------------------------------------ */
/*  Small local pieces                                                  */
/* ------------------------------------------------------------------ */

function Card({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`rounded-2xl border border-[#3A2C22]/70 bg-[#1D1611]/85 shadow-[0_20px_50px_-20px_rgba(0,0,0,0.6)] backdrop-blur-sm ${className}`}
    >
      {children}
    </div>
  );
}

function SelectField({
  value,
  onChange,
  children,
}: {
  value: string;
  onChange: (value: string) => void;
  children: React.ReactNode;
}) {
  return (
    <div className="relative">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="appearance-none rounded-xl border border-[#3A2C22] bg-[#150F0B] py-2 pl-3 pr-8 text-[12.5px] font-medium text-[#B8A99A] outline-none transition-colors duration-200 hover:border-[#4A392C] focus:border-[#E3A567]/60"
      >
        {children}
      </select>
      <ChevronDownIcon className="pointer-events-none absolute right-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-[#8A7B6C]" />
    </div>
  );
}

function PriorityDot({ priority }: { priority: Priority }) {
  const { label, color } = PRIORITY_STYLES[priority];
  return (
    <span className="flex items-center gap-1.5 text-[12.5px] text-[#9C8D7E]">
      <span
        className="h-2 w-2 rounded-full"
        style={{ backgroundColor: color }}
      />
      {label}
    </span>
  );
}

function SubjectBadge({ subject }: { subject: string }) {
  const color = SUBJECT_COLORS[subject] ?? SUBJECT_COLORS.General;
  return (
    <span
      className="shrink-0 rounded-full border px-2.5 py-0.5 text-[11.5px]"
      style={{ borderColor: `${color}55`, color }}
    >
      {subject}
    </span>
  );
}

function EmptyState({ isFiltered }: { isFiltered: boolean }) {
  return (
    <div className="flex flex-col items-center justify-center px-6 py-16 text-center">
      <span className="mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-[#2A1F17] ring-1 ring-[#E3A567]/25 shadow-[0_0_24px_-4px_rgba(227,165,103,0.45)]">
        <ChecklistIcon className="h-7 w-7 text-[#E3A567]" />
      </span>
      <h3
        className="text-[1.1rem] italic tracking-tight text-[#F3E9DC]"
        style={{ fontFamily: "'Fraunces', serif" }}
      >
        {isFiltered ? "No tasks match your filters" : "No tasks yet"}
      </h3>
      <p className="mt-2 max-w-[320px] text-[13.5px] leading-relaxed text-[#8A7B6C]">
        {isFiltered
          ? "Try a different search term or clear a filter."
          : "You're all caught up. Add a task to start planning your next study session."}
      </p>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Add Task modal — local state only, appends to the in-memory list    */
/* ------------------------------------------------------------------ */

function AddTaskModal({
  onClose,
  onAdd,
}: {
  onClose: () => void;
  onAdd: (task: Omit<Task, "id" | "completed">) => void;
}) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [subject, setSubject] = useState(SUBJECTS[0]);
  const [priority, setPriority] = useState<Priority>("medium");
  const [dueLabel, setDueLabel] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    onAdd({
      title: title.trim(),
      description: description.trim() || undefined,
      subject,
      priority,
      dueLabel: dueLabel.trim() || "No due date",
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
      <button
        type="button"
        aria-label="Close"
        onClick={onClose}
        className="absolute inset-0 bg-black/60"
      />

      <div className="relative w-full max-w-md rounded-2xl border border-[#3A2C22]/70 bg-[#1D1611] p-6 shadow-[0_24px_60px_-15px_rgba(0,0,0,0.65)]">
        <div className="mb-5 flex items-center justify-between">
          <h2
            className="text-[1.2rem] italic tracking-tight text-[#F3E9DC]"
            style={{ fontFamily: "'Fraunces', serif" }}
          >
            Add task
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-lg text-[#8A7B6C] transition-colors duration-200 hover:bg-[#1B140F] hover:text-[#F3E9DC]"
            aria-label="Close"
          >
            <CloseIcon className="h-4 w-4" />
          </button>
        </div>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label
              htmlFor="task-title"
              className="mb-1.5 block text-[13px] font-medium text-[#B8A99A]"
            >
              Title
            </label>
            <input
              id="task-title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Read Chapter 5"
              className="w-full rounded-xl border border-[#3A2C22] bg-[#1B140F] py-2.5 px-3.5 text-[14px] text-[#F3E9DC] placeholder-[#6B5D50] outline-none transition-colors duration-200 focus:border-[#E3A567]/60 focus:ring-2 focus:ring-[#E3A567]/15"
              required
            />
          </div>

          <div>
            <label
              htmlFor="task-description"
              className="mb-1.5 block text-[13px] font-medium text-[#B8A99A]"
            >
              Description <span className="text-[#6B5D50]">(optional)</span>
            </label>
            <textarea
              id="task-description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Add any helpful detail..."
              rows={2}
              className="w-full resize-none rounded-xl border border-[#3A2C22] bg-[#1B140F] py-2.5 px-3.5 text-[13.5px] text-[#F3E9DC] placeholder-[#6B5D50] outline-none transition-colors duration-200 focus:border-[#E3A567]/60 focus:ring-2 focus:ring-[#E3A567]/15"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label
                htmlFor="task-subject"
                className="mb-1.5 block text-[13px] font-medium text-[#B8A99A]"
              >
                Subject
              </label>
              <select
                id="task-subject"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="w-full rounded-xl border border-[#3A2C22] bg-[#1B140F] py-2.5 px-3 text-[13.5px] text-[#F3E9DC] outline-none focus:border-[#E3A567]/60"
              >
                {SUBJECTS.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label
                htmlFor="task-priority"
                className="mb-1.5 block text-[13px] font-medium text-[#B8A99A]"
              >
                Priority
              </label>
              <select
                id="task-priority"
                value={priority}
                onChange={(e) => setPriority(e.target.value as Priority)}
                className="w-full rounded-xl border border-[#3A2C22] bg-[#1B140F] py-2.5 px-3 text-[13.5px] text-[#F3E9DC] outline-none focus:border-[#E3A567]/60"
              >
                <option value="high">High</option>
                <option value="medium">Medium</option>
                <option value="low">Low</option>
              </select>
            </div>
          </div>

          <div>
            <label
              htmlFor="task-due"
              className="mb-1.5 block text-[13px] font-medium text-[#B8A99A]"
            >
              Due <span className="text-[#6B5D50]">(optional)</span>
            </label>
            <input
              id="task-due"
              value={dueLabel}
              onChange={(e) => setDueLabel(e.target.value)}
              placeholder="e.g. Tomorrow, Sep 20"
              className="w-full rounded-xl border border-[#3A2C22] bg-[#1B140F] py-2.5 px-3.5 text-[13.5px] text-[#F3E9DC] placeholder-[#6B5D50] outline-none transition-colors duration-200 focus:border-[#E3A567]/60 focus:ring-2 focus:ring-[#E3A567]/15"
            />
          </div>

          <div className="flex items-center gap-3 pt-1">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 rounded-xl border border-[#3A2C22] py-2.5 text-[14px] font-medium text-[#9C8D7E] transition-colors duration-200 hover:border-[#4A392C] hover:text-[#F3E9DC]"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 rounded-xl bg-gradient-to-b from-[#E8B679] to-[#C97D4A] py-2.5 text-[14px] font-semibold text-[#221407] shadow-[0_8px_20px_-6px_rgba(201,125,74,0.55)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_12px_26px_-6px_rgba(201,125,74,0.7)] active:translate-y-0"
            >
              Add task
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Page                                                                */
/* ------------------------------------------------------------------ */

export default function TasksPage() {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [tasks, setTasks] = useState<Task[]>(INITIAL_TASKS);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");
  const [priorityFilter, setPriorityFilter] = useState<PriorityFilter>("all");
  const [sort, setSort] = useState<SortKey>("newest");
  const [modalOpen, setModalOpen] = useState(false);

  const toggleTask = (id: string) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)),
    );
  };

  const addTask = (task: Omit<Task, "id" | "completed">) => {
    setTasks((prev) => [
      { ...task, id: `t${Date.now()}`, completed: false },
      ...prev,
    ]);
  };

  const total = tasks.length;
  const completed = tasks.filter((t) => t.completed).length;
  const remaining = total - completed;
  const progress = total === 0 ? 0 : Math.round((completed / total) * 100);

  const isFiltered =
    search.trim().length > 0 ||
    statusFilter !== "all" ||
    priorityFilter !== "all";

  const visibleTasks = useMemo(() => {
    let list = tasks;

    if (statusFilter === "active") list = list.filter((t) => !t.completed);
    if (statusFilter === "completed") list = list.filter((t) => t.completed);
    if (priorityFilter !== "all")
      list = list.filter((t) => t.priority === priorityFilter);

    const query = search.trim().toLowerCase();
    if (query) {
      list = list.filter(
        (t) =>
          t.title.toLowerCase().includes(query) ||
          t.description?.toLowerCase().includes(query) ||
          t.subject.toLowerCase().includes(query),
      );
    }

    const sorted = [...list];
    if (sort === "priority") {
      sorted.sort(
        (a, b) => PRIORITY_ORDER[a.priority] - PRIORITY_ORDER[b.priority],
      );
    } else if (sort === "oldest") {
      sorted.reverse();
    }
    // 'newest' keeps the current list order (new tasks are unshifted to the front).

    return sorted;
  }, [tasks, statusFilter, priorityFilter, search, sort]);

  const statusCounts: Record<StatusFilter, number> = {
    all: total,
    active: remaining,
    completed,
  };

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
              <SidebarContents />
            </div>
          </div>
        )}

        {/* Main content */}
        <main className="min-w-0 flex-1 px-5 pb-16 pt-20 md:ml-64 md:px-10 md:pt-10">
          <div className="mx-auto max-w-5xl">
            {/* Header */}
            <div className="mb-8 flex flex-wrap items-start justify-between gap-4 animate-[ss-fade-up_0.5s_cubic-bezier(0.16,1,0.3,1)_both]">
              <div>
                <h1
                  className="text-[1.7rem] italic tracking-tight text-[#F3E9DC]"
                  style={{ fontFamily: "'Fraunces', serif" }}
                >
                  Tasks
                </h1>
                <p className="mt-1 text-[14px] text-[#8A7B6C]">
                  This is where you manage your study tasks.
                </p>
              </div>

              <button
                type="button"
                onClick={() => setModalOpen(true)}
                className="flex items-center gap-1.5 rounded-xl bg-gradient-to-b from-[#E8B679] to-[#C97D4A] px-4 py-2.5 text-[14px] font-semibold text-[#221407] shadow-[0_8px_20px_-6px_rgba(201,125,74,0.55)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_12px_26px_-6px_rgba(201,125,74,0.7)] active:translate-y-0"
              >
                <PlusIcon className="h-4 w-4" />
                Add task
              </button>
            </div>

            {/* Summary cards */}
            <div className="mb-6 grid grid-cols-2 gap-4 md:grid-cols-4">
              <Card className="px-5 py-4">
                <p className="text-[22px] font-semibold text-[#F3E9DC]">
                  {total}
                </p>
                <p className="mt-0.5 text-[12.5px] text-[#8A7B6C]">
                  Total tasks
                </p>
              </Card>
              <Card className="px-5 py-4">
                <p className="text-[22px] font-semibold text-[#F3E9DC]">
                  {completed}
                </p>
                <p className="mt-0.5 text-[12.5px] text-[#8A7B6C]">Completed</p>
              </Card>
              <Card className="px-5 py-4">
                <p className="text-[22px] font-semibold text-[#F3E9DC]">
                  {remaining}
                </p>
                <p className="mt-0.5 text-[12.5px] text-[#8A7B6C]">Remaining</p>
              </Card>
              <Card className="px-5 py-4">
                <div className="mb-1.5 flex items-baseline justify-between">
                  <p className="text-[22px] font-semibold text-[#F3E9DC]">
                    {progress}%
                  </p>
                  <p className="text-[12.5px] text-[#8A7B6C]">Progress</p>
                </div>
                <div className="h-1.5 w-full overflow-hidden rounded-full bg-[#150F0B]">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-[#E8B679] to-[#C97D4A] transition-all duration-500"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </Card>
            </div>

            {/* Controls */}
            <div className="mb-5 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
              <div className="relative w-full md:max-w-[260px]">
                <span className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-[#8A7B6C]">
                  <SearchIcon className="h-[16px] w-[16px]" />
                </span>
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search tasks..."
                  className="w-full rounded-xl border border-[#3A2C22] bg-[#1B140F] py-2 pl-9 pr-3 text-[13.5px] text-[#F3E9DC] placeholder-[#6B5D50] outline-none transition-colors duration-200 focus:border-[#E3A567]/60 focus:ring-2 focus:ring-[#E3A567]/15"
                />
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <div className="flex items-center gap-1 rounded-xl border border-[#3A2C22] bg-[#150F0B] p-1">
                  {(["all", "active", "completed"] as StatusFilter[]).map(
                    (key) => (
                      <button
                        key={key}
                        type="button"
                        onClick={() => setStatusFilter(key)}
                        className={`rounded-lg px-3 py-1.5 text-[12.5px] font-medium capitalize transition-colors duration-200 ${
                          statusFilter === key
                            ? "bg-[#2E2117] text-[#F3E9DC]"
                            : "text-[#8A7B6C] hover:text-[#B8A99A]"
                        }`}
                      >
                        {key}{" "}
                        <span className="text-[#6B5D50]">
                          ({statusCounts[key]})
                        </span>
                      </button>
                    ),
                  )}
                </div>

                <SelectField
                  value={priorityFilter}
                  onChange={(v) => setPriorityFilter(v as PriorityFilter)}
                >
                  <option value="all">All priorities</option>
                  <option value="high">High priority</option>
                  <option value="medium">Medium priority</option>
                  <option value="low">Low priority</option>
                </SelectField>

                <SelectField
                  value={sort}
                  onChange={(v) => setSort(v as SortKey)}
                >
                  <option value="newest">Newest</option>
                  <option value="oldest">Oldest</option>
                  <option value="priority">Priority</option>
                </SelectField>
              </div>
            </div>

            {/* Task list */}
            <Card>
              {visibleTasks.length === 0 ? (
                <EmptyState isFiltered={isFiltered} />
              ) : (
                <ul className="divide-y divide-[#3A2C22]/60">
                  {visibleTasks.map((task) => (
                    <li
                      key={task.id}
                      className="flex items-start gap-3 px-5 py-4 first:pt-4 last:pb-4"
                    >
                      <button
                        type="button"
                        onClick={() => toggleTask(task.id)}
                        aria-pressed={task.completed}
                        aria-label={
                          task.completed
                            ? "Mark task as not done"
                            : "Mark task as done"
                        }
                        className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md border transition-colors duration-200 ${
                          task.completed
                            ? "border-[#E3A567] bg-[#E3A567]"
                            : "border-[#4A392C] bg-transparent hover:border-[#E3A567]/60"
                        }`}
                      >
                        {task.completed && (
                          <svg
                            viewBox="0 0 24 24"
                            className="h-3.5 w-3.5 text-[#221407]"
                          >
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
                        <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                          <p
                            className={`text-[14.5px] ${
                              task.completed
                                ? "text-[#6B5D50] line-through"
                                : "text-[#F3E9DC]"
                            }`}
                          >
                            {task.title}
                          </p>
                          <SubjectBadge subject={task.subject} />
                        </div>

                        {task.description && (
                          <p
                            className={`mt-1 line-clamp-2 text-[13px] leading-relaxed ${
                              task.completed
                                ? "text-[#5C4F44]"
                                : "text-[#8A7B6C]"
                            }`}
                          >
                            {task.description}
                          </p>
                        )}

                        <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1">
                          <PriorityDot priority={task.priority} />
                          <span className="text-[12.5px] text-[#8A7B6C]">
                            Due {task.dueLabel}
                          </span>
                        </div>
                      </div>

                      <button
                        type="button"
                        aria-label="Task options"
                        className="shrink-0 rounded-lg p-1.5 text-[#6B5D50] transition-colors duration-200 hover:bg-[#241A14] hover:text-[#B8A99A]"
                      >
                        <MoreIcon className="h-4 w-4" />
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </Card>
          </div>
        </main>
      </div>

      {modalOpen && (
        <AddTaskModal onClose={() => setModalOpen(false)} onAdd={addTask} />
      )}
    </div>
  );
}
