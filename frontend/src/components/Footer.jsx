import React from 'react'
// components/Footer.jsx
export default function Footer() {
  return (
    <footer style={{
      background: 'white',
      borderTop: '1px solid #e5e7eb',
      padding: '16px 24px',
      textAlign: 'center',
      color: '#9ca3af',
      fontSize: '13px',
      marginTop: 'auto',
    }}>
      © {new Date().getFullYear()} HealthApp — Built with Microservices Architecture
    </footer>
  )
}