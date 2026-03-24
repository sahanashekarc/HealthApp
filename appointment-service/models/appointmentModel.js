const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
  patientName: { type: String, required: true },
  patientEmail: { type: String, required: true },
  patientPhone: { type: String },
  doctorName: { type: String, required: true },
  department: { type: String, required: true },
  appointmentDate: { type: String, required: true },
  appointmentTime: { type: String, required: true },
  reason: { type: String },
  notes: { type: String },
  userId: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('Appointment', appointmentSchema);