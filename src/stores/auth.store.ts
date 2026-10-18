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
    if (!email.trim() || !username.trim() || !password || !confirmPassword) {
      set({ registerError: "Please fill in all fields" });

      setTimeout(() => {
        set({ registerError: null });
      }, 3000);

      return false;
    }

    if (password !== confirmPassword) {
      set({
        registerError: "Passwords do not match",
        registerLoading: false,
      });

      setTimeout(() => {
        set({ registerError: null });
      }, 3000);

      return false;
    }

    set({ registerLoading: true, registerError: null });

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
          confirm_password: confirmPassword,
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        const errorMessage =
          data.message ||
          (Array.isArray(data.detail)
            ? data.detail
                .map((error: { msg: string }) =>
                  error.msg.replace("Value error, ", ""),
                )
                .filter(
                  (msg: string, index: number, arr: string[]) =>
                    arr.indexOf(msg) === index,
                )[0]
            : typeof data.detail === "string"
              ? data.detail
              : "Invalid registration details");

        set({
          registerError: errorMessage,
          registerLoading: false,
        });

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
    if (!email.trim() || !password.trim()) {
      set({
        loginError: "Please enter your email and password",
      });

      setTimeout(() => {
        set({ loginError: null });
      }, 3000);

      return false;
    }

    set({ loginLoading: true, loginError: null });

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

  forgotPassword: async (email: string) => {
    if (!email.trim()) {
      set({
        forgotPasswordError: "Please enter your email",
      });

      setTimeout(() => {
        set({ forgotPasswordError: null });
      }, 3000);
      return false;
    }

    set({ forgotPasswordLoading: true, forgotPasswordError: null });

    try {
      const response = await fetch(
        "http://127.0.0.1:8000/auth/forgot-password",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
        },
      );

      const data = await response.json();

      if (!response.ok || !data.success) {
        set({
          forgotPasswordError: data.message || "Something went wrong",
          forgotPasswordLoading: false,
        });

        setTimeout(() => {
          set({ forgotPasswordError: null });
        }, 3000);

        return false;
      }

      set({ forgotPasswordLoading: false, forgotPasswordError: null });

      return true;
    } catch (error) {
      set({
        forgotPasswordError: "Something went wrong",
        forgotPasswordLoading: false,
      });

      setTimeout(() => {
        set({ forgotPasswordError: null });
      }, 3000);
      console.log(error);

      return false;
    }
  },

  resetPassword: async (
    token: string,
    newPassword: string,
    confirmNewPassword: string,
  ) => {
    if (!newPassword || !confirmNewPassword) {
      set({ resetPasswordError: "Please fill in all fields" });

      setTimeout(() => {
        set({ resetPasswordError: null });
      }, 3000);

      return false;
    }

    if (newPassword !== confirmNewPassword) {
      set({ resetPasswordError: "Passwords do not match" });

      setTimeout(() => {
        set({ resetPasswordError: null });
      }, 3000);

      return false;
    }

    set({ resetPasswordLoading: true, resetPasswordError: null });

    try {
      if (!token) {
        set({
          resetPasswordError: "Invalid or missing reset link",
          resetPasswordLoading: false,
        });

        setTimeout(() => {
          set({ resetPasswordError: null });
        }, 3000);

        return false;
      }

      const response = await fetch(
        "http://127.0.0.1:8000/auth/reset-password",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            token,
            new_password: newPassword,
            confirm_password: confirmNewPassword,
          }),
        },
      );

      const data = await response.json();

      if (!response.ok || !data.success) {
        const errorMessage =
          data.message ||
          (Array.isArray(data.detail)
            ? data.detail
                .map((error: { msg: string }) =>
                  error.msg.replace("Value error, ", ""),
                )
                .filter(
                  (msg: string, index: number, arr: string[]) =>
                    arr.indexOf(msg) === index,
                )[0]
            : typeof data.detail === "string"
              ? data.detail
              : "Something went wrong");
        set({
          resetPasswordError: errorMessage,
          resetPasswordLoading: false,
        });

        setTimeout(() => {
          set({ resetPasswordError: null });
        }, 3000);

        return false;
      }

      set({ resetPasswordError: null, resetPasswordLoading: false });
      return true;
    } catch (error) {
      console.log(error);

      set({
        resetPasswordError: "Something went wrong",
        resetPasswordLoading: false,
      });

      setTimeout(() => {
        set({ resetPasswordError: null });
      }, 3000);
      return false;
    }
  },
}));
