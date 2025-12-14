function Footer() {
  return (
    <footer className="footer">
      <p>© {new Date().getFullYear()} FotoGram. Capture the moment.</p>
      <div className="footer-links">
        <a href="#home">Home</a>
        <a href="#about">About</a>
        <a href="#contact">Contact</a>
        <a href="#login">Login</a>
        <a href="#signup">Signup</a>
      </div>
    </footer>
  )
}

export default Footer
