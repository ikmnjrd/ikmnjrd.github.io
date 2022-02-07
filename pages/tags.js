import Head from 'next/head'
import getTags from '../utils/getTags'

export default function Tag({ tags }) {
  console.log(Object.entries(tags.counts_tag));

  const tags_obj = Object.entries(tags.counts_tag).map((tag) => {
    return <li key={tag[0]}>{`${tag[0]}(${tag[1]})`}</li>
  })

  return (
    <>
      <Head>
        <title>Tag一覧 | ikmnjrd.github.io</title>
      </Head>
      <ul>
        {tags_obj}
      </ul>
    </>
  )
}

export async function getStaticProps() {
  const tags = await getTags();

  return {
    props: {
      tags: tags
    },
  }
}
