// routes/recordRoutes.js
// Defines all Health Record Service API endpoints

const express = require('express');
const router = express.Router();
const {
  createRecord,
  getAllRecords,
  getRecordsByUser,
  getRecordById,
  updateRecord,
  deleteRecord,
} = require('../controller/recordController');

// POST   /api/records              → Create a new health record
router.post('/', createRecord);

// GET    /api/records              → Get all health records
router.get('/', getAllRecords);

// GET    /api/records/user/:userId → Get records for a specific user
router.get('/user/:userId', getRecordsByUser);

// GET    /api/records/:id          → Get single record by ID
router.get('/:id', getRecordById);

// PUT    /api/records/:id          → Update a record
router.put('/:id', updateRecord);

// DELETE /api/records/:id          → Delete a record
router.delete('/:id', deleteRecord);

module.exports = router;