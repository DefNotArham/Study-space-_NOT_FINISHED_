import { useState } from "react";

import {
  PlusIcon,
  CloseIcon,
  ChecklistIcon,
  CheckIcon,
  PlayIcon,
  PauseIcon,
  TrashIcon,
  EditIcon,
  FlameIcon,
} from "../components/icons/icons";
import Logo from "../components/icons/logo";
import LoFiBackground from "../components/background";
import SidebarContents from "../components/auth/SideBarContents";

/* ------------------------------------------------------------------ */
/*  Static placeholder content: visual design only, nothing is wired    */
/* ------------------------------------------------------------------ */

type Preset = {
  id: string;
  name: string;
  focus: number;
  shortBreak: number;
  longBreak: number;
  sessionsBeforeLong: number;
};

const PRESETS: Preset[] = [
  {
    id: "p1",
    name: "Classic Pomodoro",
    focus: 25,
    shortBreak: 5,
    longBreak: 15,
    sessionsBeforeLong: 4,
  },
  {
    id: "p2",
    name: "Deep Work",
    focus: 50,
    shortBreak: 10,
    longBreak: 30,
    sessionsBeforeLong: 3,
  },
  {
    id: "p3",
    name: "Quick Review",
    focus: 15,
    shortBreak: 3,
    longBreak: 10,
    sessionsBeforeLong: 4,
  },
];

const SELECTED_PRESET_ID = "p1";

// Mock timer state for the mockup
const MOCK_MODE = "Focus";
const MOCK_TIME_LEFT = "15:30";
const MOCK_PROGRESS = 0.38; // fraction of the session already elapsed
const MOCK_SESSION = 2;
const MOCK_SESSION_TOTAL = 4;

const MODES = ["Focus", "Short Break", "Long Break"];

const STATS = [
  { label: "Sessions today", value: "5", hint: "focus sessions completed" },
  { label: "Focus time today", value: "2h 05m", hint: "total time focused" },
  { label: "Study streak", value: "6 days", hint: "keep it going" },
];

/* ------------------------------------------------------------------ */
/*  Pieces                                                              */
/* ------------------------------------------------------------------ */

function Card({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`rounded-2xl border border-[#3A2C22]/70 bg-[#1D1611]/85 shadow-[0_20px_50px_-20px_rgba(0,0,0,0.6)] backdrop-blur-sm ${className}`}
    >
      {children}
    </div>
  );
}

function ProgressRing({
  progress,
  children,
}: {
  progress: number;
  children: React.ReactNode;
}) {
  const size = 280;
  const stroke = 10;
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;

  return (
    <div className="relative mx-auto flex h-[280px] w-[280px] max-w-full items-center justify-center">
      <svg
        viewBox={`0 0 ${size} ${size}`}
        className="absolute inset-0 h-full w-full -rotate-90"
      >
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="#2A1F17"
          strokeWidth={stroke}
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="#E3A567"
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={circumference * (1 - progress)}
        />
      </svg>
      <div className="relative flex flex-col items-center">{children}</div>
    </div>
  );
}

function PresetStat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg bg-[#150F0B] px-3 py-2">
      <p className="text-[11.5px] text-[#8A7B6C]">{label}</p>
      <p className="mt-0.5 text-[14px] font-semibold text-[#F3E9DC]">{value}</p>
    </div>
  );
}

