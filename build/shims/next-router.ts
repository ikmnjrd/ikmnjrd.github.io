// Local replacement for `next/router` (only the surface used by the blog).
//
// `query` starts empty on the first (hydration) render — matching the
// server-rendered output — then is populated from the URL after mount, so the
// `?p=` pagination updates without a hydration mismatch.
import { useState, useEffect } from 'preact/hooks'

type Query = Record<string, string>

export function useRouter() {
  const [query, setQuery] = useState<Query>({})

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const next: Query = {}
    params.forEach((value, key) => {
      next[key] = value
    })
    setQuery(next)
  }, [])

  return {
    query,
    pathname:
      typeof window === 'undefined'
        ? ''
        : window.location.pathname,
    asPath:
      typeof window === 'undefined'
        ? ''
        : window.location.pathname + window.location.search,
    push: (url: string) => {
      if (typeof window !== 'undefined')
        window.location.href = url
    },
    replace: (url: string) => {
      if (typeof window !== 'undefined')
        window.location.replace(url)
    },
    prefetch: () => Promise.resolve(),
  }
}
