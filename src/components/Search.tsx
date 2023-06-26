import { type PropsWithChildren } from 'react'
import { renderToString } from 'react-dom/server'
import {
  InstantSearch,
  InstantSearchServerState,
  InstantSearchSSRProvider,
  Configure,
  Hits,
  Pagination,
  SearchBox,
} from 'react-instantsearch-hooks-web'
import { getServerState } from 'react-instantsearch-hooks-server'
import { searchClient } from '~/utils/algoriaClient'
import { Hit } from '~/components/Hit'

import 'instantsearch.css/themes/satellite.css'

type SearchPageProps = {
  serverState?: InstantSearchServerState
}

export default function Search({
  serverState,
}: PropsWithChildren<SearchPageProps>) {
  return (
    <InstantSearchSSRProvider {...serverState}>
      <InstantSearch
        searchClient={searchClient}
        indexName="blog"
      >
        <Configure
          attributesToSnippet={['title:30', 'content:80']}
          attributesToHighlight={['title:30', 'content:120']}
          snippetEllipsisText="…"
          hitsPerPage={4}
        />

        <SearchBox />
        <Hits hitComponent={Hit} />
        <div className="flex flex-wrap">
          <Pagination />
        </div>
      </InstantSearch>
    </InstantSearchSSRProvider>
  )
}

export async function getStaticProps() {
  const serverState = await getServerState(<Search />, {
    renderToString,
  })
  return {
    props: {
      serverState,
    },
  }
}
