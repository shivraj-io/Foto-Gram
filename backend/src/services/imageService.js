const imagekit = require('../config/imagekit')

// Upload image to ImageKit
const uploadImage = async (file, folder = 'Foto Gram') => {
  try {
    console.log('ImageKit upload starting...')
    console.log('File size:', file.size)
    console.log('File mimetype:', file.mimetype)
    
    if (!file.buffer) {
      throw new Error('File buffer is missing')
    }

    console.log('ImageKit credentials check:')
    console.log('Public Key:', process.env.IMAGEKIT_PUBLIC_KEY ? 'Set' : 'Not set')
    console.log('Private Key:', process.env.IMAGEKIT_PRIVATE_KEY ? 'Set' : 'Not set')
    console.log('URL Endpoint:', process.env.IMAGEKIT_URL_ENDPOINT || 'Not set')

    const result = await imagekit.upload({
      file: file.buffer.toString('base64'),
      fileName: `${Date.now()}-${file.originalname}`,
      folder: folder,
    })

    console.log('ImageKit upload successful:', result.fileId)

    return {
      url: result.url,
      fileId: result.fileId,
      thumbnailUrl: result.thumbnailUrl,
    }
  } catch (error) {
    console.error('ImageKit upload error:', error)
    console.error('Error details:', error.message)
    
    if (error.message.includes('cannot be authenticated')) {
      throw new Error('ImageKit authentication failed. Please check your API keys in the .env file or visit https://imagekit.io/dashboard/developer/api-keys to get new credentials.')
    }
    
    throw new Error(`Image upload failed: ${error.message}`)
  }
}

// Delete image from ImageKit
const deleteImage = async (fileId) => {
  try {
    await imagekit.deleteFile(fileId)
    return true
  } catch (error) {
    throw new Error(`Image deletion failed: ${error.message}`)
  }
}

// Get ImageKit authentication parameters for client-side upload
const getAuthParams = () => {
  try {
    const authenticationParameters = imagekit.getAuthenticationParameters()
    return authenticationParameters
  } catch (error) {
    throw new Error(`Failed to get auth params: ${error.message}`)
  }
}

module.exports = {
  uploadImage,
  deleteImage,
  getAuthParams,
}
