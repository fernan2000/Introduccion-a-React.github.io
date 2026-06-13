import { useEffect } from "react";

// ── Componente Planeta ────────────────────────────────────────────────────────
// Demuestra montaje y desmontaje del ciclo de vida
function Planeta({ nombre, descripcion, imagen, onEliminar, onEditar }) {

  // useEffect con [] → solo se ejecuta al MONTAR el componente
  useEffect(() => {
    console.log(`🪐 ¡El planeta ${nombre} ha aparecido!`); // Montaje

    // La función return se ejecuta al DESMONTAR el componente
    return () => {
      console.log(`💨 ¡El planeta ${nombre} ha desaparecido!`); // Desmontaje
    };
  }, []);

  return (
    <li className="planeta-card">
      {imagen && (
        <img src={imagen} alt={nombre} className="planeta-img" />
      )}
      <div className="planeta-info">
        <h3 className="planeta-nombre">🪐 {nombre}</h3>
        <p className="planeta-desc">{descripcion}</p>
      </div>
      <div className="planeta-acciones">
        <button className="btn-editar" onClick={() => onEditar({ nombre, descripcion, imagen })}>
          ✏️
        </button>
        <button className="btn-del" onClick={onEliminar}>
          🗑️
        </button>
      </div>
    </li>
  );
}

export default Planeta;