function PresetCard({
  preset,
  selected,
  onEdit,
}: {
  preset: Preset;
  selected: boolean;
  onEdit: () => void;
}) {
  return (
    <div
      className={`flex flex-col rounded-2xl border p-5 shadow-[0_10px_30px_-18px_rgba(0,0,0,0.7)] transition-all duration-200 hover:-translate-y-0.5 ${
        selected
          ? "border-[#E3A567]/50 bg-[#241A14]"
          : "border-[#3A2C22]/70 bg-[#1D1611] hover:border-[#4A392C]"
      }`}
    >
      <div className="mb-4 flex items-start justify-between gap-2">
        <div className="min-w-0">
          <h3 className="truncate text-[15px] font-semibold text-[#F3E9DC]">
            {preset.name}
          </h3>
          {selected && (
            <span className="mt-1.5 inline-flex items-center gap-1 rounded-full border border-[#E3A56755] px-2 py-0.5 text-[11px] text-[#E3A567]">
              <CheckIcon className="h-3 w-3" />
              Active
            </span>
          )}
        </div>

        <div className="flex shrink-0 items-center gap-0.5">
          <button
            type="button"
            onClick={onEdit}
            aria-label={`Edit ${preset.name}`}
            className="flex h-8 w-8 items-center justify-center rounded-lg text-[#8A7B6C] transition-colors duration-200 hover:bg-[#1B140F] hover:text-[#E3A567]"
          >
            <EditIcon className="h-4 w-4" />
          </button>
          <button
            type="button"
            aria-label={`Delete ${preset.name}`}
            className="flex h-8 w-8 items-center justify-center rounded-lg text-[#8A7B6C] transition-colors duration-200 hover:bg-[#1B140F] hover:text-[#D98A78]"
          >
            <TrashIcon className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2">
        <PresetStat label="Focus" value={`${preset.focus} min`} />
        <PresetStat label="Short break" value={`${preset.shortBreak} min`} />
        <PresetStat label="Long break" value={`${preset.longBreak} min`} />
        <PresetStat
          label="Long break after"
          value={`${preset.sessionsBeforeLong} sessions`}
        />
      </div>

      <button
        type="button"
        className={`mt-4 rounded-xl py-2 text-[13.5px] font-medium transition-colors duration-200 ${
          selected
            ? "cursor-default border border-[#E3A567]/30 text-[#E3A567]"
            : "border border-[#3A2C22] text-[#9C8D7E] hover:border-[#4A392C] hover:text-[#F3E9DC]"
        }`}
      >
        {selected ? "Selected" : "Select session"}
      </button>
    </div>
  );
}

function ModalField({
  id,
  label,
  suffix,
  children,
}: {
  id: string;
  label: string;
  suffix?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label
        htmlFor={id}
        className="mb-1.5 block text-[13px] font-medium text-[#B8A99A]"
      >
        {label}
        {suffix && <span className="ml-1 text-[#6B5D50]">{suffix}</span>}
      </label>
      {children}
    </div>
  );
}

const INPUT_CLASS =
  "w-full rounded-xl border border-[#3A2C22] bg-[#1B140F] py-2.5 px-3.5 text-[14px] text-[#F3E9DC] placeholder-[#6B5D50] outline-none transition-colors duration-200 focus:border-[#E3A567]/60 focus:ring-2 focus:ring-[#E3A567]/15";

/* ------------------------------------------------------------------ */
/*  Page                                                                */
/* ------------------------------------------------------------------ */

