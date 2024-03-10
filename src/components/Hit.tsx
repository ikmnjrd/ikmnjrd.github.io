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
      <a className="hover:cursor-pointer" data-target-close>
        <h1>
          <Highlight
            attribute="title"
            hit={hit}
            data-target-close
          />
        </h1>
        <Snippet
          hit={hit}
          attribute="content"
          data-target-close
        />
        <div className="text-right" data-target-close>
          <Highlight
            attribute="slug"
            hit={hit}
            data-target-close
          />
        </div>
      </a>
    </Link>
  )
}
