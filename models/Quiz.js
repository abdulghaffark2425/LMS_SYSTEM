const mongoose = require('mongoose');

const quizSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  course: { type: mongoose.Schema.Types.ObjectId, ref: 'Course' },
  questions: [{
    questionText: String,
    type: { type: String, enum: ['mcq', 'short', 'long'] },
    options: [String],
    correctAnswer: String,
    marks: Number
  }],
  totalMarks: Number,
  duration: Number,
  dueDate: Date,
  results: [{
    student: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    answers: [String],
    score: Number,
    submittedAt: Date
  }],
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Quiz', quizSchema);