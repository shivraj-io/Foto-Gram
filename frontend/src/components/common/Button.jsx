import './common.css'

function Button({ children, variant = 'solid', className = '', ...props }) {
  const classes = `btn ${variant === 'ghost' ? 'ghost' : 'solid'} ${className}`.trim()
  return (
    <button className={classes} {...props}>
      {children}
    </button>
  )
}

export default Button
