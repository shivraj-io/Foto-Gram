import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthContext } from '../../context/AuthContext'
import Button from '../../components/common/Button'
import Input from '../../components/common/Input'
import './CreatePost.css'

function CreatePost() {
  const navigate = useNavigate()
  const { user } = useAuthContext()
  const [formData, setFormData] = useState({
    caption: '',
    tags: '',
    location: '',
  })
  const [imageFile, setImageFile] = useState(null)
  const [imagePreview, setImagePreview] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setError('Image size should be less than 5MB')
        return
      }
      setImageFile(file)
      setImagePreview(URL.createObjectURL(file))
      setError('')
    }
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!imageFile) {
      setError('Please select an image')
      return
    }

    setLoading(true)
    setError('')

    try {
      const formDataToSend = new FormData()
      formDataToSend.append('image', imageFile)
      formDataToSend.append('caption', formData.caption)
      formDataToSend.append('tags', formData.tags)
      formDataToSend.append('location', formData.location)
      formDataToSend.append('userId', user._id)

      console.log('Submitting post with userId:', user._id)
      console.log('Image file:', imageFile.name, imageFile.size, imageFile.type)

      const response = await fetch('http://localhost:5000/api/posts/upload', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: formDataToSend,
      })

      console.log('Response status:', response.status)
      const data = await response.json()
      console.log('Response data:', data)

      if (data.success) {
        navigate('/')
      } else {
        setError(data.message || 'Failed to create post')
      }
    } catch (err) {
      setError('An error occurred while creating post')
      console.error('Upload error:', err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="create-post-container">
      <div className="create-post-card">
        <h2>Create New Post</h2>
        
        {error && <div className="error-message">{error}</div>}

        <form onSubmit={handleSubmit}>
          {/* Image Upload */}
          <div className="image-upload-section">
            {imagePreview ? (
              <div className="image-preview">
                <img src={imagePreview} alt="Preview" />
                <button
                  type="button"
                  className="btn ghost"
                  onClick={() => {
                    setImageFile(null)
                    setImagePreview(null)
                  }}
                >
                  Remove Image
                </button>
              </div>
            ) : (
              <label className="upload-label">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  style={{ display: 'none' }}
                />
                <div className="upload-placeholder">
                  <span style={{ fontSize: '3rem' }}>📷</span>
                  <p>Click to upload image</p>
                  <p style={{ fontSize: '12px', color: '#64748b' }}>Max size: 5MB</p>
                </div>
              </label>
            )}
          </div>

          {/* Caption */}
          <div className="form-group">
            <label>Caption</label>
            <textarea
              name="caption"
              placeholder="Write a caption..."
              value={formData.caption}
              onChange={handleChange}
              rows="4"
              maxLength="2200"
            />
          </div>

          {/* Tags */}
          <Input
            label="Tags (comma separated)"
            name="tags"
            placeholder="nature, sunset, photography"
            value={formData.tags}
            onChange={handleChange}
          />

          {/* Location */}
          <Input
            label="Location (optional)"
            name="location"
            placeholder="New York, USA"
            value={formData.location}
            onChange={handleChange}
          />

          {/* Buttons */}
          <div className="form-actions" style={{ display: 'flex', gap: '1rem', marginTop: '2rem' }}>
            <Button type="submit" className="btn solid full" disabled={loading}>
              {loading ? 'Posting...' : 'Post'}
            </Button>
            <Button
              type="button"
              className="btn ghost full"
              onClick={() => navigate('/')}
            >
              Cancel
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default CreatePost
