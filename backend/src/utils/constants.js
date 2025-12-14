/**
 * Application constants
 * Centralized constants for the application
 */

const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
}

const USER_ROLES = {
  USER: 'user',
  ADMIN: 'admin',
  MODERATOR: 'moderator',
}

const POST_TYPES = {
  IMAGE: 'image',
  VIDEO: 'video',
  CAROUSEL: 'carousel',
}

const ERROR_MESSAGES = {
  USER_NOT_FOUND: 'User not found',
  POST_NOT_FOUND: 'Post not found',
  INVALID_CREDENTIALS: 'Invalid credentials',
  UNAUTHORIZED: 'Not authorized to perform this action',
  SERVER_ERROR: 'Internal server error',
  VALIDATION_ERROR: 'Validation failed',
}

const SUCCESS_MESSAGES = {
  USER_REGISTERED: 'User registered successfully',
  USER_LOGGED_IN: 'User logged in successfully',
  POST_CREATED: 'Post created successfully',
  POST_UPDATED: 'Post updated successfully',
  POST_DELETED: 'Post deleted successfully',
  COMMENT_ADDED: 'Comment added successfully',
  COMMENT_DELETED: 'Comment deleted successfully',
}

const REGEX_PATTERNS = {
  EMAIL: /^\S+@\S+\.\S+$/,
  USERNAME: /^[a-zA-Z0-9._]{3,30}$/,
  PASSWORD: /^.{6,}$/,
}

const LIMITS = {
  MAX_USERNAME_LENGTH: 30,
  MIN_USERNAME_LENGTH: 3,
  MAX_CAPTION_LENGTH: 2200,
  MAX_COMMENT_LENGTH: 500,
  MAX_BIO_LENGTH: 150,
  MIN_PASSWORD_LENGTH: 6,
  POSTS_PER_PAGE: 10,
  COMMENTS_PER_PAGE: 20,
}

module.exports = {
  HTTP_STATUS,
  USER_ROLES,
  POST_TYPES,
  ERROR_MESSAGES,
  SUCCESS_MESSAGES,
  REGEX_PATTERNS,
  LIMITS,
}
