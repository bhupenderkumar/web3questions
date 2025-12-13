const web3Data = {
    basic: [
        {
            title: "What is a blockchain?",
            tags: ["fundamentals", "difficulty-basic"],
            answer: `
                <p>A blockchain is a distributed, immutable, and transparent digital ledger that records transactions in a secure and chronological order. It consists of a chain of blocks, where each block contains a list of transactions, a timestamp, and a reference (hash) to the previous block.</p>
                <strong>Key characteristics:</strong>
                <ul>
                    <li><strong>Decentralization:</strong> It's maintained by a network of computers (nodes) rather than a single central authority.</li>
                    <li><strong>Immutability:</strong> Once a transaction is recorded, it cannot be altered or deleted.</li>
                    <li><strong>Transparency:</strong> All participants on the network can see the recorded transactions.</li>
                </ul>
            `
        },
        {
            title: "What is the difference between a centralized and a decentralized network?",
            tags: ["fundamentals", "difficulty-basic"],
            answer: `
                <p>A <strong>centralized network</strong> relies on a single, central server or authority to manage data, traffic, and rules. If the central server fails, the entire network goes down. Examples include traditional banking systems and social media platforms.</p>
                <p>A <strong>decentralized network</strong> distributes data and workload across multiple computers (nodes). There is no single point of failure, making the network more resilient and censorship-resistant. Blockchains like Bitcoin and Ethereum are examples of decentralized networks.</p>
            `
        }
    ],
    intermediate: [
        {
            title: "What is an ERC-20 token?",
            tags: ["tokens", "solidity", "difficulty-intermediate"],
            answer: `
                <p>ERC-20 is a standard for fungible tokens on the Ethereum blockchain. Fungible means that each token is identical and interchangeable, like currency. The standard defines a common set of functions that a token contract must implement, such as:</p>
                <ul>
                    <li><code>totalSupply()</code>: Returns the total token supply.</li>
                    <li><code>balanceOf(address _owner)</code>: Returns the account balance of another account with address <code>_owner</code>.</li>
                    <li><code>transfer(address _to, uint256 _value)</code>: Transfers <code>_value</code> amount of tokens to address <code>_to</code>.</li>
                    <li><code>approve(address _spender, uint256 _value)</code>: Allows <code>_spender</code> to withdraw from your account, multiple times, up to the <code>_value</code> amount.</li>
                    <li><code>allowance(address _owner, address _spender)</code>: Returns the amount which <code>_spender</code> is still allowed to withdraw from <code>_owner</code>.</li>
                </ul>
                <p>This standardization allows wallets, exchanges, and other dApps to easily interact with any ERC-20 token.</p>
            `
        }
    ],
    advanced: [
        {
            title: "Explain Maximal Extractable Value (MEV).",
            tags: ["MEV", "security", "difficulty-advanced"],
            answer: `
                <p>Maximal Extractable Value (MEV) refers to the maximum value that can be extracted from block production in excess of the standard block reward and gas fees by including, excluding, and changing the order of transactions in a block.</p>
                <p>Miners or validators are in a privileged position to reorder, insert, or censor transactions within the blocks they produce. They can use this power to capitalize on profitable opportunities such as arbitrage, front-running, and liquidations.</p>
                <strong>Example (Arbitrage):</strong>
                <p>If a token is priced differently on two different decentralized exchanges (DEXs), a searcher can submit a transaction to buy on the cheaper DEX and sell on the more expensive one. A validator can see this transaction in the mempool, copy it, and execute it themselves to capture the profit, effectively front-running the original searcher.</p>
            `
        }
    ],
    projects: [
        {
            id: "proj-1",
            title: "Build a Decentralized Exchange (DEX)",
            icon: "🔄",
            description: "Create a simple automated market maker (AMM) style DEX like Uniswap V1.",
            difficulty: "Intermediate",
            tech: ["Solidity", "Ethers.js", "React"],
            features: [
                "Swap ERC-20 tokens",
                "Provide liquidity to earn fees",
                "Implement a pricing formula (x*y=k)",
                "Frontend to interact with the smart contracts"
            ]
        }
    ],
    rust: [
        {
            title: "Module 1: Rust Fundamentals",
            icon: "📚",
            subtitle: "Variables, Data Types, and Functions",
            lessons: [
                { id: "rust-1-1", title: "Variables and Mutability", description: "Learn about `let` and `mut`." },
                { id: "rust-1-2", title: "Scalar and Compound Data Types", description: "Integers, floats, booleans, chars, tuples, and arrays." },
                { id: "rust-1-3", title: "Functions and Control Flow", description: "Defining functions, `if/else`, and loops." }
            ]
        }
    ]
};
