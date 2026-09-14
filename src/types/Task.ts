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
