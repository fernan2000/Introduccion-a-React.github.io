import React, { useReducer, useRef, useCallback, useState, useEffect } from 'react'
import './InventoryManager.css'

// Estado inicial con 8 productos de ejemplo
const initialProducts = [
  { id: 1, name: 'Laptop Gaming', quantity: 5 },
  { id: 2, name: 'Mouse Inalámbrico', quantity: 12 },
  { id: 3, name: 'Teclado Mecánico', quantity: 8 },
  { id: 4, name: 'Monitor 4K', quantity: 3 },
  { id: 5, name: 'Auriculares Bluetooth', quantity: 15 },
  { id: 6, name: 'Disco SSD 1TB', quantity: 7 },
  { id: 7, name: 'Cámara Web HD', quantity: 6 },
  { id: 8, name: 'Base Refrigerante', quantity: 4 }
]

const initialState = { products: initialProducts }

// Reducer para manejar el inventario
function reducer(state, action) {
  switch (action.type) {
    case 'add':
      return {
        products: [...state.products, {
          id: Date.now(),
          name: action.name.trim(),
          quantity: 1
        }]
      }
    case 'increment':
      return {
        products: state.products.map(p =>
          p.id === action.id ? { ...p, quantity: p.quantity + 1 } : p
        )
      }
    case 'decrement':
      return {
        products: state.products.map(p =>
          p.id === action.id && p.quantity > 1 ?
          { ...p, quantity: p.quantity - 1 } :
          p
        )
      }
    case 'remove':
      return {
        products: state.products.filter(p => p.id !== action.id)
      }
    case 'clear':
      return {
        products: []
      }
    case 'reset':
      return {
        products: initialProducts
      }
    default:
      return state
  }
}

