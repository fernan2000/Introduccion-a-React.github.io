import { Link } from 'react-router-dom'

function CitaCard({ cita }) {
  return (
    <div className="cita-card">
      <div className="cita-card-header">
        <span className="cita-especialidad">{cita.especialidad}</span>
        <span className="cita-id">#{cita.id}</span>
      </div>
      <h3 className="cita-paciente">{cita.paciente}</h3>
      <p className="cita-medico">{cita.medico}</p>
      <div className="cita-datetime">
        <span>📅 {cita.fecha}</span>
        <span>🕐 {cita.hora}</span>
      </div>
      <Link to={`/cita/${cita.id}`} className="btn-ver">
        Ver Detalles →
      </Link>

      <style>{`
        .cita-card {
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 12px;
          padding: 1.2rem;
          transition: all 0.3s ease;
        }

        .cita-card:hover {
          transform: translateY(-3px);
          border-color: rgba(123, 97, 255, 0.2);
          background: rgba(255, 255, 255, 0.05);
        }

        .cita-card-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 0.5rem;
        }

        .cita-especialidad {
          font-size: 0.7rem;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          color: #7b61ff;
          background: rgba(123, 97, 255, 0.1);
          padding: 0.2rem 0.6rem;
          border-radius: 20px;
        }

        .cita-id {
          font-size: 0.7rem;
          color: #6b6b80;
        }

        .cita-paciente {
          font-size: 1.1rem;
          font-weight: 600;
          color: #e8e8f0;
          margin-bottom: 0.2rem;
        }

        .cita-medico {
          color: #a0a0b8;
          font-size: 0.9rem;
          margin-bottom: 0.5rem;
        }

        .cita-datetime {
          display: flex;
          gap: 1rem;
          font-size: 0.85rem;
          color: #a0a0b8;
          margin-bottom: 1rem;
        }

        .btn-ver {
          display: inline-block;
          color: #7b61ff;
          text-decoration: none;
          font-weight: 600;
          transition: color 0.3s;
        }

        .btn-ver:hover {
          color: #00e5c0;
        }
      `}</style>
    </div>
  )
}

export default CitaCard