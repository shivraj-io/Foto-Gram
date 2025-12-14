const app = require('./app')
const connectDB = require('./config/db')
const config = require('./config/env')

// Connect to database
connectDB()

// Start server
const PORT = config.port

const server = app.listen(PORT, () => {
  console.log(`🚀 FotoGram server running on port ${PORT}`)
  console.log(`📍 Environment: ${config.nodeEnv}`)
  console.log(`🌐 API: http://localhost:${PORT}/api`)
})

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
  console.error(`Error: ${err.message}`)
  server.close(() => process.exit(1))
})

// Handle SIGTERM
process.on('SIGTERM', () => {
  console.log('SIGTERM received. Shutting down gracefully...')
  server.close(() => {
    console.log('Process terminated')
  })
})
