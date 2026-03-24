// App.jsx — Main Router
import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Navbar  from './components/Navbar'
import Footer  from './components/Footer'
import Login           from './pages/Login'
import Register        from './pages/Register'
import Home            from './pages/Home'
import AddRecord       from './pages/AddRecord'
import RecordDetails   from './pages/RecordDetails'
import BookAppointment from './pages/BookAppointment'
import Appointments    from './pages/Appointments'

// Protected Route — redirects to /login if not logged in
const Protected = ({ children }) => {
  const token = localStorage.getItem('token')
  return token ? children : <Navigate to="/login" replace />
}

export default function App() {
  return (
    <BrowserRouter>
      <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <Navbar />
        <main style={{ flex: 1 }}>
          <Routes>
            {/* Public */}
            <Route path="/"         element={<Navigate to="/login" replace />} />
            <Route path="/login"    element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* Protected */}
            <Route path="/dashboard"        element={<Protected><Home /></Protected>} />
            <Route path="/records"          element={<Protected><RecordDetails /></Protected>} />
            <Route path="/add-record"       element={<Protected><AddRecord /></Protected>} />
            <Route path="/appointments"     element={<Protected><Appointments /></Protected>} />
            <Route path="/book-appointment" element={<Protected><BookAppointment /></Protected>} />

            {/* Fallback */}
            <Route path="*" element={<Navigate to="/dashboard" replace />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  )
}