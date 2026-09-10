import React from "react";
import { useNavigate } from "react-router-dom";

import { CheckIcon } from "../../components/icons/icons";
import Logo from "../../components/icons/logo";
import LoFiBackground from "../../components/background";

export default function EmailConfirmed() {
  const navigate = useNavigate();

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

        <div className="rounded-2xl border border-[#3A2C22]/70 bg-[#1D1611]/85 p-7 text-center shadow-[0_24px_60px_-15px_rgba(0,0,0,0.65)] backdrop-blur-sm">
          <div className="mb-5 flex justify-center">
            <span className="flex h-20 w-20 items-center justify-center rounded-full bg-[#2A1F17] ring-1 ring-[#E3A567]/25 shadow-[0_0_28px_-4px_rgba(227,165,103,0.5)]">
              <CheckIcon className="h-9 w-9 text-[#E3A567]" />
            </span>
          </div>

          <h1
            className="text-[1.4rem] italic tracking-tight text-[#F3E9DC]"
            style={{ fontFamily: "'Fraunces', serif" }}
          >
            Email Confirmed!
          </h1>

          <p className="mx-auto mt-3 max-w-[300px] text-[14px] leading-relaxed text-[#B8A99A]">
            Your email address has been successfully confirmed. Your Study Space
            account is ready to go.
          </p>

          <button
            type="button"
            onClick={() => navigate("/login")}
            className="mt-6 w-full rounded-xl bg-gradient-to-b from-[#E8B679] to-[#C97D4A] py-2.5 text-[15px] font-semibold text-[#221407] shadow-[0_8px_20px_-6px_rgba(201,125,74,0.55)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_12px_26px_-6px_rgba(201,125,74,0.7)] active:translate-y-0 active:shadow-[0_4px_12px_-4px_rgba(201,125,74,0.5)]"
          >
            Continue to login
          </button>
        </div>

        <p className="mt-6 text-center text-[12.5px] text-[#6B5D50]">
          A quiet corner for late-night focus.
        </p>
      </div>
    </div>
  );
}
