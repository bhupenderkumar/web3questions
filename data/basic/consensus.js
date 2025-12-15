// Basic Web3 Questions - Consensus Mechanisms
const basicConsensus = [
    {
        title: "What is a consensus mechanism?",
        tags: ["consensus", "difficulty-basic"],
        answer: `
            <p>A <strong>consensus mechanism</strong> is a method used by blockchain networks to achieve agreement among nodes on the current state of the blockchain.</p>
            <strong>Why needed:</strong>
            <ul>
                <li>No central authority to validate</li>
                <li>Nodes must agree on transaction order</li>
                <li>Prevents double-spending</li>
                <li>Ensures network security</li>
            </ul>
            <strong>Popular mechanisms:</strong>
            <ul>
                <li><strong>Proof of Work:</strong> Bitcoin, Litecoin</li>
                <li><strong>Proof of Stake:</strong> Ethereum, Cardano</li>
                <li><strong>Delegated PoS:</strong> EOS, TRON</li>
                <li><strong>Proof of Authority:</strong> Private blockchains</li>
            </ul>
        `
    },
    {
        title: "What is Proof of Work (PoW)?",
        tags: ["consensus", "mining", "difficulty-basic"],
        answer: `
            <p><strong>Proof of Work</strong> is a consensus mechanism where miners compete to solve complex mathematical puzzles.</p>
            <strong>How it works:</strong>
            <ol>
                <li>Miners collect pending transactions</li>
                <li>Repeatedly hash block data with different nonces</li>
                <li>Find hash below target difficulty</li>
                <li>First to succeed broadcasts the block</li>
                <li>Receives block reward and fees</li>
            </ol>
            <strong>Advantages:</strong> Battle-tested security, highly decentralized
            <strong>Disadvantages:</strong> High energy consumption, specialized hardware needed
        `
    },
    {
        title: "What is Proof of Stake (PoS)?",
        tags: ["consensus", "staking", "difficulty-basic"],
        answer: `
            <p><strong>Proof of Stake</strong> is a consensus mechanism where validators are chosen based on staked cryptocurrency.</p>
            <strong>How it works:</strong>
            <ol>
                <li>Validators stake their coins</li>
                <li>Algorithm selects validators based on stake</li>
                <li>Selected validator proposes new block</li>
                <li>Other validators attest to validity</li>
                <li>Validators earn rewards</li>
            </ol>
            <strong>Advantages:</strong> Energy efficient (99.9% less than PoW), no specialized hardware
            <strong>Disadvantages:</strong> Rich get richer concerns, less battle-tested
        `
    },
    {
        title: "What is mining in blockchain?",
        tags: ["consensus", "mining", "difficulty-basic"],
        answer: `
            <p><strong>Mining</strong> is the process of using computational power to validate transactions and add new blocks in PoW blockchains.</p>
            <strong>Mining process:</strong>
            <ol>
                <li>Collect transactions from mempool</li>
                <li>Create candidate block</li>
                <li>Compute hashes with different nonces</li>
                <li>Find valid hash meeting difficulty</li>
                <li>Broadcast block, receive rewards</li>
            </ol>
            <strong>Requirements:</strong> Specialized hardware (ASICs/GPUs), electricity, mining software
        `
    },
    {
        title: "What is staking?",
        tags: ["consensus", "staking", "difficulty-basic"],
        answer: `
            <p><strong>Staking</strong> is locking up cryptocurrency to participate in network validation and earn rewards in PoS blockchains.</p>
            <strong>How to stake:</strong>
            <ul>
                <li><strong>Solo staking:</strong> Run your own validator (requires 32 ETH for Ethereum)</li>
                <li><strong>Pooled staking:</strong> Join a staking pool</li>
                <li><strong>Liquid staking:</strong> Stake via protocols like Lido (receive stETH)</li>
                <li><strong>Exchange staking:</strong> Stake on centralized exchanges</li>
            </ul>
            <strong>Rewards:</strong> Typically 4-15% APY depending on network
        `
    },
    {
        title: "What is a validator?",
        tags: ["consensus", "staking", "difficulty-basic"],
        answer: `
            <p>A <strong>validator</strong> is a node in a PoS network that validates transactions and proposes new blocks.</p>
            <strong>Responsibilities:</strong>
            <ul>
                <li>Validate transactions</li>
                <li>Propose new blocks (when selected)</li>
                <li>Attest to other validators' blocks</li>
                <li>Maintain network security</li>
            </ul>
            <strong>Requirements (Ethereum):</strong>
            <ul>
                <li>32 ETH stake</li>
                <li>Validator software running 24/7</li>
                <li>Reliable internet connection</li>
            </ul>
            <strong>Slashing:</strong> Validators can lose stake for malicious or negligent behavior
        `
    },
    {
        title: "What is the 51% attack?",
        tags: ["consensus", "security", "difficulty-basic"],
        answer: `
            <p>A <strong>51% attack</strong> occurs when an entity controls more than half of the network's mining/validation power.</p>
            <strong>Potential attacks:</strong>
            <ul>
                <li>Double-spending</li>
                <li>Blocking transactions</li>
                <li>Reversing recent transactions</li>
                <li>Preventing other miners from finding blocks</li>
            </ul>
            <strong>What they CANNOT do:</strong>
            <ul>
                <li>Steal coins from wallets</li>
                <li>Create new coins (beyond block rewards)</li>
                <li>Change protocol rules</li>
            </ul>
            <strong>Protection:</strong> Higher network hashrate/stake makes attacks more expensive
        `
    },
    {
        title: "What is finality in blockchain?",
        tags: ["consensus", "difficulty-basic"],
        answer: `
            <p><strong>Finality</strong> is the point at which a transaction becomes irreversible and cannot be undone.</p>
            <strong>Types of finality:</strong>
            <ul>
                <li><strong>Probabilistic:</strong> Certainty increases with confirmations (Bitcoin, PoW)</li>
                <li><strong>Absolute:</strong> Transaction final once confirmed (BFT-based systems)</li>
                <li><strong>Economic:</strong> Reversal would cost more than it's worth (Ethereum PoS)</li>
            </ul>
            <strong>Examples:</strong>
            <ul>
                <li>Bitcoin: ~6 confirmations (~1 hour)</li>
                <li>Ethereum PoS: ~15 minutes for finality</li>
            </ul>
        `
    },
    {
        title: "What is slashing in Proof of Stake?",
        tags: ["consensus", "staking", "difficulty-basic"],
        answer: `
            <p><strong>Slashing</strong> is a penalty mechanism where validators lose a portion of their stake for malicious or negligent behavior.</p>
            <strong>Slashable offenses:</strong>
            <ul>
                <li><strong>Double signing:</strong> Signing two different blocks at the same height</li>
                <li><strong>Surround voting:</strong> Creating conflicting attestations</li>
                <li><strong>Downtime:</strong> Being offline for too long (in some networks)</li>
            </ul>
            <strong>Purpose:</strong>
            <ul>
                <li>Discourages malicious behavior</li>
                <li>Ensures validators stay online</li>
                <li>Provides economic security</li>
            </ul>
        `
    },
    {
        title: "What is Delegated Proof of Stake (DPoS)?",
        tags: ["consensus", "difficulty-basic"],
        answer: `
            <p><strong>Delegated Proof of Stake</strong> is a variant where token holders vote to elect a small number of delegates who validate blocks.</p>
            <strong>How it works:</strong>
            <ul>
                <li>Token holders vote for delegates</li>
                <li>Top N delegates become validators</li>
                <li>Delegates take turns producing blocks</li>
                <li>Delegates share rewards with voters</li>
            </ul>
            <strong>Examples:</strong> EOS, TRON, Lisk
            <strong>Pros:</strong> Fast, scalable, energy efficient
            <strong>Cons:</strong> More centralized, potential for cartels
        `
    },
    {
        title: "What is Proof of Authority (PoA)?",
        tags: ["consensus", "difficulty-basic"],
        answer: `
            <p><strong>Proof of Authority</strong> is a consensus mechanism where approved accounts (authorities) validate transactions.</p>
            <strong>Characteristics:</strong>
            <ul>
                <li>Validators are known, pre-approved entities</li>
                <li>Reputation at stake instead of money</li>
                <li>Very fast and efficient</li>
                <li>Used mainly for private/consortium chains</li>
            </ul>
            <strong>Use cases:</strong>
            <ul>
                <li>Enterprise blockchains</li>
                <li>Testnets (Sepolia, Goerli)</li>
                <li>Supply chain networks</li>
            </ul>
        `
    },
    {
        title: "What is difficulty adjustment?",
        tags: ["consensus", "mining", "difficulty-basic"],
        answer: `
            <p><strong>Difficulty adjustment</strong> is a mechanism that adjusts mining difficulty to maintain consistent block times.</p>
            <strong>Bitcoin's approach:</strong>
            <ul>
                <li>Adjusts every 2,016 blocks (~2 weeks)</li>
                <li>Target: 10 minutes per block</li>
                <li>Increases if blocks are too fast</li>
                <li>Decreases if blocks are too slow</li>
            </ul>
            <strong>Purpose:</strong>
            <ul>
                <li>Consistent block production</li>
                <li>Adapts to changing hash power</li>
                <li>Maintains predictable issuance</li>
            </ul>
        `
    },
    {
        title: "What is a mining pool?",
        tags: ["consensus", "mining", "difficulty-basic"],
        answer: `
            <p>A <strong>mining pool</strong> is a group of miners who combine their computational power to increase chances of finding blocks.</p>
            <strong>How it works:</strong>
            <ul>
                <li>Miners contribute hash power to pool</li>
                <li>Pool finds blocks more frequently</li>
                <li>Rewards distributed based on contribution</li>
                <li>More stable income for individual miners</li>
            </ul>
            <strong>Popular pools:</strong> Foundry, AntPool, F2Pool, Poolin
            <strong>Concerns:</strong> Pool concentration can threaten decentralization
        `
    },
    {
        title: "What is block reward?",
        tags: ["consensus", "mining", "difficulty-basic"],
        answer: `
            <p><strong>Block reward</strong> is the cryptocurrency given to miners/validators for creating new blocks.</p>
            <strong>Bitcoin block rewards:</strong>
            <ul>
                <li>Started at 50 BTC (2009)</li>
                <li>Halves every 210,000 blocks (~4 years)</li>
                <li>Currently 6.25 BTC (2020-2024)</li>
                <li>Next halving: 3.125 BTC</li>
            </ul>
            <strong>Ethereum (PoS):</strong>
            <ul>
                <li>No fixed block reward</li>
                <li>Rewards based on stake and attestations</li>
                <li>Issuance reduced ~90% post-merge</li>
            </ul>
        `
    },
    {
        title: "What is the Bitcoin halving?",
        tags: ["consensus", "bitcoin", "difficulty-basic"],
        answer: `
            <p>The <strong>Bitcoin halving</strong> is an event that cuts block rewards in half, occurring every 210,000 blocks (~4 years).</p>
            <strong>Halving history:</strong>
            <ul>
                <li>2009: 50 BTC</li>
                <li>2012: 25 BTC</li>
                <li>2016: 12.5 BTC</li>
                <li>2020: 6.25 BTC</li>
                <li>2024: 3.125 BTC</li>
            </ul>
            <strong>Significance:</strong>
            <ul>
                <li>Controls inflation/supply</li>
                <li>Ensures 21 million max supply</li>
                <li>Historically preceded price increases</li>
            </ul>
        `
    }
];

// Export for use in main data file
if (typeof module !== 'undefined' && module.exports) {
    module.exports = basicConsensus;
}