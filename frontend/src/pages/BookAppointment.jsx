import React from 'react'
// pages/BookAppointment.jsx
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { createAppointment, sendConfirmationEmail } from '../services/api'

const DEPARTMENTS = ['General Medicine','Cardiology','Dermatology','Neurology','Orthopedics','Pediatrics','Gynecology','ENT','Ophthalmology','Psychiatry','Other']

export default function BookAppointment() {
  const navigate = useNavigate()
  const user = JSON.parse(localStorage.getItem('user') || '{}')
  const [error, setError]   = useState('')
  const [success, setSuccess] = useState('')
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({
    patientName: user.name || '',
    patientEmail: user.email || '',
    patientPhone: '',
    doctorName: '',
    department: 'General Medicine',
    appointmentDate: '',
    appointmentTime: '09:00',
    reason: '',
    notes: '',
  })

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(''); setSuccess(''); setLoading(true)
    try {
      await createAppointment({ ...form, userId: user.id })
      // Send confirmation email
      try {
        await sendConfirmationEmail({
          to: form.patientEmail,
          patientName: form.patientName,
          doctorName: form.doctorName,
          department: form.department,
          appointmentDate: form.appointmentDate,
          appointmentTime: form.appointmentTime,
        })
      } catch (_) {}
      setSuccess('Appointment booked! Confirmation email sent.')
      setTimeout(() => navigate('/appointments'), 1800)
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to book appointment.')
    } finally { setLoading(false) }
  }

  return (
    <div className="page">
      <div className="page-header">
        <h1>📆 Book Appointment</h1>
        <p>Schedule a visit with your doctor</p>
      </div>

      <div className="card" style={{ maxWidth: '720px' }}>
        {error   && <div className="alert alert-error">{error}</div>}
        {success && <div className="alert alert-success">{success}</div>}

        <form onSubmit={handleSubmit}>
          <p style={{ fontWeight: '600', fontSize: '14px', marginBottom: '12px', color: '#374151' }}>👤 Patient Details</p>
          <div className="form-row">
            <div className="form-group">
              <label>Patient Name</label>
              <input name="patientName" value={form.patientName} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label>Phone</label>
              <input name="patientPhone" placeholder="+91 9876543210" value={form.patientPhone} onChange={handleChange} />
            </div>
          </div>
          <div className="form-group">
            <label>Email (confirmation will be sent here)</label>
            <input type="email" name="patientEmail" value={form.patientEmail} onChange={handleChange} required />
          </div>

          <p style={{ fontWeight: '600', fontSize: '14px', margin: '16px 0 12px', color: '#374151' }}>🏥 Doctor & Schedule</p>
          <div className="form-row">
            <div className="form-group">
              <label>Doctor Name</label>
              <input name="doctorName" placeholder="Dr. Smith" value={form.doctorName} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label>Department</label>
              <select name="department" value={form.department} onChange={handleChange}>
                {DEPARTMENTS.map(d => <option key={d}>{d}</option>)}
              </select>
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>Date</label>
              <input type="date" name="appointmentDate" value={form.appointmentDate} onChange={handleChange} required min={new Date().toISOString().split('T')[0]} />
            </div>
            <div className="form-group">
              <label>Time</label>
              <input type="time" name="appointmentTime" value={form.appointmentTime} onChange={handleChange} required />
            </div>
          </div>
          <div className="form-group">
            <label>Reason for Visit</label>
            <textarea name="reason" rows="2" placeholder="Describe your symptoms or reason..." value={form.reason} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Additional Notes</label>
            <input name="notes" placeholder="Any allergies, previous conditions..." value={form.notes} onChange={handleChange} />
          </div>

          <div style={{ display: 'flex', gap: '12px', marginTop: '8px' }}>
            <button type="submit" className="btn btn-primary" disabled={loading}>
              {loading ? 'Booking...' : '📅 Book Appointment'}
            </button>
            <button type="button" className="btn btn-outline" onClick={() => navigate('/appointments')}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  )
}