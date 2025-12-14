import apiClient from './api'

const userService = {
  // Get all users
  getAllUsers: async () => {
    return await apiClient.get('/users')
  },

  // Get user profile by ID
  getUserProfile: async (userId) => {
    return await apiClient.get(`/users/${userId}`)
  },

  // Update user profile
  updateProfile: async (userId, userData) => {
    return await apiClient.put(`/users/${userId}`, userData)
  },

  // Delete user
  deleteUser: async (userId) => {
    return await apiClient.delete(`/users/${userId}`)
  },

  // Follow/Unfollow user
  followUser: async (userId, currentUserId) => {
    return await apiClient.post(`/users/${userId}/follow`, { userId: currentUserId })
  },
}

export default userService
