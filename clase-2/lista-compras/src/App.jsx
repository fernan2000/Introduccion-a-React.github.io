import { useState } from "react";
import "./App.css";

const CATEGORIAS = [
  { id: "frutas",    label: "Frutas y verduras", emoji: "🥦", color: "#16a34a", bg: "#dcfce7" },
  { id: "lacteos",   label: "Lácteos",            emoji: "🥛", color: "#0284c7", bg: "#e0f2fe" },
  { id: "carnes",    label: "Carnes",              emoji: "🥩", color: "#dc2626", bg: "#fee2e2" },
  { id: "panaderia", label: "Panadería",           emoji: "🍞", color: "#d97706", bg: "#fef3c7" },
  { id: "limpieza",  label: "Limpieza",            emoji: "🧹", color: "#7c3aed", bg: "#ede9fe" },
  { id: "bebidas",   label: "Bebidas",             emoji: "🧃", color: "#0891b2", bg: "#cffafe" },
  { id: "otros",     label: "Otros",               emoji: "🛍️", color: "#6b7280", bg: "#f3f4f6" },
];



const getCategoria = (id) =>
  CATEGORIAS.find((c) => c.id === id) || CATEGORIAS[CATEGORIAS.length - 1];



const FORM_VACIO = {
  nombre: "",
  categoriaId: "frutas",
  cantidad: 1,
  precio: "",
};

