// URL + filesystem path safety for dynamic route params (tag, slug).
//
// Static hosts (GitHub Pages) percent-decode the request URL before resolving
// it against the filesystem, so on-disk paths use the *decoded* name. We keep
// legitimate '/' as nested directories (e.g. the "CI/CD" tag) but strip any
// '.'/'..'/empty segment so a param can never traverse outside the output dir.
import path from 'node:path'

/** A single percent-encoded URL path segment, with '/' preserved as a separator. */
export function urlPath(name: string): string {
  return name
    .split('/')
    .filter((seg) => seg && seg !== '.' && seg !== '..')
    .map((seg) => encodeURIComponent(seg))
    .join('/')
}

/** A filesystem-safe (decoded) relative path, traversal-stripped. */
export function filePath(name: string): string {
  return name
    .split('/')
    .map((seg) => seg.trim())
    .filter((seg) => seg && seg !== '.' && seg !== '..')
    .join('/')
}

/**
 * Resolves `rel` under `baseDir` and throws if it escapes — a final guard
 * against traversal regardless of the param contents.
 */
export function resolveUnder(
  baseDir: string,
  rel: string
): string {
  const base = path.resolve(baseDir)
  const out = path.resolve(base, rel)
  if (out !== base && !out.startsWith(base + path.sep)) {
    throw new Error(
      `Unsafe output path escapes ${baseDir}: ${rel}`
    )
  }
  return out
}
