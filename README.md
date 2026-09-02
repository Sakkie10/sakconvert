# SakConvert

Live site: [https://sakconvert.com](https://sakconvert.com)

A free set of online calculators, converters and tools. I designed the visual identity and built the site from concept through DNS and production hosting.

## What it includes

- Unit, currency and finance calculators
- Responsive layout for desktop and mobile
- Contact / subscribe flow
- Cookie, privacy and terms pages

## Stack

- HTML, CSS and JavaScript
- Git and GitHub
- Cloudflare Pages for hosting
- Cloudflare Worker for the `/api` routes
- Resend for transactional / subscriber email
- Cloudflare Email Routing into Gmail

The Resend API key is stored as a Worker secret (`RESEND_API_KEY`). It is not in this repository.

## Local preview

This is a static site. Open `index.html` in a browser, or use Live Server in VS Code.

The Worker lives in `sakconvert-worker/`. Secrets stay in Cloudflare, not in `.env` files committed to Git.

## Deploy

Push to `main`. Cloudflare Pages serves the site. The Worker is deployed separately with Wrangler and is routed to `sakconvert.com/api/*`.