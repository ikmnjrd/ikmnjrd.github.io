import fs from 'node:fs'

// Minimal .env loader (no dotenv dependency). Only sets keys that are not
// already present in process.env, so real shell / CI values win.
export function loadEnv(file = '.env'): void {
  if (!fs.existsSync(file)) return
  const text = fs.readFileSync(file, 'utf-8')
  for (const rawLine of text.split('\n')) {
    const line = rawLine.trim()
    if (!line || line.startsWith('#')) continue
    const eq = line.indexOf('=')
    if (eq === -1) continue
    const key = line.slice(0, eq).trim()
    let value = line.slice(eq + 1).trim()
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1)
    }
    if (process.env[key] === undefined) process.env[key] = value
  }
}
