import http from 'node:http'
import fs from 'node:fs'
import path from 'node:path'

const MIME: Record<string, string> = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.mjs': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.xml': 'application/xml; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.webp': 'image/webp',
  '.avif': 'image/avif',
  '.ico': 'image/x-icon',
  '.webmanifest': 'application/manifest+json',
  '.txt': 'text/plain; charset=utf-8',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
}

const RELOAD_SNIPPET = `<script>
(function(){var s=new EventSource('/__reload');s.onmessage=function(e){if(e.data==='reload')location.reload()};})();
</script>`

export interface ServerHandle {
  port: number
  reload: () => void
  close: () => void
}

/**
 * Resolves a decoded URL pathname to a file inside `dir`, mirroring how a
 * static host serves pretty URLs (/, /about -> about/index.html). Guards
 * against path traversal.
 */
function resolveFile(
  dir: string,
  pathname: string
): string | null {
  const decoded = decodeURIComponent(pathname)
  const rel = decoded.replace(/^\/+/, '')
  const base = path.resolve(dir)
  const target = path.resolve(base, rel)
  if (target !== base && !target.startsWith(base + path.sep))
    return null

  const candidates: string[] = []
  if (pathname.endsWith('/')) {
    candidates.push(path.join(target, 'index.html'))
  } else {
    candidates.push(target)
    candidates.push(target + '.html')
    candidates.push(path.join(target, 'index.html'))
  }
  for (const c of candidates) {
    if (fs.existsSync(c) && fs.statSync(c).isFile()) return c
  }
  return null
}

export function startServer(opts: {
  dir: string
  port?: number
  liveReload?: boolean
}): ServerHandle {
  const { dir, liveReload = false } = opts
  const reloadClients = new Set<http.ServerResponse>()

  const server = http.createServer((req, res) => {
    const url = new URL(req.url ?? '/', 'http://localhost')
    const pathname = url.pathname

    if (liveReload && pathname === '/__reload') {
      res.writeHead(200, {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        Connection: 'keep-alive',
      })
      res.write('\n')
      reloadClients.add(res)
      req.on('close', () => reloadClients.delete(res))
      return
    }

    let file = resolveFile(dir, pathname)
    let status = 200
    if (!file) {
      status = 404
      const notFound = path.join(dir, '404.html')
      file = fs.existsSync(notFound) ? notFound : null
    }

    if (!file) {
      res.writeHead(404, { 'Content-Type': 'text/plain' })
      res.end('404 Not Found')
      return
    }

    const ext = path.extname(file).toLowerCase()
    const type = MIME[ext] ?? 'application/octet-stream'
    if (ext === '.html') {
      let html = fs.readFileSync(file, 'utf-8')
      if (liveReload) {
        html = html.includes('</body>')
          ? html.replace('</body>', `${RELOAD_SNIPPET}</body>`)
          : html + RELOAD_SNIPPET
      }
      res.writeHead(status, { 'Content-Type': type })
      res.end(html)
    } else {
      res.writeHead(status, { 'Content-Type': type })
      fs.createReadStream(file).pipe(res)
    }
  })

  const port = opts.port ?? 3000
  server.listen(port)

  return {
    port,
    reload: () => {
      for (const res of reloadClients)
        res.write('data: reload\n\n')
    },
    close: () => {
      for (const res of reloadClients) res.end()
      server.close()
    },
  }
}
