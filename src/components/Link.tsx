import NextLink, { type LinkProps } from 'next/link'
import type { ComponentChildren } from 'preact'
import styles from '../pages/base.module.css'

export default function Link({
  children,
  ...props
}: LinkProps & { children?: ComponentChildren }) {
  return (
    <NextLink className={styles.link} {...props}>
      {children}
    </NextLink>
  )
}
