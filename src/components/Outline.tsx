import Link from './Link'
import type { HTMLProps } from 'react'

export function Outline({
  contents,
  ...props
}: {
  contents: { text: string; link: string }[]
} & HTMLProps<HTMLDivElement>) {
  return (
    <div {...props}>
      <div className="hidden lg:block">
        {contents.map(({ text, link }) => (
          <div key={text} className="mb-2">
            <Link href={`#${link}`}>{text}</Link>
          </div>
        ))}
      </div>
      <details className="lg:hidden">
        <summary className="mb-2">目次</summary>
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
