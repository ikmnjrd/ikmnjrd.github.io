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
              'mx-3 ' +
              (idx === currentPageIndex
                ? 'text-newmo-800'
                : 'text-newmo-300')
            }
          >
            <Link href={`?p=${idx}`}>{idx + 1}</Link>
          </span>
        </div>
      ))}
    </div>
  )
}
