import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import MarkdownIt from 'markdown-it'
import markdownItPrism from 'markdown-it-prism'
import Link from 'next/link'
import Head from 'next/head'

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
      <Link href='/'>
        <a className='btn btn-back'>Go Back</a>
      </Link>
      <div className='card card-page'>
        <h1 className='post-title'>{title}</h1>
        <div className='post-date'>Posted on {date}</div>
        <img src={cover_image} alt='' />
        <div className='post-body'>
          <div dangerouslySetInnerHTML={{ __html: innerHtml }}></div>
        </div>
      </div>
    </>
  )
}

export async function getStaticPaths() {
  const files = fs.readdirSync(path.join('posts'))

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
    path.join('posts', slug + '.md'),
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
