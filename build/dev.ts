import path from 'node:path'
import fs from 'node:fs'
import { build } from './build'
import { startServer } from './static-server'

// Local development: build docs/, serve it with live-reload, and rebuild on
// source changes. (Static assets in public/ are not watched to avoid a
// rebuild loop, since the build writes generated files back into public/.)
process.env.NODE_ENV = 'development'

const ROOT = process.cwd()
const DOCS = path.resolve(ROOT, 'docs')
const port = Number(process.env.PORT ?? 3000)
const WATCH_DIRS = ['src', '_posts', 'build'].map((d) =>
  path.resolve(ROOT, d)
)

let building = false
let queued = false

async function runBuild(handle?: { reload: () => void }) {
  if (building) {
    queued = true
    return
  }
  building = true
  const start = Date.now()
  try {
    const pages = await build()
    console.log(
      `Built ${pages.length} pages in ${Date.now() - start}ms`
    )
    handle?.reload()
  } catch (err) {
    console.error('Build failed:', err)
  } finally {
    building = false
    if (queued) {
      queued = false
      void runBuild(handle)
    }
  }
}

async function main() {
  await runBuild()
  const handle = startServer({
    dir: DOCS,
    port,
    liveReload: true,
  })
  console.log(`Dev server on http://localhost:${port}`)

  let timer: NodeJS.Timeout | null = null
  const onChange = () => {
    if (timer) clearTimeout(timer)
    timer = setTimeout(() => void runBuild(handle), 200)
  }

  for (const dir of WATCH_DIRS) {
    if (!fs.existsSync(dir)) continue
    try {
      fs.watch(dir, { recursive: true }, onChange)
    } catch {
      // Recursive watch unsupported: fall back to a shallow watch.
      fs.watch(dir, onChange)
    }
  }
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
