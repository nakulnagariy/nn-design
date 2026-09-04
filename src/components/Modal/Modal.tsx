import { useCallback, useEffect, useId, useRef } from 'react'
import type { MouseEvent, ReactNode } from 'react'
import { cx } from '../../utils/cx'

export type ModalSize = 'sm' | 'md' | 'lg'

export interface ModalProps {
  /** Whether the dialog is shown. */
  open: boolean
  /**
   * Called when the user dismisses the dialog — Escape, the close button, or a
   * click on the backdrop (unless those are disabled).
   */
  onClose: () => void
  /** Dialog title. Also names the dialog for screen readers. */
  title?: ReactNode
  /** Secondary line under the title. */
  description?: ReactNode
  /** Max width step. Defaults to `md`. */
  size?: ModalSize
  /** Footer content — typically the action buttons. */
  footer?: ReactNode
  /** Hides the ✕ button in the header. */
  hideCloseButton?: boolean
  /** Ignore clicks on the backdrop, forcing an explicit choice. */
  disableBackdropClose?: boolean
  /** Accessible label for the close button. Defaults to `"Close"`. */
  closeLabel?: string
  className?: string
  children?: ReactNode
}

/**
 * A modal dialog built on the native `<dialog>` element.
 *
 * Native `showModal()` gives focus trapping, inertness of the page behind, and
 * Escape-to-close without extra JavaScript. The component is controlled: it
 * renders when `open` is true and calls `onClose` on every dismissal path — it
 * never closes itself, so `open` must actually flip in your state.
 *
 * @example
 * const [open, setOpen] = useState(false)
 *
 * <Modal
 *   open={open}
 *   onClose={() => setOpen(false)}
 *   title="Delete project"
 *   description="This cannot be undone."
 *   footer={
 *     <>
 *       <Button onClick={() => setOpen(false)}>Cancel</Button>
 *       <Button variant="danger" onClick={confirmDelete}>Delete</Button>
 *     </>
 *   }
 * >
 *   <Text>Everything in this project will be permanently removed.</Text>
 * </Modal>
 */
export function Modal({
  open,
  onClose,
  title,
  description,
  size = 'md',
  footer,
  hideCloseButton = false,
  disableBackdropClose = false,
  closeLabel = 'Close',
  className,
  children,
}: ModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null)
  const titleId = useId()
  const descriptionId = useId()

  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return

    if (open && !dialog.open) {
      dialog.showModal()
    } else if (!open && dialog.open) {
      dialog.close()
    }
  }, [open])

  // Escape fires `cancel`; let the parent own the state rather than the DOM.
  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return

    const handleCancel = (event: Event) => {
      event.preventDefault()
      onClose()
    }

    dialog.addEventListener('cancel', handleCancel)
    return () => dialog.removeEventListener('cancel', handleCancel)
  }, [onClose])

  // A click that lands on the dialog element itself is a click on the backdrop,
  // since the panel below fills the dialog's own content box.
  const handleClick = useCallback(
    (event: MouseEvent<HTMLDialogElement>) => {
      if (disableBackdropClose) return
      if (event.target === dialogRef.current) onClose()
    },
    [disableBackdropClose, onClose],
  )

  // The <dialog> click handler only implements click-outside-to-dismiss. Its
  // keyboard equivalent is Escape, handled natively by <dialog> through the
  // `cancel` listener above — jsx-a11y can't see that from the JSX.
  return (
    // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions, jsx-a11y/click-events-have-key-events
    <dialog
      ref={dialogRef}
      className={cx('nn-modal', `nn-modal--${size}`, className)}
      aria-labelledby={title ? titleId : undefined}
      aria-describedby={description ? descriptionId : undefined}
      onClick={handleClick}
    >
      <div className="nn-modal__panel">
        {title || !hideCloseButton ? (
          <div className="nn-modal__header">
            <div className="nn-modal__heading">
              {title ? (
                <h2 className="nn-modal__title" id={titleId}>
                  {title}
                </h2>
              ) : null}
              {description ? (
                <p className="nn-modal__description" id={descriptionId}>
                  {description}
                </p>
              ) : null}
            </div>
            {hideCloseButton ? null : (
              <button
                type="button"
                className="nn-modal__close nn-focusable"
                onClick={onClose}
                aria-label={closeLabel}
              >
                <span aria-hidden="true">×</span>
              </button>
            )}
          </div>
        ) : null}

        {children ? <div className="nn-modal__body">{children}</div> : null}
        {footer ? <div className="nn-modal__footer">{footer}</div> : null}
      </div>
    </dialog>
  )
}
