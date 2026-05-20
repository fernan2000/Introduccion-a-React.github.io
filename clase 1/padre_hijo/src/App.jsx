import { useState } from 'react'
import { EjemploFragment, EjemploFragmentAlt, EjemploFragmentConKey } from './EjemploFragment'
import Nombre from './nombre.jsx'
import NombreProps from './NombreProps'
import NombreState from './NombreState'
import Hijo from './Hijo'
import './App.css'

function App() {
  const [mensajePadre, setMensajePadre] = useState('')
  const [mensajeDesdeHijo, setMensajeDesdeHijo] = useState('')

  const recibirDelHijo = (datos) => {
    setMensajeDesdeHijo(datos)
  }

  const listaItems = [
    { id: 1, titulo: "React Fragmentos", descripcion: "No crean nodos extra en el DOM" },
    { id: 2, titulo: "Props", descripcion: "Comunicación padre → hijo" },
    { id: 3, titulo: "State", descripcion: "Estado interno del componente" }
  ]

  return (
    <div className="container">
      <h1>📚 Práctica Completa de React</h1>
      
      {/* SECCIÓN 1: FRAGMENTOS */}
      <section className="section">
        <h2>🎯 1. Fragmentos en React</h2>
        <div className="card">
          <h3>Fragment explícito (&lt;Fragment&gt;):</h3>
          <EjemploFragment />
        </div>
        <div className="card">
          <h3>Fragment abreviado (&lt;&gt;):</h3>
          <EjemploFragmentAlt />
        </div>
        <div className="card">
          <h3>Fragment con key (para listas):</h3>
          <EjemploFragmentConKey items={listaItems} />
        </div>
      </section>

      {/* SECCIÓN 2: COMPONENTES BÁSICOS */}
      <section className="section">
        <h2>🎯 2. Componentes Básicos</h2>
        <div className="card">
          <h3>NombreJxs (props simples):</h3>
          <Nombre nombre="Miguel" edad={30} />
          <Nombre nombre="Ana" edad={25} />
        </div>
      </section>

      {/* SECCIÓN 3: PROPS AVANZADAS */}
      <section className="section">
        <h2>🎯 3. Props Avanzadas</h2>
        <div className="card">
          <NombreProps 
            nombre="Carlos"
            apellido="López"
            edad={28}
            ciudad="CDMX"
            email="carlos@email.com"
            activo={true}
          />
          <NombreProps 
            nombre="María"
            apellido="García"
            edad={22}
            ciudad="Guadalajara"
            email="maria@email.com"
            activo={false}
          />
        </div>
      </section>

      {/* SECCIÓN 4: STATE */}
      <section className="section">
        <h2>🎯 4. useState</h2>
        <div className="card">
          <NombreState />
        </div>
      </section>

      {/* SECCIÓN 5: PADRE - HIJO */}
      <section className="section">
        <h2>🎯 5. Comunicación Padre → Hijo</h2>
        <div className="card">
          <div style={{
            border: '2px solid darkblue',
            borderRadius: '8px',
            padding: '15px',
            margin: '10px',
            backgroundColor: '#e8eaf6'
          }}>
            <h3>👨 Componente Padre</h3>
            <input 
              type="text" 
              placeholder="Escribe algo para enviar al hijo"
              value={mensajePadre}
              onChange={(e) => setMensajePadre(e.target.value)}
              style={{ padding: '5px', marginRight: '10px' }}
            />
            <p><strong>Mensaje del hijo:</strong> {mensajeDesdeHijo || 'Ninguno aún'}</p>
          </div>
          <Hijo 
            mensajeDelPadre={mensajePadre}
            enviarMensaje={recibirDelHijo}
          />
        </div>
      </section>
    </div>
  )
}

export default App