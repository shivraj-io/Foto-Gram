import { Link } from 'react-router-dom'
import Button from '../../components/common/Button'
import Input from '../../components/common/Input'

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
          <Input label="Full name" type="text" name="name" placeholder="Alex Doe" required />
          <Input label="Email" type="email" name="email" placeholder="you@example.com" required />
          <Input label="Password" type="password" name="password" placeholder="Create a password" required />
          <Input
            label="Confirm password"
            type="password"
            name="confirm"
            placeholder="Repeat your password"
            required
          />
          <Button type="submit" className="btn solid full">
            Create account
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
