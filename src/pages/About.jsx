import React from "react";
import { ArrowRight } from "lucide-react";
import { href } from "../lib/router.js";

const POINTS = [
  ["Original brands", "Gucci, Balenciaga, Louis Vuitton, Chrome Hearts, Burberry and more — all original second-hand labels."],
  ["Smart & good condition", "Every piece is picked for how it looks and wears. What you see in the photo is what you get."],
  ["One of one", "No restocks. When a piece sells, it’s gone — so if you love it, say so."],
];

export default function About() {
  return (
    <main className="pt-[130px] md:pt-[150px]">
      <section className="mx-auto max-w-7xl px-5 pb-20 pt-12 md:px-8 md:pt-16">
        <p className="reveal eyebrow text-brass">Our story</p>
        <h1 className="reveal h-serif mt-4 max-w-5xl text-6xl md:text-[7.5rem]" data-d="1">Good taste<br />deserves a <em className="font-medium italic text-emerald">second life.</em></h1>
        <div className="reveal mt-14 grid gap-10 md:grid-cols-2" data-d="2">
          <p className="font-display text-2xl leading-snug md:text-3xl">Original Fits is a curated stock of original second-hand designer pieces — sneakers, denim, tees, jackets and bags — at prices that make the label more reachable.</p>
          <div className="space-y-5 text-lg leading-relaxed text-ink/70">
            <p>We believe great clothes shouldn’t be worn once and forgotten. Each item we list is chosen for brand and condition, photographed, priced and listed with its size.</p>
            <p>Shop on the site, send us your basket, and we’ll confirm availability and arrange delivery or collection with you directly on WhatsApp.</p>
          </div>
        </div>
      </section>
      <section className="bg-emerald py-24 text-cream">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <div className="grid gap-px overflow-hidden rounded-[1.6rem] bg-cream/15 md:grid-cols-3">
            {POINTS.map(([t, d], i) => (
              <div key={t} data-d={i + 1} className="reveal bg-emerald p-8 md:p-10">
                <p className="font-display text-5xl italic text-sun">0{i + 1}</p>
                <h3 className="mt-6 font-display text-2xl font-semibold">{t}</h3>
                <p className="mt-3 text-sm leading-relaxed text-cream/65">{d}</p>
              </div>
            ))}
          </div>
          <div className="reveal mt-14 flex justify-center"><a href={href("collections")} className="btn-brass">Shop the collection <ArrowRight size={16} /></a></div>
        </div>
      </section>
    </main>
  );
}
