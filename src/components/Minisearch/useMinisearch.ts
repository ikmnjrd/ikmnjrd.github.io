import swr, { Fetcher } from 'swr'
import { myFetch } from '../../utils/fetch'
import getPostFilesData from '../../utils/getPostFilesData'
import MiniSearch from 'minisearch'

type ISearchData = Awaited<ReturnType<typeof getPostFilesData>>

export const useSearchSwr = () => {
  const fetcher: Fetcher<ISearchData> = () =>
    myFetch<ISearchData>('/to-search/blog-contents.json')

  return swr('to-search-json', fetcher)
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
