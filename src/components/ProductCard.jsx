import React from "react";
import Price, { isSpecial } from "./Price.jsx";
import { brandOf } from "../data/products.js";

export default function ProductCard({ p, onOpen, i = 0 }) {
  const a = p.images[0];
  const size = p.sizes?.[0];
  return (
    <button onClick={() => onOpen(p)} className="reveal group block w-full text-left" data-d={i % 4 || undefined} aria-label={`View ${p.name}`}>
      <div className="relative aspect-square overflow-hidden rounded-[1.4rem] bg-sand">
        {a && <img src={a.src} alt={p.name} loading="lazy" className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-[1.06]" />}
        {size && size !== "One size" && (
          <span className="absolute left-3 top-3 rounded-full bg-cream/95 px-3 py-1 font-mono text-[0.68rem] font-medium uppercase tracking-wider text-ink">Size {size}</span>
        )}
        {isSpecial(p) && <span className="absolute right-3 top-3 rounded-full bg-rust px-3 py-1 font-mono text-[0.68rem] font-medium uppercase tracking-wider text-cream">Reduced</span>}
        {/* hang tag */}
        <span className="tag absolute bottom-3 left-3 bg-emerald py-1.5 pl-5 pr-3 text-cream shadow-md transition group-hover:bg-brass group-hover:text-pine">
          <Price p={p} />
        </span>
      </div>
      <div className="mt-3 px-1">
        <p className="eyebrow text-[0.62rem] text-ink/45">{brandOf(p)}</p>
        <h3 className="mt-1 font-display text-[1.15rem] font-semibold leading-tight tracking-tight">{p.name}</h3>
      </div>
    </button>
  );
}
