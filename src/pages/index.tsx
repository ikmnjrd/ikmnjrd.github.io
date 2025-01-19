import Post from '../components/Post'
import getPostsMeta from '../utils/getPostsMeta'
import TitleHead from '../components/TitleHead'
import OgpHead from '../components/OgpHead'
import { Pagination } from '../components/Pagination'
import { useRouter } from 'next/router'
import { IFrontMatter } from '../utils/getPostFilesData'
import styles from './base.module.css'

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

      <div className={styles.main}>
        <ul className={styles.postList}>
          {posts[pageIndex].map((_post) => (
            <Post
              key={_post.slug}
              slug={_post.slug}
              frontmatter={_post.frontmatter}
            />
          ))}
        </ul>

        <Pagination
          currentPageIndex={pageIndex}
          targetArray={posts}
          style={{ marginLeft: 'auto' }}
          className={styles.pagination}
        />
      </div>
    </>
  )
}

export async function getStaticProps() {
  const posts = await getPostsMeta()
  const SEPARATE_NUM = 15

  const sliceByNumber = (
    array: IPost[],
    number: number
  ): Array<IPost[]> => {
    const length = Math.ceil(array.length / number)
    return [...Array(length)].map((_, idx) => {
      const slicedArray = array.slice(
        idx * number,
        (idx + 1) * number
      )
      return slicedArray
    })
  }
  const dividedPosts = sliceByNumber(posts, SEPARATE_NUM)

  return {
    props: {
      posts: dividedPosts,
      separateNum: SEPARATE_NUM,
    },
  }
}
