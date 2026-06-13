import Link from 'next/link'
import type { ComponentProps } from 'preact'
import classNames from 'classnames'
import styles from './Pagination.module.css'

export function Pagination({
  currentPageIndex,
  targetArray,
  ...props
}: {
  currentPageIndex: number
  targetArray: unknown[]
} & ComponentProps<'div'>) {
  return (
    <div className={styles.container} {...props}>
      {targetArray.map((_, idx) => (
        <div key={idx}>
          <span
            className={classNames(styles.pageLink, {
              [styles.active]: idx === currentPageIndex,
            })}
          >
            <Link href={`?p=${idx}`}>{idx + 1}</Link>
          </span>
        </div>
      ))}
    </div>
  )
}
