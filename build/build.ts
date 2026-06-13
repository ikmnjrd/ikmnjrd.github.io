import fs from 'node:fs'
import path from 'node:path'
import { pathToFileURL } from 'node:url'
import { loadEnv } from './env'
import { buildClient, buildServer } from './esbuild-config'
import { renderDocument } from './document'
import { resolveUnder } from './segment'
import type { RenderedPage } from './render-entry'
import { generateRssFeed } from '../src/scripts/rss'
import { generateJsonForSearch } from '../src/scripts/search-json'
import { generateSitemap } from '../src/scripts/generate-sitemap'

const ROOT = process.cwd()
const DOCS = path.resolve(ROOT, 'docs')
const SSR_OUT = path.resolve(ROOT, 'tmp/ssr')
const PUBLIC = path.resolve(ROOT, 'public')

function copyDir(src: string, dest: string): void {
  if (!fs.existsSync(src)) return
  fs.mkdirSync(dest, { recursive: true })
  for (const entry of fs.readdirSync(src, {
    withFileTypes: true,
  })) {
    const s = path.join(src, entry.name)
    const d = path.join(dest, entry.name)
    if (entry.isDirectory()) copyDir(s, d)
    else fs.copyFileSync(s, d)
  }
}

export async function build(): Promise<RenderedPage[]> {
  loadEnv()
  if (!process.env.NODE_ENV) process.env.NODE_ENV = 'production'
  const siteURL =
    process.env.WEBSITE_URL || 'https://ikmnjrd.github.io'

  // Clean output
  fs.rmSync(DOCS, { recursive: true, force: true })
  fs.mkdirSync(DOCS, { recursive: true })

  // 1. Client bundle (hashed JS + CSS) into docs/assets
  const assets = await buildClient(DOCS)

  // 2. Server renderer bundle, then render every route. (Blog getStaticProps
  //    may write optimized images into public/ here.)
  fs.rmSync(SSR_OUT, { recursive: true, force: true })
  const serverFile = await buildServer(SSR_OUT)
  const mod = await import(pathToFileURL(serverFile).href)
  const pages: RenderedPage[] = await mod.collectPages()

  // 3. Write each page as a pretty-URL document
  for (const page of pages) {
    const outPath = resolveUnder(DOCS, page.outFile)
    fs.mkdirSync(path.dirname(outPath), { recursive: true })
    fs.writeFileSync(outPath, renderDocument(page, assets))
  }

  // 4. Auxiliary files generated from real data / real routes
  await generateRssFeed(siteURL, path.join(PUBLIC, 'rss'))
  await generateJsonForSearch(path.join(PUBLIC, 'to-search'))
  generateSitemap(
    pages.filter((p) => p.inSitemap).map((p) => p.urlPath),
    siteURL,
    path.join(PUBLIC, 'sitemap.xml')
  )

  // 5. Copy public/ (static assets, optimized images, rss, search, sitemap)
  copyDir(PUBLIC, DOCS)

  // 6. GitHub Pages: disable Jekyll processing
  fs.writeFileSync(path.join(DOCS, '.nojekyll'), '')

  return pages
}

const isMain =
  process.argv[1] &&
  import.meta.url === pathToFileURL(process.argv[1]).href

if (isMain) {
  build()
    .then((pages) => {
      const counts = pages.reduce<Record<string, number>>(
        (acc, p) => {
          acc[p.route] = (acc[p.route] ?? 0) + 1
          return acc
        },
        {}
      )
      console.log(
        `Built ${pages.length} pages -> docs/`,
        JSON.stringify(counts)
      )
    })
    .catch((err) => {
      console.error(err)
      process.exit(1)
    })
}