function App() {
  const [productos, setProductos] = useState([]);
  const [form, setForm] = useState(FORM_VACIO);
  const [editandoId, setEditandoId] = useState(null);
  const actualizarForm = (campo, valor) => {
    setForm((prev) => ({ ...prev, [campo]: valor }));
  };

  const guardarProducto = () => {
    if (form.nombre.trim() === "") return;

    const productoData = {
      nombre:     form.nombre.trim(),
      categoriaId: form.categoriaId,
      cantidad:   Math.max(1, Number(form.cantidad) || 1),
      precio:     parseFloat(form.precio) || 0,
      comprado:   false,
    };

    if (editandoId !== null) {
      setProductos((prev) =>
        prev.map((p) =>
          p.id === editandoId
            ? { ...p, ...productoData }
            : p
        )
      );
      setEditandoId(null);
    } else {
      // añadir nuevo producto
      setProductos((prev) => [
        ...prev,
        { id: Date.now(), ...productoData },
      ]);
    }

    setForm(FORM_VACIO);
  };

  const iniciarEdicion = (producto) => {
    setEditandoId(producto.id);
    setForm({
      nombre:      producto.nombre,
      categoriaId: producto.categoriaId,
      cantidad:    producto.cantidad,
      precio:      producto.precio === 0 ? "" : String(producto.precio),
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const cancelarEdicion = () => {
    setEditandoId(null);
    setForm(FORM_VACIO);
  };

  const eliminarProducto = (id) => {
    setProductos((prev) => prev.filter((p) => p.id !== id));
    if (editandoId === id) cancelarEdicion();
  };

  const toggleComprado = (id) => {
    setProductos((prev) =>
      prev.map((p) =>
        p.id === id ? { ...p, comprado: !p.comprado } : p
      )
    );
  };

  const manejarTecla = (e) => {
    if (e.key === "Enter") guardarProducto();
  };

  const totalProductos  = productos.length;
  const compradosCount  = productos.filter((p) => p.comprado).length;
  const pendientesCount = totalProductos - compradosCount;

  const totalEstimado = productos.reduce(
    (acc, p) => acc + p.precio * p.cantidad,
    0
  );
  const totalComprado = productos
    .filter((p) => p.comprado)
    .reduce((acc, p) => acc + p.precio * p.cantidad, 0);

  const gruposCategoria = CATEGORIAS.map((cat) => ({
    ...cat,
    items: productos.filter((p) => p.categoriaId === cat.id),
  })).filter((g) => g.items.length > 0);

  return (
    <div className="app">
      <div className="card">

        {/* Encabezado */}
        <div className="header">
          <span className="header-icono">🛒</span>
          <h1>Lista de compras</h1>
        </div>

        {/* ── Formulario agregar / editar ── */}
        <div className="formulario">
          <p className="formulario-titulo">
            {editandoId !== null ? "✏️ Editando producto" : "➕ Nuevo producto"}
          </p>

          {/*nombre + categoria*/}
          <div className="fila-nombre">
            <input
              className="input-nombre"
              type="text"
              placeholder="Nombre del producto"
              value={form.nombre}
              onChange={(e) => actualizarForm("nombre", e.target.value)}
              onKeyDown={manejarTecla}
              maxLength={60}
            />
            <select
              className="select-categoria"
              value={form.categoriaId}
              onChange={(e) => actualizarForm("categoriaId", e.target.value)}
            >
              {CATEGORIAS.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.emoji} {cat.label}
                </option>
              ))}
            </select>
          </div>

          {/*cantidad + precio*/}
          <div className="fila-detalles">
            <input
              className="input-cantidad"
              type="number"
              min="1"
              max="99"
              placeholder="Cantidad"
              value={form.cantidad}
              onChange={(e) => actualizarForm("cantidad", e.target.value)}
            />
            <input
              className="input-precio"
              type="number"
              min="0"
              step="0.01"
              placeholder="Precio estimado ($)"
              value={form.precio}
              onChange={(e) => actualizarForm("precio", e.target.value)}
              onKeyDown={manejarTecla}
            />
          </div>

          {/*botones */}
          <div className="fila-botones">
            <button className="btn-agregar" onClick={guardarProducto}>
              {editandoId !== null ? "💾 Guardar cambios" : "+ Agregar"}
            </button>
            {editandoId !== null && (
              <button className="btn-cancelar" onClick={cancelarEdicion}>
                Cancelar
              </button>
            )}
          </div>
        </div>

        {/* ── Resumen total (solo si hay productos con precio) ── */}
        {totalProductos > 0 && totalEstimado > 0 && (
          <div className="resumen-total">
            <div>
              <p className="label">Total estimado</p>
              <p className="monto">${totalEstimado.toFixed(2)}</p>
            </div>
            <div className="stats">
              <span>Comprado: ${totalComprado.toFixed(2)}</span>
              <br />
              <span>Por comprar: ${(totalEstimado - totalComprado).toFixed(2)}</span>
            </div>
          </div>
        )}

        {/* ──lista vacia ── */}
        {totalProductos === 0 && (
          <div className="lista-vacia">
            <span className="icono-vacio">🧺</span>
            Tu lista está vacía.
            <br />
            Agrega un producto arriba.
          </div>
        )}

        {/* ── grupos por categoria ── */}
        {gruposCategoria.map((grupo) => {
          const cat = getCategoria(grupo.id);
          return (
            <div key={grupo.id} className="grupo-categoria">

              {/* Header del grupo */}
              <div className="grupo-header">
                <span
                  className="categoria-badge"
                  style={{ background: cat.bg, color: cat.color }}
                >
                  <span
                    className="categoria-dot"
                    style={{ background: cat.color }}
                  />
                  {cat.emoji} {cat.label}
                </span>
                <div className="grupo-linea" />
              </div>

              {/*  grupo */}
              <ul className="lista">
                {grupo.items.map((producto) => (
                  <li
                    key={producto.id}
                    className={`item${producto.comprado ? " comprado" : ""}`}
                  >
                    {/* Círculo de check */}
                    <div
                      className={`circulo${producto.comprado ? " hecho" : ""}`}
                      onClick={() => toggleComprado(producto.id)}
                      title="Marcar como comprado"
                    >
                      {producto.comprado && "✓"}
                    </div>

                    {/* producto */}
                    <div className="info">
                      <p className="nombre">{producto.nombre}</p>
                      <p className="detalles">
                        Cantidad: {producto.cantidad}
                        {producto.precio > 0 &&
                          ` · $${producto.precio.toFixed(2)} c/u`}
                      </p>
                    </div>

                    {/* Precio total del ítem */}
                    {producto.precio > 0 && (
                      <span className="precio-item">
                        ${(producto.precio * producto.cantidad).toFixed(2)}
                      </span>
                    )}

                    <div className="acciones">
                      <button
                        className="btn-icono editar"
                        onClick={() => iniciarEdicion(producto)}
                        title="Editar producto"
                      >
                        ✏️
                      </button>
                      <button
                        className="btn-icono eliminar"
                        onClick={() => eliminarProducto(producto.id)}
                        title="Eliminar producto"
                      >
                        🗑️
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          );
        })}

        {/* ──contador ── */}
        {totalProductos > 0 && (
          <div className="footer">
            <span>
              {compradosCount} de {totalProductos} comprados
            </span>
            <span className={`badge ${pendientesCount === 0 ? "ok" : "pendiente"}`}>
              {pendientesCount === 0
                ? "✅ Todo listo"
                : `${pendientesCount} pendientes`}
            </span>
          </div>
        )}

      </div>
    </div>
  );
}

export default App;