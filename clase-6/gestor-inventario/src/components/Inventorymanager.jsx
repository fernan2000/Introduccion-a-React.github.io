import { useReducer, useRef, useCallback, useEffect, useState } from "react";
const initialState = { productos: [] };
function reducer(state, action) {
  switch (action.type) {

    case "agregar":
      return {
        productos: [
          ...state.productos,
          { id: Date.now(), nombre: action.nombre, cantidad: 1 },
        ],
      };

    case "incrementar":
      return {
        productos: state.productos.map((p) =>
          p.id === action.id ? { ...p, cantidad: p.cantidad + 1 } : p
        ),
      };

    case "decrementar":
      return {
        productos: state.productos.map((p) =>
          p.id === action.id && p.cantidad > 1
            ? { ...p, cantidad: p.cantidad - 1 }
            : p
        ),
      };

    case "eliminar":
      return {
        productos: state.productos.filter((p) => p.id !== action.id),
      };

    // Ejercicio 3: vaciar inventario
    case "vaciar":
      return initialState;

    default:
      return state;
  }
}

function InventoryManager() {
  const [state, dispatch] = useReducer(reducer, () => {
    try {
      const saved = localStorage.getItem("inventario");
      return saved ? JSON.parse(saved) : initialState;
    } catch { return initialState; }
  });

  const [busqueda, setBusqueda] = useState("");
  const inputRef = useRef(null);


  useEffect(() => {
    localStorage.setItem("inventario", JSON.stringify(state));
  }, [state]);



  useEffect(() => {
    inputRef.current?.focus();
  }, []);


  const handleAgregar = useCallback(() => {
    const nombre = inputRef.current?.value.trim();
    if (nombre) {
      dispatch({ type: "agregar", nombre });
      inputRef.current.value = "";
      inputRef.current.focus();
    }
  }, []);

  const handleIncrementar = useCallback((id) => dispatch({ type: "incrementar", id }), []);
  const handleDecrementar = useCallback((id) => dispatch({ type: "decrementar", id }), []);
  const handleEliminar    = useCallback((id) => dispatch({ type: "eliminar",    id }), []);
  const handleVaciar      = useCallback(() => {
    if (window.confirm("¿Vaciar todo el inventario?")) dispatch({ type: "vaciar" });
  }, []);

  const handleTecla = (e) => {
    if (e.key === "Enter") handleAgregar();
  };


  const productosFiltrados = state.productos.filter((p) =>
    p.nombre.toLowerCase().includes(busqueda.toLowerCase())
  );

  const totalUnidades = state.productos.reduce((acc, p) => acc + p.cantidad, 0);

  return (
    <div className="seccion">
      <h2 className="seccion-titulo">🛒 Gestor de Inventario</h2>

      {/* Agregar producto   */}
      <div className="input-row">
        <input
          ref={inputRef}
          className="input-texto"
          type="text"
          placeholder="Nombre del producto"
          onKeyDown={handleTecla}
          maxLength={50}
        />
        <button className="btn btn-morado" onClick={handleAgregar}>+ Agregar</button>
      </div>

      {/* Buscador */}
      {state.productos.length > 0 && (
        <input
          className="input-buscar"
          type="text"
          placeholder="🔍 Buscar producto..."
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
        />
      )}

      {state.productos.length > 0 && (
        <div className="resumen-inv">
          <span>{state.productos.length} productos · {totalUnidades} unidades totales</span>
          <button className="btn-vaciar" onClick={handleVaciar}>🗑️ Vaciar todo</button>
        </div>
      )}

      {/* Lista vacia*/}
      {state.productos.length === 0 && (
        <div className="lista-vacia">
          <span className="icono-vacio">📦</span>
          El inventario está vacío.
        </div>
      )}

      {/* Sin resultados e busqueda */}
      {state.productos.length > 0 && productosFiltrados.length === 0 && (
        <p className="sin-resultados">No se encontraron productos con "{busqueda}"</p>
      )}

      {/*Lista de productos*/}
      <ul className="lista-productos">
        {productosFiltrados.map((producto) => (
          <li key={producto.id} className="producto-item">
            <span className="producto-nombre">{producto.nombre}</span>
            <div className="producto-controles">
              <button className="btn-ctrl rojo"   onClick={() => handleDecrementar(producto.id)} disabled={producto.cantidad === 1}>−</button>
              <span   className="producto-cantidad">{producto.cantidad}</span>
              <button className="btn-ctrl verde"  onClick={() => handleIncrementar(producto.id)}>+</button>
              <button className="btn-ctrl eliminar" onClick={() => handleEliminar(producto.id)}>🗑️</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default InventoryManager;