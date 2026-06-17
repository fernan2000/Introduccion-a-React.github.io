import { Link, useNavigate } from 'react-router-dom'

function Navbar({ user, logout }) {
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <nav className="navbar">
      <div className="nav-container">
        <Link to="/" className="nav-brand">
          🐦 Twitter Clone
        </Link>
        <div className="nav-links">
          <Link to="/" className="nav-link">Inicio</Link>
          {user ? (
            <>
              <Link to="/profile" className="nav-link">Perfil</Link>
              <button onClick={handleLogout} className="btn-logout">
                Cerrar Sesión
              </button>
            </>
          ) : (
            <Link to="/login" className="btn-login">Iniciar Sesión</Link>
          )}
        </div>
      </div>

      <style>{`
        .navbar {
          background: rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(10px);
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
          padding: 0.8rem 0;
          position: sticky;
          top: 0;
          z-index: 100;
        }

        .nav-container {
          max-width: 600px;
          margin: 0 auto;
          padding: 0 1rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .nav-brand {
          font-size: 1.3rem;
          font-weight: 700;
          color: #1da1f2;
          text-decoration: none;
        }

        .nav-links {
          display: flex;
          gap: 1rem;
          align-items: center;
        }

        .nav-link {
          color: #a0a0b8;
          text-decoration: none;
          padding: 0.4rem 0.8rem;
          border-radius: 8px;
          transition: all 0.3s;
        }

        .nav-link:hover {
          color: #e8e8f0;
          background: rgba(255, 255, 255, 0.05);
        }

        .btn-login {
          color: white;
          background: #1da1f2;
          padding: 0.4rem 1.2rem;
          border-radius: 20px;
          text-decoration: none;
          font-weight: 600;
          transition: all 0.3s;
        }

        .btn-login:hover {
          background: #1a8cd8;
          transform: translateY(-1px);
        }

        .btn-logout {
          background: rgba(239, 68, 68, 0.15);
          color: #f87171;
          border: 1px solid rgba(239, 68, 68, 0.2);
          padding: 0.4rem 1.2rem;
          border-radius: 20px;
          cursor: pointer;
          font-weight: 600;
          transition: all 0.3s;
        }

        .btn-logout:hover {
          background: rgba(239, 68, 68, 0.25);
        }

        @media (max-width: 480px) {
          .nav-container {
            flex-direction: column;
            gap: 0.5rem;
          }
        }
      `}</style>
    </nav>
  )
}

export default Navbar