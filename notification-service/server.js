// notification-service/server.js
// Entry point for the Notification Service

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const {
  sendAppointmentConfirmation,
  sendAppointmentCancellation,
  sendWelcomeEmail,
} = require('./services/emailService');

const app = express();
const PORT = process.env.PORT || 5004;

// ── Middleware ──────────────────────────────
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// ── Health Check ────────────────────────────
app.get('/', (req, res) => {
  res.json({ message: '✅ Notification Service is running on port 5004' });
});

// ── @route POST /api/notifications/appointment-confirmation
// Send appointment confirmation email
app.post('/api/notifications/appointment-confirmation', async (req, res) => {
  try {
    await sendAppointmentConfirmation(req.body);
    res.status(200).json({ message: 'Appointment confirmation email sent successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to send email', error: error.message });
  }
});

// ── @route POST /api/notifications/appointment-cancellation
// Send appointment cancellation email
app.post('/api/notifications/appointment-cancellation', async (req, res) => {
  try {
    await sendAppointmentCancellation(req.body);
    res.status(200).json({ message: 'Cancellation email sent successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to send email', error: error.message });
  }
});

// ── @route POST /api/notifications/welcome
// Send welcome email to new user
app.post('/api/notifications/welcome', async (req, res) => {
  try {
    await sendWelcomeEmail(req.body);
    res.status(200).json({ message: 'Welcome email sent successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to send email', error: error.message });
  }
});

// ── 404 Handler ─────────────────────────────
app.use((req, res) => {
  res.status(404).json({ message: `Route ${req.originalUrl} not found` });
});

// ── Start Server ─────────────────────────────
app.listen(PORT, () => {
  console.log(`🚀 Notification Service running on http://localhost:${PORT}`);
});