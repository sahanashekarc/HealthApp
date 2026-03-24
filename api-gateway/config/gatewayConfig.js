// config/gatewayConfig.js
// Centralized service URLs for the API Gateway

const services = {
  userService: process.env.USER_SERVICE_URL || 'http://localhost:5001',
  healthRecordService: process.env.HEALTH_RECORD_SERVICE_URL || 'http://localhost:5002',
  appointmentService: process.env.APPOINTMENT_SERVICE_URL || 'http://localhost:5003',
  notificationService: process.env.NOTIFICATION_SERVICE_URL || 'http://localhost:5004',
};

module.exports = services;