import apiClient from './api'

const postService = {
  // Get all posts
  getAllPosts: async () => {
    return await apiClient.get('/posts')
  },

  // Get single post by ID
  getPostById: async (postId) => {
    return await apiClient.get(`/posts/${postId}`)
  },

  // Get posts by user
  getPostsByUser: async (userId) => {
    return await apiClient.get(`/posts/user/${userId}`)
  },

  // Create new post
  createPost: async (postData) => {
    return await apiClient.post('/posts', postData)
  },

  // Update post
  updatePost: async (postId, postData) => {
    return await apiClient.put(`/posts/${postId}`, postData)
  },

  // Delete post
  deletePost: async (postId) => {
    return await apiClient.delete(`/posts/${postId}`)
  },

  // Like/Unlike post
  likePost: async (postId, userId) => {
    return await apiClient.post(`/posts/${postId}/like`, { userId })
  },

  // Add comment
  addComment: async (postId, commentData) => {
    return await apiClient.post(`/posts/${postId}/comment`, commentData)
  },

  // Delete comment
  deleteComment: async (postId, commentId, userId) => {
    return await apiClient.delete(`/posts/${postId}/comment/${commentId}`, { data: { userId } })
  },
}

export default postService
