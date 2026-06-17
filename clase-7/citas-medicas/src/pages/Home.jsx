import { Link } from 'react-router-dom'

function Home() {
  return (
    <div className="home-page">
      <h1>🏥 Bienvenido a la Gestión de Citas Médicas</h1>
      <p className="subtitle">Administra tus citas de manera eficiente y organizada</p>

      <div className="features-grid">
        <div className="feature-card">
          <span className="feature-icon">📋</span>
          <h3>Ver Citas</h3>
          <p>Consulta todas tus citas médicas en un solo lugar</p>
          <Link to="/citas" className="btn btn-primary">Ver Citas</Link>
        </div>
        <div className="feature-card">
          <span className="feature-icon">📅</span>
          <h3>Detalles de Cita</h3>
          <p>Accede a información detallada de cada cita</p>
          <Link to="/cita/1" className="btn btn-secondary">Ver Ejemplo</Link>
        </div>
        <div className="feature-card">
          <span className="feature-icon">🔍</span>
          <h3>Fácil Navegación</h3>
          <p>Explora y encuentra lo que necesitas rápidamente</p>
          <Link to="/citas" className="btn btn-secondary">Explorar</Link>
        </div>
      </div>

      <style>{`
        .home-page {
          text-align: center;
        }

        .home-page h1 {
          font-size: 2.5rem;
          margin-bottom: 0.5rem;
          background: linear-gradient(135deg, #7b61ff, #00e5c0);
          background-clip: text;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .subtitle {
          font-size: 1.1rem;
          color: #a0a0b8;
          margin-bottom: 2rem;
        }

        .features-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 1.5rem;
          margin-top: 2rem;
        }

        .feature-card {
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 16px;
          padding: 2rem 1.5rem;
          transition: all 0.3s ease;
        }

        .feature-card:hover {
          transform: translateY(-4px);
          border-color: rgba(123, 97, 255, 0.2);
          background: rgba(255, 255, 255, 0.05);
        }

        .feature-icon {
          font-size: 2.5rem;
          display: block;
          margin-bottom: 1rem;
        }

        .feature-card h3 {
          font-size: 1.2rem;
          margin-bottom: 0.5rem;
          color: #e8e8f0;
        }

        .feature-card p {
          color: #a0a0b8;
          font-size: 0.95rem;
          margin-bottom: 1.5rem;
        }

        .btn {
          display: inline-block;
          padding: 0.6rem 1.5rem;
          border-radius: 10px;
          text-decoration: none;
          font-weight: 600;
          transition: all 0.3s ease;
        }

        .btn-primary {
          background: linear-gradient(135deg, #7b61ff, #6a4fff);
          color: white;
        }

        .btn-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(123, 97, 255, 0.3);
        }

        .btn-secondary {
          background: rgba(255, 255, 255, 0.06);
          color: #e8e8f0;
          border: 1px solid rgba(255, 255, 255, 0.08);
        }

        .btn-secondary:hover {
          background: rgba(255, 255, 255, 0.12);
        }

        @media (max-width: 640px) {
          .home-page h1 {
            font-size: 1.8rem;
          }
        }
      `}</style>
    </div>
  )
}

export default Home