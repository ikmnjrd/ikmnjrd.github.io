import NextLink, { type LinkProps } from 'next/link'
import type { ReactNode, AnchorHTMLAttributes } from 'react'
import styles from '../pages/base.module.css'

export default function Link({
  children,
  ...props
}: AnchorHTMLAttributes<HTMLAnchorElement> &
  LinkProps & { children: ReactNode }) {
  return (
    <NextLink className={styles.link} {...props}>
      {children}
    </NextLink>
  )
}
