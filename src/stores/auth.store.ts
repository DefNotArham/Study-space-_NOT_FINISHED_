import { create } from "zustand";
import type { AuthStore } from "../types/AuthTypes";

import { supabase } from "../lib/supabase";

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,

  registerError: null,

  register: async (email: string, username: string, password: string) => {
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
      throw error;
    }

    set({ user: data.user });
  },
}));
