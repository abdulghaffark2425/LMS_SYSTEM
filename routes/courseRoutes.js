const express = require('express');
const Course = require('../models/Course');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const courses = await Course.find({ isActive: true }).populate('instructor', 'name email').populate('students', 'name email');
    res.json(courses);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const course = await Course.findById(req.params.id).populate('instructor', 'name email').populate('students', 'name email').populate('assignments').populate('quizzes');
    if (!course) return res.status(404).json({ error: 'Course not found' });
    res.json(course);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/', protect, authorize('teacher', 'admin'), async (req, res) => {
  try {
    const { title, description, code, capacity, credits } = req.body;
    const course = new Course({ title, description, code, capacity, credits, instructor: req.user.id });
    await course.save();
    res.status(201).json(course);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/:id/enroll', protect, async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) return res.status(404).json({ error: 'Course not found' });
    if (course.students.includes(req.user.id)) return res.status(400).json({ error: 'Already enrolled' });
    course.students.push(req.user.id);
    await course.save();
    res.json({ message: 'Enrolled successfully', course });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;