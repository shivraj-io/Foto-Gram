function Feed() {
  return (
    <section className="hero" id="feed">
      <div className="hero-copy">
        <span className="pill">New • FotoGram</span>
        <h1>
          Capture moments, curate stories, <span>share your world.</span>
        </h1>
        <p className="subtitle">
          FotoGram is a sleek Instagram-style experience for creators and friends—fast, beautiful, and
          focused on the moments that matter.
        </p>
        <div className="cta">
          <a className="btn solid" href="/signup">
            Get started free
          </a>
          <a className="btn ghost" href="/explore">
            See how it works
          </a>
        </div>
        <div className="stats">
          <div>
            <strong>2.3M</strong>
            <span>photos shared</span>
          </div>
          <div>
            <strong>98%</strong>
            <span>positive feedback</span>
          </div>
          <div>
            <strong>120k</strong>
            <span>daily creators</span>
          </div>
        </div>
      </div>
      <div className="hero-card">
        <div className="card-header">
          <div className="avatar" />
          <div>
            <p className="name">@fotogram.stories</p>
            <p className="time">Just now</p>
          </div>
          <span className="badge">Live</span>
        </div>
        <div className="card-image" />
        <div className="card-actions">
          <button aria-label="like">❤️</button>
          <button aria-label="comment">💬</button>
          <button aria-label="share">↗</button>
        </div>
      </div>
    </section>
  )
}

export default Feed
