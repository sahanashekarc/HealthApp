// services/api.js
// Axios instance — all requests go through API Gateway on port 5000

import axios from 'axios'

const API = axios.create({
  baseURL: 'http://localhost:5000',
})

// Attach JWT token to every request automatically
API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

// ── User Service ─────────────────────────────
export const registerUser  = (data) => API.post('/api/users/register', data)
export const loginUser     = (data) => API.post('/api/users/login', data)
export const getUserProfile = (id)  => API.get(`/api/users/profile/${id}`)

// ── Health Record Service ─────────────────────
export const createRecord       = (data) => API.post('/api/records', data)
export const getAllRecords       = ()     => API.get('/api/records')
export const getRecordsByUser   = (id)   => API.get(`/api/records/user/${id}`)
export const getRecordById      = (id)   => API.get(`/api/records/${id}`)
export const updateRecord       = (id, data) => API.put(`/api/records/${id}`, data)
export const deleteRecord       = (id)   => API.delete(`/api/records/${id}`)

// ── Appointment Service ───────────────────────
export const createAppointment      = (data) => API.post('/api/appointments', data)
export const getAllAppointments      = ()     => API.get('/api/appointments')
export const getAppointmentsByUser  = (id)   => API.get(`/api/appointments/user/${id}`)
export const updateAppointment      = (id, data) => API.put(`/api/appointments/${id}`, data)
export const deleteAppointment      = (id)   => API.delete(`/api/appointments/${id}`)

// ── Notification Service ──────────────────────
export const sendConfirmationEmail  = (data) => API.post('/api/notifications/appointment-confirmation', data)
export const sendCancellationEmail  = (data) => API.post('/api/notifications/appointment-cancellation', data)
export const sendWelcomeEmail       = (data) => API.post('/api/notifications/welcome', data)

export default API