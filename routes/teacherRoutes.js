const express = require('express');
const User = require('../models/User');
const Course = require('../models/Course');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

// Get all teachers
router.get('/', async (req, res) => {
  try {
    const teachers = await User.find({ role: 'teacher' });
    res.json(teachers);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get teacher details
router.get('/:id', async (req, res) => {
  try {
    const teacher = await User.findById(req.params.id);
    if (!teacher || teacher.role !== 'teacher') {
      return res.status(404).json({ error: 'Teacher not found' });
    }
    res.json(teacher);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get teacher courses
router.get('/:id/courses', async (req, res) => {
  try {
    const courses = await Course.find({ instructor: req.params.id });
    res.json(courses);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get teacher dashboard
router.get('/:id/dashboard', protect, authorize('teacher', 'admin'), async (req, res) => {
  try {
    const courses = await Course.find({ instructor: req.params.id });
    let totalStudents = 0;
    
    courses.forEach(course => {
      totalStudents += course.students.length;
    });

    res.json({
      totalCourses: courses.length,
      totalStudents,
      courses
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
