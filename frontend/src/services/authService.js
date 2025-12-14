import { apiClient } from './api'

export const authService = {
  login: (data) => apiClient.post('/login', data),
  signup: (data) => apiClient.post('/signup', data),
}
