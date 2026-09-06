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

export default function LoFiBackground() {
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
