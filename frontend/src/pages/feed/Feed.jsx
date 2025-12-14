import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuthContext } from '../../context/AuthContext'
import postService from '../../services/postService'
import PostCard from '../../components/post/PostCard'
import PostHeader from '../../components/post/PostHeader'
import PostActions from '../../components/post/PostActions'
import Loader from '../../components/common/Loader'
import './Feed.css'

function Feed() {
  const { isAuthenticated, user } = useAuthContext()
  const navigate = useNavigate()
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    if (!isAuthenticated) {
      // Show landing page for non-authenticated users
      setLoading(false)
      return
    }

    // Fetch posts for authenticated users
    const fetchPosts = async () => {
      try {
        const response = await postService.getAllPosts()
        if (response.success) {
          setPosts(response.data)
        }
      } catch (err) {
        setError('Failed to load posts')
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchPosts()
  }, [isAuthenticated])

  const handleLike = async (postId) => {
    try {
      await postService.likePost(postId, user._id)
      // Refresh posts after like
      const response = await postService.getAllPosts()
      if (response.success) {
        setPosts(response.data)
      }
    } catch (err) {
      console.error('Failed to like post:', err)
    }
  }

  // Landing page for non-authenticated users
  if (!isAuthenticated) {
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
            <Link className="btn solid" to="/signup">
              Get started free
            </Link>
            <Link className="btn ghost" to="/explore">
              See how it works
            </Link>
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

  // Feed page for authenticated users
  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', padding: '4rem' }}>
        <Loader />
      </div>
    )
  }

  return (
    <div className="feed-container" style={{ maxWidth: '600px', margin: '0 auto', padding: '2rem 1rem' }}>
      {/* Stories Bar */}
      <div className="stories-section" style={{ marginBottom: '2rem', overflowX: 'auto' }}>
        <div style={{ display: 'flex', gap: '1rem', padding: '1rem 0' }}>
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} style={{ textAlign: 'center', minWidth: '80px' }}>
              <div
                style={{
                  width: '64px',
                  height: '64px',
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #f59e0b, #ec4899, #8b5cf6)',
                  padding: '3px',
                  margin: '0 auto 8px',
                }}
              >
                <div
                  style={{
                    width: '100%',
                    height: '100%',
                    borderRadius: '50%',
                    background: '#0f172a',
                  }}
                />
              </div>
              <p style={{ fontSize: '12px', color: '#cbd5e1' }}>user{i}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Create Post Button */}
      <div style={{ marginBottom: '2rem' }}>
        <button
          className="btn solid full"
          onClick={() => navigate('/create-post')}
          style={{ padding: '12px' }}
        >
          ➕ Create New Post
        </button>
      </div>

      {error && <p style={{ color: '#ef4444', textAlign: 'center' }}>{error}</p>}

      {/* Posts Feed */}
      <div className="posts-feed" style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
        {posts.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '3rem' }}>
            <p style={{ color: '#cbd5e1', marginBottom: '1rem' }}>No posts yet</p>
            <p style={{ color: '#64748b', fontSize: '14px' }}>
              Follow some users or create your first post!
            </p>
          </div>
        ) : (
          posts.map((post) => (
            <PostCard key={post._id}>
              <PostHeader
                username={post.author?.username || 'user'}
                time={new Date(post.createdAt).toLocaleDateString()}
              />
              
              {/* Post Image */}
              <div
                style={{
                  width: '100%',
                  height: '400px',
                  background: `url(${post.image}) center/cover`,
                  borderRadius: '12px',
                  margin: '12px 0',
                }}
              />

              {/* Post Actions */}
              <PostActions>
                <button
                  onClick={() => handleLike(post._id)}
                  style={{
                    color: post.likes?.includes(user?._id) ? '#ef4444' : 'inherit',
                  }}
                >
                  {post.likes?.includes(user?._id) ? '❤️' : '🤍'} {post.likes?.length || 0}
                </button>
                <button>💬 {post.comments?.length || 0}</button>
                <button>↗</button>
              </PostActions>

              {/* Caption */}
              {post.caption && (
                <div style={{ marginTop: '12px', padding: '0 8px' }}>
                  <p style={{ color: '#e2e8f0' }}>
                    <strong>@{post.author?.username}</strong> {post.caption}
                  </p>
                </div>
              )}

              {/* Tags */}
              {post.tags && post.tags.length > 0 && (
                <div style={{ marginTop: '8px', padding: '0 8px' }}>
                  {post.tags.map((tag, idx) => (
                    <span
                      key={idx}
                      style={{
                        color: '#06b6d4',
                        marginRight: '8px',
                        fontSize: '14px',
                      }}
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              )}
            </PostCard>
          ))
        )}
      </div>
    </div>
  )
}

export default Feed
