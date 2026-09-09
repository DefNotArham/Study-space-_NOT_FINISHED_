import type { User } from "@supabase/supabase-js";

export type AuthStore = {
  user: User | null;
  isInitialized: boolean;

  registerError: string | null;
  registerLoading: boolean;

  loginError: string | null;
  loginLoading: boolean;

  logoutLoading: boolean;

  forgotPasswordLoading: boolean;
  forgotPasswordError: string | null;

  resetPasswordError: string | null;
  resetPasswordLoading: boolean;

  initializeAuth: () => Promise<void>;

  register: (
    email: string,
    username: string,
    password: string,
    confirmPassword: string,
  ) => Promise<void>;

  login: (email: string, password: string) => Promise<void>;

  logout: () => Promise<void>;

  forgotPassword: (email: string) => Promise<void>;
  resetPassword: (newPassword: string) => Promise<void>;
};
