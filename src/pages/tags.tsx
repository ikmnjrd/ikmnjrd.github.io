import getTags, { ITagInfo } from '~/utils/getTags'
import TitleHead from '~/components/TitleHead'
import SankeyChart from '~/components/SankeyChart'

export interface Node {
  name: string // tag
  id: number // tag name
  url: string
}
export interface ILink {
  source: number | string // slug
  target: number | string // tag name
  value: number
}

export default function Tag({
  wholeTags,
  countedTags,
  filesData,
}: ITagInfo) {
  const baseTagUrl = '/tag/'
  const baseBlogUrl = '/blog/'

  const NodesFactory = (data: ITagInfo) => {
    const arr: Node[] = []
    let idx = 0
    for (const [key, _] of Object.entries(data.countedTags)) {
      arr.push({
        name: key,
        id: idx,
        url: baseTagUrl + key,
      })
      idx++
    }
    return arr
  }

  const Nodes = NodesFactory({
    wholeTags,
    countedTags,
    filesData,
  })
  const lastNodesLength = Nodes.length

  const linksFactory = (data: ITagInfo): ILink[] => {
    // 一時的に追加.あとで削除
    data.wholeTags.forEach((i, idx) => {
      Nodes.push({
        name: i.slug,
        id: lastNodesLength + idx,
        url: baseBlogUrl + i.slug,
      })
    })

    return data.wholeTags.map((i) => {
      Nodes.findIndex((n) => n.name === i.tag)

      return {
        source: Nodes.findIndex((n) => n.name === i.tag),
        target: Nodes.findIndex((n) => n.name === i.slug),
        value: 1,
      }
    })
  }

  const Links = linksFactory({
    wholeTags,
    countedTags,
    filesData,
  })

  return (
    <>
      <TitleHead title={'Tag一覧'} />
      <h1 className="text-3xl pt-8 pb-4">Tag一覧</h1>
      <SankeyChart
        nodes={Nodes}
        links={Links}
        lastIndex={lastNodesLength}
      />
    </>
  )
}

export async function getStaticProps() {
  const { wholeTags, countedTags, filesData } = await getTags()

  return {
    props: {
      wholeTags,
      countedTags,
      filesData,
    },
  }
}
