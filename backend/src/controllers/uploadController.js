const Post = require('../models/Post')
const User = require('../models/User')
const { uploadImage } = require('../services/imageService')

// @desc    Upload image and create post
// @route   POST /api/posts/upload
// @access  Private
const uploadPost = async (req, res, next) => {
  try {
    console.log('Upload request received')
    console.log('File:', req.file)
    console.log('Body:', req.body)

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'Please upload an image',
      })
    }

    const { caption, tags, location, userId } = req.body

    if (!userId) {
      return res.status(400).json({
        success: false,
        message: 'User ID is required',
      })
    }

    // Upload image to ImageKit
    console.log('Uploading to ImageKit...')
    const uploadResult = await uploadImage(req.file, 'posts')
    console.log('ImageKit upload result:', uploadResult)

    // Parse tags if it's a string
    const parsedTags = typeof tags === 'string' && tags ? tags.split(',').map(tag => tag.trim()).filter(tag => tag) : []

    console.log('Creating post...')
    const post = await Post.create({
      author: userId,
      caption: caption || '',
      image: uploadResult.url,
      tags: parsedTags,
      location: location || '',
    })

    // Add post to user's posts array
    await User.findByIdAndUpdate(userId, {
      $push: { posts: post._id },
    })

    const populatedPost = await Post.findById(post._id).populate(
      'author',
      'username profilePicture'
    )

    console.log('Post created successfully:', populatedPost._id)

    res.status(201).json({
      success: true,
      data: populatedPost,
    })
  } catch (error) {
    console.error('Upload error:', error)
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to upload post',
      error: process.env.NODE_ENV === 'development' ? error.stack : undefined,
    })
  }
}

// @desc    Get ImageKit auth parameters
// @route   GET /api/posts/imagekit-auth
// @access  Private
const getImageKitAuth = async (req, res, next) => {
  try {
    const { getAuthParams } = require('../services/imageService')
    const authParams = getAuthParams()
    
    res.json({
      success: true,
      data: authParams,
    })
  } catch (error) {
    next(error)
  }
}

module.exports = {
  uploadPost,
  getImageKitAuth,
}
