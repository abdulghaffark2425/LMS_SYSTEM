const mongoose = require('mongoose');

const gradeSchema = new mongoose.Schema({
  student: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  course: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true },
  assignment: { type: mongoose.Schema.Types.ObjectId, ref: 'Assignment' },
  quiz: { type: mongoose.Schema.Types.ObjectId, ref: 'Quiz' },
  marks: Number,
  totalMarks: Number,
  percentage: Number,
  grade: { type: String, enum: ['A+', 'A', 'B+', 'B', 'C+', 'C', 'D', 'F'] },
  comments: String,
  gradeType: { type: String, enum: ['assignment', 'quiz', 'midterm', 'final'] },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Grade', gradeSchema);