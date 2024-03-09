import getPostFilesData from '~/utils/getPostFilesData'
import { index } from '~/utils/algoriaClient'

function bytes2(str: string) {
  return encodeURIComponent(str).replace(/%../g, 'x').length
}

export const sendAlgoliaIndex = async (): Promise<void> => {
  const blogData = await getPostFilesData()
  const blogSubset = blogData.map((blog) => {
    const { slug, frontmatter, content } = blog
    // 無料プランでは1つあたり10KBまでしかたいおうしてくれない
    // https://www.algolia.com/doc/guides/sending-and-managing-data/prepare-your-data/in-depth/index-and-records-size-and-usage-limitations/#record-size-limits
    const contentByte = bytes2(content)
    const slugByte = bytes2(slug)
    const fmByte = bytes2(JSON.stringify(frontmatter))

    const MAX_BYTE = 10000
    const sum = contentByte + slugByte + fmByte

    if (sum > MAX_BYTE) {
      const hoge = content.slice(0, sum - MAX_BYTE)
      return {
        slug,
        content: hoge,
        ...frontmatter,
      }
    }

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
