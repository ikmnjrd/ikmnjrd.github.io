import TitleHead from '../components/TitleHead'
import OgpHead from '../components/OgpHead'
import styles from './base.module.css'

export default function about() {
  return (
    <>
      <TitleHead title={'About'} />
      <OgpHead
        title="ikmnjrd.github.io"
        type="website"
        image="logo.png"
        url=""
      />

      <article className={styles.main}>
        <h1 className={styles.pageTitle}>About</h1>
        <div>
          <p>雑多な記録</p>
          <p>
            当サイトではGoogle
            Analyticsを用いて訪問者の情報収集を行っております。
          </p>
        </div>
      </article>
    </>
  )
}
