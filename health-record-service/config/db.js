// config/db.js
// MongoDB connection for Health Record Service

const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`✅ Health Record Service DB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error('❌ Health Record Service DB Connection Failed:', error.message);
    process.exit(1);
  }
};

module.exports = connectDB;