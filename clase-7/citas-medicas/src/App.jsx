import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Citas from './pages/Citas'
import CitaDetalle from './pages/CitaDetalle'
import NotFound from './pages/NotFound'
import Navbar from './components/Navbar'
import './App.css'

function App() {
  return (
    <BrowserRouter basename="/Introduccion-a-React.github.io/clase-7/citas-medicas">
      <div className="app">
        <Navbar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/citas" element={<Citas />} />
            <Route path="/cita/:id" element={<CitaDetalle />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <footer className="footer">
          <p>© 2024 - Gestión de Citas Médicas</p>
        </footer>
      </div>
    </BrowserRouter>
  )
}

export default App