// Local replacement for `next/link`.
//
// Renders a plain <a>. Supports the `legacyBehavior` form used across the
// codebase, where the single child <a> receives the href via cloneElement.
import {
  cloneElement,
  isValidElement,
  toChildArray,
  type ComponentChildren,
  type VNode,
} from 'preact'
import type { AnchorHTMLAttributes } from 'preact/compat'

export type LinkProps = {
  href: string
  legacyBehavior?: boolean
  passHref?: boolean
  prefetch?: boolean
  replace?: boolean
  scroll?: boolean
  shallow?: boolean
} & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'href'>

export default function Link({
  href,
  children,
  legacyBehavior,
  // consume Next-only props so they are not spread onto the DOM node
  passHref: _passHref,
  prefetch: _prefetch,
  replace: _replace,
  scroll: _scroll,
  shallow: _shallow,
  ...rest
}: LinkProps & { children?: ComponentChildren }) {
  if (legacyBehavior) {
    const arr = toChildArray(children)
    const child = arr[0]
    if (arr.length === 1 && isValidElement(child)) {
      return cloneElement(
        child as VNode<Record<string, unknown>>,
        {
          href,
          ...rest,
        }
      )
    }
  }
  return (
    <a href={href} {...rest}>
      {children}
    </a>
  )
}
