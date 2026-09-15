import { useAuthStore } from "../stores/auth.store";
import { useState } from "react";
import { useEffect } from "react";
import useTaskStore from "../stores/task.store";

import { PlusIcon, CloseIcon, ChecklistIcon } from "../components/icons/icons";
import Logo from "../components/icons/logo";
import LoFiBackground from "../components/background";
import SidebarContents from "../components/auth/SideBarContents";

const PRIORITY_STYLES: Record<
  "low" | "medium" | "high",
  { label: string; color: string }
> = {
  high: { label: "High", color: "#C2694A" },
  medium: { label: "Medium", color: "#E3A567" },
  low: { label: "Low", color: "#6E8377" },
};

function getDueDate(task: unknown): string | undefined {
  const t = task as Record<string, unknown>;
  const raw = t.due_date ?? t.dueDate ?? t.due;
  if (!raw) return undefined;
  const date = new Date(raw as string);
  return Number.isNaN(date.getTime())
    ? String(raw)
    : date.toLocaleDateString(undefined, { month: "short", day: "numeric" });
}

function getCompleted(task: unknown): boolean | undefined {
  const t = task as Record<string, unknown>;
  const value = t.completed ?? t.is_completed;
  return typeof value === "boolean" ? value : undefined;
}

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

const TasksPage = () => {
  // User
  const user = useAuthStore((state) => state.user);

  // Tasks
  const tasks = useTaskStore((s) => s.Tasks);
  const fetchTasks = useTaskStore((s) => s.fetchTasks);
  const createTask = useTaskStore((s) => s.createTask);
  const createTaskError = useTaskStore((s) => s.createTaskError);

  // Inputs
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [subject, setSubject] = useState("");
  const [priority, setPriority] = useState<"low" | "medium" | "high">("medium");

  // UI-only state — not part of the data/auth logic.
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    if (!user) return;

    fetchTasks(user);
  }, [user]);

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
          <div className="mx-auto max-w-3xl">
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

            {/* Task list */}
            <Card>
              {tasks.length === 0 ? (
                <div className="flex flex-col items-center justify-center px-6 py-16 text-center">
                  <span className="mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-[#2A1F17] ring-1 ring-[#E3A567]/25 shadow-[0_0_24px_-4px_rgba(227,165,103,0.45)]">
                    <ChecklistIcon className="h-7 w-7 text-[#E3A567]" />
                  </span>
                  <h3
                    className="text-[1.1rem] italic tracking-tight text-[#F3E9DC]"
                    style={{ fontFamily: "'Fraunces', serif" }}
                  >
                    No tasks yet
                  </h3>
                  <p className="mt-2 max-w-[320px] text-[13.5px] leading-relaxed text-[#8A7B6C]">
                    You&apos;re all caught up. Add a task to start planning your
                    next study session.
                  </p>
                </div>
              ) : (
                <ul className="divide-y divide-[#3A2C22]/60">
                  {tasks.map((task) => {
                    const dueDate = getDueDate(task);
                    const completed = getCompleted(task);
                    const priorityStyle =
                      PRIORITY_STYLES[
                        task.priority as "low" | "medium" | "high"
                      ];

                    return (
                      <li
                        key={task.id}
                        className="flex items-start gap-3 px-5 py-4 first:pt-4 last:pb-4"
                      >
                        {completed !== undefined && (
                          <span
                            className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md border ${
                              completed
                                ? "border-[#E3A567] bg-[#E3A567]"
                                : "border-[#4A392C] bg-transparent"
                            }`}
                          >
                            {completed && (
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
                          </span>
                        )}

                        <div className="min-w-0 flex-1">
                          <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                            <p
                              className={`text-[14.5px] ${
                                completed
                                  ? "text-[#6B5D50] line-through"
                                  : "text-[#F3E9DC]"
                              }`}
                            >
                              {task.title}
                            </p>
                            {task.subject && (
                              <span className="shrink-0 rounded-full border border-[#E3A56755] px-2.5 py-0.5 text-[11.5px] text-[#E3A567]">
                                {task.subject}
                              </span>
                            )}
                          </div>

                          {task.description && (
                            <p
                              className={`mt-1 text-[13px] leading-relaxed ${
                                completed ? "text-[#5C4F44]" : "text-[#8A7B6C]"
                              }`}
                            >
                              {task.description}
                            </p>
                          )}

                          <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1">
                            {priorityStyle && (
                              <span className="flex items-center gap-1.5 text-[12.5px] text-[#9C8D7E]">
                                <span
                                  className="h-2 w-2 rounded-full"
                                  style={{
                                    backgroundColor: priorityStyle.color,
                                  }}
                                />
                                {priorityStyle.label}
                              </span>
                            )}
                            {dueDate && (
                              <span className="text-[12.5px] text-[#8A7B6C]">
                                Due {dueDate}
                              </span>
                            )}
                          </div>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              )}
            </Card>
          </div>
        </main>
      </div>

      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
          <button
            type="button"
            aria-label="Close"
            onClick={() => setModalOpen(false)}
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
                onClick={() => setModalOpen(false)}
                className="flex h-8 w-8 items-center justify-center rounded-lg text-[#8A7B6C] transition-colors duration-200 hover:bg-[#1B140F] hover:text-[#F3E9DC]"
                aria-label="Close"
              >
                <CloseIcon className="h-4 w-4" />
              </button>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();

                if (!user) return;

                createTask({
                  user_id: user.id,
                  title,
                  description,
                  subject,
                  priority,
                });

                setModalOpen(false);
              }}
              className="flex flex-col gap-4"
            >
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
                  placeholder="Task title"
                  className="w-full rounded-xl border border-[#3A2C22] bg-[#1B140F] py-2.5 px-3.5 text-[14px] text-[#F3E9DC] placeholder-[#6B5D50] outline-none transition-colors duration-200 focus:border-[#E3A567]/60 focus:ring-2 focus:ring-[#E3A567]/15"
                />
              </div>

              <div>
                <label
                  htmlFor="task-description"
                  className="mb-1.5 block text-[13px] font-medium text-[#B8A99A]"
                >
                  Description
                </label>
                <input
                  id="task-description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Description"
                  className="w-full rounded-xl border border-[#3A2C22] bg-[#1B140F] py-2.5 px-3.5 text-[14px] text-[#F3E9DC] placeholder-[#6B5D50] outline-none transition-colors duration-200 focus:border-[#E3A567]/60 focus:ring-2 focus:ring-[#E3A567]/15"
                />
              </div>

              <div>
                <label
                  htmlFor="task-subject"
                  className="mb-1.5 block text-[13px] font-medium text-[#B8A99A]"
                >
                  Subject
                </label>
                <input
                  id="task-subject"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  placeholder="Subject"
                  className="w-full rounded-xl border border-[#3A2C22] bg-[#1B140F] py-2.5 px-3.5 text-[14px] text-[#F3E9DC] placeholder-[#6B5D50] outline-none transition-colors duration-200 focus:border-[#E3A567]/60 focus:ring-2 focus:ring-[#E3A567]/15"
                />
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
                  onChange={(e) =>
                    setPriority(e.target.value as "low" | "medium" | "high")
                  }
                  className="w-full rounded-xl border border-[#3A2C22] bg-[#1B140F] py-2.5 px-3 text-[13.5px] text-[#F3E9DC] outline-none focus:border-[#E3A567]/60"
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </div>

              {createTaskError && (
                <p className="text-[12.5px] text-[#D98A78]">
                  {createTaskError}
                </p>
              )}

              <button
                type="submit"
                className="mt-1 rounded-xl bg-gradient-to-b from-[#E8B679] to-[#C97D4A] py-2.5 text-[14px] font-semibold text-[#221407] shadow-[0_8px_20px_-6px_rgba(201,125,74,0.55)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_12px_26px_-6px_rgba(201,125,74,0.7)] active:translate-y-0"
              >
                Add task
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default TasksPage;
