import { useRef, PropsWithChildren } from 'react'
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

  function handleClickForChildren(evTarget: unknown) {
    // @ts-expect-error FIXME
    if (!evTarget?.outerHTML) {
      return
    }

    // @ts-expect-error FIXME
    const html = evTarget.outerHTML as string

    if (
      !html.includes('ais-Hits-list') &&
      (html.includes('data-target-close') ||
        html.includes('ais-Highlight') ||
        html.includes('ais-Snippet'))
    ) {
      onClickCloseBtn()
    }
  }

  return (
    <>
      <button type="button" onClick={onClickOpenBtn}>
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
            onClick={(e) => {
              handleClickForChildren(e.nativeEvent.target)
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
