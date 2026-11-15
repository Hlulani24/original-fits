import React from "react";

export function Hanger({ size = 28, className = "", stroke = "currentColor" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" stroke={stroke} strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <path d="M32 18a4.5 4.5 0 1 1 4.5 4.500c-2.500 0-4.500 1.500-4.500 4v2m0 0L12 43c-2.200 1.500-1.200 5 1.600 5h36.800c2.800 0 3.800-3.500 1.600-5z" />
    </svg>
  );
}

// The Original Fits monogram: an arch (the shop's window), a brass hanger and the "OF" initials.
export function Monogram({ size = 48, light = false, className = "" }) {
  const body = light ? "#F2ECDF" : "#0E3B2E";
  const ink = light ? "#0E3B2E" : "#F2ECDF";
  const gold = light ? "#8A6420" : "#D9AE5F";
  return (
    <svg width={size} height={size * 1.18} viewBox="0 0 60 71" className={className} aria-hidden="true">
      <path d="M2 71V31C2 14.400 14.400 2 30 2s28 12.400 28 29v40z" fill={body} />
      <path d="M6.500 71V31C6.500 17 17 6.500 30 6.500S53.500 17 53.500 31v40" fill="none" stroke={gold} strokeWidth="1.1" opacity=".9" />
      <g transform="translate(17.500 11) scale(.4)" fill="none" stroke={gold} strokeWidth="5.500" strokeLinecap="round" strokeLinejoin="round">
        <path d="M32 18a4.5 4.5 0 1 1 4.500 4.500c-2.500 0-4.500 1.500-4.500 4v2m0 0L12 43c-2.200 1.500-1.200 5 1.600 5h36.800c2.800 0 3.800-3.500 1.600-5z" />
      </g>
      <text x="30" y="55" textAnchor="middle" fontFamily="Fraunces, Georgia, serif" fontSize="25" fontWeight="600" fontStyle="italic" letterSpacing="-1" fill={ink}>OF</text>
    </svg>
  );
}

// Full lockup: monogram + wordmark + descriptor. `light` for dark backgrounds.
export function Logo({ light = false, size = "md", className = "" }) {
  const big = size === "lg";
  return (
    <span className={`inline-flex items-center gap-3 ${light ? "text-cream" : "text-emerald"} ${className}`} aria-label="Original Fits">
      <Monogram size={big ? 54 : 42} light={light} />
      <span className="flex flex-col leading-none">
        <span className={`font-display font-semibold tracking-[-0.025em] ${big ? "text-[2.1rem]" : "text-[1.7rem]"}`}>
          Original <em className={`font-medium italic ${light ? "text-sun" : "text-brass"}`}>Fits</em>
        </span>
        <span className={`mt-1.5 font-mono uppercase tracking-[0.32em] ${big ? "text-[0.62rem]" : "text-[0.54rem]"} ${light ? "text-cream/60" : "text-ink/50"}`}>Pre-loved designer</span>
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
      <g transform="translate(40 38) scale(.65)" stroke="#072A20" fill="none" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"><path d="M32 18a4.5 4.5 0 1 1 4.500 4.500c-2.500 0-4.500 1.500-4.500 4v2m0 0L12 43c-2.200 1.500-1.200 5 1.600 5h36.800c2.800 0 3.800-3.500 1.600-5z" /></g>
    </svg>
  );
}
