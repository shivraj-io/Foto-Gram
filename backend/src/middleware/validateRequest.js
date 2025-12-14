/**
 * Request validation middleware
 * Validates incoming request data
 */

// Validate registration data
const validateRegister = (req, res, next) => {
  const { username, email, password } = req.body

  const errors = []

  // Username validation
  if (!username || username.trim().length < 3) {
    errors.push('Username must be at least 3 characters long')
  }

  if (username && username.length > 30) {
    errors.push('Username cannot exceed 30 characters')
  }

  // Email validation
  const emailRegex = /^\S+@\S+\.\S+$/
  if (!email || !emailRegex.test(email)) {
    errors.push('Please provide a valid email address')
  }

  // Password validation
  if (!password || password.length < 6) {
    errors.push('Password must be at least 6 characters long')
  }

  if (errors.length > 0) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors,
    })
  }

  next()
}

// Validate login data
const validateLogin = (req, res, next) => {
  const { email, password } = req.body

  const errors = []

  if (!email) {
    errors.push('Email is required')
  }

  if (!password) {
    errors.push('Password is required')
  }

  if (errors.length > 0) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors,
    })
  }

  next()
}

// Validate post creation
const validateCreatePost = (req, res, next) => {
  const { image } = req.body

  const errors = []

  if (!image || image.trim() === '') {
    errors.push('Post must have an image')
  }

  if (req.body.caption && req.body.caption.length > 2200) {
    errors.push('Caption cannot exceed 2200 characters')
  }

  if (errors.length > 0) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors,
    })
  }

  next()
}

// Validate comment
const validateComment = (req, res, next) => {
  const { text } = req.body

  const errors = []

  if (!text || text.trim() === '') {
    errors.push('Comment text is required')
  }

  if (text && text.length > 500) {
    errors.push('Comment cannot exceed 500 characters')
  }

  if (errors.length > 0) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors,
    })
  }

  next()
}

// Validate MongoDB ObjectId
const validateObjectId = (req, res, next) => {
  const id = req.params.id

  if (!id.match(/^[0-9a-fA-F]{24}$/)) {
    return res.status(400).json({
      success: false,
      message: 'Invalid ID format',
    })
  }

  next()
}

module.exports = {
  validateRegister,
  validateLogin,
  validateCreatePost,
  validateComment,
  validateObjectId,
}
