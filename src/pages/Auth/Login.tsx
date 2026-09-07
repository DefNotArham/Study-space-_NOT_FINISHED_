import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { MailIcon, LockIcon } from "../../components/icons/icons";

import Logo from "../../components/icons/logo";
import LoFiBackground from "../../components/background";

import Input from "../../components/auth/AuthInput";
import AuthButton from "../../components/auth/AuthButton";
import LoadingSpinner from "../../components/ui/LoadingSpinner";

import { useAuthStore } from "../../stores/auth.store";

export default function Login() {
  // Design-only, local state — no validation or submission.
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const login = useAuthStore((state) => state.login);
  const loginError = useAuthStore((state) => state.loginError);
  const loginLoading = useAuthStore((state) => state.loginLoading);

  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      await login(email, password);
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
          <p className="mt-3 max-w-[280px] text-[14px] leading-relaxed text-[#B8A99A]">
            Your space to focus, learn, and grow.
          </p>
        </div>

        <div className="rounded-2xl border border-[#3A2C22]/70 bg-[#1D1611]/85 p-7 shadow-[0_24px_60px_-15px_rgba(0,0,0,0.65)] backdrop-blur-sm">
          <form
            className="space-y-4"
            onSubmit={(e) => {
              e.preventDefault();
              handleLogin();
            }}
          >
            <Input
              id="login-email"
              label="Email"
              type="email"
              placeholder="you@studyspace.app"
              icon={<MailIcon className="h-[18px] w-[18px]" />}
              value={email}
              onChange={setEmail}
              autoComplete="email"
            />
            <Input
              id="login-password"
              label="Password"
              type="password"
              placeholder="••••••••"
              icon={<LockIcon className="h-[18px] w-[18px]" />}
              value={password}
              onChange={setPassword}
              autoComplete="current-password"
            />

            <div className="-mt-1 flex justify-end">
              <button
                type="button"
                className="text-[12.5px] text-[#8A7B6C] transition-colors duration-200 hover:text-[#E3A567] cursor-pointer"
              >
                Forgot password?
              </button>
            </div>

            {loginError && (
              <div
                role="alert"
                className="flex items-center gap-2 rounded-xl border border-red-400/20 bg-red-400/10 px-3.5 py-3 text-[13px] text-red-300"
              >
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-red-300/30 text-[11px]">
                  !
                </span>

                <span>{loginError}</span>
              </div>
            )}

            <AuthButton type="submit">
              {loginLoading ? <LoadingSpinner /> : "Sign in"}
            </AuthButton>

            <p className="pt-1 text-center text-[13px] text-[#8A7B6C]">
              Don&apos;t have an account?{" "}
              <Link
                to="/register"
                className="font-medium text-[#E3A567] transition-colors duration-200 hover:text-[#EFC694]"
              >
                Sign up
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
