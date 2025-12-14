function StoryItem({ label = 'Story' }) {
  return (
    <div className="story-item">
      <div className="avatar" />
      <span>{label}</span>
    </div>
  )
}

export default StoryItem
