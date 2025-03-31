# Tim Russell - Personal Blog & Portfolio

A modern, minimalist personal blog and portfolio site built with Next.js and optimized for static site generation.

## Features

- Static site generation for optimal performance
- Markdown-based blog posts
- Clean, modern design
- Responsive layout
- SEO optimized
- Sitemap generation

## Tech Stack

- Next.js
- TypeScript
- Markdown (processed with gray-matter, remark, and rehype)
- Next-sitemap for sitemap generation

## Getting Started

### Prerequisites

- Node.js (>=18.0.0)
- pnpm

### Installation

Clone the repository and install dependencies:

```bash
git clone https://github.com/timdpr/timdpr.github.io.git
cd timdpr.github.io
pnpm install
```

### Development

Run the development server:

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the site.

### Production Build

Generate a static production build:

```bash
pnpm build
```

This will:
1. Build the Next.js app
2. Export static files to the `/site` directory
3. Generate a sitemap

### Adding Blog Posts

To add a new blog post, create a markdown file in the `content/things` directory with the following format:

```markdown
---
title: 'Your Post Title'
date: 'YYYY-MM-DD'
excerpt: 'A brief summary of your post'
tags: ['tag1', 'tag2']
featured: true/false
---

Your content here...
```

## License

MIT
