function addPage(pagePath: string) {
  const path = pagePath
    .replace('pages', '')
    .replace('.js', '')
    .replace('.tsx', '')
    .replace('.md', '')
    .replace('src/', '')
    .replace('_posts', '/blog')
  const route = path === '/index' ? '' : path

  return `  <url>
    <loc>${`${process.env.WEBSITE_URL}${route}`}</loc>
    <changefreq>hourly</changefreq>
  </url>`
}

export async function generateSitemap() {
  const writeFileSync = (await import('fs')).writeFileSync
  const globby = (await import('globby')).globby

  // Ignore Next.js specific files (e.g., _app.js) and API routes.
  const pages = await globby([
    'src/pages/**/*.tsx',
    '_posts/*.md',
    '!src/pages/**/"["*"]".tsx',
    '!src/pages/_*.tsx',
    '!src/pages/api',
  ])
  console.log(pages)

  const sitemap = `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages.map(addPage).join('\n')}
</urlset>`

  writeFileSync('public/sitemap.xml', sitemap)
  console.info('generated sitemap.xml!')
}

generateSitemap()
