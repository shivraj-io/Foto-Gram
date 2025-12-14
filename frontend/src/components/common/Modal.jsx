function Modal({ open, title, children }) {
  if (!open) return null
  return (
    <div className="modal-backdrop">
      <div className="modal">
        {title && <h3>{title}</h3>}
        <div className="modal-body">{children}</div>
      </div>
    </div>
  )
}

export default Modal
