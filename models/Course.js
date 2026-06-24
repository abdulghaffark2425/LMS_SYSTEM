const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  instructor: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  code: { type: String, unique: true, required: true },
  students: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  modules: [{
    title: String,
    description: String,
    lessons: [{
      title: String,
      content: String,
      videoUrl: String,
      createdAt: Date
    }]
  }],
  assignments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Assignment' }],
  quizzes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Quiz' }],
  startDate: Date,
  endDate: Date,
  capacity: Number,
  credits: Number,
  image: String,
  isActive: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Course', courseSchema);