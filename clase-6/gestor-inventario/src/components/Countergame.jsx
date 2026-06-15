import { useReducer, useRef, useCallback, useEffect } from "react";
const initialState = { count: 0, history: [] };




function reducer(state, action) {
  switch (action.type) {

    case "increment":
      return {
        count: state.count + 1,
        history: [...state.history, { valor: state.count + 1, tipo: "+" }],
      };

    case "decrement":
      return {
        count: state.count - 1,
        history: [...state.history, { valor: state.count - 1, tipo: "-" }],
      };

    case "incrementBy":
      return {
        count: state.count + action.amount,
        history: [...state.history, { valor: state.count + action.amount, tipo: `+${action.amount}` }],
      };

    //deshacer ultima accion
    case "undo": {
      if (state.history.length === 0) return state;
      const newHistory = state.history.slice(0, -1);
      const prevCount  = newHistory.length > 0
        ? newHistory[newHistory.length - 1].valor
        : 0;
      return { count: prevCount, history: newHistory };
    }

    case "reset":
      return initialState;

    default:
      return state;
  }
}

// ── CounterGame ───────────────
function CounterGame() {
  const [state, dispatch] = useReducer(reducer, () => {
    // Ejercicio 3: cargar historial desde localStorage
    try {
      const saved = localStorage.getItem("counter-state");
      return saved ? JSON.parse(saved) : initialState;
    } catch { return initialState; }
  });

  //incrementar en numero especifico
  const inputRef      = useRef(null);
  const incrementRef  = useRef(null);




  useEffect(() => {
    incrementRef.current?.focus();
  }, []);




  useEffect(() => {
    localStorage.setItem("counter-state", JSON.stringify(state));
  }, [state]);



  const handleIncrement  = useCallback(() => dispatch({ type: "increment" }),  []);
  const handleDecrement  = useCallback(() => dispatch({ type: "decrement" }),  []);
  const handleReset      = useCallback(() => dispatch({ type: "reset" }),      []);
  const handleUndo       = useCallback(() => dispatch({ type: "undo" }),       []);

  const handleIncrementBy = useCallback(() => {
    const amount = parseInt(inputRef.current?.value);
    if (!isNaN(amount) && amount !== 0) {
      dispatch({ type: "incrementBy", amount });
      inputRef.current.value = "";
      inputRef.current.focus();
    }
  }, []);

  const colorCount = state.count > 0 ? "#22c55e" : state.count < 0 ? "#ef4444" : "#4f46e5";

  return (
    <div className="seccion">
      <h2 className="seccion-titulo">🎮 Contador Interactivo</h2>

      {/* Contador */}
      <div className="contador-display" style={{ color: colorCount }}>
        {state.count}
      </div>



      <div className="botones-grid">
        <button ref={incrementRef} className="btn btn-verde" onClick={handleIncrement}>+ 1</button>
        <button className="btn btn-rojo"  onClick={handleDecrement}>− 1</button>
        <button className="btn btn-gris"  onClick={handleUndo}     disabled={state.history.length === 0}>↩ Deshacer</button>
        <button className="btn btn-gris"  onClick={handleReset}    disabled={state.count === 0 && state.history.length === 0}>🔄 Reiniciar</button>
      </div>

      {/*personalizado   */}
      <div className="input-row">
        <input
          ref={inputRef}
          className="input-texto"
          type="number"
          placeholder="Sumar/restar número..."
        />
        <button className="btn btn-morado" onClick={handleIncrementBy}>Aplicar</button>
      </div>

      {/* Historial */}
      {state.history.length > 0 && (
        <div className="historial">
          <p className="historial-label">Historial ({state.history.length} cambios)</p>
          <div className="historial-lista">
            {[...state.history].reverse().map((h, i) => (
              <span key={i} className={`historial-chip ${h.tipo.startsWith("+") ? "chip-verde" : "chip-rojo"}`}>
                {h.tipo} → {h.valor}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default CounterGame;