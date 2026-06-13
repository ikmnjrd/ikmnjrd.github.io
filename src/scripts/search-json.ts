import fs from 'fs'
import getPostFilesData from '../utils/getPostFilesData'

export const generateJsonForSearch = async (
  outDir = './public/to-search'
) => {
  const posts = await getPostFilesData()
  const postsWithId = posts.map((post, index) => ({
    ...post,
    id: index,
  }))

  fs.mkdirSync(outDir, { recursive: true })
  fs.writeFileSync(
    `${outDir}/blog-contents.json`,
    JSON.stringify(postsWithId)
  )

  console.log('json for search generated')
}
