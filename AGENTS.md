<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

<!-- BEGIN:gh-pages-export -->
# GitHub Pages: `output: 'export'` and legacy build type

- `next.config.ts` must set `output: 'export'`, `basePath: '/<repo-name>'`, `images.unoptimized: true`, `trailingSlash: true`
- The peaceiris action pushes to `gh-pages` branch; GitHub Pages must use **legacy** build type (NOT `workflow`) for this to work
- `permissions: contents: write` is required at the job level for the GITHUB_TOKEN
- `public/.nojekyll` is required to prevent Jekyll processing
- Changing from `workflow` to `legacy` build type via `gh api repos/<user>/<repo>/pages --method PUT --input '{"build_type":"legacy","source":{"branch":"gh-pages","path":"/"}}'` is needed if workflow was configured first
<!-- END:gh-pages-export -->
