import { create } from "zustand";
import type { AuthStore } from "../types/AuthTypes";

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,

  registerError: null,
  registerLoading: false,

  loginError: null,
  loginLoading: false,

  logoutLoading: false,

  isInitialized: false,

  forgotPasswordLoading: false,
  forgotPasswordError: null,

  resetPasswordError: null,
  resetPasswordLoading: false,

  initializeAuth: async () => {},

  register: async (
    email: string,
    username: string,
    password: string,
    confirmPassword: string,
  ) => {
    try {
      const response = await fetch("http://127.0.0.1:8000/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          username,
          password,
          confirmPassword,
        }),
      });

      const data = await response.json();

      if (!data.success) return set({ registerError: data.message });

      set({
        registerError: null,
      });
    } catch (error) {
      console.log(error);

      set({ registerError: "Something went wrong" });
    }
  },

  login: async (email: string, password: string) => {},

  logout: async () => {},

  forgotPassword: async (email: string) => {},

  resetPassword: async (newPassword: string, confirmNewPassword: string) => {},
}));
