import './navbar.css'

function Navbar() {
	return (
		<header className="navbar">
			<div className="brand">FotoGram</div>

			<nav className="nav-links" aria-label="Primary">
				<a href="#home">Home</a>
				<a href="#about">About</a>
				<a href="#contact">Contact</a>
				<a href="#login">Login</a>
				<a href="#signup">Signup</a>
			</nav>

			<div className="nav-actions">
				<a className="btn ghost" href="#login">
					Log in
				</a>
				<a className="btn solid" href="#signup">
					Join now
				</a>
			</div>
		</header>
	)
}

export default Navbar
