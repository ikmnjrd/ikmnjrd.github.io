import path from 'node:path'
import fs from 'node:fs'
import { startServer } from './static-server'

// Serves the already-built docs/ directory (npm start).
const DOCS = path.resolve(process.cwd(), 'docs')
const port = Number(process.env.PORT ?? 3000)

if (!fs.existsSync(path.join(DOCS, 'index.html'))) {
  console.error(
    'docs/ is not built yet. Run `npm run build` first.'
  )
  process.exit(1)
}

startServer({ dir: DOCS, port })
console.log(`Serving docs/ at http://localhost:${port}`)
