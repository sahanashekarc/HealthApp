import React from 'react'
// components/HealthCard.jsx
export default function HealthCard({ icon, title, value, color = '#00897B' }) {
  return (
    <div className="card" style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
      <div style={{
        width: '52px', height: '52px', borderRadius: '12px',
        background: color + '18', display: 'flex',
        alignItems: 'center', justifyContent: 'center', fontSize: '24px', flexShrink: 0,
      }}>
        {icon}
      </div>
      <div>
        <p style={{ fontSize: '13px', color: '#6b7280', marginBottom: '2px' }}>{title}</p>
        <p style={{ fontSize: '24px', fontWeight: '700', color }}>{value}</p>
      </div>
    </div>
  )
}