function InventoryManager() {
  // ✅ useReducer - Manejo de estado complejo
  const [state, dispatch] = useReducer(reducer, initialState, () => {
    const saved = localStorage.getItem('inventory')
    return saved ? JSON.parse(saved) : initialState
  })

  // ✅ Guardar en localStorage con useEffect
  useEffect(() => {
    localStorage.setItem('inventory', JSON.stringify(state))
  }, [state])

  // ✅ useRef - Referencia al input
  const inputRef = useRef(null)

  // ✅ useState - Búsqueda de productos
  const [searchTerm, setSearchTerm] = useState('')
  const [showStats, setShowStats] = useState(true)

  // ✅ useCallback - Optimización de funciones
  const handleAddProduct = useCallback(() => {
    const value = inputRef.current.value
    if (value.trim() !== '') {
      dispatch({ type: 'add', name: value.trim() })
      inputRef.current.value = ''
      inputRef.current.focus()
    }
  }, [])

  const handleIncrement = useCallback((id) => {
    dispatch({ type: 'increment', id })
  }, [])

  const handleDecrement = useCallback((id) => {
    dispatch({ type: 'decrement', id })
  }, [])

  const handleRemove = useCallback((id) => {
    if (confirm('¿Eliminar este producto del inventario?')) {
      dispatch({ type: 'remove', id })
    }
  }, [])

  const handleClear = useCallback(() => {
    if (state.products.length > 0 && confirm('⚠️ ¿Seguro que quieres vaciar todo el inventario?')) {
      dispatch({ type: 'clear' })
    }
  }, [state.products])

  const handleReset = useCallback(() => {
    if (confirm('🔄 ¿Restaurar los productos de ejemplo?')) {
      dispatch({ type: 'reset' })
    }
  }, [])

  // Filtrar productos por búsqueda
  const filteredProducts = state.products.filter(p =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  // Calcular estadísticas
  const totalProducts = state.products.length
  const totalItems = state.products.reduce((sum, p) => sum + p.quantity, 0)
  const lowStock = state.products.filter(p => p.quantity <= 3).length

  return (
    <div className="inventory-container">
      {/* Header con estadísticas mejorado */}
      <header className="inventory-header">
        <div className="header-left">
          <h1>🛒 Gestor de Inventario</h1>
          <p className="header-subtitle">Administra tus productos eficientemente</p>
        </div>
        <div className="stats-grid">
          <div className="stat-item">
            <span className="stat-icon">📦</span>
            <div>
              <span className="stat-value">{totalProducts}</span>
              <span className="stat-label">Productos</span>
            </div>
          </div>
          <div className="stat-item">
            <span className="stat-icon">📊</span>
            <div>
              <span className="stat-value">{totalItems}</span>
              <span className="stat-label">Total Unidades</span>
            </div>
          </div>
          <div className="stat-item">
            <span className="stat-icon">⚠️</span>
            <div>
              <span className="stat-value">{lowStock}</span>
              <span className="stat-label">Stock Bajo</span>
            </div>
          </div>
        </div>
      </header>

      {/* Sección de agregar mejorada */}
      <div className="add-section">
        <div className="input-group">
          <input
            ref={inputRef}
            type="text"
            placeholder="📝 Nombre del producto..."
            className="product-input"
            onKeyDown={(e) => e.key === 'Enter' && handleAddProduct()}
          />
          <button onClick={handleAddProduct} className="btn btn-primary">
            ➕ Agregar
          </button>
        </div>
      </div>

      {/* Buscador mejorado */}
      <div className="search-section">
        <input
          type="text"
          placeholder="🔍 Buscar productos..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
        {searchTerm && (
          <span className="search-clear" onClick={() => setSearchTerm('')}>
            ✕
          </span>
        )}
        <span className="search-results">
          {filteredProducts.length} de {totalProducts} productos
        </span>
      </div>

      {/* Lista de productos mejorada */}
      <div className="product-list">
        {filteredProducts.length === 0 ? (
          <div className="empty-state">
            {searchTerm ? (
              <>
                <span className="empty-icon">🔍</span>
                <p>No se encontraron productos para "<strong>{searchTerm}</strong>"</p>
              </>
            ) : (
              <>
                <span className="empty-icon">📭</span>
                <p>No hay productos en el inventario</p>
                <button onClick={handleReset} className="btn btn-secondary">
                  📥 Cargar productos de ejemplo
                </button>
              </>
            )}
          </div>
        ) : (
          filteredProducts.map((product) => (
            <div key={product.id} className="product-item">
              <div className="product-info">
                <span className="product-name">{product.name}</span>
                <div className="product-badges">
                  <span className={`stock-badge ${product.quantity <= 3 ? 'low' : product.quantity >= 10 ? 'high' : 'medium'}`}>
                    {product.quantity <= 3 ? '⚠️ Stock Bajo' : 
                     product.quantity >= 10 ? '✅ Stock Alto' : 
                     '📦 Stock Medio'}
                  </span>
                </div>
              </div>
              <div className="product-quantity-control">
                <span className="quantity-display">
                  <span className="quantity-number">{product.quantity}</span>
                  <span className="quantity-label">unidades</span>
                </span>
                <div className="product-actions">
                  <button 
                    onClick={() => handleDecrement(product.id)} 
                    className="btn btn-secondary"
                    disabled={product.quantity <= 1}
                  >
                    ➖
                  </button>
                  <button 
                    onClick={() => handleIncrement(product.id)} 
                    className="btn btn-secondary"
                  >
                    ➕
                  </button>
                  <button 
                    onClick={() => handleRemove(product.id)} 
                    className="btn btn-danger"
                  >
                    🗑️
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Acciones del inventario mejoradas */}
      <div className="inventory-actions">
        <div className="actions-left">
          {state.products.length > 0 && (
            <>
              <button onClick={handleClear} className="btn btn-danger">
                🧹 Vaciar Inventario
              </button>
              <button onClick={handleReset} className="btn btn-secondary">
                🔄 Restaurar Ejemplos
              </button>
            </>
          )}
        </div>
        <div className="actions-right">
          <button 
            onClick={() => {
              setSearchTerm('')
              inputRef.current?.focus()
            }} 
            className="btn btn-secondary"
          >
            🔍 Limpiar Búsqueda
          </button>
        </div>
      </div>
    </div>
  )
}

export default InventoryManager