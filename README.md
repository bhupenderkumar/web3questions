# Web3 Interview Prep Platform 🚀

A comprehensive Web3 interview preparation platform with interactive Q&A, portfolio projects, and an integrated Rust tutorial system.

## 📋 Project Overview

This is a single-page web application designed to help developers prepare for Web3/blockchain interviews and build their portfolio with real-world projects.

## ✨ Features

### 📗 Basic Section (32 Questions)
- Blockchain fundamentals
- Cryptocurrency basics
- Wallet concepts
- Transaction mechanics
- Consensus mechanisms introduction

### 📘 Intermediate Section (42 Questions)
- Smart contract development
- Solidity programming
- Ethereum Virtual Machine (EVM)
- DeFi protocols
- NFTs and token standards
- Web3.js and Ethers.js

### 📕 Advanced Section (36 Questions)
- Layer 2 solutions (Optimistic Rollups, ZK-Rollups)
- MEV (Maximal Extractable Value)
- Cross-chain bridges
- Security vulnerabilities and auditing
- Advanced consensus mechanisms
- Cryptographic primitives

### 🚀 Portfolio Projects (16 Projects)
- DeFi applications (DEX, Lending, Yield Farming)
- NFT marketplaces
- DAO governance systems
- Token systems (ERC-20, ERC-721, ERC-1155)
- Multi-sig wallets
- Staking platforms

### 🦀 Rust Tutorial (52 Lessons)
- Rust syntax and fundamentals
- Ownership and borrowing
- Structs, enums, and pattern matching
- Error handling
- Concurrency
- Substrate blockchain development
- Solana program development
- 10+ Rust Web3 projects

## 🛠️ Tech Stack

- **Frontend**: HTML5, CSS3, Vanilla JavaScript
- **Syntax Highlighting**: Highlight.js
- **Storage**: LocalStorage for progress tracking
- **Design**: Dark mode optimized, developer-focused UI

## 📁 File Structure

```
web3question/
├── index.html      # Main HTML structure
├── styles.css      # All styling (dark theme)
├── data.js         # Question/project/tutorial content
├── app.js          # Application logic
├── README.md       # Project documentation
└── STATUS.md       # Development status
```

## 🚀 Getting Started


## 🏃‍♂️ How to Run

### 1. Clone the repository

```bash
git clone https://github.com/bhupenderkumar/web3questions.git
cd web3questions
```

### 2. Run the Backend API

You can run the backend (API + database) using Docker (recommended) or locally:

#### Using Docker (Recommended)

```bash
# From the project root
docker-compose up -d
# API: http://localhost:3001
# DB:  localhost:5433
```

#### Local Development

1. Start Postgres:
	```bash
	docker-compose up -d postgres
	```
2. Setup backend:
	```bash
	cd backend
	cp .env.example .env
	npm install
	npx prisma generate
	npx prisma db push
	npm run db:seed
	npm run dev
	```

See backend/README.md for API endpoints and advanced usage.

### 3. Run the Frontend

You can open `index.html` directly in your browser, or use a local server for best results:

```bash
# Python (from project root)
python -m http.server 8000
# or Node.js
npx http-server
```

Then visit: http://localhost:8000

---

## 💡 Key Features

| Feature | Description |
|---------|-------------|
| **Progress Tracking** | Track completed questions per section |
| **Bookmarks** | Save important questions for quick access |
| **Search** | Find questions across all sections |
| **Code Examples** | Syntax-highlighted Solidity & Rust snippets |
| **Dark Mode** | Eye-friendly theme for long study sessions |
| **Responsive** | Works on desktop and mobile devices |

## 📊 Progress System

- Questions marked as complete are saved to localStorage
- Progress bars show completion percentage per section
- Bookmarked items accessible from sidebar
- Overall statistics in Progress dashboard

## 🎯 Target Audience

- Web3 developers preparing for interviews
- Blockchain enthusiasts learning fundamentals
- Developers transitioning from Web2 to Web3
- Rust developers interested in blockchain
- Anyone building a Web3 portfolio

## 📝 License

MIT License - Feel free to use and modify for your learning journey!

---

**Happy Learning! 🎓**
# web3questions
