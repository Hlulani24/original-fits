// Photos bundled in /public/images/p that the admin can attach to any product.
import { SEED_PRODUCTS } from "./products.js";
export const IMAGE_LIBRARY = SEED_PRODUCTS.flatMap((p) => p.images.map((i) => ({ src: i.src, label: p.name })));
