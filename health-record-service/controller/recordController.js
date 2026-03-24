// controller/recordController.js
// Handles all Health Record CRUD operations

const HealthRecord = require('../models/recordModel');

// ── @route   POST /api/records ───────────────
// Create a new health record
const createRecord = async (req, res) => {
  try {
    const {
      userId,
      patientName,
      recordType,
      diagnosis,
      prescription,
      doctorName,
      hospital,
      bloodPressure,
      heartRate,
      weight,
      temperature,
      notes,
      recordDate,
    } = req.body;

    const record = await HealthRecord.create({
      userId,
      patientName,
      recordType,
      diagnosis,
      prescription,
      doctorName,
      hospital,
      bloodPressure,
      heartRate,
      weight,
      temperature,
      notes,
      recordDate,
    });

    res.status(201).json({
      message: 'Health record created successfully',
      record,
    });
  } catch (error) {
    res.status(500).json({ message: 'Failed to create record', error: error.message });
  }
};

// ── @route   GET /api/records ─────────────────
// Get all health records
const getAllRecords = async (req, res) => {
  try {
    const records = await HealthRecord.find().sort({ createdAt: -1 });
    res.status(200).json(records);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch records', error: error.message });
  }
};

// ── @route   GET /api/records/user/:userId ────
// Get all records for a specific user
const getRecordsByUser = async (req, res) => {
  try {
    const records = await HealthRecord.find({ userId: req.params.userId }).sort({ createdAt: -1 });
    res.status(200).json(records);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch user records', error: error.message });
  }
};

// ── @route   GET /api/records/:id ─────────────
// Get a single health record by ID
const getRecordById = async (req, res) => {
  try {
    const record = await HealthRecord.findById(req.params.id);
    if (!record) {
      return res.status(404).json({ message: 'Health record not found' });
    }
    res.status(200).json(record);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch record', error: error.message });
  }
};

// ── @route   PUT /api/records/:id ─────────────
// Update a health record
const updateRecord = async (req, res) => {
  try {
    const record = await HealthRecord.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!record) {
      return res.status(404).json({ message: 'Health record not found' });
    }
    res.status(200).json({ message: 'Record updated successfully', record });
  } catch (error) {
    res.status(500).json({ message: 'Failed to update record', error: error.message });
  }
};

// ── @route   DELETE /api/records/:id ──────────
// Delete a health record
const deleteRecord = async (req, res) => {
  try {
    const record = await HealthRecord.findByIdAndDelete(req.params.id);
    if (!record) {
      return res.status(404).json({ message: 'Health record not found' });
    }
    res.status(200).json({ message: 'Record deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete record', error: error.message });
  }
};

module.exports = {
  createRecord,
  getAllRecords,
  getRecordsByUser,
  getRecordById,
  updateRecord,
  deleteRecord,
};