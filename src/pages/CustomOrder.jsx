import React, { useState } from "react";
import { CheckCircle2, MessageCircle, Loader2 } from "lucide-react";
import { submitLead } from "../lib/leads.js";
import { waLink } from "../config.js";

const KINDS = ["Sneakers", "Jeans", "Tees & polos", "Jackets", "Shorts", "Bags", "Something else"];

export default function Request() {
  const [form, setForm] = useState({ name: "", phone: "", email: "", brand: "", size: "", budget: "", notes: "" });
  const [kinds, setKinds] = useState([]);
  const [status, setStatus] = useState("idle");
  const [result, setResult] = useState(null);
  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));
  const toggle = (n) => setKinds((c) => (c.includes(n) ? c.filter((x) => x !== n) : [...c, n]));

  const summary = () => ["Hi Original Fits, I'm looking for a piece.", "", `Name: ${form.name}`, `Phone: ${form.phone}`, form.email && `Email: ${form.email}`, kinds.length && `Type: ${kinds.join(", ")}`, form.brand && `Brand / item: ${form.brand}`, form.size && `Size: ${form.size}`, form.budget && `Budget: ${form.budget}`, form.notes && `Notes: ${form.notes}`].filter(Boolean).join("\n");

  async function onSubmit(e) {
    e.preventDefault(); setStatus("sending");
    const row = { name: form.name, organisation: null, phone: form.phone, email: form.email || null, garment: form.brand || null, quantity: form.size || null, colours: form.budget || null, needs: kinds.join(", ") || null, deadline: null, notes: form.notes || null };
    setResult(await submitLead("custom_orders", row, "VITE_EMAILJS_ORDER_TEMPLATE_ID", { name: form.name, org: "", phone: form.phone, email: form.email, item: form.brand, qty: form.size, colours: form.budget, needs: kinds.join(", "), deadline: "", notes: form.notes }));
    setStatus("done");
  }

  if (status === "done") {
    const ok = result?.saved || result?.emailed;
    return (
      <main className="grid min-h-screen place-items-center px-5 pb-20 pt-[130px]">
        <div className="max-w-lg text-center">
          <CheckCircle2 size={52} className="mx-auto text-emerald" />
          <h1 className="h-serif mt-6 text-5xl md:text-6xl">{ok ? "Request received." : "One last step."}</h1>
          <p className="mt-4 text-ink/70">{ok ? "Thanks — we’ll message you when something that fits comes in. For the fastest reply, send the same details on WhatsApp." : "Tap below to send your request on WhatsApp — it’s pre-filled with everything you entered."}</p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <a href={waLink(summary())} target="_blank" rel="noreferrer" className="btn-emerald"><MessageCircle size={17} /> Send on WhatsApp</a>
            <button onClick={() => setStatus("idle")} className="btn-outline">Edit my request</button>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="pt-[130px] md:pt-[150px]">
      <section className="mx-auto grid max-w-7xl gap-12 px-5 pb-24 pt-14 md:px-8 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
        <div className="lg:sticky lg:top-40 lg:self-start">
          <p className="reveal eyebrow text-brass">Request a piece</p>
          <h1 className="reveal h-serif mt-3 text-6xl md:text-7xl" data-d="1">Hunting for <em className="font-medium italic text-emerald">something?</em></h1>
          <p className="reveal mt-6 max-w-md text-lg leading-relaxed text-ink/65" data-d="2">Tell us the brand, item and size. When a match comes in, you’ll hear from us first.</p>
        </div>
        <form onSubmit={onSubmit} className="reveal space-y-6 rounded-[2rem] bg-white/70 p-6 md:p-10" data-d="1">
          <fieldset>
            <legend className="eyebrow text-[0.65rem] text-ink/50">What are you after?</legend>
            <div className="mt-3 flex flex-wrap gap-2">
              {KINDS.map((k) => (
                <button type="button" key={k} onClick={() => toggle(k)} aria-pressed={kinds.includes(k)} className={`rounded-full border px-4 py-2 text-sm font-semibold transition ${kinds.includes(k) ? "border-emerald bg-emerald text-cream" : "border-ink/20 hover:border-ink"}`}>{k}</button>
              ))}
            </div>
          </fieldset>
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="block sm:col-span-2"><span className="eyebrow text-[0.65rem] text-ink/50">Brand / item</span><input value={form.brand} onChange={set("brand")} placeholder="e.g. Gucci belt, Nike Dunk" className="field-light mt-2" /></label>
            <label className="block"><span className="eyebrow text-[0.65rem] text-ink/50">Size</span><input value={form.size} onChange={set("size")} placeholder="e.g. 9, M, 32" className="field-light mt-2" /></label>
            <label className="block"><span className="eyebrow text-[0.65rem] text-ink/50">Budget</span><input value={form.budget} onChange={set("budget")} placeholder="e.g. up to R1 000" className="field-light mt-2" /></label>
            <label className="block"><span className="eyebrow text-[0.65rem] text-ink/50">Your name</span><input required value={form.name} onChange={set("name")} className="field-light mt-2" autoComplete="name" /></label>
            <label className="block"><span className="eyebrow text-[0.65rem] text-ink/50">Phone / WhatsApp</span><input required value={form.phone} onChange={set("phone")} inputMode="tel" className="field-light mt-2" autoComplete="tel" /></label>
            <label className="block sm:col-span-2"><span className="eyebrow text-[0.65rem] text-ink/50">Email (optional)</span><input type="email" value={form.email} onChange={set("email")} className="field-light mt-2" autoComplete="email" /></label>
            <label className="block sm:col-span-2"><span className="eyebrow text-[0.65rem] text-ink/50">Anything else?</span><textarea rows={3} value={form.notes} onChange={set("notes")} className="field-light mt-2" /></label>
          </div>
          <button disabled={status === "sending"} className="btn-emerald w-full">{status === "sending" ? <Loader2 size={16} className="animate-spin" /> : "Send request"}</button>
        </form>
      </section>
    </main>
  );
}
