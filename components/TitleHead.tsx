import Head from 'next/head'

export default function TitleHead({title} :any) {
  return (
      <Head>
        <title>{title} | ikmnjrd.github.io</title>
      </Head>
  )
}