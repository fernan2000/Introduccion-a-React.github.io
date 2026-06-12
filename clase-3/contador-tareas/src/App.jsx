import { useState, useEffect, useMemo } from "react";
import "./App.css";



const STORAGE_KEY = "contador-tareas";
function App() {
  const [tareas, setTareas] = useState(() => {
    try {
      const guardadas = localStorage.getItem(STORAGE_KEY);
      return guardadas ? JSON.parse(guardadas) : [];
    } catch {
      return [];
    }
  });

  const [nuevaTarea, setNuevaTarea] = useState("");
  const [duracion, setDuracion]     = useState("");
  const [filtro, setFiltro]         = useState("todas");
  const [ordenar, setOrdenar]       = useState("recientes"); // recientes | antiguas | cortas | largas

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tareas));
  }, [tareas]);

  const tiempoTotal = useMemo(() => {
    console.log("Calculando tiempo total...");
    return tareas.reduce((total, t) => total + t.duracion, 0);
  }, [tareas]);

  useEffect(() => {
    document.title = tareas.length > 0
      ? `⏱️ ${tiempoTotal} min · ${tareas.length} tareas`
      : "Contador de Tareas";
  }, [tiempoTotal, tareas.length]);

  const tareasProcesadas = useMemo(() => {
    // 1. Filtrar por duración
    let resultado = tareas;
    if (filtro === "cortas")    resultado = tareas.filter((t) => t.duracion <= 30);
    if (filtro === "largas")    resultado = tareas.filter((t) => t.duracion > 30);
    if (filtro === "recientes") {
      const hace1h = Date.now() - 60 * 60 * 1000;
      resultado = tareas.filter((t) => t.creadaEn >= hace1h);
    }

    // 2. Ordenar
    return [...resultado].sort((a, b) => {
      if (ordenar === "recientes") return b.creadaEn - a.creadaEn;
      if (ordenar === "antiguas")  return a.creadaEn - b.creadaEn;
      if (ordenar === "cortas")    return a.duracion - b.duracion;
      if (ordenar === "largas")    return b.duracion - a.duracion;
      return 0;
    });
  }, [tareas, filtro, ordenar]);

  const agregarTarea = () => {
    if (nuevaTarea.trim() && duracion) {
      setTareas((prev) => [
        ...prev,
        {
          id:       Date.now(),
          nombre:   nuevaTarea.trim(),
          duracion: parseInt(duracion),
          creadaEn: Date.now(), // timestamp para filtro "recientes"
        },
      ]);
      setNuevaTarea("");
      setDuracion("");
    }
  };

  const eliminarTarea = (id) => {
    setTareas((prev) => prev.filter((t) => t.id !== id));
  };

  const limpiarTodo = () => {
    if (window.confirm("¿Eliminar todas las tareas?")) {
      setTareas([]);
    }
  };

  const manejarTecla = (e) => {
    if (e.key === "Enter") agregarTarea();
  };

  const formatearTiempo = (minutos) => {
    if (minutos < 60) return `${minutos} min`;
    return `${Math.floor(minutos / 60)}h ${minutos % 60}m`;
  };

  const formatearFecha = (timestamp) => {
    const d = new Date(timestamp);
    return d.toLocaleTimeString("es-MX", { hour: "2-digit", minute: "2-digit" });
  };

  return (
    <div className="app">
      <div className="card">



        <div className="header">
          <span className="header-icono">⏱️</span>
          <h1>Contador de Tareas</h1>
          {tareas.length > 0 && (
            <button className="btn-limpiar" onClick={limpiarTodo} title="Limpiar todo">
              🗑️ Limpiar
            </button>
          )}
        </div>



        <div className="formulario">
          <p className="formulario-titulo">➕ Nueva tarea</p>
          <div className="fila-inputs">
            <input
              className="input-texto"
              type="text"
              placeholder="Nombre de la tarea"
              value={nuevaTarea}
              onChange={(e) => setNuevaTarea(e.target.value)}
              onKeyDown={manejarTecla}
              maxLength={60}
            />
            <input
              className="input-numero"
              type="number"
              placeholder="Minutos"
              min="1"
              max="999"
              value={duracion}
              onChange={(e) => setDuracion(e.target.value)}
              onKeyDown={manejarTecla}
            />
          </div>
          <button className="btn-agregar" onClick={agregarTarea}>
            + Agregar tarea
          </button>
        </div>



        {tareas.length > 0 && (
          <div className="resumen">
            <div className="resumen-dato">
              <span className="resumen-numero">{tareas.length}</span>
              <span className="resumen-label">tareas</span>
            </div>
            <div className="resumen-divider" />
            <div className="resumen-dato">
              <span className="resumen-numero">{tiempoTotal}</span>
              <span className="resumen-label">minutos</span>
            </div>
            <div className="resumen-divider" />
            <div className="resumen-dato">
              <span className="resumen-numero">{formatearTiempo(tiempoTotal)}</span>
              <span className="resumen-label">en horas</span>
            </div>
          </div>
        )}



        {tareas.length > 0 && (
          <div className="storage-badge">
            💾 Guardado automáticamente · se mantiene al recargar
          </div>
        )}




        {tareas.length > 0 && (
          <div className="controles">
            <div className="control-grupo">
              <p className="control-label">Filtrar</p>
              <div className="filtros">
                {[
                  { id: "todas",    emoji: "📋", texto: "Todas" },
                  { id: "recientes",emoji: "🕐", texto: "Última hora" },
                  { id: "cortas",   emoji: "⚡", texto: "≤30 min" },
                  { id: "largas",   emoji: "🏋️", texto: ">30 min" },
                ].map((f) => (
                  <button
                    key={f.id}
                    className={`btn-filtro ${filtro === f.id ? "activo" : ""}`}
                    onClick={() => setFiltro(f.id)}
                  >
                    {f.emoji} {f.texto}
                  </button>
                ))}
              </div>
            </div>

            <div className="control-grupo">
              <p className="control-label">Ordenar</p>
              <div className="filtros">
                {[
                  { id: "recientes", texto: "⬇️ Recientes" },
                  { id: "antiguas",  texto: "⬆️ Antiguas" },
                  { id: "cortas",    texto: "⚡ Más cortas" },
                  { id: "largas",    texto: "🏋️ Más largas" },
                ].map((o) => (
                  <button
                    key={o.id}
                    className={`btn-filtro ${ordenar === o.id ? "activo" : ""}`}
                    onClick={() => setOrdenar(o.id)}
                  >
                    {o.texto}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {tareas.length === 0 && (
          <div className="lista-vacia">
            <span className="icono-vacio">📝</span>
            No hay tareas aún.
            <br />
            Agrega una tarea arriba.
          </div>
        )}

        {tareas.length > 0 && tareasProcesadas.length === 0 && (
          <p className="sin-resultados">
            No hay tareas que coincidan con el filtro seleccionado.
          </p>
        )}

        {tareasProcesadas.length > 0 && (
          <ul className="lista">
            {tareasProcesadas.map((tarea) => (
              <li key={tarea.id} className="item">
                <div className="item-info">
                  <span className="item-nombre">{tarea.nombre}</span>
                  <span className="item-duracion">{tarea.duracion} min</span>
                </div>
                <div className="item-barra-wrap">
                  <div
                    className="item-barra"
                    style={{
                      width: `${Math.min((tarea.duracion / Math.max(tiempoTotal, 1)) * 100, 100)}%`,
                    }}
                  />
                </div>
                <div className="item-footer">
                  <span className="item-hora">🕐 {formatearFecha(tarea.creadaEn)}</span>
                  <button
                    className="btn-eliminar"
                    onClick={() => eliminarTarea(tarea.id)}
                    title="Eliminar"
                  >
                    🗑️
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}

      </div>
    </div>
  );
}

export default App;