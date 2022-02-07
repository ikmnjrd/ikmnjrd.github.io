import Head from 'next/head'
import Post from '../components/Post'
import getTags from '../utils/getTags'

export default function Tag({ posts }) {
  return (
    <>
      <Head>
        <title>Tag一覧 | ikmnjrd.github.io</title>
      </Head>

      <li className='text-newmo-100'>tahichi</li>
      <li className='text-newmo-200'>tahichi</li>
      <li className='text-newmo-300'>tahichi</li>
      <li className='text-newmo-400'>tahichi</li>
      <li className='text-newmo-500'>tahichi</li>
      <li className='text-newmo-600'>tahichi</li>
    </>
  )
}

export async function getStaticProps() {
  const posts = await getTags();

  return {
    props: {
      posts: posts
    },
  }
}
