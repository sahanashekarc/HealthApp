import React from 'react'
// pages/RecordDetails.jsx  — Lists all health records for logged-in user
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getRecordsByUser, deleteRecord } from '../services/api'

export default function RecordDetails() {
  const user = JSON.parse(localStorage.getItem('user') || '{}')
  const [records, setRecords] = useState([])
  const [loading, setLoading] = useState(true)
  const [msg, setMsg] = useState('')

  const fetchRecords = async () => {
    try {
      const { data } = await getRecordsByUser(user.id)
      setRecords(data)
    } catch (_) {}
    finally { setLoading(false) }
  }

  useEffect(() => { fetchRecords() }, [])

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this record?')) return
    try {
      await deleteRecord(id)
      setMsg('Record deleted.')
      fetchRecords()
    } catch (_) { setMsg('Failed to delete.') }
  }

  if (loading) return <div className="loading"><div className="spinner" /></div>

  return (
    <div className="page">
      <div className="page-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <h1>📋 My Health Records</h1>
          <p>All your medical records in one place</p>
        </div>
        <Link to="/add-record" className="btn btn-primary">➕ Add Record</Link>
      </div>

      {msg && <div className="alert alert-success">{msg}</div>}

      {records.length === 0 ? (
        <div className="card">
          <div className="empty-state">
            <div className="icon">📂</div>
            <p>No health records found. Add your first record!</p>
            <Link to="/add-record" className="btn btn-primary" style={{ marginTop: '16px' }}>➕ Add Record</Link>
          </div>
        </div>
      ) : (
        <div className="card">
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Type</th>
                  <th>Diagnosis</th>
                  <th>Doctor</th>
                  <th>Hospital</th>
                  <th>Date</th>
                  <th>Vitals</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {records.map(r => (
                  <tr key={r._id}>
                    <td><span style={{ background: '#e0f2f1', color: '#00695C', padding: '3px 10px', borderRadius: '20px', fontSize: '12px', fontWeight: '600' }}>{r.recordType}</span></td>
                    <td style={{ fontWeight: '500' }}>{r.diagnosis}</td>
                    <td>Dr. {r.doctorName}</td>
                    <td>{r.hospital || '—'}</td>
                    <td>{new Date(r.recordDate).toLocaleDateString()}</td>
                    <td style={{ fontSize: '12px', color: '#6b7280' }}>
                      {r.bloodPressure && <div>BP: {r.bloodPressure}</div>}
                      {r.heartRate     && <div>HR: {r.heartRate}</div>}
                      {r.weight        && <div>Wt: {r.weight}</div>}
                      {!r.bloodPressure && !r.heartRate && !r.weight && '—'}
                    </td>
                    <td>
                      <button onClick={() => handleDelete(r._id)} className="btn btn-danger" style={{ padding: '5px 12px', fontSize: '12px' }}>
                        🗑 Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  )
}