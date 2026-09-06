import { FlameIcon } from "./icons";

export default function Logo() {
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
