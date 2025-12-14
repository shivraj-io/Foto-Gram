const ImageKit = require('imagekit')
const config = require('./env')

// Initialize ImageKit
const imagekit = new ImageKit({
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY || 'public_gFLYV1K3epWQS6yiBAK0lpUgf6c=',
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY || 'private_9m9b8R7TtAbO4lAu9hTpi+VjBaw=',
  urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT || 'https://ik.imagekit.io/shivraj',
})

module.exports = imagekit
