function Contact() {
  return (
    <section className="section contact" id="contact">
      <div>
        <p className="eyebrow">Contact</p>
        <h2>Let&apos;s build the next story together</h2>
        <p className="subtitle">
          Questions, collaborations, or feedback? Drop us a line and we&apos;ll get back fast.
        </p>
      </div>
      <div className="contact-card">
        <div className="contact-row">
          <span>Support</span>
          <a href="mailto:support@fotogram.app">support@fotogram.app</a>
        </div>
        <div className="contact-row">
          <span>Partnerships</span>
          <a href="mailto:hello@fotogram.app">hello@fotogram.app</a>
        </div>
        <div className="contact-row">
          <span>Community</span>
          <a href="https://community.fotogram.app" target="_blank" rel="noreferrer">
            community.fotogram.app
          </a>
        </div>
      </div>
    </section>
  )
}

export default Contact
