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

export type TaskStore = {
  Tasks: Task[];
  fetchTasks: (user: User) => Promise<void>;
};
