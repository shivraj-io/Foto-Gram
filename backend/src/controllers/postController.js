const Post = require('../models/Post')
const User = require('../models/User')

// @desc    Create a new post
// @route   POST /api/posts
// @access  Private
const createPost = async (req, res, next) => {
  try {
    const { caption, image, tags, location } = req.body

    const post = await Post.create({
      author: req.body.userId, // Should come from auth middleware
      caption,
      image,
      tags,
      location,
    })

    // Add post to user's posts array
    await User.findByIdAndUpdate(req.body.userId, {
      $push: { posts: post._id },
    })

    const populatedPost = await Post.findById(post._id).populate(
      'author',
      'username profilePicture'
    )

    res.status(201).json({
      success: true,
      data: populatedPost,
    })
  } catch (error) {
    next(error)
  }
}

// @desc    Get all posts
// @route   GET /api/posts
// @access  Public
const getAllPosts = async (req, res, next) => {
  try {
    const posts = await Post.find({ isArchived: false })
      .populate('author', 'username profilePicture')
      .populate('comments.user', 'username profilePicture')
      .sort({ createdAt: -1 })

    res.json({
      success: true,
      count: posts.length,
      data: posts,
    })
  } catch (error) {
    next(error)
  }
}

// @desc    Get single post
// @route   GET /api/posts/:id
// @access  Public
const getPostById = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id)
      .populate('author', 'username profilePicture fullName')
      .populate('comments.user', 'username profilePicture')
      .populate('likes', 'username profilePicture')

    if (!post) {
      return res.status(404).json({
        success: false,
        message: 'Post not found',
      })
    }

    res.json({
      success: true,
      data: post,
    })
  } catch (error) {
    next(error)
  }
}

// @desc    Update post
// @route   PUT /api/posts/:id
// @access  Private
const updatePost = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id)

    if (!post) {
      return res.status(404).json({
        success: false,
        message: 'Post not found',
      })
    }

    // Check if user is the author
    if (post.author.toString() !== req.body.userId) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to update this post',
      })
    }

    // Update fields
    post.caption = req.body.caption || post.caption
    post.tags = req.body.tags || post.tags
    post.location = req.body.location || post.location

    const updatedPost = await post.save()

    res.json({
      success: true,
      data: updatedPost,
    })
  } catch (error) {
    next(error)
  }
}

// @desc    Delete post
// @route   DELETE /api/posts/:id
// @access  Private
const deletePost = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id)

    if (!post) {
      return res.status(404).json({
        success: false,
        message: 'Post not found',
      })
    }

    // Check if user is the author
    if (post.author.toString() !== req.body.userId) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to delete this post',
      })
    }

    await post.deleteOne()

    // Remove post from user's posts array
    await User.findByIdAndUpdate(req.body.userId, {
      $pull: { posts: req.params.id },
    })

    res.json({
      success: true,
      message: 'Post deleted successfully',
    })
  } catch (error) {
    next(error)
  }
}

// @desc    Like/Unlike a post
// @route   POST /api/posts/:id/like
// @access  Private
const likePost = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id)

    if (!post) {
      return res.status(404).json({
        success: false,
        message: 'Post not found',
      })
    }

    const userId = req.body.userId
    const hasLiked = post.likes.includes(userId)

    if (hasLiked) {
      // Unlike
      post.likes = post.likes.filter((id) => id.toString() !== userId)
    } else {
      // Like
      post.likes.push(userId)
    }

    await post.save()

    res.json({
      success: true,
      message: hasLiked ? 'Post unliked' : 'Post liked',
      data: { likes: post.likes.length, hasLiked: !hasLiked },
    })
  } catch (error) {
    next(error)
  }
}

// @desc    Add comment to post
// @route   POST /api/posts/:id/comment
// @access  Private
const addComment = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id)

    if (!post) {
      return res.status(404).json({
        success: false,
        message: 'Post not found',
      })
    }

    const comment = {
      user: req.body.userId,
      text: req.body.text,
    }

    post.comments.push(comment)
    await post.save()

    const populatedPost = await Post.findById(post._id).populate(
      'comments.user',
      'username profilePicture'
    )

    res.json({
      success: true,
      data: populatedPost.comments,
    })
  } catch (error) {
    next(error)
  }
}

// @desc    Delete comment from post
// @route   DELETE /api/posts/:id/comment/:commentId
// @access  Private
const deleteComment = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id)

    if (!post) {
      return res.status(404).json({
        success: false,
        message: 'Post not found',
      })
    }

    const comment = post.comments.id(req.params.commentId)

    if (!comment) {
      return res.status(404).json({
        success: false,
        message: 'Comment not found',
      })
    }

    // Check if user is the comment author
    if (comment.user.toString() !== req.body.userId) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to delete this comment',
      })
    }

    comment.deleteOne()
    await post.save()

    res.json({
      success: true,
      message: 'Comment deleted successfully',
    })
  } catch (error) {
    next(error)
  }
}

// @desc    Get posts by user
// @route   GET /api/posts/user/:userId
// @access  Public
const getPostsByUser = async (req, res, next) => {
  try {
    const posts = await Post.find({
      author: req.params.userId,
      isArchived: false,
    })
      .populate('author', 'username profilePicture')
      .sort({ createdAt: -1 })

    res.json({
      success: true,
      count: posts.length,
      data: posts,
    })
  } catch (error) {
    next(error)
  }
}

module.exports = {
  createPost,
  getAllPosts,
  getPostById,
  updatePost,
  deletePost,
  likePost,
  addComment,
  deleteComment,
  getPostsByUser,
}
