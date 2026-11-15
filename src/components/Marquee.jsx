import React from "react";
import { BRANDS } from "../data/products.js";

export default function Marquee() {
  const row = [...BRANDS, ...BRANDS];
  return (
    <div className="marquee overflow-hidden border-y border-cream/15 bg-pine py-4 text-cream" aria-hidden="true">
      <div className="marquee-track items-center">
        {[0, 1].map((k) => (
          <div key={k} className="flex shrink-0 items-center">
            {row.map((b, i) => (
              <span key={i} className="flex items-center whitespace-nowrap">
                <span className="px-6 font-display text-2xl italic md:px-8 md:text-3xl">{b}</span>
                <span className="text-brass">✦</span>
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
