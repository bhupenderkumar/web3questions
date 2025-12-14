// Basic Web3 Questions - Blockchain Fundamentals - Part 1
const basicFundamentals = [
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
            <table>
                <tr><th>Aspect</th><th>Centralized</th><th>Decentralized</th></tr>
                <tr><td>Control</td><td>Single entity</td><td>Distributed among participants</td></tr>
                <tr><td>Single point of failure</td><td>Yes</td><td>No</td></tr>
                <tr><td>Censorship resistance</td><td>Low</td><td>High</td></tr>
                <tr><td>Transparency</td><td>Limited</td><td>Full</td></tr>
            </table>
        `
    },
    {
        title: "What is a distributed ledger?",
        tags: ["fundamentals", "difficulty-basic"],
        answer: `
            <p>A <strong>distributed ledger</strong> is a database that is consensually shared, replicated, and synchronized across multiple sites, institutions, or geographies. Unlike a traditional centralized database, there is no central administrator.</p>
            <p>Each participant (node) in the network maintains an identical copy of the ledger. Changes to the ledger are reflected across all copies almost simultaneously, and the security and accuracy of the ledger is maintained through cryptographic keys and signatures.</p>
            <strong>Benefits:</strong>
            <ul>
                <li>No single point of failure</li>
                <li>Increased transparency and trust</li>
                <li>Reduced reconciliation costs</li>
                <li>Improved security through cryptography</li>
            </ul>
        `
    },
    {
        title: "What is a block in blockchain?",
        tags: ["fundamentals", "difficulty-basic"],
        answer: `
            <p>A <strong>block</strong> is the fundamental unit of a blockchain. It's a data structure that contains a collection of transactions bundled together.</p>
            <strong>Each block typically contains:</strong>
            <ul>
                <li><strong>Block Header:</strong> Contains metadata including previous block hash, timestamp, Merkle root, and nonce</li>
                <li><strong>Block Body:</strong> Contains the list of transactions</li>
                <li><strong>Block Hash:</strong> A unique identifier for the block</li>
            </ul>
            <p>Blocks are linked together through cryptographic hashes, forming a chain. Each block references the hash of the previous block, creating an immutable sequence.</p>
        `
    },
    {
        title: "What is a hash and how is it used in blockchain?",
        tags: ["fundamentals", "cryptography", "difficulty-basic"],
        answer: `
            <p>A <strong>hash</strong> is a fixed-size output produced by a cryptographic hash function from an input of any size. It's like a digital fingerprint of data.</p>
            <strong>Properties of cryptographic hashes:</strong>
            <ul>
                <li><strong>Deterministic:</strong> Same input always produces same output</li>
                <li><strong>One-way:</strong> Cannot reverse-engineer the input from the output</li>
                <li><strong>Collision-resistant:</strong> Extremely difficult to find two inputs that produce the same hash</li>
                <li><strong>Avalanche effect:</strong> Small change in input produces drastically different output</li>
            </ul>
            <strong>Uses in blockchain:</strong>
            <ul>
                <li>Linking blocks together</li>
                <li>Creating transaction IDs</li>
                <li>Verifying data integrity</li>
                <li>Mining (Proof of Work)</li>
            </ul>
            <p>Common hash algorithms: SHA-256 (Bitcoin), Keccak-256 (Ethereum)</p>
        `
    },
    {
        title: "What is the genesis block?",
        tags: ["fundamentals", "difficulty-basic"],
        answer: `
            <p>The <strong>genesis block</strong> is the first block in a blockchain, also known as Block 0. It's the foundation upon which all subsequent blocks are built.</p>
            <strong>Key characteristics:</strong>
            <ul>
                <li>It's hardcoded into the blockchain software</li>
                <li>Has no reference to a previous block (previous hash is typically all zeros)</li>
                <li>Often contains a special message or timestamp</li>
                <li>Cannot be altered</li>
            </ul>
            <p><strong>Famous example:</strong> Bitcoin's genesis block was mined by Satoshi Nakamoto on January 3, 2009, and contains the text: "The Times 03/Jan/2009 Chancellor on brink of second bailout for banks"</p>
        `
    },
    {
        title: "What is block height?",
        tags: ["fundamentals", "difficulty-basic"],
        answer: `
            <p><strong>Block height</strong> refers to the number of blocks in the chain between the genesis block and the current block. It's essentially a sequential number assigned to each block.</p>
            <ul>
                <li>Genesis block has height 0 (or 1 in some blockchains)</li>
                <li>Each new block increments the height by 1</li>
                <li>Block height can be used to identify specific blocks</li>
                <li>It indicates how many blocks have been confirmed on the network</li>
            </ul>
            <p>Block height is also used to schedule network upgrades (hard forks) that activate at a specific block height.</p>
        `
    },
    {
        title: "What is block time?",
        tags: ["fundamentals", "difficulty-basic"],
        answer: `
            <p><strong>Block time</strong> is the average time it takes to add a new block to the blockchain. Different blockchains have different target block times.</p>
            <strong>Examples of block times:</strong>
            <ul>
                <li><strong>Bitcoin:</strong> ~10 minutes</li>
                <li><strong>Ethereum:</strong> ~12 seconds (post-merge)</li>
                <li><strong>Solana:</strong> ~400 milliseconds</li>
                <li><strong>Polygon:</strong> ~2 seconds</li>
            </ul>
            <p>Shorter block times mean faster transaction confirmations but may lead to more orphaned blocks. Longer block times provide more security but slower transactions.</p>
        `
    },
    {
        title: "What is a blockchain node?",
        tags: ["fundamentals", "difficulty-basic"],
        answer: `
            <p>A <strong>node</strong> is any computer that connects to the blockchain network and helps maintain it. Nodes are essential for the decentralized nature of blockchain.</p>
            <strong>Types of nodes:</strong>
            <ul>
                <li><strong>Full Node:</strong> Stores complete blockchain, validates all transactions</li>
                <li><strong>Light Node (SPV):</strong> Stores only block headers, relies on full nodes</li>
                <li><strong>Archive Node:</strong> Stores full history plus all historical states</li>
                <li><strong>Mining/Validator Node:</strong> Participates in creating new blocks</li>
            </ul>
            <strong>Node responsibilities:</strong>
            <ul>
                <li>Validate transactions and blocks</li>
                <li>Store blockchain data</li>
                <li>Relay transactions to other nodes</li>
                <li>Enforce network consensus rules</li>
            </ul>
        `
    },
    {
        title: "What is the difference between a full node and a light node?",
        tags: ["fundamentals", "difficulty-basic"],
        answer: `
            <p>Both full nodes and light nodes participate in the blockchain network, but they differ in capabilities and resource requirements.</p>
            <strong>Full Node:</strong>
            <ul>
                <li>Downloads and stores the entire blockchain</li>
                <li>Independently validates all transactions and blocks</li>
                <li>Enforces all consensus rules</li>
                <li>Provides maximum security and trustlessness</li>
                <li>Requires significant storage (Bitcoin: ~500GB+, Ethereum: ~1TB+)</li>
            </ul>
            <strong>Light Node (SPV):</strong>
            <ul>
                <li>Only downloads block headers</li>
                <li>Relies on full nodes for transaction data</li>
                <li>Cannot fully validate transactions independently</li>
                <li>Suitable for mobile wallets</li>
                <li>Requires minimal storage (few MBs)</li>
            </ul>
        `
    },
    {
        title: "What is blockchain immutability?",
        tags: ["fundamentals", "difficulty-basic"],
        answer: `
            <p><strong>Immutability</strong> means that once data is recorded on the blockchain, it cannot be altered, deleted, or tampered with. This is one of the core properties that makes blockchain trustworthy.</p>
            <strong>How immutability is achieved:</strong>
            <ul>
                <li><strong>Cryptographic hashing:</strong> Each block contains the hash of the previous block</li>
                <li><strong>Distributed storage:</strong> The blockchain is stored across thousands of nodes</li>
                <li><strong>Consensus mechanisms:</strong> Any changes must be agreed upon by the network majority</li>
            </ul>
            <strong>Benefits:</strong>
            <ul>
                <li>Creates a permanent, auditable record</li>
                <li>Prevents fraud and tampering</li>
                <li>Builds trust without intermediaries</li>
            </ul>
        `
    },
    {
        title: "What is blockchain transparency?",
        tags: ["fundamentals", "difficulty-basic"],
        answer: `
            <p><strong>Transparency</strong> in blockchain refers to the ability for anyone to view and verify all transactions and data stored on the blockchain.</p>
            <strong>Types of transparency:</strong>
            <ul>
                <li><strong>Public blockchains:</strong> Anyone can view all transactions (Bitcoin, Ethereum)</li>
                <li><strong>Private blockchains:</strong> Only authorized participants can view transactions</li>
                <li><strong>Consortium blockchains:</strong> Limited transparency among consortium members</li>
            </ul>
            <p><strong>Note:</strong> While transactions are transparent, user identities are typically pseudonymous (represented by addresses rather than real names).</p>
            <p>Blockchain explorers like Etherscan allow anyone to browse and analyze blockchain data.</p>
        `
    },
    {
        title: "What is a Merkle tree?",
        tags: ["fundamentals", "cryptography", "difficulty-basic"],
        answer: `
            <p>A <strong>Merkle tree</strong> (or hash tree) is a data structure used to efficiently verify the integrity of data in a blockchain.</p>
            <strong>How it works:</strong>
            <ul>
                <li>Transaction data is hashed individually</li>
                <li>Pairs of hashes are combined and hashed again</li>
                <li>Process repeats until a single "Merkle root" is produced</li>
                <li>The Merkle root is stored in the block header</li>
            </ul>
            <strong>Benefits:</strong>
            <ul>
                <li>Efficient verification of transaction inclusion</li>
                <li>Light clients can verify without full blockchain</li>
                <li>Quick detection of any data tampering</li>
                <li>Space-efficient proofs</li>
            </ul>
        `
    },
    {
        title: "What is a blockchain fork?",
        tags: ["fundamentals", "difficulty-basic"],
        answer: `
            <p>A <strong>fork</strong> occurs when a blockchain diverges into two potential paths. This can happen naturally or be intentionally created.</p>
            <strong>Types of forks:</strong>
            <ul>
                <li><strong>Temporary fork:</strong> Natural occurrence when two miners find blocks simultaneously; resolves itself</li>
                <li><strong>Soft fork:</strong> Backward-compatible upgrade; old nodes still recognize new blocks</li>
                <li><strong>Hard fork:</strong> Non-backward-compatible change; creates a permanent split</li>
            </ul>
            <strong>Famous hard forks:</strong>
            <ul>
                <li>Ethereum → Ethereum Classic (2016, after DAO hack)</li>
                <li>Bitcoin → Bitcoin Cash (2017, block size debate)</li>
            </ul>
        `
    },
    {
        title: "What is the difference between hard fork and soft fork?",
        tags: ["fundamentals", "difficulty-basic"],
        answer: `
            <p><strong>Hard forks</strong> and <strong>soft forks</strong> are two types of protocol upgrades with different compatibility implications.</p>
            <table>
                <tr><th>Aspect</th><th>Hard Fork</th><th>Soft Fork</th></tr>
                <tr><td>Compatibility</td><td>Not backward-compatible</td><td>Backward-compatible</td></tr>
                <tr><td>Old nodes</td><td>Must upgrade or split off</td><td>Can still participate</td></tr>
                <tr><td>Chain split</td><td>Creates two chains if not unanimous</td><td>Single chain maintained</td></tr>
                <tr><td>Rule changes</td><td>Can add or remove rules</td><td>Can only tighten rules</td></tr>
            </table>
            <strong>Soft fork example:</strong> SegWit (Bitcoin) - tightened block structure rules
            <strong>Hard fork example:</strong> London upgrade (Ethereum) - added EIP-1559 fee mechanism
        `
    },
    {
        title: "What is a blockchain explorer?",
        tags: ["fundamentals", "tools", "difficulty-basic"],
        answer: `
            <p>A <strong>blockchain explorer</strong> is a web-based tool that allows users to search and browse blockchain data.</p>
            <strong>What you can find:</strong>
            <ul>
                <li>Transaction details (sender, receiver, amount, status)</li>
                <li>Block information (height, timestamp, transactions)</li>
                <li>Address balances and history</li>
                <li>Smart contract code and interactions</li>
                <li>Network statistics (gas prices, TPS)</li>
            </ul>
            <strong>Popular explorers:</strong>
            <ul>
                <li><strong>Etherscan:</strong> Ethereum and EVM chains</li>
                <li><strong>Blockchain.com:</strong> Bitcoin</li>
                <li><strong>Solscan:</strong> Solana</li>
                <li><strong>Polygonscan:</strong> Polygon</li>
            </ul>
        `
    },
    {
        title: "What is a blockchain network?",
        tags: ["fundamentals", "difficulty-basic"],
        answer: `
            <p>A <strong>blockchain network</strong> is the collection of nodes that maintain and operate a blockchain protocol together.</p>
            <strong>Network types:</strong>
            <ul>
                <li><strong>Mainnet:</strong> The primary, production network with real value</li>
                <li><strong>Testnet:</strong> Test networks with no real value (Sepolia, Goerli)</li>
                <li><strong>Devnet:</strong> Local development networks</li>
            </ul>
            <strong>Network components:</strong>
            <ul>
                <li>Nodes (full, light, validator)</li>
                <li>Consensus mechanism</li>
                <li>Network protocol (gossip, peer discovery)</li>
                <li>Native token for fees/staking</li>
            </ul>
        `
    },
    {
        title: "What is peer-to-peer (P2P) networking?",
        tags: ["fundamentals", "difficulty-basic"],
        answer: `
            <p><strong>Peer-to-peer (P2P)</strong> networking is a distributed architecture where participants (peers) share resources directly without a central server.</p>
            <strong>In blockchain context:</strong>
            <ul>
                <li>Nodes communicate directly with each other</li>
                <li>Transactions are broadcast to all peers</li>
                <li>No central authority controls communication</li>
                <li>Network remains functional if some nodes go offline</li>
            </ul>
            <strong>Key protocols:</strong>
            <ul>
                <li><strong>Gossip protocol:</strong> Nodes share information with random peers</li>
                <li><strong>DHT (Distributed Hash Table):</strong> Distributed data storage</li>
                <li><strong>libp2p:</strong> Modular P2P networking (used by Ethereum)</li>
            </ul>
        `
    }
];

// Export for use in main data file
if (typeof module !== 'undefined' && module.exports) {
    module.exports = basicFundamentals;
}