function About() {
  return (
    <section className="section" id="about">
      <div className="section-header">
        <p className="eyebrow">About FotoGram</p>
        <h2>A modern space for visual storytelling</h2>
        <p className="subtitle">
          Built with creators in mind—clean layouts, fast interactions, and privacy-first controls.
        </p>
      </div>
      <div className="feature-grid">
        <div className="feature-card">
          <div className="icon">✨</div>
          <h3>Beautiful feeds</h3>
          <p>Edge-to-edge media, rich captions, and a calm, distraction-free UI.</p>
        </div>
        <div className="feature-card">
          <div className="icon">🔒</div>
          <h3>Privacy first</h3>
          <p>Granular controls for who sees your stories, posts, and messages.</p>
        </div>
        <div className="feature-card">
          <div className="icon">⚡</div>
          <h3>Lightning fast</h3>
          <p>Optimized for speed with smooth scrolling, instant uploads, and offline-ready saves.</p>
        </div>
      </div>
    </section>
  )
}

export default About
