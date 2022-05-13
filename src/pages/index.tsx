import Post from '~/components/Post'
import getPostsMeta from '~/utils/getPostsMeta'
import TitleHead from '~/components/TitleHead'
import OgpHead from '~/components/OgpHead'
import { useRouter } from 'next/router'

interface IPost {
  slug: string
  frontmatter: {
    [key: string]: any
  }
  content?: string
}

export default function Home({
  posts,
}: {
  posts: IPost[]
  length: number
}) {
  const router = useRouter()
  const { p } = router.query
  const pageIndex = Number(p) ?? 0
  return (
    <>
      <TitleHead title={'Top'} />
      <OgpHead
        title="ikmnjrd.github.io"
        type="website"
        image="Untitled.png"
        url="/"
      />

      <ul>
        {posts
          .splice(pageIndex)
          .map((post: IPost, idx: number) => (
            <Post key={idx} post={post} />
          ))}
      </ul>
    </>
  )
}

export async function getStaticProps() {
  const posts = await getPostsMeta()
  const SEPARATE_NUM = 10

  const sliceByNumber = (
    array: IPost[],
    number: number
  ): Array<IPost[]> => {
    const length = Math.ceil(
      array.length / number
    )
    return [...Array(length)].map((_, idx) =>
      array.slice(
        idx * number,
        (idx + 1) * number
      )
    )
  }

  return {
    props: {
      posts: sliceByNumber(posts, SEPARATE_NUM),
      length: posts.length,
      separateNum: SEPARATE_NUM,
    },
  }
}
