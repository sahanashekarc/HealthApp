// models/recordModel.js
// Defines the Health Record schema for MongoDB

const mongoose = require('mongoose');

const recordSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: [true, 'User ID is required'],
    },
    patientName: {
      type: String,
      required: [true, 'Patient name is required'],
      trim: true,
    },
    recordType: {
      type: String,
      enum: ['Blood Test', 'X-Ray', 'MRI', 'Prescription', 'Vaccination', 'General Checkup', 'Other'],
      required: [true, 'Record type is required'],
    },
    diagnosis: {
      type: String,
      required: [true, 'Diagnosis is required'],
      trim: true,
    },
    prescription: {
      type: String,
      default: '',
    },
    doctorName: {
      type: String,
      required: [true, 'Doctor name is required'],
      trim: true,
    },
    hospital: {
      type: String,
      default: '',
    },
    bloodPressure: {
      type: String,
      default: '',
    },
    heartRate: {
      type: String,
      default: '',
    },
    weight: {
      type: String,
      default: '',
    },
    temperature: {
      type: String,
      default: '',
    },
    notes: {
      type: String,
      default: '',
    },
    recordDate: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('HealthRecord', recordSchema);