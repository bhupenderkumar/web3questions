// Advanced Web3 Questions - Index file combining all advanced questions
// Total: 71+ questions split across multiple files for better management

// Check if we're in Node.js environment
if (typeof module !== 'undefined' && module.exports) {
    const advancedSecurity = require('./security.js');
    const advancedDefi = require('./defi-advanced.js');
    const advancedLayer2 = require('./layer2-scaling.js');
    const advancedCryptography = require('./cryptography-zk.js');
    const advancedEVM = require('./evm-internals.js');
    
    module.exports = [
        ...advancedSecurity,
        ...advancedDefi,
        ...advancedLayer2,
        ...advancedCryptography,
        ...advancedEVM
    ];
}

// For browser environment, the arrays will be combined in the main data.js file