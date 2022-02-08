import getTags from '@utils/getTags'

export default function TagLinkPage({
  tag
}) {
  return (
    <>
      <div>{tag}</div>
    </>
  )
}

export async function getStaticPaths() {
  const tags = await getTags();

  console.log(tags.counts_tag)

  const paths = Object.entries(tags.counts_tag).map((tag) => {
    return { params: { tag: tag[0] }}
  })

  return {
    paths,
    fallback: false,
  }
}

export async function getStaticProps({ params: { tag } }) {

  return {
    props: {
      tag
    },
  }
}
