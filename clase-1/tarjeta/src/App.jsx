import { useState } from 'react'

function App() {


  const personajes = [
    { id: 1, nombre: "Chihiro", profesion: "Heroína", mensaje: "Nunca olvides tu nombre", color: "#e74c3c" },
    { id: 2, nombre: "Haku", profesion: "Dragón", mensaje: "Protege a quien amas", color: "#3498db" },
    { id: 3, nombre: "Sin Rostro", profesion: "Espíritu", mensaje: "La amistad es valiosa", color: "#9b59b6" },
    { id: 4, nombre: "Yubaba", profesion: "Bruja", mensaje: "El trabajo da propósito", color: "#e67e22" },
    { id: 5, nombre: "Zeniba", profesion: "Bruja buena", mensaje: "El amor todo lo puede", color: "#2ecc71" }
  ]

  return (
    <div style={{ 
      textAlign: 'center', 
      padding: '20px',
      fontFamily: 'Arial, sans-serif'
    }}>
      <h1 style={{ color: '#2c3e50' }}>🎴 El Viaje de Chihiro 🎴</h1>
      <p style={{ fontSize: '18px', color: '#666' }}>Tarjetas de presentación de los personajes</p>
      
      <div style={{ 
        display: 'flex', 
        flexWrap: 'wrap', 
        justifyContent: 'center',
        marginTop: '30px'
      }}>
        {personajes.map(personaje => (
          <div key={personaje.id} style={{
            border: `3px solid ${personaje.color}`,
            borderRadius: '15px',
            padding: '20px',
            width: '250px',
            margin: '15px',
            display: 'inline-block',
            backgroundColor: 'white',
            boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
            transition: 'transform 0.3s'
          }}
          onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
          onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}>
            <div style={{
              width: '80px',
              height: '80px',
              margin: '0 auto',
              borderRadius: '50%',
              backgroundColor: personaje.color + '20',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '40px'
            }}>
              {personaje.id === 1 && "🌊"}
              {personaje.id === 2 && "🐉"}
              {personaje.id === 3 && "👤"}
              {personaje.id === 4 && "👵"}
              {personaje.id === 5 && "🧙"}
            </div>
            <h2 style={{ color: personaje.color }}>{personaje.nombre}</h2>
            <h4 style={{ color: '#555' }}>{personaje.profesion}</h4>
            <p style={{ color: '#777', fontStyle: 'italic' }}>"{personaje.mensaje}"</p>
          </div>
        ))}
      </div>
      
      <footer style={{
        marginTop: '40px',
        padding: '20px',
        backgroundColor: '#f0f0f0',
        borderRadius: '10px'
      }}>
        <p>© 2026 - Studio Ghibli</p>
        <p>✨ "Nunca olvides quién eres" ✨</p>
      </footer>
    </div>
  )
}

export default App