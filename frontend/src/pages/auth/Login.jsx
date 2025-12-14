import { Link } from 'react-router-dom'
import Button from '../../components/common/Button'
import Input from '../../components/common/Input'

function Login() {
  return (
    <section className="section auth" id="login">
      <div className="section-header">
        <p className="eyebrow">Login</p>
        <h2>Welcome back to FotoGram</h2>
        <p className="subtitle">Sign in to continue sharing the moments that matter most.</p>
      </div>
      <div className="form-card">
        <form className="form">
          <Input label="Email" type="email" name="email" placeholder="you@example.com" required />
          <Input label="Password" type="password" name="password" placeholder="••••••••" required />
          <div className="form-actions">
            <div className="remember">
              <input type="checkbox" id="remember" />
              <label htmlFor="remember">Remember me</label>
            </div>
            <a className="link" href="#">Forgot password?</a>
          </div>
          <Button type="submit" className="btn solid full">
            Log in
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