const PomodoroPage = () => {
  // UI-only state: mobile menu drawer and the create/edit modal visibility.
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [modalMode, setModalMode] = useState<"create" | "edit" | null>(null);

  // Mock "currently running" toggle so both button designs can be previewed.
  const running = true;

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
        <main className="min-w-0 flex-1 px-5 pb-16 pt-20 md:ml-64 md:px-10 md:pt-10">
          <div className="mx-auto max-w-6xl">
            {/* Header */}
            <div className="mb-8 animate-[ss-fade-up_0.5s_cubic-bezier(0.16,1,0.3,1)_both]">
              <h1
                className="text-[1.7rem] italic tracking-tight text-[#F3E9DC]"
                style={{ fontFamily: "'Fraunces', serif" }}
              >
                Pomodoro
              </h1>
              <p className="mt-1 text-[14px] text-[#8A7B6C]">
                Focus in sessions that fit the way you study.
              </p>
            </div>

            {/* Timer + stats */}
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-3 animate-[ss-fade-up_0.6s_cubic-bezier(0.16,1,0.3,1)_both]">
              {/* Timer */}
              <Card className="p-6 sm:p-8 lg:col-span-2">
                {/* Mode switch */}
                <div className="mx-auto mb-8 flex w-fit max-w-full items-center gap-1 rounded-xl border border-[#3A2C22] bg-[#150F0B] p-1">
                  {MODES.map((mode) => (
                    <button
                      key={mode}
                      type="button"
                      className={`rounded-lg px-3 py-1.5 text-[12.5px] font-medium transition-colors duration-200 sm:px-4 sm:text-[13px] ${
                        mode === MOCK_MODE
                          ? "bg-[#2E2117] text-[#F3E9DC]"
                          : "text-[#8A7B6C] hover:text-[#B8A99A]"
                      }`}
                    >
                      {mode}
                    </button>
                  ))}
                </div>

                {/* Ring + countdown */}
                <ProgressRing progress={MOCK_PROGRESS}>
                  <span className="text-[12.5px] font-medium uppercase tracking-[0.14em] text-[#E3A567]">
                    {MOCK_MODE}
                  </span>
                  <span className="mt-1 text-[4rem] font-semibold leading-none tracking-tight text-[#F3E9DC] sm:text-[4.25rem]">
                    {MOCK_TIME_LEFT}
                  </span>
                  <span className="mt-3 text-[13px] text-[#8A7B6C]">
                    Classic Pomodoro
                  </span>
                </ProgressRing>

                {/* Session counter */}
                <div className="mt-7 flex flex-col items-center gap-2">
                  <div className="flex items-center gap-2">
                    {Array.from({ length: MOCK_SESSION_TOTAL }).map((_, i) => (
                      <span
                        key={i}
                        className={`h-2 w-8 rounded-full ${
                          i < MOCK_SESSION ? "bg-[#E3A567]" : "bg-[#2A1F17]"
                        }`}
                      />
                    ))}
                  </div>
                  <p className="text-[13px] text-[#8A7B6C]">
                    Session {MOCK_SESSION} of {MOCK_SESSION_TOTAL}
                  </p>
                </div>

                {/* Controls */}
                <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
                  <button
                    type="button"
                    className="flex min-w-[140px] items-center justify-center gap-2 rounded-xl bg-gradient-to-b from-[#E8B679] to-[#C97D4A] px-6 py-3 text-[14.5px] font-semibold text-[#221407] shadow-[0_8px_20px_-6px_rgba(201,125,74,0.55)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_12px_26px_-6px_rgba(201,125,74,0.7)] active:translate-y-0"
                  >
                    {running ? (
                      <PauseIcon className="h-4 w-4" />
                    ) : (
                      <PlayIcon className="h-4 w-4" />
                    )}
                    {running ? "Pause" : "Start"}
                  </button>
                  <button
                    type="button"
                    className="rounded-xl border border-[#3A2C22] px-6 py-3 text-[14.5px] font-medium text-[#9C8D7E] transition-colors duration-200 hover:border-[#4A392C] hover:text-[#F3E9DC]"
                  >
                    Reset
                  </button>
                </div>
              </Card>

              {/* Stats */}
              <div className="flex flex-col gap-4">
                <h2 className="px-1 text-[13px] font-medium uppercase tracking-[0.12em] text-[#8A7B6C]">
                  Today
                </h2>
                {STATS.map((stat, i) => (
                  <Card
                    key={stat.label}
                    className="flex items-center gap-4 px-5 py-4"
                  >
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#2A1F17] ring-1 ring-[#E3A567]/25">
                      {i === 2 ? (
                        <FlameIcon className="h-[18px] w-[18px] text-[#E3A567]" />
                      ) : (
                        <CheckIcon className="h-[18px] w-[18px] text-[#E3A567]" />
                      )}
                    </span>
                    <div className="min-w-0">
                      <p className="text-[22px] font-semibold leading-tight text-[#F3E9DC]">
                        {stat.value}
                      </p>
                      <p className="text-[12.5px] text-[#8A7B6C]">
                        {stat.label}
                      </p>
                    </div>
                  </Card>
                ))}
              </div>
            </div>

            {/* Presets */}
            <section className="mt-12">
              <div className="mb-5 flex flex-wrap items-end justify-between gap-4">
                <div>
                  <h2
                    className="text-[1.25rem] italic tracking-tight text-[#F3E9DC]"
                    style={{ fontFamily: "'Fraunces', serif" }}
                  >
                    Your sessions
                  </h2>
                  <p className="mt-1 text-[13.5px] text-[#8A7B6C]">
                    Pick a saved rhythm or create one of your own.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => setModalMode("create")}
                  className="flex items-center gap-1.5 rounded-xl bg-gradient-to-b from-[#E8B679] to-[#C97D4A] px-4 py-2.5 text-[14px] font-semibold text-[#221407] shadow-[0_8px_20px_-6px_rgba(201,125,74,0.55)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_12px_26px_-6px_rgba(201,125,74,0.7)] active:translate-y-0 cursor-pointer"
                >
                  <PlusIcon className="h-4 w-4" />
                  Create Custom Session
                </button>
              </div>

              <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
                {PRESETS.map((preset) => (
                  <PresetCard
                    key={preset.id}
                    preset={preset}
                    selected={preset.id === SELECTED_PRESET_ID}
                    onEdit={() => setModalMode("edit")}
                  />
                ))}
              </div>
            </section>
          </div>
        </main>
      </div>

      {/* Create / edit modal */}
      {modalMode && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
          <button
            type="button"
            aria-label="Close"
            onClick={() => setModalMode(null)}
            className="absolute inset-0 bg-black/60"
          />

          <div className="relative max-h-[90vh] w-full max-w-md overflow-y-auto rounded-2xl border border-[#3A2C22]/70 bg-[#1D1611] p-6 shadow-[0_24px_60px_-15px_rgba(0,0,0,0.65)]">
            <div className="mb-5 flex items-center justify-between">
              <h2
                className="text-[1.2rem] italic tracking-tight text-[#F3E9DC]"
                style={{ fontFamily: "'Fraunces', serif" }}
              >
                {modalMode === "create"
                  ? "Create custom session"
                  : "Edit session"}
              </h2>
              <button
                type="button"
                onClick={() => setModalMode(null)}
                className="flex h-8 w-8 items-center justify-center rounded-lg text-[#8A7B6C] transition-colors duration-200 hover:bg-[#1B140F] hover:text-[#F3E9DC] cursor-pointer"
                aria-label="Close"
              >
                <CloseIcon className="h-4 w-4" />
              </button>
            </div>

            <form
              className="flex flex-col gap-4"
              onSubmit={(e) => e.preventDefault()}
            >
              <ModalField id="session-name" label="Session name">
                <input
                  id="session-name"
                  placeholder="e.g. Evening Deep Work"
                  defaultValue={modalMode === "edit" ? "Classic Pomodoro" : ""}
                  className={INPUT_CLASS}
                />
              </ModalField>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                <ModalField id="session-focus" label="Focus" suffix="(min)">
                  <input
                    id="session-focus"
                    type="number"
                    min={1}
                    placeholder="25"
                    defaultValue={modalMode === "edit" ? 25 : undefined}
                    className={INPUT_CLASS}
                  />
                </ModalField>
                <ModalField
                  id="session-short"
                  label="Short break"
                  suffix="(min)"
                >
                  <input
                    id="session-short"
                    type="number"
                    min={1}
                    placeholder="5"
                    defaultValue={modalMode === "edit" ? 5 : undefined}
                    className={INPUT_CLASS}
                  />
                </ModalField>
                <ModalField id="session-long" label="Long break" suffix="(min)">
                  <input
                    id="session-long"
                    type="number"
                    min={1}
                    placeholder="15"
                    defaultValue={modalMode === "edit" ? 15 : undefined}
                    className={INPUT_CLASS}
                  />
                </ModalField>
              </div>

              <ModalField
                id="session-count"
                label="Focus sessions before a long break"
              >
                <input
                  id="session-count"
                  type="number"
                  min={1}
                  placeholder="4"
                  defaultValue={modalMode === "edit" ? 4 : undefined}
                  className={INPUT_CLASS}
                />
              </ModalField>

              <div className="mt-1 flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setModalMode(null)}
                  className="flex-1 rounded-xl border border-[#3A2C22] py-2.5 text-[14px] font-medium text-[#9C8D7E] transition-colors duration-200 hover:border-[#4A392C] hover:text-[#F3E9DC] cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 rounded-xl bg-gradient-to-b from-[#E8B679] to-[#C97D4A] py-2.5 text-[14px] font-semibold text-[#221407] shadow-[0_8px_20px_-6px_rgba(201,125,74,0.55)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_12px_26px_-6px_rgba(201,125,74,0.7)] active:translate-y-0 cursor-pointer"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default PomodoroPage;
