import type { Task } from "./TaskTypes";

export type TaskStatus = "todo" | "in_progress" | "completed";

export type KanbanColumn = {
  id: "todo" | "in_progress" | "completed";
  title: string;
  accent: string;
  completed?: boolean;
  tasks: Task[];
};

export type KanbanStore = {
  updateStatus: (taskId: number, status: TaskStatus) => void;
};
