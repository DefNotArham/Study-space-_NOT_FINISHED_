import React, { useState } from "react";
import { Link } from "react-router-dom";

/* ------------------------------------------------------------------ */
/*  Icons (small, monoline — kept local to this file on purpose)       */
/* ------------------------------------------------------------------ */

type IconProps = { className?: string };

const iconBase = {
  viewBox: "0 0 24 24",
  fill: "none" as const,
  stroke: "currentColor",
  strokeWidth: 1.75,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

function MailIcon({ className }: IconProps) {
  return (
    <svg {...iconBase} className={className}>
      <rect x="3" y="5" width="18" height="14" rx="2.5" />
      <path d="M3.5 6.5 12 13l8.5-6.5" />
    </svg>
  );
}

function LockIcon({ className }: IconProps) {
  return (
    <svg {...iconBase} className={className}>
      <rect x="4.5" y="10.5" width="15" height="10" rx="2.5" />
      <path d="M7.5 10.5V7.75a4.5 4.5 0 0 1 9 0v2.75" />
    </svg>
  );
}

function UserIcon({ className }: IconProps) {
  return (
    <svg {...iconBase} className={className}>
      <circle cx="12" cy="8" r="3.5" />
      <path d="M4.5 20c1.2-3.6 4-5.5 7.5-5.5s6.3 1.9 7.5 5.5" />
    </svg>
  );
}

function EyeIcon({ className }: IconProps) {
  return (
    <svg {...iconBase} className={className}>
      <path d="M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12Z" />
      <circle cx="12" cy="12" r="2.75" />
    </svg>
  );
}

function EyeOffIcon({ className }: IconProps) {
  return (
    <svg {...iconBase} className={className}>
      <path d="M3.5 3.5l17 17" />
      <path d="M10.6 5.7A10.6 10.6 0 0 1 12 5.5c6 0 9.5 6.5 9.5 6.5a13.6 13.6 0 0 1-3.15 3.85M7.4 7.35C4.9 8.85 3.5 11 2.5 12c0 0 3.06 6.13 8.6 6.48" />
      <path d="M9.7 10.2a2.75 2.75 0 0 0 3.95 3.8" />
    </svg>
  );
}

function FlameIcon({ className }: IconProps) {
  return (
    <svg {...iconBase} className={className} strokeWidth={1.6}>
      <path d="M12 3.5c.6 2.1-.4 3.4-1.6 4.6-1.6 1.6-2.9 3.2-2.9 5.4a4.5 4.5 0 0 0 9 0c0-1.3-.4-2.2-1-3.1-.3.9-.9 1.5-1.6 1.5-.9 0-1.5-.8-1.3-1.7.3-1.5-.3-3-1.6-3.9-.2 1-.6 1.7-1.3 2.2-.3-1.7 0-3.4 1.3-5Z" />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/*  Logo                                                                */
/* ------------------------------------------------------------------ */

function Logo() {
  return (
    <div className="flex items-center gap-3">
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#2A1F17] ring-1 ring-[#E3A567]/25 shadow-[0_0_22px_-4px_rgba(227,165,103,0.5)]">
        <FlameIcon className="h-[18px] w-[18px] text-[#E3A567]" />
      </span>
      <span
        className="text-[1.6rem] italic leading-none tracking-tight text-[#F3E9DC]"
        style={{ fontFamily: "'Fraunces', serif" }}
      >
        Study Space
      </span>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Background — night sky wash + corner desk/lamp scene                */
/* ------------------------------------------------------------------ */

const STARS = [
  { x: 8, y: 10, r: 1.1, o: 0.8 },
  { x: 22, y: 6, r: 0.8, o: 0.5 },
  { x: 34, y: 14, r: 1.3, o: 0.65 },
  { x: 48, y: 5, r: 0.9, o: 0.55 },
  { x: 61, y: 11, r: 1.1, o: 0.7 },
  { x: 71, y: 4, r: 0.8, o: 0.5 },
  { x: 83, y: 9, r: 1.2, o: 0.75 },
  { x: 91, y: 16, r: 0.9, o: 0.5 },
  { x: 15, y: 20, r: 0.7, o: 0.4 },
  { x: 55, y: 18, r: 0.7, o: 0.4 },
];

function LoFiBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 900px 700px at 12% 104%, rgba(227,165,103,0.18), transparent 60%)," +
            "radial-gradient(ellipse 1000px 800px at 88% -10%, rgba(63,78,102,0.32), transparent 55%)," +
            "linear-gradient(165deg, #120C09 0%, #1B130D 55%, #100B08 100%)",
        }}
      />

      <svg
        className="absolute inset-0 h-full w-full opacity-80"
        preserveAspectRatio="none"
      >
        {STARS.map((s, i) => (
          <circle
            key={i}
            cx={`${s.x}%`}
            cy={`${s.y}%`}
            r={s.r}
            fill="#F3E9DC"
            opacity={s.o}
          />
        ))}
      </svg>

      <svg
        className="absolute right-10 top-10 hidden h-24 w-24 opacity-[0.35] lg:block"
        viewBox="0 0 100 100"
        fill="none"
      >
        <rect
          x="4"
          y="4"
          width="92"
          height="92"
          rx="6"
          stroke="#EDE6D6"
          strokeWidth="1.5"
        />
        <line
          x1="50"
          y1="4"
          x2="50"
          y2="96"
          stroke="#EDE6D6"
          strokeWidth="1.5"
        />
        <line
          x1="4"
          y1="50"
          x2="96"
          y2="50"
          stroke="#EDE6D6"
          strokeWidth="1.5"
        />
        <path
          d="M74 24a11 11 0 1 0 0 15 8.5 8.5 0 0 1 0-15Z"
          fill="#EDE6D6"
          opacity="0.9"
        />
      </svg>

      <svg
        className="absolute -bottom-6 -left-10 h-[320px] w-[320px] opacity-90 md:h-[380px] md:w-[380px]"
        viewBox="0 0 400 400"
        fill="none"
      >
        <defs>
          <radialGradient id="ss-lamp-glow-register" cx="0.5" cy="0.5" r="0.5">
            <stop offset="0%" stopColor="#E3A567" stopOpacity="0.55" />
            <stop offset="100%" stopColor="#E3A567" stopOpacity="0" />
          </radialGradient>
        </defs>

        <ellipse
          cx="150"
          cy="150"
          rx="140"
          ry="130"
          fill="url(#ss-lamp-glow-register)"
        />

        <rect x="0" y="300" width="400" height="14" fill="#0D0906" />
        <rect x="0" y="314" width="400" height="86" fill="#0A0705" />

        <rect x="40" y="272" width="90" height="16" rx="3" fill="#3A2C22" />
        <rect x="50" y="256" width="70" height="16" rx="3" fill="#2E2117" />
        <rect x="46" y="240" width="78" height="16" rx="3" fill="#3A2C22" />

        <rect x="150" y="264" width="34" height="36" rx="4" fill="#2E2117" />
        <path
          d="M167 264c-8-14-4-28 2-34m-2 34c4-16 16-24 24-24m-24 24c-2-18 6-30 14-36"
          stroke="#5B7A5E"
          strokeWidth="4"
          strokeLinecap="round"
          fill="none"
          opacity="0.85"
        />

        <circle cx="150" cy="150" r="7" fill="#2E2117" />
        <path
          d="M150 150 130 96"
          stroke="#2E2117"
          strokeWidth="6"
          strokeLinecap="round"
        />
        <path
          d="M130 96 168 82"
          stroke="#2E2117"
          strokeWidth="6"
          strokeLinecap="round"
        />
        <path d="M142 68 194 82 158 96Z" fill="#E3A567" opacity="0.9" />
      </svg>

      <div
        className="absolute inset-0"
        style={{ boxShadow: "inset 0 0 180px 50px rgba(9,6,4,0.55)" }}
      />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Input — labeled field with icon slot + password reveal toggle       */
/* ------------------------------------------------------------------ */

type InputProps = {
  id: string;
  label: string;
  type?: "text" | "email" | "password";
  placeholder?: string;
  icon?: React.ReactNode;
  value: string;
  onChange: (value: string) => void;
  autoComplete?: string;
};

function Input({
  id,
  label,
  type = "text",
  placeholder,
  icon,
  value,
  onChange,
  autoComplete,
}: InputProps) {
  const [revealed, setRevealed] = useState(false);
  const isPassword = type === "password";
  const resolvedType = isPassword ? (revealed ? "text" : "password") : type;

  return (
    <div>
      <label
        htmlFor={id}
        className="mb-1.5 block text-[13px] font-medium text-[#B8A99A]"
      >
        {label}
      </label>
      <div className="relative">
        {icon && (
          <span className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-[#8A7B6C]">
            {icon}
          </span>
        )}
        <input
          id={id}
          type={resolvedType}
          value={value}
          placeholder={placeholder}
          autoComplete={autoComplete}
          onChange={(e) => onChange(e.target.value)}
          className={`w-full rounded-xl border border-[#3A2C22] bg-[#1B140F] py-2.5 text-[14.5px] text-[#F3E9DC] placeholder-[#6B5D50] outline-none transition-colors duration-200 focus:border-[#E3A567]/60 focus:ring-2 focus:ring-[#E3A567]/15 ${
            icon ? "pl-10" : "pl-3.5"
          } ${isPassword ? "pr-10" : "pr-3.5"}`}
        />
        {isPassword && (
          <button
            type="button"
            tabIndex={-1}
            onClick={() => setRevealed((r) => !r)}
            className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#8A7B6C] transition-colors duration-200 hover:text-[#E3A567]"
            aria-label={revealed ? "Hide password" : "Show password"}
          >
            {revealed ? (
              <EyeOffIcon className="h-[18px] w-[18px]" />
            ) : (
              <EyeIcon className="h-[18px] w-[18px]" />
            )}
          </button>
        )}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  AuthButton — primary CTA                                            */
/* ------------------------------------------------------------------ */

function AuthButton({
  children,
  type = "button",
}: {
  children: React.ReactNode;
  type?: "button" | "submit";
}) {
  return (
    <button
      type={type}
      className="w-full rounded-xl bg-gradient-to-b from-[#E8B679] to-[#C97D4A] py-2.5 text-[15px] font-semibold text-[#221407] shadow-[0_8px_20px_-6px_rgba(201,125,74,0.55)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_12px_26px_-6px_rgba(201,125,74,0.7)] active:translate-y-0 active:shadow-[0_4px_12px_-4px_rgba(201,125,74,0.5)]"
    >
      {children}
    </button>
  );
}

/* ------------------------------------------------------------------ */
/*  Register page                                                       */
/* ------------------------------------------------------------------ */

export default function Register() {
  // Design-only, local state — no validation or submission.
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

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
            }}
          >
            <Input
              id="register-name"
              label="Name"
              type="text"
              placeholder="Ada Lovelace"
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

            <AuthButton type="submit">Create account</AuthButton>

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
