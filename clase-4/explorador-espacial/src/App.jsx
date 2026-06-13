import { useState, useEffect, useMemo, useRef } from "react";
import Planeta from "./Planeta";
import "./App.css";

const STORAGE_KEY = "bitacora-planetas";
const FORM_VACIO = { nombre: "", descripcion: "", imagen: null };

function App() {
  // ── Estados del panel de control ─────────────────
  const [distancia,    setDistancia]    = useState(0);
  const [combustible,  setCombustible]  = useState(100);
  const [estadoNave,   setEstadoNave]   = useState("En órbita");
  const [vueloActivo,  setVueloActivo]  = useState(false); // inicia apagado

  // ── Estados de la bitácora ────────────────────────────────────────────────
  const [planetas, setPlanetas] = useState(() => {
    try {
      const guardados = localStorage.getItem(STORAGE_KEY);
      return guardados ? JSON.parse(guardados) : [];
    } catch { return []; }
  });

  const [form,        setForm]        = useState(FORM_VACIO);
  const [editandoIdx, setEditandoIdx] = useState(null);
  const inputImagenRef = useRef(null);

  // ── useEffect 1: MONTAJE — mensaje de bienvenida ──────────────────────────
  useEffect(() => {
    console.log("🚀 ¡El panel de control está listo!");
    return () => {
      console.log("🔴 El panel de control se ha apagado.");
    };
  }, []);

  // ── useEffect 2: controla el intervalo según vueloActivo ─────────────────
  useEffect(() => {
    if (!vueloActivo) return; // no hace nada si el vuelo está detenido

    const intervalo = setInterval(() => {
      setCombustible((prev) => {
        if (prev <= 0) { clearInterval(intervalo); setVueloActivo(false); return 0; }
        return parseFloat((prev - 0.5).toFixed(1));
      });
      setDistancia((prev) => parseFloat((prev + 10).toFixed(0)));
    }, 1000);

    return () => clearInterval(intervalo); // limpia al pausar o desmontar
  }, [vueloActivo]);

  // ── useEffect 3: reacciona al cambio de combustible ──────────────────────
  useEffect(() => {
    console.log(`⛽ ¡Combustible actualizado! ${combustible}%`);
    if (combustible <= 0) setEstadoNave("Sin combustible");
  }, [combustible]);

  // ── useEffect 4: guarda planetas en localStorage ──────────────────────────
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(planetas));
  }, [planetas]);

  // ── useMemo: mensaje de estado ────────────────────────────────────────────
  const mensajeEstado = useMemo(() => {
    if (!vueloActivo && estadoNave === "En órbita") return "⏸️ Nave en espera";
    if (estadoNave === "En órbita")               return "🛸 En órbita — todo nominal";
    if (estadoNave === "Aterrizando")             return "🪐 Aterrizando...";
    if (estadoNave === "Sin combustible")         return "⚠️ Sin combustible";
    return `🔧 ${estadoNave}`;
  }, [estadoNave, vueloActivo]);

  // ── useMemo: color de combustible ─────────────────────────────────────────
  const colorCombustible = useMemo(() => {
    if (combustible > 60) return "#22c55e";
    if (combustible > 30) return "#f59e0b";
    return "#ef4444";
  }, [combustible]);

  // ── Iniciar vuelo ─────────────────────────────────────────────────────────
  const iniciarVuelo = () => {
    setEstadoNave("En órbita");
    setVueloActivo(true);
  };

  // ── Aterrizar ─────────────────────────────────────────────────────────────
  const aterrizar = () => {
    setEstadoNave("Aterrizando");
    setVueloActivo(false);
  };

  // ── Formulario ────────────────────────────────────────────────────────────
  const actualizarForm = (campo, valor) => {
    setForm((prev) => ({ ...prev, [campo]: valor }));
  };

  const guardarPlaneta = (e) => {
    e.preventDefault();
    if (!form.nombre.trim() || !form.descripcion.trim()) return;

    const planetaData = {
      nombre:      form.nombre.trim(),
      descripcion: form.descripcion.trim(),
      imagen:      form.imagen,
    };

    if (editandoIdx !== null) {
      setPlanetas((prev) => prev.map((p, i) => i === editandoIdx ? planetaData : p));
      setEditandoIdx(null);
    } else {
      setPlanetas((prev) => [...prev, planetaData]);
    }

    setForm(FORM_VACIO);
    if (inputImagenRef.current) inputImagenRef.current.value = "";
  };

  const iniciarEdicion = (planeta, index) => {
    setEditandoIdx(index);
    setForm({ nombre: planeta.nombre, descripcion: planeta.descripcion, imagen: planeta.imagen });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const eliminarPlaneta = (index) => {
    setPlanetas((prev) => prev.filter((_, i) => i !== index));
    if (editandoIdx === index) { setEditandoIdx(null); setForm(FORM_VACIO); }
  };

  const manejarImagen = (e) => {
    const archivo = e.target.files[0];
    if (!archivo) return;
    const reader = new FileReader();
    reader.onloadend = () => actualizarForm("imagen", reader.result);
    reader.readAsDataURL(archivo);
  };

  // ─── Render ───────────────────────────────────────────────────────────────
  return (
    <div className="app">
      <div className="card">

        {/* Header */}
        <div className="header">
          <span className="header-icono">🚀</span>
          <h1>Panel de Control</h1>
          <span className="nave-estado">{mensajeEstado}</span>
        </div>

        {/* Panel de vuelo */}
        <div className="panel-vuelo">
          <div className="panel-dato">
            <span className="panel-valor">{distancia.toLocaleString()}</span>
            <span className="panel-label">km recorridos</span>
          </div>
          <div className="panel-divider" />
          <div className="panel-dato">
            <span className="panel-valor" style={{ color: colorCombustible }}>
              {combustible}%
            </span>
            <span className="panel-label">combustible</span>
          </div>
          <div className="panel-divider" />
          <div className="panel-dato">
            <span className="panel-valor">{planetas.length}</span>
            <span className="panel-label">planetas</span>
          </div>
        </div>

        {/* Barra de combustible */}
        <div className="barra-wrap">
          <div
            className="barra-combustible"
            style={{ width: `${combustible}%`, background: colorCombustible }}
          />
        </div>

        {/* Botones de control */}
        <div className="fila-controles">
          {/* Iniciar vuelo */}
          {!vueloActivo && combustible > 0 && estadoNave !== "Aterrizando" && (
            <button className="btn-iniciar" onClick={iniciarVuelo}>
              🚀 Iniciar vuelo
            </button>
          )}

          {/* Aterrizar */}
          {vueloActivo && combustible > 0 && (
            <button className="btn-aterrizar" onClick={aterrizar}>
              🪐 Aterrizar y registrar planeta
            </button>
          )}
        </div>

        {/* Bitácora */}
        <div className="seccion-titulo">📓 Bitácora de Exploración</div>

        <div className="formulario">
          <p className="formulario-titulo">
            {editandoIdx !== null ? "✏️ Editando planeta" : "➕ Registrar planeta"}
          </p>
          <input
            className="input-texto"
            type="text"
            placeholder="Nombre del planeta"
            value={form.nombre}
            onChange={(e) => actualizarForm("nombre", e.target.value)}
            maxLength={50}
          />
          <textarea
            className="input-textarea"
            placeholder="Descripción del planeta..."
            value={form.descripcion}
            onChange={(e) => actualizarForm("descripcion", e.target.value)}
            rows={3}
            maxLength={200}
          />
          <label className="label-imagen">
            📷 Imagen (opcional)
            <input
              type="file"
              accept="image/*"
              onChange={manejarImagen}
              ref={inputImagenRef}
              className="input-file"
            />
          </label>
          <div className="fila-botones">
            <button className="btn-agregar" onClick={guardarPlaneta}>
              {editandoIdx !== null ? "💾 Guardar cambios" : "+ Registrar"}
            </button>
            {editandoIdx !== null && (
              <button className="btn-cancelar" onClick={() => { setEditandoIdx(null); setForm(FORM_VACIO); }}>
                Cancelar
              </button>
            )}
          </div>
        </div>

        {planetas.length === 0 ? (
          <div className="lista-vacia">
            <span className="icono-vacio">🌌</span>
            No hay planetas registrados.
            <br />
            ¡Inicia el vuelo, aterriza y empieza a explorar!
          </div>
        ) : (
          <ul className="lista-planetas">
            {planetas.map((planeta, index) => (
              <Planeta
                key={index}
                nombre={planeta.nombre}
                descripcion={planeta.descripcion}
                imagen={planeta.imagen}
                onEliminar={() => eliminarPlaneta(index)}
                onEditar={() => iniciarEdicion(planeta, index)}
              />
            ))}
          </ul>
        )}

      </div>
    </div>
  );
}

export default App;