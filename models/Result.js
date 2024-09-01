const mongoose = require('mongoose');

const ResultSchema = new mongoose.Schema({
    student: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    exam: { type: mongoose.Schema.Types.ObjectId, ref: 'Exam' },
    score: Number,
    date: Date,
});

const Result = mongoose.model('Result', ResultSchema);
module.exports = Result;
