import { useParams, Link } from 'react-router-dom'

const citasData = [
  { id: 1, paciente: 'María González', medico: 'Dr. Pérez', fecha: '2024-12-20', hora: '10:00', especialidad: 'Cardiología', telefono: '555-0101', email: 'maria@email.com' },
  { id: 2, paciente: 'Juan Martínez', medico: 'Dra. López', fecha: '2024-12-20', hora: '11:30', especialidad: 'Dermatología', telefono: '555-0102', email: 'juan@email.com' },
  { id: 3, paciente: 'Ana Rodríguez', medico: 'Dr. Sánchez', fecha: '2024-12-21', hora: '09:00', especialidad: 'Pediatría', telefono: '555-0103', email: 'ana@email.com' },
  { id: 4, paciente: 'Carlos Gómez', medico: 'Dra. Fernández', fecha: '2024-12-21', hora: '15:00', especialidad: 'Traumatología', telefono: '555-0104', email: 'carlos@email.com' },
  { id: 5, paciente: 'Laura Díaz', medico: 'Dr. Martínez', fecha: '2024-12-22', hora: '12:00', especialidad: 'Oftalmología', telefono: '555-0105', email: 'laura@email.com' },
]

function CitaDetalle() {
  const { id } = useParams()
  const cita = citasData.find(c => c.id === parseInt(id))

  if (!cita) {
    return (
      <div className="not-found-detail">
        <h2>🔍 Cita no encontrada</h2>
        <p>La cita con ID {id} no existe</p>
        <Link to="/citas" className="btn btn-primary">Volver a Citas</Link>
        <style>{`
          .not-found-detail {
            text-align: center;
            padding: 3rem 1rem;
          }
          .not-found-detail h2 {
            font-size: 2rem;
            margin-bottom: 1rem;
          }
          .not-found-detail p {
            color: #a0a0b8;
            margin-bottom: 1.5rem;
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

  return (
    <div className="detalle-page">
      <div className="detalle-header">
        <Link to="/citas" className="back-link">← Volver a Citas</Link>
        <h2>📄 Detalles de la Cita</h2>
      </div>

      <div className="detalle-card">
        <div className="detalle-info">
          <div className="info-item">
            <span className="info-label">ID de Cita</span>
            <span className="info-value">#{cita.id}</span>
          </div>
          <div className="info-item">
            <span className="info-label">Paciente</span>
            <span className="info-value">{cita.paciente}</span>
          </div>
          <div className="info-item">
            <span className="info-label">Médico</span>
            <span className="info-value">{cita.medico}</span>
          </div>
          <div className="info-item">
            <span className="info-label">Especialidad</span>
            <span className="info-value">{cita.especialidad}</span>
          </div>
          <div className="info-item">
            <span className="info-label">Fecha</span>
            <span className="info-value">{cita.fecha}</span>
          </div>
          <div className="info-item">
            <span className="info-label">Hora</span>
            <span className="info-value">{cita.hora}</span>
          </div>
          <div className="info-item">
            <span className="info-label">Teléfono</span>
            <span className="info-value">{cita.telefono}</span>
          </div>
          <div className="info-item">
            <span className="info-label">Email</span>
            <span className="info-value">{cita.email}</span>
          </div>
        </div>

        <div className="detalle-actions">
          <button className="btn btn-primary">📝 Editar Cita</button>
          <button className="btn btn-danger">🗑️ Cancelar Cita</button>
        </div>
      </div>

      <style>{`
        .detalle-header {
          margin-bottom: 2rem;
        }

        .back-link {
          color: #7b61ff;
          text-decoration: none;
          font-weight: 500;
          display: inline-block;
          margin-bottom: 0.5rem;
          transition: color 0.3s;
        }

        .back-link:hover {
          color: #00e5c0;
        }

        .detalle-header h2 {
          font-size: 2rem;
          background: linear-gradient(135deg, #7b61ff, #00e5c0);
          background-clip: text;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .detalle-card {
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 16px;
          padding: 2rem;
        }

        .detalle-info {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
          gap: 1.5rem;
          margin-bottom: 2rem;
        }

        .info-item {
          display: flex;
          flex-direction: column;
          gap: 0.3rem;
        }

        .info-label {
          font-size: 0.75rem;
          text-transform: uppercase;
          color: #6b6b80;
          letter-spacing: 0.05em;
        }

        .info-value {
          font-size: 1.1rem;
          font-weight: 600;
          color: #e8e8f0;
        }

        .detalle-actions {
          display: flex;
          gap: 1rem;
          flex-wrap: wrap;
          padding-top: 1.5rem;
          border-top: 1px solid rgba(255, 255, 255, 0.05);
        }

        .btn {
          padding: 0.6rem 1.5rem;
          border: none;
          border-radius: 10px;
          font-weight: 600;
          cursor: pointer;
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

        .btn-danger {
          background: rgba(239, 68, 68, 0.15);
          color: #f87171;
          border: 1px solid rgba(239, 68, 68, 0.2);
        }

        .btn-danger:hover {
          background: rgba(239, 68, 68, 0.25);
        }

        @media (max-width: 640px) {
          .detalle-info {
            grid-template-columns: 1fr;
          }
          .detalle-actions {
            flex-direction: column;
          }
          .detalle-actions .btn {
            width: 100%;
            justify-content: center;
          }
        }
      `}</style>
    </div>
  )
}

export default CitaDetalle