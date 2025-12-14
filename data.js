// Web3 Question Bank - Main Data File
// This file loads and combines questions from all category-specific files

// ============================================================================
// DATA LOADING FOR BROWSER ENVIRONMENT
// ============================================================================
// The split data files are loaded via script tags in index.html
// This file combines all the loaded arrays into a single web3Data object

const web3Data = {
    // Basic questions - loaded from data/basic/*.js files
    basic: [],
    
    // Intermediate questions - loaded from data/intermediate.js
    intermediate: [],
    
    // Advanced questions - loaded from data/advanced/*.js files
    advanced: [],
    
    // Project-based questions - loaded from data/projects.js
    projects: [],
    
    // Rust/Substrate questions - loaded from data/rust/*.js files
    rust: []
};

// ============================================================================
// INITIALIZATION FUNCTION
// ============================================================================
// This function is called after all data scripts are loaded

function initializeWeb3Data() {
    // Combine basic questions from all subfiles
    if (typeof basicFundamentals !== 'undefined') web3Data.basic.push(...basicFundamentals);
    if (typeof basicCryptocurrency !== 'undefined') web3Data.basic.push(...basicCryptocurrency);
    if (typeof basicWallets !== 'undefined') web3Data.basic.push(...basicWallets);
    if (typeof basicTransactions !== 'undefined') web3Data.basic.push(...basicTransactions);
    if (typeof basicConsensus !== 'undefined') web3Data.basic.push(...basicConsensus);
    if (typeof basicWeb3Intro !== 'undefined') web3Data.basic.push(...basicWeb3Intro);
    
    // Combine advanced questions from all subfiles
    if (typeof advancedSecurity !== 'undefined') web3Data.advanced.push(...advancedSecurity);
    if (typeof advancedDefi !== 'undefined') web3Data.advanced.push(...advancedDefi);
    if (typeof advancedLayer2 !== 'undefined') web3Data.advanced.push(...advancedLayer2);
    if (typeof advancedCryptography !== 'undefined') web3Data.advanced.push(...advancedCryptography);
    if (typeof advancedEVM !== 'undefined') web3Data.advanced.push(...advancedEVM);
    
    // Combine Rust questions from all subfiles
    if (typeof rustBasics !== 'undefined') web3Data.rust.push(...rustBasics);
    if (typeof rustSubstrate !== 'undefined') web3Data.rust.push(...rustSubstrate);
    if (typeof rustSolana !== 'undefined') web3Data.rust.push(...rustSolana);
    if (typeof rustNear !== 'undefined') web3Data.rust.push(...rustNear);
    if (typeof rustCosmWasm !== 'undefined') web3Data.rust.push(...rustCosmWasm);
    
    // Load intermediate questions
    if (typeof intermediateQuestions !== 'undefined') web3Data.intermediate.push(...intermediateQuestions);
    
    // Load project questions
    if (typeof projectQuestions !== 'undefined') web3Data.projects.push(...projectQuestions);
    
    console.log(`Web3 Data Loaded:
    - Basic: ${web3Data.basic.length} questions
    - Intermediate: ${web3Data.intermediate.length} questions
    - Advanced: ${web3Data.advanced.length} questions
    - Projects: ${web3Data.projects.length} questions
    - Rust: ${web3Data.rust.length} questions
    - Total: ${web3Data.basic.length + web3Data.intermediate.length + web3Data.advanced.length + web3Data.projects.length + web3Data.rust.length} questions`);
}

// ============================================================================
// LEGACY FALLBACK DATA (in case scripts don't load)
// ============================================================================
// This provides a minimal set of questions if the split files fail to load

const fallbackData = {
    basic: [
        {
            title: "What is a blockchain?",
            tags: ["fundamentals", "difficulty-basic"],
            answer: `
                <p>A blockchain is a distributed, immutable, and transparent digital ledger that records transactions in a secure and chronological order.</p>
                <strong>Key characteristics:</strong>
                <ul>
                    <li><strong>Decentralization:</strong> Maintained by a network of computers rather than a central authority</li>
                    <li><strong>Immutability:</strong> Once recorded, transactions cannot be altered</li>
                    <li><strong>Transparency:</strong> All participants can see recorded transactions</li>
                </ul>
            `
        }
    ],
    intermediate: [
        {
            title: "What is a smart contract?",
            tags: ["smart-contracts", "solidity", "difficulty-intermediate"],
            answer: `
                <p>A smart contract is a program stored on a blockchain that automatically executes when predetermined conditions are met.</p>
                <strong>Key properties:</strong>
                <ul>
                    <li>Self-executing code on blockchain</li>
                    <li>Immutable once deployed</li>
                    <li>Transparent and verifiable</li>
                </ul>
            `
        }
    ],
    advanced: [
        {
            title: "What is a reentrancy attack?",
            tags: ["security", "vulnerability", "difficulty-advanced"],
            answer: `
                <p>A reentrancy attack exploits a vulnerability where a contract calls an external contract before updating its own state.</p>
                <strong>Prevention:</strong> Use checks-effects-interactions pattern, reentrancy guards, and proper state management.
            `
        }
    ],
    projects: [
        {
            title: "Build a Simple ERC-20 Token",
            tags: ["solidity", "tokens", "project-beginner"],
            answer: `
                <p>Create a basic fungible token following the ERC-20 standard.</p>
                <strong>Requirements:</strong> Basic Solidity, understanding of token standards.
            `
        }
    ],
    rust: [
        {
            title: "What is ownership in Rust?",
            tags: ["rust", "difficulty-basic"],
            answer: `
                <p>Ownership is Rust's most unique feature for memory safety without garbage collection.</p>
                <strong>Rules:</strong>
                <ul>
                    <li>Each value has exactly one owner</li>
                    <li>Value is dropped when owner goes out of scope</li>
                    <li>Ownership can be transferred (moved) or borrowed</li>
                </ul>
            `
        }
    ]
};

// Use fallback if no questions loaded after initialization
function checkAndUseFallback() {
    if (web3Data.basic.length === 0) {
        console.warn('Using fallback data - split files may not have loaded');
        Object.assign(web3Data, fallbackData);
    }
}

// ============================================================================
// AUTO-INITIALIZE ON LOAD
// ============================================================================
// Wait for DOM and all scripts to load, then initialize

if (typeof window !== 'undefined') {
    window.addEventListener('load', function() {
        initializeWeb3Data();
        checkAndUseFallback();
    });
}
