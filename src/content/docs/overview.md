---
title: Overview
description: High-level overview of the DocuNext platform
---

# Overview

DocuNext is a documentation platform built on Next.js.

## Architecture

- Docs route: `src/app/docs/[...slug]/page.tsx`
- Content loader: `src/lib/mdx.ts` compiles MDX and extracts headings
- Static params: generated from files in `src/content/docs/`

## Features

- Markdown/MDX with GFM
- Sidebar + mobile drawer
- Table of contents summary
- Client-side search (FlexSearch)
- Prev/Next navigation
- Dark mode toggle and accent colors

## Content

- Place `.md` or `.mdx` files under `src/content/docs/`
- Order and navigation come from `docsItems` in `src/components/site/Sidebar.tsx`

## Styling

- `src/app/globals.css` defines `--accent` tokens and prose styles
- Tailwind v4 utilities are used throughout
