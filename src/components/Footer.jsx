import React from "react";
import { Instagram, Facebook, MessageCircle, Phone } from "lucide-react";
import { href } from "../lib/router.js";
import { Logo } from "./Brand.jsx";
import { PHONES, SOCIALS, waLink } from "../config.js";

export default function Footer() {
  return (
    <footer className="mt-24 bg-pine text-cream">
      <div className="mx-auto max-w-7xl px-5 pb-10 pt-20 md:px-8">
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <Logo light size="lg" />
            <p className="mt-6 max-w-sm font-display text-3xl italic leading-tight text-cream/90">Original brands. Second time around.</p>
            <p className="mt-4 text-sm text-cream/55">All original second-hand brands, in smart and good condition.</p>
          </div>
          <nav aria-label="Footer">
            <p className="eyebrow text-brass">Explore</p>
            <ul className="mt-5 space-y-3 text-sm font-medium text-cream/80">
              {[["collections", "Shop all"], ["request", "Request a piece"], ["about", "Our story"], ["contact", "Contact"]].map(([to, l]) => (
                <li key={to}><a href={href(to)} className="hover:text-sun">{l}</a></li>
              ))}
            </ul>
          </nav>
          <div>
            <p className="eyebrow text-brass">Talk to us</p>
            <ul className="mt-5 space-y-3 text-sm font-medium text-cream/80">
              <li><a href={waLink("Hi Original Fits!")} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 hover:text-sun"><MessageCircle size={16} /> WhatsApp</a></li>
              {PHONES.map((p) => (<li key={p.tel}><a href={`tel:${p.tel}`} className="inline-flex items-center gap-2 hover:text-sun"><Phone size={16} /> {p.display}</a></li>))}
              {SOCIALS.instagram && <li><a href={SOCIALS.instagram.url} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 hover:text-sun"><Instagram size={16} /> {SOCIALS.instagram.label}</a></li>}
              {SOCIALS.facebook && <li><a href={SOCIALS.facebook.url} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 hover:text-sun"><Facebook size={16} /> {SOCIALS.facebook.label}</a></li>}
              {SOCIALS.tiktok && <li><a href={SOCIALS.tiktok.url} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 hover:text-sun">♪ {SOCIALS.tiktok.label}</a></li>}            </ul>
          </div>
        </div>
        <div className="mt-16 flex flex-col gap-3 border-t border-cream/15 pt-6 text-xs text-cream/45 md:flex-row md:items-center md:justify-between">
          <p>© {new Date().getFullYear()} Original Fits. Every piece is one of one and sold as seen.</p>
          <b>Designed By Maluleke Hlulani.</b><a href={href("admin")} className="hover:text-cream">Staff login</a>
        </div>
      </div>
    </footer>
  );
}
