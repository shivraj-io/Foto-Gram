const Post = require('../models/Post')
const User = require('../models/User')

/**
 * Service layer for post-related business logic
 * Separates complex business logic from controllers
 */

// Get feed posts for a user (posts from users they follow)
const getFeedPosts = async (userId, page = 1, limit = 10) => {
  try {
    const user = await User.findById(userId)

    if (!user) {
      throw new Error('User not found')
    }

    const skip = (page - 1) * limit

    // Get posts from users that the current user follows
    const posts = await Post.find({
      author: { $in: user.following },
      isArchived: false,
    })
      .populate('author', 'username profilePicture')
      .populate('comments.user', 'username profilePicture')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)

    return posts
  } catch (error) {
    throw error
  }
}

// Get trending posts (most liked in last 7 days)
const getTrendingPosts = async (limit = 10) => {
  try {
    const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)

    const posts = await Post.aggregate([
      {
        $match: {
          createdAt: { $gte: sevenDaysAgo },
          isArchived: false,
        },
      },
      {
        $addFields: {
          likeCount: { $size: '$likes' },
        },
      },
      {
        $sort: { likeCount: -1 },
      },
      {
        $limit: limit,
      },
    ])

    // Populate author details
    await Post.populate(posts, { path: 'author', select: 'username profilePicture' })

    return posts
  } catch (error) {
    throw error
  }
}

// Search posts by tags or caption
const searchPosts = async (query, page = 1, limit = 10) => {
  try {
    const skip = (page - 1) * limit

    const posts = await Post.find({
      $or: [
        { tags: { $regex: query, $options: 'i' } },
        { caption: { $regex: query, $options: 'i' } },
      ],
      isArchived: false,
    })
      .populate('author', 'username profilePicture')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)

    return posts
  } catch (error) {
    throw error
  }
}

// Archive/Unarchive post
const toggleArchivePost = async (postId, userId) => {
  try {
    const post = await Post.findById(postId)

    if (!post) {
      throw new Error('Post not found')
    }

    if (post.author.toString() !== userId) {
      throw new Error('Not authorized')
    }

    post.isArchived = !post.isArchived
    await post.save()

    return post
  } catch (error) {
    throw error
  }
}

// Get post statistics
const getPostStats = async (postId) => {
  try {
    const post = await Post.findById(postId)

    if (!post) {
      throw new Error('Post not found')
    }

    return {
      likeCount: post.likes.length,
      commentCount: post.comments.length,
      createdAt: post.createdAt,
      updatedAt: post.updatedAt,
    }
  } catch (error) {
    throw error
  }
}

module.exports = {
  getFeedPosts,
  getTrendingPosts,
  searchPosts,
  toggleArchivePost,
  getPostStats,
}
