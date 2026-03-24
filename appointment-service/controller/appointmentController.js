// controller/appointmentController.js
const Appointment = require('../models/appointmentModel');

const createAppointment = async (req, res) => {
  try {
    console.log('📥 Create appointment body:', req.body);
    const appointment = await Appointment.create(req.body);
    res.status(201).json({ message: 'Appointment booked successfully', appointment });
  } catch (error) {
    console.error('❌ Create appointment error:', error.message);
    res.status(500).json({ message: 'Failed to book appointment', error: error.message });
  }
};

const getAllAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find().sort({ appointmentDate: 1 });
    res.status(200).json(appointments);
  } catch (error) {
    console.error('❌ Get all appointments error:', error.message);
    res.status(500).json({ message: 'Failed to fetch appointments', error: error.message });
  }
};

const getAppointmentsByUser = async (req, res) => {
  try {
    console.log('📥 Get appointments for user:', req.params.userId);
    const appointments = await Appointment.find({ userId: req.params.userId }).sort({ appointmentDate: 1 });
    res.status(200).json(appointments);
  } catch (error) {
    console.error('❌ Get user appointments error:', error.message);
    res.status(500).json({ message: 'Failed to fetch user appointments', error: error.message });
  }
};

const getAppointmentById = async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.params.id);
    if (!appointment) return res.status(404).json({ message: 'Appointment not found' });
    res.status(200).json(appointment);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch appointment', error: error.message });
  }
};

const updateAppointment = async (req, res) => {
  try {
    const appointment = await Appointment.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!appointment) return res.status(404).json({ message: 'Appointment not found' });
    res.status(200).json({ message: 'Appointment updated successfully', appointment });
  } catch (error) {
    res.status(500).json({ message: 'Failed to update appointment', error: error.message });
  }
};

const deleteAppointment = async (req, res) => {
  try {
    const appointment = await Appointment.findByIdAndDelete(req.params.id);
    if (!appointment) return res.status(404).json({ message: 'Appointment not found' });
    res.status(200).json({ message: 'Appointment cancelled successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to cancel appointment', error: error.message });
  }
};

module.exports = { createAppointment, getAllAppointments, getAppointmentsByUser, getAppointmentById, updateAppointment, deleteAppointment };