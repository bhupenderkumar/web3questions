// Advanced Web3 Questions - Security, Layer 2, MEV, Cryptography - 55 questions total
const advancedQuestions = [
    // ==================== SMART CONTRACT SECURITY (15 questions) ====================
    {
        title: "What is a reentrancy attack?",
        tags: ["security", "vulnerability", "difficulty-advanced"],
        answer: `
            <p>A <strong>reentrancy attack</strong> occurs when a malicious contract calls back into the calling contract before the first execution is complete, potentially draining funds.</p>
            <strong>The DAO Hack Example (2016):</strong>
            <pre><code class="language-solidity">// Vulnerable contract
contract Vault {
    mapping(address => uint) balances;
    
    function withdraw() external {
        uint bal = balances[msg.sender];
        (bool success, ) = msg.sender.call{value: bal}("");
        require(success);
        balances[msg.sender] = 0; // Updated AFTER external call!
    }
}

// Attacker contract
contract Attacker {
    Vault vault;
    
    receive() external payable {
        if (address(vault).balance >= 1 ether) {
            vault.withdraw(); // Re-enter before balance is zeroed
        }
    }
}</code></pre>
            <strong>Prevention:</strong>
            <ul>
                <li><strong>Checks-Effects-Interactions pattern:</strong> Update state before external calls</li>
                <li><strong>ReentrancyGuard:</strong> Use OpenZeppelin's nonReentrant modifier</li>
                <li><strong>Pull over Push:</strong> Let users withdraw rather than sending to them</li>
            </ul>
        `
    },
    {
        title: "What is the Checks-Effects-Interactions pattern?",
        tags: ["security", "best-practices", "difficulty-advanced"],
        answer: `
            <p>The <strong>Checks-Effects-Interactions</strong> pattern is a secure coding pattern that prevents reentrancy attacks.</p>
            <strong>Pattern breakdown:</strong>
            <ol>
                <li><strong>Checks:</strong> Validate all conditions and inputs</li>
                <li><strong>Effects:</strong> Update all state variables</li>
                <li><strong>Interactions:</strong> Make external calls last</li>
            </ol>
            <pre><code class="language-solidity">// SECURE: Checks-Effects-Interactions
function withdraw(uint amount) external {
    // 1. CHECKS
    require(balances[msg.sender] >= amount, "Insufficient balance");
    
    // 2. EFFECTS (state changes BEFORE external call)
    balances[msg.sender] -= amount;
    
    // 3. INTERACTIONS (external call LAST)
    (bool success, ) = msg.sender.call{value: amount}("");
    require(success, "Transfer failed");
}</code></pre>
            <strong>Why it works:</strong> Even if the recipient calls back, the balance is already updated
        `
    },
    {
        title: "What is integer overflow and underflow?",
        tags: ["security", "vulnerability", "difficulty-advanced"],
        answer: `
            <p><strong>Integer overflow/underflow</strong> occurs when arithmetic operations exceed the variable's range, wrapping around to unexpected values.</p>
            <strong>Example (pre-Solidity 0.8.0):</strong>
            <pre><code class="language-solidity">// uint8 max value is 255
uint8 a = 255;
a = a + 1; // Overflow: a becomes 0!

uint8 b = 0;
b = b - 1; // Underflow: b becomes 255!</code></pre>
            <strong>Real-world impact:</strong>
            <ul>
                <li>BatchOverflow attack (2018) created unlimited tokens</li>
                <li>Beauty Chain (BEC) lost millions</li>
            </ul>
            <strong>Prevention:</strong>
            <ul>
                <li><strong>Solidity 0.8.0+:</strong> Built-in overflow/underflow checks</li>
                <li><strong>Pre-0.8.0:</strong> Use SafeMath library</li>
                <li>Use unchecked {} only when you're certain overflow is impossible</li>
            </ul>
        `
    },
    {
        title: "What is front-running?",
        tags: ["security", "mev", "difficulty-advanced"],
        answer: `
            <p><strong>Front-running</strong> is when someone sees a pending transaction and submits their own transaction with a higher gas price to execute first.</p>
            <strong>How it works:</strong>
            <ol>
                <li>Attacker monitors mempool for profitable transactions</li>
                <li>Sees a large DEX trade or arbitrage opportunity</li>
                <li>Submits same or similar transaction with higher gas</li>
                <li>Profits at the expense of the original user</li>
            </ol>
            <strong>Types:</strong>
            <ul>
                <li><strong>Displacement:</strong> Attacker's tx replaces victim's</li>
                <li><strong>Sandwich attack:</strong> Buy before, sell after victim's trade</li>
                <li><strong>Insertion:</strong> Attacker inserts tx between others</li>
            </ul>
            <strong>Prevention:</strong>
            <ul>
                <li>Commit-reveal schemes</li>
                <li>Private mempools (Flashbots Protect)</li>
                <li>Submarine sends</li>
                <li>Use DEX aggregators with MEV protection</li>
            </ul>
        `
    },
    {
        title: "What is a sandwich attack?",
        tags: ["security", "mev", "difficulty-advanced"],
        answer: `
            <p>A <strong>sandwich attack</strong> is a type of front-running where an attacker places orders before and after a victim's trade to profit from the price impact.</p>
            <strong>Attack flow:</strong>
            <ol>
                <li>Attacker sees victim's large buy order in mempool</li>
                <li>Attacker front-runs with their own buy (raises price)</li>
                <li>Victim's trade executes at worse price</li>
                <li>Attacker back-runs with sell (profits from price increase)</li>
            </ol>
            <pre><code>Before attack: ETH price = $2000
Attacker buys: ETH price → $2010
Victim buys:   ETH price → $2020 (pays more)
Attacker sells: Profit = $10 per ETH (minus gas)</code></pre>
            <strong>Protection:</strong>
            <ul>
                <li>Set tight slippage tolerance</li>
                <li>Use private transaction services</li>
                <li>Break large trades into smaller ones</li>
                <li>Use MEV-aware DEXs (CoW Swap)</li>
            </ul>
        `
    },
    {
        title: "What is a flash loan attack?",
        tags: ["security", "defi", "difficulty-advanced"],
        answer: `
            <p>A <strong>flash loan attack</strong> uses uncollateralized flash loans to exploit vulnerabilities, manipulate prices, or drain protocols.</p>
            <strong>Common attack vectors:</strong>
            <ul>
                <li><strong>Price oracle manipulation:</strong> Temporarily skew on-chain prices</li>
                <li><strong>Governance attacks:</strong> Borrow tokens to pass proposals</li>
                <li><strong>Arbitrage exploitation:</strong> Exploit protocol inefficiencies</li>
            </ul>
            <strong>Example attack flow:</strong>
            <ol>
                <li>Borrow $10M in flash loan</li>
                <li>Manipulate token price on DEX</li>
                <li>Exploit protocol using manipulated price</li>
                <li>Extract profit</li>
                <li>Repay flash loan + fee</li>
            </ol>
            <strong>Notable attacks:</strong> bZx ($1M), Harvest Finance ($34M), Cream Finance ($130M)
            <strong>Prevention:</strong> Use time-weighted average prices (TWAP), decentralized oracles like Chainlink
        `
    },
    {
        title: "What is access control in smart contracts?",
        tags: ["security", "best-practices", "difficulty-advanced"],
        answer: `
            <p><strong>Access control</strong> ensures only authorized users can execute sensitive functions.</p>
            <strong>Common patterns:</strong>
            <pre><code class="language-solidity">// Simple ownership
contract Owned {
    address public owner;
    modifier onlyOwner() {
        require(msg.sender == owner, "Not owner");
        _;
    }
}

// Role-based access control
import "@openzeppelin/contracts/access/AccessControl.sol";

contract MyContract is AccessControl {
    bytes32 public constant MINTER_ROLE = keccak256("MINTER_ROLE");
    bytes32 public constant PAUSER_ROLE = keccak256("PAUSER_ROLE");
    
    function mint(address to) external onlyRole(MINTER_ROLE) {
        // Only minters can call
    }
    
    function pause() external onlyRole(PAUSER_ROLE) {
        // Only pausers can call
    }
}</code></pre>
            <strong>Best practices:</strong>
            <ul>
                <li>Use OpenZeppelin's AccessControl or Ownable</li>
                <li>Implement multi-sig for critical functions</li>
                <li>Add timelocks for admin actions</li>
                <li>Emit events for all access changes</li>
            </ul>
        `
    },
    {
        title: "What is a proxy contract vulnerability?",
        tags: ["security", "upgrades", "difficulty-advanced"],
        answer: `
            <p><strong>Proxy contracts</strong> enable upgradeable smart contracts but introduce unique security risks.</p>
            <strong>Common vulnerabilities:</strong>
            <ul>
                <li><strong>Storage collision:</strong> Proxy and implementation storage overlap</li>
                <li><strong>Function selector clash:</strong> Proxy function shadows implementation</li>
                <li><strong>Uninitialized implementation:</strong> Attacker can initialize</li>
                <li><strong>Delegatecall to untrusted contract</strong></li>
            </ul>
            <pre><code class="language-solidity">// Storage collision example
contract Proxy {
    address public implementation; // Slot 0
}

contract Implementation {
    address public owner; // Also slot 0 - COLLISION!
}</code></pre>
            <strong>Prevention:</strong>
            <ul>
                <li>Use EIP-1967 storage slots</li>
                <li>Use OpenZeppelin's proxy patterns</li>
                <li>Always initialize implementations</li>
                <li>Use initializer modifier to prevent re-initialization</li>
            </ul>
        `
    },
    {
        title: "What is tx.origin vulnerability?",
        tags: ["security", "vulnerability", "difficulty-advanced"],
        answer: `
            <p>Using <strong>tx.origin</strong> for authorization is dangerous because it returns the original sender, not the immediate caller.</p>
            <strong>Vulnerable code:</strong>
            <pre><code class="language-solidity">contract Wallet {
    address public owner;
    
    function transfer(address to, uint amount) public {
        require(tx.origin == owner); // VULNERABLE!
        payable(to).transfer(amount);
    }
}

// Attacker contract
contract Phishing {
    Wallet wallet;
    address attacker;
    
    function attack() public {
        // If owner calls this, tx.origin is still owner
        wallet.transfer(attacker, wallet.balance);
    }
}</code></pre>
            <strong>Attack scenario:</strong>
            <ol>
                <li>Owner is tricked into calling malicious contract</li>
                <li>Malicious contract calls wallet.transfer()</li>
                <li>tx.origin is still the owner, so check passes</li>
                <li>Funds stolen</li>
            </ol>
            <strong>Fix:</strong> Always use msg.sender for authorization
        `
    },
    {
        title: "What is a denial of service (DoS) attack on smart contracts?",
        tags: ["security", "vulnerability", "difficulty-advanced"],
        answer: `
            <p>A <strong>DoS attack</strong> makes a contract unusable by blocking legitimate operations.</p>
            <strong>Common DoS vectors:</strong>
            <ul>
                <li><strong>Unbounded loops:</strong> Gas limit prevents completion</li>
                <li><strong>External call failures:</strong> One failing call blocks all</li>
                <li><strong>Block gas limit:</strong> Operation exceeds block limit</li>
            </ul>
            <pre><code class="language-solidity">// Vulnerable: External call can block refunds
function refundAll() external {
    for (uint i = 0; i < users.length; i++) {
        // If one transfer fails, all fail
        payable(users[i]).transfer(balances[users[i]]);
    }
}

// Better: Pull pattern
function withdraw() external {
    uint amount = balances[msg.sender];
    balances[msg.sender] = 0;
    payable(msg.sender).transfer(amount);
}</code></pre>
            <strong>Prevention:</strong>
            <ul>
                <li>Use pull over push for payments</li>
                <li>Limit array operations</li>
                <li>Handle external call failures gracefully</li>
            </ul>
        `
    },
    {
        title: "What are oracle manipulation attacks?",
        tags: ["security", "oracles", "difficulty-advanced"],
        answer: `
            <p><strong>Oracle manipulation</strong> attacks exploit price feeds to trick DeFi protocols into making incorrect calculations.</p>
            <strong>Attack vectors:</strong>
            <ul>
                <li><strong>Spot price manipulation:</strong> Flash loan to temporarily move DEX prices</li>
                <li><strong>Low liquidity exploitation:</strong> Easier to manipulate thin markets</li>
                <li><strong>Stale data:</strong> Using outdated oracle prices</li>
            </ul>
            <strong>Example:</strong>
            <pre><code class="language-solidity">// VULNERABLE: Using spot price
function getPrice() public view returns (uint) {
    (uint reserve0, uint reserve1,) = pair.getReserves();
    return reserve1 * 1e18 / reserve0; // Easily manipulated!
}

// SECURE: Using TWAP or Chainlink
function getPrice() public view returns (uint) {
    (, int price,,,) = priceFeed.latestRoundData();
    return uint(price);
}</code></pre>
            <strong>Prevention:</strong>
            <ul>
                <li>Use Chainlink or other decentralized oracles</li>
                <li>Implement TWAP (Time-Weighted Average Price)</li>
                <li>Add price deviation checks</li>
                <li>Use multiple oracle sources</li>
            </ul>
        `
    },
    {
        title: "What is signature replay attack?",
        tags: ["security", "cryptography", "difficulty-advanced"],
        answer: `
            <p>A <strong>signature replay attack</strong> reuses a valid signature in an unintended context.</p>
            <strong>Types:</strong>
            <ul>
                <li><strong>Same-chain replay:</strong> Reuse signature on same contract</li>
                <li><strong>Cross-chain replay:</strong> Use signature on different chain</li>
                <li><strong>Cross-contract replay:</strong> Use signature on different contract</li>
            </ul>
            <pre><code class="language-solidity">// VULNERABLE: No nonce or context
function execute(address to, bytes sig) external {
    bytes32 hash = keccak256(abi.encode(to));
    address signer = ECDSA.recover(hash, sig);
    // Signature can be replayed!
}

// SECURE: Include nonce and context
function execute(address to, uint nonce, bytes sig) external {
    require(nonces[signer] == nonce, "Invalid nonce");
    bytes32 hash = keccak256(abi.encode(
        address(this),  // Contract address
        block.chainid,  // Chain ID
        to,
        nonce
    ));
    nonces[signer]++;
    // ...
}</code></pre>
            <strong>Prevention:</strong>
            <ul>
                <li>Include nonce in signed message</li>
                <li>Include chain ID (EIP-712)</li>
                <li>Include contract address</li>
                <li>Use EIP-712 typed data signing</li>
            </ul>
        `
    },
    {
        title: "What is EIP-712 and why is it important for security?",
        tags: ["security", "standards", "difficulty-advanced"],
        answer: `
            <p><strong>EIP-712</strong> is a standard for typed structured data hashing and signing, making signatures more secure and user-friendly.</p>
            <strong>Benefits:</strong>
            <ul>
                <li>Human-readable signing requests in wallets</li>
                <li>Domain separation prevents cross-contract/chain replay</li>
                <li>Structured data prevents hash collision attacks</li>
            </ul>
            <pre><code class="language-solidity">// EIP-712 Domain Separator
bytes32 DOMAIN_SEPARATOR = keccak256(abi.encode(
    keccak256("EIP712Domain(string name,string version,uint256 chainId,address verifyingContract)"),
    keccak256("MyProtocol"),
    keccak256("1"),
    block.chainid,
    address(this)
));

// Typed data hash
bytes32 structHash = keccak256(abi.encode(
    keccak256("Permit(address owner,address spender,uint256 value,uint256 nonce,uint256 deadline)"),
    owner, spender, value, nonce, deadline
));

bytes32 digest = keccak256(abi.encodePacked("\\x19\\x01", DOMAIN_SEPARATOR, structHash));</code></pre>
            <strong>Common uses:</strong> Gasless approvals (ERC-20 Permit), meta-transactions, off-chain orders
        `
    },
    {
        title: "What are common smart contract audit findings?",
        tags: ["security", "auditing", "difficulty-advanced"],
        answer: `
            <p>Smart contract audits typically reveal patterns of common vulnerabilities.</p>
            <strong>High severity:</strong>
            <ul>
                <li>Reentrancy vulnerabilities</li>
                <li>Access control issues</li>
                <li>Oracle manipulation</li>
                <li>Flash loan attack vectors</li>
                <li>Signature replay</li>
            </ul>
            <strong>Medium severity:</strong>
            <ul>
                <li>Centralization risks</li>
                <li>Lack of input validation</li>
                <li>Denial of service vectors</li>
                <li>Front-running possibilities</li>
            </ul>
            <strong>Low severity:</strong>
            <ul>
                <li>Gas optimization issues</li>
                <li>Code quality/readability</li>
                <li>Missing events</li>
                <li>Floating pragma</li>
            </ul>
            <strong>Audit firms:</strong> Trail of Bits, OpenZeppelin, Consensys Diligence, Spearbit
        `
    },
    {
        title: "What are formal verification and symbolic execution?",
        tags: ["security", "verification", "difficulty-advanced"],
        answer: `
            <p><strong>Formal verification</strong> uses mathematical proofs to verify contract correctness, while <strong>symbolic execution</strong> explores all possible execution paths.</p>
            <strong>Formal Verification:</strong>
            <ul>
                <li>Proves properties hold for ALL possible inputs</li>
                <li>Tools: Certora, K Framework, Act</li>
                <li>Requires writing formal specifications</li>
            </ul>
            <pre><code>// Certora specification example
rule transferPreservesTotalSupply {
    uint256 totalBefore = totalSupply();
    transfer(recipient, amount);
    uint256 totalAfter = totalSupply();
    assert totalBefore == totalAfter;
}</code></pre>
            <strong>Symbolic Execution:</strong>
            <ul>
                <li>Treats inputs as symbols, not concrete values</li>
                <li>Explores all paths to find bugs</li>
                <li>Tools: Mythril, Manticore, Halmos</li>
            </ul>
            <strong>Limitations:</strong> Path explosion, high computational cost, requires expertise
        `
    },

    // ==================== LAYER 2 SOLUTIONS (12 questions) ====================
    {
        title: "What are Layer 2 scaling solutions?",
        tags: ["layer2", "scaling", "difficulty-advanced"],
        answer: `
            <p><strong>Layer 2 (L2)</strong> solutions are protocols built on top of Layer 1 blockchains to increase transaction throughput and reduce fees.</p>
            <strong>Why L2 is needed:</strong>
            <ul>
                <li>Ethereum L1: ~15 TPS, $1-50+ per transaction</li>
                <li>L2 solutions: 1000+ TPS, $0.01-0.50 per transaction</li>
            </ul>
            <strong>Types of L2 solutions:</strong>
            <ul>
                <li><strong>Optimistic Rollups:</strong> Arbitrum, Optimism, Base</li>
                <li><strong>ZK Rollups:</strong> zkSync, StarkNet, Polygon zkEVM</li>
                <li><strong>State Channels:</strong> Lightning Network</li>
                <li><strong>Plasma:</strong> Polygon PoS (hybrid)</li>
                <li><strong>Validium:</strong> Off-chain data availability</li>
            </ul>
            <strong>Key concept:</strong> Execute transactions off-chain, post proofs/data on-chain
        `
    },
    {
        title: "What are rollups?",
        tags: ["layer2", "rollups", "difficulty-advanced"],
        answer: `
            <p><strong>Rollups</strong> bundle (roll up) hundreds of transactions into a single L1 transaction, inheriting Ethereum's security.</p>
            <strong>How rollups work:</strong>
            <ol>
                <li>Users submit transactions to L2 sequencer</li>
                <li>Sequencer orders and executes transactions</li>
                <li>Batches of transactions compressed and posted to L1</li>
                <li>Validity proven via fraud proofs or ZK proofs</li>
            </ol>
            <strong>Rollup components:</strong>
            <ul>
                <li><strong>Sequencer:</strong> Orders transactions</li>
                <li><strong>State root:</strong> Merkle root of L2 state</li>
                <li><strong>Bridge:</strong> Moves assets between L1 and L2</li>
                <li><strong>Data availability:</strong> Transaction data on L1</li>
            </ul>
            <strong>Benefits:</strong> 10-100x cheaper, 10-100x faster, inherits L1 security
        `
    },
    {
        title: "What is the difference between Optimistic and ZK Rollups?",
        tags: ["layer2", "rollups", "difficulty-advanced"],
        answer: `
            <p>Both are rollups but use different methods to ensure transaction validity.</p>
            <table>
                <tr><th>Aspect</th><th>Optimistic Rollups</th><th>ZK Rollups</th></tr>
                <tr><td>Validity</td><td>Fraud proofs</td><td>Validity proofs</td></tr>
                <tr><td>Withdrawal time</td><td>7 days (challenge period)</td><td>Minutes-hours</td></tr>
                <tr><td>Computation</td><td>Low (only if challenged)</td><td>High (ZK proof generation)</td></tr>
                <tr><td>EVM compatibility</td><td>Easier</td><td>Harder (but improving)</td></tr>
                <tr><td>Examples</td><td>Arbitrum, Optimism</td><td>zkSync, StarkNet</td></tr>
            </table>
            <strong>Optimistic:</strong> Assume transactions valid, challenge if fraud detected
            <strong>ZK:</strong> Mathematically prove every batch is valid
        `
    },
    {
        title: "What are fraud proofs?",
        tags: ["layer2", "optimistic", "difficulty-advanced"],
        answer: `
            <p><strong>Fraud proofs</strong> are used by optimistic rollups to challenge invalid state transitions.</p>
            <strong>How they work:</strong>
            <ol>
                <li>Sequencer posts batch with new state root</li>
                <li>7-day challenge window begins</li>
                <li>Anyone can submit fraud proof if they find invalid transition</li>
                <li>If fraud proven: batch reverted, challenger rewarded, sequencer slashed</li>
                <li>If no challenge: state finalized after 7 days</li>
            </ol>
            <strong>Challenge process:</strong>
            <pre><code>1. Challenger identifies invalid state transition
2. Interactive bisection game narrows down dispute
3. Single instruction executed on L1
4. L1 determines which party is correct</code></pre>
            <strong>Trade-offs:</strong>
            <ul>
                <li>Long withdrawal times (7 days)</li>
                <li>Requires at least one honest verifier</li>
                <li>Lower computational overhead than ZK</li>
            </ul>
        `
    },
    {
        title: "What are validity proofs (ZK proofs)?",
        tags: ["layer2", "zk", "cryptography", "difficulty-advanced"],
        answer: `
            <p><strong>Validity proofs</strong> are cryptographic proofs that demonstrate the correctness of computation without revealing the inputs.</p>
            <strong>Properties:</strong>
            <ul>
                <li><strong>Completeness:</strong> Valid proofs always verify</li>
                <li><strong>Soundness:</strong> Invalid proofs cannot be verified</li>
                <li><strong>Zero-knowledge:</strong> Reveals nothing beyond validity</li>
            </ul>
            <strong>ZK proof systems:</strong>
            <ul>
                <li><strong>SNARKs:</strong> Succinct, requires trusted setup (Groth16)</li>
                <li><strong>STARKs:</strong> Transparent, no trusted setup, larger proofs</li>
                <li><strong>PLONK:</strong> Universal trusted setup</li>
            </ul>
            <strong>Benefits for rollups:</strong>
            <ul>
                <li>Instant finality (no challenge period)</li>
                <li>Fast withdrawals</li>
                <li>Privacy potential</li>
            </ul>
        `
    },
    {
        title: "What is a sequencer?",
        tags: ["layer2", "rollups", "difficulty-advanced"],
        answer: `
            <p>A <strong>sequencer</strong> is the entity that orders and executes transactions on an L2 rollup.</p>
            <strong>Sequencer responsibilities:</strong>
            <ul>
                <li>Receive user transactions</li>
                <li>Order transactions</li>
                <li>Execute and compute new state</li>
                <li>Post batches to L1</li>
            </ul>
            <strong>Centralization concerns:</strong>
            <ul>
                <li>Most L2s currently have centralized sequencers</li>
                <li>Can censor transactions (but not steal funds)</li>
                <li>Single point of failure for liveness</li>
            </ul>
            <strong>Decentralization roadmaps:</strong>
            <ul>
                <li><strong>Shared sequencing:</strong> Multiple rollups share sequencers</li>
                <li><strong>Based sequencing:</strong> L1 validators sequence L2</li>
                <li><strong>Decentralized sequencer sets:</strong> Multiple competing sequencers</li>
            </ul>
        `
    },
    {
        title: "What is data availability?",
        tags: ["layer2", "scaling", "difficulty-advanced"],
        answer: `
            <p><strong>Data availability (DA)</strong> ensures that transaction data is available for anyone to verify and reconstruct the state.</p>
            <strong>Why it matters:</strong>
            <ul>
                <li>Users need data to prove their balances</li>
                <li>Challengers need data to detect fraud</li>
                <li>New nodes need data to sync</li>
            </ul>
            <strong>DA solutions:</strong>
            <ul>
                <li><strong>On-chain (calldata):</strong> Full security, expensive</li>
                <li><strong>EIP-4844 (blobs):</strong> Cheaper, temporary storage</li>
                <li><strong>Off-chain (validium):</strong> Cheapest, trust assumptions</li>
                <li><strong>DACs:</strong> Data Availability Committees</li>
                <li><strong>Dedicated DA layers:</strong> Celestia, EigenDA, Avail</li>
            </ul>
            <strong>Trade-off:</strong> Cost vs security. On-chain = most secure, off-chain = cheapest
        `
    },
    {
        title: "What is EIP-4844 (Proto-Danksharding)?",
        tags: ["layer2", "scaling", "ethereum", "difficulty-advanced"],
        answer: `
            <p><strong>EIP-4844</strong> introduces "blob" transactions that provide cheaper data availability for rollups.</p>
            <strong>Key features:</strong>
            <ul>
                <li><strong>Blob transactions:</strong> New transaction type with ~128KB data blobs</li>
                <li><strong>Temporary storage:</strong> Blobs pruned after ~18 days</li>
                <li><strong>Separate fee market:</strong> Blob gas priced independently</li>
            </ul>
            <strong>Impact on rollups:</strong>
            <ul>
                <li>10-100x cheaper data posting</li>
                <li>Significant fee reduction for users</li>
                <li>Foundation for full danksharding</li>
            </ul>
            <pre><code>Before EIP-4844: Rollup posts data as calldata (~16 gas/byte)
After EIP-4844:  Rollup posts data as blobs (~1 gas/byte)</code></pre>
            <strong>Timeline:</strong> Activated in Dencun upgrade (March 2024)
        `
    },
    {
        title: "What are L2 bridges?",
        tags: ["layer2", "bridges", "difficulty-advanced"],
        answer: `
            <p><strong>L2 bridges</strong> enable moving assets between Layer 1 and Layer 2 networks.</p>
            <strong>Native bridge process:</strong>
            <ol>
                <li><strong>Deposit (L1→L2):</strong> Lock assets on L1, mint on L2</li>
                <li><strong>Withdraw (L2→L1):</strong> Burn on L2, unlock on L1</li>
            </ol>
            <strong>Withdrawal times:</strong>
            <ul>
                <li><strong>Optimistic rollups:</strong> 7 days (challenge period)</li>
                <li><strong>ZK rollups:</strong> Hours (proof generation)</li>
            </ul>
            <strong>Fast bridges:</strong>
            <ul>
                <li>Liquidity providers front the withdrawal</li>
                <li>Examples: Hop, Across, Stargate</li>
                <li>Trade-off: Fees for speed</li>
            </ul>
            <strong>Security considerations:</strong>
            <ul>
                <li>Native bridges inherit L2 security</li>
                <li>Third-party bridges add trust assumptions</li>
                <li>Bridge hacks are major DeFi risk</li>
            </ul>
        `
    },
    {
        title: "What is Arbitrum?",
        tags: ["layer2", "optimistic", "difficulty-advanced"],
        answer: `
            <p><strong>Arbitrum</strong> is an optimistic rollup L2 solution built by Offchain Labs, currently the largest L2 by TVL.</p>
            <strong>Key features:</strong>
            <ul>
                <li>Full EVM equivalence</li>
                <li>Interactive fraud proofs (multi-round)</li>
                <li>AnyTrust chain option (Arbitrum Nova)</li>
                <li>Stylus: Write contracts in Rust, C, C++</li>
            </ul>
            <strong>Arbitrum ecosystem:</strong>
            <ul>
                <li><strong>Arbitrum One:</strong> Main rollup</li>
                <li><strong>Arbitrum Nova:</strong> AnyTrust chain for gaming/social</li>
                <li><strong>Arbitrum Orbit:</strong> L3 chains</li>
                <li><strong>ARB token:</strong> Governance</li>
            </ul>
            <strong>Technical specs:</strong>
            <ul>
                <li>7-day challenge period</li>
                <li>~250ms block time</li>
                <li>90%+ fee reduction vs L1</li>
            </ul>
        `
    },
    {
        title: "What is Optimism?",
        tags: ["layer2", "optimistic", "difficulty-advanced"],
        answer: `
            <p><strong>Optimism</strong> is an optimistic rollup focused on Ethereum equivalence and public goods funding.</p>
            <strong>Key features:</strong>
            <ul>
                <li>EVM equivalence (runs unmodified L1 code)</li>
                <li>Bedrock upgrade: Modular architecture</li>
                <li>OP Stack: Framework for building L2s</li>
                <li>Superchain vision: Network of OP chains</li>
            </ul>
            <strong>OP Stack chains:</strong>
            <ul>
                <li>Base (Coinbase)</li>
                <li>Zora</li>
                <li>Mode</li>
                <li>Many more building</li>
            </ul>
            <strong>Unique aspects:</strong>
            <ul>
                <li>Retroactive Public Goods Funding (RPGF)</li>
                <li>Citizen house + Token house governance</li>
                <li>Revenue sharing with OP Collective</li>
            </ul>
        `
    },
    {
        title: "What is zkSync?",
        tags: ["layer2", "zk", "difficulty-advanced"],
        answer: `
            <p><strong>zkSync Era</strong> is a ZK rollup with native account abstraction and EVM compatibility.</p>
            <strong>Key features:</strong>
            <ul>
                <li>zkEVM: EVM-compatible ZK rollup</li>
                <li>Native account abstraction</li>
                <li>LLVM compiler: Multiple language support</li>
                <li>Hyperchains: Customizable ZK chains</li>
            </ul>
            <strong>Technical approach:</strong>
            <ul>
                <li>Uses PLONK-based proof system</li>
                <li>Compiles Solidity to zkEVM bytecode</li>
                <li>Boojum: New high-performance prover</li>
            </ul>
            <strong>Comparison to other ZK rollups:</strong>
            <ul>
                <li><strong>zkSync:</strong> EVM compatible, LLVM-based</li>
                <li><strong>StarkNet:</strong> Cairo language, STARK proofs</li>
                <li><strong>Polygon zkEVM:</strong> Bytecode-level EVM equivalence</li>
            </ul>
        `
    },

    // ==================== MEV (10 questions) ====================
    {
        title: "What is MEV (Maximal Extractable Value)?",
        tags: ["mev", "difficulty-advanced"],
        answer: `
            <p><strong>MEV</strong> is the maximum value that can be extracted from block production beyond standard rewards and fees, by including, excluding, or reordering transactions.</p>
            <strong>Sources of MEV:</strong>
            <ul>
                <li><strong>DEX arbitrage:</strong> Price differences across exchanges</li>
                <li><strong>Liquidations:</strong> Racing to liquidate underwater positions</li>
                <li><strong>Sandwich attacks:</strong> Front and back-running trades</li>
                <li><strong>NFT sniping:</strong> Buying underpriced NFTs</li>
            </ul>
            <strong>MEV supply chain:</strong>
            <ol>
                <li><strong>Searchers:</strong> Find MEV opportunities</li>
                <li><strong>Builders:</strong> Construct optimal blocks</li>
                <li><strong>Validators:</strong> Propose blocks</li>
            </ol>
            <strong>Scale:</strong> Billions of dollars extracted since DeFi summer 2020
        `
    },
    {
        title: "What is Flashbots?",
        tags: ["mev", "infrastructure", "difficulty-advanced"],
        answer: `
            <p><strong>Flashbots</strong> is a research and development organization working to mitigate MEV's negative externalities.</p>
            <strong>Flashbots products:</strong>
            <ul>
                <li><strong>MEV-Boost:</strong> PBS implementation for validators</li>
                <li><strong>Flashbots Protect:</strong> Private transaction submission (RPC)</li>
                <li><strong>MEV-Share:</strong> MEV redistribution to users</li>
                <li><strong>SUAVE:</strong> Decentralized block building</li>
            </ul>
            <strong>How MEV-Boost works:</strong>
            <pre><code>1. Searchers send bundles to builders
2. Builders construct blocks and bid
3. Relay receives blocks from builders
4. Validator selects highest-paying block
5. Block proposed to network</code></pre>
            <strong>Impact:</strong> ~90% of Ethereum blocks built through MEV-Boost
        `
    },
    {
        title: "What is Proposer-Builder Separation (PBS)?",
        tags: ["mev", "ethereum", "difficulty-advanced"],
        answer: `
            <p><strong>PBS</strong> separates the roles of block proposing (validators) and block building (specialized builders).</p>
            <strong>Why PBS?</strong>
            <ul>
                <li>Reduces validator centralization pressure</li>
                <li>Allows specialized MEV extraction</li>
                <li>Validators don't need MEV expertise</li>
                <li>More efficient MEV extraction</li>
            </ul>
            <strong>Current implementation (MEV-Boost):</strong>
            <ul>
                <li>Out-of-protocol PBS via relays</li>
                <li>Builders submit blocks to relays</li>
                <li>Validators query relays for best block</li>
                <li>Trust assumptions on relays</li>
            </ul>
            <strong>Enshrined PBS (ePBS):</strong>
            <ul>
                <li>PBS built into Ethereum protocol</li>
                <li>Removes relay trust assumptions</li>
                <li>Active area of research</li>
            </ul>
        `
    },
    {
        title: "What is a bundle in MEV?",
        tags: ["mev", "flashbots", "difficulty-advanced"],
        answer: `
            <p>A <strong>bundle</strong> is an ordered list of transactions that must be included together, atomically, and at a specific position in a block.</p>
            <strong>Bundle properties:</strong>
            <ul>
                <li>Atomic execution: All or nothing</li>
                <li>Ordered: Transactions execute in sequence</li>
                <li>Targeted: Can specify block number and position</li>
                <li>Private: Not visible in public mempool</li>
            </ul>
            <pre><code class="language-javascript">// Flashbots bundle example
const bundle = [
    {
        signedTransaction: signedTx1 // Buy token
    },
    {
        signedTransaction: signedTx2 // Arbitrage
    },
    {
        signedTransaction: signedTx3 // Sell token
    }
];

const response = await flashbotsProvider.sendBundle(bundle, targetBlock);</code></pre>
            <strong>Use cases:</strong> Arbitrage, liquidations, complex DeFi operations
        `
    },
    {
        title: "What is a private mempool?",
        tags: ["mev", "privacy", "difficulty-advanced"],
        answer: `
            <p>A <strong>private mempool</strong> allows users to submit transactions without exposing them to the public mempool, protecting against front-running.</p>
            <strong>How it works:</strong>
            <ol>
                <li>User submits tx to private RPC endpoint</li>
                <li>Transaction sent directly to block builders</li>
                <li>Not visible until included in block</li>
                <li>Protected from sandwich attacks</li>
            </ol>
            <strong>Private mempool services:</strong>
            <ul>
                <li><strong>Flashbots Protect:</strong> Free, basic protection</li>
                <li><strong>MEV Blocker:</strong> Returns MEV to users</li>
                <li><strong>Blocknative:</strong> Private transactions</li>
                <li><strong>BloxRoute:</strong> Private transaction service</li>
            </ul>
            <strong>Trade-offs:</strong>
            <ul>
                <li>Trust in the private mempool operator</li>
                <li>May have higher latency</li>
                <li>Not all builders may see the tx</li>
            </ul>
        `
    },
    {
        title: "What is MEV on Layer 2?",
        tags: ["mev", "layer2", "difficulty-advanced"],
        answer: `
            <p>MEV exists on L2s but with different dynamics due to centralized sequencers.</p>
            <strong>L2 MEV characteristics:</strong>
            <ul>
                <li>Sequencer has ordering power</li>
                <li>No public mempool (usually)</li>
                <li>First-come-first-served ordering (typically)</li>
                <li>Lower fees make smaller MEV profitable</li>
            </ul>
            <strong>MEV on different L2s:</strong>
            <ul>
                <li><strong>Arbitrum:</strong> FCFS ordering, sequencer captures some MEV</li>
                <li><strong>Optimism:</strong> Private sequencer, MEV sharing experiments</li>
                <li><strong>zkSync:</strong> Centralized sequencer</li>
            </ul>
            <strong>Future developments:</strong>
            <ul>
                <li>Decentralized sequencers</li>
                <li>MEV auctions on L2</li>
                <li>Shared sequencing</li>
                <li>MEV redistribution to users</li>
            </ul>
        `
    },
    {
        title: "What is a searcher?",
        tags: ["mev", "difficulty-advanced"],
        answer: `
            <p>A <strong>searcher</strong> is someone who searches for and extracts MEV opportunities.</p>
            <strong>What searchers do:</strong>
            <ul>
                <li>Monitor mempool and on-chain state</li>
                <li>Identify profitable opportunities</li>
                <li>Build and simulate transactions</li>
                <li>Submit bundles to block builders</li>
                <li>Compete with other searchers</li>
            </ul>
            <strong>Searcher strategies:</strong>
            <ul>
                <li><strong>DEX arbitrage:</strong> Cross-DEX price differences</li>
                <li><strong>Liquidations:</strong> DeFi protocol liquidations</li>
                <li><strong>Sandwich:</strong> Front/back-run trades</li>
                <li><strong>Long-tail:</strong> Niche, less competitive strategies</li>
            </ul>
            <strong>Requirements:</strong>
            <ul>
                <li>Deep DeFi knowledge</li>
                <li>Fast infrastructure</li>
                <li>Capital for transactions</li>
                <li>Simulation and backtesting tools</li>
            </ul>
        `
    },
    {
        title: "What is block building?",
        tags: ["mev", "ethereum", "difficulty-advanced"],
        answer: `
            <p><strong>Block building</strong> is the process of constructing an optimal block that maximizes value (fees + MEV).</p>
            <strong>Block builder responsibilities:</strong>
            <ul>
                <li>Receive transactions from users and searchers</li>
                <li>Order transactions optimally</li>
                <li>Include MEV bundles</li>
                <li>Bid for block inclusion</li>
            </ul>
            <strong>Building process:</strong>
            <ol>
                <li>Collect pending transactions</li>
                <li>Receive bundles from searchers</li>
                <li>Simulate and optimize ordering</li>
                <li>Create block and submit bid to relays</li>
            </ol>
            <strong>Major builders:</strong>
            <ul>
                <li>Flashbots Builder</li>
                <li>BloXroute</li>
                <li>Builder0x69</li>
                <li>Beaver Build</li>
            </ul>
        `
    },
    {
        title: "What are MEV mitigation strategies?",
        tags: ["mev", "security", "difficulty-advanced"],
        answer: `
            <p>Various strategies exist to reduce the negative effects of MEV on users.</p>
            <strong>User-level protections:</strong>
            <ul>
                <li><strong>Private RPCs:</strong> Hide transactions from public mempool</li>
                <li><strong>Low slippage:</strong> Limit acceptable price impact</li>
                <li><strong>MEV-aware DEXs:</strong> CoW Swap, 1inch Fusion</li>
            </ul>
            <strong>Protocol-level solutions:</strong>
            <ul>
                <li><strong>Batch auctions:</strong> Execute all orders at same price</li>
                <li><strong>Commit-reveal:</strong> Hide transaction details until execution</li>
                <li><strong>Order flow auctions:</strong> Auction right to execute trades</li>
                <li><strong>Encrypted mempools:</strong> Threshold encryption</li>
            </ul>
            <strong>Systemic approaches:</strong>
            <ul>
                <li><strong>PBS:</strong> Separate building from proposing</li>
                <li><strong>MEV redistribution:</strong> Return MEV to users</li>
                <li><strong>Fair ordering:</strong> Time-based transaction ordering</li>
            </ul>
        `
    },
    {
        title: "What is Just-In-Time (JIT) liquidity?",
        tags: ["mev", "defi", "difficulty-advanced"],
        answer: `
            <p><strong>JIT liquidity</strong> is when MEV searchers provide concentrated liquidity right before a large swap, then remove it after.</p>
            <strong>How it works:</strong>
            <ol>
                <li>Searcher sees large pending swap</li>
                <li>Adds concentrated liquidity in narrow range</li>
                <li>Swap executes through their liquidity</li>
                <li>Removes liquidity immediately after</li>
                <li>Captures trading fees with minimal impermanent loss</li>
            </ol>
            <strong>Example on Uniswap V3:</strong>
            <pre><code>Block N:
1. Add liquidity at current price ± 0.01%
2. Large swap executes through your position
3. Remove liquidity
4. Net profit: fees - gas - price impact</code></pre>
            <strong>Impact:</strong>
            <ul>
                <li>Better execution for swappers (deeper liquidity)</li>
                <li>Competes with passive LPs</li>
                <li>Requires sophisticated infrastructure</li>
            </ul>
        `
    },

    // ==================== ADVANCED CRYPTOGRAPHY & PRIVACY (8 questions) ====================
    {
        title: "What are zero-knowledge proofs?",
        tags: ["cryptography", "zk", "privacy", "difficulty-advanced"],
        answer: `
            <p><strong>Zero-knowledge proofs (ZKPs)</strong> allow one party to prove something is true without revealing any information beyond the truth of the statement.</p>
            <strong>Properties:</strong>
            <ul>
                <li><strong>Completeness:</strong> True statements can be proven</li>
                <li><strong>Soundness:</strong> False statements cannot be proven</li>
                <li><strong>Zero-knowledge:</strong> Nothing learned except truth of statement</li>
            </ul>
            <strong>Example:</strong>
            <pre><code>Prove: "I know x such that hash(x) = H"
Verifier learns: The prover knows x
Verifier does NOT learn: The value of x</code></pre>
            <strong>Applications in crypto:</strong>
            <ul>
                <li>ZK Rollups (zkSync, StarkNet)</li>
                <li>Private transactions (Zcash, Tornado Cash)</li>
                <li>Identity proofs</li>
                <li>Voting systems</li>
            </ul>
        `
    },
    {
        title: "What is the difference between SNARKs and STARKs?",
        tags: ["cryptography", "zk", "difficulty-advanced"],
        answer: `
            <p><strong>SNARKs</strong> and <strong>STARKs</strong> are two different zero-knowledge proof systems.</p>
            <table>
                <tr><th>Aspect</th><th>SNARKs</th><th>STARKs</th></tr>
                <tr><td>Full name</td><td>Succinct Non-interactive ARgument of Knowledge</td><td>Scalable Transparent ARgument of Knowledge</td></tr>
                <tr><td>Trusted setup</td><td>Required (usually)</td><td>Not required</td></tr>
                <tr><td>Proof size</td><td>~200-300 bytes</td><td>~50-100 KB</td></tr>
                <tr><td>Verification time</td><td>Fast</td><td>Slightly slower</td></tr>
                <tr><td>Quantum resistant</td><td>No</td><td>Yes</td></tr>
                <tr><td>Prover time</td><td>Slower</td><td>Faster</td></tr>
            </table>
            <strong>Usage:</strong>
            <ul>
                <li><strong>SNARKs:</strong> Zcash, zkSync, Polygon zkEVM</li>
                <li><strong>STARKs:</strong> StarkNet, StarkEx</li>
            </ul>
        `
    },
    {
        title: "What is a trusted setup?",
        tags: ["cryptography", "zk", "difficulty-advanced"],
        answer: `
            <p>A <strong>trusted setup</strong> is a one-time ceremony that generates cryptographic parameters for certain ZK proof systems.</p>
            <strong>Why it's needed:</strong>
            <ul>
                <li>Creates proving and verification keys</li>
                <li>Required for certain SNARK systems (Groth16)</li>
                <li>Produces "toxic waste" that must be destroyed</li>
            </ul>
            <strong>Security concern:</strong>
            <p>If all participants collude or toxic waste is reconstructed, fake proofs could be created.</p>
            <strong>Multi-party computation (MPC) ceremonies:</strong>
            <ul>
                <li>Multiple participants contribute randomness</li>
                <li>Only ONE honest participant needed</li>
                <li>Zcash Powers of Tau: 87 participants</li>
            </ul>
            <strong>Alternatives:</strong>
            <ul>
                <li><strong>STARKs:</strong> No trusted setup (transparent)</li>
                <li><strong>PLONK:</strong> Universal setup (reusable)</li>
            </ul>
        `
    },
    {
        title: "What is homomorphic encryption?",
        tags: ["cryptography", "privacy", "difficulty-advanced"],
        answer: `
            <p><strong>Homomorphic encryption</strong> allows computation on encrypted data without decrypting it first.</p>
            <strong>Types:</strong>
            <ul>
                <li><strong>Partially homomorphic:</strong> Supports one operation (add OR multiply)</li>
                <li><strong>Somewhat homomorphic:</strong> Limited operations before noise overflow</li>
                <li><strong>Fully homomorphic (FHE):</strong> Any computation, unlimited operations</li>
            </ul>
            <strong>Example:</strong>
            <pre><code>E(a) + E(b) = E(a + b)
// Add encrypted values, get encrypted sum
// Never see the plaintext!</code></pre>
            <strong>Blockchain applications:</strong>
            <ul>
                <li>Private smart contracts</li>
                <li>Encrypted DeFi</li>
                <li>Confidential voting</li>
                <li>Privacy-preserving ML</li>
            </ul>
            <strong>Projects:</strong> Zama (fhEVM), Sunscreen, Fhenix
        `
    },
    {
        title: "What is multi-party computation (MPC)?",
        tags: ["cryptography", "privacy", "difficulty-advanced"],
        answer: `
            <p><strong>MPC</strong> allows multiple parties to jointly compute a function over their inputs while keeping those inputs private.</p>
            <strong>Example:</strong>
            <pre><code>Alice, Bob, Carol want to know average salary
Without revealing individual salaries:
1. Each encrypts their salary
2. Perform distributed computation
3. Only final average is revealed</code></pre>
            <strong>Blockchain applications:</strong>
            <ul>
                <li><strong>MPC wallets:</strong> Key shares across parties (Fireblocks, ZenGo)</li>
                <li><strong>Threshold signatures:</strong> t-of-n signing</li>
                <li><strong>Trusted setups:</strong> Generate ZK parameters</li>
                <li><strong>Private DEXs:</strong> Hide order details</li>
            </ul>
            <strong>Benefits:</strong>
            <ul>
                <li>No single point of compromise</li>
                <li>Distributed trust</li>
                <li>Private inputs</li>
            </ul>
        `
    },
    {
        title: "What are commitment schemes?",
        tags: ["cryptography", "difficulty-advanced"],
        answer: `
            <p>A <strong>commitment scheme</strong> allows you to commit to a value while keeping it hidden, and reveal it later.</p>
            <strong>Properties:</strong>
            <ul>
                <li><strong>Hiding:</strong> Commitment reveals nothing about value</li>
                <li><strong>Binding:</strong> Cannot change value after committing</li>
            </ul>
            <strong>Simple hash commitment:</strong>
            <pre><code class="language-solidity">// Commit phase
bytes32 commitment = keccak256(abi.encodePacked(value, secret));

// Reveal phase
function reveal(uint256 value, bytes32 secret) public {
    require(keccak256(abi.encodePacked(value, secret)) == commitment);
    // Value is now verified
}</code></pre>
            <strong>Applications:</strong>
            <ul>
                <li>Sealed-bid auctions</li>
                <li>Voting systems</li>
                <li>Randomness generation</li>
                <li>Front-running protection</li>
            </ul>
        `
    },
    {
        title: "What is a Merkle tree?",
        tags: ["cryptography", "data-structures", "difficulty-advanced"],
        answer: `
            <p>A <strong>Merkle tree</strong> is a hash-based data structure that allows efficient and secure verification of contents.</p>
            <strong>Structure:</strong>
            <pre><code>        Root Hash
       /         \\
    H(1-2)     H(3-4)
    /   \\      /    \\
  H(1) H(2)  H(3)  H(4)
   |    |     |     |
  D1   D2    D3    D4</code></pre>
            <strong>Properties:</strong>
            <ul>
                <li>Root hash represents all data</li>
                <li>Efficient proofs: O(log n) size</li>
                <li>Any change modifies root hash</li>
            </ul>
            <strong>Blockchain uses:</strong>
            <ul>
                <li>Transaction Merkle root in blocks</li>
                <li>State tries (Ethereum)</li>
                <li>Airdrop claims</li>
                <li>Data availability sampling</li>
            </ul>
            <strong>Merkle proof:</strong> Prove leaf is in tree with O(log n) hashes
        `
    },
    {
        title: "What are privacy solutions in blockchain?",
        tags: ["privacy", "difficulty-advanced"],
        answer: `
            <p>Various cryptographic techniques enable transaction privacy on public blockchains.</p>
            <strong>Privacy solutions:</strong>
            <ul>
                <li><strong>Mixers/Tumblers:</strong> Mix transactions to break links (Tornado Cash)</li>
                <li><strong>ZK proofs:</strong> Prove transaction validity without details (Zcash)</li>
                <li><strong>Ring signatures:</strong> Hide sender in group (Monero)</li>
                <li><strong>Stealth addresses:</strong> One-time recipient addresses</li>
                <li><strong>Confidential transactions:</strong> Hide amounts</li>
            </ul>
            <strong>Privacy chains:</strong>
            <ul>
                <li><strong>Zcash:</strong> ZK-SNARKs for shielded transactions</li>
                <li><strong>Monero:</strong> Ring signatures + stealth addresses</li>
                <li><strong>Secret Network:</strong> Encrypted smart contracts</li>
                <li><strong>Aztec:</strong> ZK rollup with privacy</li>
            </ul>
            <strong>Trade-offs:</strong>
            <ul>
                <li>Regulatory concerns</li>
                <li>Computational overhead</li>
                <li>Reduced composability</li>
            </ul>
        `
    }
];

// Export for use in main data.js
if (typeof module !== 'undefined' && module.exports) {
    module.exports = advancedQuestions;
}