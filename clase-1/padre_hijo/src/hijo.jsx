import { useState } from 'react'

function Hijo({ mensajeDelPadre, enviarMensaje }) {
  const [inputHijo, setInputHijo] = useState('')

  const enviarAlPadre = () => {
    if (inputHijo.trim()) {
      enviarMensaje(inputHijo)
      setInputHijo('')
    }
  }

  return (
    <div style={{
      border: '2px solid orange',
      borderRadius: '8px',
      padding: '15px',
      margin: '10px',
      backgroundColor: '#fff3e0'
    }}>
      <h3>👶 Componente Hijo</h3>
      <p><strong>Mensaje del padre:</strong> {mensajeDelPadre || 'Ninguno aún'}</p>
      
      <input 
        type="text"
        placeholder="Mensaje para el padre"
        value={inputHijo}
        onChange={(e) => setInputHijo(e.target.value)}
        style={{ padding: '5px', marginRight: '10px' }}
      />
      <button onClick={enviarAlPadre} style={{ padding: '5px 15px', cursor: 'pointer' }}>
        Enviar al Padre
      </button>
    </div>
  )
}

export default Hijo