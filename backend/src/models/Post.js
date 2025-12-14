const mongoose = require('mongoose')

const postSchema = new mongoose.Schema(
  {
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Post must have an author'],
    },
    caption: {
      type: String,
      trim: true,
      maxlength: [2200, 'Caption cannot exceed 2200 characters'],
    },
    image: {
      type: String,
      required: [true, 'Post must have an image'],
    },
    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
    comments: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'User',
          required: true,
        },
        text: {
          type: String,
          required: [true, 'Comment text is required'],
          maxlength: [500, 'Comment cannot exceed 500 characters'],
        },
        createdAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
    tags: [
      {
        type: String,
        trim: true,
      },
    ],
    location: {
      type: String,
      trim: true,
    },
    isArchived: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
)

// Index for faster queries
postSchema.index({ author: 1, createdAt: -1 })
postSchema.index({ tags: 1 })

// Virtual for like count
postSchema.virtual('likeCount').get(function () {
  return this.likes.length
})

// Virtual for comment count
postSchema.virtual('commentCount').get(function () {
  return this.comments.length
})

// Ensure virtuals are included when converting to JSON
postSchema.set('toJSON', { virtuals: true })
postSchema.set('toObject', { virtuals: true })

const Post = mongoose.model('Post', postSchema)

module.exports = Post
