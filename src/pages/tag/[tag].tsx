import Link from 'next/link'
import getPostsFromTag from '../../utils/getPostsFromTag'
import getTags from '../../utils/getTags'
import { IFrontMatter } from '../../utils/getPostFilesData'
import TitleHead from '../../components/TitleHead'
import { GetStaticProps, GetStaticPaths } from 'next'
import { ParsedUrlQuery } from 'node:querystring'
import styles from '../base.module.css'

interface Props {
  tag: string
  posts: {
    slug: string
    frontmatter: IFrontMatter
  }[]
}
interface Params extends ParsedUrlQuery {
  tag: string
}

export default function TagLinkPage({ tag, posts }: Props) {
  return (
    <>
      <TitleHead title={`${tag}の記事`} />

      <article className={styles.main}>
        <h1 className={styles.pageTitle}>{tag}の投稿記事一覧</h1>
        <div>
          {posts.map((post) => (
            <li key={post.slug}>
              <Link href={`/blog/${post.slug}`} legacyBehavior>
                <a className={styles.link}>
                  {post.frontmatter.title}
                </a>
              </Link>
            </li>
          ))}
        </div>
      </article>
    </>
  )
}

export const getStaticPaths: GetStaticPaths<
  Params
> = async () => {
  const { countedTags } = await getTags()

  const paths = Object.entries(countedTags).map((tag) => {
    return { params: { tag: tag[0] } }
  })

  return {
    paths,
    fallback: false,
  }
}

export const getStaticProps: GetStaticProps<
  Props,
  Params
> = async ({ params }) => {
  const posts = await getPostsFromTag(params!.tag)

  return {
    props: {
      tag: params!.tag,
      posts,
    },
  }
}
