// api-gateway/server.js
// Main entry point for the API Gateway

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const registerRoutes = require('./routes/gatewayRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// ── Middleware ──────────────────────────────
app.use(cors());
app.use(morgan('dev')); // logs every incoming request

// ── Health Check ────────────────────────────
app.get('/', (req, res) => {
  res.json({
    message: '✅ HealthApp API Gateway is running',
    services: {
      users:         'http://localhost:5000/api/users',
      records:       'http://localhost:5000/api/records',
      appointments:  'http://localhost:5000/api/appointments',
      notifications: 'http://localhost:5000/api/notifications',
    },
  });
});

// ── Proxy Routes ─────────────────────────────
registerRoutes(app);

// ── 404 Handler ──────────────────────────────
app.use((req, res) => {
  res.status(404).json({ message: `Route ${req.originalUrl} not found in gateway` });
});

// ── Start Server ─────────────────────────────
app.listen(PORT, () => {
  console.log(`🚀 API Gateway running on http://localhost:${PORT}`);
});