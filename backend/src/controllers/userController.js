const User = require('../models/User')
const jwt = require('jsonwebtoken')
const config = require('../config/env')

// Generate JWT Token
const generateToken = (id) => {
  return jwt.sign({ id }, config.jwtSecret, {
    expiresIn: config.jwtExpire,
  })
}

// @desc    Register a new user
// @route   POST /api/users/register
// @access  Public
const registerUser = async (req, res, next) => {
  try {
    const { username, email, password, fullName } = req.body

    // Check if user already exists
    const userExists = await User.findOne({ $or: [{ email }, { username }] })

    if (userExists) {
      return res.status(400).json({
        success: false,
        message: 'User with this email or username already exists',
      })
    }

    // Create user
    const user = await User.create({
      username,
      email,
      password,
      fullName,
    })

    if (user) {
      res.status(201).json({
        success: true,
        data: {
          _id: user._id,
          username: user.username,
          email: user.email,
          fullName: user.fullName,
          token: generateToken(user._id),
        },
      })
    }
  } catch (error) {
    next(error)
  }
}

// @desc    Authenticate user & get token
// @route   POST /api/users/login
// @access  Public
const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body

    // Check for user and include password
    const user = await User.findOne({ email }).select('+password')

    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials',
      })
    }

    // Check password
    const isPasswordMatch = await user.comparePassword(password)

    if (!isPasswordMatch) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials',
      })
    }

    res.json({
      success: true,
      data: {
        _id: user._id,
        username: user.username,
        email: user.email,
        fullName: user.fullName,
        profilePicture: user.profilePicture,
        token: generateToken(user._id),
      },
    })
  } catch (error) {
    next(error)
  }
}

// @desc    Get user profile
// @route   GET /api/users/:id
// @access  Public
const getUserProfile = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id)
      .populate('followers', 'username profilePicture')
      .populate('following', 'username profilePicture')
      .populate('posts')

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      })
    }

    res.json({
      success: true,
      data: user,
    })
  } catch (error) {
    next(error)
  }
}

// @desc    Update user profile
// @route   PUT /api/users/:id
// @access  Private
const updateUserProfile = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id)

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      })
    }

    // Update fields
    user.fullName = req.body.fullName || user.fullName
    user.bio = req.body.bio || user.bio
    user.profilePicture = req.body.profilePicture || user.profilePicture

    const updatedUser = await user.save()

    res.json({
      success: true,
      data: updatedUser,
    })
  } catch (error) {
    next(error)
  }
}

// @desc    Delete user
// @route   DELETE /api/users/:id
// @access  Private
const deleteUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id)

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      })
    }

    await user.deleteOne()

    res.json({
      success: true,
      message: 'User deleted successfully',
    })
  } catch (error) {
    next(error)
  }
}

// @desc    Follow/Unfollow user
// @route   POST /api/users/:id/follow
// @access  Private
const followUser = async (req, res, next) => {
  try {
    const userToFollow = await User.findById(req.params.id)
    const currentUser = await User.findById(req.body.userId)

    if (!userToFollow || !currentUser) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      })
    }

    // Check if already following
    const isFollowing = currentUser.following.includes(req.params.id)

    if (isFollowing) {
      // Unfollow
      currentUser.following = currentUser.following.filter(
        (id) => id.toString() !== req.params.id
      )
      userToFollow.followers = userToFollow.followers.filter(
        (id) => id.toString() !== req.body.userId
      )
    } else {
      // Follow
      currentUser.following.push(req.params.id)
      userToFollow.followers.push(req.body.userId)
    }

    await currentUser.save()
    await userToFollow.save()

    res.json({
      success: true,
      message: isFollowing ? 'Unfollowed successfully' : 'Followed successfully',
      data: { isFollowing: !isFollowing },
    })
  } catch (error) {
    next(error)
  }
}

// @desc    Get all users
// @route   GET /api/users
// @access  Public
const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find({}).select('-password')

    res.json({
      success: true,
      count: users.length,
      data: users,
    })
  } catch (error) {
    next(error)
  }
}

module.exports = {
  registerUser,
  loginUser,
  getUserProfile,
  updateUserProfile,
  deleteUser,
  followUser,
  getAllUsers,
}
