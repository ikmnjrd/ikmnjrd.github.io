import Post from '~/components/Post'
import getPostsMeta from '~/utils/getPostsMeta'
import TitleHead from '~/components/TitleHead'
import OgpHead from '~/components/OgpHead'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { IFrontMatter } from '~/utils/getPostFilesData'
import { generateRssFeed } from '~/scripts/rss'

interface IPost {
  slug: string
  frontmatter: IFrontMatter
  content?: string
}

export default function Home({
  posts,
}: {
  posts: IPost[][]
  length: number
  separateNum: number
}) {
  const router = useRouter()
  const { p } = router.query
  const pageIndex = Number(p ?? 0)
  return (
    <>
      <TitleHead title={'Top'} />
      <OgpHead
        title="ikmnjrd.github.io"
        type="website"
        image="logo.png"
        url="/"
      />

      <ul>
        {posts[pageIndex].map((_post) => (
          <Post
            key={_post.slug}
            slug={_post.slug}
            frontmatter={_post.frontmatter}
          />
        ))}
      </ul>
      <div className="flex justify-between">
        <div>
          {pageIndex > 0 && (
            <span className="mx-2">
              <Link href={`?p=${pageIndex - 1}`}>
                前へ
              </Link>
            </span>
          )}
        </div>
        <div>
          {pageIndex < posts.length - 1 && (
            <span className="mx-2">
              <Link href={`?p=${pageIndex + 1}`}>
                次へ
              </Link>
            </span>
          )}
        </div>
      </div>
    </>
  )
}

export async function getStaticProps() {
  // どこかのページでやればいい。ここ以外今は候補が思いつかないからここで処理。
  await generateRssFeed()

  const posts = await getPostsMeta()
  const SEPARATE_NUM = 15

  const sliceByNumber = (
    array: IPost[],
    number: number
  ): Array<IPost[]> => {
    const length = Math.ceil(
      array.length / number
    )
    return [...Array(length)].map((_, idx) => {
      const slicedArray = array.slice(
        idx * number,
        (idx + 1) * number
      )
      return slicedArray
    })
  }
  const dividedPosts = sliceByNumber(
    posts,
    SEPARATE_NUM
  )

  return {
    props: {
      posts: dividedPosts,
      separateNum: SEPARATE_NUM,
    },
  }
}
