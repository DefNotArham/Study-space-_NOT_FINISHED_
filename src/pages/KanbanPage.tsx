import React, { useEffect, useState } from "react";

import useTaskStore from "../stores/task.store";
import type { Task } from "../types/TaskTypes";
import type { KanbanColumn, Priority, TaskStatus } from "../types/KanbanTypes";
import useKanbanStore from "../stores/kanban.store";
import { useAuthStore } from "../stores/auth.store";

import {
  PlusIcon,
  CloseIcon,
  ChecklistIcon,
  CheckIcon,
} from "../components/icons/icons";

import Logo from "../components/icons/logo";
import LoFiBackground from "../components/background";
import SidebarContents from "../components/auth/SideBarContents";

// ------------------------------------------------------------------
// Styles and columns
// ------------------------------------------------------------------

const PRIORITY_STYLES: Record<Priority, { label: string; color: string }> = {
  high: { label: "High", color: "#C2694A" },
  medium: { label: "Medium", color: "#E3A567" },
  low: { label: "Low", color: "#6E8377" },
};

const getColumns = (tasks: Task[]): KanbanColumn[] => [
  {
    id: "todo",
    title: "To Do",
    accent: "#E3A567",
    tasks: tasks.filter((task) => task.status === "todo"),
  },
  {
    id: "in_progress",
    title: "In Progress",
    accent: "#6E9B9A",
    tasks: tasks.filter((task) => task.status === "in_progress"),
  },
  {
    id: "completed",
    title: "Completed",
    accent: "#6E8377",
    completed: true,
    tasks: tasks.filter((task) => task.status === "completed"),
  },
];

// ------------------------------------------------------------------
// Task Card
// ------------------------------------------------------------------

function TaskCard({ task, completed }: { task: Task; completed?: boolean }) {
  const priority = PRIORITY_STYLES[task.priority];

  return (
    <div
      draggable
      onDragStart={(event) => {
        event.dataTransfer.setData("text/plain", String(task.id));
        event.dataTransfer.effectAllowed = "move";
      }}
      className="group cursor-grab rounded-xl border border-[#3A2C22]/70 bg-[#1D1611] p-4 shadow-[0_10px_30px_-18px_rgba(0,0,0,0.7)] transition-all duration-200 hover:-translate-y-0.5 hover:border-[#4A392C] hover:shadow-[0_16px_34px_-16px_rgba(0,0,0,0.8)] active:cursor-grabbing"
    >
      <div className="mb-3 flex items-center justify-between gap-2">
        <span className="truncate rounded-full border border-[#E3A56755] px-2.5 py-0.5 text-[11.5px] text-[#E3A567]">
          {task.subject || "No subject"}
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

        <span className="text-[12.5px] text-[#8A7B6C]">
          Due {task.due_date || "No date"}
        </span>
      </div>
    </div>
  );
}

// ------------------------------------------------------------------
// Column
// ------------------------------------------------------------------

function Column({
  column,
  onMove,
}: {
  column: KanbanColumn;
  onMove: (taskId: number, status: TaskStatus) => void;
}) {
  return (
    <section
      onDragOver={(event) => {
        event.preventDefault();
        event.dataTransfer.dropEffect = "move";
      }}
      onDrop={(event) => {
        event.preventDefault();

        const taskId = Number(event.dataTransfer.getData("text/plain"));

        if (!Number.isNaN(taskId)) {
          onMove(taskId, column.id);
        }
      }}
      className="flex min-h-[320px] flex-col rounded-2xl border border-[#3A2C22]/70 bg-[#150F0B]/80 p-4 shadow-[0_20px_50px_-20px_rgba(0,0,0,0.6)] backdrop-blur-sm"
    >
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
      </header>

      <div className="flex flex-1 flex-col gap-3">
        {column.tasks.length > 0 ? (
          column.tasks.map((task) => (
            <TaskCard key={task.id} task={task} completed={column.completed} />
          ))
        ) : (
          <p className="py-6 text-center text-[12.5px] text-[#6B5D50]">
            No tasks yet
          </p>
        )}
      </div>
    </section>
  );
}

