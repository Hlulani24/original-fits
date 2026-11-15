// Sizes the admin can offer on a product.
const shoes = Array.from({ length: 11 }, (_, i) => String(i + 3)); // 3–13
export const ALL_SIZES = ["XS", "S", "M", "L", "XL", "2XL", "3XL", "One size", ...shoes, "26", "28", "30", "32", "34", "36", "38", "40", "46", "48", "50"];

// Sensible default size run when the admin hasn't ticked any sizes, based on the category name.
export function defaultSizes(cat = "") {
  if (/shoe|sneaker|boot|loafer|foot/i.test(cat)) return ["5", "6", "7", "8", "9", "10", "11"];
  if (/jean|pant|short|trouser|jogger|bottom|denim/i.test(cat)) return ["28", "30", "32", "34", "36", "38"];
  if (/bag|access|cap|hat|belt|watch|wallet/i.test(cat)) return ["One size"];
  return ["S", "M", "L", "XL", "2XL"];
}

export function sizesFor(p) {
  if (p.sizes && p.sizes.length) return ALL_SIZES.filter((s) => p.sizes.includes(s));
  return defaultSizes(p.cat);
}
