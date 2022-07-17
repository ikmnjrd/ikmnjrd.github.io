import Link from 'next/link'
import getTags, {
  ITagInfo,
} from '~/utils/getTags'
import TitleHead from '~/components/TitleHead'

export default function Tag({
  countedTags,
}: ITagInfo) {
  const tags_obj = Object.entries(
    countedTags
  ).map((tag) => {
    return (
      <li key={tag[0]}>
        <Link href={`/tag/${tag[0]}`}>
          <a className="hover:underline hover:text-newmo-400 visited:text-newmo-300">{`${tag[0]}(${tag[1]})`}</a>
        </Link>
      </li>
    )
  })

  return (
    <>
      <TitleHead title={'Tag一覧'} />
      <h1 className="text-3xl pt-8 pb-4">
        Tag一覧
      </h1>
      <div>{tags_obj}</div>
    </>
  )
}

export async function getStaticProps() {
  const { wholeTags, countedTags } =
    await getTags()

  return {
    props: {
      wholeTags,
      countedTags,
    },
  }
}
