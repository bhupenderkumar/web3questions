// Basic Web3 Questions - Web3 and dApps Introduction
const basicWeb3Intro = [
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
        title: "What is the difference between Web1, Web2, and Web3?",
        tags: ["web3", "difficulty-basic"],
        answer: `
            <p>The web has evolved through three major phases:</p>
            <table>
                <tr><th>Era</th><th>Description</th><th>Examples</th></tr>
                <tr><td>Web1 (1990s-2000s)</td><td>Read-only, static pages</td><td>Yahoo, AOL, early websites</td></tr>
                <tr><td>Web2 (2000s-now)</td><td>Read-write, interactive, centralized</td><td>Facebook, Google, Twitter</td></tr>
                <tr><td>Web3 (emerging)</td><td>Read-write-own, decentralized</td><td>Ethereum, DeFi, NFTs</td></tr>
            </table>
            <strong>Key differences:</strong>
            <ul>
                <li><strong>Web1:</strong> Publishers create, users consume</li>
                <li><strong>Web2:</strong> Users create content, platforms own it</li>
                <li><strong>Web3:</strong> Users create and own their content</li>
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
    },
    {
        title: "What is an NFT?",
        tags: ["nft", "tokens", "difficulty-basic"],
        answer: `
            <p>An <strong>NFT</strong> (Non-Fungible Token) is a unique digital asset that represents ownership of a specific item on the blockchain.</p>
            <strong>Key properties:</strong>
            <ul>
                <li><strong>Non-fungible:</strong> Each token is unique (unlike ETH or BTC)</li>
                <li><strong>Verifiable ownership:</strong> Blockchain proves who owns it</li>
                <li><strong>Transferable:</strong> Can be bought, sold, traded</li>
                <li><strong>Programmable:</strong> Can include royalties, unlockables</li>
            </ul>
            <strong>Use cases:</strong>
            <ul>
                <li>Digital art and collectibles</li>
                <li>Gaming items</li>
                <li>Event tickets</li>
                <li>Domain names</li>
                <li>Music and media</li>
            </ul>
        `
    },
    {
        title: "What is DeFi?",
        tags: ["defi", "difficulty-basic"],
        answer: `
            <p><strong>DeFi</strong> (Decentralized Finance) refers to financial services built on blockchain without traditional intermediaries.</p>
            <strong>DeFi services:</strong>
            <ul>
                <li><strong>Lending/Borrowing:</strong> Aave, Compound</li>
                <li><strong>Trading:</strong> Uniswap, Curve</li>
                <li><strong>Stablecoins:</strong> DAI, USDC</li>
                <li><strong>Yield farming:</strong> Yearn Finance</li>
                <li><strong>Insurance:</strong> Nexus Mutual</li>
            </ul>
            <strong>Benefits:</strong>
            <ul>
                <li>Accessible to anyone with internet</li>
                <li>No credit checks or KYC</li>
                <li>Transparent and auditable</li>
                <li>Composable ("money legos")</li>
            </ul>
        `
    },
    {
        title: "What is a DAO?",
        tags: ["dao", "governance", "difficulty-basic"],
        answer: `
            <p>A <strong>DAO</strong> (Decentralized Autonomous Organization) is an organization governed by smart contracts and token holder votes.</p>
            <strong>How DAOs work:</strong>
            <ul>
                <li>Rules encoded in smart contracts</li>
                <li>Token holders can vote on proposals</li>
                <li>Treasury managed by the DAO</li>
                <li>No central leadership</li>
            </ul>
            <strong>Examples:</strong>
            <ul>
                <li><strong>MakerDAO:</strong> Manages DAI stablecoin</li>
                <li><strong>Uniswap:</strong> Protocol governance</li>
                <li><strong>ENS DAO:</strong> Manages ENS protocol</li>
            </ul>
        `
    },
    {
        title: "What is Layer 1 vs Layer 2?",
        tags: ["scaling", "layer2", "difficulty-basic"],
        answer: `
            <p><strong>Layer 1</strong> is the base blockchain, while <strong>Layer 2</strong> is a secondary framework built on top to improve scalability.</p>
            <strong>Layer 1 examples:</strong>
            <ul>
                <li>Ethereum, Bitcoin, Solana, Avalanche</li>
            </ul>
            <strong>Layer 2 examples:</strong>
            <ul>
                <li><strong>Rollups:</strong> Arbitrum, Optimism, zkSync</li>
                <li><strong>State channels:</strong> Lightning Network</li>
                <li><strong>Sidechains:</strong> Polygon PoS</li>
            </ul>
            <strong>Benefits of L2:</strong>
            <ul>
                <li>Lower fees</li>
                <li>Faster transactions</li>
                <li>Inherits L1 security (rollups)</li>
            </ul>
        `
    },
    {
        title: "What is gas optimization?",
        tags: ["development", "gas", "difficulty-basic"],
        answer: `
            <p><strong>Gas optimization</strong> is the practice of writing efficient smart contract code to minimize transaction costs.</p>
            <strong>Common techniques:</strong>
            <ul>
                <li>Use uint256 instead of smaller integers</li>
                <li>Pack storage variables</li>
                <li>Use events instead of storage for logs</li>
                <li>Avoid unnecessary storage reads/writes</li>
                <li>Use calldata instead of memory for function params</li>
            </ul>
            <strong>Why it matters:</strong>
            <ul>
                <li>Lower costs for users</li>
                <li>Better user experience</li>
                <li>More competitive protocols</li>
            </ul>
        `
    },
    {
        title: "What is a testnet?",
        tags: ["development", "networks", "difficulty-basic"],
        answer: `
            <p>A <strong>testnet</strong> is a blockchain network for testing that uses tokens with no real value.</p>
            <strong>Popular testnets:</strong>
            <ul>
                <li><strong>Ethereum:</strong> Sepolia, Goerli</li>
                <li><strong>Polygon:</strong> Mumbai</li>
                <li><strong>Arbitrum:</strong> Arbitrum Sepolia</li>
            </ul>
            <strong>Use cases:</strong>
            <ul>
                <li>Testing smart contracts before mainnet</li>
                <li>Learning without risking real money</li>
                <li>QA and debugging</li>
            </ul>
            <strong>Getting testnet tokens:</strong> Faucets (free) like Sepolia Faucet
        `
    },
    {
        title: "What is mainnet?",
        tags: ["networks", "difficulty-basic"],
        answer: `
            <p><strong>Mainnet</strong> is the primary, production blockchain network where real value transactions occur.</p>
            <strong>Mainnet vs Testnet:</strong>
            <table>
                <tr><th>Aspect</th><th>Mainnet</th><th>Testnet</th></tr>
                <tr><td>Value</td><td>Real money</td><td>No value</td></tr>
                <tr><td>Purpose</td><td>Production</td><td>Testing</td></tr>
                <tr><td>Security</td><td>Maximum</td><td>Lower priority</td></tr>
                <tr><td>Tokens</td><td>Must be purchased</td><td>Free from faucets</td></tr>
            </table>
        `
    },
    {
        title: "What is a faucet in crypto?",
        tags: ["development", "tools", "difficulty-basic"],
        answer: `
            <p>A <strong>faucet</strong> is a website or app that dispenses free cryptocurrency, typically for testing purposes.</p>
            <strong>Types:</strong>
            <ul>
                <li><strong>Testnet faucets:</strong> Free testnet tokens for development</li>
                <li><strong>Mainnet faucets:</strong> Small amounts of real crypto (rare)</li>
            </ul>
            <strong>Popular faucets:</strong>
            <ul>
                <li>Alchemy Sepolia Faucet</li>
                <li>Chainlink Faucets</li>
                <li>Paradigm Faucet</li>
            </ul>
            <strong>Note:</strong> Most require wallet connection or social verification to prevent abuse
        `
    },
    {
        title: "What is a blockchain bridge?",
        tags: ["crosschain", "difficulty-basic"],
        answer: `
            <p>A <strong>bridge</strong> allows transferring assets between different blockchain networks.</p>
            <strong>How bridges work:</strong>
            <ol>
                <li>Lock tokens on source chain</li>
                <li>Mint wrapped tokens on destination chain</li>
                <li>To return: burn wrapped tokens</li>
                <li>Unlock original tokens</li>
            </ol>
            <strong>Examples:</strong>
            <ul>
                <li>Arbitrum Bridge</li>
                <li>Polygon Bridge</li>
                <li>Wormhole</li>
                <li>Across Protocol</li>
            </ul>
            <strong>Risks:</strong> Bridge hacks have caused billions in losses - use trusted bridges carefully
        `
    },
    {
        title: "What is an oracle in blockchain?",
        tags: ["oracles", "difficulty-basic"],
        answer: `
            <p>An <strong>oracle</strong> provides external data to smart contracts, which cannot access off-chain information directly.</p>
            <strong>Types of data:</strong>
            <ul>
                <li>Price feeds (ETH/USD, BTC/USD)</li>
                <li>Weather data</li>
                <li>Sports scores</li>
                <li>Random numbers</li>
            </ul>
            <strong>Popular oracles:</strong>
            <ul>
                <li><strong>Chainlink:</strong> Industry leader, decentralized</li>
                <li><strong>Band Protocol</strong></li>
                <li><strong>Pyth Network</strong></li>
            </ul>
            <strong>Oracle problem:</strong> Ensuring off-chain data is accurate and tamper-proof
        `
    },
    {
        title: "What is IPFS?",
        tags: ["storage", "decentralized", "difficulty-basic"],
        answer: `
            <p><strong>IPFS</strong> (InterPlanetary File System) is a decentralized protocol for storing and sharing files.</p>
            <strong>How it works:</strong>
            <ul>
                <li>Files addressed by content hash (CID)</li>
                <li>Same content = same address</li>
                <li>Distributed across network nodes</li>
                <li>No central server</li>
            </ul>
            <strong>Uses in Web3:</strong>
            <ul>
                <li>NFT metadata and images</li>
                <li>dApp frontends</li>
                <li>Document storage</li>
            </ul>
            <strong>Pinning services:</strong> Pinata, Infura, NFT.Storage keep files available
        `
    },
    {
        title: "What is a rug pull?",
        tags: ["security", "scams", "difficulty-basic"],
        answer: `
            <p>A <strong>rug pull</strong> is a scam where developers abandon a project after collecting investor funds.</p>
            <strong>Common types:</strong>
            <ul>
                <li><strong>Liquidity pull:</strong> Developers remove all liquidity from DEX</li>
                <li><strong>Selling supply:</strong> Team dumps large token holdings</li>
                <li><strong>Limiting sells:</strong> Code prevents users from selling</li>
            </ul>
            <strong>Red flags:</strong>
            <ul>
                <li>Anonymous team</li>
                <li>Unverified/unaudited contracts</li>
                <li>Too-good-to-be-true returns</li>
                <li>Locked liquidity with short timeframe</li>
            </ul>
        `
    },
    {
        title: "What is DYOR?",
        tags: ["culture", "security", "difficulty-basic"],
        answer: `
            <p><strong>DYOR</strong> stands for "Do Your Own Research" - a common phrase in crypto reminding people to investigate before investing.</p>
            <strong>What to research:</strong>
            <ul>
                <li>Team background and credibility</li>
                <li>Tokenomics and supply</li>
                <li>Smart contract audits</li>
                <li>Community and social presence</li>
                <li>Roadmap and development activity</li>
                <li>Use case and competition</li>
            </ul>
            <strong>Tools for research:</strong>
            <ul>
                <li>CoinGecko, CoinMarketCap</li>
                <li>Etherscan, block explorers</li>
                <li>DeFiLlama for TVL</li>
                <li>GitHub for code activity</li>
            </ul>
        `
    }
];

// Export for use in main data file
if (typeof module !== 'undefined' && module.exports) {
    module.exports = basicWeb3Intro;
}