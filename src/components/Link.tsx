import NextLink, { type LinkProps } from 'next/link'
import type { ReactNode, AnchorHTMLAttributes } from 'react'

export default function Link({
  children,
  ...props
}: AnchorHTMLAttributes<HTMLAnchorElement> &
  LinkProps & { children: ReactNode }) {
  return (
    <NextLink className="underline hover:opacity-50" {...props}>
      {children}
    </NextLink>
  )
}
