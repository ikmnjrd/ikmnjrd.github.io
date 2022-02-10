import Post from 'components/Post'
import getPostsMeta from 'utils/getPostsMeta'
import TitleHead from 'components/TitleHead'


export default function Home({ posts }:any) {
  return (
    <>
      <TitleHead title={"Top"}/>

      <ul>
        {posts.map((post:any, index:number) => (
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
