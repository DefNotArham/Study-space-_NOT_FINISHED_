import { create } from "zustand";
import type { AuthStore } from "../types/AuthTypes";

import { supabase } from "../lib/supabase";

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,

  registerError: null,
  loginError: null,

  isInitialized: false,

  initializeAuth: async () => {
    const { data } = await supabase.auth.getSession();

    set({
      user: data.session?.user ?? null,
      isInitialized: true,
    });
  },

  register: async (
    email: string,
    username: string,
    password: string,
    confirmPassword: string,
  ) => {
    set({ registerError: null });

    if (password !== confirmPassword) {
      set({ registerError: "Passwords do not match" });

      setTimeout(() => {
        set({ registerError: null });
      }, 3000);

      throw new Error("Passwords do not match");
    }

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: "http://localhost:5173/email-confirmed",
        data: {
          display_name: username,
        },
      },
    });

    if (error) {
      set({ registerError: error.message });

      setTimeout(() => {
        set({ registerError: null });
      }, 2000);

      throw error;
    }
  },

  login: async (email: string, password: string) => {
    set({ loginError: null });

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      set({ loginError: error.message });

      setTimeout(() => {
        set({ loginError: null });
      }, 2000);

      throw error;
    }

    set({ user: data.user });
  },
}));
