import './App.css'
import { Routes, Route, Link } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'

function App() {

  return (
    <div>
      <nav>
        <ul>
          <Link to="/">Home</Link>
          <Link to="/login">Login</Link>
          <Link to="/register">Refister</Link>
        </ul>
      </nav>
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
