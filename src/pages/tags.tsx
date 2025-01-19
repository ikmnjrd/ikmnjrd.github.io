import getTags, { type ITagInfo } from '../utils/getTags'
import TitleHead from '../components/TitleHead'
import SankeyChart, {
  type Node,
  type Link,
} from '../components/SankeyChart'
import styles from './base.module.css'

export default function Tag({
  wholeTags,
  countedTags,
  filesData,
}: ITagInfo) {
  const baseTagUrl = '/tag/'
  const baseBlogUrl = '/blog/'

  const sankeyNodes = NodesFactory(
    {
      wholeTags,
      countedTags,
      filesData,
    },
    baseTagUrl
  )
  const lastNodesLength = sankeyNodes.length

  const linksFactory = (data: ITagInfo): Link[] => {
    // 一時的に追加.あとで削除
    // なんでこんなことしてるんだっけ？
    data.wholeTags.forEach((i, idx) => {
      sankeyNodes.push({
        name: i.slug,
        id: lastNodesLength + idx,
        url: baseBlogUrl + i.slug,
      })
    })

    return data.wholeTags.map((i) => {
      return {
        source: sankeyNodes.findIndex((n) => n.name === i.tag),
        target: sankeyNodes.findIndex((n) => n.name === i.slug),
        value: 1,
      }
    })
  }

  const sankeyLinks = linksFactory({
    wholeTags,
    countedTags,
    filesData,
  })

  return (
    <>
      <TitleHead title={'Tag一覧'} />

      <article className={`${styles.main}`}>
        <h1 className={styles.pageTitle}>Tag一覧</h1>
        <SankeyChart
          nodes={sankeyNodes}
          links={sankeyLinks}
          lastIndex={lastNodesLength}
        />
      </article>
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

const NodesFactory = (data: ITagInfo, baseTagUrl: string) => {
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
