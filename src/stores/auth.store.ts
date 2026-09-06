import { create } from "zustand";
import type { AuthStore } from "../types/AuthTypes";

import { supabase } from "../lib/supabase";

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,

  registerError: null,

  register: async (
    email: string,
    username: string,
    password: string,
    confirmPassword: string,
  ) => {
    set({ registerError: null });

    if (password !== confirmPassword) {
      set({ registerError: "Passwords do not match" });
      throw new Error("Passwords do not match");
    }

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          username,
        },
      },
    });

    if (error) {
      set({ registerError: error.message });
      throw error;
    }

    set({ user: data.user });

    setTimeout(() => {
      set({ registerError: null });
    }, 3000);
  },
}));
