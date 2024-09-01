const mongoose = require('mongoose');

const QuestionSchema = new mongoose.Schema({
    questionText: String,
    options: [String],
    correctAnswer: Number,
});

const ExamSchema = new mongoose.Schema({
    title: String,
    questions: [QuestionSchema],
    faculty: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    date: Date,
    duration: Number, // in minutes
});

const Exam = mongoose.model('Exam', ExamSchema);
module.exports = Exam;
