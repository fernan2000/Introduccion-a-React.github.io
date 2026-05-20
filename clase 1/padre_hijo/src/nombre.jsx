function Nombre({ nombre, edad }) {
  return (
    <div style={{ 
      border: '2px solid blue', 
      borderRadius: '8px',
      padding: '15px', 
      margin: '10px',
      backgroundColor: '#e3f2fd'
    }}>
      <h3>📝 Componente: Nombre</h3>
      <p><strong>Nombre:</strong> {nombre}</p>
      <p><strong>Edad:</strong> {edad} años</p>
    </div>
  )
}

export default Nombre