# Web3 Questions Backend

A Node.js/Express API with PostgreSQL database for the Web3 Interview Questions application.

## 🚀 Quick Start

### Prerequisites
- Docker & Docker Compose
- Node.js 18+ (for local development)

### Option 1: Using Docker (Recommended)

```bash
# From the project root directory
docker-compose up -d

# The API will be available at http://localhost:3001
# PostgreSQL will be available at localhost:5432
```

### Option 2: Local Development

1. **Start PostgreSQL with Docker:**
```bash
docker-compose up -d postgres
```

2. **Setup Backend:**
```bash
cd backend
cp .env.example .env
npm install
npx prisma generate
npx prisma db push
npm run db:seed
npm run dev
```

## 📊 Database Schema

### Categories
- `basic` - Basic Web3 Concepts
- `intermediate` - Intermediate Concepts
- `advanced` - Advanced Topics
- `projects` - Portfolio Projects
- `rust` - Rust for Web3

### Tables
- **Category** - Question categories
- **Question** - Interview questions with answers
- **Tag** - Question tags (many-to-many with questions)
- **Bookmark** - User bookmarks (session-based)
- **Completion** - User completed questions (session-based)

## 🔌 API Endpoints

### Health Check
```
GET /api/health
```

### Categories
```
GET /api/categories          # Get all categories with question counts
```

### Questions
```
GET /api/questions           # Get all questions (supports ?search=&tag=)
GET /api/questions/:category # Get questions by category
```

### Bookmarks
```
GET  /api/bookmarks              # Get user bookmarks (requires X-Session-Id header)
POST /api/bookmarks/:questionId  # Toggle bookmark
```

### Progress
```
GET  /api/progress                  # Get user progress (requires X-Session-Id header)
POST /api/completions/:questionId   # Toggle completion
```

### Tags
```
GET /api/tags               # Get all tags with counts
```

## 🔄 Data Migration

To migrate existing JavaScript data files to the database:

```bash
# From project root
node scripts/migrate-data.js

# This creates JSON files in backend/prisma/data/
# Then seed the database
cd backend
npm run db:seed
```

## 🛠 Development Commands

```bash
npm run dev          # Start development server with hot reload
npm run start        # Start production server
npm run db:generate  # Generate Prisma client
npm run db:push      # Push schema to database
npm run db:seed      # Seed database with questions
npm run db:migrate   # Run database migrations
npm run db:studio    # Open Prisma Studio (GUI for database)
```

## 🔐 Environment Variables

```env
DATABASE_URL=postgresql://web3user:web3password@localhost:5432/web3questions
PORT=3001
NODE_ENV=development
```

## 📝 Session Management

The API uses session-based tracking for bookmarks and progress. The frontend should:

1. Generate a unique session ID on first visit
2. Store it in localStorage
3. Send it with every request via the `X-Session-Id` header

Example:
```javascript
const sessionId = localStorage.getItem('sessionId') || generateId();
fetch('/api/bookmarks', {
    headers: { 'X-Session-Id': sessionId }
});
```
