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
  ) => {},

  login: async (email: string, password: string) => {},

  logout: async () => {},

  forgotPassword: async (email: string) => {},

  resetPassword: async (newPassword: string, confirmNewPassword: string) => {},
}));
