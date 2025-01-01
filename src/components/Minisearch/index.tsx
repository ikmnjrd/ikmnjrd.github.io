import {
  useEffect,
  useState,
  useRef,
  type PropsWithChildren,
} from 'react'
import { useSearchSwr, miniSearch } from './useMinisearch'
import styles from './minisearch.module.css'
import Link from 'next/link'

type IProps = {}

export default function Search(
  // eslint-disable-next-line no-unused-vars
  _props: PropsWithChildren<IProps>
) {
  const [query, setQuery] = useState('')
  const [result, setResult] = useState<any[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const ITEMS_PER_PAGE = 3
  const { data } = useSearchSwr()
  const headerRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (!data) return
    const flattedData = data.map((v) => ({
      ...v,
      ...v.frontmatter,
    }))
    miniSearch.removeAll()
    miniSearch.addAll(flattedData)
  }, [data])

  useEffect(() => {
    const results = miniSearch.search(query)
    setResult(results)
    setCurrentPage(1)
  }, [query])

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber)
    headerRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  const handleLinkClick = () => {
    const modal =
      document.querySelector<HTMLDialogElement>('dialog[open]')
    if (modal) {
      modal.close()
    }
  }

  const paginatedResults = result.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  )

  return (
    <div>
      <h4 ref={headerRef} className={styles.title}>
        Search
      </h4>

      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className={styles.input}
      />
      <div className={styles.resultContainer}>
        {paginatedResults.map((r) => (
          <Link
            key={r.id}
            className={styles.resultOne}
            href={`/blog/${r.slug}`}
            onClick={handleLinkClick}
          >
            <h6 className={styles.resultTitle}>{r.title}</h6>
            <p className={styles.resultContent}>{r.content}</p>
          </Link>
        ))}
      </div>

      <div className={styles.pagination}>
        {Array.from(
          { length: Math.ceil(result.length / ITEMS_PER_PAGE) },
          (_, i) => (
            <button
              key={i}
              onClick={() => handlePageChange(i + 1)}
              className={
                currentPage === i + 1 ? styles.activePage : ''
              }
            >
              {i + 1}
            </button>
          )
        )}
      </div>
    </div>
  )
}
