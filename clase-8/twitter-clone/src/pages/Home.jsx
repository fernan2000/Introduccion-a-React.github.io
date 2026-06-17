import { useState } from 'react'
import TweetCard from '../components/TweetCard'

function Home({ user }) {
  const [tweets, setTweets] = useState([
    { id: 1, author: 'juanperez', content: '¡Hola mundo! Este es mi primer tweet 🐦', likes: 5, retweets: 2 },
    { id: 2, author: 'maria_dev', content: 'Aprendiendo React y me encanta! ❤️', likes: 12, retweets: 4 },
    { id: 3, author: 'carlos123', content: '¿Alguien más trabajando en un proyecto de React? 🔥', likes: 8, retweets: 3 },
  ])

  const [newTweet, setNewTweet] = useState('')

  const handleTweet = () => {
    if (newTweet.trim() && user) {
      const tweet = {
        id: Date.now(),
        author: user.username,
        content: newTweet.trim(),
        likes: 0,
        retweets: 0
      }
      setTweets([tweet, ...tweets])
      setNewTweet('')
    }
  }

  return (
    <div className="home-page">
      {/* Área de tweet */}
      {user ? (
        <div className="tweet-area">
          <div className="tweet-input-container">
            <div className="user-avatar">{user.username[0].toUpperCase()}</div>
            <input
              type="text"
              placeholder="¿Qué está pasando?"
              value={newTweet}
              onChange={(e) => setNewTweet(e.target.value)}
              className="tweet-input"
              onKeyDown={(e) => e.key === 'Enter' && handleTweet()}
            />
            <button 
              onClick={handleTweet} 
              className="btn-tweet"
              disabled={!newTweet.trim()}
            >
              Tweet
            </button>
          </div>
        </div>
      ) : (
        <div className="login-prompt">
          <p>🔒 Inicia sesión para publicar tweets</p>
        </div>
      )}

      {/* Lista de tweets */}
      <div className="tweets-container">
        {tweets.map(tweet => (
          <TweetCard key={tweet.id} tweet={tweet} />
        ))}
      </div>

      <style>{`
        .home-page {
          max-width: 600px;
          margin: 0 auto;
        }

        .tweet-area {
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 16px;
          padding: 1.2rem;
          margin-bottom: 2rem;
        }

        .tweet-input-container {
          display: flex;
          gap: 0.8rem;
          align-items: flex-start;
        }

        .user-avatar {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: linear-gradient(135deg, #7b61ff, #1da1f2);
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 700;
          color: white;
          flex-shrink: 0;
        }

        .tweet-input {
          flex: 1;
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 12px;
          padding: 0.8rem 1rem;
          color: #e8e8f0;
          font-size: 1rem;
          outline: none;
          transition: all 0.3s;
          min-height: 50px;
        }

        .tweet-input:focus {
          border-color: #1da1f2;
          box-shadow: 0 0 0 4px rgba(29, 161, 242, 0.1);
        }

        .tweet-input::placeholder {
          color: #6b6b80;
        }

        .btn-tweet {
          padding: 0.6rem 1.5rem;
          background: linear-gradient(135deg, #1da1f2, #1a8cd8);
          color: white;
          border: none;
          border-radius: 20px;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.3s;
          flex-shrink: 0;
          height: 50px;
        }

        .btn-tweet:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(29, 161, 242, 0.3);
        }

        .btn-tweet:disabled {
          opacity: 0.4;
          cursor: not-allowed;
        }

        .login-prompt {
          text-align: center;
          padding: 2rem;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 16px;
          color: #a0a0b8;
          margin-bottom: 2rem;
        }

        .tweets-container {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        @media (max-width: 480px) {
          .tweet-input-container {
            flex-wrap: wrap;
          }
          .btn-tweet {
            width: 100%;
          }
        }
      `}</style>
    </div>
  )
}

export default Home