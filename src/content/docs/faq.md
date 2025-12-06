---
title: FAQ
description: Frequently asked questions
---

# FAQ

**How do I add a new doc?**

Create a `.md` or `.mdx` file under `src/content/docs/`. The URL mirrors the file path.

**How do I enable code previews?**

Use the `<SandpackPreview />` component in MDX files.

**How do I change the order and the prev/next navigation?**

Edit `docsItems` in `src/components/site/Sidebar.tsx`. The sidebar and bottom pager use this order.

**Can I nest sections?**

Yes. Create folders under `src/content/docs/` and update `docsItems` as needed.

**How do I change colors and theming?**

Edit `--accent` and `--accent-soft` in `src/app/globals.css`. Use `text-accent`, `bg-accent-soft`, and `ring-accent` in components.

**How do I change the logo and favicon?**

Replace `public/logo.svg` and `public/favicon.svg`. The app references them in `src/app/layout.tsx` and the navbar.

**How does search work?**

Search is client-side using an index in `public/search-index.json`. The `build` script regenerates it.
