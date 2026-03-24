import React from 'react'
// components/Navbar.jsx
import { Link, useNavigate, useLocation } from 'react-router-dom'

export default function Navbar() {
  const navigate = useNavigate()
  const location = useLocation()
  const user = JSON.parse(localStorage.getItem('user') || 'null')

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    navigate('/login')
  }

  const isActive = (path) => location.pathname === path

  if (!user) return null

  return (
    <nav style={{
      background: 'white',
      borderBottom: '1px solid #e5e7eb',
      padding: '0 24px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      height: '64px',
      position: 'sticky',
      top: 0,
      zIndex: 100,
      boxShadow: '0 1px 8px rgba(0,0,0,0.06)'
    }}>
      {/* Logo */}
      <Link to="/dashboard" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '10px' }}>
        <span style={{ fontSize: '24px' }}>🏥</span>
        <span style={{ fontWeight: '700', fontSize: '18px', color: '#00897B' }}>HealthApp</span>
      </Link>

      {/* Nav Links */}
      <div style={{ display: 'flex', gap: '4px' }}>
        {[
          { path: '/dashboard',    label: '🏠 Dashboard' },
          { path: '/records',      label: '📋 Records' },
          { path: '/add-record',   label: '➕ Add Record' },
          { path: '/appointments', label: '📅 Appointments' },
          { path: '/book-appointment', label: '📆 Book' },
        ].map(({ path, label }) => (
          <Link key={path} to={path} style={{
            padding: '8px 14px',
            borderRadius: '8px',
            textDecoration: 'none',
            fontSize: '14px',
            fontWeight: '500',
            color: isActive(path) ? '#00897B' : '#6b7280',
            background: isActive(path) ? '#e0f2f1' : 'transparent',
            transition: 'all 0.15s',
          }}>{label}</Link>
        ))}
      </div>

      {/* User + Logout */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <span style={{ fontSize: '13px', color: '#6b7280' }}>
          👤 <strong>{user.name}</strong>
        </span>
        <button onClick={handleLogout} className="btn btn-outline" style={{ padding: '7px 14px', fontSize: '13px' }}>
          Logout
        </button>
      </div>
    </nav>
  )
}