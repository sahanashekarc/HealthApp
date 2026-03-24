// routes/appointmentRoutes.js
// Defines all Appointment Service API endpoints

const express = require('express');
const router = express.Router();
const {
  createAppointment,
  getAllAppointments,
  getAppointmentsByUser,
  getAppointmentById,
  updateAppointment,
  deleteAppointment,
} = require('../controller/appointmentController');

// POST   /api/appointments                  → Book new appointment
router.post('/', createAppointment);

// GET    /api/appointments                  → Get all appointments
router.get('/', getAllAppointments);

// GET    /api/appointments/user/:userId     → Get appointments for a user
router.get('/user/:userId', getAppointmentsByUser);

// GET    /api/appointments/:id              → Get single appointment
router.get('/:id', getAppointmentById);

// PUT    /api/appointments/:id              → Update appointment status
router.put('/:id', updateAppointment);

// DELETE /api/appointments/:id              → Cancel appointment
router.delete('/:id', deleteAppointment);

module.exports = router;