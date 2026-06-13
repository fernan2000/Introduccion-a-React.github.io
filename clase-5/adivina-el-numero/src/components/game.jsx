import { useState } from "react";
import InputNumber  from "./InputNumber";
import Message      from "./Message";
import RestartButton from "./RestartButton";

// ── Genera un número aleatorio entre 1 y 100 ──────────────────────────────────
const generarNumero = () => Math.floor(Math.random() * 100) + 1;

// ── Componente Game ───────────────────────────────────────────────────────────
// Componente principal que compone todos los demás (composición de componentes)
function Game() {
  const [numeroSecreto, setNumeroSecreto] = useState(generarNumero);
  const [input,         setInput]         = useState("");
  const [estado,        setEstado]        = useState(null);   // null | "mayor" | "menor" | "correcto"
  const [intentos,      setIntentos]      = useState(0);
  const [historial,     setHistorial]     = useState([]);

  // ── Lógica principal: comparar números ───────────────────────────────────
  const adivinar = () => {
    const numero = parseInt(input);
    if (!numero || numero < 1 || numero > 100) return;

    const nuevosIntentos = intentos + 1;
    setIntentos(nuevosIntentos);
    setHistorial((prev) => [numero, ...prev]);

    // Renderizado condicional depende de este estado
    if (numero === numeroSecreto)     setEstado("correcto");
    else if (numero < numeroSecreto)  setEstado("mayor");
    else                              setEstado("menor");

    setInput("");
  };

  // ── Reiniciar juego ───────────────────────────────────────────────────────
  const reiniciar = () => {
    setNumeroSecreto(generarNumero());
    setInput("");
    setEstado(null);
    setIntentos(0);
    setHistorial([]);
  };

  // ── Calcular ancho de la barra de progreso ────────────────────────────────
  const progreso = Math.min((intentos / 10) * 100, 100);
  const colorBarra = intentos <= 5 ? "#22c55e" : intentos <= 8 ? "#f59e0b" : "#ef4444";

  return (
    <div className="game">

      {/* Encabezado */}
      <div className="game-header">
        <span className="game-icono">🎯</span>
        <h1>Adivina el Número</h1>
        <p className="game-sub">Un número del 1 al 100</p>
      </div>

      {/* Contador de intentos */}
      <div className="intentos-wrap">
        <div className="intentos-info">
          <span className="intentos-label">Intentos</span>
          <span className="intentos-count">{intentos}</span>
        </div>
        <div className="barra-wrap">
          <div
            className="barra-progreso"
            style={{ width: `${progreso}%`, background: colorBarra }}
          />
        </div>
      </div>

      {/* Composición: InputNumber solo si no ha ganado */}
      {/* Renderizado condicional con operador ternario */}
      {estado !== "correcto" ? (
        <InputNumber
          valor={input}
          onChange={setInput}
          onAdivinar={adivinar}
          deshabilitado={estado === "correcto"}
        />
      ) : (
        <div className="ganaste-banner">
          🏆 ¡El número era el <strong>{numeroSecreto}</strong>!
        </div>
      )}

      {/* Composición: Message con renderizado condicional interno */}
      <Message estado={estado} intentos={intentos} />

      {/* Composición: RestartButton solo aparece al ganar */}
      <RestartButton mostrar={estado === "correcto"} onRestart={reiniciar} />

      {/* Historial de intentos */}
      {historial.length > 0 && (
        <div className="historial">
          <p className="historial-titulo">Intentos anteriores</p>
          <div className="historial-lista">
            {historial.map((n, i) => (
              <span
                key={i}
                className={`historial-item ${
                  n === numeroSecreto ? "acierto" :
                  n < numeroSecreto   ? "bajo"    : "alto"
                }`}
              >
                {n}
              </span>
            ))}
          </div>
        </div>
      )}

    </div>
  );
}

export default Game;