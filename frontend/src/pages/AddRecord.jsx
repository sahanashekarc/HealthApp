import React from 'react'
// pages/AddRecord.jsx
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { createRecord } from '../services/api'

export default function AddRecord() {
  const navigate = useNavigate()
  const user = JSON.parse(localStorage.getItem('user') || '{}')
  const [error, setError]   = useState('')
  const [success, setSuccess] = useState('')
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({
    patientName: user.name || '',
    recordType: 'General Checkup',
    diagnosis: '',
    prescription: '',
    doctorName: '',
    hospital: '',
    bloodPressure: '',
    heartRate: '',
    weight: '',
    temperature: '',
    notes: '',
    recordDate: new Date().toISOString().split('T')[0],
  })

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(''); setSuccess(''); setLoading(true)
    try {
      await createRecord({ ...form, userId: user.id })
      setSuccess('Health record added successfully!')
      setTimeout(() => navigate('/records'), 1500)
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to add record.')
    } finally { setLoading(false) }
  }

  return (
    <div className="page">
      <div className="page-header">
        <h1>➕ Add Health Record</h1>
        <p>Enter your medical details below</p>
      </div>

      <div className="card" style={{ maxWidth: '720px' }}>
        {error   && <div className="alert alert-error">{error}</div>}
        {success && <div className="alert alert-success">{success}</div>}

        <form onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="form-group">
              <label>Patient Name</label>
              <input name="patientName" value={form.patientName} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label>Record Type</label>
              <select name="recordType" value={form.recordType} onChange={handleChange}>
                {['Blood Test','X-Ray','MRI','Prescription','Vaccination','General Checkup','Other'].map(t =>
                  <option key={t}>{t}</option>
                )}
              </select>
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Doctor Name</label>
              <input name="doctorName" placeholder="Dr. Smith" value={form.doctorName} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label>Hospital / Clinic</label>
              <input name="hospital" placeholder="City Hospital" value={form.hospital} onChange={handleChange} />
            </div>
          </div>

          <div className="form-group">
            <label>Diagnosis</label>
            <input name="diagnosis" placeholder="e.g. Hypertension" value={form.diagnosis} onChange={handleChange} required />
          </div>

          <div className="form-group">
            <label>Prescription</label>
            <textarea name="prescription" rows="2" placeholder="Medicines prescribed..." value={form.prescription} onChange={handleChange} />
          </div>

          {/* Vitals */}
          <p style={{ fontWeight: '600', fontSize: '14px', marginBottom: '12px', color: '#374151' }}>📊 Vitals (optional)</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px' }}>
            {[
              { name: 'bloodPressure', label: 'Blood Pressure', placeholder: '120/80' },
              { name: 'heartRate',     label: 'Heart Rate',     placeholder: '72 bpm' },
              { name: 'weight',        label: 'Weight',         placeholder: '65 kg' },
              { name: 'temperature',   label: 'Temperature',    placeholder: '98.6 °F' },
            ].map(f => (
              <div className="form-group" key={f.name}>
                <label>{f.label}</label>
                <input name={f.name} placeholder={f.placeholder} value={form[f.name]} onChange={handleChange} />
              </div>
            ))}
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Record Date</label>
              <input type="date" name="recordDate" value={form.recordDate} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label>Notes</label>
              <input name="notes" placeholder="Additional notes..." value={form.notes} onChange={handleChange} />
            </div>
          </div>

          <div style={{ display: 'flex', gap: '12px', marginTop: '8px' }}>
            <button type="submit" className="btn btn-primary" disabled={loading}>
              {loading ? 'Saving...' : '💾 Save Record'}
            </button>
            <button type="button" className="btn btn-outline" onClick={() => navigate('/records')}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  )
}