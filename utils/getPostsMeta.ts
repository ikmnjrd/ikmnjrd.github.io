import { sortByDate } from './index'
import getPostFiles from './getPostFilesData'


export default async function getPostsMeta() {
  const files_data = await getPostFiles();

  // Get slug and frontmatter from posts
  const posts = files_data.map(({slug, frontmatter}) => {
    return {
      slug,
      frontmatter,
    }
  })

  return posts.sort(sortByDate)
}
