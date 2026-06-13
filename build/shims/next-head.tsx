// Local replacement for `next/head`.
//
// On the server (during preact-render-to-string) every <Head> child is pushed
// into a module-level sink and the component itself renders nothing into the
// body. The build drains the sink after each page render and emits the
// collected nodes into the document <head>. On the client <Head> is a no-op:
// the head is already present in the statically generated HTML.
import { toChildArray, type ComponentChildren } from 'preact'

let sink: ComponentChildren[] = []

/** Returns and clears the head nodes collected during the last render. */
export function drainHead(): ComponentChildren[] {
  const drained = sink
  sink = []
  return drained
}

export default function Head({
  children,
}: {
  children?: ComponentChildren
}) {
  if (typeof window === 'undefined') {
    for (const child of toChildArray(children)) {
      sink.push(child)
    }
  }
  return null
}
