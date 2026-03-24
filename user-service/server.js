// user-service/server.js
// Entry point for the User Service

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes');

const app = express();
const PORT = process.env.PORT || 5001;

// ── Connect to MongoDB ──────────────────────
connectDB();

// ── Middleware ──────────────────────────────
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// ── Health Check ────────────────────────────
app.get('/', (req, res) => {
  res.json({ message: '✅ User Service is running on port 5001' });
});

// ── Routes ──────────────────────────────────
app.use('/api/users', userRoutes);

// ── 404 Handler ─────────────────────────────
app.use((req, res) => {
  res.status(404).json({ message: `Route ${req.originalUrl} not found` });
});

// ── Start Server ─────────────────────────────
app.listen(PORT, () => {
  console.log(`🚀 User Service running on http://localhost:${PORT}`);
});