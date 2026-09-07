import React, { useState } from "react";

import { MenuIcon, CloseIcon, FlameIcon } from "../components/icons/icons";
import Logo from "../components/icons/logo";
import LoFiBackground from "../components/background";
import { useAuthStore } from "../stores/auth.store";

import SidebarContents from "../components/auth/SideBarContents";

/* ------------------------------------------------------------------ */
/*  Page                                                                */
/* ------------------------------------------------------------------ */

export default function HomePage() {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  const hour = new Date().getHours();
  const timeGreeting =
    hour < 12 ? "Good morning" : hour < 18 ? "Good afternoon" : "Good evening";
  const today = new Date().toLocaleDateString(undefined, {
    weekday: "long",
    month: "long",
    day: "numeric",
  });

  const user = useAuthStore((state) => state.user);


  return (
    <div
      className="relative min-h-screen bg-[#120C09]"
      style={{ fontFamily: "'Manrope', sans-serif" }}
    >
      <LoFiBackground />

      <div className="relative z-10 flex min-h-screen">
        {/* Desktop sidebar */}
        <aside className="hidden w-64 shrink-0 border-r border-[#3A2C22]/70 bg-[#150F0B]/90 px-4 py-6 backdrop-blur-sm md:fixed md:inset-y-0 md:flex md:flex-col">
          <SidebarContents />
        </aside>

        {/* Mobile top bar */}
        <header className="fixed inset-x-0 top-0 z-30 flex items-center justify-between border-b border-[#3A2C22]/70 bg-[#150F0B]/90 px-4 py-3 backdrop-blur-sm md:hidden">
          <Logo />
          <button
            type="button"
            onClick={() => setMobileNavOpen(true)}
            className="flex h-9 w-9 items-center justify-center rounded-lg text-[#B8A99A] transition-colors duration-200 hover:bg-[#1B140F] hover:text-[#F3E9DC]"
            aria-label="Open menu"
          >
            <MenuIcon className="h-5 w-5" />
          </button>
        </header>

        {/* Mobile drawer */}
        {mobileNavOpen && (
          <div className="fixed inset-0 z-40 md:hidden">
            <button
              type="button"
              aria-label="Close menu"
              onClick={() => setMobileNavOpen(false)}
              className="absolute inset-0 bg-black/60"
            />
            <div className="absolute inset-y-0 left-0 w-72 border-r border-[#3A2C22]/70 bg-[#150F0B] px-4 py-6 shadow-[0_0_40px_rgba(0,0,0,0.5)]">
              <div className="mb-2 flex justify-end">
                <button
                  type="button"
                  onClick={() => setMobileNavOpen(false)}
                  className="flex h-8 w-8 items-center justify-center rounded-lg text-[#B8A99A] hover:bg-[#1B140F] hover:text-[#F3E9DC]"
                  aria-label="Close menu"
                >
                  <CloseIcon className="h-4 w-4" />
                </button>
              </div>
              <SidebarContents />
            </div>
          </div>
        )}

        {/* Main content — deliberately minimal for now */}
        <main className="flex min-w-0 flex-1 flex-col px-5 pb-12 pt-20 md:ml-64 md:px-10 md:pt-10">
          <div className="mx-auto w-full max-w-5xl">
            <div className="mb-10 animate-[ss-fade-up_0.5s_cubic-bezier(0.16,1,0.3,1)_both]">
              <h1
                className="text-[1.7rem] italic tracking-tight text-[#F3E9DC]"
                style={{ fontFamily: "'Fraunces', serif" }}
              >
                {timeGreeting}, {user?.user_metadata.display_name}
              </h1>
              <p className="mt-1 text-[14px] text-[#8A7B6C]">{today}</p>
            </div>

            <div className="flex min-h-[360px] flex-col items-center justify-center rounded-2xl border border-dashed border-[#3A2C22] bg-[#1D1611]/50 p-10 text-center backdrop-blur-sm">
              <span className="mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-[#2A1F17] ring-1 ring-[#E3A567]/25 shadow-[0_0_24px_-4px_rgba(227,165,103,0.45)]">
                <FlameIcon className="h-7 w-7 text-[#E3A567]" />
              </span>
              <h2
                className="text-[1.1rem] italic tracking-tight text-[#F3E9DC]"
                style={{ fontFamily: "'Fraunces', serif" }}
              >
                Your space is ready
              </h2>
              <p className="mt-2 max-w-[320px] text-[13.5px] leading-relaxed text-[#8A7B6C]">
                Subjects, tasks, and progress will live here once they&apos;re
                built out.
              </p>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
