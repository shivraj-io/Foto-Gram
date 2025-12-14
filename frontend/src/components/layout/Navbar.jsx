import { Link, useNavigate } from 'react-router-dom'
import { useAuthContext } from '../../context/AuthContext'
import './navbar.css'

function Navbar() {
	const { user, logout, isAuthenticated } = useAuthContext()
	const navigate = useNavigate()

	const handleLogout = () => {
		logout()
		navigate('/login')
	}

	return (
		<header className="navbar">
			<Link to="/" className="brand" aria-label="FotoGram home">
				FotoGram
			</Link>

			<nav className="nav-links" aria-label="Primary">
				<Link to="/">Home</Link>
				<Link to="/explore">Explore</Link>
				{isAuthenticated && <Link to="/profile">Profile</Link>}
			</nav>

			<div className="nav-actions">
				{isAuthenticated ? (
					<>
						<span style={{ color: '#cbd5e1', marginRight: '1rem' }}>
							Hi, {user?.username || user?.fullName || 'User'}
						</span>
						<button className="btn ghost" onClick={handleLogout}>
							Logout
						</button>
					</>
				) : (
					<>
						<Link className="btn ghost" to="/login">
							Log in
						</Link>
						<Link className="btn solid" to="/signup">
							Join now
						</Link>
					</>
				)}
			</div>
		</header>
	)
}

export default Navbar
