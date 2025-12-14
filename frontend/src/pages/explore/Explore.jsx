import './Explore.css'

function Explore() {
  return (
    <section className="section" id="explore">
      <div className="section-header">
        <p className="eyebrow">Explore</p>
        <h2>Discover what's trending</h2>
        <p className="subtitle">
          Browse curated content from creators around the world. Find inspiration, connect with new voices, and explore stories that matter to you.
        </p>
      </div>
      <div className="feature-grid">
        <div className="feature-card">
          <div className="icon">🎨</div>
          <h3>Creative Content</h3>
          <p>From photography to digital art, discover stunning visual stories that inspire and captivate.</p>
        </div>
        <div className="feature-card">
          <div className="icon">🌍</div>
          <h3>Global Community</h3>
          <p>Connect with creators from every corner of the globe sharing their unique perspectives.</p>
        </div>
        <div className="feature-card">
          <div className="icon">🔥</div>
          <h3>Trending Now</h3>
          <p>Stay up to date with the latest viral moments, trending topics, and popular creators.</p>
        </div>
      </div>
    </section>
  )
}

export default Explore
