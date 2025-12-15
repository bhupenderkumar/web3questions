const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const fs = require('fs');
const path = require('path');
const app = express();

const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// ============ Categories ============
// Get all categories with question counts (from JSON files)
app.get('/api/categories', async (req, res) => {
  try {
    const categoriesPath = path.join(__dirname, '../prisma/data/categories.json');
    const categories = JSON.parse(fs.readFileSync(categoriesPath, 'utf-8'));
    // For each category, count questions from the corresponding file
    const counts = {};
    for (const cat of categories) {
      let file = null;
      if (cat.name === 'basic') file = 'basic-questions.json';
      else if (cat.name === 'intermediate') file = 'intermediate-questions.json';
      else if (cat.name === 'advanced') file = 'advanced-questions.json';
      else if (cat.name === 'projects') file = 'projects-questions.json';
      else if (cat.name === 'rust') file = 'rust-questions.json';
      if (file) {
        const questionsPath = path.join(__dirname, `../prisma/data/${file}`);
        const questions = JSON.parse(fs.readFileSync(questionsPath, 'utf-8'));
        counts[cat.name] = questions.length;
      } else {
        counts[cat.name] = 0;
      }
    }
    res.json(categories.map(cat => ({
      ...cat,
      questionCount: counts[cat.name] || 0
    })));
  } catch (error) {
    console.error('Error fetching categories:', error);
    res.status(500).json({ error: 'Failed to fetch categories' });
  }
});

// ============ Questions ============
// Get questions by category (from JSON files)
app.get('/api/questions/:category', async (req, res) => {
  try {
    const { category } = req.params;
    let file = null;
    if (category === 'basic') file = 'basic-questions.json';
    else if (category === 'intermediate') file = 'intermediate-questions.json';
    else if (category === 'advanced') file = 'advanced-questions.json';
    else if (category === 'projects') file = 'projects-questions.json';
    else if (category === 'rust') file = 'rust-questions.json';
    if (!file) return res.status(404).json({ error: 'Category not found' });
    const questionsPath = path.join(__dirname, `../prisma/data/${file}`);
    const questions = JSON.parse(fs.readFileSync(questionsPath, 'utf-8'));
    // Add id field for frontend compatibility
    res.json(questions.map((q, i) => ({
      id: `${category}-${i}`,
      title: q.title,
      answer: q.answer,
      order: q.order,
      tags: q.tags,
      // No bookmarks/completions in file mode
      isBookmarked: false,
      isCompleted: false
    })));
  } catch (error) {
    console.error('Error fetching questions:', error);
    res.status(500).json({ error: 'Failed to fetch questions' });
  }
});

// Get all questions (for search)
app.get('/api/questions', async (req, res) => {
  try {
    const { search, tag } = req.query;
    const sessionId = req.headers['x-session-id'];

    const where = {};
    
    if (search) {
      where.OR = [
        { title: { contains: search, mode: 'insensitive' } },
        { answer: { contains: search, mode: 'insensitive' } }
      ];
    }
    
    if (tag) {
      where.tags = {
        some: { name: tag }
      };
    }

    const questions = await prisma.question.findMany({
      where,
      orderBy: [
        { category: { order: 'asc' } },
        { order: 'asc' }
      ],
      include: {
        category: true,
        tags: true,
        bookmarks: sessionId ? {
          where: { sessionId }
        } : false,
        completions: sessionId ? {
          where: { sessionId }
        } : false
      }
    });

    res.json(questions.map(q => ({
      id: q.id,
      title: q.title,
      answer: q.answer,
      order: q.order,
      category: q.category.name,
      tags: q.tags.map(t => t.name),
      isBookmarked: q.bookmarks?.length > 0,
      isCompleted: q.completions?.length > 0
    })));
  } catch (error) {
    console.error('Error fetching questions:', error);
    res.status(500).json({ error: 'Failed to fetch questions' });
  }
});

// ============ Bookmarks ============

// Get user bookmarks
app.get('/api/bookmarks', async (req, res) => {
  try {
    const sessionId = req.headers['x-session-id'];
    if (!sessionId) {
      return res.status(400).json({ error: 'Session ID required' });
    }

    const bookmarks = await prisma.bookmark.findMany({
      where: { sessionId },
      include: {
        question: {
          include: {
            category: true,
            tags: true,
            completions: {
              where: { sessionId }
            }
          }
        }
      }
    });

    res.json(bookmarks.map(b => ({
      id: b.question.id,
      title: b.question.title,
      answer: b.question.answer,
      category: b.question.category.name,
      tags: b.question.tags.map(t => t.name),
      isBookmarked: true,
      isCompleted: b.question.completions?.length > 0
    })));
  } catch (error) {
    console.error('Error fetching bookmarks:', error);
    res.status(500).json({ error: 'Failed to fetch bookmarks' });
  }
});

