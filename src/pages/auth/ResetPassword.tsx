import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { LockIcon, EyeIcon } from "../../components/icons/icons";

import Logo from "../../components/icons/logo";
import LoFiBackground from "../../components/background";

import { useAuthStore } from "../../stores/auth.store";

type PasswordFieldProps = {
  id: string;
  label: string;
  autoComplete: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

function PasswordField({
  id,
  label,
  autoComplete,
  onChange,
}: PasswordFieldProps) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div>
      <label
        htmlFor={id}
        className="mb-1.5 block text-[13px] font-medium text-[#B8A99A]"
      >
        {label}
      </label>

      <div className="relative">
        <span className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-[#8A7B6C]">
          <LockIcon className="h-[18px] w-[18px]" />
        </span>

        <input
          id={id}
          type={showPassword ? "text" : "password"}
          placeholder="••••••••"
          autoComplete={autoComplete}
          onChange={onChange}
          className="w-full rounded-xl border border-[#3A2C22] bg-[#1B140F] py-2.5 pl-10 pr-10 text-[14.5px] text-[#F3E9DC] placeholder-[#6B5D50] outline-none transition-colors duration-200 focus:border-[#E3A567]/60 focus:ring-2 focus:ring-[#E3A567]/15"
        />

        <button
          type="button"
          tabIndex={-1}
          onClick={() => setShowPassword((prev) => !prev)}
          className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#8A7B6C] transition-colors duration-200 hover:text-[#E3A567]"
          aria-label={showPassword ? "Hide password" : "Show password"}
        >
          <EyeIcon className="h-[18px] w-[18px]" />
        </button>
      </div>
    </div>
  );
}

export default function ResetPassword() {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const resetPassword = useAuthStore((state) => state.resetPassword);
  const resetPasswordError = useAuthStore((state) => state.resetPasswordError);
  const resetPasswordLoading = useAuthStore(
    (state) => state.resetPasswordLoading,
  );

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await resetPassword(newPassword, confirmPassword);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#120C09] px-6 py-10"
      style={{ fontFamily: "'Manrope', sans-serif" }}
    >
      <LoFiBackground />

      <div className="relative z-10 w-full max-w-[400px] animate-[ss-fade-up_0.55s_cubic-bezier(0.16,1,0.3,1)_both]">
        <div className="mb-8 flex flex-col items-center text-center">
          <Logo />
        </div>

        <div className="rounded-2xl border border-[#3A2C22]/70 bg-[#1D1611]/85 p-7 shadow-[0_24px_60px_-15px_rgba(0,0,0,0.65)] backdrop-blur-sm">
          <h1
            className="text-center text-[1.4rem] italic tracking-tight text-[#F3E9DC]"
            style={{ fontFamily: "'Fraunces', serif" }}
          >
            Reset your password
          </h1>

          <p className="mx-auto mt-3 max-w-[300px] text-center text-[14px] leading-relaxed text-[#B8A99A]">
            Choose a new password for your account.
          </p>

          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <PasswordField
              id="reset-password-new"
              label="New password"
              autoComplete="new-password"
              onChange={(e) => setNewPassword(e.target.value)}
            />

            <PasswordField
              id="reset-password-confirm"
              label="Confirm password"
              autoComplete="new-password"
              onChange={(e) => setConfirmPassword(e.target.value)}
            />

            {newPassword !== confirmPassword && confirmPassword && (
              <p className="text-[13px] text-red-400">
                Passwords do not match.
              </p>
            )}

            {resetPasswordError && (
              <p className="text-[13px] text-red-400">{resetPasswordError}</p>
            )}

            <button
              type="submit"
              disabled={resetPasswordLoading}
              className="w-full rounded-xl bg-gradient-to-b from-[#E8B679] to-[#C97D4A] py-2.5 text-[15px] font-semibold text-[#221407] shadow-[0_8px_20px_-6px_rgba(201,125,74,0.55)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_12px_26px_-6px_rgba(201,125,74,0.7)] active:translate-y-0 cursor-pointer disabled:cursor-not-allowed disabled:opacity-60"
            >
              {resetPasswordLoading ? "Resetting..." : "Reset password"}
            </button>

            <p className="pt-1 text-center text-[13px] text-[#8A7B6C]">
              <Link
                to="/login"
                className="font-medium text-[#E3A567] transition-colors duration-200 hover:text-[#EFC694]"
              >
                Back to login
              </Link>
            </p>
          </form>
        </div>

        <p className="mt-6 text-center text-[12.5px] text-[#6B5D50]">
          A quiet corner for late-night focus.
        </p>
      </div>
    </div>
  );
}
