import {
  useEffect,
  useRef,
  PropsWithChildren,
  useCallback,
} from 'react'
import styles from './modal.module.css'

/**
 * TODO: overscroll-behaviorが効かないので、聞くようにする。
 */
export default function Modal({
  children,
  label,
  labelClass,
}: PropsWithChildren<{ labelClass?: string; label?: string }>) {
  const dialogRef = useRef<HTMLDialogElement>(null)

  function onClickOpenBtn() {
    dialogRef.current?.showModal()
  }

  function onClickCloseBtn() {
    dialogRef.current?.close()
  }

  const handleKeydownDialogContainer = useCallback(
    (event: KeyboardEvent) => {
      if (event.code === 'Escape') {
        onClickOpenBtn()
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
      <button
        type="button"
        onClick={onClickOpenBtn}
        data-test="dialog-open-btn"
      >
        <span className={labelClass}>
          {label || 'Open Modal'}
        </span>
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
            {children}
          </div>
        </div>
      </dialog>
    </>
  )
}
