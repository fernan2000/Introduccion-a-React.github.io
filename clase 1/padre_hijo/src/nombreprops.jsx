function NombreProps({ 
  nombre = "Anónimo",
  apellido,
  edad,
  ciudad,
  email,
  activo = true 
}) {
  return (
    <div style={{ 
      border: '2px solid green', 
      borderRadius: '8px',
      padding: '15px',
      margin: '10px',
      backgroundColor: activo ? '#e8f5e9' : '#ffebee'
    }}>
      <h3>🎯 Componente: NombreProps</h3>
      <p><strong>Nombre completo:</strong> {nombre} {apellido}</p>
      <p><strong>Edad:</strong> {edad} años</p>
      <p><strong>Ciudad:</strong> {ciudad}</p>
      <p><strong>Email:</strong> {email}</p>
      <p><strong>Estado:</strong> {activo ? '✅ Activo' : '❌ Inactivo'}</p>
    </div>
  )
}

export default NombreProps