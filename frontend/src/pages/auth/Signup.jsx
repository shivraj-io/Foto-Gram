import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Button from '../../components/common/Button'
import Input from '../../components/common/Input'
import { useAuthContext } from '../../context/AuthContext'
import './auth.css'

function Signup() {
  const navigate = useNavigate()
  const { register } = useAuthContext()
  const [formData, setFormData] = useState({
    fullName: '',
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
    setError('')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    // Validation
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match')
      return
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters')
      return
    }

    setLoading(true)

    try {
      const { confirmPassword, ...registerData } = formData
      const result = await register(registerData)
      if (result.success) {
        navigate('/')
      } else {
        setError(result.message || 'Registration failed')
      }
    } catch (err) {
      setError(err.message || 'An error occurred during registration')
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="section auth" id="signup">
      <div className="section-header">
        <p className="eyebrow">Signup</p>
        <h2>Join the FotoGram community</h2>
        <p className="subtitle">
          Create your account to publish stories, connect with friends, and grow your audience.
        </p>
      </div>
      <div className="form-card">
        <form className="form" onSubmit={handleSubmit}>
          {error && <div className="error-message" style={{ color: '#ef4444', marginBottom: '1rem' }}>{error}</div>}
          <Input
            label="Full name"
            type="text"
            name="fullName"
            placeholder="Alex Doe"
            value={formData.fullName}
            onChange={handleChange}
            required
          />
          <Input
            label="Username"
            type="text"
            name="username"
            placeholder="alexdoe"
            value={formData.username}
            onChange={handleChange}
            required
          />
          <Input
            label="Email"
            type="email"
            name="email"
            placeholder="you@example.com"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <Input
            label="Password"
            type="password"
            name="password"
            placeholder="Create a password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <Input
            label="Confirm password"
            type="password"
            name="confirmPassword"
            placeholder="Repeat your password"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />
          <Button type="submit" className="btn solid full" disabled={loading}>
            {loading ? 'Creating account...' : 'Create account'}
          </Button>
          <p className="muted">
            Already have an account? <Link to="/login">Log in</Link>
          </p>
        </form>
      </div>
    </section>
  )
}

export default Signup
