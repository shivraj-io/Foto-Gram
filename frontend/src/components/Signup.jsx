function Signup() {
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
        <form className="form">
          <label>
            Full name
            <input type="text" name="name" placeholder="Alex Doe" required />
          </label>
          <label>
            Email
            <input type="email" name="email" placeholder="you@example.com" required />
          </label>
          <label>
            Password
            <input type="password" name="password" placeholder="Create a password" required />
          </label>
          <label>
            Confirm password
            <input type="password" name="confirm" placeholder="Repeat your password" required />
          </label>
          <button type="submit" className="btn solid full">
            Create account
          </button>
          <p className="muted">
            Already have an account? <a href="#login">Log in</a>
          </p>
        </form>
      </div>
    </section>
  )
}

export default Signup
