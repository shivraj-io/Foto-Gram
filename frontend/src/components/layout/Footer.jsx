import { Link } from 'react-router-dom'

function Footer() {
  return (
    <footer className="footer">
      <p>© {new Date().getFullYear()} FotoGram. Capture the moment.</p>
      <div className="footer-links">
        <Link to="/">Home</Link>
        <Link to="/explore">Explore</Link>
        <Link to="/profile">Profile</Link>
        <Link to="/login">Login</Link>
        <Link to="/signup">Signup</Link>
      </div>
    </footer>
  )
}

export default Footer
