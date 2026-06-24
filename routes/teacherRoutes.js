const express = require('express');
const User = require('../models/User');
const Course = require('../models/Course');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const teachers = await User.find({ role: 'teacher' });
    res.json(teachers);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/:id/courses', async (req, res) => {
  try {
    const courses = await Course.find({ instructor: req.params.id });
    res.json(courses);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/:id/dashboard', protect, authorize('teacher', 'admin'), async (req, res) => {
  try {
    const courses = await Course.find({ instructor: req.params.id });
    let totalStudents = 0;
    courses.forEach(course => { totalStudents += course.students.length; });
    res.json({ totalCourses: courses.length, totalStudents, courses });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;