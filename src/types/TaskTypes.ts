import type { User } from "@supabase/supabase-js";

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
  description?: string;
  subject?: string;
  priority: "low" | "medium" | "high";
  due_date?: string;
};

export type TaskStore = {
  Tasks: Task[];

  // Errors
  createTaskError: string | null;

  // Loadings
  fetchTasksLoading: boolean;
  createTaskLoading: boolean;
  deleteTaskLoading: boolean;

  fetchTasks: (user: User) => Promise<void>;
  createTask: (task: CreateTask) => Promise<void>;
  deleteTask: (taskId: number) => Promise<void>;
};
