import getPostFilesData from '~/utils/getPostFilesData'
import { index } from '~/utils/algoriaClient'

export const sendAlgoliaIndex = async (): Promise<void> => {
  const blogData = await getPostFilesData()
  const blogSubset = blogData.map((blog) => {
    const { slug, frontmatter, content } = blog
    return {
      slug,
      content,
      ...frontmatter,
    }
  })

  await index.replaceAllObjects(blogSubset, {
    safe: true,
    autoGenerateObjectIDIfNotExist: true,
  })

  return
}
