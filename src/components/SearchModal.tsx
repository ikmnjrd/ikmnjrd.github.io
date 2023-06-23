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

export default function SearchPage({
  serverState,
}: SearchPageProps) {
  return (
    <div
      className="modal micromodal-slide"
      id="modal-1"
      aria-hidden="true"
    >
      <div
        className="modal__overlay"
        tabIndex={-1}
        data-custom-close
      >
        <div
          className="modal__container"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-1-title"
        >
          <header className="modal__header">
            <h2
              className="header-text md:text-3xl text-2xl font-serif decoration-dotted"
              id="modal-1-title"
            >
              Search
            </h2>
            <button
              className="modal__close"
              aria-label="Close modal"
              data-custom-close
            />
          </header>

          <div className="modal__content" id="modal-1-content">
            <InstantSearchSSRProvider {...serverState}>
              <InstantSearch
                searchClient={searchClient}
                indexName="blog"
              >
                <Configure
                  attributesToSnippet={[
                    'title:30',
                    'content:80',
                  ]}
                  attributesToHighlight={[
                    'title:30',
                    'content:120',
                  ]}
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
          </div>
        </div>
      </div>
    </div>
  )
}

export async function getStaticProps() {
  const serverState = await getServerState(<SearchPage />, {
    renderToString,
  })
  return {
    props: {
      serverState,
    },
  }
}
