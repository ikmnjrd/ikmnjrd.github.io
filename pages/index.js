import Head from 'next/head'
import Post from '../components/Post'
import getPostsMeta from '@utils/getPostsMeta'

export default function Home({ posts }) {
  return (
    <>
      <Head>
        <title>ikmnjrd.github.io</title>
      </Head>

      <ul className="max-w-2xl mx-auto">
        {posts.map((post, index) => (
          <Post key={index} post={post} />
        ))}
      </ul>
    </>
  )
}

export async function getStaticProps() {
  const posts = await getPostsMeta();

  return {
    props: {
      posts: posts
    },
  }
}
