// routes/userRoutes.js
// Defines all User Service API endpoints

const express = require('express');
const router = express.Router();
const {
  registerUser,
  loginUser,
  getUserProfile,
  getAllUsers,
} = require('../controller/userController');

// POST /api/users/register  → Register new user
router.post('/register', registerUser);

// POST /api/users/login     → Login user
router.post('/login', loginUser);

// GET  /api/users           → Get all users
router.get('/', getAllUsers);

// GET  /api/users/profile/:id → Get single user profile
router.get('/profile/:id', getUserProfile);

module.exports = router;