const express = require('express');
const Assignment = require('../models/Assignment');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

// Get all assignments for a course
router.get('/course/:courseId', async (req, res) => {
  try {
    const assignments = await Assignment.find({ course: req.params.courseId })
      .populate('instructor', 'name')
      .populate('submissions.student', 'name email');
    res.json(assignments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get assignment by ID
router.get('/:id', async (req, res) => {
  try {
    const assignment = await Assignment.findById(req.params.id)
      .populate('instructor', 'name')
      .populate('submissions.student', 'name email');
    
    if (!assignment) {
      return res.status(404).json({ error: 'Assignment not found' });
    }
    res.json(assignment);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create assignment (Teacher/Admin)
router.post('/', protect, authorize('teacher', 'admin'), async (req, res) => {
  try {
    const { title, description, course, dueDate, totalMarks } = req.body;

    const assignment = new Assignment({
      title,
      description,
      course,
      dueDate,
      totalMarks,
      instructor: req.user.id
    });

    await assignment.save();
    res.status(201).json(assignment);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Submit assignment
router.post('/:id/submit', protect, authorize('student'), async (req, res) => {
  try {
    const { content } = req.body;
    const assignment = await Assignment.findById(req.params.id);

    if (!assignment) {
      return res.status(404).json({ error: 'Assignment not found' });
    }

    const submission = {
      student: req.user.id,
      content,
      submittedAt: new Date(),
      isGraded: false
    };

    assignment.submissions.push(submission);
    await assignment.save();

    res.status(201).json({ message: 'Assignment submitted', submission });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Grade submission
router.put('/:id/grade/:submissionId', protect, authorize('teacher', 'admin'), async (req, res) => {
  try {
    const { marks, feedback } = req.body;
    const assignment = await Assignment.findById(req.params.id);

    if (!assignment) {
      return res.status(404).json({ error: 'Assignment not found' });
    }

    const submission = assignment.submissions.id(req.params.submissionId);
    submission.marks = marks;
    submission.feedback = feedback;
    submission.isGraded = true;

    await assignment.save();
    res.json({ message: 'Graded successfully', submission });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
