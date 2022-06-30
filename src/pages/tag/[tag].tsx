import Link from 'next/link'
import getPostsFromTag from '~/utils/getPostsFromTag'
import getTags from '~/utils/getTags'
import TitleHead from '~/components/TitleHead'

export default function TagLinkPage({
  tag,
  posts,
}: any) {
  return (
    <>
      <TitleHead title={`${tag}の記事`} />

      <h2>{tag}の投稿記事一覧</h2>
      <div>
        {posts.map((post: any) => (
          <li key={post.slug}>
            <Link href={`/blog/${post.slug}`}>
              <a className="hover:underline hover:text-newmo-400 visited:text-newmo-300">
                {post.frontmatter.title}
              </a>
            </Link>
          </li>
        ))}
      </div>
    </>
  )
}

export async function getStaticPaths() {
  const tags = await getTags()

  const paths = Object.entries(
    tags.counts_tag
  ).map((tag) => {
    return { params: { tag: tag[0] } }
  })

  return {
    paths,
    fallback: false,
  }
}

export async function getStaticProps({
  params: { tag },
}: any) {
  const posts = await getPostsFromTag(tag)

  return {
    props: {
      tag,
      posts,
    },
  }
}
