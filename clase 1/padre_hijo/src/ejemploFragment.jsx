import { Fragment } from 'react'

// Forma 1: Usando Fragment explícitamente
function EjemploFragment() {
  return (
    <Fragment>
      <h1>Algo</h1>
      <h2>Otra cosa</h2>
      <p>Este es un fragmento explícito con Fragment</p>
    </Fragment>
  )
}

// Forma 2: Usando sintaxis abreviada (<> </>)
function EjemploFragmentAlt() {
  return (
    <>
      <h1>Algo</h1>
      <h2>Otra cosa</h2>
      <p>Este es un fragmento con sintaxis abreviada</p>
    </>
  )
}

// Forma 3: Fragment con key para listas
function EjemploFragmentConKey({ items }) {
  return (
    <>
      {items.map((item) => (
        <Fragment key={item.id}>
          <h3>{item.titulo}</h3>
          <p>{item.descripcion}</p>
          <hr />
        </Fragment>
      ))}
    </>
  )
}

export { EjemploFragment, EjemploFragmentAlt, EjemploFragmentConKey }
export default EjemploFragment