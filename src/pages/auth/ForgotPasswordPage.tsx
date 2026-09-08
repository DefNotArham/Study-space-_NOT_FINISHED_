import React, { useState } from "react";
import type { FormEvent } from "react";
import { Link } from "react-router-dom";

import { MailIcon } from "../../components/icons/icons";
import Logo from "../../components/icons/logo";
import LoFiBackground from "../../components/background";
import { useAuthStore } from "../../stores/auth.store";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const forgotPassword = useAuthStore((state) => state.forgotPassword);
  const forgotPasswordLoading = useAuthStore(
    (state) => state.forgotPasswordLoading,
  );
  const forgotPasswordError = useAuthStore(
    (state) => state.forgotPasswordError,
  );

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      await forgotPassword(email);
      setSubmitted(true);
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
          {submitted ? (
            <div className="text-center">
              <div className="mb-5 flex justify-center">
                <span className="flex h-20 w-20 items-center justify-center rounded-full bg-[#2A1F17] ring-1 ring-[#E3A567]/25 shadow-[0_0_28px_-4px_rgba(227,165,103,0.5)]">
                  <MailIcon className="h-9 w-9 text-[#E3A567]" />
                </span>
              </div>

              <h1
                className="text-[1.4rem] italic tracking-tight text-[#F3E9DC]"
                style={{ fontFamily: "'Fraunces', serif" }}
              >
                Check your email
              </h1>

              <p className="mx-auto mt-3 max-w-[300px] text-[14px] leading-relaxed text-[#B8A99A]">
                We sent a password reset link to
              </p>

              <p className="mt-1 text-[14.5px] font-medium text-[#F3E9DC]">
                {email}
              </p>

              <p className="mx-auto mt-3 max-w-[300px] text-[13px] leading-relaxed text-[#8A7B6C]">
                Click the link in that email to choose a new password. If you
                don&apos;t see it, check your spam folder.
              </p>

              <button
                type="button"
                onClick={() => setSubmitted(false)}
                className="mt-6 text-[13px] font-medium text-[#E3A567] transition-colors duration-200 hover:text-[#EFC694]"
              >
                Try a different email
              </button>

              <p className="mt-5 text-[13px] text-[#8A7B6C]">
                <Link
                  to="/login"
                  className="font-medium text-[#E3A567] transition-colors duration-200 hover:text-[#EFC694]"
                >
                  Back to login
                </Link>
              </p>
            </div>
          ) : (
            <>
              <h1
                className="text-center text-[1.4rem] italic tracking-tight text-[#F3E9DC]"
                style={{ fontFamily: "'Fraunces', serif" }}
              >
                Forgot your password?
              </h1>

              <p className="mx-auto mt-3 max-w-[300px] text-center text-[14px] leading-relaxed text-[#B8A99A]">
                Enter your email and we&apos;ll send you a link to reset your
                password.
              </p>

              <form
                className="mt-6 space-y-4"
                onSubmit={handleSubmit}
                noValidate
              >
                <div>
                  <label
                    htmlFor="forgot-password-email"
                    className="mb-1.5 block text-[13px] font-medium text-[#B8A99A]"
                  >
                    Email
                  </label>

                  <div className="relative">
                    <span className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-[#8A7B6C]">
                      <MailIcon className="h-[18px] w-[18px]" />
                    </span>

                    <input
                      id="forgot-password-email"
                      type="email"
                      placeholder="you@studyspace.app"
                      autoComplete="email"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                      }}
                      aria-invalid={Boolean(forgotPasswordError)}
                      aria-describedby={
                        forgotPasswordError
                          ? "forgot-password-email-error"
                          : undefined
                      }
                      className={`w-full rounded-xl border bg-[#1B140F] py-2.5 pl-10 pr-3.5 text-[14.5px] text-[#F3E9DC] placeholder-[#6B5D50] outline-none transition-colors duration-200 focus:ring-2 ${
                        forgotPasswordError
                          ? "border-[#B8503F] focus:border-[#B8503F]/70 focus:ring-[#B8503F]/15"
                          : "border-[#3A2C22] focus:border-[#E3A567]/60 focus:ring-[#E3A567]/15"
                      }`}
                    />
                  </div>

                  {forgotPasswordError && (
                    <p
                      id="forgot-password-email-error"
                      className="mt-1.5 text-[12.5px] text-[#D98A78]"
                    >
                      {forgotPasswordError}
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={forgotPasswordLoading}
                  className="flex w-full items-center justify-center rounded-xl bg-gradient-to-b from-[#E8B679] to-[#C97D4A] py-2.5 text-[15px] font-semibold text-[#221407] shadow-[0_8px_20px_-6px_rgba(201,125,74,0.55)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_12px_26px_-6px_rgba(201,125,74,0.7)] active:translate-y-0 active:shadow-[0_4px_12px_-4px_rgba(201,125,74,0.5)] disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {forgotPasswordLoading ? "Sending..." : "Send reset link"}
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
            </>
          )}
        </div>

        <p className="mt-6 text-center text-[12.5px] text-[#6B5D50]">
          A quiet corner for late-night focus.
        </p>
      </div>
    </div>
  );
}
