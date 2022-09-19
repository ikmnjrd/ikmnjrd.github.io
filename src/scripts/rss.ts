import fs from 'fs'
import { Feed } from 'feed'
import getPostFilesData from '~/utils/getPostFilesData'

export const generateRssFeed = async () => {
  const posts = await getPostFilesData()
  const siteURL = process.env.WEBSITE_URL
  const date = new Date()
  const author = {
    name: 'ike',
    // email: 'sample@example.com',
    link: 'https://twitter.com/ikmnjrd',
  }

  if (!siteURL) {
    return
  }

  const feed = new Feed({
    title: 'ikmnjrd.github.io',
    description: 'ikmnjrのブログ',
    id: siteURL,
    link: siteURL,
    image: `${siteURL}/logo.png`,
    favicon: `${siteURL}/favicon.ico`,
    copyright: `All rights reserved ${date.getFullYear()}, ike(ikmnjrd)`,
    updated: date,
    generator: 'Feed for Node.js', //これ何？
    feedLinks: {
      rss2: `${siteURL}/rss/feed.xml`,
      json: `${siteURL}/rss/feed.json`,
      atom: `${siteURL}/rss/atom.xml`,
    },
    author,
  })
  posts.forEach((post) => {
    const url = `${siteURL}/blog/${post.slug}`
    feed.addItem({
      title:
        post.frontmatter.title ?? '無名の記事',
      id: url,
      link: url,
      description: post.frontmatter.description,
      content: post.content,
      author: [author],
      contributor: [author],
      date: new Date(post.frontmatter.date ?? ''),
    })
  })
  fs.mkdirSync('./public/rss', {
    recursive: true,
  })
  fs.writeFileSync(
    './public/rss/feed.xml',
    feed.rss2()
  )
  fs.writeFileSync(
    './public/rss/atom.xml',
    feed.atom1()
  )
  fs.writeFileSync(
    './public/rss/feed.json',
    feed.json1()
  )
}
