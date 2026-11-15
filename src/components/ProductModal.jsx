import React, { useEffect } from "react";
import { createPortal } from "react-dom";
import { X, MessageCircle, ShoppingBag, Check } from "lucide-react";
import Price, { isSpecial, money } from "./Price.jsx";
import { sizesFor } from "../data/sizes.js";
import { brandOf } from "../data/products.js";
import { basket, useBasket } from "../lib/basket.js";
import { SHOW_PRICES, waLink } from "../config.js";

export default function ProductModal({ p, onClose }) {
  const { items } = useBasket();
  const size = sizesFor(p)[0];
  const inBasket = items.some((x) => x.id === p.id);
  const shown = isSpecial(p) ? p.salePrice : p.price;
  const priced = SHOW_PRICES && shown != null;

  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow; document.body.style.overflow = "hidden";
    return () => { window.removeEventListener("keydown", onKey); document.body.style.overflow = prev; };
  }, [onClose]);

  const msg = `Hi Original Fits, is the ${p.name}${size && size !== "One size" ? ` (size ${size})` : ""}${priced ? ` at ${money(shown)}` : ""} still available?`;
  const add = () => { basket.add({ id: p.id, name: p.name, image: p.images[0]?.src, colour: "", hex: null, size, qty: 1, price: priced ? Number(shown) : null }); onClose(); };

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-pine/70 p-0 backdrop-blur-sm md:items-center md:p-6" onClick={onClose} role="dialog" aria-modal="true" aria-label={p.name}>
      <div className="pop-in relative grid max-h-[94dvh] w-full max-w-4xl overflow-y-auto rounded-t-[2rem] bg-cream md:grid-cols-2 md:rounded-[2rem]" onClick={(e) => e.stopPropagation()}>
        <button onClick={onClose} aria-label="Close" className="absolute right-4 top-4 z-10 grid h-10 w-10 place-items-center rounded-full bg-cream/90 shadow hover:bg-emerald hover:text-cream"><X size={18} /></button>
        <div className="aspect-square bg-sand md:aspect-auto md:min-h-[520px]">
          <img src={p.images[0]?.src} alt={p.name} className="h-full w-full object-cover" />
        </div>
        <div className="flex flex-col p-7 pt-8 md:p-10">
          <p className="eyebrow text-brass">{brandOf(p)} · {p.cat}</p>
          <h2 className="h-serif mt-3 text-4xl md:text-5xl">{p.name}</h2>
          <div className="mt-5"><Price p={p} large /></div>

          <dl className="mt-7 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-ink/10 bg-ink/10 text-sm">
            <div className="bg-cream p-4"><dt className="eyebrow text-[0.6rem] text-ink/45">Size</dt><dd className="mt-1 font-mono text-lg font-medium">{size}</dd></div>
            <div className="bg-cream p-4"><dt className="eyebrow text-[0.6rem] text-ink/45">Condition</dt><dd className="mt-1 font-semibold leading-snug">{p.blurb || "Second hand"}</dd></div>
          </dl>
          <p className="mt-5 text-sm leading-relaxed text-ink/65">One of one — once it’s gone, it’s gone. Add it to your basket and we’ll confirm it’s still available and arrange delivery or collection on WhatsApp.</p>

          <div className="mt-auto grid gap-3 pt-8">
            <button onClick={add} disabled={inBasket} className="btn-emerald disabled:cursor-default disabled:bg-ink/10 disabled:text-ink/50 disabled:hover:bg-ink/10">
              {inBasket ? <><Check size={17} /> In your basket</> : <><ShoppingBag size={17} /> Add to basket</>}
            </button>
            <a href={waLink(msg)} target="_blank" rel="noreferrer" className="btn-outline"><MessageCircle size={17} /> Ask on WhatsApp</a>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}
