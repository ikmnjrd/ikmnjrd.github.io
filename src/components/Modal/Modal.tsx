import {
  useEffect,
  createRef,
  PropsWithChildren,
  useCallback,
} from 'react'
import styles from './modal.module.css'
import Search from '~/components/Search'

/**
 * TODO: overscroll-behaviorが効かないので、聞くようにする。
 */
export default function Modal({ children }: PropsWithChildren) {
  const dialogRef = createRef<HTMLDialogElement>()

  const onClickOpenBtn = () => {
    dialogRef.current?.showModal()
  }

  const onClickCloseBtn = () => {
    dialogRef.current?.close()
  }

  const handleKeydownDialogContainer = useCallback(
    (event: KeyboardEvent) => {
      if (event.code === 'Escape') {
        onClickCloseBtn()
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  )

  useEffect(() => {
    document.addEventListener(
      'keydown',
      handleKeydownDialogContainer
    )
    return () => {
      document.removeEventListener(
        'keydown',
        handleKeydownDialogContainer
      )
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      <button type="button" onClick={onClickOpenBtn}>
        {children || 'Open Modal'}
      </button>
      <dialog
        className={`${styles.modal} ${styles.micromodal__slide}`}
        ref={dialogRef}
      >
        <div
          className={styles.modal__overlay}
          onClick={onClickCloseBtn}
          tabIndex={-1}
        >
          <div
            className={styles.modal__container}
            role="dialog"
            aria-modal="true"
            onClick={(e) => e.stopPropagation()}
          >
            <Search />
          </div>
        </div>
      </dialog>
    </>
  )
}
