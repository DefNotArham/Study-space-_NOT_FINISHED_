import { create } from "zustand";
import type { AuthStore } from "../types/AuthTypes";

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,

  registerError: null,
  registerLoading: false,

  loginError: null,
  loginLoading: false,

  verifyEmailError: null,

  logoutLoading: false,

  isInitialized: false,

  forgotPasswordLoading: false,
  forgotPasswordError: null,

  resetPasswordError: null,
  resetPasswordLoading: false,

  initializeAuth: async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      set({ user: null, isInitialized: true });
      return;
    }

    try {
      const response = await fetch("http://127.0.0.1:8000/auth/me", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        localStorage.removeItem("token");
        set({ user: null, isInitialized: true });

        return;
      }

      set({ user: data.user, isInitialized: true });
    } catch (error) {
      console.log(error);
      set({ isInitialized: true });
    }
  },

  register: async (
    email: string,
    username: string,
    password: string,
    confirmPassword: string,
  ) => {
    set({ registerLoading: true, registerError: null });

    // Error handling

    if (!email.trim() || !password.trim()) {
      set({
        registerError: "Please enter your email and password",
        registerLoading: false,
      });

      setTimeout(() => {
        set({ registerError: null });
      }, 3000);

      return false;
    }

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

      if (!data.success) {
        set({ registerError: data.message, registerLoading: false });

        setTimeout(() => {
          set({ registerError: null });
        }, 3000);

        return false;
      }

      set({
        registerError: null,
        registerLoading: false,
      });

      return true;
    } catch (error) {
      console.log(error);

      set({ registerError: "Something went wrong", registerLoading: false });
      setTimeout(() => {
        set({ registerError: null });
      }, 3000);

      return false;
    }
  },

  login: async (email: string, password: string) => {
    set({ loginLoading: true, loginError: null });

    // Error handling

    if (!email.trim() || !password.trim()) {
      set({
        loginError: "Please enter your email and password",
        loginLoading: false,
      });

      setTimeout(() => {
        set({ loginError: null });
      }, 3000);

      return false;
    }

    try {
      const response = await fetch("http://127.0.0.1:8000/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await response.json();

      if (!data.success) {
        set({ loginError: data.message, loginLoading: false });

        setTimeout(() => {
          set({ loginError: null });
        }, 3000);

        return false;
      }

      localStorage.setItem("token", data.token);
      set({ user: data.user, loginError: null, loginLoading: false });
      return true;
    } catch (error) {
      console.log(error);
      set({
        loginError: "Something went wrong",
        loginLoading: false,
        user: null,
      });

      setTimeout(() => {
        set({ loginError: null });
      }, 3000);
      return false;
    }
  },

  verifyEmail: async (token: string) => {
    set({ verifyEmailError: null });

    try {
      const response = await fetch("http://127.0.0.1:8000/auth/verify-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          token,
        }),
      });

      const data = await response.json();

      if (!data.success) {
        set({ verifyEmailError: data.message });

        setTimeout(() => {
          set({ verifyEmailError: null });
        }, 3000);
        return false;
      }

      return true;
    } catch (error) {
      console.log(error);
      set({ verifyEmailError: "Something went wrong" });
      setTimeout(() => {
        set({ verifyEmailError: null });
      }, 3000);
      return false;
    }
  },

  logout: async () => {
    localStorage.removeItem("token");
    set({ user: null });
  },

  forgotPassword: async (email: string) => {},

  resetPassword: async (newPassword: string, confirmNewPassword: string) => {},
}));
