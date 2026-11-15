import React, { useMemo, useState } from "react";
import { ArrowRight, ArrowUpRight, MessageCircle } from "lucide-react";
import { href } from "../lib/router.js";
import { useProducts } from "../lib/store.js";
import { brandOf } from "../data/products.js";
import ProductCard from "../components/ProductCard.jsx";
import ProductModal from "../components/ProductModal.jsx";
import Marquee from "../components/Marquee.jsx";
import { Stamp } from "../components/Brand.jsx";
import { waLink } from "../config.js";

const ARCHES = ["gucci-sneakers-6", "louis-vuitton-bag", "balenciaga-6"];
const CATS = [
  { cat: "Sneakers & Shoes", img: "christian-dior-9" },
  { cat: "Jeans & Pants", img: "g-star-36" },
  { cat: "Bags", img: "gucci-laptop-bag" },
  { cat: "Tees & Polos", img: "celine-tee-xl" },
];
const STEPS = [
  ["I", "Find your piece", "Browse by brand, size or category. Every item is photographed and priced as listed."],
  ["II", "Add it to your basket", "Send your basket as a request, or ask about a single item on WhatsApp."],
  ["III", "We confirm, you collect", "Because each piece is one of one, we confirm it’s still available and arrange delivery or collection."],
];

export default function Home() {
  const { products } = useProducts();
  const [open, setOpen] = useState(null);
  const fresh = useMemo(() => [...products.filter((p) => p.featured), ...products.filter((p) => !p.featured)].slice(0, 8), [products]);
  const brandCounts = useMemo(() => {
    const m = new Map();
    products.forEach((p) => m.set(brandOf(p), (m.get(brandOf(p)) || 0) + 1));
    m.delete("Other");
    return [...m.entries()].sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]));
  }, [products]);

  return (
    <main>
      {/* HERO */}
      <section className="relative overflow-hidden pt-[130px] md:pt-[150px]">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 pb-20 pt-6 md:px-8 lg:grid-cols-[1fr_1fr] lg:pb-28 lg:pt-10">
          <div>
            <p className="reveal eyebrow text-brass">Pre-loved designer · {products.length} pieces in store</p>
            <h1 className="reveal h-serif mt-5 text-[3.6rem] sm:text-[5.2rem] lg:text-[5.8rem]" data-d="1">
              Original brands,
              <br /><em className="font-medium italic text-emerald">second time</em> around.
            </h1>
            <p className="reveal mt-8 max-w-md text-lg leading-relaxed text-ink/70" data-d="2">
              Original second-hand sneakers, denim, tees, jackets and bags — all in smart, good condition, all one of one.
            </p>
            <div className="reveal mt-9 flex flex-wrap gap-3" data-d="3">
              <a href={href("collections")} className="btn-emerald">Shop the collection <ArrowRight size={17} /></a>
              <a href={waLink("Hi Original Fits, I'm looking for a piece.")} target="_blank" rel="noreferrer" className="btn-outline"><MessageCircle size={17} /> Ask on WhatsApp</a>
            </div>
          </div>

          <div className="reveal relative mx-auto grid w-full max-w-[620px] grid-cols-3 items-center gap-3 md:gap-4" data-d="1">
            {ARCHES.map((n, i) => (
              <div key={n} className={`arch overflow-hidden bg-sand ${i === 1 ? "aspect-[3/5.6]" : "aspect-[3/4.4]"}`}>
                <img src={`/images/p/${n}.jpg`} alt="" className="h-full w-full object-cover" fetchpriority="high" />
              </div>
            ))}
            <Stamp className="absolute -right-3 -top-6 h-24 w-24 rotate-12 md:-right-8 md:h-28 md:w-28" />
          </div>
        </div>
      </section>

      <Marquee />

      {/* JUST IN */}
      <section className="mx-auto max-w-7xl px-5 py-24 md:px-8 md:py-28">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="reveal eyebrow text-brass">Just in</p>
            <h2 className="reveal h-serif mt-3 text-5xl md:text-7xl" data-d="1">Fresh <em className="font-medium italic">finds</em></h2>
          </div>
          <a href={href("collections")} className="reveal btn-outline" data-d="2">See all {products.length} <ArrowUpRight size={16} /></a>
        </div>
        <div className="mt-12 grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-4 md:gap-x-6">
          {fresh.map((p, i) => (<ProductCard key={p.id} p={p} i={i} onOpen={setOpen} />))}
        </div>
      </section>

      {/* BRAND WALL */}
      <section className="bg-emerald py-24 text-cream md:py-28">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <p className="reveal eyebrow text-sun">The labels</p>
          <h2 className="reveal h-serif mt-3 max-w-3xl text-5xl md:text-7xl" data-d="1">Shop by <em className="font-medium italic text-sun">brand</em></h2>
          <ul className="mt-12 flex flex-wrap gap-x-3 gap-y-2 md:gap-x-5">
            {brandCounts.map(([b, n]) => (
              <li key={b} className="reveal">
                <a href={href(`collections?brand=${encodeURIComponent(b)}`)} className="group inline-flex items-start gap-1 font-display text-3xl italic leading-[1.25] text-cream/85 transition hover:text-sun md:text-5xl">
                  {b}<sup className="mt-1.5 font-mono text-[0.6rem] not-italic text-brass md:mt-2.5 md:text-xs">{n}</sup>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="mx-auto max-w-7xl px-5 py-24 md:px-8 md:py-28">
        <p className="reveal eyebrow text-brass">Browse</p>
        <h2 className="reveal h-serif mt-3 text-5xl md:text-7xl" data-d="1">Find your <em className="font-medium italic">fit</em></h2>
        <div className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
          {CATS.map((c, i) => (
            <a key={c.cat} href={href(`collections?cat=${encodeURIComponent(c.cat)}`)} data-d={i % 4 || undefined} className="reveal group block">
              <div className="arch aspect-[3/4] overflow-hidden bg-sand"><img src={`/images/p/${c.img}.jpg`} alt="" loading="lazy" className="h-full w-full object-cover transition duration-700 group-hover:scale-105" /></div>
              <p className="mt-4 flex items-center justify-between font-display text-2xl font-semibold tracking-tight">{c.cat}<ArrowUpRight size={20} className="text-brass transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" /></p>
            </a>
          ))}
        </div>
      </section>

      {/* HOW */}
      <section className="border-y border-ink/10 bg-sand/60 py-24">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <p className="reveal eyebrow text-brass">How it works</p>
          <h2 className="reveal h-serif mt-3 text-5xl md:text-7xl" data-d="1">One of one,<br /><em className="font-medium italic">first come first served.</em></h2>
          <ol className="mt-14 grid gap-px overflow-hidden rounded-[1.6rem] bg-ink/10 md:grid-cols-3">
            {STEPS.map(([n, t, d], i) => (
              <li key={n} data-d={i + 1} className="reveal bg-cream p-8 md:p-10">
                <span className="font-display text-5xl italic text-brass">{n}</span>
                <h3 className="mt-6 font-display text-2xl font-semibold tracking-tight">{t}</h3>
                <p className="mt-3 text-sm leading-relaxed text-ink/65">{d}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-5 py-24 md:px-8 md:py-28">
        <div className="reveal grid items-center gap-8 rounded-[2rem] bg-pine p-8 text-cream md:grid-cols-[1.3fr_1fr] md:p-14">
          <div>
            <p className="eyebrow text-sun">Can’t see it?</p>
            <h2 className="h-serif mt-3 text-4xl md:text-6xl">Tell us the brand and size you’re <em className="font-medium italic text-sun">hunting</em>.</h2>
          </div>
          <div className="flex flex-wrap gap-3 md:justify-end">
            <a href={href("request")} className="btn-brass">Request a piece <ArrowRight size={16} /></a>
            <a href={waLink("Hi Original Fits!")} target="_blank" rel="noreferrer" className="btn-outline-light"><MessageCircle size={16} /> WhatsApp</a>
          </div>
        </div>
      </section>

      {open && <ProductModal p={open} onClose={() => setOpen(null)} />}
    </main>
  );
}
