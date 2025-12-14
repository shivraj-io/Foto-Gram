function Input({ label, ...props }) {
  return (
    <label className="input-field">
      {label && <span className="input-label">{label}</span>}
      <input {...props} />
    </label>
  )
}

export default Input
