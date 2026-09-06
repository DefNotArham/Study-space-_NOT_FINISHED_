import { useState } from "react";
import { EyeIcon, EyeOffIcon } from "../icons/icons";

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

export default function Input({
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
            className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#8A7B6C] transition-colors duration-200 hover:text-[#E3A567] cursor-pointer"
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
