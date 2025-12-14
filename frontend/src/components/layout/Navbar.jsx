import { Link } from 'react-router-dom'
import './navbar.css'

function Navbar() {
	return (
		<header className="navbar">
			<div className="brand">FotoGram</div>

			<nav className="nav-links" aria-label="Primary">
				<Link to="/">Home</Link>
				<Link to="/explore">Explore</Link>
				<Link to="/profile">Profile</Link>
			</nav>

			<div className="nav-actions">
				<Link className="btn ghost" to="/login">
					Log in
				</Link>
				<Link className="btn solid" to="/signup">
					Join now
				</Link>
			</div>
		</header>
	)
}

export default Navbar
