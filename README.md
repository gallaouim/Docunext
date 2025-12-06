# DocuNext — Next.js Documentation Platform

DocuNext is a documentation platform built with Next.js and Tailwind, featuring MDX content, a sidebar with collapsible groups, an automatic table of contents, client-side search, and a polished UI with dark/light themes and accent colors.

## Features

- Markdown/MDX with GitHub-flavored markdown
- Sidebar navigation with collapsible groups and mobile drawer
- Automatic table of contents (right summary)
- Previous/Next navigation at the bottom of docs
- Client-side search (FlexSearch) with prebuilt index
- Dark mode toggle with class-based theming
- Accent color tokens for consistent styling

## Quick Start

```bash
npm install
npm run dev
```

Open `http://localhost:3000/docs/getting-started`.

## Content Structure

- Add docs under `src/content/docs/` as `.md` or `.mdx`.
- Nested routes are supported via folders, e.g. `src/content/docs/tutorials/tutorial.mdx` → `/docs/tutorials/tutorial`.

## Ordering and Navigation

- Order is defined in `src/lib/docsNav.ts` via `docsItems`.
- The sidebar and Prev/Next pager use this order (nested groups are flattened for paging).

## Theming and Styling

- Toggle theme in the navbar.
- Customize accent colors in `src/app/globals.css` via `--accent` and `--accent-soft`.
- Tailwind v4 utilities and Typography plugin are enabled.

## Search

- Client-side search reads from `public/search-index.json`.
- The build script regenerates the index: `npm run build`.
- Regenerate index only (without full build):

```bash
node scripts/generateSearch.mjs
```

- When to run:
  - After adding or editing `.md`/`.mdx` docs and you want search to reflect changes
  - In CI/CD, running `npm run build` is sufficient, it includes index generation

## Static Export

To export as a static site:

```bash
npm run build
npx next export
```

The static files will be in `out/`.
Search index is generated during `npm run build` and included in the export.

## Configuration

- Social links for the navbar are set in `src/components/site/Navbar.tsx` via `GITHUB_URL` and `LINKEDIN_URL` constants.

## Contributing

1. Fork the repo
2. Create a branch: `git checkout -b feature/your-feature`
3. Run lint: `npm run lint`
4. Commit and push: `git commit -m "feat: your feature" && git push`
5. Open a Pull Request

## License

Licensed under the MIT License. See `LICENSE` for details.
