# Original Fits — Website

React + Vite + Tailwind. Enquiry-and-basket site for a second-hand designer resale shop (no payment gateway).
Every piece is **one of one**: no colour/quantity pickers, a "In your basket" state, brand + size + category filters,
and a "Request a piece" form for customers hunting a specific item.

## Run it
```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build in dist/
```

## Before launch — fill in `src/config.js`
- `WHATSAPP_NUMBER` (international, no "+", e.g. `27821234567`). Empty = WhatsApp opens with the message ready but no recipient.
- `PHONES` and `SOCIALS` (Instagram / TikTok / Facebook) — hidden until filled in.

## Admin
`/#/admin` (footer → Staff login). Demo passcode: `fits-demo` (`VITE_ADMIN_DEMO_PASSCODE`). Demo edits live in the browser only until Supabase is connected.
- **Categories**: pick one, or choose **"＋ Add a new category…"** in the category dropdown and type it. New categories appear in the shop filters automatically.
- **Brand** is read from the start of the product name (e.g. "Gucci Bag"). Known brands are listed in `BRANDS` in `src/data/products.js`; add new ones there for the brand filter and brand wall.
- **Size**: tick one size per piece (shoe sizes, waist sizes and S–3XL are available). Hide a piece when it sells (untick "Visible").
- "Request a piece" submissions appear under **Custom orders** (Garment = brand/item, Quantity = size, Colours = budget).

## Go live (Supabase + EmailJS + Cloudinary + Render)
1. **Supabase**: run `supabase/schema.sql`; add the owner as a user; `insert into public.admins (email) values ('owner@email.com');`; disable sign-ups; copy URL + anon key.
2. **Cloudinary**: unsigned upload preset `original_fits_products`.
3. **EmailJS**: service + templates.
4. **Render**: push to a private GitHub repo → New → Blueprint (`render.yaml`) → add env vars from `.env.example`. Then Admin → Products → **Load starter catalogue** once.

## Check with the client
- The 37 starter products were transcribed from the WhatsApp catalogue screenshots; the photos are small thumbnails — replace with originals.
- Names corrected from the listing: "Couch" → Coach, "Phillip Plein" → Philipp Plein, "me jeans" → Next jeans (photo shows the NEXT label, and a R600 price tag vs R700 listed), "Large" → Puffer Jacket (L). Some product titles were guessed from the photo (e.g. Balenciaga Triple S, Gucci Ace, Dior High-Tops).
- The logo is a simple placeholder wordmark + hanger icon — swap in the real logo if they have one.

## Logo & photos
- Logo files: `public/brand/` (lockup, light lockup for dark backgrounds, monogram). The logo is drawn in `src/components/Brand.jsx`.
- Product photos are in `public/images/p/<product-id>.jpg`. They were small thumbnails from the WhatsApp catalogue that I upscaled (EDSR) — to get truly sharp photos, drop the original images in with the **same filenames** (square, 1000px+ is ideal), or upload new ones from Admin → Products.
- Colour / size / quantity: shoppers choose them in the product viewer. Add more colours by adding extra photos (each with a colour) to a product in Admin; offer more sizes by ticking them.
- If the admin demo still shows old products/photos in your browser, use Admin → "Reset demo products".
