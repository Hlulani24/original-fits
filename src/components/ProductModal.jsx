import React, { useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";
import { X, MessageCircle, ShoppingBag, Minus, Plus, Truck, ShieldCheck } from "lucide-react";
import Price, { isSpecial, money } from "./Price.jsx";
import { sizesFor } from "../data/sizes.js";
import { brandOf } from "../data/products.js";
import { basket } from "../lib/basket.js";
import { SHOW_PRICES, waLink } from "../config.js";

export default function ProductModal({ p, onClose }) {
  const sizes = useMemo(() => sizesFor(p), [p]);
  const [i, setI] = useState(0);
  const [size, setSize] = useState(sizes.length === 1 ? sizes[0] : "");
  const multi = p.images.length > 1;
  const [qty, setQty] = useState(1);
  const [warn, setWarn] = useState(false);
  const cur = p.images[i] || p.images[0];
  
  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow; document.body.style.overflow = "hidden";
    return () => { window.removeEventListener("keydown", onKey); document.body.style.overflow = prev; };
  }, [onClose]);

  const shown = isSpecial(p) ? p.salePrice : p.price;
  const priced = SHOW_PRICES && shown != null;
  const colour = cur?.hex || multi ? cur?.label || "" : "";
  const msg = `Hi Original Fits, I'm interested in the ${p.name}${colour ? ` (${colour})` : ""}${size ? `, size ${size}` : ""}${qty > 1 ? `, qty ${qty}` : ""}${priced ? ` at ${money(shown)}` : ""}. Is it still available?`;

  function add() {
    if (!size) { setWarn(true); return; }
    basket.add({ id: p.id, name: p.name, image: cur?.src, colour, hex: cur?.hex || null, size, qty, price: priced ? Number(shown) : null });
    onClose();
  }

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-pine/70 backdrop-blur-sm md:items-center md:p-6" onClick={onClose} role="dialog" aria-modal="true" aria-label={p.name}>
      <div className="pop-in relative grid max-h-[94dvh] w-full max-w-4xl overflow-y-auto rounded-t-[2rem] bg-cream md:grid-cols-[1fr_1fr] md:rounded-[2rem]" onClick={(e) => e.stopPropagation()}>
        <button onClick={onClose} aria-label="Close" className="absolute right-4 top-4 z-10 grid h-10 w-10 place-items-center rounded-full bg-cream/90 shadow hover:bg-emerald hover:text-cream"><X size={18} /></button>

        <div className="bg-sand">
          <div className="aspect-square md:aspect-auto md:h-full md:min-h-[520px]">
            {cur && <img key={cur.src} src={cur.src} alt={`${p.name}${colour ? ` — ${colour}` : ""}`} className="h-full w-full object-cover" />}
          </div>
        </div>

        <div className="flex flex-col p-7 pt-8 md:p-10">
          <p className="eyebrow text-brass">{brandOf(p)} · {p.cat}</p>
          <h2 className="h-serif mt-3 pr-10 text-4xl [text-wrap:balance] md:text-[2.6rem]">{p.name}</h2>
          <div className="mt-4 flex items-center gap-3"><Price p={p} large />{p.blurb && <span className="rounded-full border border-ink/15 px-3 py-1 text-xs font-semibold text-ink/60">{p.blurb}</span>}</div>

          {(multi || cur?.hex) && (
            <div className="mt-7">
              <p className="eyebrow text-[0.65rem] text-ink/50">Colour · <span className="text-ink">{colour || "—"}</span></p>
              <div className="mt-3 flex flex-wrap gap-2.5">
                {p.images.map((im, n) => im.hex ? (
                  <button key={im.src + n} onClick={() => setI(n)} title={im.label} aria-label={im.label} aria-pressed={n === i}
                    className={`h-9 w-9 rounded-full border transition ${n === i ? "border-emerald ring-2 ring-emerald/30 ring-offset-2 ring-offset-cream" : "border-ink/25"}`} style={{ background: im.hex }} />
                ) : (
                  <button key={im.src + n} onClick={() => setI(n)} aria-pressed={n === i}
                    className={`rounded-full border px-4 py-2 text-sm font-semibold transition ${n === i ? "border-emerald bg-emerald text-cream" : "border-ink/25 hover:border-ink"}`}>{im.label || `Option ${n + 1}`}</button>
                ))}
              </div>
            </div>
          )}

          <div className="mt-6">
            <p className={`eyebrow text-[0.65rem] ${warn ? "text-rust" : "text-ink/50"}`}>{warn ? "Please choose a size" : "Size"}</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {sizes.map((s) => (
                <button key={s} onClick={() => { setSize(s); setWarn(false); }} aria-pressed={size === s}
                  className={`min-w-[3.2rem] rounded-full border px-4 py-2.5 font-mono text-sm font-medium transition ${size === s ? "border-emerald bg-emerald text-cream" : warn ? "border-rust" : "border-ink/25 hover:border-ink"}`}>{s}</button>
              ))}
            </div>
          </div>

          {p.images.length > 1 && (
            <div className="mt-6 flex gap-2 overflow-x-auto no-scrollbar">
              {p.images.map((im, n) => (
                <button key={im.src + n} onClick={() => setI(n)} aria-label={`Photo ${n + 1}`} className={`h-16 w-16 shrink-0 overflow-hidden rounded-xl border-2 ${n === i ? "border-emerald" : "border-transparent opacity-70"}`}><img src={im.src} alt="" className="h-full w-full object-cover" /></button>
              ))}
            </div>
          )}

          <div className="mt-7 flex items-center gap-3">
            <div className="flex items-center rounded-full border border-ink/25">
              <button onClick={() => setQty((q) => Math.max(1, q - 1))} aria-label="Less" className="grid h-12 w-11 place-items-center rounded-l-full hover:bg-sand"><Minus size={15} /></button>
              <span className="w-9 text-center font-mono font-medium" aria-live="polite">{qty}</span>
              <button onClick={() => setQty((q) => Math.min(20, q + 1))} aria-label="More" className="grid h-12 w-11 place-items-center rounded-r-full hover:bg-sand"><Plus size={15} /></button>
            </div>
            <button onClick={add} className="btn-emerald h-12 flex-1"><ShoppingBag size={17} /> Add to basket{priced && qty > 1 ? ` · ${money(shown * qty)}` : ""}</button>
          </div>
          <a href={waLink(msg)} target="_blank" rel="noreferrer" className="btn-outline mt-3"><MessageCircle size={17} /> Ask on WhatsApp</a>

          <ul className="mt-7 space-y-3 border-t border-ink/10 pt-6 text-sm text-ink/65">
            <li className="flex gap-3"><ShieldCheck size={18} className="mt-0.5 shrink-0 text-brass" /> Original second-hand, in smart and good condition.</li>
            <li className="flex gap-3"><Truck size={18} className="mt-0.5 shrink-0 text-brass" /> No payment online — we confirm stock, delivery or collection on WhatsApp.</li>
          </ul>
        </div>
      </div>
    </div>,
    document.body
  );
}
