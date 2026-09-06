import type { User } from "@supabase/supabase-js";

export type AuthStore = {
  user: User | null;

  registerError: string | null;

  register: (
    email: string,
    username: string,
    password: string,
    confirmPassword: string,
  ) => Promise<void>;
};
