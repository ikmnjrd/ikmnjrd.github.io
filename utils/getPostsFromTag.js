import getPostFilesData from './getPostFilesData'

export default async function getPostsFromTag(tag) {
  const files_data = await getPostFilesData();

  const posts_from_tag = files_data.filter(({frontmatter}) => {
    if (frontmatter.hasOwnProperty("tag")) {
      return frontmatter.tag.find((el) => el === tag)
    }

    return false
  })

  return posts_from_tag
}
