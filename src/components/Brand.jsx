import React from "react";

export function Hanger({ size = 28, className = "", stroke = "currentColor" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" stroke={stroke} strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <path d="M32 18a4.5 4.5 0 1 1 4.5 4.500c-2.500 0-4.500 1.500-4.500 4v2m0 0L12 43c-2.200 1.500-1.200 5 1.600 5h36.800c2.800 0 3.800-3.500 1.600-5z" />
    </svg>
  );
}

// Wordmark. `light` for dark backgrounds.
export function Logo({ light = false, className = "" }) {
  const c = light ? "text-cream" : "text-emerald";
  return (
    <span className={`inline-flex items-center gap-2.5 ${c} ${className}`} aria-label="Original Fits">
      <span className={`grid h-9 w-9 place-items-center rounded-full ${light ? "bg-cream text-emerald" : "bg-emerald text-sun"}`}>
        <Hanger size={22} />
      </span>
      <span className="font-display text-[1.45rem] font-semibold leading-none tracking-[-0.02em]">
        Original <em className="font-medium italic">Fits</em>
      </span>
    </span>
  );
}

// Round "stamp" badge with circular text.
export function Stamp({ text = "ONE OF ONE · ONE OF ONE · ", className = "" }) {
  return (
    <svg viewBox="0 0 120 120" className={className} aria-hidden="true">
      <defs><path id="stamp" d="M60 60m-45 0a45 45 0 1 1 90 0a45 45 0 1 1 -90 0" /></defs>
      <circle cx="60" cy="60" r="58" fill="#B88A3E" />
      <circle cx="60" cy="60" r="52" fill="none" stroke="#072A20" strokeWidth="1" strokeDasharray="2 3" />
      <text fill="#072A20" fontSize="11.5" fontWeight="700" letterSpacing="3.4" fontFamily="DM Mono, monospace"><textPath href="#stamp">{text}</textPath></text>
      <g transform="translate(40 38) scale(.65)" stroke="#072A20" fill="none" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"><path d="M32 18a4.5 4.5 0 1 1 4.5 4.500c-2.500 0-4.500 1.500-4.500 4v2m0 0L12 43c-2.200 1.500-1.200 5 1.600 5h36.800c2.800 0 3.800-3.500 1.600-5z" /></g>
    </svg>
  );
}
