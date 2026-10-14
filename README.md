# Vaulted VTG — Multi-page website

A responsive static website for GitHub Pages, rebuilt from the published Vaulted VTG website's visible content and branding.

## Pages
- `index.html` — homepage and featured products
- `shop.html` — product grid with category filters and sort options
- `story.html` — brand story and values
- `visit.html` — store address, hours, and directions

## Shared files
- `style.css` — site-wide styling and responsive layout
- `script.js` — sample product data, category filters, and demo shopping bag
- `assets/favicon.svg` — browser tab icon

## Publish to GitHub Pages
1. Download and unzip this project.
2. Open your `VaultedVTG` repository on GitHub.
3. Upload the contents of this folder to the repository's root (not the enclosing folder).
4. Commit the changes.
5. Wait for GitHub Pages to rebuild, then visit your site.

If your repository URL is `https://onemorecasual.github.io/VaultedVTG/`, use relative links like `shop.html`, not root links like `/shop.html`, so the pages work under the repository path.

## Customize your inventory
Open `script.js` and edit `sampleProducts`. Replace sample product names, categories, and prices. The current product art is CSS-generated placeholder artwork, not actual garment photography. To use real photos, add an image path to each product and update `productCard()` to render an `<img>` element.

## Important
This is a static catalog/demo. The bag works in the browser session but does not place orders, store inventory, accept payment, or connect to a POS system. The address and hours reflect the published page and should be checked before relying on them.
