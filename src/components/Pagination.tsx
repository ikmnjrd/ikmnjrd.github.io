import Link from 'next/link'
import type { CSSProperties } from 'react'

export function Pagination({
  currentPageIndex,
  targetArray,
  style,
}: {
  currentPageIndex: number
  targetArray: any[]
  style?: CSSProperties
}) {
  return (
    <div className="flex justify-between" style={style}>
      {targetArray.map((_, idx) => (
        <div key={idx}>
          <span
            className={
              'mx-2 px-1 hover:opacity-50 ' +
              (idx === currentPageIndex ? 'underline' : '')
            }
          >
            <Link href={`?p=${idx}`}>{idx + 1}</Link>
          </span>
        </div>
      ))}
    </div>
  )
}
