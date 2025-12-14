const express = require('express')
const cors = require('cors')
const errorMiddleware = require('./middleware/errorMiddleware')
const userRoutes = require('./routes/userRoutes')
const postRoutes = require('./routes/postRoutes')

const app = express()

// Middleware
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Request logging in development
if (process.env.NODE_ENV === 'development') {
  app.use((req, res, next) => {
    console.log(`${req.method} ${req.path}`)
    next()
  })
}

// Routes
app.use('/api/users', userRoutes)
app.use('/api/posts', postRoutes)

// Health check route
app.get('/api/health', (req, res) => {
  res.json({
    success: true,
    message: 'FotoGram API is running',
    timestamp: new Date().toISOString(),
  })
})

// Root route
app.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'Welcome to FotoGram API',
    version: '1.0.0',
  })
})

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found',
  })
})

// Error handling middleware (must be last)
app.use(errorMiddleware)

module.exports = app
