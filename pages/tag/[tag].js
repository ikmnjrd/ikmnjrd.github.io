import Link from 'next/link'
import getPostsFromTag from '@utils/getPostsFromTag'
import getTags from '@utils/getTags'

export default function TagLinkPage({
  tag,
  posts
}) {
  return (
    <>
      <h2>{ tag }の投稿記事一覧</h2>
      <div>
        { posts.map((post) => <li><Link href={`/blog/${post.slug}`}>{post.frontmatter.title}</Link></li>) }
      </div>
    </>
  )
}

export async function getStaticPaths() {
  const tags = await getTags();

  const paths = Object.entries(tags.counts_tag).map((tag) => {
    return { params: { tag: tag[0] }}
  })

  return {
    paths,
    fallback: false,
  }
}

export async function getStaticProps({ params: { tag } }) {
  const posts = await getPostsFromTag(tag);

  return {
    props: {
      tag,
      posts
    },
  }
}
