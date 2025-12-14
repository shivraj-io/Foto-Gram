import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Button from '../../components/common/Button'
import Input from '../../components/common/Input'
import { useAuthContext } from '../../context/AuthContext'
import './auth.css'

function Login() {
  const navigate = useNavigate()
  const { login } = useAuthContext()
  const [formData, setFormData] = useState({
    email: '',
    password: '',
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
    setLoading(true)

    try {
      const result = await login(formData)
      if (result.success) {
        navigate('/')
      } else {
        setError(result.message || 'Login failed')
      }
    } catch (err) {
      setError(err.message || 'An error occurred during login')
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="section auth" id="login">
      <div className="section-header">
        <p className="eyebrow">Login</p>
        <h2>Welcome back to FotoGram</h2>
        <p className="subtitle">Sign in to continue sharing the moments that matter most.</p>
      </div>
      <div className="form-card">
        <form className="form" onSubmit={handleSubmit}>
          {error && <div className="error-message" style={{ color: '#ef4444', marginBottom: '1rem' }}>{error}</div>}
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
            placeholder="••••••••"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <div className="form-actions">
            <div className="remember">
              <input type="checkbox" id="remember" />
              <label htmlFor="remember">Remember me</label>
            </div>
            <a className="link" href="#">Forgot password?</a>
          </div>
          <Button type="submit" className="btn solid full" disabled={loading}>
            {loading ? 'Logging in...' : 'Log in'}
          </Button>
          <p className="muted">
            New here? <Link to="/signup">Create an account</Link>
          </p>
        </form>
      </div>
    </section>
  )
}

export default Login
