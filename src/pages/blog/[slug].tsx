import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import MarkdownIt from 'markdown-it'
import markdownItAnchor from 'markdown-it-anchor'
import markdownItPrism from 'markdown-it-prism'
import Head from 'next/head'
import TitleHead from '~/components/TitleHead'
import OgpHead from '~/components/OgpHead'
import markdownStyles from '~/components/markdown/markdown-styles.module.css'
import { optimizeImages } from '~/utils/ImageOptimizer'
import 'prism-themes/themes/prism-nord.min.css'

export interface IBlog {
  frontmatter: {
    title: string
    date: string
    cover_image?: string
    description?: string
  }
  slug: string
  innerHtml: string
}

export default function PostPage({
  frontmatter: {
    title,
    date,
    cover_image,
    description,
  },
  slug,
  innerHtml,
}: IBlog) {
  return (
    <>
      <TitleHead title={title} />
      <OgpHead
        title={title}
        type="article"
        url={'blog/' + slug}
        image={'images/posts/img1.jpg'}
      />
      <Head>
        {description && (
          <meta
            name="description"
            content={description}
          />
        )}
      </Head>

      <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold tracking-tighter leading-tight md:leading-none mb-12 text-center md:text-left">
        {title}
      </h1>
      <div className="text-right">
        Posted on {date}
      </div>
      <img src={cover_image} alt="" />

      <div
        dangerouslySetInnerHTML={{
          __html: innerHtml,
        }}
        className={markdownStyles['markdown']}
      ></div>
    </>
  )
}

export async function getStaticPaths() {
  const files = fs.readdirSync(
    path.join('_posts')
  )

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

export async function getStaticProps({
  params: { slug },
}: {
  params: { slug: string }
}) {
  const markdownIt = new MarkdownIt({
    html: true,
  })

  const markdownWithMeta = fs.readFileSync(
    path.join('_posts', slug + '.md'),
    'utf-8'
  )

  markdownIt.use(markdownItAnchor, {
    permalink:
      markdownItAnchor.permalink.ariaHidden({
        placement: 'before',
      }),
  })

  markdownIt.use(markdownItPrism, {})

  const { data: frontmatter, content } = matter(
    markdownWithMeta
  )
  const innerHtml = markdownIt.render(content)

  const image_tags: string[] =
    innerHtml.match(
      /src="https:\/\/i\.gyazo.*?"/g
    ) ?? []

  const images_path = await optimizeImages({
    images: image_tags,
    name: slug,
  })

  let replaceHtml = innerHtml

  for (const image_path of images_path) {
    replaceHtml = replaceHtml.replace(
      /src="https:\/\/i\.gyazo.*?"/,
      `src="/${image_path}"`
    )
  }

  return {
    props: {
      frontmatter,
      slug,
      innerHtml: replaceHtml,
    },
  }
}
