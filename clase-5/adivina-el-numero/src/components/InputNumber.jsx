// ── Componente InputNumber ────────────────────────────────────────────────────
// Composición: componente reutilizable solo para capturar el número
function InputNumber({ valor, onChange, onAdivinar, deshabilitado }) {

  const manejarTecla = (e) => {
    if (e.key === "Enter") onAdivinar();
  };

  return (
    <div className="input-row">
      <input
        className="input-numero"
        type="number"
        min="1"
        max="100"
        placeholder="1 - 100"
        value={valor}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={manejarTecla}
        disabled={deshabilitado}
      />
      {/* Renderizado condicional: botón deshabilitado si ya ganó */}
      <button
        className="btn-adivinar"
        onClick={onAdivinar}
        disabled={deshabilitado}
      >
        Adivinar
      </button>
    </div>
  );
}

export default InputNumber;