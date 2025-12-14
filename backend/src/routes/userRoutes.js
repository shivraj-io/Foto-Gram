const express = require('express')
const router = express.Router()
const {
  registerUser,
  loginUser,
  getUserProfile,
  updateUserProfile,
  deleteUser,
  followUser,
  getAllUsers,
} = require('../controllers/userController')

// Public routes
router.post('/register', registerUser)
router.post('/login', loginUser)
router.get('/', getAllUsers)
router.get('/:id', getUserProfile)

// Protected routes (add auth middleware in production)
router.put('/:id', updateUserProfile)
router.delete('/:id', deleteUser)
router.post('/:id/follow', followUser)

module.exports = router