// Toggle bookmark
app.post('/api/bookmarks/:questionId', async (req, res) => {
  try {
    const { questionId } = req.params;
    const sessionId = req.headers['x-session-id'];
    
    if (!sessionId) {
      return res.status(400).json({ error: 'Session ID required' });
    }

    const existing = await prisma.bookmark.findUnique({
      where: {
        sessionId_questionId: { sessionId, questionId }
      }
    });

    if (existing) {
      await prisma.bookmark.delete({
        where: { id: existing.id }
      });
      res.json({ bookmarked: false });
    } else {
      await prisma.bookmark.create({
        data: { sessionId, questionId }
      });
      res.json({ bookmarked: true });
    }
  } catch (error) {
    console.error('Error toggling bookmark:', error);
    res.status(500).json({ error: 'Failed to toggle bookmark' });
  }
});

// ============ Completions ============

// Get user progress
app.get('/api/progress', async (req, res) => {
  try {
    const sessionId = req.headers['x-session-id'];
    if (!sessionId) {
      return res.status(400).json({ error: 'Session ID required' });
    }

    const categories = await prisma.category.findMany({
      orderBy: { order: 'asc' },
      include: {
        _count: {
          select: { questions: true }
        },
        questions: {
          include: {
            completions: {
              where: { sessionId }
            }
          }
        }
      }
    });

    const progress = categories.map(cat => ({
      name: cat.name,
      displayName: cat.displayName,
      icon: cat.icon,
      total: cat._count.questions,
      completed: cat.questions.filter(q => q.completions.length > 0).length
    }));

    const totalCompleted = progress.reduce((sum, p) => sum + p.completed, 0);
    const totalQuestions = progress.reduce((sum, p) => sum + p.total, 0);

    res.json({
      categories: progress,
      totalCompleted,
      totalQuestions,
      percentage: totalQuestions > 0 ? Math.round((totalCompleted / totalQuestions) * 100) : 0
    });
  } catch (error) {
    console.error('Error fetching progress:', error);
    res.status(500).json({ error: 'Failed to fetch progress' });
  }
});

// Toggle completion
app.post('/api/completions/:questionId', async (req, res) => {
  try {
    const { questionId } = req.params;
    const sessionId = req.headers['x-session-id'];
    
    if (!sessionId) {
      return res.status(400).json({ error: 'Session ID required' });
    }

    const existing = await prisma.completion.findUnique({
      where: {
        sessionId_questionId: { sessionId, questionId }
      }
    });

    if (existing) {
      await prisma.completion.delete({
        where: { id: existing.id }
      });
      res.json({ completed: false });
    } else {
      await prisma.completion.create({
        data: { sessionId, questionId }
      });
      res.json({ completed: true });
    }
  } catch (error) {
    console.error('Error toggling completion:', error);
    res.status(500).json({ error: 'Failed to toggle completion' });
  }
});

// ============ Tags ============

// Get all tags
app.get('/api/tags', async (req, res) => {
  try {
    const tags = await prisma.tag.findMany({
      include: {
        _count: {
          select: { questions: true }
        }
      },
      orderBy: { name: 'asc' }
    });

    res.json(tags.map(t => ({
      name: t.name,
      count: t._count.questions
    })));
  } catch (error) {
    console.error('Error fetching tags:', error);
    res.status(500).json({ error: 'Failed to fetch tags' });
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  res.status(500).json({ error: 'Internal server error' });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`📚 API endpoints:`);
  console.log(`   GET  /api/health`);
  console.log(`   GET  /api/categories`);
  console.log(`   GET  /api/questions`);
  console.log(`   GET  /api/questions/:category`);
  console.log(`   GET  /api/bookmarks`);
  console.log(`   POST /api/bookmarks/:questionId`);
  console.log(`   GET  /api/progress`);
  console.log(`   POST /api/completions/:questionId`);
  console.log(`   GET  /api/tags`);
});

// Graceful shutdown
process.on('SIGINT', async () => {
  await prisma.$disconnect();
  process.exit(0);
});

process.on('SIGTERM', async () => {
  await prisma.$disconnect();
  process.exit(0);
});