// ------------------------------------------------------------------
// Page
// ------------------------------------------------------------------

const KanbanPage = () => {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const Tasks = useTaskStore((state) => state.Tasks);
  const fetchTasks = useTaskStore((state) => state.fetchTasks);
  const fetchTasksLoading = useTaskStore((state) => state.fetchTasksLoading);
  const fetchTasksError = useTaskStore((state) => state.fetchTasksError);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const columns = getColumns(Tasks);

  const updateStatus = useKanbanStore((state) => state.updateStatus);

  const handleMoveTask = (taskId: number, newStatus: TaskStatus) => {
    const task = Tasks.find((task) => task.id === taskId);

    if (!task || task.status === newStatus) return;

    updateStatus(taskId, newStatus);
  };

  const user = useAuthStore((state) => state.user);

  const createTask = useTaskStore((state) => state.createTask);
  const createTaskError = useTaskStore((state) => state.createTaskError);

  //  Add task form
  const [modalOpen, setModalOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [subject, setSubject] = useState("");
  const [priority, setPriority] = useState<"low" | "medium" | "high">("medium");
  const [dueDate, setDueDate] = useState("");
  const [createTaskLoading, setCreateTaskLoading] = useState(false);

  const resetForm = () => {
    setTitle("");
    setDescription("");
    setSubject("");
    setPriority("medium");
    setDueDate("");
  };

  const openAddModal = () => {
    resetForm();
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    resetForm();
  };

  const handleSubmit = async (e: React.FormEvent<HTMLElement>) => {
    e.preventDefault();

    if (!user || !title.trim()) return;

    setCreateTaskLoading(false);

    try {
      const success = await createTask({
        user_id: String(user.id),
        title: title.trim(),
        description: description || null,
        subject,
        priority,
        due_date: dueDate || null,
      });

      if (success) {
        closeModal();
      }
    } finally {
      setCreateTaskLoading(false);
    }
  };

  return (
    <div
      className="relative min-h-screen bg-[#120C09]"
      style={{ fontFamily: "'Manrope', sans-serif" }}
    >
      <LoFiBackground />

      <div className="relative z-10 flex min-h-screen">
        {/* Desktop sidebar */}
        <aside className="fixed inset-y-0 hidden w-64 shrink-0 flex-col border-r border-[#3A2C22]/70 bg-[#150F0B]/90 px-4 py-6 backdrop-blur-sm md:flex">
          <SidebarContents />
        </aside>

        {/* Mobile top bar */}
        <header className="fixed inset-x-0 top-0 z-30 flex items-center justify-between border-b border-[#3A2C22]/70 bg-[#150F0B]/90 px-4 py-3 backdrop-blur-sm md:hidden">
          <Logo />

          <button
            type="button"
            onClick={() => setMobileNavOpen(true)}
            className="flex h-9 w-9 items-center justify-center rounded-lg text-[#B8A99A] transition-colors duration-200 hover:bg-[#1B140F] hover:text-[#F3E9DC] cursor-pointer"
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
            <div className="mb-8 flex animate-[ss-fade-up_0.5s_cubic-bezier(0.16,1,0.3,1)_both] flex-wrap items-start justify-between gap-4">
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
                onClick={() => {
                  openAddModal();
                }}
                type="button"
                className="flex items-center gap-1.5 rounded-xl bg-gradient-to-b from-[#E8B679] to-[#C97D4A] px-4 py-2.5 text-[14px] font-semibold text-[#221407] shadow-[0_8px_20px_-6px_rgba(201,125,74,0.55)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_12px_26px_-6px_rgba(201,125,74,0.7)] active:translate-y-0 cursor-pointer"
              >
                <PlusIcon className="h-4 w-4" />
                Add task
              </button>
            </div>

            {/* Board */}
            {fetchTasksLoading ? (
              <p className="py-10 text-center text-[#8A7B6C]">
                Loading tasks...
              </p>
            ) : fetchTasksError ? (
              <p className="py-10 text-center text-[#C2694A]">
                {fetchTasksError}
              </p>
            ) : (
              <div className="grid grid-cols-1 gap-5 animate-[ss-fade-up_0.6s_cubic-bezier(0.16,1,0.3,1)_both] lg:grid-cols-3">
                {columns.map((column) => (
                  <Column
                    key={column.id}
                    column={column}
                    onMove={handleMoveTask}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Add Task Modal */}
          {modalOpen && (
            <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
              <button
                type="button"
                aria-label="Close"
                onClick={closeModal}
                className="absolute inset-0 cursor-pointer bg-black/60"
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
                    onClick={closeModal}
                    className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg text-[#8A7B6C] hover:bg-[#1B140F] hover:text-[#F3E9DC]"
                    aria-label="Close"
                  >
                    <CloseIcon className="h-4 w-4" />
                  </button>
                </div>

                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                  {/* Title */}
                  <div>
                    <label className="mb-1.5 block text-[13px] font-medium text-[#B8A99A]">
                      Title
                    </label>
                    <input
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      placeholder="Task title"
                      required
                      className="w-full rounded-xl border border-[#3A2C22] bg-[#1B140F] px-3.5 py-2.5 text-[14px] text-[#F3E9DC] placeholder-[#6B5D50] outline-none focus:border-[#E3A567]/60"
                    />
                  </div>

                  {/* Description */}
                  <div>
                    <label className="mb-1.5 block text-[13px] font-medium text-[#B8A99A]">
                      Description
                    </label>
                    <input
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      placeholder="Description"
                      className="w-full rounded-xl border border-[#3A2C22] bg-[#1B140F] px-3.5 py-2.5 text-[14px] text-[#F3E9DC] placeholder-[#6B5D50] outline-none focus:border-[#E3A567]/60"
                    />
                  </div>

                  {/* Subject */}
                  <div>
                    <label className="mb-1.5 block text-[13px] font-medium text-[#B8A99A]">
                      Subject
                    </label>
                    <input
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      placeholder="Subject"
                      className="w-full rounded-xl border border-[#3A2C22] bg-[#1B140F] px-3.5 py-2.5 text-[14px] text-[#F3E9DC] placeholder-[#6B5D50] outline-none focus:border-[#E3A567]/60"
                    />
                  </div>

                  {/* Priority */}
                  <div>
                    <label className="mb-1.5 block text-[13px] font-medium text-[#B8A99A]">
                      Priority
                    </label>
                    <select
                      value={priority}
                      onChange={(e) =>
                        setPriority(e.target.value as "low" | "medium" | "high")
                      }
                      className="w-full rounded-xl border border-[#3A2C22] bg-[#1B140F] px-3 py-2.5 text-[13.5px] text-[#F3E9DC] outline-none focus:border-[#E3A567]/60"
                    >
                      <option value="low">Low</option>
                      <option value="medium">Medium</option>
                      <option value="high">High</option>
                    </select>
                  </div>

                  {/* Due date */}
                  <div>
                    <label className="mb-1.5 block text-[13px] font-medium text-[#B8A99A]">
                      Due date
                    </label>
                    <input
                      type="date"
                      value={dueDate}
                      onChange={(e) => setDueDate(e.target.value)}
                      min={new Date().toLocaleDateString("en-CA")}
                      className="w-full rounded-xl border border-[#3A2C22] bg-[#1B140F] px-3.5 py-2.5 text-[14px] text-[#F3E9DC] outline-none focus:border-[#E3A567]/60"
                    />
                  </div>

                  {/* Error */}
                  {createTaskError && (
                    <p className="text-[12.5px] text-[#D98A78]">
                      {createTaskError}
                    </p>
                  )}

                  {/* Submit */}
                  <button
                    type="submit"
                    disabled={createTaskLoading}
                    className="mt-1 cursor-pointer rounded-xl bg-gradient-to-b from-[#E8B679] to-[#C97D4A] py-2.5 text-[14px] font-semibold text-[#221407] transition-all hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {createTaskLoading ? "Adding..." : "Add task"}
                  </button>
                </form>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default KanbanPage;
