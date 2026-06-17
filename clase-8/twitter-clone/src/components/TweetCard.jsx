import { useState } from 'react'

function TweetCard({ tweet }) {
  const [likes, setLikes] = useState(tweet.likes)
  const [isLiked, setIsLiked] = useState(false)

  const handleLike = () => {
    if (isLiked) {
      setLikes(likes - 1)
    } else {
      setLikes(likes + 1)
    }
    setIsLiked(!isLiked)
  }

  return (
    <div className="tweet-card">
      <div className="tweet-header">
        <div className="tweet-avatar">
          {tweet.author[0].toUpperCase()}
        </div>
        <div className="tweet-author">
          <span className="tweet-username">@{tweet.author}</span>
          <span className="tweet-time">hace 2h</span>
        </div>
      </div>
      <p className="tweet-content">{tweet.content}</p>
      <div className="tweet-actions">
        <button className="action-btn" onClick={handleLike}>
          <span className="action-icon">❤️</span>
          <span className="action-count">{likes}</span>
        </button>
        <button className="action-btn">
          <span className="action-icon">🔄</span>
          <span className="action-count">{tweet.retweets}</span>
        </button>
      </div>

      <style>{`
        .tweet-card {
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.06);
          border-radius: 16px;
          padding: 1.2rem 1.5rem;
          transition: all 0.3s;
        }

        .tweet-card:hover {
          background: rgba(255, 255, 255, 0.05);
          border-color: rgba(255, 255, 255, 0.1);
        }

        .tweet-header {
          display: flex;
          gap: 0.8rem;
          margin-bottom: 0.8rem;
        }

        .tweet-avatar {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background: linear-gradient(135deg, #7b61ff, #1da1f2);
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 700;
          color: white;
          font-size: 0.9rem;
          flex-shrink: 0;
        }

        .tweet-author {
          display: flex;
          flex-direction: column;
        }

        .tweet-username {
          font-weight: 600;
          color: #e8e8f0;
        }

        .tweet-time {
          font-size: 0.75rem;
          color: #6b6b80;
        }

        .tweet-content {
          color: #e8e8f0;
          margin-bottom: 0.8rem;
          line-height: 1.5;
        }

        .tweet-actions {
          display: flex;
          gap: 2rem;
        }

        .action-btn {
          background: none;
          border: none;
          color: #6b6b80;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 0.4rem;
          transition: all 0.3s;
          padding: 0.2rem 0.5rem;
          border-radius: 20px;
        }

        .action-btn:hover {
          color: #e8e8f0;
          background: rgba(255, 255, 255, 0.05);
        }

        .action-icon {
          font-size: 1.1rem;
        }

        .action-count {
          font-size: 0.85rem;
          font-weight: 500;
        }
      `}</style>
    </div>
  )
}

export default TweetCard