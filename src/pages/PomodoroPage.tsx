import { useEffect, useState } from "react";

import {
  PlusIcon,
  CloseIcon,
  ChecklistIcon,
  PlayIcon,
  PauseIcon,
  EditIcon,
  TrashIcon,
} from "../components/icons/icons";
import Logo from "../components/icons/logo";
import LoFiBackground from "../components/background";
import SidebarContents from "../components/auth/SideBarContents";

/* ------------------------------------------------------------------ */
/*  Types + defaults                                                    */
/* ------------------------------------------------------------------ */

type Mode = "focus" | "short" | "long";

type Session = {
  id: string;
  name: string;
  focus: number; // minutes
  shortBreak: number; // minutes
  longBreak: number; // minutes
  rounds: number; // focus sessions before a long break
};

const DEFAULT_SESSIONS: Session[] = [
  {
    id: "classic",
    name: "Classic",
    focus: 25,
    shortBreak: 5,
    longBreak: 15,
    rounds: 4,
  },
  {
    id: "deep-work",
    name: "Deep Work",
    focus: 50,
    shortBreak: 10,
    longBreak: 30,
    rounds: 3,
  },
  {
    id: "quick-review",
    name: "Quick Review",
    focus: 15,
    shortBreak: 3,
    longBreak: 10,
    rounds: 4,
  },
];

const MODES: { key: Mode; label: string }[] = [
  { key: "focus", label: "Focus" },
  { key: "short", label: "Short Break" },
  { key: "long", label: "Long Break" },
];

const STORAGE_KEY = "study-space-pomodoro-sessions";

/* ------------------------------------------------------------------ */
/*  Helpers                                                             */
/* ------------------------------------------------------------------ */

function secondsFor(session: Session, mode: Mode) {
  const minutes =
    mode === "focus"
      ? session.focus
      : mode === "short"
        ? session.shortBreak
        : session.longBreak;
  return minutes * 60;
}

function formatTime(totalSeconds: number) {
  const m = Math.floor(totalSeconds / 60);
  const s = totalSeconds % 60;
  return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}

