import { Fragment } from 'react'

function EjemploFragment() {
  return (
    <Fragment>
      <h1>Algo</h1>
      <h2>Otra cosa</h2>
      <p>Este es un fragmento explicito con Fragment</p>
    </Fragment>
  )
}

function EjemploFragmentAlt() {
  return (
    <>
      <h1>Algo</h1>
      <h2>Otra cosa</h2>
      <p>Este es un fragmento con sintaxis abreviada</p>
    </>
  )
}

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