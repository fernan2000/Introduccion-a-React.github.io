import CitaCard from '../components/CitaCard'

const citasData = [
  { id: 1, paciente: 'María González', medico: 'Dr. Pérez', fecha: '2024-12-20', hora: '10:00', especialidad: 'Cardiología' },
  { id: 2, paciente: 'Juan Martínez', medico: 'Dra. López', fecha: '2024-12-20', hora: '11:30', especialidad: 'Dermatología' },
  { id: 3, paciente: 'Ana Rodríguez', medico: 'Dr. Sánchez', fecha: '2024-12-21', hora: '09:00', especialidad: 'Pediatría' },
  { id: 4, paciente: 'Carlos Gómez', medico: 'Dra. Fernández', fecha: '2024-12-21', hora: '15:00', especialidad: 'Traumatología' },
  { id: 5, paciente: 'Laura Díaz', medico: 'Dr. Martínez', fecha: '2024-12-22', hora: '12:00', especialidad: 'Oftalmología' },
]

function Citas() {
  return (
    <div className="citas-page">
      <div className="page-header">
        <h2>📋 Lista de Citas Médicas</h2>
        <p className="page-subtitle">Todas las citas programadas</p>
      </div>

      <div className="citas-grid">
        {citasData.map(cita => (
          <CitaCard key={cita.id} cita={cita} />
        ))}
      </div>

      <style>{`
        .page-header {
          margin-bottom: 2rem;
        }

        .page-header h2 {
          font-size: 2rem;
          background: linear-gradient(135deg, #7b61ff, #00e5c0);
          background-clip: text;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .page-subtitle {
          color: #a0a0b8;
          font-size: 1rem;
        }

        .citas-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: 1rem;
        }

        @media (max-width: 640px) {
          .citas-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  )
}

export default Citas