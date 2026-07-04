import Link from "next/link";

/** Logomark: nhịp cầu vòm cách điệu — World Bridges. */
export function BridgeMark({ className = "h-9 w-9" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <circle cx="24" cy="24" r="22" stroke="#1e3a5c" strokeWidth="2" />
      <path
        d="M10 30h28"
        stroke="#b8862b"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <path
        d="M15 30v-5.5M20 30v-8M24 30v-9M28 30v-8M33 30v-5.5"
        stroke="#b8862b"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <path
        d="M10 24.5c4.5-8 9.5-12 14-12s9.5 4 14 12"
        stroke="#1e3a5c"
        strokeWidth="2.5"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  );
}

export function BrandLockup({ compact = false }: { compact?: boolean }) {
  return (
    <Link href="/" className="flex items-center gap-3 group">
      <BridgeMark className={compact ? "h-8 w-8" : "h-10 w-10"} />
      <span className="flex flex-col leading-none">
        <span
          className={`font-display font-bold tracking-tight text-navy-deep group-hover:text-navy transition-colors ${
            compact ? "text-lg" : "text-xl"
          }`}
        >
          Wobridges
        </span>
        <span className="font-ui text-[0.62rem] font-semibold uppercase tracking-[0.22em] text-gold mt-1">
          World Bridges · English Center
        </span>
      </span>
    </Link>
  );
}
