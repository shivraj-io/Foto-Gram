const dotenv = require('dotenv')
const path = require('path')

// Load environment variables from .env file
dotenv.config({ path: path.join(__dirname, '../../.env') })

const config = {
  port: process.env.PORT || 5000,
  mongoUri: process.env.MONGO_URI || 'mongodb://localhost:27017/fotogram',
  nodeEnv: process.env.NODE_ENV || 'development',
  jwtSecret: process.env.JWT_SECRET || 'ca87820b72203ff8ca00bac4b413f1e0',
  jwtExpire: process.env.JWT_EXPIRE || '30d',
}

module.exports = config
