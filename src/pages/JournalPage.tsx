import { useState } from "react";

import {
  BookIcon,
  PlusIcon,
  CloseIcon,
  ChecklistIcon,
} from "../components/icons/icons";

import Logo from "../components/icons/logo";
import LoFiBackground from "../components/background";
import SidebarContents from "../components/auth/SideBarContents";

const JournalPage = () => {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  return (
    <div
      className="relative h-screen overflow-hidden bg-[#120C09]"
      style={{ fontFamily: "'Manrope', sans-serif" }}
    >
      <LoFiBackground />

      <div className="relative z-10 flex h-screen overflow-hidden">
        {/* Desktop sidebar */}
        <aside className="fixed inset-y-0 hidden w-64 shrink-0 flex-col border-r border-[#3A2C22]/70 bg-[#150F0B]/90 px-4 py-6 backdrop-blur-sm md:flex">
          <SidebarContents />
        </aside>

        {/* Mobile top bar */}
        <header className="fixed inset-x-0 top-0 z-30 flex items-center justify-between border-b border-[#3A2C22]/70 bg-[#150F0B]/90 px-4 py-3 backdrop-blur-sm md:hidden">
          <Logo />

          <button
            type="button"
            onClick={() => setMobileNavOpen(true)}
            className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-lg text-[#B8A99A] transition-colors hover:bg-[#1B140F] hover:text-[#F3E9DC]"
            aria-label="Open menu"
          >
            <ChecklistIcon className="h-5 w-5" />
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
                  className="flex h-8 w-8 items-center justify-center rounded-lg text-[#B8A99A] transition-colors hover:bg-[#1B140F] hover:text-[#F3E9DC]"
                  aria-label="Close menu"
                >
                  <CloseIcon className="h-4 w-4" />
                </button>
              </div>

              <SidebarContents />
            </div>
          </div>
        )}

        {/* Main content */}
        <main className="h-screen min-w-0 flex-1 overflow-y-auto px-5 pb-6 pt-20 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden md:ml-64 md:px-10 md:pt-10">
          <div className="mx-auto flex min-h-full max-w-6xl flex-col">
            {/* Page header */}
            <div className="mb-9 flex animate-[ss-fade-up_0.5s_cubic-bezier(0.16,1,0.3,1)_both] flex-wrap items-end justify-between gap-5">
              <div>
                <h1
                  className="text-3xl italic tracking-tight text-[#F3E9DC]"
                  style={{ fontFamily: "'Fraunces', serif" }}
                >
                  My Journal
                </h1>

                <p className="mt-2 text-[14px] text-[#8A7B6C]">
                  Your personal space to write down your thoughts.
                </p>
              </div>

              <button
                type="button"
                className="flex cursor-pointer items-center gap-2 rounded-xl bg-gradient-to-b from-[#E8B679] to-[#C97D4A] px-4 py-2.5 text-[14px] font-semibold text-[#221407] shadow-[0_8px_20px_-6px_rgba(201,125,74,0.55)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_12px_26px_-6px_rgba(201,125,74,0.7)]"
              >
                <PlusIcon className="h-4 w-4" />
                New entry
              </button>
            </div>

            {/* Recent entries */}
            <section className="flex flex-1 flex-col">
              <div className="mb-5 flex items-center justify-between border-b border-[#3A2C22]/70 pb-4">
                <div>
                  <h2
                    className="text-xl italic text-[#F3E9DC]"
                    style={{ fontFamily: "'Fraunces', serif" }}
                  >
                    Recent entries
                  </h2>

                  <p className="mt-1 text-[12px] text-[#8A7B6C]">
                    Look back on your thoughts and memories.
                  </p>
                </div>

                <span className="rounded-lg border border-[#3A2C22] bg-[#1D1611] px-3 py-1.5 text-[11px] text-[#9C8D7E]">
                  0 entries
                </span>
              </div>

              {/* Empty state */}
              <div className="flex min-h-[350px] flex-1 flex-col items-center justify-center rounded-2xl border border-[#3A2C22]/70 bg-[#150F0B]/80 px-6 py-12 text-center shadow-[0_20px_50px_-20px_rgba(0,0,0,0.6)] backdrop-blur-sm">
                <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-2xl border border-[#3A2C22] bg-[#1D1611]">
                  <BookIcon className="h-7 w-7 text-[#E3A567]" />
                </div>

                <h3
                  className="text-2xl italic text-[#F3E9DC]"
                  style={{ fontFamily: "'Fraunces', serif" }}
                >
                  Your story starts here.
                </h3>

                <p className="mt-3 max-w-sm text-[13px] leading-6 text-[#8A7B6C]">
                  You haven't written any entries yet. Start your first journal
                  entry and keep your thoughts, ideas, and memories in one
                  place.
                </p>
              </div>
            </section>
          </div>
        </main>
      </div>
    </div>
  );
};

export default JournalPage;
