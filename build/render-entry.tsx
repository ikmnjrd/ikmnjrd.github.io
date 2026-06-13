// Server-side renderer (bundled by esbuild for Node, then imported by build.ts).
// Enumerates every route, runs the pages' getStaticProps/getStaticPaths to get
// props, and renders each to static HTML with preact-render-to-string.
import { Fragment } from 'preact'
import { renderToString } from 'preact-render-to-string'
import { App, type RouteKind } from './app'
import { drainHead } from './shims/next-head'
import { urlPath as encodeUrlPath, filePath } from './segment'

import * as indexMod from '../src/pages/index'
import * as tagsMod from '../src/pages/tags'
import * as tagMod from '../src/pages/tag/[tag]'
import * as blogMod from '../src/pages/blog/[slug]'

export interface RenderedPage {
  route: RouteKind
  /** Pretty URL path, e.g. '/', '/about', '/tag/foo', '/blog/slug'. */
  urlPath: string
  /** Output file relative to docs/, e.g. 'index.html', 'about/index.html'. */
  outFile: string
  headHtml: string
  bodyHtml: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  props: any
  /** Whether this route belongs in sitemap.xml. */
  inSitemap: boolean
}

function renderOne(
  route: RouteKind,
  urlPath: string,
  outFile: string,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  props: any,
  inSitemap: boolean
): RenderedPage {
  const bodyHtml = renderToString(
    <App route={route} props={props} />
  )
  // Head children were pushed into the sink during the render above.
  const headHtml = renderToString(
    <Fragment>{drainHead()}</Fragment>
  )
  return {
    route,
    urlPath,
    outFile,
    headHtml,
    bodyHtml,
    props,
    inSitemap,
  }
}

export async function collectPages(): Promise<RenderedPage[]> {
  const pages: RenderedPage[] = []

  // Static routes
  const indexProps = (await indexMod.getStaticProps()).props
  pages.push(
    renderOne('index', '/', 'index.html', indexProps, true)
  )

  pages.push(
    renderOne('about', '/about', 'about/index.html', {}, true)
  )

  const tagsProps = (await tagsMod.getStaticProps()).props
  pages.push(
    renderOne(
      'tags',
      '/tags',
      'tags/index.html',
      tagsProps,
      true
    )
  )

  pages.push(renderOne('404', '/404', '404.html', {}, false))

  // Dynamic: /tag/{tag}
  const tagPaths = (await tagMod.getStaticPaths()).paths
  for (const { params } of tagPaths) {
    const tag = params.tag
    const props = (
      await tagMod.getStaticProps({ params: { tag } })
    ).props
    pages.push(
      renderOne(
        'tag',
        `/tag/${encodeUrlPath(tag)}`,
        `tag/${filePath(tag)}/index.html`,
        props,
        true
      )
    )
  }

  // Dynamic: /blog/{slug}
  const blogPaths = blogMod.getStaticPaths
    ? (await blogMod.getStaticPaths()).paths
    : []
  for (const { params } of blogPaths) {
    const slug = params.slug
    const props = (
      await blogMod.getStaticProps({ params: { slug } })
    ).props
    pages.push(
      renderOne(
        'blog',
        `/blog/${encodeUrlPath(slug)}`,
        `blog/${filePath(slug)}/index.html`,
        props,
        true
      )
    )
  }

  return pages
}
