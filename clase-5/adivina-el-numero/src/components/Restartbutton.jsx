// ── Componente RestartButton ──────────────────────────────────────────────────
// Composición: componente independiente y reutilizable para reiniciar
function RestartButton({ onRestart, mostrar }) {
  // Renderizado condicional: solo aparece cuando el juego terminó
  if (!mostrar) return null;

  return (
    <button className="btn-restart" onClick={onRestart}>
      🔄 Jugar de nuevo
    </button>
  );
}

export default RestartButton;