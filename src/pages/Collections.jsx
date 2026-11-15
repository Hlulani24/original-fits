import React, { useMemo, useState } from "react";
import { Search, Loader2, SlidersHorizontal, X } from "lucide-react";
import { useProducts } from "../lib/store.js";
import { categoriesOf, brandOf } from "../data/products.js";
import { isSpecial } from "../components/Price.jsx";
import ProductCard from "../components/ProductCard.jsx";
import ProductModal from "../components/ProductModal.jsx";
import { href } from "../lib/router.js";
import { PRICE_NOTE, SHOW_PRICES } from "../config.js";

const SORTS = [["new", "Catalogue order"], ["low", "Price: low to high"], ["high", "Price: high to low"]];
const price = (p) => (p.salePrice != null && p.salePrice < p.price ? p.salePrice : p.price) ?? 0;

export default function Collections({ params }) {
  const { products, loading } = useProducts();
  const CATEGORIES = ["All", ...categoriesOf(products).filter((c) => products.some((p) => p.cat === c))];
  const cat = CATEGORIES.includes(params.cat) ? params.cat : "All";
  const brand = params.brand || "All";
  const [size, setSize] = useState("All");
  const [sort, setSort] = useState("new");
  const [q, setQ] = useState("");
  const [open, setOpen] = useState(null);
  const [filters, setFilters] = useState(false);

  const brands = useMemo(() => {
    const m = new Map();
    products.forEach((p) => m.set(brandOf(p), (m.get(brandOf(p)) || 0) + 1));
    return [...m.entries()].sort((a, b) => a[0].localeCompare(b[0]));
  }, [products]);
  const sizes = useMemo(() => [...new Set(products.map((p) => p.sizes?.[0]).filter((s) => s && s !== "One size"))].sort((a, b) => (isNaN(a) || isNaN(b) ? a.localeCompare(b) : a - b)), [products]);

  const list = useMemo(() => {
    const s = q.trim().toLowerCase();
    const out = products.filter((p) =>
      (cat === "All" || p.cat === cat) && (brand === "All" || brandOf(p) === brand) && (size === "All" || p.sizes?.[0] === size) &&
      (!s || `${p.name} ${p.cat} ${brandOf(p)}`.toLowerCase().includes(s)));
    if (sort === "low") out.sort((a, b) => price(a) - price(b));
    if (sort === "high") out.sort((a, b) => price(b) - price(a));
    return out;
  }, [products, cat, brand, size, sort, q]);

  const to = (c, b) => { const p = []; if (c !== "All") p.push(`cat=${encodeURIComponent(c)}`); if (b !== "All") p.push(`brand=${encodeURIComponent(b)}`); return href(`collections${p.length ? "?" + p.join("&") : ""}`); };
  const active = (cat !== "All") + (brand !== "All") + (size !== "All");

  const Panel = (
    <div className="space-y-9">
      <div>
        <p className="eyebrow text-ink/45">Category</p>
        <ul className="mt-3 space-y-1">
          {CATEGORIES.map((c) => (
            <li key={c}><a href={to(c, brand)} className={`block rounded-full px-4 py-2 text-sm font-semibold transition ${c === cat ? "bg-emerald text-cream" : "hover:bg-sand"}`}>{c}</a></li>
          ))}
        </ul>
      </div>
      <div>
        <p className="eyebrow text-ink/45">Brand</p>
        <ul className="mt-3 max-h-64 space-y-1 overflow-y-auto pr-1">
          <li><a href={to(cat, "All")} className={`block rounded-full px-4 py-2 text-sm font-semibold transition ${brand === "All" ? "bg-emerald text-cream" : "hover:bg-sand"}`}>All brands</a></li>
          {brands.map(([b, n]) => (
            <li key={b}><a href={to(cat, b)} className={`flex items-center justify-between rounded-full px-4 py-2 text-sm font-semibold transition ${b === brand ? "bg-emerald text-cream" : "hover:bg-sand"}`}>{b}<span className="font-mono text-xs opacity-50">{n}</span></a></li>
          ))}
        </ul>
      </div>
      {sizes.length > 0 && (
        <div>
          <p className="eyebrow text-ink/45">Size</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {["All", ...sizes].map((s) => (
              <button key={s} onClick={() => setSize(s)} aria-pressed={size === s} className={`min-w-[2.6rem] rounded-full border px-3 py-1.5 font-mono text-xs font-medium transition ${size === s ? "border-emerald bg-emerald text-cream" : "border-ink/20 hover:border-ink"}`}>{s}</button>
            ))}
          </div>
        </div>
      )}
    </div>
  );

  return (
    <main className="pt-[130px] md:pt-[150px]">
      <section className="mx-auto max-w-7xl px-5 pb-24 pt-12 md:px-8 md:pt-16">
        <p className="reveal eyebrow text-brass">The collection</p>
        <h1 className="reveal h-serif mt-3 text-6xl md:text-8xl" data-d="1">{brand !== "All" ? brand : cat !== "All" ? cat : <>Shop <em className="font-medium italic">everything</em></>}</h1>

        <div className="mt-12 grid gap-10 lg:grid-cols-[250px_1fr] lg:gap-14">
          <aside className="hidden lg:block"><div className="sticky top-36">{Panel}</div></aside>

          <div>
            <div className="flex flex-wrap items-center gap-3">
              <button onClick={() => setFilters(true)} className="btn-outline !px-5 !py-2.5 lg:hidden"><SlidersHorizontal size={16} /> Filters{active ? ` (${active})` : ""}</button>
              <label className="relative min-w-[10rem] flex-1">
                <span className="sr-only">Search</span>
                <Search size={16} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-ink/40" />
                <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search brand or item…" className="field-light !rounded-full !py-2.5 pl-11" />
              </label>
              <label className="flex items-center gap-2 text-sm">
                <span className="sr-only">Sort</span>
                <select value={sort} onChange={(e) => setSort(e.target.value)} className="field-light !w-auto !rounded-full !py-2.5 pr-8 font-semibold">
                  {SORTS.map(([v, l]) => (<option key={v} value={v}>{l}</option>))}
                </select>
              </label>
            </div>
            {active > 0 && (
              <div className="mt-4 flex flex-wrap items-center gap-2">
                {cat !== "All" && <a href={to("All", brand)} className="inline-flex items-center gap-1.5 rounded-full bg-sand px-3 py-1.5 text-xs font-bold">{cat} <X size={12} /></a>}
                {brand !== "All" && <a href={to(cat, "All")} className="inline-flex items-center gap-1.5 rounded-full bg-sand px-3 py-1.5 text-xs font-bold">{brand} <X size={12} /></a>}
                {size !== "All" && <button onClick={() => setSize("All")} className="inline-flex items-center gap-1.5 rounded-full bg-sand px-3 py-1.5 text-xs font-bold">Size {size} <X size={12} /></button>}
              </div>
            )}
            {loading ? (
              <div className="grid place-items-center py-32 text-ink/50"><Loader2 className="animate-spin" /></div>
            ) : list.length ? (
              <>
                <p className="mt-6 font-mono text-xs uppercase tracking-widest text-ink/45">{list.length} piece{list.length === 1 ? "" : "s"}</p>
                <div className="mt-6 grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-3 md:gap-x-6">
                  {list.map((p, i) => (<ProductCard key={p.id} p={p} i={i} onOpen={setOpen} />))}
                </div>
              </>
            ) : (
              <div className="mt-12 rounded-[1.6rem] border border-dashed border-ink/25 p-14 text-center">
                <p className="font-display text-3xl italic">Nothing here — yet.</p>
                <p className="mt-2 text-sm text-ink/60">Try another filter, or <a href={href("request")} className="font-bold text-emerald underline">request that piece</a>.</p>
              </div>
            )}
            {SHOW_PRICES && <p className="mt-14 text-xs text-ink/50">{PRICE_NOTE}</p>}
          </div>
        </div>
      </section>

      {filters && (
        <div className="fixed inset-0 z-50 flex items-end bg-pine/60 backdrop-blur-sm lg:hidden" onClick={() => setFilters(false)}>
          <div className="sheet-up max-h-[85dvh] w-full overflow-y-auto rounded-t-[2rem] bg-cream p-6 pb-10" onClick={(e) => e.stopPropagation()}>
            <div className="mb-6 flex items-center justify-between"><p className="font-display text-2xl font-semibold">Filters</p><button onClick={() => setFilters(false)} aria-label="Close" className="grid h-10 w-10 place-items-center rounded-full bg-sand"><X size={18} /></button></div>
            {Panel}
            <button onClick={() => setFilters(false)} className="btn-emerald mt-8 w-full">Show {list.length} pieces</button>
          </div>
        </div>
      )}
      {open && <ProductModal p={open} onClose={() => setOpen(null)} />}
    </main>
  );
}
