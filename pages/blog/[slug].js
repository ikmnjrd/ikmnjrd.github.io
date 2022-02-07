import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import MarkdownIt from 'markdown-it'
import markdownItPrism from 'markdown-it-prism'
import Link from 'next/link'
import Head from 'next/head'
import markdownStyles from '@components/markdown/markdown-styles.module.css'

export default function PostPage({
  frontmatter: { title, date, cover_image },
  slug,
  innerHtml,
}) {
  return (
    <>
      <Head>
        <link href="https://cdnjs.cloudflare.com/ajax/libs/prism/1.26.0/themes/prism-okaidia.min.css" rel="stylesheet"/>
      </Head>

      <div className='max-w-2xl mx-auto'>
        <h1 className='text-2xl md:text-3xl lg:text-4xl font-bold tracking-tighter leading-tight md:leading-none mb-12 text-center md:text-left'>{title}</h1>
        <div className='text-right'>Posted on {date}</div>
        <img src={cover_image} alt='' />

        <div dangerouslySetInnerHTML={{ __html: innerHtml }} className={markdownStyles['markdown']}></div>
      </div>
    </>
  )
}

export async function getStaticPaths() {
  const files = fs.readdirSync(path.join('_posts'))

  const paths = files.map((filename) => ({
    params: {
      slug: filename.replace('.md', ''),
    },
  }))

  return {
    paths,
    fallback: false,
  }
}

export async function getStaticProps({ params: { slug } }) {
  const markdownIt = new MarkdownIt()
  const markdownWithMeta = fs.readFileSync(
    path.join('_posts', slug + '.md'),
    'utf-8'
  )

  markdownIt.use(markdownItPrism, {})
  const { data: frontmatter, content } = matter(markdownWithMeta)
  const innerHtml = markdownIt.render(content)

  return {
    props: {
      frontmatter,
      slug,
      innerHtml,
    },
  }
}
