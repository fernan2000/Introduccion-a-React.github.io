import CounterGame       from "./components/CounterGame";
import InventoryManager  from "./components/InventoryManager";
import "./App.css";



function App() {
  return (
    <div className="app">
      <div className="page">
        <div className="page-header">
          <span className="page-icono">⚙️</span>
          <h1>Hooks Avanzados</h1>
          <p className="page-sub">useReducer · useRef · useCallback</p>
        </div>
        <CounterGame />
        <InventoryManager />
      </div>
    </div>
  );
}

export default App;