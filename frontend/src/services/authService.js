import apiClient from './api'

const authService = {
  // Register new user
  register: async (userData) => {
    const response = await apiClient.post('/users/register', userData)
    if (response.success && response.data.token) {
      localStorage.setItem('token', response.data.token)
      localStorage.setItem('user', JSON.stringify(response.data))
    }
    return response
  },

  // Login user
  login: async (credentials) => {
    const response = await apiClient.post('/users/login', credentials)
    if (response.success && response.data.token) {
      localStorage.setItem('token', response.data.token)
      localStorage.setItem('user', JSON.stringify(response.data))
    }
    return response
  },

  // Logout user
  logout: () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
  },

  // Get current user from localStorage
  getCurrentUser: () => {
    const user = localStorage.getItem('user')
    return user ? JSON.parse(user) : null
  },

  // Check if user is authenticated
  isAuthenticated: () => {
    return !!localStorage.getItem('token')
  },
}

export default authService
