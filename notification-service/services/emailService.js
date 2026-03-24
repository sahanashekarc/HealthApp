// services/emailService.js
// Functions to send different types of email notifications

const transporter = require('../config/notificationConfig');

// ── Send Appointment Confirmation Email ──────
const sendAppointmentConfirmation = async ({ to, patientName, doctorName, department, appointmentDate, appointmentTime }) => {
  const mailOptions = {
    from: process.env.EMAIL_FROM,
    to,
    subject: '✅ Appointment Confirmed — HealthApp',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; border: 1px solid #e0e0e0; border-radius: 8px; overflow: hidden;">
        <div style="background-color: #00897B; padding: 24px; text-align: center;">
          <h1 style="color: white; margin: 0;">🏥 HealthApp</h1>
          <p style="color: #e0f2f1; margin: 4px 0;">Your Appointment is Confirmed</p>
        </div>
        <div style="padding: 32px;">
          <p style="font-size: 16px;">Dear <strong>${patientName}</strong>,</p>
          <p style="color: #555;">Your appointment has been successfully booked. Here are your details:</p>
          <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
            <tr style="background: #f5f5f5;">
              <td style="padding: 12px; border: 1px solid #ddd; font-weight: bold;">Doctor</td>
              <td style="padding: 12px; border: 1px solid #ddd;">Dr. ${doctorName}</td>
            </tr>
            <tr>
              <td style="padding: 12px; border: 1px solid #ddd; font-weight: bold;">Department</td>
              <td style="padding: 12px; border: 1px solid #ddd;">${department}</td>
            </tr>
            <tr style="background: #f5f5f5;">
              <td style="padding: 12px; border: 1px solid #ddd; font-weight: bold;">Date</td>
              <td style="padding: 12px; border: 1px solid #ddd;">${new Date(appointmentDate).toDateString()}</td>
            </tr>
            <tr>
              <td style="padding: 12px; border: 1px solid #ddd; font-weight: bold;">Time</td>
              <td style="padding: 12px; border: 1px solid #ddd;">${appointmentTime}</td>
            </tr>
          </table>
          <p style="color: #555;">Please arrive 10 minutes early. If you need to cancel, do so at least 24 hours in advance.</p>
          <p style="color: #888; font-size: 13px; margin-top: 32px;">— The HealthApp Team</p>
        </div>
      </div>
    `,
  };

  await transporter.sendMail(mailOptions);
};

// ── Send Appointment Cancellation Email ──────
const sendAppointmentCancellation = async ({ to, patientName, doctorName, appointmentDate }) => {
  const mailOptions = {
    from: process.env.EMAIL_FROM,
    to,
    subject: '❌ Appointment Cancelled — HealthApp',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; border: 1px solid #e0e0e0; border-radius: 8px; overflow: hidden;">
        <div style="background-color: #e53935; padding: 24px; text-align: center;">
          <h1 style="color: white; margin: 0;">🏥 HealthApp</h1>
          <p style="color: #ffcdd2; margin: 4px 0;">Appointment Cancelled</p>
        </div>
        <div style="padding: 32px;">
          <p style="font-size: 16px;">Dear <strong>${patientName}</strong>,</p>
          <p style="color: #555;">Your appointment with <strong>Dr. ${doctorName}</strong> on <strong>${new Date(appointmentDate).toDateString()}</strong> has been cancelled.</p>
          <p style="color: #555;">You can book a new appointment anytime through the HealthApp.</p>
          <p style="color: #888; font-size: 13px; margin-top: 32px;">— The HealthApp Team</p>
        </div>
      </div>
    `,
  };

  await transporter.sendMail(mailOptions);
};

// ── Send Welcome Email ────────────────────────
const sendWelcomeEmail = async ({ to, name }) => {
  const mailOptions = {
    from: process.env.EMAIL_FROM,
    to,
    subject: '👋 Welcome to HealthApp!',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; border: 1px solid #e0e0e0; border-radius: 8px; overflow: hidden;">
        <div style="background-color: #00897B; padding: 24px; text-align: center;">
          <h1 style="color: white; margin: 0;">🏥 HealthApp</h1>
          <p style="color: #e0f2f1; margin: 4px 0;">Welcome Aboard!</p>
        </div>
        <div style="padding: 32px;">
          <p style="font-size: 16px;">Hi <strong>${name}</strong>,</p>
          <p style="color: #555;">Welcome to HealthApp! Your account has been created successfully.</p>
          <p style="color: #555;">You can now:</p>
          <ul style="color: #555;">
            <li>📋 View and manage your health records</li>
            <li>📅 Book doctor appointments</li>
            <li>🔔 Get email reminders for your appointments</li>
          </ul>
          <p style="color: #888; font-size: 13px; margin-top: 32px;">— The HealthApp Team</p>
        </div>
      </div>
    `,
  };

  await transporter.sendMail(mailOptions);
};

module.exports = {
  sendAppointmentConfirmation,
  sendAppointmentCancellation,
  sendWelcomeEmail,
};