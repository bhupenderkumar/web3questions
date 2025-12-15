// Basic Web3 Questions - Blockchain Fundamentals, Cryptocurrency, Wallets - 55 questions total
const basicQuestions = [
    // ==================== BLOCKCHAIN FUNDAMENTALS (12 questions) ====================
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

    // ==================== CRYPTOCURRENCY BASICS (10 questions) ====================
    {
        title: "What is cryptocurrency?",
        tags: ["cryptocurrency", "difficulty-basic"],
        answer: `
            <p>A <strong>cryptocurrency</strong> is a digital or virtual currency that uses cryptography for security and operates on a decentralized network, typically a blockchain.</p>
            <strong>Key characteristics:</strong>
            <ul>
                <li><strong>Digital:</strong> Exists only in electronic form</li>
                <li><strong>Decentralized:</strong> Not controlled by any government or central bank</li>
                <li><strong>Cryptographically secured:</strong> Uses encryption to secure transactions</li>
                <li><strong>Peer-to-peer:</strong> Transactions occur directly between users</li>
                <li><strong>Limited supply:</strong> Many cryptocurrencies have a capped supply</li>
            </ul>
            <strong>Common use cases:</strong>
            <ul>
                <li>Digital payments and store of value</li>
                <li>Powering decentralized applications</li>
                <li>Cross-border transactions</li>
                <li>DeFi (Decentralized Finance)</li>
            </ul>
        `
    },
    {
        title: "What is Bitcoin?",
        tags: ["cryptocurrency", "bitcoin", "difficulty-basic"],
        answer: `
            <p><strong>Bitcoin (BTC)</strong> is the first and most well-known cryptocurrency, created in 2009 by an anonymous person or group using the pseudonym Satoshi Nakamoto.</p>
            <strong>Key features:</strong>
            <ul>
                <li><strong>Limited supply:</strong> Maximum of 21 million BTC will ever exist</li>
                <li><strong>Proof of Work:</strong> Uses mining to secure the network</li>
                <li><strong>Halving:</strong> Block rewards are cut in half every ~4 years</li>
                <li><strong>Decentralized:</strong> No central authority controls it</li>
                <li><strong>Block time:</strong> ~10 minutes per block</li>
            </ul>
            <p>Bitcoin is often called "digital gold" due to its scarcity and store of value properties.</p>
        `
    },
    {
        title: "What is Ethereum?",
        tags: ["cryptocurrency", "ethereum", "difficulty-basic"],
        answer: `
            <p><strong>Ethereum</strong> is a decentralized, open-source blockchain platform that enables the creation of smart contracts and decentralized applications (dApps). Its native cryptocurrency is Ether (ETH).</p>
            <strong>Key features:</strong>
            <ul>
                <li><strong>Smart Contracts:</strong> Self-executing contracts with code that runs on the blockchain</li>
                <li><strong>Ethereum Virtual Machine (EVM):</strong> Runtime environment for smart contracts</li>
                <li><strong>Proof of Stake:</strong> Transitioned from PoW in "The Merge" (September 2022)</li>
                <li><strong>Programmable blockchain:</strong> Developers can build applications on it</li>
            </ul>
            <strong>Ethereum enables:</strong>
            <ul>
                <li>DeFi, NFTs, DAOs, and token creation (ERC-20, ERC-721)</li>
            </ul>
        `
    },
    {
        title: "What is the difference between Bitcoin and Ethereum?",
        tags: ["cryptocurrency", "bitcoin", "ethereum", "difficulty-basic"],
        answer: `
            <p>While both are popular cryptocurrencies, Bitcoin and Ethereum serve different purposes.</p>
            <table>
                <tr><th>Aspect</th><th>Bitcoin</th><th>Ethereum</th></tr>
                <tr><td>Purpose</td><td>Digital currency / Store of value</td><td>Platform for dApps and smart contracts</td></tr>
                <tr><td>Launched</td><td>2009</td><td>2015</td></tr>
                <tr><td>Creator</td><td>Satoshi Nakamoto</td><td>Vitalik Buterin</td></tr>
                <tr><td>Consensus</td><td>Proof of Work</td><td>Proof of Stake</td></tr>
                <tr><td>Supply</td><td>21 million (capped)</td><td>No hard cap</td></tr>
                <tr><td>Block time</td><td>~10 minutes</td><td>~12 seconds</td></tr>
                <tr><td>Smart contracts</td><td>Limited</td><td>Fully programmable</td></tr>
            </table>
        `
    },
    {
        title: "What is a satoshi?",
        tags: ["cryptocurrency", "bitcoin", "difficulty-basic"],
        answer: `
            <p>A <strong>satoshi</strong> (sat) is the smallest unit of Bitcoin, named after Bitcoin's creator Satoshi Nakamoto.</p>
            <strong>Denomination:</strong>
            <ul>
                <li>1 Bitcoin (BTC) = 100,000,000 satoshis</li>
                <li>1 satoshi = 0.00000001 BTC</li>
            </ul>
            <p>Satoshis are useful for expressing small amounts of Bitcoin, especially as Bitcoin's price increases. Many prefer to price things in sats rather than fractions of BTC.</p>
        `
    },
    {
        title: "What are wei and gwei in Ethereum?",
        tags: ["cryptocurrency", "ethereum", "gas", "difficulty-basic"],
        answer: `
            <p><strong>Wei</strong> and <strong>Gwei</strong> are denominations of Ether (ETH).</p>
            <strong>Ethereum denominations:</strong>
            <ul>
                <li><strong>Wei:</strong> The smallest unit (1 ETH = 10^18 wei)</li>
                <li><strong>Gwei:</strong> 1 billion wei (1 ETH = 10^9 gwei)</li>
            </ul>
            <pre><code>1 ETH = 1,000,000,000 Gwei = 1,000,000,000,000,000,000 Wei</code></pre>
            <strong>Common uses:</strong>
            <ul>
                <li><strong>Wei:</strong> Used in smart contract calculations for precision</li>
                <li><strong>Gwei:</strong> Used to express gas prices (e.g., "Gas price: 30 Gwei")</li>
            </ul>
        `
    },
    {
        title: "What is market capitalization in crypto?",
        tags: ["cryptocurrency", "trading", "difficulty-basic"],
        answer: `
            <p><strong>Market capitalization</strong> (market cap) is the total value of a cryptocurrency.</p>
            <strong>Formula:</strong>
            <pre><code>Market Cap = Current Price × Circulating Supply</code></pre>
            <strong>Types:</strong>
            <ul>
                <li><strong>Circulating Market Cap:</strong> Price × coins currently in circulation</li>
                <li><strong>Fully Diluted Market Cap:</strong> Price × maximum supply</li>
            </ul>
            <strong>Categories:</strong>
            <ul>
                <li><strong>Large cap:</strong> > $10 billion</li>
                <li><strong>Mid cap:</strong> $1-10 billion</li>
                <li><strong>Small cap:</strong> $100 million - $1 billion</li>
                <li><strong>Micro cap:</strong> < $100 million</li>
            </ul>
        `
    },
    {
        title: "What is a stablecoin?",
        tags: ["cryptocurrency", "stablecoin", "defi", "difficulty-basic"],
        answer: `
            <p>A <strong>stablecoin</strong> is a cryptocurrency designed to maintain a stable value, typically pegged to a fiat currency like USD (1:1).</p>
            <strong>Types of stablecoins:</strong>
            <ul>
                <li><strong>Fiat-backed:</strong> Backed by reserves (USDC, USDT)</li>
                <li><strong>Crypto-backed:</strong> Over-collateralized by crypto (DAI)</li>
                <li><strong>Algorithmic:</strong> Uses algorithms to maintain peg (FRAX)</li>
                <li><strong>Commodity-backed:</strong> Backed by gold, etc. (PAXG)</li>
            </ul>
            <strong>Use cases:</strong> Trading pairs, safe haven, cross-border payments, DeFi
        `
    },
    {
        title: "What are altcoins?",
        tags: ["cryptocurrency", "difficulty-basic"],
        answer: `
            <p><strong>Altcoins</strong> (alternative coins) refer to all cryptocurrencies other than Bitcoin.</p>
            <strong>Categories:</strong>
            <ul>
                <li><strong>Platform coins:</strong> ETH, SOL, ADA, AVAX</li>
                <li><strong>Utility tokens:</strong> LINK, GRT</li>
                <li><strong>Meme coins:</strong> DOGE, SHIB</li>
                <li><strong>Privacy coins:</strong> XMR, ZEC</li>
                <li><strong>Stablecoins:</strong> USDC, DAI</li>
                <li><strong>Governance tokens:</strong> UNI, AAVE</li>
            </ul>
        `
    },
    {
        title: "What is the difference between a token and a coin?",
        tags: ["cryptocurrency", "tokens", "difficulty-basic"],
        answer: `
            <p><strong>Coins</strong> and <strong>tokens</strong> have distinct technical meanings.</p>
            <strong>Coins:</strong>
            <ul>
                <li>Native to their own blockchain</li>
                <li>Used to pay transaction fees</li>
                <li>Examples: BTC, ETH, SOL</li>
            </ul>
            <strong>Tokens:</strong>
            <ul>
                <li>Built on existing blockchains using smart contracts</li>
                <li>Require native coin for gas fees</li>
                <li>Examples: USDC, UNI, LINK (on Ethereum)</li>
            </ul>
            <table>
                <tr><th>Aspect</th><th>Coin</th><th>Token</th></tr>
                <tr><td>Blockchain</td><td>Has its own</td><td>Uses existing blockchain</td></tr>
                <tr><td>Creation</td><td>From scratch</td><td>Smart contract deployment</td></tr>
            </table>
        `
    },

    // ==================== WALLET CONCEPTS (10 questions) ====================
    {
        title: "What is a crypto wallet?",
        tags: ["wallets", "difficulty-basic"],
        answer: `
            <p>A <strong>crypto wallet</strong> is a tool that allows you to interact with blockchain networks. It stores your private keys which prove ownership of your funds.</p>
            <strong>Components:</strong>
            <ul>
                <li><strong>Private key:</strong> Secret key that proves ownership and signs transactions</li>
                <li><strong>Public key:</strong> Derived from private key, used to generate addresses</li>
                <li><strong>Address:</strong> Public identifier where you receive funds</li>
            </ul>
            <strong>Types:</strong> Hot wallets, cold wallets, paper wallets, multi-sig wallets
            <p><strong>Key principle:</strong> "Not your keys, not your crypto"</p>
        `
    },
    {
        title: "What is the difference between hot and cold wallets?",
        tags: ["wallets", "security", "difficulty-basic"],
        answer: `
            <p>Hot and cold wallets differ in internet connectivity and security.</p>
            <strong>Hot Wallets:</strong>
            <ul>
                <li>Connected to the internet</li>
                <li>Easy access, more vulnerable to hacks</li>
                <li>Best for small amounts, frequent transactions</li>
                <li>Examples: MetaMask, Trust Wallet</li>
            </ul>
            <strong>Cold Wallets:</strong>
            <ul>
                <li>Stored offline</li>
                <li>More secure, less convenient</li>
                <li>Best for long-term storage of large amounts</li>
                <li>Examples: Ledger, Trezor</li>
            </ul>
        `
    },
    {
        title: "What is a hardware wallet?",
        tags: ["wallets", "security", "difficulty-basic"],
        answer: `
            <p>A <strong>hardware wallet</strong> is a physical device that stores private keys offline, providing the highest level of security.</p>
            <strong>How it works:</strong>
            <ul>
                <li>Private keys never leave the device</li>
                <li>Transactions are signed on the device itself</li>
                <li>Protected by PIN and optional passphrase</li>
            </ul>
            <strong>Popular hardware wallets:</strong> Ledger Nano S/X, Trezor Model One/T, GridPlus Lattice1
            <strong>Best practices:</strong> Buy from manufacturer, store recovery phrase offline, keep firmware updated
        `
    },
    {
        title: "What is a software wallet?",
        tags: ["wallets", "difficulty-basic"],
        answer: `
            <p>A <strong>software wallet</strong> is an application (mobile, desktop, or browser extension) that stores your private keys.</p>
            <strong>Types:</strong>
            <ul>
                <li><strong>Browser extensions:</strong> MetaMask, Phantom, Rabby</li>
                <li><strong>Mobile apps:</strong> Trust Wallet, Rainbow, Coinbase Wallet</li>
                <li><strong>Desktop:</strong> Exodus, Electrum, Atomic Wallet</li>
            </ul>
            <strong>Advantages:</strong> Free, easy to set up, quick dApp access
            <strong>Risks:</strong> Vulnerable to malware, phishing, device loss
        `
    },
    {
        title: "What is a seed phrase (recovery phrase)?",
        tags: ["wallets", "security", "difficulty-basic"],
        answer: `
            <p>A <strong>seed phrase</strong> (recovery phrase, mnemonic) is a list of 12, 18, or 24 words that can recover your wallet and all its accounts.</p>
            <strong>How it works:</strong>
            <ul>
                <li>Generated when creating a new wallet</li>
                <li>Mathematically derives all your private keys</li>
                <li>Uses BIP-39 standard (2048 possible words)</li>
            </ul>
            <strong>Security rules:</strong>
            <ul>
                <li>NEVER share with anyone</li>
                <li>NEVER store digitally</li>
                <li>Write on paper or metal backup</li>
                <li>Store in multiple secure locations</li>
            </ul>
        `
    },
    {
        title: "What is a private key?",
        tags: ["wallets", "cryptography", "difficulty-basic"],
        answer: `
            <p>A <strong>private key</strong> is a secret, cryptographically-generated number that proves ownership of a blockchain address.</p>
            <strong>Characteristics:</strong>
            <ul>
                <li>256-bit number (extremely large)</li>
                <li>64 hexadecimal characters</li>
                <li>Must be kept absolutely secret</li>
                <li>Cannot be recovered if lost</li>
            </ul>
            <strong>What private keys do:</strong>
            <ul>
                <li>Sign transactions to prove authorization</li>
                <li>Derive public key and address</li>
                <li>Prove ownership of assets</li>
            </ul>
            <p><strong>Critical:</strong> Never share your private key. Anyone with it can steal all your funds.</p>
        `
    },
    {
        title: "What is a public key?",
        tags: ["wallets", "cryptography", "difficulty-basic"],
        answer: `
            <p>A <strong>public key</strong> is a cryptographic key derived from your private key that can be safely shared.</p>
            <strong>Relationship:</strong>
            <ul>
                <li>Derived from private key using elliptic curve cryptography</li>
                <li>One-way derivation (cannot get private key from public key)</li>
                <li>Used to generate wallet addresses</li>
            </ul>
            <pre><code>Private Key → (Elliptic Curve) → Public Key → (Hash) → Address</code></pre>
        `
    },
    {
        title: "What is a wallet address?",
        tags: ["wallets", "difficulty-basic"],
        answer: `
            <p>A <strong>wallet address</strong> is a unique identifier where you can receive cryptocurrency.</p>
            <strong>Address formats:</strong>
            <ul>
                <li><strong>Ethereum:</strong> 0x + 40 hex characters</li>
                <li><strong>Bitcoin:</strong> 1..., 3..., or bc1...</li>
                <li><strong>Solana:</strong> Base58, 32-44 characters</li>
            </ul>
            <strong>Best practices:</strong>
            <ul>
                <li>Double-check addresses before sending</li>
                <li>Use copy-paste, never type manually</li>
                <li>Send test transaction first for large amounts</li>
            </ul>
        `
    },
    {
        title: "What is the difference between custodial and non-custodial wallets?",
        tags: ["wallets", "security", "difficulty-basic"],
        answer: `
            <p>The key difference is who controls the private keys.</p>
            <strong>Custodial Wallets:</strong>
            <ul>
                <li>Third party holds your private keys</li>
                <li>Similar to a bank account</li>
                <li>Examples: Coinbase, Binance accounts</li>
            </ul>
            <strong>Non-Custodial Wallets:</strong>
            <ul>
                <li>You control your own private keys</li>
                <li>Full responsibility for security</li>
                <li>Examples: MetaMask, Ledger, Trezor</li>
            </ul>
            <table>
                <tr><th>Aspect</th><th>Custodial</th><th>Non-Custodial</th></tr>
                <tr><td>Key control</td><td>Third party</td><td>You</td></tr>
                <tr><td>Recovery</td><td>Customer support</td><td>Only with seed phrase</td></tr>
                <tr><td>True ownership</td><td>No</td><td>Yes</td></tr>
            </table>
        `
    },
    {
        title: "What is MetaMask?",
        tags: ["wallets", "ethereum", "difficulty-basic"],
        answer: `
            <p><strong>MetaMask</strong> is the most popular non-custodial cryptocurrency wallet for Ethereum and EVM-compatible blockchains.</p>
            <strong>Key features:</strong>
            <ul>
                <li>Browser extension and mobile app</li>
                <li>Supports multiple EVM networks (Ethereum, Polygon, Arbitrum)</li>
                <li>Built-in token swap functionality</li>
                <li>NFT display and dApp browser</li>
            </ul>
            <strong>Security tips:</strong>
            <ul>
                <li>Only download from official sources</li>
                <li>Never share your seed phrase</li>
                <li>Be cautious of phishing sites</li>
            </ul>
        `
    },

    // ==================== TRANSACTION MECHANICS (10 questions) ====================
    {
        title: "What is a blockchain transaction?",
        tags: ["transactions", "difficulty-basic"],
        answer: `
            <p>A <strong>blockchain transaction</strong> is a cryptographically signed instruction that transfers value or data on a blockchain network.</p>
            <strong>Components:</strong>
            <ul>
                <li><strong>Sender/Recipient:</strong> The addresses involved</li>
                <li><strong>Value:</strong> Amount being transferred</li>
                <li><strong>Data:</strong> Additional data for smart contract calls</li>
                <li><strong>Gas:</strong> Fee for network processing</li>
                <li><strong>Nonce:</strong> Transaction counter</li>
                <li><strong>Signature:</strong> Cryptographic proof of authorization</li>
            </ul>
            <strong>Lifecycle:</strong> Created → Broadcast → Mempool → Included in block → Confirmed
        `
    },
    {
        title: "What is a transaction hash (txHash)?",
        tags: ["transactions", "difficulty-basic"],
        answer: `
            <p>A <strong>transaction hash</strong> (txHash) is a unique identifier for a specific transaction on the blockchain.</p>
            <strong>Characteristics:</strong>
            <ul>
                <li>64 hexadecimal characters (256 bits)</li>
                <li>Generated by hashing the transaction data</li>
                <li>Unique for every transaction</li>
            </ul>
            <strong>Uses:</strong>
            <ul>
                <li>Look up transaction details on block explorers</li>
                <li>Verify transaction status</li>
                <li>Provide proof of payment</li>
            </ul>
        `
    },
    {
        title: "What is gas in Ethereum?",
        tags: ["transactions", "ethereum", "gas", "difficulty-basic"],
        answer: `
            <p><strong>Gas</strong> is the unit measuring computational effort required on Ethereum. It's like fuel for the EVM.</p>
            <strong>Why gas exists:</strong>
            <ul>
                <li>Prevents spam and infinite loops</li>
                <li>Compensates validators</li>
                <li>Allocates network resources fairly</li>
            </ul>
            <strong>Key concepts:</strong>
            <ul>
                <li><strong>Gas Units:</strong> Amount of computation</li>
                <li><strong>Gas Price:</strong> Cost per unit (Gwei)</li>
                <li><strong>Gas Limit:</strong> Maximum gas willing to use</li>
                <li><strong>Fee = Gas Used × Gas Price</strong></li>
            </ul>
        `
    },
    {
        title: "What is gas price?",
        tags: ["transactions", "ethereum", "gas", "difficulty-basic"],
        answer: `
            <p><strong>Gas price</strong> is the amount of ETH per unit of gas, measured in Gwei.</p>
            <strong>Post EIP-1559:</strong>
            <ul>
                <li><strong>Base Fee:</strong> Minimum price, burned</li>
                <li><strong>Priority Fee (Tip):</strong> Optional extra to validators</li>
                <li><strong>Max Fee:</strong> Maximum willing to pay</li>
            </ul>
            <strong>Typical prices:</strong>
            <ul>
                <li>Low: 10-20 Gwei</li>
                <li>Normal: 20-50 Gwei</li>
                <li>High demand: 50-200+ Gwei</li>
            </ul>
        `
    },
    {
        title: "What is gas limit?",
        tags: ["transactions", "ethereum", "gas", "difficulty-basic"],
        answer: `
            <p><strong>Gas limit</strong> is the maximum gas you're willing to spend on a transaction.</p>
            <strong>How it works:</strong>
            <ul>
                <li>Sets maximum gas units for transaction</li>
                <li>Unused gas is refunded</li>
                <li>If too low, transaction fails (gas still consumed)</li>
            </ul>
            <strong>Common gas limits:</strong>
            <ul>
                <li>ETH transfer: 21,000</li>
                <li>Token transfers: 65,000-100,000</li>
                <li>Smart contract interactions: 100,000-500,000+</li>
            </ul>
        `
    },
    {
        title: "What is a nonce in blockchain?",
        tags: ["transactions", "difficulty-basic"],
        answer: `
            <p>In Ethereum, a <strong>nonce</strong> is a counter tracking the number of transactions sent from an account.</p>
            <strong>Purposes:</strong>
            <ul>
                <li>Prevents replay attacks</li>
                <li>Ensures transactions are processed in order</li>
                <li>Allows replacing pending transactions</li>
            </ul>
            <strong>How it works:</strong>
            <ul>
                <li>First transaction has nonce 0</li>
                <li>Each transaction increments by 1</li>
                <li>Transactions must be mined in nonce order</li>
            </ul>
        `
    },
    {
        title: "What is transaction confirmation?",
        tags: ["transactions", "difficulty-basic"],
        answer: `
            <p><strong>Transaction confirmation</strong> occurs when a transaction is included in a block. More confirmations mean higher certainty.</p>
            <strong>Recommended confirmations:</strong>
            <ul>
                <li><strong>Bitcoin:</strong> 6 confirmations (~1 hour)</li>
                <li><strong>Ethereum:</strong> 12-20 confirmations (~3-5 minutes)</li>
            </ul>
            <strong>Why multiple confirmations matter:</strong>
            <ul>
                <li>Protects against chain reorganizations</li>
                <li>Prevents double-spending attacks</li>
            </ul>
        `
    },
    {
        title: "What is the mempool?",
        tags: ["transactions", "difficulty-basic"],
        answer: `
            <p>The <strong>mempool</strong> (memory pool) is a waiting area for unconfirmed transactions before they're added to a block.</p>
            <strong>How it works:</strong>
            <ol>
                <li>User broadcasts transaction</li>
                <li>Transaction validated by nodes</li>
                <li>Valid transactions enter mempool</li>
                <li>Validators select transactions (usually highest fees first)</li>
                <li>Selected transactions included in blocks</li>
            </ol>
            <strong>Key points:</strong>
            <ul>
                <li>Each node has its own mempool</li>
                <li>Higher gas = higher priority</li>
                <li>Front-running bots watch the mempool</li>
            </ul>
        `
    },
    {
        title: "What are transaction fees?",
        tags: ["transactions", "difficulty-basic"],
        answer: `
            <p><strong>Transaction fees</strong> are payments to validators/miners for processing transactions.</p>
            <strong>Fee structures:</strong>
            <ul>
                <li><strong>Ethereum:</strong> Gas × Gas Price</li>
                <li><strong>Bitcoin:</strong> Based on transaction size</li>
                <li><strong>Solana:</strong> Fixed base fee (very low)</li>
            </ul>
            <strong>Fee comparison (approximate):</strong>
            <ul>
                <li>Ethereum L1: $1-50+</li>
                <li>Bitcoin: $1-20+</li>
                <li>Arbitrum/Optimism: $0.10-1</li>
                <li>Solana: $0.00025</li>
            </ul>
        `
    },
    {
        title: "What is a failed/reverted transaction?",
        tags: ["transactions", "difficulty-basic"],
        answer: `
            <p>A <strong>failed/reverted</strong> transaction was processed but didn't complete its intended action.</p>
            <strong>Common reasons:</strong>
            <ul>
                <li><strong>Out of gas:</strong> Gas limit too low</li>
                <li><strong>Reverted by contract:</strong> Condition not met</li>
                <li><strong>Insufficient balance</strong></li>
                <li><strong>Slippage too high</strong></li>
            </ul>
            <strong>Important:</strong> Gas fees are still charged for failed transactions!
            <strong>Prevention:</strong> Use adequate gas, simulate transactions, check balances
        `
    },

    // ==================== CONSENSUS MECHANISMS (8 questions) ====================
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

    // ==================== INTRODUCTION TO DAPPS (5 questions) ====================
    {
        title: "What is a dApp (decentralized application)?",
        tags: ["dapps", "difficulty-basic"],
        answer: `
            <p>A <strong>dApp</strong> (decentralized application) is an application that runs on a decentralized network using smart contracts.</p>
            <strong>Characteristics:</strong>
            <ul>
                <li><strong>Open source:</strong> Code is publicly verifiable</li>
                <li><strong>Decentralized:</strong> Runs on blockchain, not single server</li>
                <li><strong>Censorship-resistant:</strong> No single point of control</li>
                <li><strong>Token-incentivized:</strong> Often uses crypto tokens</li>
            </ul>
            <strong>Examples:</strong>
            <ul>
                <li><strong>DeFi:</strong> Uniswap, Aave, Compound</li>
                <li><strong>NFT:</strong> OpenSea, Blur</li>
                <li><strong>Gaming:</strong> Axie Infinity, Gods Unchained</li>
            </ul>
        `
    },
    {
        title: "What is Web3?",
        tags: ["web3", "difficulty-basic"],
        answer: `
            <p><strong>Web3</strong> refers to the next evolution of the internet, built on blockchain technology with emphasis on decentralization, ownership, and trustlessness.</p>
            <strong>Key principles:</strong>
            <ul>
                <li><strong>Decentralization:</strong> No central authorities</li>
                <li><strong>Ownership:</strong> Users own their data and assets</li>
                <li><strong>Trustlessness:</strong> Trust code, not intermediaries</li>
                <li><strong>Permissionless:</strong> Open access for all</li>
                <li><strong>Native payments:</strong> Built-in cryptocurrency</li>
            </ul>
        `
    },
    {
        title: "What is the difference between Web2 and Web3?",
        tags: ["web3", "difficulty-basic"],
        answer: `
            <p>Web2 and Web3 represent different eras of internet evolution.</p>
            <table>
                <tr><th>Aspect</th><th>Web2</th><th>Web3</th></tr>
                <tr><td>Control</td><td>Centralized companies</td><td>Decentralized networks</td></tr>
                <tr><td>Data ownership</td><td>Platforms own user data</td><td>Users own their data</td></tr>
                <tr><td>Identity</td><td>Email/password per site</td><td>Single wallet identity</td></tr>
                <tr><td>Payments</td><td>Credit cards, banks</td><td>Native cryptocurrency</td></tr>
                <tr><td>Trust</td><td>Trust the company</td><td>Trust the code</td></tr>
                <tr><td>Censorship</td><td>Easy to censor</td><td>Censorship-resistant</td></tr>
            </table>
        `
    },
    {
        title: "What is a smart contract (basic overview)?",
        tags: ["smart-contracts", "difficulty-basic"],
        answer: `
            <p>A <strong>smart contract</strong> is self-executing code stored on a blockchain that automatically enforces the terms of an agreement.</p>
            <strong>Key properties:</strong>
            <ul>
                <li><strong>Automated:</strong> Executes when conditions are met</li>
                <li><strong>Immutable:</strong> Cannot be changed once deployed</li>
                <li><strong>Transparent:</strong> Code is publicly visible</li>
                <li><strong>Trustless:</strong> No intermediaries needed</li>
            </ul>
            <strong>Examples:</strong>
            <ul>
                <li>Token transfers (ERC-20)</li>
                <li>NFT ownership (ERC-721)</li>
                <li>Decentralized exchanges</li>
                <li>Lending protocols</li>
            </ul>
        `
    },
    {
        title: "What is Ethereum Name Service (ENS)?",
        tags: ["ens", "ethereum", "difficulty-basic"],
        answer: `
            <p><strong>ENS</strong> (Ethereum Name Service) is a decentralized naming system that maps human-readable names to blockchain addresses.</p>
            <strong>How it works:</strong>
            <ul>
                <li>Register a .eth domain (e.g., vitalik.eth)</li>
                <li>Link it to your wallet address</li>
                <li>Use the name instead of the long hex address</li>
            </ul>
            <strong>Benefits:</strong>
            <ul>
                <li>Easy to remember and share</li>
                <li>Reduces errors in transactions</li>
                <li>Can link to websites, social profiles, and more</li>
                <li>NFT-based ownership</li>
            </ul>
            <strong>Example:</strong> Send ETH to "vitalik.eth" instead of "0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045"
        `
    }
];

// Export for use in main data.js
if (typeof module !== 'undefined' && module.exports) {
    module.exports = basicQuestions;
}