function loadCustomSessions(): Session[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

const INPUT_CLASS =
  "w-full rounded-xl border border-[#3A2C22] bg-[#1B140F] py-2.5 px-3.5 text-[14px] text-[#F3E9DC] placeholder-[#6B5D50] outline-none transition-colors duration-200 focus:border-[#E3A567]/60 focus:ring-2 focus:ring-[#E3A567]/15";

const LABEL_CLASS = "mb-1.5 block text-[13px] font-medium text-[#B8A99A]";

/* ------------------------------------------------------------------ */
/*  Page                                                                */
/* ------------------------------------------------------------------ */

const PomodoroPage = () => {
  // Sessions
  const [customSessions, setCustomSessions] =
    useState<Session[]>(loadCustomSessions);
  const [selectedId, setSelectedId] = useState(DEFAULT_SESSIONS[0].id);

  // Timer
  const [mode, setMode] = useState<Mode>("focus");
  const [timeLeft, setTimeLeft] = useState(DEFAULT_SESSIONS[0].focus * 60);
  const [running, setRunning] = useState(false);
  const [completed, setCompleted] = useState(0); // focus sessions finished in this cycle

  // Modal form (editingId === null means "create")
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState({
    name: "",
    focus: "25",
    shortBreak: "5",
    longBreak: "15",
    rounds: "4",
  });

  // UI-only
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  const allSessions = [...DEFAULT_SESSIONS, ...customSessions];
  const session =
    allSessions.find((s) => s.id === selectedId) ?? DEFAULT_SESSIONS[0];

  /* ---- persistence ---- */

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(customSessions));
    } catch {
      // storage unavailable — sessions just won't persist
    }
  }, [customSessions]);

  /* ---- countdown ---- */

  useEffect(() => {
    if (!running) return;
    const interval = setInterval(() => setTimeLeft((t) => t - 1), 1000);
    return () => clearInterval(interval);
  }, [running]);

  // When the countdown hits zero, move on to the next mode and wait for the user to press Start.
  useEffect(() => {
    if (timeLeft > 0) return;

    let nextMode: Mode;
    if (mode === "focus") {
      const done = completed + 1;
      setCompleted(done);
      nextMode = done >= session.rounds ? "long" : "short";
    } else {
      if (mode === "long") setCompleted(0);
      nextMode = "focus";
    }

    setMode(nextMode);
    setTimeLeft(secondsFor(session, nextMode));
    setRunning(false);
  }, [timeLeft, mode, completed, session]);

  /* ---- timer actions ---- */

  const switchMode = (next: Mode) => {
    setMode(next);
    setRunning(false);
    setTimeLeft(secondsFor(session, next));
  };

  const resetTimer = () => {
    setRunning(false);
    setTimeLeft(secondsFor(session, mode));
  };

  // Load a session into the timer from the beginning.
  const applySession = (s: Session) => {
    setSelectedId(s.id);
    setMode("focus");
    setCompleted(0);
    setRunning(false);
    setTimeLeft(secondsFor(s, "focus"));
  };

  /* ---- session actions ---- */

  const openCreate = () => {
    setEditingId(null);
    setForm({
      name: "",
      focus: "25",
      shortBreak: "5",
      longBreak: "15",
      rounds: "4",
    });
    setModalOpen(true);
  };

  const openEdit = (s: Session) => {
    setEditingId(s.id);
    setForm({
      name: s.name,
      focus: String(s.focus),
      shortBreak: String(s.shortBreak),
      longBreak: String(s.longBreak),
      rounds: String(s.rounds),
    });
    setModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();

    const data = {
      name: form.name.trim(),
      focus: Number(form.focus),
      shortBreak: Number(form.shortBreak),
      longBreak: Number(form.longBreak),
      rounds: Number(form.rounds),
    };

    if (editingId) {
      setCustomSessions((prev) =>
        prev.map((s) => (s.id === editingId ? { ...s, ...data } : s)),
      );
      if (editingId === selectedId) applySession({ id: editingId, ...data });
    } else {
      setCustomSessions((prev) => [
        ...prev,
        { id: Date.now().toString(36), ...data },
      ]);
    }

    setModalOpen(false);
  };

  const deleteSession = (id: string) => {
    setCustomSessions((prev) => prev.filter((s) => s.id !== id));
    if (id === selectedId) applySession(DEFAULT_SESSIONS[0]);
  };

  /* ---- ring ---- */

  const ringSize = 280;
  const ringStroke = 10;
  const ringRadius = (ringSize - ringStroke) / 2;
  const ringCircumference = 2 * Math.PI * ringRadius;
  const progress = 1 - timeLeft / secondsFor(session, mode);

  return (
    <div
      className="relative min-h-screen bg-[#120C09]"
      style={{ fontFamily: "'Manrope', sans-serif" }}
    >
      <style>{`
      html,
      body {
        scrollbar-width: none;
        -ms-overflow-style: none;
      }

      html::-webkit-scrollbar,
      body::-webkit-scrollbar {
        display: none;
      }
    `}</style>

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
            className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-lg text-[#B8A99A] transition-colors duration-200 hover:bg-[#1B140F] hover:text-[#F3E9DC]"
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
              className="absolute inset-0 cursor-pointer bg-black/60"
            />
            <div className="absolute inset-y-0 left-0 w-72 border-r border-[#3A2C22]/70 bg-[#150F0B] px-4 py-6 shadow-[0_0_40px_rgba(0,0,0,0.5)]">
              <div className="mb-2 flex justify-end">
                <button
                  type="button"
                  onClick={() => setMobileNavOpen(false)}
                  className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg text-[#B8A99A] hover:bg-[#1B140F] hover:text-[#F3E9DC]"
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
          <div className="mx-auto max-w-4xl">
            <h1
              className="mb-8 text-[1.7rem] italic tracking-tight text-[#F3E9DC] animate-[ss-fade-up_0.5s_cubic-bezier(0.16,1,0.3,1)_both]"
              style={{ fontFamily: "'Fraunces', serif" }}
            >
              Pomodoro
            </h1>

            {/* Timer */}
            <div className="mx-auto max-w-xl rounded-2xl border border-[#3A2C22]/70 bg-[#1D1611]/85 p-6 shadow-[0_20px_50px_-20px_rgba(0,0,0,0.6)] backdrop-blur-sm sm:p-8">
              {/* Mode selector */}
              <div className="mx-auto mb-8 flex w-fit max-w-full items-center gap-1 rounded-xl border border-[#3A2C22] bg-[#150F0B] p-1">
                {MODES.map(({ key, label }) => (
                  <button
                    key={key}
                    type="button"
                    onClick={() => switchMode(key)}
                    className={`cursor-pointer rounded-lg px-3 py-1.5 text-[12.5px] font-medium transition-colors duration-200 sm:px-4 sm:text-[13px] ${
                      mode === key
                        ? "bg-[#2E2117] text-[#F3E9DC]"
                        : "text-[#8A7B6C] hover:text-[#B8A99A]"
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>

              {/* Ring + countdown */}
              <div className="relative mx-auto flex h-[280px] w-[280px] max-w-full items-center justify-center">
                <svg
                  viewBox={`0 0 ${ringSize} ${ringSize}`}
                  className="absolute inset-0 h-full w-full -rotate-90"
                >
                  <circle
                    cx={ringSize / 2}
                    cy={ringSize / 2}
                    r={ringRadius}
                    fill="none"
                    stroke="#2A1F17"
                    strokeWidth={ringStroke}
                  />
                  <circle
                    cx={ringSize / 2}
                    cy={ringSize / 2}
                    r={ringRadius}
                    fill="none"
                    stroke="#E3A567"
                    strokeWidth={ringStroke}
                    strokeLinecap="round"
                    strokeDasharray={ringCircumference}
                    strokeDashoffset={ringCircumference * (1 - progress)}
                    className="transition-[stroke-dashoffset] duration-1000 ease-linear"
                  />
                </svg>
                <div className="relative flex flex-col items-center">
                  <span className="text-[4rem] font-semibold leading-none tracking-tight text-[#F3E9DC] sm:text-[4.25rem]">
                    {formatTime(timeLeft)}
                  </span>
                  <span className="mt-3 text-[13px] text-[#8A7B6C]">
                    {session.name}
                  </span>
                </div>
              </div>

              {/* Controls */}
              <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
                <button
                  type="button"
                  onClick={() => setRunning((r) => !r)}
                  className="flex min-w-[140px] cursor-pointer items-center justify-center gap-2 rounded-xl bg-gradient-to-b from-[#E8B679] to-[#C97D4A] px-6 py-3 text-[14.5px] font-semibold text-[#221407] shadow-[0_8px_20px_-6px_rgba(201,125,74,0.55)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_12px_26px_-6px_rgba(201,125,74,0.7)] active:translate-y-0"
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
                  onClick={resetTimer}
                  className="cursor-pointer rounded-xl border border-[#3A2C22] px-6 py-3 text-[14.5px] font-medium text-[#9C8D7E] transition-colors duration-200 hover:border-[#4A392C] hover:text-[#F3E9DC]"
                >
                  Reset
                </button>
              </div>

              {/* Session counter */}
              <p className="mt-6 text-center text-[13px] text-[#8A7B6C]">
                {completed}/{session.rounds} focus sessions
              </p>
            </div>

            {/* My Sessions */}
            <section className="mt-12">
              <div className="mb-5 flex flex-wrap items-center justify-between gap-4">
                <h2
                  className="text-[1.25rem] italic tracking-tight text-[#F3E9DC]"
                  style={{ fontFamily: "'Fraunces', serif" }}
                >
                  My Sessions
                </h2>

                <button
                  type="button"
                  onClick={openCreate}
                  className="flex cursor-pointer items-center gap-1.5 rounded-xl bg-gradient-to-b from-[#E8B679] to-[#C97D4A] px-4 py-2.5 text-[14px] font-semibold text-[#221407] shadow-[0_8px_20px_-6px_rgba(201,125,74,0.55)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_12px_26px_-6px_rgba(201,125,74,0.7)] active:translate-y-0"
                >
                  <PlusIcon className="h-4 w-4" />
                  Create Session
                </button>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {allSessions.map((s) => {
                  const selected = s.id === selectedId;
                  const isCustom = !DEFAULT_SESSIONS.some((d) => d.id === s.id);

                  return (
                    <div
                      key={s.id}
                      className={`flex items-stretch rounded-2xl border transition-colors duration-200 ${
                        selected
                          ? "border-[#E3A567]/50 bg-[#241A14]"
                          : "border-[#3A2C22]/70 bg-[#1D1611] hover:border-[#4A392C]"
                      }`}
                    >
                      <button
                        type="button"
                        onClick={() => applySession(s)}
                        aria-pressed={selected}
                        className="min-w-0 flex-1 cursor-pointer p-4 text-left"
                      >
                        <p className="truncate text-[14.5px] font-semibold text-[#F3E9DC]">
                          {s.name}
                        </p>
                        <p className="mt-1.5 text-[12.5px] leading-relaxed text-[#8A7B6C]">
                          {s.focus} min focus · {s.shortBreak} min short ·{" "}
                          {s.longBreak} min long · {s.rounds} sessions
                        </p>
                      </button>

                      {isCustom && (
                        <div className="flex shrink-0 items-start gap-0.5 p-2">
                          <button
                            type="button"
                            onClick={() => openEdit(s)}
                            aria-label={`Edit ${s.name}`}
                            className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg text-[#8A7B6C] transition-colors duration-200 hover:bg-[#1B140F] hover:text-[#E3A567]"
                          >
                            <EditIcon className="h-4 w-4" />
                          </button>
                          <button
                            type="button"
                            onClick={() => deleteSession(s.id)}
                            aria-label={`Delete ${s.name}`}
                            className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg text-[#8A7B6C] transition-colors duration-200 hover:bg-[#1B140F] hover:text-[#D98A78]"
                          >
                            <TrashIcon className="h-4 w-4" />
                          </button>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </section>
          </div>
        </main>
      </div>

      {/* Create / edit modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
          <button
            type="button"
            aria-label="Close"
            onClick={() => setModalOpen(false)}
            className="absolute inset-0 cursor-pointer bg-black/60"
          />

          <div className="relative max-h-[90vh] w-full max-w-md overflow-y-auto rounded-2xl border border-[#3A2C22]/70 bg-[#1D1611] p-6 shadow-[0_24px_60px_-15px_rgba(0,0,0,0.65)]">
            <div className="mb-5 flex items-center justify-between">
              <h2
                className="text-[1.2rem] italic tracking-tight text-[#F3E9DC]"
                style={{ fontFamily: "'Fraunces', serif" }}
              >
                {editingId ? "Edit session" : "Create session"}
              </h2>
              <button
                type="button"
                onClick={() => setModalOpen(false)}
                className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg text-[#8A7B6C] transition-colors duration-200 hover:bg-[#1B140F] hover:text-[#F3E9DC]"
                aria-label="Close"
              >
                <CloseIcon className="h-4 w-4" />
              </button>
            </div>

            <form onSubmit={handleSave} className="flex flex-col gap-4">
              <div>
                <label htmlFor="session-name" className={LABEL_CLASS}>
                  Name
                </label>
                <input
                  id="session-name"
                  required
                  maxLength={30}
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="e.g. Evening Study"
                  className={INPUT_CLASS}
                />
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                <div>
                  <label htmlFor="session-focus" className={LABEL_CLASS}>
                    Focus (min)
                  </label>
                  <input
                    id="session-focus"
                    type="number"
                    required
                    min={1}
                    max={180}
                    value={form.focus}
                    onChange={(e) =>
                      setForm({ ...form, focus: e.target.value })
                    }
                    className={INPUT_CLASS}
                  />
                </div>
                <div>
                  <label htmlFor="session-short" className={LABEL_CLASS}>
                    Short break
                  </label>
                  <input
                    id="session-short"
                    type="number"
                    required
                    min={1}
                    max={60}
                    value={form.shortBreak}
                    onChange={(e) =>
                      setForm({ ...form, shortBreak: e.target.value })
                    }
                    className={INPUT_CLASS}
                  />
                </div>
                <div>
                  <label htmlFor="session-long" className={LABEL_CLASS}>
                    Long break
                  </label>
                  <input
                    id="session-long"
                    type="number"
                    required
                    min={1}
                    max={120}
                    value={form.longBreak}
                    onChange={(e) =>
                      setForm({ ...form, longBreak: e.target.value })
                    }
                    className={INPUT_CLASS}
                  />
                </div>
              </div>

              <div>
                <label htmlFor="session-rounds" className={LABEL_CLASS}>
                  Focus sessions before a long break
                </label>
                <input
                  id="session-rounds"
                  type="number"
                  required
                  min={1}
                  max={12}
                  value={form.rounds}
                  onChange={(e) => setForm({ ...form, rounds: e.target.value })}
                  className={INPUT_CLASS}
                />
              </div>

              <div className="mt-1 flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="flex-1 cursor-pointer rounded-xl border border-[#3A2C22] py-2.5 text-[14px] font-medium text-[#9C8D7E] transition-colors duration-200 hover:border-[#4A392C] hover:text-[#F3E9DC]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 cursor-pointer rounded-xl bg-gradient-to-b from-[#E8B679] to-[#C97D4A] py-2.5 text-[14px] font-semibold text-[#221407] shadow-[0_8px_20px_-6px_rgba(201,125,74,0.55)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_12px_26px_-6px_rgba(201,125,74,0.7)] active:translate-y-0"
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
