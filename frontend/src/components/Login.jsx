function Login() {
  return (
    <section className="section auth" id="login">
      <div className="section-header">
        <p className="eyebrow">Login</p>
        <h2>Welcome back to FotoGram</h2>
        <p className="subtitle">
          Sign in to continue sharing the moments that matter most.
        </p>
      </div>
      <div className="form-card">
        <form className="form">
          <label>
            Email
            <input type="email" name="email" placeholder="you@example.com" required />
          </label>
          <label>
            Password
            <input type="password" name="password" placeholder="••••••••" required />
          </label>
          <div className="form-actions">
            <div className="remember">
              <input type="checkbox" id="remember" />
              <label htmlFor="remember">Remember me</label>
            </div>
            <a className="link" href="#">Forgot password?</a>
          </div>
          <button type="submit" className="btn solid full">
            Log in
          </button>
          <p className="muted">
            New here? <a href="#signup">Create an account</a>
          </p>
        </form>
      </div>
    </section>
  )
}

export default Login
