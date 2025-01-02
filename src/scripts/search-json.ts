import fs from 'fs'
import getPostFilesData from '~/utils/getPostFilesData'

export const generateJsonForSearch = async () => {
  const posts = await getPostFilesData()
  const postsWithId = posts.map((post, index) => ({
    ...post,
    id: index,
  }))

  fs.writeFileSync(
    './public/to-search/blog-contents.json',
    JSON.stringify(postsWithId)
  )

  console.log('json for search generated')
}

generateJsonForSearch()
