const express = require('express');
const Exam = require('../models/Exam');
const Result = require('../models/Result'); // Assuming you have a Result model
const authMiddleware = require('../middleware/auth');
const router = express.Router();

// Create Exam
router.post('/create', authMiddleware, async (req, res) => {
    const { title, questions, date, duration } = req.body;
    try {
        const exam = new Exam({
            title,
            questions,
            faculty: req.user.userId,
            date,
            duration,
        });
        await exam.save();
        res.status(201).send('Exam created');
    } catch (err) {
        res.status(400).send(err.message);
    }
});

// Submit Exam
router.post('/submit/:examId', authMiddleware, async (req, res) => {
    const { answers } = req.body;
    try {
        const exam = await Exam.findById(req.params.examId);
        if (!exam) return res.status(404).send('Exam not found');
        
        let score = 0;

        exam.questions.forEach((question, index) => {
            if (question.correctAnswer === answers[index]) {
                score += 1;
            }
        });

        const result = new Result({
            student: req.user.userId,
            exam: req.params.examId,
            score,
            date: new Date(),
        });

        await result.save();
        res.status(201).send('Exam submitted successfully');
    } catch (err) {
        res.status(400).send(err.message);
    }
});
// Define exam routes
router.get('/', (req, res) => {
    res.send('Exams route');
});


module.exports = router;

