const express = require('express');
const User = require('../models/User');
const { protect } = require('../middleware/auth');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const students = await User.find({ role: 'student' }).populate('enrolledCourses');
    res.json(students);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const student = await User.findById(req.params.id).populate('enrolledCourses');
    if (!student || student.role !== 'student') return res.status(404).json({ error: 'Student not found' });
    res.json(student);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/:id/dashboard', protect, async (req, res) => {
  try {
    const student = await User.findById(req.params.id).populate('enrolledCourses');
    res.json({ student, totalCourses: student.enrolledCourses.length });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;