import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getRecordsByUser, getAppointmentsByUser } from '../services/api'
import HealthCard from '../components/HealthCard'

export default function Home() {
  // Get logged-in user from localStorage
  const user = JSON.parse(localStorage.getItem('user') || '{}')

  // Component state
  const [records, setRecords] = useState([])
  const [appointments, setAppointments] = useState([])
  const [loading, setLoading] = useState(true)

  // Fetch records and appointments on mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [r, a] = await Promise.all([
          getRecordsByUser(user.id),
          getAppointmentsByUser(user.id),
        ])
        setRecords(r.data || [])
        setAppointments(a.data || [])
      } catch (err) {
        console.error("Error fetching data:", err)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [user.id])

  // Stats
  const pending = appointments.filter(a => (a.status || "Pending") === 'Pending').length
  const confirmed = appointments.filter(a => (a.status || "Pending") === 'Confirmed').length
  const upcoming = appointments.filter(a => a.appointmentDate && new Date(a.appointmentDate) >= new Date())

  // Loading state
  if (loading) return <div className="loading"><div className="spinner" /></div>

  return (
    <div className="page">
      {/* Welcome Card */}
      <div style={{ background: 'linear-gradient(135deg, #00897B, #00695C)', borderRadius: '16px', padding: '32px', color: 'white', marginBottom: '32px' }}>
        <h1 style={{ fontSize: '26px', fontWeight: '700' }}>Welcome back, {user.name || "User"}! 👋</h1>
        <p style={{ opacity: 0.85, marginTop: '6px' }}>Here's your health summary</p>
        <div style={{ display: 'flex', gap: '12px', marginTop: '20px' }}>
          <Link to="/add-record" className="btn" style={{ background: 'white', color: '#00897B', fontWeight: '600' }}>➕ Add Record</Link>
          <Link to="/book-appointment" className="btn" style={{ background: 'rgba(255,255,255,0.2)', color: 'white', border: '1px solid rgba(255,255,255,0.4)' }}>📅 Book Appointment</Link>
        </div>
      </div>

      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', marginBottom: '32px' }}>
        <HealthCard icon="📋" title="Total Records" value={records.length} color="#00897B" />
        <HealthCard icon="📅" title="Total Appointments" value={appointments.length} color="#5C6BC0" />
        <HealthCard icon="⏳" title="Pending" value={pending} color="#FB8C00" />
        <HealthCard icon="✅" title="Confirmed" value={confirmed} color="#43A047" />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
        {/* Recent Records */}
        <div className="card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <h2 style={{ fontSize: '16px', fontWeight: '700' }}>📋 Recent Records</h2>
            <Link to="/records" style={{ fontSize: '13px', color: '#00897B' }}>View all</Link>
          </div>
          {records.length === 0 ? (
            <div className="empty-state"><div className="icon">📂</div><p>No records yet</p></div>
          ) : records.slice(0, 4).map(r => (
            <div key={r._id} style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid #f3f4f6' }}>
              <div>
                <p style={{ fontWeight: '500', fontSize: '14px' }}>{r.recordType || "Unknown"}</p>
                <p style={{ fontSize: '12px', color: '#6b7280' }}>Dr. {r.doctorName || "Unknown"}</p>
              </div>
              <p style={{ fontSize: '12px', color: '#9ca3af' }}>{r.recordDate ? new Date(r.recordDate).toLocaleDateString() : "-"}</p>
            </div>
          ))}
        </div>

        {/* Upcoming Appointments */}
        <div className="card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <h2 style={{ fontSize: '16px', fontWeight: '700' }}>📅 Upcoming Appointments</h2>
            <Link to="/appointments" style={{ fontSize: '13px', color: '#00897B' }}>View all</Link>
          </div>
          {upcoming.length === 0 ? (
            <div className="empty-state"><div className="icon">📆</div><p>No upcoming appointments</p></div>
          ) : upcoming.slice(0, 4).map(a => (
            <div key={a._id} style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid #f3f4f6' }}>
              <div>
                <p style={{ fontWeight: '500', fontSize: '14px' }}>Dr. {a.doctorName || "Unknown"}</p>
                <p style={{ fontSize: '12px', color: '#6b7280' }}>{a.department || "General"}</p>
              </div>
              <div style={{ textAlign: 'right' }}>
                <p style={{ fontSize: '12px', color: '#9ca3af' }}>{a.appointmentDate ? new Date(a.appointmentDate).toLocaleDateString() : "-"}</p>
                <span className={`badge badge-${(a.status?.toLowerCase() || "pending")}`}>{a.status || "Pending"}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}