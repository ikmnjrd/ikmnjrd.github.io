import Link from './Link'
import type { HTMLProps } from 'react'
import styles from './Outline.module.css'

export function Outline({
  contents,
  ...props
}: {
  contents: { text: string; link: string }[]
} & HTMLProps<HTMLDivElement>) {
  return (
    <div {...props}>
      <div className={styles.desktopOutline}>
        {contents.map(({ text, link }) => (
          <div key={text} className={styles.item}>
            <Link href={`#${link}`}>{text}</Link>
          </div>
        ))}
      </div>
      <details className={styles.mobileOutline}>
        <summary className={styles.item}>目次</summary>
        <ul>
          {contents.map(({ text, link }) => (
            <li key={text}>
              <Link href={`#${link}`}>{text}</Link>
            </li>
          ))}
        </ul>
      </details>
    </div>
  )
}
