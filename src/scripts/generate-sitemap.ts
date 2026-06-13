import fs from 'node:fs'
import path from 'node:path'

/**
 * Builds sitemap.xml from the actually-generated route URL paths (not a glob of
 * src/pages), so every post and tag page is included exactly once.
 */
export function generateSitemap(
  urlPaths: string[],
  siteURL: string,
  outFile = './public/sitemap.xml'
) {
  const body = urlPaths
    .map((p) => {
      const route = p === '/' ? '' : p
      return `  <url>
    <loc>${siteURL}${route}</loc>
    <changefreq>hourly</changefreq>
  </url>`
    })
    .join('\n')

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${body}
</urlset>
`
  fs.mkdirSync(path.dirname(outFile), { recursive: true })
  fs.writeFileSync(outFile, sitemap)
}
