import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MailIcon, LockIcon, UserIcon } from "../../components/icons/icons";

import Logo from "../../components/icons/logo";
import LoFiBackground from "../../components/background";

import Input from "../../components/auth/AuthInput";
import AuthButton from "../../components/auth/AuthButton";

import { useAuthStore } from "../../stores/auth.store";
import LoadingSpinner from "../../components/ui/LoadingSpinner";

export default function Register() {
  // Design-only, local state — no validation or submission.
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const register = useAuthStore((state) => state.register);
  const registerError = useAuthStore((state) => state.registerError);
  const registerLoading = useAuthStore((state) => state.registerLoading);

  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      await register(email, name, password, confirmPassword);
      navigate("/check-email");
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
            Set up your space to focus, learn, and grow.
          </p>
        </div>

        <div className="rounded-2xl border border-[#3A2C22]/70 bg-[#1D1611]/85 p-7 shadow-[0_24px_60px_-15px_rgba(0,0,0,0.65)] backdrop-blur-sm">
          <form
            className="space-y-4"
            onSubmit={(e) => {
              e.preventDefault();

              handleRegister();
            }}
          >
            <Input
              id="register-name"
              label="Name"
              type="text"
              placeholder="Arham Kabir"
              icon={<UserIcon className="h-[18px] w-[18px]" />}
              value={name}
              onChange={setName}
              autoComplete="name"
            />
            <Input
              id="register-email"
              label="Email"
              type="email"
              placeholder="you@studyspace.app"
              icon={<MailIcon className="h-[18px] w-[18px]" />}
              value={email}
              onChange={setEmail}
              autoComplete="email"
            />
            <Input
              id="register-password"
              label="Password"
              type="password"
              placeholder="••••••••"
              icon={<LockIcon className="h-[18px] w-[18px]" />}
              value={password}
              onChange={setPassword}
              autoComplete="new-password"
            />
            <Input
              id="register-confirm-password"
              label="Confirm password"
              type="password"
              placeholder="••••••••"
              icon={<LockIcon className="h-[18px] w-[18px]" />}
              value={confirmPassword}
              onChange={setConfirmPassword}
              autoComplete="new-password"
            />

            {registerError && (
              <div
                role="alert"
                className="flex items-center gap-2 rounded-xl border border-red-400/20 bg-red-400/10 px-3.5 py-3 text-[13px] text-red-300"
              >
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-red-300/30 text-[11px]">
                  !
                </span>

                <span>{registerError}</span>
              </div>
            )}

            <AuthButton type="submit">
              {registerLoading ? <LoadingSpinner /> : "Create account"}
            </AuthButton>

            <p className="pt-1 text-center text-[13px] text-[#8A7B6C]">
              Already have an account?{" "}
              <Link
                to="/login"
                className="font-medium text-[#E3A567] transition-colors duration-200 hover:text-[#EFC694]"
              >
                Sign in
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
