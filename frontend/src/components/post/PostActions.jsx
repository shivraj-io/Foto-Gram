import './post.css'

function PostActions({ children }) {
  return (
    <div className="post-actions">
      {children || (
        <>
          <button aria-label="like">❤️</button>
          <button aria-label="comment">💬</button>
          <button aria-label="share">↗</button>
        </>
      )}
    </div>
  )
}

export default PostActions
