import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

export interface IFrontMatter {
  // ===事実上必須=========
  title?: string
  description?: string
  date?: string // 2021-01-08
  tag?: string[]
  // ===未使用=========
  categories?: string // Next製にしてから使ってない
  layout?: string // Next製にしてから使ってない
  scheduled?: string // Next製にしてから使ってない
}

export default async function getPostFilesData() {
  // Get files from the posts dir
  const files = fs.readdirSync(
    path.join('_posts')
  )

  // Get slug and frontmatter from posts
  return files.map((filename) => {
    // Create slug
    const slug = filename.replace('.md', '')

    // Get frontmatter and content
    const markdownWithMeta = fs.readFileSync(
      path.join('_posts', filename),
      'utf-8'
    )

    const {
      data: frontmatter,
      content: content,
    }: {
      data: IFrontMatter
      content: string
    } = matter<string, {}>(markdownWithMeta, {})

    return {
      slug,
      frontmatter,
      content,
    }
  })
}
