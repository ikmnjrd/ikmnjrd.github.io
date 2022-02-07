import Head from 'next/head'
import Post from '../components/Post'
import getPostsData from '../utils/getPostsData'

export default function Home({ posts }) {
  return (
    <>
      <Head>
        <title>ikmnjrd.github.io</title>
      </Head>

      <ul className="max-w-2xl mx-auto leading-loose">
        {posts.map((post, index) => (
          <Post key={index} post={post} />
        ))}
      </ul>
    </>
  )
}

export async function getStaticProps() {
  const posts = await getPostsData();

  return {
    props: {
      posts: posts
    },
  }
}
