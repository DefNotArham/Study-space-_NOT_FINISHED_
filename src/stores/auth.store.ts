import { create } from "zustand";
import type { AuthStore } from "../types/AuthTypes";

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,

  setUser: (user) => set({ user }),
}));
