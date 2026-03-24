// appointment-service/server.js
// Entry point for the Appointment Service

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const connectDB = require('./config/db');
const appointmentRoutes = require('./routes/appointmentRoutes');

const app = express();
const PORT = process.env.PORT || 5003;

// ── Connect to MongoDB ──────────────────────
connectDB();

// ── Middleware ──────────────────────────────
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// ── Health Check ────────────────────────────
app.get('/', (req, res) => {
  res.json({ message: '✅ Appointment Service is running on port 5003' });
});

// ── Routes ──────────────────────────────────
app.use('/api/appointments', appointmentRoutes);

// ── 404 Handler ─────────────────────────────
app.use((req, res) => {
  res.status(404).json({ message: `Route ${req.originalUrl} not found` });
});

// ── Start Server ─────────────────────────────
app.listen(PORT, () => {
  console.log(`🚀 Appointment Service running on http://localhost:${PORT}`);
});