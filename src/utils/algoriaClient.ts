import algoliasearchLite from 'algoliasearch/lite'
import algoliasearch from 'algoliasearch'

const appId = process.env.NEXT_PUBLIC_ALGOLIA_APP_ID ?? ''
const publicKey =
  process.env.NEXT_PUBLIC_ALGOLIA_SEARCH_API_KEY ?? ''
export const indexName =
  process.env.NEXT_PUBLIC_ALGOLIA_INDEX_NAME ?? ''
const secretKey = process.env.ALGOLIA_ADMIN_API_KEY ?? ''

// SSGでのみ使用
export const algoliaClient = algoliasearch(appId, secretKey)
export const index = algoliaClient.initIndex(indexName)

// クライアント側でのみ使用
export const searchClient = algoliasearchLite(appId, publicKey)
