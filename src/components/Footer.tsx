import { FC } from 'react'
import SvgIcon from './SvgIcon'
import styles from './Footer.module.css'

const Footer: FC = () => {
  const date = new Date()
  return (
    <footer className={styles.footer} role="contentinfo">
      <div className={styles.content}>
        <ul className={styles.socialList}>
          <li>
            <a
              href="https://x.com/ikmnjrd"
              target="_blank"
              rel="nofollow noopener noreferrer"
              title="x"
              className={styles.socialLink}
            >
              <SvgIcon
                type="x"
                size="1.8em"
                strokeWidth={1}
                fill="#fff"
              />
            </a>
          </li>
          <li>
            <a
              href="https://github.com/ikmnjrd"
              target="_blank"
              rel="nofollow noopener noreferrer"
              title="GitHub"
              className={styles.socialLink}
            >
              <SvgIcon
                type="github"
                size="2em"
                strokeWidth={1}
                fill="#fff"
              />
            </a>
          </li>
          <li>
            <a
              href="https://ikmnjrd.github.io/rss/feed.xml"
              target="_blank"
              rel="nofollow noopener noreferrer"
              title="RSS"
              className={styles.socialLink}
            >
              <SvgIcon
                type="rss"
                size="2em"
                strokeWidth={2.3}
                fill="#fff"
              />
            </a>
          </li>
        </ul>
        <p className={styles.copyright}>
          ©︎ikmnjrd -{' '}
          <time dateTime={date.toString()}>
            {date.getFullYear()}
          </time>
        </p>
      </div>
      <div className={styles.wave}></div>
      <div className={styles.wave}></div>
    </footer>
  )
}

export default Footer
