import React from "react";
import { MessageCircle } from "lucide-react";
import { waLink } from "../config.js";

export default function WhatsAppFloat() {
  return (
    <a href={waLink("Hi Original Fits, I'd like to ask about a piece.")} target="_blank" rel="noreferrer" aria-label="Chat on WhatsApp"
      className="fixed bottom-5 right-5 z-30 grid h-14 w-14 place-items-center rounded-full bg-[#25D366] text-pine shadow-lg shadow-ink/25 transition hover:-translate-y-0.5">
      <MessageCircle size={26} />
    </a>
  );
}
