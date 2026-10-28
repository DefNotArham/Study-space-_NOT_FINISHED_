import type { User } from "./AuthTypes";

export type Task = {
  id: number;
  user_id: string;
  title: string;
  description: string | null;
  subject: string | null;
  completed: boolean;
  priority: "low" | "medium" | "high";
  due_date: string | null;
  created_at: string;
};

export type CreateTask = {
  user_id: string;
  title: string;
  description?: string | null;
  subject: string;
  priority: "low" | "medium" | "high";
  due_date?: string | null;
};

export type TaskStore = {
  Tasks: Task[];

  // Errors
  createTaskError: string | null;
  fetchTasksError: string | null;

  // Loadings
  fetchTasksLoading: boolean;
  createTaskLoading: boolean;
  deleteTaskLoading: boolean;

  fetchTasks: () => Promise<boolean>;
  createTask: (task: CreateTask) => Promise<boolean>;
  deleteTask: (taskId: number) => Promise<void>;
  updateTaskCompleted: (taskId: number, completed: boolean) => Promise<boolean>;
};
