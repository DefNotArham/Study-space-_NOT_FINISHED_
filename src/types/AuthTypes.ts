import type { User } from "@supabase/supabase-js";

export type AuthStore = {
  user: User | null;
  isInitialized: boolean;

  registerError: string | null;
  loginError: string | null;

  initializeAuth: () => Promise<void>;

  register: (
    email: string,
    username: string,
    password: string,
    confirmPassword: string,
  ) => Promise<void>;

  login: (email: string, password: string) => Promise<void>;
};
