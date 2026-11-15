import React, { useEffect, useMemo, useState } from "react";
import { Menu, X, ShoppingBag, ChevronDown, ArrowRight, MessageCircle } from "lucide-react";
import { useBasket, basket } from "../lib/basket.js";
import { useProducts } from "../lib/store.js";
import { categoriesOf, brandOf } from "../data/products.js";
import { href } from "../lib/router.js";
import { Logo } from "./Brand.jsx";
import Price from "./Price.jsx";
import { waLink } from "../config.js";

export default function NavBar({ path }) {
  const [open, setOpen] = useState(false);
  const [mega, setMega] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { count } = useBasket();
  const { products } = useProducts();

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 10);
    on(); window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  useEffect(() => { setOpen(false); setMega(false); }, [path]);
  useEffect(() => { document.body.style.overflow = open ? "hidden" : ""; return () => (document.body.style.overflow = ""); }, [open]);
  useEffect(() => { const k = (e) => e.key === "Escape" && setMega(false); window.addEventListener("keydown", k); return () => window.removeEventListener("keydown", k); }, []);

  const cats = useMemo(() => categoriesOf(products).map((c) => [c, products.filter((p) => p.cat === c).length]).filter(([, n]) => n), [products]);
  const brands = useMemo(() => {
    const m = new Map(); products.forEach((p) => m.set(brandOf(p), (m.get(brandOf(p)) || 0) + 1)); m.delete("Other");
    return [...m.entries()].sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0])).slice(0, 9);
  }, [products]);
  const picks = useMemo(() => products.filter((p) => p.featured).slice(0, 2), [products]);

  const link = (to, label) => (
    <a key={to} href={href(to)} className={`relative py-2 text-[0.92rem] font-semibold transition hover:text-brass ${path === to ? "text-brass" : ""}`}>
      {label}{path === to && <span className="absolute inset-x-0 -bottom-0.5 h-px bg-brass" />}
    </a>
  );

  return (
    <>
      <div className="fixed inset-x-0 top-0 z-40" onMouseLeave={() => setMega(false)}>
        <div className="bg-pine px-4 py-2 font-mono text-[0.66rem] uppercase tracking-[0.18em] text-cream/80">
          <div className="mx-auto flex max-w-7xl items-center justify-center gap-3 md:justify-between">
            <span><span className="text-sun">✦</span> Original second-hand brands <span className="hidden sm:inline">· smart &amp; good condition</span></span>
            <a href={waLink("Hi Original Fits!")} target="_blank" rel="noreferrer" className="hidden items-center gap-1.5 hover:text-sun md:inline-flex"><MessageCircle size={12} /> Order on WhatsApp</a>
          </div>
        </div>

        <header className={`relative border-b transition ${scrolled ? "border-ink/10 bg-cream/95 shadow-[0_8px_30px_-18px_rgba(7,42,32,.5)] backdrop-blur-md" : "border-transparent bg-cream"}`}>
          <div className="mx-auto grid h-[76px] max-w-7xl grid-cols-[1fr_auto_1fr] items-center gap-4 px-5 md:h-[88px] md:px-8">
            <nav className="hidden items-center gap-8 md:flex" aria-label="Main">
              <button onMouseEnter={() => setMega(true)} onFocus={() => setMega(true)} onClick={() => setMega((m) => !m)} aria-expanded={mega} aria-haspopup="true"
                className={`inline-flex items-center gap-1 py-2 text-[0.92rem] font-semibold transition hover:text-brass ${mega || path === "collections" ? "text-brass" : ""}`}>
                Shop <ChevronDown size={15} className={`transition ${mega ? "rotate-180" : ""}`} />
              </button>
              {link("about", "Our story")}
            </nav>
            <button className="grid h-11 w-11 place-items-center rounded-full border border-ink/20 md:hidden" onClick={() => setOpen((o) => !o)} aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open}>
              {open ? <X size={19} /> : <Menu size={19} />}
            </button>

            <a href={href()} aria-label="Original Fits home" className="justify-self-center"><Logo className="scale-[.82] sm:scale-100" /></a>

            <div className="flex items-center justify-end gap-8">
              <nav className="hidden items-center gap-8 md:flex" aria-label="Secondary">{link("request", "Request a piece")}{link("contact", "Contact")}</nav>
              <button onClick={() => basket.open()} aria-label={`Open basket, ${count} items`} className="relative grid h-11 w-11 place-items-center rounded-full bg-emerald text-cream transition hover:bg-brass hover:text-pine">
                <ShoppingBag size={18} />
                {count > 0 && <span className="absolute -right-1 -top-1 grid h-5 min-w-[1.25rem] place-items-center rounded-full bg-brass px-1 font-mono text-[0.65rem] font-medium text-pine">{count}</span>}
              </button>
            </div>
          </div>

          {/* Mega menu */}
          {mega && (
            <div className="absolute inset-x-0 top-full hidden border-b border-ink/10 bg-cream shadow-xl md:block" onMouseEnter={() => setMega(true)}>
              <div className="mx-auto grid max-w-7xl grid-cols-[0.9fr_1.3fr_1.3fr] gap-12 px-8 py-9">
                <div>
                  <p className="eyebrow text-brass">Categories</p>
                  <ul className="mt-4 space-y-1">
                    <li><a href={href("collections")} className="flex items-center justify-between rounded-full px-4 py-2 text-sm font-bold hover:bg-sand">Shop everything <span className="font-mono text-xs opacity-50">{products.length}</span></a></li>
                    {cats.map(([c, n]) => (<li key={c}><a href={href(`collections?cat=${encodeURIComponent(c)}`)} className="flex items-center justify-between rounded-full px-4 py-2 text-sm font-semibold hover:bg-sand">{c}<span className="font-mono text-xs opacity-50">{n}</span></a></li>))}
                  </ul>
                </div>
                <div>
                  <p className="eyebrow text-brass">Top brands</p>
                  <ul className="mt-4 grid grid-cols-2 gap-x-4 gap-y-1">
                    {brands.map(([b, n]) => (<li key={b}><a href={href(`collections?brand=${encodeURIComponent(b)}`)} className="block whitespace-nowrap rounded-full px-3 py-1.5 text-sm font-semibold hover:bg-sand">{b} <span className="font-mono text-[0.65rem] opacity-40">{n}</span></a></li>))}
                  </ul>
                  <a href={href("collections")} className="mt-4 inline-flex items-center gap-1.5 px-3 text-sm font-bold text-emerald hover:text-brass">All brands <ArrowRight size={14} /></a>
                </div>
                <div>
                  <p className="eyebrow text-brass">Editor’s picks</p>
                  <div className="mt-4 grid grid-cols-2 gap-4">
                    {picks.map((p) => (
                      <a key={p.id} href={href(`collections?brand=${encodeURIComponent(brandOf(p))}`)} className="group block">
                        <div className="aspect-square overflow-hidden rounded-2xl bg-sand"><img src={p.images[0]?.src} alt="" className="h-full w-full object-cover transition duration-500 group-hover:scale-105" /></div>
                        <p className="mt-2 text-sm font-semibold leading-tight">{p.name}</p>
                        <Price p={p} className="text-sm text-ink/60" />
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </header>
      </div>

      {open && (
        <div className="fixed inset-0 z-30 flex flex-col overflow-y-auto bg-emerald px-6 pb-10 pt-36 text-cream md:hidden">
          <nav className="flex flex-col" aria-label="Mobile">
            {[["collections", "Shop"], ["about", "Our story"], ["request", "Request a piece"], ["contact", "Contact"], ["admin", "Staff Login"]].map(([to, l]) => (
              <a key={to} href={href(to)} className={`border-b border-cream/15 py-4 font-display text-4xl italic ${path === to ? "text-sun" : ""}`}>{l}</a>
            ))}
          </nav>
          <p className="eyebrow mt-8 text-sun">Categories</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {cats.map(([c]) => (<a key={c} href={href(`collections?cat=${encodeURIComponent(c)}`)} className="rounded-full border border-cream/30 px-4 py-2 text-sm font-semibold">{c}</a>))}
          </div>
          <a href={waLink("Hi Original Fits!")} target="_blank" rel="noreferrer" className="btn-brass mt-10 w-full"><MessageCircle size={17} /> Order on WhatsApp</a>
        </div>
      )}
    </>
  );
}
