import './post.css'

function PostHeader({ username = 'user', time = 'Just now', profilePicture = '' }) {
  return (
    <header className="post-header">
      <div
        className="avatar"
        style={{
          backgroundImage: profilePicture ? `url(${profilePicture})` : 'linear-gradient(135deg, #6366f1, #06b6d4)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      <div>
        <p className="name">@{username}</p>
        <p className="time">{time}</p>
      </div>
    </header>
  )
}

export default PostHeader
