import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

export default async function getPostFilesData() {
  // Get files from the posts dir
  const files = fs.readdirSync(
    path.join('_posts')
  )

  // Get slug and frontmatter from posts
  const posts_data = files.map((filename) => {
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
    } = matter(markdownWithMeta)

    return {
      slug,
      frontmatter,
      content,
    }
  })

  return posts_data
}
