import { Link } from 'react-router-dom'

function NotFound() {
  return (
    <div className="not-found-page">
      <div className="not-found-content">
        <span className="not-found-icon">🔍</span>
        <h1>404</h1>
        <h2>Página no encontrada</h2>
        <p>Lo sentimos, la página que buscas no existe</p>
        <Link to="/" className="btn btn-primary">Volver al Inicio</Link>
      </div>

      <style>{`
        .not-found-page {
          display: flex;
          justify-content: center;
          align-items: center;
          min-height: 60vh;
          text-align: center;
        }

        .not-found-content {
          max-width: 400px;
        }

        .not-found-icon {
          font-size: 4rem;
          display: block;
          margin-bottom: 1rem;
        }

        .not-found-content h1 {
          font-size: 6rem;
          font-weight: 800;
          background: linear-gradient(135deg, #7b61ff, #00e5c0);
          background-clip: text;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          line-height: 1;
        }

        .not-found-content h2 {
          font-size: 1.5rem;
          color: #e8e8f0;
          margin: 0.5rem 0;
        }

        .not-found-content p {
          color: #a0a0b8;
          margin-bottom: 2rem;
        }

        .btn {
          display: inline-block;
          padding: 0.6rem 1.5rem;
          border-radius: 10px;
          text-decoration: none;
          font-weight: 600;
          background: linear-gradient(135deg, #7b61ff, #6a4fff);
          color: white;
          transition: all 0.3s ease;
        }

        .btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(123, 97, 255, 0.3);
        }
      `}</style>
    </div>
  )
}

export default NotFound