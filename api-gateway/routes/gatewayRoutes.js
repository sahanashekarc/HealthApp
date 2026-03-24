// routes/gatewayRoutes.js
// Defines proxy routes → forwards to correct microservice

const { createProxyMiddleware } = require('http-proxy-middleware');
const services = require('../config/gatewayConfig');

module.exports = (app) => {

  // ──────────────────────────────────────────
  // /api/users  →  User Service (port 5001)
  // ──────────────────────────────────────────
  app.use(
    '/api/users',
    createProxyMiddleware({
      target: services.userService,
      changeOrigin: true,
      on: {
        error: (err, req, res) => {
          console.error('User Service Error:', err.message);
          res.status(503).json({ message: 'User Service unavailable' });
        },
      },
    })
  );

  // ──────────────────────────────────────────
  // /api/records  →  Health Record Service (port 5002)
  // ──────────────────────────────────────────
  app.use(
    '/api/records',
    createProxyMiddleware({
      target: services.healthRecordService,
      changeOrigin: true,
      on: {
        error: (err, req, res) => {
          console.error('Health Record Service Error:', err.message);
          res.status(503).json({ message: 'Health Record Service unavailable' });
        },
      },
    })
  );

  // ──────────────────────────────────────────
  // /api/appointments  →  Appointment Service (port 5003)
  // ──────────────────────────────────────────
  app.use(
    '/api/appointments',
    createProxyMiddleware({
      target: services.appointmentService,
      changeOrigin: true,
      on: {
        error: (err, req, res) => {
          console.error('Appointment Service Error:', err.message);
          res.status(503).json({ message: 'Appointment Service unavailable' });
        },
      },
    })
  );

  // ──────────────────────────────────────────
  // /api/notifications  →  Notification Service (port 5004)
  // ──────────────────────────────────────────
  app.use(
    '/api/notifications',
    createProxyMiddleware({
      target: services.notificationService,
      changeOrigin: true,
      on: {
        error: (err, req, res) => {
          console.error('Notification Service Error:', err.message);
          res.status(503).json({ message: 'Notification Service unavailable' });
        },
      },
    })
  );
};