#!/usr/bin/env node

/**
 * Data Migration Script
 * Converts existing JavaScript data files to JSON format for database seeding
 * 
 * Usage: node scripts/migrate-data.js
 */

const fs = require('fs');
const path = require('path');

const dataDir = path.join(__dirname, '..', 'data');
const outputDir = path.join(__dirname, '..', 'backend', 'prisma', 'data');

// Ensure output directory exists
if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
}

// Categories configuration
const categories = [
    {
        name: 'basic',
        displayName: 'Basic Web3 Concepts',
        description: 'Master the foundational concepts of blockchain and Web3 technology',
        icon: '📗',
        order: 1,
        files: [
            'basic/fundamentals.js',
            'basic/consensus.js',
            'basic/cryptocurrency.js',
            'basic/transactions.js',
            'basic/wallets.js',
            'basic/web3-intro.js'
        ]
    },
    {
        name: 'intermediate',
        displayName: 'Intermediate Concepts',
        description: 'Deep dive into smart contracts, DeFi, and Web3 development',
        icon: '📘',
        order: 2,
        files: ['intermediate.js']
    },
    {
        name: 'advanced',
        displayName: 'Advanced Topics',
        description: 'Expert-level questions on Layer 2, MEV, security, and more',
        icon: '📕',
        order: 3,
        files: [
            'advanced/layer2-scaling.js',
            'advanced/defi-advanced.js',
            'advanced/cryptography-zk.js',
            'advanced/evm-internals.js',
            'advanced/security.js'
        ]
    },
    {
        name: 'projects',
        displayName: 'Portfolio Projects',
        description: 'Build real-world Web3 applications to showcase your skills',
        icon: '🚀',
        order: 4,
        files: ['projects.js']
    },
    {
        name: 'rust',
        displayName: 'Rust for Web3',
        description: 'Complete Rust tutorial for blockchain development with Substrate, Solana, NEAR & CosmWasm',
        icon: '🦀',
        order: 5,
        files: [
            'rust/basics.js',
            'rust/substrate.js',
            'rust/solana.js',
            'rust/near.js',
            'rust/cosmwasm.js'
        ]
    }
];

function extractQuestionsFromFile(filePath) {
    try {
        // Clear require cache to ensure fresh load
        delete require.cache[require.resolve(filePath)];
        
        // Try to require the file directly
        const data = require(filePath);
        
        if (Array.isArray(data)) {
            console.log(`  Found ${data.length} questions`);
            return data;
        }
        
        console.log(`  ⚠️ File did not export an array`);
        return [];
    } catch (error) {
        console.error(`  Error processing ${filePath}:`, error.message);
        return [];
    }
}

function parseQuestionsManually(content) {
    const questions = [];
    
    // Match each question object: { title: "...", tags: [...], answer: `...` }
    const objectPattern = /\{\s*title:\s*["'`]([^"'`]+)["'`],\s*tags:\s*\[([\s\S]*?)\],\s*answer:\s*`([\s\S]*?)`\s*\}/g;
    
    let match;
    while ((match = objectPattern.exec(content)) !== null) {
        const title = match[1];
        const tagsStr = match[2];
        const answer = match[3].trim();
        
        // Parse tags
        const tags = tagsStr.match(/["']([^"']+)["']/g)?.map(t => t.replace(/["']/g, '')) || [];
        
        questions.push({ title, tags, answer });
    }
    
    return questions;
}

function migrateData() {
    console.log('🚀 Starting data migration...\n');
    
    const allData = {
        categories: [],
        questions: {}
    };

    for (const category of categories) {
        console.log(`📁 Processing category: ${category.displayName}`);
        allData.categories.push({
            name: category.name,
            displayName: category.displayName,
            description: category.description,
            icon: category.icon,
            order: category.order
        });

        const questions = [];
        
        for (const file of category.files) {
            const filePath = path.join(dataDir, file);
            if (fs.existsSync(filePath)) {
                console.log(`  Reading: ${file}`);
                const extracted = extractQuestionsFromFile(filePath);
                questions.push(...extracted);
            } else {
                console.log(`  ⚠️ File not found: ${file}`);
            }
        }

        allData.questions[category.name] = questions.map((q, index) => ({
            title: q.title,
            answer: q.answer,
            tags: q.tags || [],
            order: index
        }));

        console.log(`  ✅ Total: ${questions.length} questions\n`);
    }

    // Write categories JSON
    const categoriesPath = path.join(outputDir, 'categories.json');
    fs.writeFileSync(categoriesPath, JSON.stringify(allData.categories, null, 2));
    console.log(`📝 Created: ${categoriesPath}`);

    // Write questions JSON for each category
    for (const [categoryName, questions] of Object.entries(allData.questions)) {
        const questionsPath = path.join(outputDir, `${categoryName}-questions.json`);
        fs.writeFileSync(questionsPath, JSON.stringify(questions, null, 2));
        console.log(`📝 Created: ${questionsPath}`);
    }

    // Write combined JSON
    const combinedPath = path.join(outputDir, 'all-data.json');
    fs.writeFileSync(combinedPath, JSON.stringify(allData, null, 2));
    console.log(`📝 Created: ${combinedPath}`);

    // Summary
    const totalQuestions = Object.values(allData.questions).reduce((sum, q) => sum + q.length, 0);
    console.log(`\n✅ Migration complete!`);
    console.log(`   Categories: ${allData.categories.length}`);
    console.log(`   Total Questions: ${totalQuestions}`);
}

migrateData();
