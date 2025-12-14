// Rust & Web3 Questions - Combined Index
// This file combines all Rust-related questions from subfiles

// For browser environment, we'll define the arrays that will be loaded via script tags
// For Node.js environment, we'll use require

let rustBasics = [];
let rustSubstrate = [];
let rustSolana = [];
let rustNear = [];
let rustCosmWasm = [];

// Try to load in Node.js environment
if (typeof require !== 'undefined') {
    try {
        rustBasics = require('./basics.js');
        rustSubstrate = require('./substrate.js');
        rustSolana = require('./solana.js');
        rustNear = require('./near.js');
        rustCosmWasm = require('./cosmwasm.js');
    } catch (e) {
        console.log('Loading Rust modules in browser environment');
    }
}

// Combine all Rust questions
const rustQuestions = [
    ...rustBasics,
    ...rustSubstrate,
    ...rustSolana,
    ...rustNear,
    ...rustCosmWasm
];

// Export for use in main data file
if (typeof module !== 'undefined' && module.exports) {
    module.exports = rustQuestions;
}