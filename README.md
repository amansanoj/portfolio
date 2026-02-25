# Portfolio

A clean Astro-powered portfolio site with projects, posts and a brief personal background.

![Portfolio OpenGraph preview showing site title and background pattern](/public/og-home.png)

This repository contains the source code for my personal portfolio, built with [Astro](https://astro.build) and deployed to Cloudflare Workers.

The **code is open source and may be reused**, but the written content, images, and other assets are specific to this portfolio and should not be copied or published elsewhere.

## Features

- Built with Astro and TypeScript
- Markdown and MDX support for blog posts and project pages
- Performance tuned (aiming for perfect Lighthouse scores)
- SEO-friendly setup with OpenGraph tags and a sitemap
- Minimal styling applied to keep presentation clean
- RSS feed available for the blog

## Project Structure

- `src/pages/` – routes and pages (Astro files)
- `src/layouts/` – shared layouts for blog posts and projects
- `src/components/` – reusable UI components
- `src/content/blog/` & `src/content/projects/` – Markdown/MDX content
- `public/` – static assets (images, icons)

Astro automatically maps files in `src/pages/` to routes. Collections are defined in `content.config.ts` and accessed with `getCollection()`.

## Development

```bash
bun install      # install dependencies
bun run dev      # start local dev server
bun run build    # build production site to ./dist
bun run preview  # preview the build locally
```

You can also run `bun run astro -- --help` for Astro CLI commands.

## Credits

This repository was originally created from the [Cloudflare Astro blog starter template](https://workers.new/templates/astro-blog-starter-template) and has since been adapted for this site. The contents are specific to this portfolio.