import type { Task } from "./TaskTypes";

export type Priority = "low" | "medium" | "high";

export type KanbanColumn = {
  id: "todo" | "in_progress" | "completed";
  title: string;
  accent: string;
  completed?: boolean;
  tasks: Task[];
};
