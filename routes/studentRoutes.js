const express = require('express');
const User = require('../models/User');
const Course = require('../models/Course');
const { protect } = require('../middleware/auth');

const router = express.Router();

// Get all students
router.get('/', async (req, res) => {
  try {
    const students = await User.find({ role: 'student' }).populate('enrolledCourses');
    res.json(students);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get student details
router.get('/:id', async (req, res) => {
  try {
    const student = await User.findById(req.params.id).populate('enrolledCourses');
    if (!student || student.role !== 'student') {
      return res.status(404).json({ error: 'Student not found' });
    }
    res.json(student);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get student enrolled courses
router.get('/:id/courses', async (req, res) => {
  try {
    const student = await User.findById(req.params.id).populate('enrolledCourses');
    if (!student) {
      return res.status(404).json({ error: 'Student not found' });
    }
    res.json(student.enrolledCourses);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get student dashboard
router.get('/:id/dashboard', protect, async (req, res) => {
  try {
    const student = await User.findById(req.params.id).populate('enrolledCourses');
    const courses = student.enrolledCourses.length;
    
    res.json({
      student,
      totalCourses: courses,
      recentActivity: 'No activity'
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
