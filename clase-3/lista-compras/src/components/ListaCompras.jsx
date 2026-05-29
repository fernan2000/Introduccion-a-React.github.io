import { useState } from "react";

function ListaCompras() {
  const [productos, setProductos] = useState([]);
  const [nuevoProducto, setNuevoProducto] = useState("");
  const [precio, setPrecio] = useState("");
  const [categoria, setCategoria] = useState("frutas");
  const [presupuesto, setPresupuesto] = useState(100);

  const categorias = [
    { id: "frutas", nombre: "🍎 Frutas y Verduras" },
    { id: "lacteos", nombre: "🥛 Lácteos y Huevos" },
    { id: "carnes", nombre: "🥩 Carnes y Pescados" },
    { id: "despensa", nombre: "🥫 Despensa" },
    { id: "limpieza", nombre: "🧹 Limpieza" },
    { id: "general", nombre: "📦 General" }
  ];

  const agregarProducto = () => {
    if (nuevoProducto.trim() !== "" && precio > 0) {
      setProductos([
        ...productos,
        {
          id: Date.now(),
          nombre: nuevoProducto,
          precio: parseFloat(precio),
          categoria: categoria,
          comprado: false
        }
      ]);
      setNuevoProducto("");
      setPrecio("");
    }
  };

  const eliminarProducto = (id) => {
    setProductos(productos.filter(p => p.id !== id));
  };

  const toggleComprado = (id) => {
    setProductos(productos.map(p =>
      p.id === id ? { ...p, comprado: !p.comprado } : p
    ));
  };

  // Calcular totales
  const totalGastado = productos.reduce((sum, p) => sum + p.precio, 0);
  const totalComprado = productos.filter(p => p.comprado).reduce((sum, p) => sum + p.precio, 0);
  const totalPendiente = productos.filter(p => !p.comprado).reduce((sum, p) => sum + p.precio, 0);
  const disponible = presupuesto - totalComprado;

  // Organizar productos por categoría
  const productosPorCategoria = {};
  categorias.forEach(cat => {
    productosPorCategoria[cat.id] = productos.filter(p => p.categoria === cat.id);
  });

  return (
    <div style={{ maxWidth: "700px", margin: "20px auto", padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h1 style={{ textAlign: "center" }}>🛒 Lista de Compras</h1>

      {/* Presupuesto */}
      <div style={{ backgroundColor: "#e3f2fd", padding: "15px", borderRadius: "8px", marginBottom: "20px" }}>
        <label style={{ fontWeight: "bold" }}>💰 Presupuesto total: $</label>
        <input
          type="number"
          value={presupuesto}
          onChange={(e) => setPresupuesto(Number(e.target.value))}
          style={{ marginLeft: "10px", padding: "5px", width: "100px", border: "1px solid #ccc", borderRadius: "4px" }}
        />
      </div>

      {/* Calculadora de totales */}
      <div style={{ display: "flex", gap: "10px", marginBottom: "20px", flexWrap: "wrap" }}>
        <div style={{ flex: 1, backgroundColor: "#e8f5e9", padding: "10px", borderRadius: "8px", textAlign: "center" }}>
          <strong>Presupuesto</strong><br />${presupuesto}
        </div>
        <div style={{ flex: 1, backgroundColor: "#fff3e0", padding: "10px", borderRadius: "8px", textAlign: "center" }}>
          <strong>Total gastado</strong><br />${totalGastado}
        </div>
        <div style={{ flex: 1, backgroundColor: "#ffebee", padding: "10px", borderRadius: "8px", textAlign: "center" }}>
          <strong>Comprado</strong><br />${totalComprado}
        </div>
        <div style={{ flex: 1, backgroundColor: "#e3f2fd", padding: "10px", borderRadius: "8px", textAlign: "center" }}>
          <strong>Pendiente</strong><br />${totalPendiente}
        </div>
        <div style={{ flex: 1, backgroundColor: disponible >= 0 ? "#c8e6c9" : "#ffcdd2", padding: "10px", borderRadius: "8px", textAlign: "center" }}>
          <strong>Disponible</strong><br />${disponible}
        </div>
      </div>

      {/* Alerta de presupuesto excedido */}
      {disponible < 0 && (
        <div style={{ backgroundColor: "#ffcdd2", color: "#c62828", padding: "10px", borderRadius: "6px", marginBottom: "20px", textAlign: "center" }}>
          ⚠️ ¡Te has excedido del presupuesto por ${Math.abs(disponible)}!
        </div>
      )}

      {/* Formulario para agregar producto */}
      <div style={{ backgroundColor: "#f5f5f5", padding: "15px", borderRadius: "8px", marginBottom: "20px" }}>
        <h3 style={{ margin: "0 0 10px 0" }}>Agregar producto</h3>
        <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
          <input
            type="text"
            value={nuevoProducto}
            onChange={(e) => setNuevoProducto(e.target.value)}
            placeholder="Nombre del producto"
            style={{ flex: 2, padding: "8px", border: "1px solid #ccc", borderRadius: "4px" }}
          />
          <input
            type="number"
            value={precio}
            onChange={(e) => setPrecio(e.target.value)}
            placeholder="Precio $"
            style={{ flex: 1, padding: "8px", border: "1px solid #ccc", borderRadius: "4px" }}
          />
          <select
            value={categoria}
            onChange={(e) => setCategoria(e.target.value)}
            style={{ flex: 1, padding: "8px", border: "1px solid #ccc", borderRadius: "4px" }}
          >
            {categorias.map(cat => (
              <option key={cat.id} value={cat.id}>{cat.nombre}</option>
            ))}
          </select>
          <button
            onClick={agregarProducto}
            style={{ padding: "8px 20px", backgroundColor: "#4caf50", color: "white", border: "none", borderRadius: "4px", cursor: "pointer" }}
          >
            Agregar
          </button>
        </div>
      </div>

      {/* Lista de productos por categoría */}
      {productos.length === 0 ? (
        <div style={{ textAlign: "center", padding: "40px", backgroundColor: "#f9f9f9", borderRadius: "8px" }}>
          <p>📝 Tu lista está vacía. ¡Agrega productos!</p>
        </div>
      ) : (
        categorias.map(cat => {
          const productosCat = productosPorCategoria[cat.id];
          if (productosCat.length === 0) return null;
          const totalCategoria = productosCat.reduce((sum, p) => sum + p.precio, 0);
          return (
            <div key={cat.id} style={{ marginBottom: "25px" }}>
              <h3 style={{
                borderBottom: "2px solid #ddd",
                paddingBottom: "5px",
                marginBottom: "10px"
              }}>
                {cat.nombre} <span style={{ fontSize: "14px", fontWeight: "normal" }}>(${totalCategoria})</span>
              </h3>
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                  <tr><th style={{ textAlign: "left", padding: "8px" }}>Producto</th>
                  <th style={{ textAlign: "left", padding: "8px" }}>Precio</th>
                  <th style={{ textAlign: "center", padding: "8px" }}>Comprado</th>
                  <th style={{ textAlign: "center", padding: "8px" }}>Acción</th>
                </tr>
                </thead>
                <tbody>
                  {productosCat.map(producto => (
                    <tr key={producto.id} style={{ backgroundColor: producto.comprado ? "#e8f5e9" : "white" }}>
                      <td style={{ padding: "8px", textDecoration: producto.comprado ? "line-through" : "none" }}>
                        {producto.nombre}
                      </td>
                      <td style={{ padding: "8px" }}>${producto.precio}</td>
                      <td style={{ padding: "8px", textAlign: "center" }}>
                        <input
                          type="checkbox"
                          checked={producto.comprado}
                          onChange={() => toggleComprado(producto.id)}
                          style={{ cursor: "pointer" }}
                        />
                      </td>
                      <td style={{ padding: "8px", textAlign: "center" }}>
                        <button
                          onClick={() => eliminarProducto(producto.id)}
                          style={{ backgroundColor: "#f44336", color: "white", border: "none", padding: "4px 10px", borderRadius: "4px", cursor: "pointer" }}
                        >
                          Eliminar
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          );
        })
      )}

      {/* Botón limpiar todo */}
      {productos.length > 0 && (
        <button
          onClick={() => setProductos([])}
          style={{
            width: "100%",
            marginTop: "20px",
            padding: "10px",
            backgroundColor: "#9e9e9e",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer"
          }}
        >
          🗑️ Limpiar toda la lista
        </button>
      )}
    </div>
  );
}

export default ListaCompras;