// Local replacement for the `next/app` types used by src/pages/_app.tsx,
// which is reused as the application shell by the custom Preact build.
import type { ComponentType } from 'preact'

export type AppProps<P = Record<string, unknown>> = {
  Component: ComponentType<P>
  pageProps: P
  router?: unknown
}
