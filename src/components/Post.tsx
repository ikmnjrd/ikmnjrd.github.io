import Link from 'next/link'
import styles from './Post.module.css'
import baseStyles from '../pages/base.module.css'
import classnames from 'classnames'

export default function Post({
  slug,
  frontmatter,
}: {
  slug: string
  frontmatter: { title?: string; date?: string }
}) {
  return (
    <li className={styles.postItem}>
      <img
        src="/arrow_right_black_24dp.svg"
        alt=""
        className={styles.icon}
        width="16px"
        height="16px"
      />
      <Link href={`/blog/${slug}`} legacyBehavior>
        <a className={baseStyles.link}>{frontmatter?.title}</a>
      </Link>
      <p className={classnames([styles.meta])}>
        Posted on {frontmatter?.date}
      </p>
    </li>
  )
}
