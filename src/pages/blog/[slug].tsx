import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import MarkdownIt from 'markdown-it'
import markdownItAnchor from 'markdown-it-anchor'
import markdownItPrism from 'markdown-it-prism'
import Head from 'next/head'
import classNames from 'classnames'
import TitleHead from '../../components/TitleHead'
import OgpHead from '../../components/OgpHead'
import markdownStyles from '../../components/markdown/markdown-styles.module.css'
import { optimizeImages } from '../../utils/ImageOptimizer'
import 'prism-themes/themes/prism-nord.min.css'
import { Outline } from '../../components/Outline'
import Link from 'next/link'
import styles from './article.module.css'
import { getPostsDirs } from '../../utils/readPost'

export interface IBlog {
  frontmatter: {
    title: string
    date: string
    tag?: string[]
    cover_image?: string
    description?: string
  }
  slug: string
  innerHtml: string
  anchors: { text: string; link: string }[]
}

export default function PostPage({
  frontmatter: { title, date, cover_image, description, tag },
  slug,
  innerHtml,
  anchors,
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
          <meta name="description" content={description} />
        )}
      </Head>

      <article className={styles.article}>
        <div className={styles.header}>
          <h1 className={styles.title}>{title}</h1>

          <ul className={styles.tagList}>
            {tag &&
              tag.map((t) => (
                <li key={t} className={styles.tagItem}>
                  <Link
                    href={`/tag/${t}`}
                    className={styles.tagLink}
                  >
                    {t}
                  </Link>
                </li>
              ))}
          </ul>

          <div className={styles.date}>Posted on {date}</div>
        </div>

        {/* TODO: 記事内で使われているかどうか調査の後、削除 */}
        <img src={cover_image} alt="" />

        <Outline
          contents={anchors}
          style={{
            maxWidth: 'auto',
            order: 2,
            padding: '1rem 2rem',
          }}
          className={classNames(
            styles.gridElSticky,
            styles.dotBorder,
            styles.borderTop
          )}
        />

        <div
          dangerouslySetInnerHTML={{
            __html: innerHtml,
          }}
          className={classNames(
            markdownStyles['markdown'],
            styles.content,
            styles.dotBorder,
            styles.borderTop
          )}
        ></div>
      </article>
    </>
  )
}

export async function getStaticPaths() {
  const files = getPostsDirs()

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
    permalink: markdownItAnchor.permalink.ariaHidden({
      placement: 'before',
    }),
  })

  markdownIt.use(markdownItPrism, { defaultLanguage: 'sh' })

  const { data: frontmatter, content } = matter(markdownWithMeta)
  const innerHtml = markdownIt.render(content)

  const image_tags: string[] =
    innerHtml.match(/src="https:\/\/i\.gyazo.*?"/g) ?? []

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

  const ids = replaceHtml.match(/id=["'].+?["']/g)
  const anchors =
    ids?.map((id) => ({
      text: decodeURI(id.replace(/id=["'](.+)["']/, '$1')),
      link: id.replace(/id=["'](.+)["']/, '$1'),
    })) ?? []

  return {
    props: {
      frontmatter,
      slug,
      innerHtml: replaceHtml,
      anchors,
    },
  }
}
