function addPage(page) {
  const path = page
    .replace('pages', '')
    .replace('.js', '')
    .replace('.md', '')
    .replace('_posts', '/blog')
  const route = path === '/index' ? '' : path

  return `  <url>
    <loc>${`${process.env.WEBSITE_URL}${route}`}</loc>
    <changefreq>hourly</changefreq>
  </url>`
}

async function generateSitemap() {
  const writeFileSync = (await import('fs'))
    .writeFileSync
  const globby = (await import('globby')).globby

  // Ignore Next.js specific files (e.g., _app.js) and API routes.
  const pages = await globby([
    'pages/**/*{.js,.mdx}',
    '_posts/*.md',
    '!pages/**/"["*"]".js',
    '!pages/_*.js',
    '!pages/api',
  ])
  const sitemap = `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages.map(addPage).join('\n')}
</urlset>`

  writeFileSync('public/sitemap.xml', sitemap)
  console.info('generated sitemap.xml!')
}

generateSitemap()
