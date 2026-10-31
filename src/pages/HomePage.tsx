import React, { useEffect, useState } from "react";

import { MenuIcon, CloseIcon } from "../components/icons/icons";
import Logo from "../components/icons/logo";
import LoFiBackground from "../components/background";
import { useAuthStore } from "../stores/auth.store";
import useTaskStore from "../stores/task.store";

import SidebarContents from "../components/auth/SideBarContents";

// ------------------------------------------------------------------
// Page
// ------------------------------------------------------------------

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

  const user = useAuthStore((s) => s.user);

  // Task statistics
  const tasks = useTaskStore((s) => s.Tasks);
  const fetchTasks = useTaskStore((s) => s.fetchTasks);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const tasksRemaining = tasks.filter((task) => !task.completed).length;

  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);

  const dueTomorrow = tasks.filter((task) => {
    if (task.completed || !task.due_date) return false;

    const dueDate = new Date(task.due_date);

    return (
      dueDate.getFullYear() === tomorrow.getFullYear() &&
      dueDate.getMonth() === tomorrow.getMonth() &&
      dueDate.getDate() === tomorrow.getDate()
    );
  }).length;

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

        {/* Main content */}
        <main className="flex min-w-0 flex-1 flex-col px-5 pb-12 pt-20 md:ml-64 md:px-10 md:pt-10">
          <div className="mx-auto w-full max-w-5xl">
            {/* Greeting */}
            <div className="mb-10 animate-[ss-fade-up_0.5s_cubic-bezier(0.16,1,0.3,1)_both]">
              <h1
                className="text-[1.7rem] italic tracking-tight text-[#F3E9DC]"
                style={{ fontFamily: "'Fraunces', serif" }}
              >
                {timeGreeting}, {user?.username}
              </h1>

              <p className="mt-1 text-[14px] text-[#8A7B6C]">{today}</p>
            </div>

            {/* Task statistics */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {/* Tasks Remaining */}
              <div className="rounded-2xl border border-[#3A2C22]/70 bg-[#1D1611]/70 p-6 backdrop-blur-sm transition-colors hover:border-[#E3A567]/30">
                <p className="text-[13px] text-[#8A7B6C]">Tasks Remaining</p>

                <h2
                  className="mt-3 text-4xl text-[#F3E9DC]"
                  style={{ fontFamily: "'Fraunces', serif" }}
                >
                  {tasksRemaining}
                </h2>

                <p className="mt-2 text-[12px] text-[#8A7B6C]">
                  Tasks left to complete
                </p>
              </div>

              {/* Due Tomorrow */}
              <div className="rounded-2xl border border-[#3A2C22]/70 bg-[#1D1611]/70 p-6 backdrop-blur-sm transition-colors hover:border-[#E3A567]/30">
                <p className="text-[13px] text-[#8A7B6C]">Due Tomorrow</p>

                <h2
                  className="mt-3 text-4xl text-[#E3A567]"
                  style={{ fontFamily: "'Fraunces', serif" }}
                >
                  {dueTomorrow}
                </h2>

                <p className="mt-2 text-[12px] text-[#8A7B6C]">
                  Incomplete tasks due tomorrow
                </p>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
