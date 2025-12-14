# Web3 Interview Prep - Feature Implementation Plan

## Executive Summary

This document provides comprehensive implementation plans for 7 feature enhancements to the Web3 Interview Prep application. Each feature includes detailed technical specifications, data structures, code examples, API endpoints, UI components, and testing strategies.

---

## Table of Contents

1. [Quiz Mode with Randomized Questions](#1-quiz-mode-with-randomized-questions)
2. [Spaced Repetition System (SM-2)](#2-spaced-repetition-system-sm-2)
3. [Interview Simulation Mode](#3-interview-simulation-mode)
4. [PDF Export for Offline Study](#4-pdf-export-for-offline-study)
5. [Community Contributions via GitHub](#5-community-contributions-via-github)
6. [Difficulty Filtering](#6-difficulty-filtering)
7. [Estimated Reading Time per Section](#7-estimated-reading-time-per-section)

---

## 1. Quiz Mode with Randomized Questions

### 1.1 Overview

A comprehensive quiz system that shuffles questions from the question bank, tracks user performance, and supports multiple question types.

### 1.2 Data Structures

```javascript
// Quiz Configuration
const QuizConfig = {
    id: 'string',           // Unique quiz ID
    name: 'string',         // Quiz name
    sections: ['basic', 'intermediate', 'advanced'],  // Selected sections
    questionCount: 10,      // Number of questions
    timeLimit: null,        // Time limit in seconds (null = unlimited)
    shuffleQuestions: true, // Randomize question order
    shuffleAnswers: true,   // Randomize answer options
    showFeedback: true,     // Show correct answer after each question
    allowSkip: true,        // Allow skipping questions
    passingScore: 70        // Percentage to pass
};

// Question Types
const QuestionTypes = {
    MULTIPLE_CHOICE: 'multiple_choice',
    TRUE_FALSE: 'true_false',
    FILL_IN_BLANK: 'fill_in_blank',
    CODE_COMPLETION: 'code_completion',
    MATCHING: 'matching'
};

// Enhanced Question Schema
const QuizQuestion = {
    id: 'string',
    type: 'QuestionTypes',
    title: 'string',
    content: 'string',          // Question content/code
    options: [                   // For multiple choice
        { id: 'a', text: 'string', isCorrect: false },
        { id: 'b', text: 'string', isCorrect: true },
        { id: 'c', text: 'string', isCorrect: false },
        { id: 'd', text: 'string', isCorrect: false }
    ],
    correctAnswer: 'string',     // For fill-in-blank/true-false
    explanation: 'string',       // Shown after answering
    hints: ['string'],           // Optional hints
    difficulty: 'basic|intermediate|advanced',
    tags: ['string'],
    points: 10,                  // Question point value
    timeLimit: 60                // Per-question time limit (seconds)
};

// Quiz Session State
const QuizSession = {
    id: 'string',
    configId: 'string',
    userId: 'string',           // For future user accounts
    startTime: 'Date',
    endTime: 'Date',
    currentQuestionIndex: 0,
    questions: ['QuizQuestion'],
    answers: [{
        questionId: 'string',
        selectedAnswer: 'string|string[]',
        isCorrect: false,
        timeSpent: 0,           // Seconds spent on question
        skipped: false,
        hintsUsed: 0
    }],
    status: 'in_progress|completed|abandoned',
    score: {
        correct: 0,
        incorrect: 0,
        skipped: 0,
        total: 0,
        percentage: 0,
        points: 0,
        maxPoints: 0
    }
};

// Quiz Result Analytics
const QuizResult = {
    sessionId: 'string',
    completedAt: 'Date',
    duration: 0,                // Total time in seconds
    score: 'QuizSession.score',
    passed: false,
    categoryBreakdown: {
        basic: { correct: 0, total: 0 },
        intermediate: { correct: 0, total: 0 },
        advanced: { correct: 0, total: 0 }
    },
    tagBreakdown: {
        'smart-contracts': { correct: 0, total: 0 },
        'defi': { correct: 0, total: 0 }
        // ...more tags
    },
    weakAreas: ['string'],      // Tags with low scores
    strongAreas: ['string'],    // Tags with high scores
    recommendations: ['string'] // Suggested study topics
};
```

### 1.3 Core Implementation

```javascript
// quiz-engine.js

class QuizEngine {
    constructor(config) {
        this.config = config;
        this.session = null;
    }

    // Fisher-Yates shuffle algorithm
    shuffleArray(array) {
        const shuffled = [...array];
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        return shuffled;
    }

    // Select questions based on configuration
    selectQuestions() {
        let questionPool = [];
        
        // Gather questions from selected sections
        this.config.sections.forEach(section => {
            const sectionQuestions = web3Data[section] || [];
            questionPool.push(...sectionQuestions.map((q, idx) => ({
                ...q,
                id: `${section}-${idx}`,
                section: section
            })));
        });

        // Filter by difficulty if specified
        if (this.config.difficulties) {
            questionPool = questionPool.filter(q => 
                this.config.difficulties.some(d => 
                    q.tags.includes(`difficulty-${d}`)
                )
            );
        }

        // Shuffle and select
        if (this.config.shuffleQuestions) {
            questionPool = this.shuffleArray(questionPool);
        }

        return questionPool.slice(0, this.config.questionCount);
    }

    // Transform content questions to quiz format
    transformToQuizQuestion(contentQuestion) {
        // Extract key concepts from answer for options
        const quizQuestion = {
            id: contentQuestion.id,
            type: this.determineQuestionType(contentQuestion),
            title: contentQuestion.title,
            content: this.extractQuestionContent(contentQuestion),
            options: this.generateOptions(contentQuestion),
            correctAnswer: this.extractCorrectAnswer(contentQuestion),
            explanation: contentQuestion.answer,
            difficulty: this.extractDifficulty(contentQuestion),
            tags: contentQuestion.tags,
            points: this.calculatePoints(contentQuestion)
        };
        
        return quizQuestion;
    }

    determineQuestionType(question) {
        const title = question.title.toLowerCase();
        
        // True/False patterns
        if (title.includes('is it true') || 
            title.includes('true or false') ||
            title.startsWith('can ') ||
            title.startsWith('is ') ||
            title.startsWith('are ') ||
            title.startsWith('does ')) {
            return QuestionTypes.TRUE_FALSE;
        }
        
        // Fill in blank for code questions
        if (question.answer.includes('<code>') || 
            question.answer.includes('<pre>')) {
            return QuestionTypes.CODE_COMPLETION;
        }
        
        // Default to multiple choice
        return QuestionTypes.MULTIPLE_CHOICE;
    }

    generateOptions(question) {
        // For multiple choice, generate plausible wrong answers
        // This could use AI or predefined wrong answers
        const options = [];
        
        // Extract correct answer
        const correctAnswer = this.extractCorrectAnswer(question);
        options.push({ 
            id: 'a', 
            text: correctAnswer, 
            isCorrect: true 
        });

        // Generate distractors based on question type
        const distractors = this.generateDistractors(question, correctAnswer);
        distractors.forEach((d, idx) => {
            options.push({
                id: String.fromCharCode(98 + idx), // b, c, d
                text: d,
                isCorrect: false
            });
        });

        // Shuffle options
        return this.shuffleArray(options);
    }

    generateDistractors(question, correctAnswer) {
        // Distractor generation strategies
        const distractors = [];
        const tags = question.tags;

        // Strategy 1: Related but incorrect terms
        const relatedTerms = {
            'consensus': ['Proof of Authority', 'Proof of Burn', 'Proof of Importance'],
            'smart-contracts': ['External contract', 'Abstract contract', 'Virtual contract'],
            'defi': ['Centralized Exchange', 'Traditional Bank', 'Payment Gateway'],
            'tokens': ['ERC-1155', 'ERC-721', 'ERC-777', 'BEP-20'],
            'security': ['SQL Injection', 'XSS Attack', 'CSRF Attack']
        };

        // Find matching category
        for (const [tag, terms] of Object.entries(relatedTerms)) {
            if (tags.includes(tag)) {
                const filtered = terms.filter(t => 
                    !correctAnswer.toLowerCase().includes(t.toLowerCase())
                );
                distractors.push(...filtered.slice(0, 3));
                break;
            }
        }

        // Ensure we have 3 distractors
        while (distractors.length < 3) {
            distractors.push(`Incorrect option ${distractors.length + 1}`);
        }

        return distractors.slice(0, 3);
    }

    extractCorrectAnswer(question) {
        const answer = question.answer;
        
        // Try to extract from <strong> tags
        const strongMatch = answer.match(/<strong>([^<]+)<\/strong>/);
        if (strongMatch) {
            return strongMatch[1];
        }

        // Try to extract first list item
        const liMatch = answer.match(/<li>([^<]+)/);
        if (liMatch) {
            return liMatch[1];
        }

        // Try first paragraph
        const pMatch = answer.match(/<p>([^<]+)/);
        if (pMatch) {
            return pMatch[1].substring(0, 100) + '...';
        }

        return 'See explanation';
    }

    extractDifficulty(question) {
        for (const tag of question.tags) {
            if (tag.startsWith('difficulty-')) {
                return tag.replace('difficulty-', '');
            }
        }
        return 'intermediate';
    }

    calculatePoints(question) {
        const difficultyPoints = {
            basic: 5,
            intermediate: 10,
            advanced: 15
        };
        return difficultyPoints[this.extractDifficulty(question)] || 10;
    }

    // Start a new quiz session
    startQuiz() {
        const questions = this.selectQuestions()
            .map(q => this.transformToQuizQuestion(q));

        this.session = {
            id: this.generateSessionId(),
            configId: this.config.id,
            startTime: new Date(),
            endTime: null,
            currentQuestionIndex: 0,
            questions: questions,
            answers: [],
            status: 'in_progress',
            score: {
                correct: 0,
                incorrect: 0,
                skipped: 0,
                total: questions.length,
                percentage: 0,
                points: 0,
                maxPoints: questions.reduce((sum, q) => sum + q.points, 0)
            }
        };

        this.saveSession();
        return this.session;
    }

    generateSessionId() {
        return `quiz_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    }

    // Submit answer for current question
    submitAnswer(answer, timeSpent = 0) {
        const currentQuestion = this.getCurrentQuestion();
        if (!currentQuestion) return null;

        const isCorrect = this.checkAnswer(currentQuestion, answer);
        
        const answerRecord = {
            questionId: currentQuestion.id,
            selectedAnswer: answer,
            isCorrect: isCorrect,
            timeSpent: timeSpent,
            skipped: false,
            hintsUsed: 0
        };

        this.session.answers.push(answerRecord);
        
        // Update score
        if (isCorrect) {
            this.session.score.correct++;
            this.session.score.points += currentQuestion.points;
        } else {
            this.session.score.incorrect++;
        }

        this.session.score.percentage = 
            (this.session.score.correct / this.session.score.total) * 100;

        this.saveSession();

        return {
            isCorrect,
            correctAnswer: currentQuestion.correctAnswer,
            explanation: currentQuestion.explanation,
            score: this.session.score
        };
    }

    checkAnswer(question, answer) {
        switch (question.type) {
            case QuestionTypes.MULTIPLE_CHOICE:
                const correctOption = question.options.find(o => o.isCorrect);
                return correctOption && correctOption.id === answer;
            
            case QuestionTypes.TRUE_FALSE:
                return question.correctAnswer.toLowerCase() === 
                       answer.toLowerCase();
            
            case QuestionTypes.FILL_IN_BLANK:
                return question.correctAnswer.toLowerCase().trim() === 
                       answer.toLowerCase().trim();
            
            case QuestionTypes.CODE_COMPLETION:
                // Normalize whitespace and compare
                const normalizedCorrect = question.correctAnswer
                    .replace(/\s+/g, ' ').trim();
                const normalizedAnswer = answer
                    .replace(/\s+/g, ' ').trim();
                return normalizedCorrect === normalizedAnswer;
            
            default:
                return false;
        }
    }

    skipQuestion() {
        const currentQuestion = this.getCurrentQuestion();
        if (!currentQuestion) return null;

        this.session.answers.push({
            questionId: currentQuestion.id,
            selectedAnswer: null,
            isCorrect: false,
            timeSpent: 0,
            skipped: true,
            hintsUsed: 0
        });

        this.session.score.skipped++;
        this.saveSession();

        return this.nextQuestion();
    }

    getCurrentQuestion() {
        if (!this.session || 
            this.session.currentQuestionIndex >= this.session.questions.length) {
            return null;
        }
        return this.session.questions[this.session.currentQuestionIndex];
    }

    nextQuestion() {
        this.session.currentQuestionIndex++;
        
        if (this.session.currentQuestionIndex >= this.session.questions.length) {
            return this.finishQuiz();
        }

        this.saveSession();
        return this.getCurrentQuestion();
    }

    previousQuestion() {
        if (this.session.currentQuestionIndex > 0) {
            this.session.currentQuestionIndex--;
            this.saveSession();
        }
        return this.getCurrentQuestion();
    }

    finishQuiz() {
        this.session.endTime = new Date();
        this.session.status = 'completed';
        
        const result = this.generateResult();
        this.saveResult(result);
        this.saveSession();
        
        return result;
    }

    generateResult() {
        const duration = (this.session.endTime - this.session.startTime) / 1000;
        
        // Category breakdown
        const categoryBreakdown = {};
        const tagBreakdown = {};

        this.session.questions.forEach((question, idx) => {
            const answer = this.session.answers[idx];
            const isCorrect = answer ? answer.isCorrect : false;

            // Category
            const difficulty = question.difficulty;
            if (!categoryBreakdown[difficulty]) {
                categoryBreakdown[difficulty] = { correct: 0, total: 0 };
            }
            categoryBreakdown[difficulty].total++;
            if (isCorrect) categoryBreakdown[difficulty].correct++;

            // Tags
            question.tags.forEach(tag => {
                if (!tag.startsWith('difficulty-')) {
                    if (!tagBreakdown[tag]) {
                        tagBreakdown[tag] = { correct: 0, total: 0 };
                    }
                    tagBreakdown[tag].total++;
                    if (isCorrect) tagBreakdown[tag].correct++;
                }
            });
        });

        // Identify weak and strong areas
        const weakAreas = [];
        const strongAreas = [];

        Object.entries(tagBreakdown).forEach(([tag, stats]) => {
            const percentage = (stats.correct / stats.total) * 100;
            if (percentage < 50 && stats.total >= 2) {
                weakAreas.push(tag);
            } else if (percentage >= 80 && stats.total >= 2) {
                strongAreas.push(tag);
            }
        });

        // Generate recommendations
        const recommendations = weakAreas.map(area => 
            `Review ${area} concepts - scored below 50%`
        );

        return {
            sessionId: this.session.id,
            completedAt: this.session.endTime,
            duration,
            score: this.session.score,
            passed: this.session.score.percentage >= this.config.passingScore,
            categoryBreakdown,
            tagBreakdown,
            weakAreas,
            strongAreas,
            recommendations
        };
    }

    // Persistence
    saveSession() {
        const sessions = JSON.parse(
            localStorage.getItem('quizSessions') || '{}'
        );
        sessions[this.session.id] = this.session;
        localStorage.setItem('quizSessions', JSON.stringify(sessions));
    }

    loadSession(sessionId) {
        const sessions = JSON.parse(
            localStorage.getItem('quizSessions') || '{}'
        );
        this.session = sessions[sessionId] || null;
        return this.session;
    }

    saveResult(result) {
        const results = JSON.parse(
            localStorage.getItem('quizResults') || '[]'
        );
        results.push(result);
        localStorage.setItem('quizResults', JSON.stringify(results));
    }

    getQuizHistory() {
        return JSON.parse(localStorage.getItem('quizResults') || '[]');
    }
}
```

### 1.4 UI Components

```html
<!-- Quiz Mode Section in index.html -->
<section class="content-section" id="quizSection" style="display: none;">
    <div class="section-header">
        <h1>🎯 Quiz Mode</h1>
        <p class="section-subtitle">Test your Web3 knowledge</p>
    </div>
    
    <!-- Quiz Setup -->
    <div id="quizSetup" class="quiz-setup">
        <div class="quiz-config-card">
            <h3>Configure Your Quiz</h3>
            
            <div class="config-group">
                <label>Select Topics</label>
                <div class="checkbox-group">
                    <label class="checkbox-label">
                        <input type="checkbox" name="section" value="basic" checked>
                        📗 Basic
                    </label>
                    <label class="checkbox-label">
                        <input type="checkbox" name="section" value="intermediate">
                        📘 Intermediate
                    </label>
                    <label class="checkbox-label">
                        <input type="checkbox" name="section" value="advanced">
                        📕 Advanced
                    </label>
                    <label class="checkbox-label">
                        <input type="checkbox" name="section" value="rust">
                        🦀 Rust
                    </label>
                </div>
            </div>

            <div class="config-group">
                <label for="questionCount">Number of Questions</label>
                <div class="range-input">
                    <input type="range" id="questionCount" min="5" max="50" value="10">
                    <span id="questionCountDisplay">10</span>
                </div>
            </div>

            <div class="config-group">
                <label for="timeLimit">Time Limit (per question)</label>
                <select id="timeLimit">
                    <option value="0">No Limit</option>
                    <option value="30">30 seconds</option>
                    <option value="60" selected>1 minute</option>
                    <option value="120">2 minutes</option>
                </select>
            </div>

            <div class="config-group">
                <label class="checkbox-label">
                    <input type="checkbox" id="shuffleQuestions" checked>
                    Shuffle Questions
                </label>
                <label class="checkbox-label">
                    <input type="checkbox" id="showFeedback" checked>
                    Show Feedback After Each Question
                </label>
            </div>

            <button class="btn-primary btn-large" id="startQuizBtn">
                Start Quiz 🚀
            </button>
        </div>

        <div class="quiz-history">
            <h3>Recent Quizzes</h3>
            <div id="quizHistoryList"></div>
        </div>
    </div>

    <!-- Active Quiz -->
    <div id="activeQuiz" class="active-quiz" style="display: none;">
        <div class="quiz-header">
            <div class="quiz-progress">
                <span id="questionProgress">1 / 10</span>
                <div class="progress-bar">
                    <div class="progress-fill" id="quizProgressBar"></div>
                </div>
            </div>
            <div class="quiz-timer" id="quizTimer">
                <span class="timer-icon">⏱️</span>
                <span id="timerDisplay">1:00</span>
            </div>
            <div class="quiz-score">
                Score: <span id="currentScore">0</span>
            </div>
        </div>

        <div class="question-card quiz-question-card">
            <div class="question-type-badge" id="questionTypeBadge">
                Multiple Choice
            </div>
            <h2 class="question-text" id="questionText"></h2>
            
            <div id="questionContent" class="question-content-area"></div>
            
            <div id="optionsContainer" class="options-container"></div>
            
            <div class="quiz-actions">
                <button class="btn-secondary" id="skipBtn">Skip</button>
                <button class="btn-primary" id="submitAnswerBtn" disabled>
                    Submit Answer
                </button>
            </div>
        </div>

        <div id="feedbackModal" class="feedback-modal" style="display: none;">
            <div class="feedback-content">
                <div class="feedback-icon" id="feedbackIcon"></div>
                <h3 id="feedbackTitle"></h3>
                <div id="feedbackExplanation"></div>
                <button class="btn-primary" id="nextQuestionBtn">
                    Next Question →
                </button>
            </div>
        </div>
    </div>

    <!-- Quiz Results -->
    <div id="quizResults" class="quiz-results" style="display: none;">
        <div class="results-header">
            <div class="results-score-circle" id="resultsScoreCircle">
                <span class="score-percentage">85%</span>
                <span class="score-label">Score</span>
            </div>
            <h2 id="resultsTitle">Great Job!</h2>
            <p id="resultsSubtitle">You passed the quiz!</p>
        </div>

        <div class="results-stats">
            <div class="stat-card">
                <span class="stat-value" id="correctCount">8</span>
                <span class="stat-label">Correct</span>
            </div>
            <div class="stat-card">
                <span class="stat-value" id="incorrectCount">2</span>
                <span class="stat-label">Incorrect</span>
            </div>
            <div class="stat-card">
                <span class="stat-value" id="timeSpent">5:30</span>
                <span class="stat-label">Time</span>
            </div>
            <div class="stat-card">
                <span class="stat-value" id="pointsEarned">85</span>
                <span class="stat-label">Points</span>
            </div>
        </div>

        <div class="results-breakdown">
            <h3>Performance by Category</h3>
            <div id="categoryBreakdown" class="breakdown-chart"></div>
        </div>

        <div class="results-areas">
            <div class="weak-areas">
                <h4>📚 Areas to Improve</h4>
                <ul id="weakAreasList"></ul>
            </div>
            <div class="strong-areas">
                <h4>💪 Strong Areas</h4>
                <ul id="strongAreasList"></ul>
            </div>
        </div>

        <div class="results-actions">
            <button class="btn-secondary" id="reviewAnswersBtn">
                Review Answers
            </button>
            <button class="btn-primary" id="retakeQuizBtn">
                Take Another Quiz
            </button>
        </div>
    </div>
</section>
```

### 1.5 CSS Styles

```css
/* Quiz Mode Styles */
.quiz-setup {
    display: grid;
    grid-template-columns: 2fr 1fr;
    gap: 24px;
}

.quiz-config-card {
    background: var(--bg-card);
    border: 1px solid var(--border-color);
    border-radius: var(--radius-lg);
    padding: 32px;
}

.config-group {
    margin-bottom: 24px;
}

.config-group label {
    display: block;
    font-weight: 600;
    margin-bottom: 12px;
    color: var(--text-primary);
}

.checkbox-group {
    display: flex;
    flex-wrap: wrap;
    gap: 16px;
}

.checkbox-label {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 12px 16px;
    background: var(--bg-tertiary);
    border-radius: var(--radius-md);
    cursor: pointer;
    transition: var(--transition);
}

.checkbox-label:hover {
    background: var(--bg-secondary);
}

.checkbox-label input:checked + span {
    color: var(--accent-primary);
}

.range-input {
    display: flex;
    align-items: center;
    gap: 16px;
}

.range-input input[type="range"] {
    flex: 1;
    height: 8px;
    border-radius: 4px;
    background: var(--bg-tertiary);
    -webkit-appearance: none;
}

.range-input input[type="range"]::-webkit-slider-thumb {
    -webkit-appearance: none;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: var(--accent-primary);
    cursor: pointer;
}

/* Active Quiz */
.active-quiz {
    max-width: 800px;
    margin: 0 auto;
}

.quiz-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 16px 24px;
    background: var(--bg-card);
    border-radius: var(--radius-lg);
    margin-bottom: 24px;
}

.quiz-progress {
    display: flex;
    align-items: center;
    gap: 16px;
}

.quiz-progress .progress-bar {
    width: 200px;
}

.quiz-timer {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 18px;
    font-weight: 600;
}

.quiz-timer.warning {
    color: var(--accent-warning);
    animation: pulse 1s infinite;
}

.quiz-timer.danger {
    color: var(--accent-danger);
    animation: pulse 0.5s infinite;
}

@keyframes pulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.5; }
}

.quiz-question-card {
    background: var(--bg-card);
    border: 1px solid var(--border-color);
    border-radius: var(--radius-lg);
    padding: 32px;
}

.question-type-badge {
    display: inline-block;
    padding: 4px 12px;
    background: var(--accent-primary);
    color: white;
    border-radius: 12px;
    font-size: 12px;
    font-weight: 600;
    margin-bottom: 16px;
}

.question-text {
    font-size: 20px;
    font-weight: 600;
    color: var(--text-primary);
    margin-bottom: 24px;
    line-height: 1.5;
}

.options-container {
    display: flex;
    flex-direction: column;
    gap: 12px;
}

.option-btn {
    display: flex;
    align-items: center;
    gap: 16px;
    padding: 16px 20px;
    background: var(--bg-tertiary);
    border: 2px solid transparent;
    border-radius: var(--radius-md);
    text-align: left;
    cursor: pointer;
    transition: var(--transition);
}

.option-btn:hover {
    border-color: var(--accent-primary);
    background: var(--bg-secondary);
}

.option-btn.selected {
    border-color: var(--accent-primary);
    background: rgba(88, 166, 255, 0.1);
}

.option-btn.correct {
    border-color: var(--accent-success);
    background: rgba(63, 185, 80, 0.1);
}

.option-btn.incorrect {
    border-color: var(--accent-danger);
    background: rgba(248, 81, 73, 0.1);
}

.option-letter {
    width: 32px;
    height: 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: var(--bg-primary);
    border-radius: 50%;
    font-weight: 600;
}

.quiz-actions {
    display: flex;
    justify-content: space-between;
    margin-top: 24px;
    padding-top: 24px;
    border-top: 1px solid var(--border-color);
}

/* Feedback Modal */
.feedback-modal {
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.8);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
}

.feedback-content {
    background: var(--bg-card);
    border-radius: var(--radius-lg);
    padding: 40px;
    max-width: 500px;
    text-align: center;
}

.feedback-icon {
    font-size: 64px;
    margin-bottom: 16px;
}

.feedback-icon.correct::before {
    content: '✅';
}

.feedback-icon.incorrect::before {
    content: '❌';
}

/* Quiz Results */
.quiz-results {
    text-align: center;
}

.results-header {
