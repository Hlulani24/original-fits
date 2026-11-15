import React, { useState } from "react";
import { Phone, Instagram, Facebook, MessageCircle, CheckCircle2, Loader2 } from "lucide-react";
import { submitLead } from "../lib/leads.js";
import { PHONES, SOCIALS, waLink } from "../config.js";

export default function Contact() {
  const [form, setForm] = useState({ name: "", phone: "", message: "" });
  const [status, setStatus] = useState("idle");
  const [result, setResult] = useState(null);
  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));
  const summary = `Hi Original Fits, it's ${form.name}. ${form.message}\n\nMy number: ${form.phone}`;

  async function onSubmit(e) {
    e.preventDefault(); setStatus("sending");
    setResult(await submitLead("enquiries", form, "VITE_EMAILJS_CONTACT_TEMPLATE_ID", form));
    setStatus("done");
  }
  const Row = ({ icon, label, value, href, ...rest }) => (
    <a href={href} className="group flex items-center gap-5 rounded-[1.4rem] border border-ink/10 bg-white/60 p-5 transition hover:border-emerald hover:bg-white" {...rest}>
      <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-emerald text-cream">{icon}</span>
      <span><span className="eyebrow block text-[0.6rem] text-ink/45">{label}</span><span className="mt-0.5 block font-display text-xl font-semibold">{value}</span></span>
    </a>
  );

  return (
    <main className="pt-[130px] md:pt-[150px]">
      <section className="mx-auto max-w-7xl px-5 pb-24 pt-12 md:px-8 md:pt-16">
        <p className="reveal eyebrow text-brass">Contact</p>
        <h1 className="reveal h-serif mt-3 text-6xl md:text-8xl" data-d="1">Let’s <em className="font-medium italic text-emerald">talk.</em></h1>
        <p className="reveal mt-5 max-w-xl text-lg text-ink/65" data-d="2">Questions about a piece, sizing or delivery? Reach us any way that suits you.</p>
        <div className="mt-12 grid gap-8 lg:grid-cols-2 lg:gap-14">
          <div className="space-y-4">
            <Row icon={<MessageCircle size={20} />} label="WhatsApp" value="Chat with us" href={waLink("Hi Original Fits, I'd like to ask about…")} target="_blank" rel="noreferrer" />
            {PHONES.map((p) => (<Row key={p.tel} icon={<Phone size={20} />} label="Call" value={p.display} href={`tel:${p.tel}`} />))}
            {SOCIALS.instagram && <Row icon={<Instagram size={20} />} label="Instagram" value={SOCIALS.instagram.label} href={SOCIALS.instagram.url} target="_blank" rel="noreferrer" />}
            {SOCIALS.facebook && <Row icon={<Facebook size={20} />} label="Facebook" value={SOCIALS.facebook.label} href={SOCIALS.facebook.url} target="_blank" rel="noreferrer" />}
            {SOCIALS.tiktok && <Row icon={<span className="text-lg">♪</span>} label="TikTok" value={SOCIALS.tiktok.label} href={SOCIALS.tiktok.url} target="_blank" rel="noreferrer" />}
          </div>
          <div className="rounded-[2rem] bg-white/70 p-6 md:p-9">
            {status === "done" ? (
              <div className="py-6 text-center">
                <CheckCircle2 size={44} className="mx-auto text-emerald" />
                <h2 className="h-serif mt-5 text-4xl">{result?.saved || result?.emailed ? "Message sent." : "One last step."}</h2>
                <p className="mt-3 text-sm text-ink/65">{result?.saved || result?.emailed ? "Thanks — we’ll reply shortly. For the fastest answer, send it on WhatsApp too." : "Tap below to send your message on WhatsApp — it’s pre-filled."}</p>
                <a href={waLink(summary)} target="_blank" rel="noreferrer" className="btn-emerald mt-6"><MessageCircle size={16} /> Send on WhatsApp</a>
              </div>
            ) : (
              <form onSubmit={onSubmit} className="space-y-4">
                <h2 className="h-serif text-3xl">Send a message</h2>
                <label className="block"><span className="eyebrow text-[0.65rem] text-ink/50">Name</span><input required value={form.name} onChange={set("name")} className="field-light mt-2" autoComplete="name" /></label>
                <label className="block"><span className="eyebrow text-[0.65rem] text-ink/50">Phone / WhatsApp</span><input required value={form.phone} onChange={set("phone")} inputMode="tel" className="field-light mt-2" autoComplete="tel" /></label>
                <label className="block"><span className="eyebrow text-[0.65rem] text-ink/50">Message</span><textarea required rows={4} value={form.message} onChange={set("message")} className="field-light mt-2" /></label>
                <button disabled={status === "sending"} className="btn-emerald w-full">{status === "sending" ? <Loader2 size={16} className="animate-spin" /> : "Send message"}</button>
              </form>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
