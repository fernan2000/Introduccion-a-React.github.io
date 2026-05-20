import { useState } from 'react'

function NombreState() {
  const [nombre, setNombre] = useState('')
  const [edad, setEdad] = useState('')
  const [contador, setContador] = useState(0)
  const [mostrar, setMostrar] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (nombre && edad) {
      setMostrar(true)
    }
  }

  const incrementarContador = () => {
    setContador(contador + 1)
  }

  return (
    <div style={{ 
      border: '2px solid purple', 
      borderRadius: '8px',
      padding: '20px',
      margin: '10px'
    }}>
      <h3>⚡ Componente: NombreState (con useState)</h3>
      
      <form onSubmit={handleSubmit}>
        <div style={{ margin: '10px 0' }}>
          <label>Nombre: </label>
          <input 
            type="text"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            placeholder="Escribe tu nombre"
            style={{ marginLeft: '10px', padding: '5px' }}
          />
        </div>
        
        <div style={{ margin: '10px 0' }}>
          <label>Edad: </label>
          <input 
            type="number"
            value={edad}
            onChange={(e) => setEdad(e.target.value)}
            placeholder="Tu edad"
            style={{ marginLeft: '10px', padding: '5px' }}
          />
        </div>
        
        <button type="submit" style={{ padding: '5px 15px', cursor: 'pointer' }}>
          Mostrar Datos
        </button>
      </form>

      {mostrar && (
        <div style={{ 
          marginTop: '20px',
          padding: '10px',
          backgroundColor: '#f3e5f5',
          borderRadius: '5px'
        }}>
          <p>📌 Hola <strong>{nombre}</strong>, tienes <strong>{edad}</strong> años</p>
        </div>
      )}

      <hr style={{ margin: '20px 0' }} />

      <div>
        <h4>Contador: {contador}</h4>
        <button onClick={incrementarContador} style={{ padding: '5px 15px', cursor: 'pointer' }}>
          Click aquí (+1)
        </button>
      </div>
    </div>
  )
}

export default NombreState