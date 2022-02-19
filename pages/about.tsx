import TitleHead from 'components/TitleHead'
import OgpHead from 'components/OgpHead'


export default function about({}) {
  return (
    <>
      <TitleHead title={"Top"}/>
      <OgpHead
        title="ikmnjrd.github.io"
        type="website"
        image="Untitled.png"
        url=""
      />

      <h1 className="text-3xl mt-8 mb-4">About</h1>
      <div>
        <p>雑多な記録</p>
        <p>Googleアナリティクス</p>
        <div>hoge</div>
        <p>shoge</p>
      </div>
    </>
  )
}
