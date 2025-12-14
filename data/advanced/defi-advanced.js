// Advanced Web3 Questions - Advanced DeFi Concepts
const advancedDefi = [
    {
        title: "How do Automated Market Makers (AMMs) work mathematically?",
        tags: ["defi", "amm", "difficulty-advanced"],
        answer: `
            <p>AMMs use mathematical formulas to determine token prices and enable permissionless trading.</p>
            <strong>Constant Product (Uniswap V2):</strong>
            <pre><code>x * y = k
// x = reserve of token A
// y = reserve of token B  
// k = constant (invariant)

// Price of A in terms of B
Price = y / x

// For a swap of Δx tokens A:
Δy = y - (k / (x + Δx))</code></pre>
            <strong>Constant Sum:</strong>
            <pre><code>x + y = k
// Fixed price, limited use (runs out of tokens)</code></pre>
            <strong>StableSwap (Curve):</strong>
            <pre><code>// Combines constant product and constant sum
// Optimized for assets that should be equal value
An^n * sum(xi) + D = ADn^n + D^(n+1) / (n^n * prod(xi))</code></pre>
            <strong>Concentrated Liquidity (Uniswap V3):</strong>
            <ul>
                <li>LPs provide liquidity in price ranges</li>
                <li>Virtual reserves within each range</li>
                <li>Tick-based price system</li>
            </ul>
        `
    },
    {
        title: "What is impermanent loss and how is it calculated?",
        tags: ["defi", "amm", "difficulty-advanced"],
        answer: `
            <p><strong>Impermanent loss (IL)</strong> is the difference between holding tokens in an AMM vs simply holding them.</p>
            <strong>Formula:</strong>
            <pre><code>IL = 2 * sqrt(price_ratio) / (1 + price_ratio) - 1

// Where price_ratio = new_price / old_price

// Examples:
1.25x price change → 0.6% IL
1.50x price change → 2.0% IL
2x price change → 5.7% IL  
3x price change → 13.4% IL
5x price change → 25.5% IL</code></pre>
            <strong>Why it happens:</strong>
            <ul>
                <li>Arbitrageurs rebalance pool as prices change</li>
                <li>You end up with more of the depreciated asset</li>
                <li>Less of the appreciated asset</li>
            </ul>
            <strong>Mitigation:</strong>
            <ul>
                <li>Provide to correlated pairs</li>
                <li>Earn enough fees to offset IL</li>
                <li>Use concentrated liquidity carefully</li>
            </ul>
        `
    },
    {
        title: "How do liquidations work in lending protocols?",
        tags: ["defi", "lending", "difficulty-advanced"],
        answer: `
            <p><strong>Liquidation</strong> occurs when a borrower's collateral value falls below the required threshold.</p>
            <strong>Key metrics:</strong>
            <pre><code>Health Factor = (Collateral Value * Liquidation Threshold) / Debt

// If Health Factor < 1 → Liquidatable

LTV (Loan-to-Value) = Debt / Collateral
Liquidation Threshold = Max LTV before liquidation

// Example (Aave):
// ETH: 80% LTV, 82.5% Liquidation Threshold
// Deposit $10,000 ETH
// Max borrow: $8,000
// Liquidation when debt > $8,250 value of collateral</code></pre>
            <strong>Liquidation process:</strong>
            <ol>
                <li>Liquidator repays portion of debt</li>
                <li>Receives collateral at discount (liquidation bonus)</li>
                <li>Protocol takes small fee</li>
                <li>Borrower's position is partially closed</li>
            </ol>
            <strong>Liquidation bonus:</strong> Typically 5-15% incentive for liquidators
        `
    },
    {
        title: "What are flash loans and how do they work technically?",
        tags: ["defi", "flash-loans", "difficulty-advanced"],
        answer: `
            <p><strong>Flash loans</strong> are uncollateralized loans that must be borrowed and repaid within a single transaction.</p>
            <strong>Technical implementation:</strong>
            <pre><code class="language-solidity">// Aave Flash Loan
contract FlashLoanReceiver is IFlashLoanReceiver {
    function executeOperation(
        address[] calldata assets,
        uint256[] calldata amounts,
        uint256[] calldata premiums,
        address initiator,
        bytes calldata params
    ) external override returns (bool) {
        // 1. You have the borrowed funds here
        uint256 borrowed = amounts[0];
        
        // 2. Do something profitable
        // - Arbitrage
        // - Collateral swap
        // - Self-liquidation
        
        // 3. Approve repayment
        uint256 amountOwed = amounts[0] + premiums[0];
        IERC20(assets[0]).approve(address(POOL), amountOwed);
        
        return true;
    }
    
    function requestFlashLoan(address asset, uint256 amount) external {
        address[] memory assets = new address[](1);
        assets[0] = asset;
        // ... initiate flash loan
    }
}</code></pre>
            <strong>Fees:</strong> Typically 0.05-0.3% of borrowed amount
        `
    },
    {
        title: "What is MEV (Maximal Extractable Value)?",
        tags: ["mev", "defi", "difficulty-advanced"],
        answer: `
            <p><strong>MEV</strong> is the maximum value that can be extracted from block production beyond standard rewards.</p>
            <strong>Types of MEV:</strong>
            <ul>
                <li><strong>Arbitrage:</strong> Price differences between DEXs</li>
                <li><strong>Liquidations:</strong> Claiming liquidation bonuses</li>
                <li><strong>Sandwich attacks:</strong> Front and back-running trades</li>
                <li><strong>JIT liquidity:</strong> Providing liquidity just for one trade</li>
            </ul>
            <strong>MEV supply chain:</strong>
            <pre><code>Searchers → Builders → Validators
    ↓           ↓           ↓
Find MEV    Bundle txs    Include blocks</code></pre>
            <strong>MEV Protection:</strong>
            <ul>
                <li><strong>Flashbots Protect:</strong> Private transaction submission</li>
                <li><strong>MEV Blocker:</strong> Rebates from backrunning</li>
                <li><strong>CoW Protocol:</strong> Batch auctions</li>
            </ul>
            <strong>Stats:</strong> MEV extraction has exceeded $600M+ on Ethereum
        `
    },
    {
        title: "How do bridges work technically?",
        tags: ["bridges", "crosschain", "difficulty-advanced"],
        answer: `
            <p><strong>Bridges</strong> transfer assets between blockchains using various trust models.</p>
            <strong>Lock and Mint Pattern:</strong>
            <pre><code class="language-solidity">// Source Chain (Lock)
contract SourceBridge {
    function lock(address token, uint256 amount, uint256 destChainId) external {
        IERC20(token).transferFrom(msg.sender, address(this), amount);
        emit Locked(msg.sender, token, amount, destChainId);
    }
}

// Destination Chain (Mint)
contract DestBridge {
    function mint(
        address user, address token, uint256 amount, 
        bytes memory proof
    ) external {
        require(verifyProof(proof), "Invalid proof");
        wrappedToken.mint(user, amount);
    }
}</code></pre>
            <strong>Bridge types:</strong>
            <ul>
                <li><strong>Trusted:</strong> Multisig validators (fast, centralized)</li>
                <li><strong>Light client:</strong> Verify proofs on-chain (trustless, expensive)</li>
                <li><strong>Optimistic:</strong> Fraud proofs with challenge period</li>
                <li><strong>ZK:</strong> Validity proofs (trustless, complex)</li>
            </ul>
            <strong>Risks:</strong> Bridge hacks account for $2B+ in losses
        `
    },
    {
        title: "What are ERC-4626 tokenized vaults?",
        tags: ["tokens", "defi", "difficulty-advanced"],
        answer: `
            <p><strong>ERC-4626</strong> is a standard for tokenized vaults, providing a consistent interface for yield-bearing tokens.</p>
            <strong>Core functions:</strong>
            <pre><code class="language-solidity">interface IERC4626 is IERC20 {
    // Asset info
    function asset() external view returns (address);
    function totalAssets() external view returns (uint256);
    
    // Deposit/Withdraw
    function deposit(uint256 assets, address receiver) 
        external returns (uint256 shares);
    function withdraw(uint256 assets, address receiver, address owner) 
        external returns (uint256 shares);
    function redeem(uint256 shares, address receiver, address owner) 
        external returns (uint256 assets);
    
    // Conversion
    function convertToShares(uint256 assets) external view returns (uint256);
    function convertToAssets(uint256 shares) external view returns (uint256);
    
    // Preview
    function previewDeposit(uint256 assets) external view returns (uint256);
    function previewMint(uint256 shares) external view returns (uint256);
    function previewWithdraw(uint256 assets) external view returns (uint256);
    function previewRedeem(uint256 shares) external view returns (uint256);
}</code></pre>
            <strong>Benefits:</strong>
            <ul>
                <li>Composability across DeFi</li>
                <li>Standardized yield calculation</li>
                <li>Easier integrations</li>
            </ul>
        `
    },
    {
        title: "How do perpetual futures work on-chain?",
        tags: ["defi", "derivatives", "difficulty-advanced"],
        answer: `
            <p><strong>Perpetual futures</strong> are derivatives with no expiry that track underlying asset prices via funding rates.</p>
            <strong>Funding rate mechanism:</strong>
            <pre><code>// If perp price > spot price:
// Longs pay shorts → incentivizes shorting → price decreases

// If perp price < spot price:
// Shorts pay longs → incentivizes longing → price increases

Funding Rate = (Perp Price - Spot Price) / Spot Price * Factor
// Paid every 8 hours typically</code></pre>
            <strong>Key components:</strong>
            <ul>
                <li><strong>Margin:</strong> Collateral deposited</li>
                <li><strong>Leverage:</strong> Position size / margin (1x-100x)</li>
                <li><strong>Liquidation price:</strong> When losses exceed margin</li>
                <li><strong>Mark price:</strong> Fair price for liquidations</li>
            </ul>
            <strong>Protocols:</strong> dYdX, GMX, Perpetual Protocol, Gains Network
        `
    },
    {
        title: "What is veTokenomics?",
        tags: ["defi", "governance", "tokenomics", "difficulty-advanced"],
        answer: `
            <p><strong>veTokenomics</strong> (vote-escrowed tokenomics) locks tokens for governance power and rewards.</p>
            <strong>How it works:</strong>
            <pre><code>// Lock TOKEN for 1-4 years
// Receive veTOKEN based on lock duration

veTOKEN = TOKEN * (lock_duration / max_duration)

// 100 TOKEN locked for 4 years = 100 veTOKEN
// 100 TOKEN locked for 1 year = 25 veTOKEN

// veTOKEN decreases linearly as lock expires</code></pre>
            <strong>Benefits of veTOKEN:</strong>
            <ul>
                <li>Governance voting power</li>
                <li>Boosted rewards</li>
                <li>Protocol revenue share</li>
                <li>Gauge weight voting (direct emissions)</li>
            </ul>
            <strong>Examples:</strong>
            <ul>
                <li><strong>veCRV:</strong> Curve Finance</li>
                <li><strong>veBAL:</strong> Balancer</li>
                <li><strong>veFXS:</strong> Frax</li>
            </ul>
        `
    },
    {
        title: "How do liquidity gauges and bribes work?",
        tags: ["defi", "governance", "difficulty-advanced"],
        answer: `
            <p><strong>Liquidity gauges</strong> direct token emissions to pools based on governance votes. <strong>Bribes</strong> are incentives to vote for specific pools.</p>
            <strong>Gauge voting system:</strong>
            <pre><code>// Each epoch (week), veTOKEN holders vote
// Votes determine emission distribution

Pool A gets 30% of votes → 30% of emissions
Pool B gets 50% of votes → 50% of emissions
Pool C gets 20% of votes → 20% of emissions</code></pre>
            <strong>Bribe markets:</strong>
            <ol>
                <li>Protocols want emissions for their pools</li>
                <li>They bribe veTOKEN holders to vote for their gauge</li>
                <li>Voters receive bribes + their regular rewards</li>
            </ol>
            <strong>Economics:</strong>
            <pre><code>// If $1 of bribe directs $2 of emissions
// ROI for briber: 100%
// Voter earns bribe + regular APR</code></pre>
            <strong>Bribe platforms:</strong> Votium, Warden, Hidden Hand
        `
    },
    {
        title: "What are Merkle trees and how are they used in DeFi?",
        tags: ["cryptography", "defi", "difficulty-advanced"],
        answer: `
            <p><strong>Merkle trees</strong> are data structures that enable efficient and secure verification of large datasets.</p>
            <strong>Structure:</strong>
            <pre><code>        [Root Hash]
           /    \\
      [AB]        [CD]
      /  \\        /  \\
    [A]  [B]    [C]  [D]
     ↓    ↓      ↓    ↓
   Leaf  Leaf  Leaf  Leaf</code></pre>
            <strong>DeFi applications:</strong>
            <ul>
                <li><strong>Airdrops:</strong> Merkle proofs for claiming</li>
                <li><strong>Rollups:</strong> State roots for verification</li>
                <li><strong>Whitelist mints:</strong> Prove address is included</li>
            </ul>
            <pre><code class="language-solidity">function claim(
    uint256 index,
    address account,
    uint256 amount,
    bytes32[] calldata merkleProof
) external {
    bytes32 node = keccak256(abi.encodePacked(index, account, amount));
    require(MerkleProof.verify(merkleProof, merkleRoot, node), "Invalid proof");
    // Process claim...
}</code></pre>
            <strong>Benefits:</strong> O(log n) proof size, O(log n) verification
        `
    },
    {
        title: "How does Uniswap V3 concentrated liquidity work?",
        tags: ["defi", "amm", "difficulty-advanced"],
        answer: `
            <p><strong>Concentrated liquidity</strong> allows LPs to provide liquidity within custom price ranges.</p>
            <strong>Tick system:</strong>
            <pre><code>// Price at tick i:
price(i) = 1.0001^i

// Tick spacing depends on fee tier:
// 0.05% fee → 10 tick spacing
// 0.30% fee → 60 tick spacing
// 1.00% fee → 200 tick spacing

// Position defined by:
// - Lower tick
// - Upper tick  
// - Liquidity amount</code></pre>
            <strong>Virtual liquidity:</strong>
            <ul>
                <li>Within range: position acts like infinite liquidity</li>
                <li>Outside range: position is all one token, earns nothing</li>
                <li>Capital efficiency: up to 4000x vs V2</li>
            </ul>
            <strong>LP NFTs:</strong> Each position is a unique NFT with:
            <ul>
                <li>Pool address</li>
                <li>Tick range</li>
                <li>Liquidity amount</li>
                <li>Fees earned</li>
            </ul>
        `
    },
    {
        title: "What is an intent-based trading system?",
        tags: ["defi", "trading", "difficulty-advanced"],
        answer: `
            <p><strong>Intent-based trading</strong> separates what users want (intent) from how it's executed.</p>
            <strong>How it works:</strong>
            <pre><code>// User signs intent (not transaction):
Intent {
    sellToken: USDC,
    buyToken: ETH,
    sellAmount: 1000,
    minBuyAmount: 0.5,  // Slippage protection
    deadline: timestamp,
    signature: ...
}

// Solvers compete to fill:
// - Find best execution path
// - May use multiple DEXs
// - Can batch with other intents</code></pre>
            <strong>Benefits:</strong>
            <ul>
                <li>MEV protection (private submission)</li>
                <li>Better prices (solver competition)</li>
                <li>Gasless for users (solver pays)</li>
                <li>Cross-chain capable</li>
            </ul>
            <strong>Protocols:</strong> CoW Protocol, UniswapX, 1inch Fusion
        `
    },
    {
        title: "How do options protocols work on-chain?",
        tags: ["defi", "derivatives", "difficulty-advanced"],
        answer: `
            <p><strong>On-chain options</strong> provide the right (not obligation) to buy/sell at a strike price.</p>
            <strong>Option types:</strong>
            <ul>
                <li><strong>Call:</strong> Right to buy at strike price</li>
                <li><strong>Put:</strong> Right to sell at strike price</li>
                <li><strong>European:</strong> Exercise only at expiry</li>
                <li><strong>American:</strong> Exercise anytime before expiry</li>
            </ul>
            <strong>Pricing (Black-Scholes on-chain is complex):</strong>
            <pre><code>// Simplified factors:
Option Price = Intrinsic Value + Time Value

Intrinsic (Call) = max(0, Spot - Strike)
Intrinsic (Put) = max(0, Strike - Spot)

Time Value depends on:
- Time to expiry
- Volatility
- Interest rates</code></pre>
            <strong>Collateralization:</strong>
            <ul>
                <li>Covered calls: Lock underlying asset</li>
                <li>Cash-secured puts: Lock strike amount</li>
                <li>Spreads: Partially collateralized</li>
            </ul>
            <strong>Protocols:</strong> Opyn, Dopex, Lyra, Hegic
        `
    }
];

// Export for use in main data file
if (typeof module !== 'undefined' && module.exports) {
    module.exports = advancedDefi;
}