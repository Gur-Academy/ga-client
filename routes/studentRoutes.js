// routes/studentRoutes.js

const express = require('express');
const router = express.Router();

// Import the controller (business logic)
const studentController = require('../controllers/studentController');

// ----------------------------------------------
// @route   POST /api/student/createStudentProfile
// @desc    Create a new student profile
// @access  Public (or you can make it protected later)
// ----------------------------------------------
router.post('/createStudentProfile', studentController.createStudentProfile);

// Export the router so app.js can use it
module.exports = router;
