import getPostFilesData, {
  type IFrontMatter,
} from './getPostFilesData'

export interface ITagInfo {
  wholeTags: {
    tag: string
    slug: string
  }[]
  countedTags: { [key: string]: number }
  filesData: {
    slug: string
    frontmatter: IFrontMatter
    content: string
  }[]
}

export default async function getTag(): Promise<ITagInfo> {
  const filesData = await getPostFilesData()
  const wholeTags: {
    tag: string
    slug: string
  }[] = []

  filesData.forEach(({ frontmatter, slug }) => {
    if (frontmatter.tag) {
      for (let tag of frontmatter.tag) {
        wholeTags.push({ tag, slug })
      }
    }
  })

  const countedTags = countTag(wholeTags)

  return { wholeTags, countedTags, filesData }
}

export function countTag(
  meta: { tag: string; slug: string }[]
): { [key: string]: number } {
  return meta
    .map(({ tag }) => tag)
    .reduce((acc, key) => {
      return {
        ...acc,
        [key]: (acc[key] || 0) + 1,
      }
    }, {} as { [key: string]: number })
}
