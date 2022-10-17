import getPostFilesData from './getPostFilesData'

export default async function getPostsFromTag(tag: string) {
  const filesData = await getPostFilesData()

  return filesData.filter(({ frontmatter }) => {
    if (frontmatter['tag']) {
      return frontmatter.tag.find((el) => el === tag)
    }

    return false
  })
}
