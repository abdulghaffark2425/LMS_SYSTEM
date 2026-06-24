const express = require('express');
const Grade = require('../models/Grade');
const { protect } = require('../middleware/auth');

const router = express.Router();

router.get('/student/:studentId', protect, async (req, res) => {
  try {
    const grades = await Grade.find({ student: req.params.studentId }).populate('course', 'title code').populate('assignment', 'title').populate('quiz', 'title');
    res.json(grades);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/course/:courseId', protect, async (req, res) => {
  try {
    const grades = await Grade.find({ course: req.params.courseId }).populate('student', 'name email');
    res.json(grades);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/', protect, async (req, res) => {
  try {
    const { student, course, marks, totalMarks, gradeType } = req.body;
    const percentage = (marks / totalMarks) * 100;
    let grade;
    if (percentage >= 90) grade = 'A+';
    else if (percentage >= 80) grade = 'A';
    else if (percentage >= 70) grade = 'B+';
    else if (percentage >= 60) grade = 'B';
    else if (percentage >= 50) grade = 'C+';
    else if (percentage >= 40) grade = 'C';
    else if (percentage >= 30) grade = 'D';
    else grade = 'F';
    
    const newGrade = new Grade({ student, course, marks, totalMarks, percentage, grade, gradeType });
    await newGrade.save();
    res.status(201).json(newGrade);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;