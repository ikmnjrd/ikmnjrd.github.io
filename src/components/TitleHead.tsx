import Head from 'next/head'

export default function TitleHead({
  title,
}: {
  title: string
}) {
  return (
    <Head>
      <title>{`${title} | ikmnjrd.github.io`}</title>
    </Head>
  )
}
