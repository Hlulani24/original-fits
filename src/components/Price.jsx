import React from "react";
import { SHOW_PRICES } from "../config.js";

export const money = (n) => `R${Number(n).toLocaleString("en-ZA")}`;
export const isSpecial = (p) => p.salePrice != null && p.price != null && Number(p.salePrice) < Number(p.price);

export default function Price({ p, large = false, className = "" }) {
  if (!SHOW_PRICES || p.price == null) return null;
  const sale = isSpecial(p);
  return (
    <span className={`inline-flex items-baseline gap-2 font-mono font-medium ${className}`}>
      <span className={`${large ? "text-3xl" : "text-base"} ${sale ? "text-rust" : ""}`}>{money(sale ? p.salePrice : p.price)}</span>
      {sale && <span className={`opacity-50 line-through ${large ? "text-base" : "text-xs"}`}>{money(p.price)}</span>}
    </span>
  );
}
