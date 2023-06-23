import { useModalInit } from '~/hooks/useModalInit'

type SearchBtnProps = {
  className?: string
}

export default function SearchBtn({
  className,
}: SearchBtnProps) {
  useModalInit()

  return (
    <button
      className={className}
      aria-label="Toggle Search Modal"
      data-custom-open="modal-1"
    >
      <span aria-hidden="true">Search</span>
    </button>
  )
}
