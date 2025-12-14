const express = require('express')
const router = express.Router()
const {
  createPost,
  getAllPosts,
  getPostById,
  updatePost,
  deletePost,
  likePost,
  addComment,
  deleteComment,
  getPostsByUser,
} = require('../controllers/postController')
const { uploadPost, getImageKitAuth } = require('../controllers/uploadController')
const upload = require('../middleware/upload')

// Public routes
router.get('/', getAllPosts)
router.get('/user/:userId', getPostsByUser)

// ImageKit auth endpoint
router.get('/imagekit-auth', getImageKitAuth)

// Test endpoint
router.get('/upload-test', (req, res) => {
  res.json({ success: true, message: 'Upload route is accessible' })
})

// Protected routes (add auth middleware in production)
router.post('/upload', upload.single('image'), uploadPost) // Image upload route - must be before /:id
router.post('/', createPost)
router.get('/:id', getPostById)
router.put('/:id', updatePost)
router.delete('/:id', deletePost)
router.post('/:id/like', likePost)
router.post('/:id/comment', addComment)
router.delete('/:id/comment/:commentId', deleteComment)

module.exports = router
