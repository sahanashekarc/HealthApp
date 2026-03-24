// health-record-service/server.js
// Entry point for the Health Record Service

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const connectDB = require('./config/db');
const recordRoutes = require('./routes/recordRoutes');

const app = express();
const PORT = process.env.PORT || 5002;

// ── Connect to MongoDB ──────────────────────
connectDB();

// ── Middleware ──────────────────────────────
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// ── Health Check ────────────────────────────
app.get('/', (req, res) => {
  res.json({ message: '✅ Health Record Service is running on port 5002' });
});

// ── Routes ──────────────────────────────────
app.use('/api/records', recordRoutes);

// ── 404 Handler ─────────────────────────────
app.use((req, res) => {
  res.status(404).json({ message: `Route ${req.originalUrl} not found` });
});

// ── Start Server ─────────────────────────────
app.listen(PORT, () => {
  console.log(`🚀 Health Record Service running on http://localhost:${PORT}`);
});