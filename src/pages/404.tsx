import TitleHead from '../components/TitleHead'
import Link from 'next/link'
import styles from './base.module.css'

export default function NotFound() {
  return (
    <>
      <TitleHead title={'404 Not Found'} />

      <article className={styles.main}>
        <h1 className={styles.pageTitle}>404 - Not Found</h1>
        <div>
          <p>お探しのページは見つかりませんでした。</p>
          <p>
            <Link href="/" className={styles.link}>
              トップに戻る
            </Link>
          </p>
        </div>
      </article>
    </>
  )
}
