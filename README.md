# Tim Russell - Personal Site

My personal site - built with Next.js, but entirely static.

### Tech Stack

- Next.js
- TypeScript
- Markdown (processed with gray-matter, remark, and rehype)
- Next-sitemap for sitemap generation

## Install & Run:

- Node.js (>=18.0.0)
- pnpm
- Clone the repository and `pnpm install`

#### Development

Run the development server with `pnpm dev`

#### Production

Generate a static production build with `pnpm build`. This will:
1. Build the Next.js app
2. Export static files to the `/docs` directory
3. Generate a sitemap
4. Copy `CNAME` and `.nojekyll` to `/docs`

## Adding Posts

To add a new blog post, create a markdown file in the `content/things` directory with the following format:

```
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
