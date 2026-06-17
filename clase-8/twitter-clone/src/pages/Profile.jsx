import { useState } from 'react'

function Profile({ user }) {
  const [bio, setBio] = useState('Desarrollador React | Amante del código 🚀')
  const [isEditing, setIsEditing] = useState(false)

  const tweetsCount = 42
  const followers = 156
  const following = 89

  const handleSaveBio = () => {
    setIsEditing(false)
  }

  return (
    <div className="profile-page">
      <div className="profile-header">
        <div className="profile-avatar">
          {user.username[0].toUpperCase()}
        </div>
        <h1 className="profile-name">@{user.username}</h1>
        <div className="profile-stats">
          <div className="stat">
            <span className="stat-number">{tweetsCount}</span>
            <span className="stat-label">Tweets</span>
          </div>
          <div className="stat">
            <span className="stat-number">{followers}</span>
            <span className="stat-label">Seguidores</span>
          </div>
          <div className="stat">
            <span className="stat-number">{following}</span>
            <span className="stat-label">Siguiendo</span>
          </div>
        </div>
      </div>

      <div className="profile-bio">
        <div className="bio-header">
          <h3>Biografía</h3>
          {!isEditing ? (
            <button onClick={() => setIsEditing(true)} className="btn-edit">
              ✏️ Editar
            </button>
          ) : (
            <button onClick={handleSaveBio} className="btn-save">
              💾 Guardar
            </button>
          )}
        </div>
        {isEditing ? (
          <textarea
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            className="bio-textarea"
            rows={3}
          />
        ) : (
          <p className="bio-text">{bio}</p>
        )}
      </div>

      <div className="profile-info">
        <div className="info-item">
          <span className="info-label">📅 Miembro desde</span>
          <span className="info-value">Diciembre 2024</span>
        </div>
        <div className="info-item">
          <span className="info-label">🔒 Sesión iniciada</span>
          <span className="info-value">
            {new Date(user.loginTime).toLocaleString()}
          </span>
        </div>
      </div>

      <style>{`
        .profile-page {
          max-width: 600px;
          margin: 0 auto;
        }

        .profile-header {
          text-align: center;
          padding: 2rem;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 16px;
          margin-bottom: 1.5rem;
        }

        .profile-avatar {
          width: 80px;
          height: 80px;
          border-radius: 50%;
          background: linear-gradient(135deg, #7b61ff, #1da1f2);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 2.5rem;
          font-weight: 700;
          color: white;
          margin: 0 auto 1rem;
        }

        .profile-name {
          font-size: 1.8rem;
          background: linear-gradient(135deg, #7b61ff, #1da1f2);
          background-clip: text;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .profile-stats {
          display: flex;
          justify-content: center;
          gap: 3rem;
          margin-top: 1rem;
        }

        .stat {
          text-align: center;
        }

        .stat-number {
          display: block;
          font-size: 1.5rem;
          font-weight: 700;
          color: #e8e8f0;
        }

        .stat-label {
          font-size: 0.75rem;
          color: #6b6b80;
          text-transform: uppercase;
        }

        .profile-bio {
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 16px;
          padding: 1.5rem;
          margin-bottom: 1.5rem;
        }

        .bio-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 0.8rem;
        }

        .bio-header h3 {
          color: #a0a0b8;
          font-size: 0.9rem;
        }

        .btn-edit {
          background: rgba(255, 255, 255, 0.06);
          color: #a0a0b8;
          border: 1px solid rgba(255, 255, 255, 0.08);
          padding: 0.3rem 0.8rem;
          border-radius: 8px;
          cursor: pointer;
          transition: all 0.3s;
          font-size: 0.8rem;
        }

        .btn-edit:hover {
          background: rgba(255, 255, 255, 0.12);
        }

        .btn-save {
          background: linear-gradient(135deg, #1da1f2, #1a8cd8);
          color: white;
          border: none;
          padding: 0.3rem 0.8rem;
          border-radius: 8px;
          cursor: pointer;
          transition: all 0.3s;
          font-size: 0.8rem;
        }

        .btn-save:hover {
          transform: translateY(-1px);
        }

        .bio-text {
          color: #e8e8f0;
          font-size: 1rem;
          line-height: 1.5;
        }

        .bio-textarea {
          width: 100%;
          padding: 0.8rem;
          border-radius: 12px;
          border: 2px solid rgba(255, 255, 255, 0.08);
          background: rgba(255, 255, 255, 0.04);
          color: #e8e8f0;
          font-size: 1rem;
          outline: none;
          transition: all 0.3s;
          font-family: inherit;
          resize: vertical;
        }

        .bio-textarea:focus {
          border-color: #1da1f2;
        }

        .profile-info {
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 16px;
          padding: 1.5rem;
          display: flex;
          flex-direction: column;
          gap: 0.8rem;
        }

        .info-item {
          display: flex;
          justify-content: space-between;
          padding: 0.5rem 0;
          border-bottom: 1px solid rgba(255, 255, 255, 0.05);
        }

        .info-item:last-child {
          border-bottom: none;
        }

        .info-label {
          color: #6b6b80;
        }

        .info-value {
          color: #e8e8f0;
          font-weight: 500;
        }

        @media (max-width: 480px) {
          .profile-stats {
            gap: 1.5rem;
          }
          .profile-header {
            padding: 1.5rem;
          }
        }
      `}</style>
    </div>
  )
}

export default Profile