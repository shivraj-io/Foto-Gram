/**
 * Helper utility functions
 * Reusable utility functions for the application
 */

// Format response
const formatResponse = (success, data = null, message = '', errors = null) => {
  const response = {
    success,
    message,
  }

  if (data) {
    response.data = data
  }

  if (errors) {
    response.errors = errors
  }

  return response
}

// Generate random string
const generateRandomString = (length = 10) => {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  let result = ''
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length))
  }
  return result
}

// Validate email
const isValidEmail = (email) => {
  const emailRegex = /^\S+@\S+\.\S+$/
  return emailRegex.test(email)
}

// Sanitize user input
const sanitizeInput = (input) => {
  if (typeof input !== 'string') return input
  return input.trim().replace(/[<>]/g, '')
}

// Format date
const formatDate = (date) => {
  const options = { year: 'numeric', month: 'long', day: 'numeric' }
  return new Date(date).toLocaleDateString('en-US', options)
}

// Calculate time ago
const timeAgo = (date) => {
  const seconds = Math.floor((new Date() - new Date(date)) / 1000)

  let interval = Math.floor(seconds / 31536000)
  if (interval >= 1) return `${interval} year${interval > 1 ? 's' : ''} ago`

  interval = Math.floor(seconds / 2592000)
  if (interval >= 1) return `${interval} month${interval > 1 ? 's' : ''} ago`

  interval = Math.floor(seconds / 86400)
  if (interval >= 1) return `${interval} day${interval > 1 ? 's' : ''} ago`

  interval = Math.floor(seconds / 3600)
  if (interval >= 1) return `${interval} hour${interval > 1 ? 's' : ''} ago`

  interval = Math.floor(seconds / 60)
  if (interval >= 1) return `${interval} minute${interval > 1 ? 's' : ''} ago`

  return 'Just now'
}

// Paginate results
const paginate = (page = 1, limit = 10) => {
  const pageNum = parseInt(page)
  const limitNum = parseInt(limit)
  const skip = (pageNum - 1) * limitNum

  return { skip, limit: limitNum, page: pageNum }
}

// Extract hashtags from text
const extractHashtags = (text) => {
  if (!text) return []
  const regex = /#(\w+)/g
  const matches = text.match(regex)
  return matches ? matches.map((tag) => tag.substring(1)) : []
}

// Generate slug from text
const generateSlug = (text) => {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w\-]+/g, '')
    .replace(/\-\-+/g, '-')
}

// Check if object is empty
const isEmpty = (obj) => {
  return Object.keys(obj).length === 0
}

// Remove undefined/null values from object
const cleanObject = (obj) => {
  return Object.fromEntries(Object.entries(obj).filter(([_, v]) => v != null))
}

module.exports = {
  formatResponse,
  generateRandomString,
  isValidEmail,
  sanitizeInput,
  formatDate,
  timeAgo,
  paginate,
  extractHashtags,
  generateSlug,
  isEmpty,
  cleanObject,
}
