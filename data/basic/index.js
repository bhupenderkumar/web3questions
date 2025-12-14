// Basic Web3 Questions - Index file combining all basic questions
// Total: 99+ questions split across multiple files for better management

// Import all basic question categories
// Note: In browser environment, these will be loaded via script tags
// In Node.js environment, use require

const basicQuestions = [];

// Check if we're in Node.js environment
if (typeof module !== 'undefined' && module.exports) {
    const basicFundamentals = require('./fundamentals.js');
    const basicCryptocurrency = require('./cryptocurrency.js');
    const basicWallets = require('./wallets.js');
    const basicTransactions = require('./transactions.js');
    const basicConsensus = require('./consensus.js');
    const basicWeb3Intro = require('./web3-intro.js');
    
    module.exports = [
        ...basicFundamentals,
        ...basicCryptocurrency,
        ...basicWallets,
        ...basicTransactions,
        ...basicConsensus,
        ...basicWeb3Intro
    ];
}

// For browser environment, the arrays will be combined in the main data.js file