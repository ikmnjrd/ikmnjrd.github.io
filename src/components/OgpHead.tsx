import Head from 'next/head'

export default function OgpHead({
  url,
  type,
  image,
  title,
}: {
  url: string
  type: string
  image: string
  title: string
}) {
  return (
    <Head>
      <meta
        property="og:url"
        key="url"
        content={'https://ikmnjrd.github.io/' + url}
      />
      {type && (
        <meta property="og:type" key="type" content={type} />
      )}
      {image && (
        <meta
          property="og:image"
          key="image"
          content={'https://ikmnjrd.github.io/' + image}
        />
      )}
      {title && (
        <meta property="og:title" key="title" content={title} />
      )}
    </Head>
  )
}
