import { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Home from './pages/Home'
import Profile from './pages/Profile'
import Login from './pages/Login'
import Navbar from './components/Navbar'
import './App.css'

function App() {
  const [user, setUser] = useState(null)

  // Cargar usuario desde localStorage al iniciar
  useEffect(() => {
    const storedUser = localStorage.getItem('twitter_user')
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
  }, [])

  const login = (username) => {
    const userData = { username, loginTime: new Date().toISOString() }
    setUser(userData)
    localStorage.setItem('twitter_user', JSON.stringify(userData))
  }



  const logout = () => {
    setUser(null)
    localStorage.removeItem('twitter_user')
  }

  return (
    <BrowserRouter basename="/Introduccion-a-React.github.io/clase-8/twitter-clone">
      <div className="app">
        <Navbar user={user} logout={logout} />
        <main className="main-content">
          <Routes>
            <Route path="/login" element={<Login onLogin={login} />} />
            <Route path="/" element={<Home user={user} />} />
            <Route 
              path="/profile" 
              element={user ? <Profile user={user} /> : <Navigate to="/login" />} 
            />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  )
}

export default App