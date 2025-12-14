// Basic Web3 Questions - Cryptocurrency Basics
const basicCryptocurrency = [
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
    {
        title: "What is a token burn?",
        tags: ["cryptocurrency", "tokens", "difficulty-basic"],
        answer: `
            <p><strong>Token burning</strong> is the permanent removal of tokens from circulation, typically by sending them to an inaccessible address.</p>
            <strong>How it works:</strong>
            <ul>
                <li>Tokens are sent to a "burn address" (no private key)</li>
                <li>These tokens can never be recovered or used</li>
                <li>Reduces total supply</li>
            </ul>
            <strong>Reasons for burning:</strong>
            <ul>
                <li>Create deflationary pressure</li>
                <li>Increase scarcity and potential value</li>
                <li>Part of tokenomics (EIP-1559 burns ETH)</li>
                <li>Remove unsold ICO tokens</li>
            </ul>
        `
    },
    {
        title: "What is tokenomics?",
        tags: ["cryptocurrency", "tokens", "difficulty-basic"],
        answer: `
            <p><strong>Tokenomics</strong> (token economics) refers to the study of how a cryptocurrency token is designed, distributed, and managed.</p>
            <strong>Key components:</strong>
            <ul>
                <li><strong>Supply:</strong> Total, circulating, max supply</li>
                <li><strong>Distribution:</strong> How tokens are allocated (team, investors, community)</li>
                <li><strong>Emission:</strong> How new tokens are created</li>
                <li><strong>Utility:</strong> What the token is used for</li>
                <li><strong>Incentives:</strong> Staking rewards, governance rights</li>
                <li><strong>Vesting:</strong> Lock-up periods for team/investors</li>
            </ul>
            <p>Good tokenomics is essential for a project's long-term success.</p>
        `
    },
    {
        title: "What is a cryptocurrency exchange?",
        tags: ["cryptocurrency", "trading", "difficulty-basic"],
        answer: `
            <p>A <strong>cryptocurrency exchange</strong> is a platform where users can buy, sell, and trade cryptocurrencies.</p>
            <strong>Types of exchanges:</strong>
            <ul>
                <li><strong>Centralized (CEX):</strong> Coinbase, Binance, Kraken</li>
                <li><strong>Decentralized (DEX):</strong> Uniswap, SushiSwap, dYdX</li>
                <li><strong>Hybrid:</strong> Combines features of both</li>
            </ul>
            <strong>Exchange services:</strong>
            <ul>
                <li>Spot trading (buy/sell at current price)</li>
                <li>Margin/futures trading</li>
                <li>Staking services</li>
                <li>Fiat on/off ramps</li>
            </ul>
        `
    },
    {
        title: "What is the difference between CEX and DEX?",
        tags: ["cryptocurrency", "trading", "defi", "difficulty-basic"],
        answer: `
            <p><strong>CEX</strong> (Centralized Exchange) and <strong>DEX</strong> (Decentralized Exchange) differ in their architecture and trust models.</p>
            <table>
                <tr><th>Aspect</th><th>CEX</th><th>DEX</th></tr>
                <tr><td>Custody</td><td>Exchange holds funds</td><td>User controls funds</td></tr>
                <tr><td>KYC</td><td>Usually required</td><td>Not required</td></tr>
                <tr><td>Speed</td><td>Fast (off-chain)</td><td>Blockchain speed</td></tr>
                <tr><td>Liquidity</td><td>Generally higher</td><td>Can be fragmented</td></tr>
                <tr><td>Trust</td><td>Trust the company</td><td>Trust the code</td></tr>
                <tr><td>Fiat support</td><td>Yes</td><td>No (usually)</td></tr>
            </table>
        `
    },
    {
        title: "What is a trading pair?",
        tags: ["cryptocurrency", "trading", "difficulty-basic"],
        answer: `
            <p>A <strong>trading pair</strong> represents two cryptocurrencies that can be exchanged for each other.</p>
            <strong>Examples:</strong>
            <ul>
                <li><strong>BTC/USDT:</strong> Trade Bitcoin for Tether</li>
                <li><strong>ETH/BTC:</strong> Trade Ethereum for Bitcoin</li>
                <li><strong>UNI/ETH:</strong> Trade Uniswap token for Ethereum</li>
            </ul>
            <strong>Terminology:</strong>
            <ul>
                <li><strong>Base currency:</strong> First in pair (what you're buying/selling)</li>
                <li><strong>Quote currency:</strong> Second in pair (what you're paying with)</li>
            </ul>
            <p>BTC/USDT at 50,000 means 1 BTC = 50,000 USDT</p>
        `
    },
    {
        title: "What is cryptocurrency volatility?",
        tags: ["cryptocurrency", "trading", "difficulty-basic"],
        answer: `
            <p><strong>Volatility</strong> measures how much a cryptocurrency's price fluctuates over time.</p>
            <strong>Causes of crypto volatility:</strong>
            <ul>
                <li>Smaller market cap compared to traditional assets</li>
                <li>24/7 trading (no market close)</li>
                <li>Speculative nature</li>
                <li>Regulatory news and uncertainty</li>
                <li>Market manipulation (whales)</li>
                <li>Technological developments</li>
            </ul>
            <strong>Managing volatility:</strong>
            <ul>
                <li>Dollar-cost averaging (DCA)</li>
                <li>Diversification</li>
                <li>Stablecoins for stability</li>
                <li>Long-term holding (HODLing)</li>
            </ul>
        `
    },
    {
        title: "What is HODL?",
        tags: ["cryptocurrency", "culture", "difficulty-basic"],
        answer: `
            <p><strong>HODL</strong> is crypto slang for "hold" - the strategy of holding cryptocurrency long-term despite price volatility.</p>
            <strong>Origin:</strong>
            <ul>
                <li>Started as a typo in a 2013 Bitcoin forum post</li>
                <li>Later backronymed to "Hold On for Dear Life"</li>
            </ul>
            <strong>HODL philosophy:</strong>
            <ul>
                <li>Don't panic sell during dips</li>
                <li>Believe in long-term value</li>
                <li>Avoid emotional trading</li>
                <li>Time in market > timing the market</li>
            </ul>
        `
    },
    {
        title: "What is a whale in crypto?",
        tags: ["cryptocurrency", "trading", "difficulty-basic"],
        answer: `
            <p>A <strong>whale</strong> is an individual or entity that holds a large amount of cryptocurrency, enough to potentially influence market prices.</p>
            <strong>Whale characteristics:</strong>
            <ul>
                <li>Hold thousands of BTC or equivalent</li>
                <li>Can move markets with large trades</li>
                <li>Often watched by analysts for market signals</li>
            </ul>
            <strong>Whale watching:</strong>
            <ul>
                <li>Track large wallet movements</li>
                <li>Monitor exchange deposits/withdrawals</li>
                <li>Tools: Whale Alert, on-chain analytics</li>
            </ul>
            <strong>Impact:</strong> Large whale sales can cause price drops; large buys can cause pumps.
        `
    }
];

// Export for use in main data file
if (typeof module !== 'undefined' && module.exports) {
    module.exports = basicCryptocurrency;
}