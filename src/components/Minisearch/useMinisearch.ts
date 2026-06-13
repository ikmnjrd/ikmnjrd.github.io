import { useState, useEffect } from 'react'
import { myFetch } from '../../utils/fetch'
import type getPostFilesData from '../../utils/getPostFilesData'
import MiniSearch from 'minisearch'

type ISearchData = Awaited<ReturnType<typeof getPostFilesData>>

// Lightweight client fetch hook (formerly backed by SWR). Keeps the original
// `useSearchSwr` name/return shape so the consumer is unchanged.
export const useSearchSwr = () => {
  const [data, setData] = useState<ISearchData | undefined>(
    undefined
  )

  useEffect(() => {
    let active = true
    myFetch<ISearchData>('/to-search/blog-contents.json')
      .then((d) => {
        if (active) setData(d)
      })
      .catch(() => {
        /* search index unavailable */
      })
    return () => {
      active = false
    }
  }, [])

  return { data }
}

const segmenter = new Intl.Segmenter('ja-jp', {
  granularity: 'word',
})

export const miniSearch = new MiniSearch({
  fields: ['title', 'content'], // fields to index for full-text search
  storeFields: ['title', 'content', 'slug'], // fields to return with search results
  processTerm: (term) => {
    if (!segmenter) return term
    const tokens = []
    for (const seg of segmenter.segment(term)) {
      tokens.push(seg.segment.toLowerCase())
    }
    return tokens
  },
})
