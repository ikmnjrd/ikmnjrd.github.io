import Link from 'next/link'
import type { HTMLProps } from 'react'
import classNames from 'classnames'

export function Pagination({
  currentPageIndex,
  targetArray,
  ...props
}: {
  currentPageIndex: number
  targetArray: unknown[]
} & HTMLProps<HTMLDivElement>) {
  return (
    <div className="flex justify-between" {...props}>
      {targetArray.map((_, idx) => (
        <div key={idx}>
          <span
            className={classNames('mx-2 px-1 hover:opacity-50', {
              underline: idx === currentPageIndex,
            })}
          >
            <Link href={`?p=${idx}`}>{idx + 1}</Link>
          </span>
        </div>
      ))}
    </div>
  )
}
