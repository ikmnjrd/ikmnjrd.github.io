import { useRef, PropsWithChildren } from 'react'
import classNames from 'classnames'
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

    // Searchのコンポーネント用の処理
    if (dialogRef.current) {
      const input = dialogRef.current.querySelector('input')
      if (input) {
        input.focus()
      }
    }
  }

  function onClickCloseBtn() {
    dialogRef.current?.close()
  }

  return (
    <>
      <button type="button" onClick={onClickOpenBtn}>
        <span className={labelClass}>
          {label || 'Open Modal'}
        </span>
      </button>
      <dialog
        className={classNames(
          styles.modal,
          styles.micromodal__slide
        )}
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
            onClick={(e) => {
              e.stopPropagation()
            }}
          >
            {children}
          </div>
        </div>
      </dialog>
    </>
  )
}
