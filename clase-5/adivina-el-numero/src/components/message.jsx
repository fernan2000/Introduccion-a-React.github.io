// ── Componente Message ────────────────────────────────────────────────────────
// Renderizado condicional: muestra diferente contenido según el estado del juego
function Message({ estado, intentos }) {
  // Si no hay estado todavía, no muestra nada
  if (!estado) return null;

  // Renderizado condicional con if/else
  if (estado === "correcto") {
    return (
      <div className="mensaje mensaje-correcto">
        <span className="mensaje-icono">🎉</span>
        <p className="mensaje-texto">¡Correcto! Lo lograste</p>
        <p className="mensaje-sub">en {intentos} {intentos === 1 ? "intento" : "intentos"}</p>
      </div>
    );
  }

  if (estado === "mayor") {
    return (
      <div className="mensaje mensaje-pista">
        <span className="mensaje-icono">⬆️</span>
        <p className="mensaje-texto">El número es mayor</p>
        <p className="mensaje-sub">intenta con un número más grande</p>
      </div>
    );
  }

  if (estado === "menor") {
    return (
      <div className="mensaje mensaje-pista">
        <span className="mensaje-icono">⬇️</span>
        <p className="mensaje-texto">El número es menor</p>
        <p className="mensaje-sub">intenta con un número más pequeño</p>
      </div>
    );
  }

  return null;
}

export default Message;