import { sortByPostMeta } from './sort'
import getPostFiles, {
  IFrontMatter,
} from './getPostFilesData'

export interface IPostMeta {
  slug: string
  frontmatter: IFrontMatter
}

export default async function getPostsMeta() {
  const files_data = await getPostFiles()

  // Get slug and frontmatter from posts
  const posts: IPostMeta[] = files_data.map(
    ({ slug, frontmatter }) => {
      return {
        slug,
        frontmatter,
      }
    }
  )

  return posts.sort(sortByPostMeta)
}
