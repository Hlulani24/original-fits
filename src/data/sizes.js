// Sizes the admin can offer on a product. Each Original Fits piece is one-of-one, so normally a single size.
const shoes = Array.from({ length: 11 }, (_, i) => String(i + 3)); // 3–13
export const ALL_SIZES = ["XS", "S", "M", "L", "XL", "2XL", "3XL", "One size", ...shoes, "26", "28", "30", "32", "34", "36", "38", "40", "46", "48", "50"];

export function sizesFor(p) {
  if (p.sizes && p.sizes.length) return ALL_SIZES.filter((s) => p.sizes.includes(s));
  return ["One size"];
}
