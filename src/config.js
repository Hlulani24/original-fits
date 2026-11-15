// Single place to edit brand details. Everything on the site reads from here.

export const BRAND = {
  name: "Original Fits",
  short: "Original Fits",
  tagline: "Original brands. Second time around.",
  promise: "All original second-hand brands. Smart and in good condition.",
};

// TODO: add the shop's WhatsApp number in international format, no "+" (e.g. 27821234567).
// While empty, WhatsApp buttons open WhatsApp with the message ready to send to any contact.
export const WHATSAPP_NUMBER = "27754291202";

// Optional call numbers shown in the footer / contact page: [{ display: "082 123 4567", tel: "+27821234567" }]
export const PHONES = [{display: "27754291202", tel: "27754291202"}];

// Optional social links: { label, url }. Leave a key out to hide it.
export const SOCIALS = {
   instagram: { label: "Instagram", url: "https://www.instagram.com/explore/search" },
   tiktok: { label: "TikTok", url: "https://www.tiktok.com/search/top?q=original%20fits" },
   facebook: { label: "Facebook", url: "https://www.facebook.com/search/top?q=original%20fits" },
};

export const SHOW_PRICES = true;
export const SHOW_CONCEPT_TAGS = false;
export const PRICE_NOTE = "Every piece is one of one and sold as seen. Prices are in rand; availability is confirmed on WhatsApp.";

export function waLink(text = "") {
  const q = text ? `?text=${encodeURIComponent(text)}` : "";
  return WHATSAPP_NUMBER ? `https://wa.me/${WHATSAPP_NUMBER}${q}` : `https://api.whatsapp.com/send${q}`;
}
