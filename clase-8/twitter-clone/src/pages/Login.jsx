import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function Login({ onLogin }) {
  const [username, setUsername] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    if (username.trim().length < 3) {
      setError('El nombre de usuario debe tener al menos 3 caracteres')
      return
    }
    onLogin(username.trim())
    navigate('/')
  }

  return (
    <div className="login-page">
      <div className="login-card">
        <div className="login-header">
          <span className="login-icon">🐦</span>
          <h1>Iniciar Sesión</h1>
          <p>Entra a tu cuenta de Twitter Clone</p>
        </div>

        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label>Nombre de Usuario</label>
            <input
              type="text"
              placeholder="Ej: juanperez"
              value={username}
              onChange={(e) => {
                setUsername(e.target.value)
                setError('')
              }}
              className={error ? 'input-error' : ''}
            />
            {error && <span className="error-message">{error}</span>}
          </div>

          <button type="submit" className="btn-login-submit">
            Iniciar Sesión
          </button>

          <div className="login-footer">
            <p>💡 Usa cualquier nombre de usuario para probar</p>
          </div>
        </form>
      </div>

      <style>{`
        .login-page {
          display: flex;
          justify-content: center;
          align-items: center;
          min-height: 70vh;
        }

        .login-card {
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 24px;
          padding: 2.5rem;
          max-width: 400px;
          width: 100%;
        }

        .login-header {
          text-align: center;
          margin-bottom: 2rem;
        }

        .login-icon {
          font-size: 3rem;
          display: block;
          margin-bottom: 0.5rem;
        }

        .login-header h1 {
          font-size: 1.8rem;
          background: linear-gradient(135deg, #7b61ff, #1da1f2);
          background-clip: text;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .login-header p {
          color: #a0a0b8;
          font-size: 0.95rem;
          margin-top: 0.3rem;
        }

        .login-form {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .form-group {
          display: flex;
          flex-direction: column;
          gap: 0.3rem;
        }

        .form-group label {
          font-size: 0.85rem;
          font-weight: 600;
          color: #a0a0b8;
        }

        .form-group input {
          padding: 0.8rem 1rem;
          border-radius: 12px;
          border: 2px solid rgba(255, 255, 255, 0.08);
          background: rgba(255, 255, 255, 0.04);
          color: #e8e8f0;
          font-size: 1rem;
          outline: none;
          transition: all 0.3s;
        }

        .form-group input:focus {
          border-color: #1da1f2;
          box-shadow: 0 0 0 4px rgba(29, 161, 242, 0.1);
        }

        .form-group input.input-error {
          border-color: #f87171;
          box-shadow: 0 0 0 4px rgba(239, 68, 68, 0.1);
        }

        .error-message {
          color: #f87171;
          font-size: 0.8rem;
        }

        .btn-login-submit {
          padding: 0.8rem;
          border: none;
          border-radius: 12px;
          background: linear-gradient(135deg, #1da1f2, #1a8cd8);
          color: white;
          font-size: 1.1rem;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.3s;
        }

        .btn-login-submit:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(29, 161, 242, 0.3);
        }

        .login-footer {
          text-align: center;
          margin-top: 1rem;
          color: #6b6b80;
          font-size: 0.85rem;
        }

        @media (max-width: 480px) {
          .login-card {
            padding: 1.5rem;
          }
        }
      `}</style>
    </div>
  )
}

export default Login