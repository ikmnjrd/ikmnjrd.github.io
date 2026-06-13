// Shared application shell + page registry used by BOTH the server renderer
// and the client hydration entry, so the rendered tree is identical.
import MyApp from '../src/pages/_app'
import Index from '../src/pages/index'
import About from '../src/pages/about'
import Tags from '../src/pages/tags'
import TagPage from '../src/pages/tag/[tag]'
import BlogPage from '../src/pages/blog/[slug]'
import NotFound from '../src/pages/404'

export type RouteKind =
  | 'index'
  | 'about'
  | 'tags'
  | 'tag'
  | 'blog'
  | '404'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const PAGES: Record<RouteKind, any> = {
  index: Index,
  about: About,
  tags: Tags,
  tag: TagPage,
  blog: BlogPage,
  '404': NotFound,
}

export function App({
  route,
  props,
}: {
  route: RouteKind
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  props: any
}) {
  const Page = PAGES[route] ?? PAGES['404']
  return <MyApp Component={Page} pageProps={props} />
}
