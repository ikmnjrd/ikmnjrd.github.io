import Head from 'next/head'
import Link from 'next/link'
import getTags from '@utils/getTags'

export default function Tag({ tags }) {

  const tags_obj = Object.entries(tags.counts_tag).map((tag) => {
    return <li key={tag[0]}><Link href={`/tag/${tag[0]}`}><a className="hover:underline hover:text-newmo-400 visited:text-newmo-300">{`${tag[0]}(${tag[1]})`}</a></Link></li>
  })

  return (
    <>
      <Head>
        <title>Tag一覧 | ikmnjrd.github.io</title>
      </Head>
      <h2>Tag一覧</h2>
      <div>
        {tags_obj}
      </div>
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
