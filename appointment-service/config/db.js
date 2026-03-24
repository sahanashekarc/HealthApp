// config/db.js
// MongoDB connection for Appointment Service

const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`✅ Appointment Service DB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error('❌ Appointment Service DB Connection Failed:', error.message);
    process.exit(1);
  }
};

module.exports = connectDB;