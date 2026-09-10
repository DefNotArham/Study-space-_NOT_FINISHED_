import { create } from "zustand";
import type { AuthStore } from "../types/AuthTypes";

import { supabase } from "../lib/supabase";

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,

  // Register
  registerError: null,
  registerLoading: false,

  // Login
  loginError: null,
  loginLoading: false,

  // logout
  logoutLoading: false,

  isInitialized: false,

  // forgotPassword
  forgotPasswordLoading: false,
  forgotPasswordError: null,

  // resetPassword
  resetPasswordError: null,
  resetPasswordLoading: false,

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
    set({ registerError: null, registerLoading: true });

    if (password !== confirmPassword) {
      set({ registerError: "Passwords do not match", registerLoading: false });

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
      set({ registerError: error.message, registerLoading: false });

      setTimeout(() => {
        set({ registerError: null });
      }, 2000);

      throw error;
    }

    set({ registerLoading: false });
  },

  login: async (email: string, password: string) => {
    set({ loginError: null, loginLoading: true });

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      set({ loginError: error.message, loginLoading: false });

      setTimeout(() => {
        set({ loginError: null });
      }, 2000);

      throw error;
    }

    set({ user: data.user, loginLoading: false });
  },
  logout: async () => {
    set({ logoutLoading: true });

    const { error } = await supabase.auth.signOut();

    if (error) {
      set({ logoutLoading: false });

      throw error;
    }

    set({ user: null, logoutLoading: false });
  },

  forgotPassword: async (email: string) => {
    set({ forgotPasswordLoading: true });

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: "http://localhost:5173/reset-password",
    });

    if (error) {
      set({ forgotPasswordError: error.message, forgotPasswordLoading: false });

      setTimeout(() => {
        set({ forgotPasswordError: null });
      }, 2000);

      throw error;
    }

    set({ forgotPasswordLoading: false });
  },

  resetPassword: async (newPassword: string, confirmNewPassword: string) => {
    set({ resetPasswordLoading: true });

    if (newPassword !== confirmNewPassword) {
      set({ resetPasswordError: "Passwords does not match" });
      throw new Error("Passwords does not match");
    }

    const { error } = await supabase.auth.updateUser({
      password: newPassword,
    });
    set({ resetPasswordLoading: false });

    if (error) {
      set({ resetPasswordError: error.message, resetPasswordLoading: false });

      setTimeout(() => {
        set({ registerError: null });
      }, 2000);

      throw error;
    }
  },
}));
