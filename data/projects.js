// Web3 Project Ideas - Practical Projects for Learning - 50+ projects total
const projectQuestions = [
    // ==================== BEGINNER PROJECTS (15 projects) ====================
    {
        title: "Simple ERC-20 Token",
        tags: ["beginner", "tokens", "solidity"],
        answer: `
            <p>Create your own fungible token following the ERC-20 standard.</p>
            <strong>Learning Goals:</strong>
            <ul>
                <li>Understand token standards</li>
                <li>Learn Solidity basics</li>
                <li>Deploy to testnet</li>
                <li>Interact with your contract</li>
            </ul>
            <strong>Features to implement:</strong>
            <ul>
                <li>totalSupply, balanceOf, transfer</li>
                <li>approve, transferFrom, allowance</li>
                <li>Minting function (with access control)</li>
                <li>Burning function</li>
            </ul>
            <strong>Tech Stack:</strong> Solidity, Hardhat/Foundry, ethers.js
            <strong>Extension:</strong> Add pausable, capped supply, or snapshot features
        `
    },
    {
        title: "Basic NFT Collection",
        tags: ["beginner", "nft", "solidity"],
        answer: `
            <p>Build an ERC-721 NFT collection with metadata on IPFS.</p>
            <strong>Learning Goals:</strong>
            <ul>
                <li>Understand ERC-721 standard</li>
                <li>Work with IPFS for metadata</li>
                <li>Implement minting logic</li>
                <li>Add reveal mechanism</li>
            </ul>
            <strong>Features:</strong>
            <ul>
                <li>Mint function with price</li>
                <li>Max supply limit</li>
                <li>Base URI for metadata</li>
                <li>Owner withdrawal function</li>
            </ul>
            <strong>Tech Stack:</strong> Solidity, OpenZeppelin, Pinata/NFT.Storage
            <strong>Extension:</strong> Add whitelist, reveal mechanism, or royalties (ERC-2981)
        `
    },
    {
        title: "Crypto Wallet Tracker",
        tags: ["beginner", "frontend", "api"],
        answer: `
            <p>Build a web app that tracks wallet balances and transaction history.</p>
            <strong>Learning Goals:</strong>
            <ul>
                <li>Use blockchain APIs (Etherscan, Alchemy)</li>
                <li>Parse and display blockchain data</li>
                <li>Handle multiple networks</li>
            </ul>
            <strong>Features:</strong>
            <ul>
                <li>Input any wallet address</li>
                <li>Show ETH and token balances</li>
                <li>Display recent transactions</li>
                <li>Calculate portfolio value in USD</li>
            </ul>
            <strong>Tech Stack:</strong> React/Vue, ethers.js, CoinGecko API
            <strong>Extension:</strong> Add NFT display, multi-chain support, or alerts
        `
    },
    {
        title: "Simple Voting dApp",
        tags: ["beginner", "dapp", "solidity"],
        answer: `
            <p>Create a decentralized voting application with smart contract backend.</p>
            <strong>Learning Goals:</strong>
            <ul>
                <li>Connect frontend to smart contracts</li>
                <li>Handle wallet connections</li>
                <li>Implement voting logic</li>
            </ul>
            <strong>Features:</strong>
            <ul>
                <li>Create proposals</li>
                <li>Cast votes (one per address)</li>
                <li>View results in real-time</li>
                <li>Time-limited voting periods</li>
            </ul>
            <strong>Tech Stack:</strong> Solidity, React, ethers.js, MetaMask
            <strong>Extension:</strong> Add weighted voting, delegation, or quadratic voting
        `
    },
    {
        title: "Tip Jar Smart Contract",
        tags: ["beginner", "solidity", "payments"],
        answer: `
            <p>Build a smart contract that accepts ETH tips and allows owner withdrawal.</p>
            <strong>Learning Goals:</strong>
            <ul>
                <li>Handle ETH payments</li>
                <li>Implement access control</li>
                <li>Learn payable functions</li>
            </ul>
            <strong>Features:</strong>
            <ul>
                <li>Receive ETH tips</li>
                <li>Track tipper addresses and amounts</li>
                <li>Owner can withdraw</li>
                <li>Emit events for tips</li>
            </ul>
            <pre><code class="language-solidity">function tip() external payable {
    require(msg.value > 0, "Must send ETH");
    tips[msg.sender] += msg.value;
    emit TipReceived(msg.sender, msg.value);
}</code></pre>
            <strong>Extension:</strong> Add leaderboard, messages with tips, or multi-recipient splitting
        `
    },
    {
        title: "ENS Name Resolver App",
        tags: ["beginner", "ens", "frontend"],
        answer: `
            <p>Build an app that resolves ENS names to addresses and vice versa.</p>
            <strong>Learning Goals:</strong>
            <ul>
                <li>Work with ENS protocol</li>
                <li>Understand name resolution</li>
                <li>Display ENS metadata</li>
            </ul>
            <strong>Features:</strong>
            <ul>
                <li>Resolve .eth names to addresses</li>
                <li>Reverse resolve addresses to names</li>
                <li>Display avatar and other records</li>
                <li>Check name availability</li>
            </ul>
            <strong>Tech Stack:</strong> React, ethers.js (built-in ENS support)
            <strong>Extension:</strong> Add registration flow, text records, or subdomain creation
        `
    },
    {
        title: "Gas Price Tracker",
        tags: ["beginner", "tools", "api"],
        answer: `
            <p>Create a real-time gas price tracker with historical data.</p>
            <strong>Learning Goals:</strong>
            <ul>
                <li>Fetch blockchain data</li>
                <li>Display real-time updates</li>
                <li>Work with charting libraries</li>
            </ul>
            <strong>Features:</strong>
            <ul>
                <li>Current gas prices (slow, standard, fast)</li>
                <li>Historical gas charts</li>
                <li>Estimated transaction costs</li>
                <li>Push notifications for low gas</li>
            </ul>
            <strong>Tech Stack:</strong> React, ethers.js, Chart.js, Etherscan API
            <strong>Extension:</strong> Add multi-chain, transaction simulation, or gas predictions
        `
    },
    {
        title: "Multi-Sig Wallet (Basic)",
        tags: ["beginner", "security", "solidity"],
        answer: `
            <p>Build a simple multi-signature wallet requiring multiple approvals.</p>
            <strong>Learning Goals:</strong>
            <ul>
                <li>Understand multi-sig concepts</li>
                <li>Implement approval mechanisms</li>
                <li>Handle transaction execution</li>
            </ul>
            <strong>Features:</strong>
            <ul>
                <li>Add/remove owners</li>
                <li>Set required confirmations</li>
                <li>Submit and confirm transactions</li>
                <li>Execute after threshold met</li>
            </ul>
            <strong>Tech Stack:</strong> Solidity, Hardhat
            <strong>Extension:</strong> Add time locks, transaction batching, or ERC-20 support
        `
    },
    {
        title: "Token Faucet",
        tags: ["beginner", "tokens", "dapp"],
        answer: `
            <p>Create a testnet token faucet that distributes tokens with rate limiting.</p>
            <strong>Learning Goals:</strong>
            <ul>
                <li>Token distribution logic</li>
                <li>Rate limiting mechanisms</li>
                <li>Frontend wallet integration</li>
            </ul>
            <strong>Features:</strong>
            <ul>
                <li>Claim tokens once per day</li>
                <li>CAPTCHA or wallet verification</li>
                <li>Display remaining balance</li>
                <li>Transaction history</li>
            </ul>
            <strong>Tech Stack:</strong> Solidity, React, ethers.js
            <strong>Extension:</strong> Add social verification, referral bonuses, or multi-token support
        `
    },
    {
        title: "Blockchain Event Listener",
        tags: ["beginner", "events", "backend"],
        answer: `
            <p>Build a service that listens to smart contract events and logs them.</p>
            <strong>Learning Goals:</strong>
            <ul>
                <li>Understand blockchain events</li>
                <li>Work with WebSocket connections</li>
                <li>Handle event data</li>
            </ul>
            <strong>Features:</strong>
            <ul>
                <li>Listen to specific contract events</li>
                <li>Store events in database</li>
                <li>Real-time notifications</li>
                <li>Historical event queries</li>
            </ul>
            <pre><code class="language-javascript">contract.on("Transfer", (from, to, value, event) => {
    console.log(\`Transfer: \${from} → \${to}: \${value}\`);
});</code></pre>
            <strong>Extension:</strong> Add webhook notifications, multi-contract monitoring, or analytics
        `
    },
    {
        title: "Crypto Price Ticker",
        tags: ["beginner", "api", "frontend"],
        answer: `
            <p>Build a live cryptocurrency price ticker with multiple coins.</p>
            <strong>Learning Goals:</strong>
            <ul>
                <li>Work with price APIs</li>
                <li>Handle real-time data</li>
                <li>Display price changes</li>
            </ul>
            <strong>Features:</strong>
            <ul>
                <li>Live prices for top cryptocurrencies</li>
                <li>24h price change percentages</li>
                <li>Sparkline mini charts</li>
                <li>Favorites/watchlist</li>
            </ul>
            <strong>Tech Stack:</strong> React, CoinGecko/CoinMarketCap API
            <strong>Extension:</strong> Add price alerts, portfolio tracking, or compare charts
        `
    },
    {
        title: "Simple Crowdfunding Contract",
        tags: ["beginner", "defi", "solidity"],
        answer: `
            <p>Create a crowdfunding smart contract with goal-based funding.</p>
            <strong>Learning Goals:</strong>
            <ul>
                <li>Handle multiple contributors</li>
                <li>Implement funding deadlines</li>
                <li>Refund logic if goal not met</li>
            </ul>
            <strong>Features:</strong>
            <ul>
                <li>Create campaigns with goals and deadlines</li>
                <li>Accept contributions</li>
                <li>Automatic refunds if goal not met</li>
                <li>Creator withdrawal on success</li>
            </ul>
            <strong>Tech Stack:</strong> Solidity, Hardhat, React
            <strong>Extension:</strong> Add milestone-based release, voting on milestones, or NFT rewards
        `
    },
    {
        title: "Wallet Connect Integration",
        tags: ["beginner", "frontend", "wallets"],
        answer: `
            <p>Build a dApp with multiple wallet connection options.</p>
            <strong>Learning Goals:</strong>
            <ul>
                <li>Integrate WalletConnect</li>
                <li>Support multiple wallets</li>
                <li>Handle wallet state</li>
            </ul>
            <strong>Features:</strong>
            <ul>
                <li>Connect MetaMask, WalletConnect, Coinbase Wallet</li>
                <li>Display connected address</li>
                <li>Show wallet balance</li>
                <li>Switch networks</li>
            </ul>
            <strong>Tech Stack:</strong> React, wagmi, RainbowKit/Web3Modal
            <strong>Extension:</strong> Add session persistence, mobile deep links, or account switching
        `
    },
    {
        title: "Token Swap Interface",
        tags: ["beginner", "defi", "frontend"],
        answer: `
            <p>Build a frontend that interfaces with a DEX for token swaps.</p>
            <strong>Learning Goals:</strong>
            <ul>
                <li>Integrate with DEX protocols</li>
                <li>Handle token approvals</li>
                <li>Calculate swap rates</li>
            </ul>
            <strong>Features:</strong>
            <ul>
                <li>Token selection</li>
                <li>Quote display</li>
                <li>Slippage settings</li>
                <li>Approve and swap transactions</li>
            </ul>
            <strong>Tech Stack:</strong> React, ethers.js, Uniswap SDK
            <strong>Extension:</strong> Add multi-hop routing, price impact warnings, or limit orders
        `
    },
    {
        title: "NFT Gallery Viewer",
        tags: ["beginner", "nft", "frontend"],
        answer: `
            <p>Create an app that displays NFTs owned by any wallet.</p>
            <strong>Learning Goals:</strong>
            <ul>
                <li>Query NFT ownership</li>
                <li>Fetch and display metadata</li>
                <li>Handle IPFS content</li>
            </ul>
            <strong>Features:</strong>
            <ul>
                <li>Input wallet address</li>
                <li>Display all NFTs with images</li>
                <li>Show traits and attributes</li>
                <li>Link to OpenSea/marketplaces</li>
            </ul>
            <strong>Tech Stack:</strong> React, Alchemy NFT API, IPFS gateways
            <strong>Extension:</strong> Add collection filtering, rarity rankings, or batch transfers
        `
    },

    // ==================== INTERMEDIATE PROJECTS (20 projects) ====================
    {
        title: "Decentralized Exchange (Simple AMM)",
        tags: ["intermediate", "defi", "amm"],
        answer: `
            <p>Build a basic Automated Market Maker like Uniswap V2.</p>
            <strong>Learning Goals:</strong>
            <ul>
                <li>Understand constant product formula (x*y=k)</li>
                <li>Implement liquidity pools</li>
                <li>Handle swap mechanics</li>
            </ul>
            <strong>Features:</strong>
            <ul>
                <li>Create liquidity pools</li>
                <li>Add/remove liquidity</li>
                <li>Swap tokens</li>
                <li>LP token minting/burning</li>
            </ul>
            <pre><code class="language-solidity">function swap(uint amountIn, address tokenIn) external {
    uint amountOut = getAmountOut(amountIn, reserveIn, reserveOut);
    // Transfer tokens...
}</code></pre>
            <strong>Extension:</strong> Add multi-hop swaps, fees, or price oracle
        `
    },
    {
        title: "Lending Protocol (Basic)",
        tags: ["intermediate", "defi", "lending"],
        answer: `
            <p>Create a simplified lending/borrowing protocol like Compound.</p>
            <strong>Learning Goals:</strong>
            <ul>
                <li>Understand collateralization</li>
                <li>Implement interest rate models</li>
                <li>Handle liquidations</li>
            </ul>
            <strong>Features:</strong>
            <ul>
                <li>Deposit collateral</li>
                <li>Borrow against collateral</li>
                <li>Accrue interest over time</li>
                <li>Liquidation mechanism</li>
            </ul>
            <strong>Tech Stack:</strong> Solidity, OpenZeppelin, Chainlink Price Feeds
            <strong>Extension:</strong> Add flash loans, governance, or multiple assets
        `
    },
    {
        title: "NFT Marketplace",
        tags: ["intermediate", "nft", "marketplace"],
        answer: `
            <p>Build a decentralized NFT marketplace with listings and auctions.</p>
            <strong>Learning Goals:</strong>
            <ul>
                <li>Handle NFT transfers</li>
                <li>Implement listing/delisting</li>
                <li>Create auction mechanics</li>
            </ul>
            <strong>Features:</strong>
            <ul>
                <li>List NFTs for fixed price</li>
                <li>Create timed auctions</li>
                <li>Handle bids and settlements</li>
                <li>Royalty payments (ERC-2981)</li>
            </ul>
            <strong>Tech Stack:</strong> Solidity, The Graph, React
            <strong>Extension:</strong> Add collection offers, bundle sales, or lazy minting
        `
    },
    {
        title: "DAO with Governance",
        tags: ["intermediate", "dao", "governance"],
        answer: `
            <p>Create a DAO with proposal creation, voting, and execution.</p>
            <strong>Learning Goals:</strong>
            <ul>
                <li>Implement voting mechanisms</li>
                <li>Handle proposal lifecycle</li>
                <li>Execute on-chain actions</li>
            </ul>
            <strong>Features:</strong>
            <ul>
                <li>Token-weighted voting</li>
                <li>Proposal creation with threshold</li>
                <li>Timelock for execution</li>
                <li>Delegate voting power</li>
            </ul>
            <strong>Tech Stack:</strong> Solidity, OpenZeppelin Governor, Tally
            <strong>Extension:</strong> Add quadratic voting, rage quit, or multi-sig integration
        `
    },
    {
        title: "Staking Platform",
        tags: ["intermediate", "defi", "staking"],
        answer: `
            <p>Build a staking platform with rewards distribution.</p>
            <strong>Learning Goals:</strong>
            <ul>
                <li>Calculate staking rewards</li>
                <li>Handle stake/unstake logic</li>
                <li>Implement lock periods</li>
            </ul>
            <strong>Features:</strong>
            <ul>
                <li>Stake tokens</li>
                <li>Earn rewards proportionally</li>
                <li>Compound rewards</li>
                <li>Different lock tiers</li>
            </ul>
            <pre><code class="language-solidity">function earned(address account) public view returns (uint256) {
    return (staked[account] * (rewardPerToken() - userRewardPerTokenPaid[account])) / 1e18 + rewards[account];
}</code></pre>
            <strong>Extension:</strong> Add boosted rewards, NFT staking, or veToken model
        `
    },
    {
        title: "On-chain SVG NFTs",
        tags: ["intermediate", "nft", "generative"],
        answer: `
            <p>Create NFTs with fully on-chain SVG art and metadata.</p>
            <strong>Learning Goals:</strong>
            <ul>
                <li>Generate SVG in Solidity</li>
                <li>Base64 encoding</li>
                <li>Dynamic metadata</li>
            </ul>
            <strong>Features:</strong>
            <ul>
                <li>Procedurally generated art</li>
                <li>100% on-chain (no IPFS)</li>
                <li>Dynamic traits based on token ID</li>
                <li>Updatable artwork</li>
            </ul>
            <pre><code class="language-solidity">function tokenURI(uint256 tokenId) public view returns (string memory) {
    string memory svg = generateSVG(tokenId);
    return string(abi.encodePacked("data:application/json;base64,", ...));
}</code></pre>
            <strong>Extension:</strong> Add animated SVGs, evolving art, or composable layers
        `
    },
    {
        title: "Bridge for ERC-20 Tokens",
        tags: ["intermediate", "bridge", "crosschain"],
        answer: `
            <p>Build a basic token bridge between two EVM chains.</p>
            <strong>Learning Goals:</strong>
            <ul>
                <li>Understand cross-chain messaging</li>
                <li>Lock-and-mint pattern</li>
                <li>Handle validators/relayers</li>
            </ul>
            <strong>Features:</strong>
            <ul>
                <li>Lock tokens on source chain</li>
                <li>Mint wrapped tokens on destination</li>
                <li>Burn to unlock originals</li>
                <li>Multi-sig validation</li>
            </ul>
            <strong>Tech Stack:</strong> Solidity (both chains), relayer backend
            <strong>Warning:</strong> Bridges are high-risk. Use testnet only!
            <strong>Extension:</strong> Add challenge period, optimistic verification, or multiple assets
        `
    },
    {
        title: "Yield Aggregator",
        tags: ["intermediate", "defi", "yield"],
        answer: `
            <p>Create a yield aggregator that auto-compounds rewards.</p>
            <strong>Learning Goals:</strong>
            <ul>
                <li>Integrate with DeFi protocols</li>
                <li>Implement vault pattern</li>
                <li>Auto-compound logic</li>
            </ul>
            <strong>Features:</strong>
            <ul>
                <li>Deposit to vault</li>
                <li>Vault deploys to strategies</li>
                <li>Auto-harvest and compound</li>
                <li>Share-based accounting</li>
            </ul>
            <strong>Tech Stack:</strong> Solidity, ERC-4626 vault standard
            <strong>Extension:</strong> Add multiple strategies, strategy scoring, or emergency withdrawal
        `
    },
    {
        title: "Decentralized Identity (DID)",
        tags: ["intermediate", "identity", "credentials"],
        answer: `
            <p>Build a decentralized identity system with verifiable credentials.</p>
            <strong>Learning Goals:</strong>
            <ul>
                <li>Understand DID standards</li>
                <li>Issue verifiable credentials</li>
                <li>Implement attestations</li>
            </ul>
            <strong>Features:</strong>
            <ul>
                <li>Create DID documents</li>
                <li>Issue credentials (soulbound tokens)</li>
                <li>Verify credentials</li>
                <li>Revocation registry</li>
            </ul>
            <strong>Tech Stack:</strong> Solidity, ERC-5192 (Soulbound), did-jwt
            <strong>Extension:</strong> Add ZK proofs for privacy, social recovery, or reputation system
        `
    },
    {
        title: "On-chain Game (Simple)",
        tags: ["intermediate", "gaming", "randomness"],
        answer: `
            <p>Create a simple on-chain game with verifiable randomness.</p>
            <strong>Learning Goals:</strong>
            <ul>
                <li>Secure randomness (Chainlink VRF)</li>
                <li>Game state management</li>
                <li>Reward distribution</li>
            </ul>
            <strong>Features:</strong>
            <ul>
                <li>Coin flip or dice game</li>
                <li>Provably fair randomness</li>
                <li>Bet placement and payouts</li>
                <li>House edge configuration</li>
            </ul>
            <strong>Tech Stack:</strong> Solidity, Chainlink VRF
            <strong>Extension:</strong> Add multi-player games, tournaments, or progressive jackpots
        `
    },
    {
        title: "Token Vesting Contract",
        tags: ["intermediate", "tokens", "vesting"],
        answer: `
            <p>Build a token vesting system with cliff and linear release.</p>
            <strong>Learning Goals:</strong>
            <ul>
                <li>Time-based unlocking</li>
                <li>Cliff periods</li>
                <li>Revocation handling</li>
            </ul>
            <strong>Features:</strong>
            <ul>
                <li>Create vesting schedules</li>
                <li>Cliff period before any release</li>
                <li>Linear or step-based vesting</li>
                <li>Admin can revoke unvested tokens</li>
            </ul>
            <pre><code class="language-solidity">function vestedAmount() public view returns (uint256) {
    if (block.timestamp < cliff) return 0;
    if (block.timestamp >= end) return totalAmount;
    return totalAmount * (block.timestamp - start) / (end - start);
}</code></pre>
            <strong>Extension:</strong> Add multiple beneficiaries, transferable vesting, or milestone-based vesting
        `
    },
    {
        title: "Subscription NFT Membership",
        tags: ["intermediate", "nft", "subscription"],
        answer: `
            <p>Create NFT-based subscriptions that expire and can be renewed.</p>
            <strong>Learning Goals:</strong>
            <ul>
                <li>Time-limited token validity</li>
                <li>Renewal mechanics</li>
                <li>Access control based on NFT</li>
            </ul>
            <strong>Features:</strong>
            <ul>
                <li>Mint subscription NFT with duration</li>
                <li>Check if subscription is active</li>
                <li>Renew subscription</li>
                <li>Tier-based pricing</li>
            </ul>
            <strong>Tech Stack:</strong> Solidity, ERC-721
            <strong>Extension:</strong> Add auto-renewal, gifting, or family plans
        `
    },
    {
        title: "Gasless Transactions (Meta-transactions)",
        tags: ["intermediate", "ux", "gasless"],
        answer: `
            <p>Implement ERC-2771 meta-transactions for gasless user experience.</p>
            <strong>Learning Goals:</strong>
            <ul>
                <li>Understand ERC-2771</li>
                <li>Trusted forwarder pattern</li>
                <li>Signature verification</li>
            </ul>
            <strong>Features:</strong>
            <ul>
                <li>User signs transaction off-chain</li>
                <li>Relayer submits transaction</li>
                <li>Contract trusts forwarder</li>
                <li>User doesn't need ETH for gas</li>
            </ul>
            <strong>Tech Stack:</strong> Solidity, OpenZeppelin, Gelato/Biconomy
            <strong>Extension:</strong> Add ERC-20 gas payment, sponsored transactions, or batch execution
        `
    },
    {
        title: "The Graph Subgraph",
        tags: ["intermediate", "indexing", "thegraph"],
        answer: `
            <p>Create a subgraph to index and query blockchain data.</p>
            <strong>Learning Goals:</strong>
            <ul>
                <li>Understand event indexing</li>
                <li>Write GraphQL schema</li>
                <li>Map events to entities</li>
            </ul>
            <strong>Features:</strong>
            <ul>
                <li>Index smart contract events</li>
                <li>Create queryable entities</li>
                <li>Handle relationships</li>
                <li>Query via GraphQL API</li>
            </ul>
            <strong>Tech Stack:</strong> The Graph, AssemblyScript, GraphQL
            <strong>Extension:</strong> Add aggregations, time-series data, or cross-contract indexing
        `
    },
    {
        title: "Commit-Reveal Voting",
        tags: ["intermediate", "governance", "privacy"],
        answer: `
            <p>Implement voting with commit-reveal to prevent vote peeking.</p>
            <strong>Learning Goals:</strong>
            <ul>
                <li>Two-phase voting</li>
                <li>Commitment schemes</li>
                <li>Reveal verification</li>
            </ul>
            <strong>Features:</strong>
            <ul>
                <li>Commit phase: Submit hashed votes</li>
                <li>Reveal phase: Reveal and verify votes</li>
                <li>Prevent voting based on others' votes</li>
                <li>Slash unrevealed votes</li>
            </ul>
            <pre><code class="language-solidity">function commit(bytes32 commitment) external {
    commits[msg.sender] = commitment;
}

function reveal(uint256 vote, bytes32 salt) external {
    require(keccak256(abi.encode(vote, salt)) == commits[msg.sender]);
    // Count vote...
}</code></pre>
            <strong>Extension:</strong> Add ZK proofs, vote weighting, or delegation
        `
    },
    {
        title: "Escrow Contract",
        tags: ["intermediate", "payments", "security"],
        answer: `
            <p>Build an escrow system with dispute resolution.</p>
            <strong>Learning Goals:</strong>
            <ul>
                <li>Multi-party fund management</li>
                <li>State machine patterns</li>
                <li>Dispute handling</li>
            </ul>
            <strong>Features:</strong>
            <ul>
                <li>Buyer deposits funds</li>
                <li>Seller delivers goods/service</li>
                <li>Buyer confirms or disputes</li>
                <li>Arbiter resolves disputes</li>
            </ul>
            <strong>Tech Stack:</strong> Solidity
            <strong>Extension:</strong> Add milestone releases, multiple arbiters, or reputation system
        `
    },
    {
        title: "Merkle Airdrop",
        tags: ["intermediate", "tokens", "airdrop"],
        answer: `
            <p>Implement gas-efficient airdrops using Merkle proofs.</p>
            <strong>Learning Goals:</strong>
            <ul>
                <li>Generate Merkle trees off-chain</li>
                <li>Verify proofs on-chain</li>
                <li>Efficient claim mechanism</li>
            </ul>
            <strong>Features:</strong>
            <ul>
                <li>Generate tree from address list</li>
                <li>Users claim with proof</li>
                <li>Prevent double claims</li>
                <li>Set expiration dates</li>
            </ul>
            <pre><code class="language-solidity">function claim(uint256 amount, bytes32[] calldata proof) external {
    bytes32 leaf = keccak256(abi.encode(msg.sender, amount));
    require(MerkleProof.verify(proof, merkleRoot, leaf));
    require(!claimed[msg.sender]);
    claimed[msg.sender] = true;
    token.transfer(msg.sender, amount);
}</code></pre>
            <strong>Extension:</strong> Add streaming claims, retroactive airdrops, or multi-token drops
        `
    },
    {
        title: "Upgradeable Contract System",
        tags: ["intermediate", "upgrades", "patterns"],
        answer: `
            <p>Implement upgradeable smart contracts using proxy patterns.</p>
            <strong>Learning Goals:</strong>
            <ul>
                <li>Understand proxy patterns</li>
                <li>Storage layout considerations</li>
                <li>Safe upgrade practices</li>
            </ul>
            <strong>Features:</strong>
            <ul>
                <li>Transparent or UUPS proxy</li>
                <li>Admin-controlled upgrades</li>
                <li>Initialization instead of constructor</li>
                <li>Storage gap for future variables</li>
            </ul>
            <strong>Tech Stack:</strong> OpenZeppelin Upgrades, Hardhat
            <strong>Extension:</strong> Add timelock, multi-sig approval, or beacon proxy
        `
    },
    {
        title: "Chainlink Price Feed Integration",
        tags: ["intermediate", "oracles", "chainlink"],
        answer: `
            <p>Build a DeFi app that uses Chainlink for reliable price data.</p>
            <strong>Learning Goals:</strong>
            <ul>
                <li>Integrate Chainlink feeds</li>
                <li>Handle price data correctly</li>
                <li>Implement staleness checks</li>
            </ul>
            <strong>Features:</strong>
            <ul>
                <li>Fetch ETH/USD price</li>
                <li>Use for collateral valuation</li>
                <li>Check for stale data</li>
                <li>Multiple price feeds</li>
            </ul>
            <pre><code class="language-solidity">function getLatestPrice() public view returns (int256) {
    (,int256 price,,uint256 updatedAt,) = priceFeed.latestRoundData();
    require(block.timestamp - updatedAt < 1 hours, "Stale price");
    return price;
}</code></pre>
            <strong>Extension:</strong> Add derived prices, circuit breakers, or fallback oracles
        `
    },
    {
        title: "NFT Staking for Rewards",
        tags: ["intermediate", "nft", "staking"],
        answer: `
            <p>Create a system where NFT holders can stake for token rewards.</p>
            <strong>Learning Goals:</strong>
            <ul>
                <li>Handle NFT deposits/withdrawals</li>
                <li>Calculate time-based rewards</li>
                <li>Rarity-based reward multipliers</li>
            </ul>
            <strong>Features:</strong>
            <ul>
                <li>Stake NFTs from collection</li>
                <li>Earn tokens over time</li>
                <li>Claim rewards anytime</li>
                <li>Bonus for rare NFTs</li>
            </ul>
            <strong>Tech Stack:</strong> Solidity, ERC-721, ERC-20
            <strong>Extension:</strong> Add lock-up bonuses, collection bonuses, or boosting
        `
    },

    // ==================== ADVANCED PROJECTS (15 projects) ====================
    {
        title: "Flash Loan Arbitrage Bot",
        tags: ["advanced", "defi", "mev"],
        answer: `
            <p>Build an arbitrage bot using flash loans to profit from price differences.</p>
            <strong>Learning Goals:</strong>
            <ul>
                <li>Flash loan mechanics</li>
                <li>Arbitrage detection</li>
                <li>Gas optimization</li>
                <li>MEV protection</li>
            </ul>
            <strong>Features:</strong>
            <ul>
                <li>Detect price discrepancies</li>
                <li>Execute flash loan arbitrage</li>
                <li>Calculate profitability including gas</li>
                <li>Use Flashbots for MEV protection</li>
            </ul>
            <strong>Tech Stack:</strong> Solidity, Aave/dYdX flash loans, ethers.js
            <strong>Warning:</strong> Highly competitive, expect losses learning
            <strong>Extension:</strong> Add multi-hop, multi-DEX, or triangular arbitrage
        `
    },
    {
        title: "ZK Proof Integration",
        tags: ["advanced", "zk", "privacy"],
        answer: `
            <p>Implement a smart contract that verifies zero-knowledge proofs.</p>
            <strong>Learning Goals:</strong>
            <ul>
                <li>Understand ZK circuits</li>
                <li>Generate and verify proofs</li>
                <li>Integrate Circom/snarkjs</li>
            </ul>
            <strong>Features:</strong>
            <ul>
                <li>Write circuit in Circom</li>
                <li>Generate trusted setup</li>
                <li>Create Solidity verifier</li>
                <li>Private proof verification</li>
            </ul>
            <strong>Example use case:</strong>
            <ul>
                <li>Prove age > 18 without revealing birthdate</li>
                <li>Prove membership without revealing identity</li>
                <li>Private voting</li>
            </ul>
            <strong>Tech Stack:</strong> Circom, snarkjs, Solidity
            <strong>Extension:</strong> Add recursive proofs, anonymous voting, or private transfers
        `
    },
    {
        title: "Concentrated Liquidity AMM (Uniswap V3 style)",
        tags: ["advanced", "defi", "amm"],
        answer: `
            <p>Build an AMM with concentrated liquidity positions.</p>
            <strong>Learning Goals:</strong>
            <ul>
                <li>Tick-based pricing</li>
                <li>Range orders</li>
                <li>Capital efficiency</li>
            </ul>
            <strong>Features:</strong>
            <ul>
                <li>Provide liquidity in price ranges</li>
                <li>NFT position tokens</li>
                <li>Fee collection per position</li>
                <li>Tick math implementation</li>
            </ul>
            <strong>Challenges:</strong>
            <ul>
                <li>Complex math (Q64.96 fixed point)</li>
                <li>Tick spacing and fee tiers</li>
                <li>Position management</li>
            </ul>
            <strong>Tech Stack:</strong> Solidity, PRBMath library
            <strong>Extension:</strong> Add limit orders, TWAP oracle, or fee switch
        `
    },
    {
        title: "MEV Bot (Searcher)",
        tags: ["advanced", "mev", "bot"],
        answer: `
            <p>Create a searcher bot that extracts MEV opportunities.</p>
            <strong>Learning Goals:</strong>
            <ul>
                <li>Mempool monitoring</li>
                <li>Transaction simulation</li>
                <li>Bundle creation</li>
                <li>Flashbots integration</li>
            </ul>
            <strong>Features:</strong>
            <ul>
                <li>Monitor pending transactions</li>
                <li>Simulate opportunities</li>
                <li>Create profitable bundles</li>
                <li>Submit to Flashbots</li>
            </ul>
            <strong>Strategies to explore:</strong>
            <ul>
                <li>Arbitrage</li>
                <li>Liquidations</li>
                <li>Long-tail MEV</li>
            </ul>
            <strong>Tech Stack:</strong> ethers.js, Flashbots SDK
            <strong>Warning:</strong> Highly competitive, requires significant capital
        `
    },
    {
        title: "Layer 2 Bridge",
        tags: ["advanced", "layer2", "bridge"],
        answer: `
            <p>Build a trustless bridge between L1 and an L2 rollup.</p>
            <strong>Learning Goals:</strong>
            <ul>
                <li>Cross-chain communication</li>
                <li>Merkle proof verification</li>
                <li>Challenge periods</li>
            </ul>
            <strong>Features:</strong>
            <ul>
                <li>Deposit on L1, receive on L2</li>
                <li>Withdraw with proof</li>
                <li>Handle optimistic verification</li>
                <li>Fast exit with liquidity providers</li>
            </ul>
            <strong>Tech Stack:</strong> Solidity (L1 & L2), SDK for L2
            <strong>Extension:</strong> Add NFT bridging, fast withdrawals, or multi-token support
        `
    },
    {
        title: "Account Abstraction Wallet (ERC-4337)",
        tags: ["advanced", "wallet", "aa"],
        answer: `
            <p>Implement an ERC-4337 compliant smart contract wallet.</p>
            <strong>Learning Goals:</strong>
            <ul>
                <li>UserOperation structure</li>
                <li>Bundler interaction</li>
                <li>Paymaster integration</li>
            </ul>
            <strong>Features:</strong>
            <ul>
                <li>Smart contract wallet</li>
                <li>Social recovery</li>
                <li>Session keys</li>
                <li>Gasless transactions via paymaster</li>
            </ul>
            <strong>Tech Stack:</strong> Solidity, ERC-4337 SDK (eth-infinitism)
            <strong>Extension:</strong> Add plugins, multi-sig, or spending limits
        `
    },
    {
        title: "Perpetual Futures DEX",
        tags: ["advanced", "defi", "derivatives"],
        answer: `
            <p>Create a decentralized perpetual futures exchange.</p>
            <strong>Learning Goals:</strong>
            <ul>
                <li>Funding rate mechanics</li>
                <li>Leverage and margin</li>
                <li>Liquidation engine</li>
            </ul>
            <strong>Features:</strong>
            <ul>
                <li>Open long/short positions</li>
                <li>Leverage up to 10-50x</li>
                <li>Funding rate calculation</li>
                <li>Partial/full liquidations</li>
            </ul>
            <strong>Challenges:</strong>
            <ul>
                <li>Oracle integration</li>
                <li>Insurance fund</li>
                <li>Position sizing</li>
            </ul>
            <strong>Tech Stack:</strong> Solidity, Chainlink, The Graph
        `
    },
    {
        title: "Optimistic Rollup (Simplified)",
        tags: ["advanced", "layer2", "rollup"],
        answer: `
            <p>Build a simplified optimistic rollup with fraud proofs.</p>
            <strong>Learning Goals:</strong>
            <ul>
                <li>State root management</li>
                <li>Fraud proof mechanics</li>
                <li>Challenge games</li>
            </ul>
            <strong>Features:</strong>
            <ul>
                <li>Batch transaction submission</li>
                <li>State root commitments</li>
                <li>Fraud proof verification</li>
                <li>Challenge/response protocol</li>
            </ul>
            <strong>Components:</strong>
            <ul>
                <li>L1 contract (state roots, deposits)</li>
                <li>Sequencer (batching)</li>
                <li>Verifier (fraud detection)</li>
            </ul>
            <strong>Tech Stack:</strong> Solidity, Node.js sequencer
        `
    },
    {
        title: "Algorithmic Stablecoin",
        tags: ["advanced", "defi", "stablecoin"],
        answer: `
            <p>Create an algorithmic stablecoin with stability mechanisms.</p>
            <strong>Learning Goals:</strong>
            <ul>
                <li>Monetary policy on-chain</li>
                <li>Collateralization models</li>
                <li>Stability mechanisms</li>
            </ul>
            <strong>Features:</strong>
            <ul>
                <li>Mint stablecoin with collateral</li>
                <li>Stability fee/interest</li>
                <li>Liquidation mechanism</li>
                <li>Governance for parameters</li>
            </ul>
            <strong>Warning:</strong> Algorithmic stablecoins are high-risk
            <strong>Study:</strong> MakerDAO, Frax, UST collapse
            <strong>Extension:</strong> Add PSM (Peg Stability Module), emergency shutdown
        `
    },
    {
        title: "Intent-Based Trading System",
        tags: ["advanced", "defi", "intents"],
        answer: `
            <p>Build a system where users sign intents that solvers compete to fulfill.</p>
            <strong>Learning Goals:</strong>
            <ul>
                <li>Intent architecture</li>
                <li>Solver competition</li>
                <li>Off-chain matching</li>
            </ul>
            <strong>Features:</strong>
            <ul>
                <li>Users sign swap intents</li>
                <li>Solvers find best execution</li>
                <li>On-chain settlement</li>
                <li>MEV protection for users</li>
            </ul>
            <strong>Inspired by:</strong> CoW Protocol, UniswapX
            <strong>Tech Stack:</strong> Solidity, EIP-712, solver backend
            <strong>Extension:</strong> Add batch auctions, solver reputation, or cross-chain intents
        `
    },
    {
        title: "Liquid Staking Derivative",
        tags: ["advanced", "defi", "staking"],
        answer: `
            <p>Create a liquid staking protocol like Lido for a PoS chain.</p>
            <strong>Learning Goals:</strong>
            <ul>
                <li>Staking pool management</li>
                <li>Derivative token mechanics</li>
                <li>Oracle for rewards</li>
            </ul>
            <strong>Features:</strong>
            <ul>
                <li>Stake ETH, receive stETH</li>
                <li>Rebase or reward-bearing token</li>
                <li>Withdrawal queue</li>
                <li>Node operator management</li>
            </ul>
            <strong>Tech Stack:</strong> Solidity, Beacon chain interaction
            <strong>Extension:</strong> Add insurance, distributed validators, or governance
        `
    },
    {
        title: "Decentralized Options Protocol",
        tags: ["advanced", "defi", "derivatives"],
        answer: `
            <p>Build a protocol for trading on-chain options.</p>
            <strong>Learning Goals:</strong>
            <ul>
                <li>Options pricing (Black-Scholes)</li>
                <li>Collateralization</li>
                <li>Settlement mechanics</li>
            </ul>
            <strong>Features:</strong>
            <ul>
                <li>Create call/put options</li>
                <li>European or American style</li>
                <li>Automated exercise at expiry</li>
                <li>Collateral management</li>
            </ul>
            <strong>Study:</strong> Opyn, Dopex, Lyra
            <strong>Tech Stack:</strong> Solidity, Chainlink, PRBMath
            <strong>Extension:</strong> Add exotic options, vaults, or AMM for options
        `
    },
    {
        title: "Cross-chain Messaging Protocol",
        tags: ["advanced", "crosschain", "messaging"],
        answer: `
            <p>Build a protocol for passing arbitrary messages between chains.</p>
            <strong>Learning Goals:</strong>
            <ul>
                <li>Message verification</li>
                <li>Relay networks</li>
                <li>Security models</li>
            </ul>
            <strong>Features:</strong>
            <ul>
                <li>Send messages between chains</li>
                <li>Verify message authenticity</li>
                <li>Execute arbitrary calls</li>
                <li>Handle failures gracefully</li>
            </ul>
            <strong>Inspired by:</strong> LayerZero, Axelar, Hyperlane
            <strong>Tech Stack:</strong> Solidity (multiple chains), relayer
            <strong>Extension:</strong> Add multi-chain governance, token transfers, or NFT bridging
        `
    },
    {
        title: "Fully On-chain Game (Complex)",
        tags: ["advanced", "gaming", "autonomous"],
        answer: `
            <p>Create a fully on-chain game with autonomous world mechanics.</p>
            <strong>Learning Goals:</strong>
            <ul>
                <li>On-chain game state</li>
                <li>Turn-based or time-based mechanics</li>
                <li>NFT integration for assets</li>
            </ul>
            <strong>Features:</strong>
            <ul>
                <li>All game logic on-chain</li>
                <li>Composable game entities</li>
                <li>Player-owned assets</li>
                <li>Emergent gameplay</li>
            </ul>
            <strong>Inspired by:</strong> Dark Forest, Loot, Realms
            <strong>Tech Stack:</strong> Solidity/Cairo, MUD/Dojo framework
            <strong>Extension:</strong> Add ZK fog of war, autonomous agents, or economic systems
        `
    },
    {
        title: "Privacy Pool (ZK Mixer)",
        tags: ["advanced", "privacy", "zk"],
        answer: `
            <p>Build a privacy-preserving transaction system using ZK proofs.</p>
            <strong>Learning Goals:</strong>
            <ul>
                <li>Nullifier/commitment scheme</li>
                <li>ZK proof generation</li>
                <li>Compliance considerations</li>
            </ul>
            <strong>Features:</strong>
            <ul>
                <li>Deposit with commitment</li>
                <li>Withdraw with ZK proof</li>
                <li>No link between deposit/withdrawal</li>
                <li>Merkle tree of commitments</li>
            </ul>
            <strong>Study:</strong> Tornado Cash (for educational purposes)
            <strong>Tech Stack:</strong> Circom, snarkjs, Solidity
            <strong>Legal note:</strong> Be aware of regulatory requirements
            <strong>Extension:</strong> Add compliance proofs, shielded transfers, or multi-asset
        `
    }
];

// Export for use in main data.js
if (typeof module !== 'undefined' && module.exports) {
    module.exports = projectQuestions;
}