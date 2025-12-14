function PostHeader({ username = 'user', time = 'Just now' }) {
  return (
    <header className="post-header">
      <div className="avatar" />
      <div>
        <p className="name">@{username}</p>
        <p className="time">{time}</p>
      </div>
    </header>
  )
}

export default PostHeader
