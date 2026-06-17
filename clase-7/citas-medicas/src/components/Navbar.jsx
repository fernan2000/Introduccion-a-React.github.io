import { NavLink } from 'react-router-dom'

function Navbar() {
  return (
    <nav className="navbar">
      <div className="nav-brand">🏥 Gestión de Citas</div>
      <div className="nav-links">
        <NavLink to="/" className={({ isActive }) => isActive ? 'active' : ''}>Inicio</NavLink>
        <NavLink to="/citas" className={({ isActive }) => isActive ? 'active' : ''}>Ver Citas</NavLink>
      </div>
      <style>{`
        .navbar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1rem 2rem;
          background: rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(10px);
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
          flex-wrap: wrap;
          gap: 1rem;
        }

        .nav-brand {
          font-size: 1.3rem;
          font-weight: 700;
          background: linear-gradient(135deg, #7b61ff, #00e5c0);
          background-clip: text;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .nav-links {
          display: flex;
          gap: 1.5rem;
        }

        .nav-links a {
          color: #a0a0b8;
          text-decoration: none;
          font-weight: 500;
          padding: 0.4rem 0.8rem;
          border-radius: 8px;
          transition: all 0.3s ease;
        }

        .nav-links a:hover {
          color: #e8e8f0;
          background: rgba(255, 255, 255, 0.05);
        }

        .nav-links a.active {
          color: #7b61ff;
          background: rgba(123, 97, 255, 0.1);
        }

        @media (max-width: 640px) {
          .navbar {
            flex-direction: column;
            align-items: stretch;
            padding: 1rem;
          }
          .nav-links {
            justify-content: center;
          }
        }
      `}</style>
    </nav>
  )
}

export default Navbar