function CommentList({ comments = [] }) {
  if (!comments.length) return <p className="muted">No comments yet.</p>
  return (
    <ul className="comments">
      {comments.map((comment, idx) => (
        <li key={idx}>{comment}</li>
      ))}
    </ul>
  )
}

export default CommentList
