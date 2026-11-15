import React, { useEffect, useState } from "react";
import { Menu, X, ShoppingBag } from "lucide-react";
import { useBasket, basket } from "../lib/basket.js";
import { href } from "../lib/router.js";
import { Logo } from "./Brand.jsx";

const LEFT = [["collections", "Shop"], ["about", "Our story"]];
const RIGHT = [["request", "Request a piece"], ["contact", "Contact"]];

export default function NavBar({ path }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { count } = useBasket();
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 10);
    on(); window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  useEffect(() => setOpen(false), [path]);
  useEffect(() => { document.body.style.overflow = open ? "hidden" : ""; return () => (document.body.style.overflow = ""); }, [open]);

  const link = ([to, label]) => (
    <a key={to} href={href(to)} className={`relative py-2 text-sm font-semibold transition hover:text-brass ${path === to ? "text-brass" : ""}`}>
      {label}
      {path === to && <span className="absolute inset-x-0 -bottom-0.5 h-px bg-brass" />}
    </a>
  );

  return (
    <>
      <div className="fixed inset-x-0 top-0 z-40">
        <div className="bg-emerald px-4 py-2 text-center font-mono text-[0.68rem] uppercase tracking-[0.18em] text-cream/85">
          Original second-hand brands <span className="mx-2 text-brass">✦</span> Smart &amp; good condition <span className="mx-2 hidden text-brass sm:inline">✦</span><span className="hidden sm:inline">One of one</span>
        </div>
        <header className={`border-b transition ${scrolled ? "border-ink/10 bg-cream/90 backdrop-blur-md" : "border-transparent bg-cream"}`}>
          <div className="mx-auto grid h-[68px] max-w-7xl grid-cols-[1fr_auto_1fr] items-center gap-4 px-5 md:px-8">
            <nav className="hidden items-center gap-7 md:flex" aria-label="Main">{LEFT.map(link)}</nav>
            <button className="grid h-11 w-11 place-items-center rounded-full border border-ink/20 md:hidden" onClick={() => setOpen((o) => !o)} aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open}>
              {open ? <X size={19} /> : <Menu size={19} />}
            </button>
            <a href={href()} aria-label="Original Fits home" className="justify-self-center"><Logo /></a>
            <div className="flex items-center justify-end gap-7">
              <nav className="hidden items-center gap-7 md:flex" aria-label="Secondary">{RIGHT.map(link)}</nav>
              <button onClick={() => basket.open()} aria-label={`Open basket, ${count} items`} className="relative grid h-11 w-11 place-items-center rounded-full bg-emerald text-cream transition hover:bg-brass">
                <ShoppingBag size={18} />
                {count > 0 && <span className="absolute -right-1 -top-1 grid h-5 min-w-[1.25rem] place-items-center rounded-full bg-brass px-1 font-mono text-[0.65rem] font-medium text-pine">{count}</span>}
              </button>
            </div>
          </div>
        </header>
      </div>
      {open && (
        <div className="fixed inset-0 z-30 flex flex-col bg-emerald px-6 pb-10 pt-32 text-cream md:hidden">
          <nav className="flex flex-col" aria-label="Mobile">
            {[...LEFT, ...RIGHT].map(([to, l]) => (
              <a key={to} href={href(to)} className={`border-b border-cream/15 py-4 font-display text-4xl italic ${path === to ? "text-sun" : ""}`}>{l}</a>
            ))}
          </nav>
          <p className="mt-auto font-mono text-xs uppercase tracking-widest text-cream/50">Original brands · second time around</p>
        </div>
      )}
    </>
  );
}
