import type { Hit as AlgoliaHit } from 'instantsearch.js/es/types'

import {
  Snippet,
  Highlight,
} from 'react-instantsearch-hooks-web'

import Link from 'next/link'

type HitProps = {
  hit: AlgoliaHit<{
    content: string
    title: string
    date: string
    tag: string[]
    slug: string
  }>
}

export function Hit({ hit }: HitProps) {
  return (
    <Link href={`/blog/${hit.slug}`} passHref legacyBehavior>
      {/* FIXME: devモードでもモーダルが閉じるようにする */}
      <a className="hover:cursor-pointer" data-custom-close>
        <h1>
          <Highlight attribute="title" hit={hit} />
        </h1>
        <Snippet hit={hit} attribute="content" />
        <div className="text-right">
          <Highlight attribute="slug" hit={hit} />
        </div>
      </a>
    </Link>
  )
}
