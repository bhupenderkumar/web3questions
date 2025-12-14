// Advanced Web3 Questions - Security & Vulnerabilities
const advancedSecurity = [
    {
        title: "What is a reentrancy attack?",
        tags: ["security", "vulnerabilities", "difficulty-advanced"],
        answer: `
            <p>A <strong>reentrancy attack</strong> occurs when a malicious contract calls back into the calling contract before the first execution is complete.</p>
            <strong>Vulnerable pattern:</strong>
            <pre><code class="language-solidity">// VULNERABLE
function withdraw() external {
    uint256 amount = balances[msg.sender];
    (bool success, ) = msg.sender.call{value: amount}("");
    require(success);
    balances[msg.sender] = 0; // State updated AFTER external call
}

// ATTACKER
receive() external payable {
    if (address(target).balance >= 1 ether) {
        target.withdraw(); // Reenter before balance is set to 0
    }
}</code></pre>
            <strong>Prevention (Checks-Effects-Interactions):</strong>
            <pre><code class="language-solidity">function withdraw() external {
    uint256 amount = balances[msg.sender];
    balances[msg.sender] = 0; // Update state BEFORE external call
    (bool success, ) = msg.sender.call{value: amount}("");
    require(success);
}</code></pre>
            <strong>Other mitigations:</strong> ReentrancyGuard modifier, pull payment pattern
            <strong>Famous exploit:</strong> The DAO hack (2016) - $60M stolen
        `
    },
    {
        title: "What is the Checks-Effects-Interactions pattern?",
        tags: ["security", "patterns", "difficulty-advanced"],
        answer: `
            <p>The <strong>Checks-Effects-Interactions (CEI)</strong> pattern is a best practice for ordering operations in smart contracts to prevent reentrancy.</p>
            <strong>Pattern order:</strong>
            <ol>
                <li><strong>Checks:</strong> Validate all conditions (require, assert)</li>
                <li><strong>Effects:</strong> Update all state variables</li>
                <li><strong>Interactions:</strong> External calls last</li>
            </ol>
            <pre><code class="language-solidity">function withdraw(uint256 amount) external {
    // CHECKS
    require(balances[msg.sender] >= amount, "Insufficient");
    require(amount > 0, "Zero amount");
    
    // EFFECTS
    balances[msg.sender] -= amount;
    totalWithdrawn += amount;
    
    // INTERACTIONS
    (bool success, ) = msg.sender.call{value: amount}("");
    require(success, "Transfer failed");
}</code></pre>
            <strong>Why it works:</strong> State is finalized before any external call can re-enter
        `
    },
    {
        title: "What is a flash loan attack?",
        tags: ["security", "defi", "difficulty-advanced"],
        answer: `
            <p>A <strong>flash loan attack</strong> exploits protocols using borrowed funds that are returned within one transaction.</p>
            <strong>Attack flow:</strong>
            <ol>
                <li>Borrow large amount via flash loan</li>
                <li>Manipulate a vulnerable protocol</li>
                <li>Extract value from manipulation</li>
                <li>Repay flash loan + fee</li>
                <li>Keep the profit</li>
            </ol>
            <strong>Common attack vectors:</strong>
            <ul>
                <li><strong>Oracle manipulation:</strong> Move prices on low-liquidity DEXs</li>
                <li><strong>Governance attacks:</strong> Borrow tokens to vote</li>
                <li><strong>Arbitrage exploitation:</strong> Drain vulnerable pools</li>
            </ul>
            <strong>Famous attacks:</strong>
            <ul>
                <li>bZx (2020): $1M</li>
                <li>Cream Finance (2021): $130M</li>
                <li>Euler Finance (2023): $197M</li>
            </ul>
        `
    },
    {
        title: "What is integer overflow/underflow?",
        tags: ["security", "vulnerabilities", "difficulty-advanced"],
        answer: `
            <p><strong>Integer overflow/underflow</strong> occurs when arithmetic operations exceed the variable's bounds.</p>
            <strong>Pre-Solidity 0.8.0 vulnerability:</strong>
            <pre><code class="language-solidity">// uint8 max is 255
uint8 a = 255;
a = a + 1; // Overflows to 0!

uint8 b = 0;
b = b - 1; // Underflows to 255!</code></pre>
            <strong>Exploitation example:</strong>
            <pre><code class="language-solidity">// Vulnerable token transfer
function transfer(address to, uint256 amount) {
    require(balances[msg.sender] - amount >= 0); // Always true with underflow!
    balances[msg.sender] -= amount;
    balances[to] += amount;
}</code></pre>
            <strong>Solutions:</strong>
            <ul>
                <li>Solidity 0.8.0+: Built-in overflow checks (reverts)</li>
                <li>Pre-0.8.0: Use SafeMath library</li>
                <li>Use <code>unchecked</code> only when overflow is intended</li>
            </ul>
        `
    },
    {
        title: "What is front-running?",
        tags: ["security", "mev", "difficulty-advanced"],
        answer: `
            <p><strong>Front-running</strong> is when someone observes a pending transaction and submits their own with higher gas to execute first.</p>
            <strong>How it works:</strong>
            <ol>
                <li>Attacker monitors mempool</li>
                <li>Sees profitable pending transaction</li>
                <li>Submits same/similar transaction with higher gas</li>
                <li>Their transaction executes first</li>
            </ol>
            <strong>Common targets:</strong>
            <ul>
                <li>DEX trades (sandwich attacks)</li>
                <li>NFT mints</li>
                <li>Liquidations</li>
                <li>Arbitrage opportunities</li>
            </ul>
            <strong>Mitigations:</strong>
            <ul>
                <li>Commit-reveal schemes</li>
                <li>Private mempools (Flashbots Protect)</li>
                <li>Batch auctions (CoW Protocol)</li>
                <li>Slippage protection</li>
            </ul>
        `
    },
    {
        title: "What is a sandwich attack?",
        tags: ["security", "mev", "difficulty-advanced"],
        answer: `
            <p>A <strong>sandwich attack</strong> is a type of front-running where an attacker places transactions before AND after a victim's trade.</p>
            <strong>Attack sequence:</strong>
            <ol>
                <li>Victim submits large buy order</li>
                <li>Attacker front-runs with a buy (raises price)</li>
                <li>Victim's trade executes at higher price</li>
                <li>Attacker back-runs with a sell (profits from price increase)</li>
            </ol>
            <pre><code>Block execution order:
1. Attacker: Buy 100 ETH of Token (price goes up)
2. Victim: Buy 50 ETH of Token (at higher price)
3. Attacker: Sell 100 ETH of Token (at even higher price)</code></pre>
            <strong>Protection:</strong>
            <ul>
                <li>Set tight slippage tolerance</li>
                <li>Use private transactions (Flashbots)</li>
                <li>Use DEXs with MEV protection</li>
            </ul>
        `
    },
    {
        title: "What is access control vulnerability?",
        tags: ["security", "vulnerabilities", "difficulty-advanced"],
        answer: `
            <p><strong>Access control vulnerabilities</strong> occur when functions can be called by unauthorized users.</p>
            <strong>Vulnerable patterns:</strong>
            <pre><code class="language-solidity">// Missing access control
function mint(address to, uint256 amount) external {
    _mint(to, amount); // Anyone can mint!
}

// Incorrect modifier logic
modifier onlyOwner() {
    if (msg.sender == owner) {
        _;
    }
    // Doesn't revert if not owner!
}</code></pre>
            <strong>Secure implementation:</strong>
            <pre><code class="language-solidity">modifier onlyOwner() {
    require(msg.sender == owner, "Not owner");
    _;
}

function mint(address to, uint256 amount) external onlyOwner {
    _mint(to, amount);
}</code></pre>
            <strong>Best practices:</strong>
            <ul>
                <li>Use OpenZeppelin's AccessControl or Ownable</li>
                <li>Implement role-based permissions</li>
                <li>Always test access control</li>
            </ul>
        `
    },
    {
        title: "What is tx.origin vulnerability?",
        tags: ["security", "vulnerabilities", "difficulty-advanced"],
        answer: `
            <p>Using <strong>tx.origin</strong> for authorization is dangerous because it refers to the original transaction sender, not the immediate caller.</p>
            <strong>Vulnerable pattern:</strong>
            <pre><code class="language-solidity">// VULNERABLE
function withdraw() external {
    require(tx.origin == owner, "Not owner");
    payable(owner).transfer(address(this).balance);
}

// Attack contract
function attack(VulnerableContract target) external {
    // If owner calls this, tx.origin is still owner
    target.withdraw(); // Drains funds to attacker
}</code></pre>
            <strong>The attack:</strong>
            <ol>
                <li>Attacker tricks owner into calling attacker's contract</li>
                <li>Attacker's contract calls vulnerable function</li>
                <li>tx.origin is still the owner</li>
                <li>Authorization check passes</li>
            </ol>
            <strong>Solution:</strong> Always use <code>msg.sender</code> for authorization
        `
    },
    {
        title: "What is a denial of service (DoS) attack in smart contracts?",
        tags: ["security", "vulnerabilities", "difficulty-advanced"],
        answer: `
            <p>A <strong>DoS attack</strong> makes a contract unusable by exploiting logic that can be blocked.</p>
            <strong>Common DoS patterns:</strong>
            <pre><code class="language-solidity">// Vulnerable to DoS - unbounded loop
function distributeRewards() external {
    for (uint i = 0; i < users.length; i++) {
        payable(users[i]).transfer(rewards[i]); // Gas limit reached
    }
}

// Vulnerable - revert on external call
function claimFirst() external {
    require(msg.sender == users[0]);
    (bool success,) = msg.sender.call{value: prize}("");
    require(success); // Attacker can always revert
}</code></pre>
            <strong>Mitigations:</strong>
            <ul>
                <li>Pull over push payments</li>
                <li>Limit loop iterations</li>
                <li>Allow partial execution</li>
                <li>Don't require external call success for critical paths</li>
            </ul>
        `
    },
    {
        title: "What is a signature replay attack?",
        tags: ["security", "vulnerabilities", "difficulty-advanced"],
        answer: `
            <p>A <strong>signature replay attack</strong> reuses a valid signature to execute unauthorized actions.</p>
            <strong>Vulnerable pattern:</strong>
            <pre><code class="language-solidity">// VULNERABLE - no replay protection
function executeWithSignature(
    address to, uint256 amount, bytes memory signature
) external {
    bytes32 hash = keccak256(abi.encodePacked(to, amount));
    address signer = ECDSA.recover(hash, signature);
    require(signer == owner);
    _transfer(to, amount);
    // Same signature can be used again!
}</code></pre>
            <strong>Protected version:</strong>
            <pre><code class="language-solidity">mapping(bytes32 => bool) public usedHashes;

function executeWithSignature(
    address to, uint256 amount, uint256 nonce, bytes memory signature
) external {
    bytes32 hash = keccak256(abi.encodePacked(to, amount, nonce, address(this), block.chainid));
    require(!usedHashes[hash], "Already used");
    usedHashes[hash] = true;
    // ... verify and execute
}</code></pre>
            <strong>Include in hash:</strong> Nonce, contract address, chain ID
        `
    },
    {
        title: "What is oracle manipulation?",
        tags: ["security", "oracles", "defi", "difficulty-advanced"],
        answer: `
            <p><strong>Oracle manipulation</strong> exploits reliance on easily manipulated price sources.</p>
            <strong>Vulnerable patterns:</strong>
            <ul>
                <li>Using spot DEX prices directly</li>
                <li>Low-liquidity price feeds</li>
                <li>Single oracle source</li>
            </ul>
            <strong>Attack example:</strong>
            <pre><code class="language-solidity">// VULNERABLE - uses spot price
function getPrice() public view returns (uint256) {
    (uint112 reserve0, uint112 reserve1,) = pair.getReserves();
    return reserve1 / reserve0; // Easily manipulated with flash loan
}

// Attack:
// 1. Flash loan large amount
// 2. Swap to skew reserves
// 3. Call vulnerable function (uses wrong price)
// 4. Profit and repay flash loan</code></pre>
            <strong>Mitigations:</strong>
            <ul>
                <li>Use time-weighted average prices (TWAP)</li>
                <li>Use Chainlink decentralized oracles</li>
                <li>Multiple oracle sources</li>
                <li>Circuit breakers for extreme price moves</li>
            </ul>
        `
    },
    {
        title: "What is storage collision in proxy contracts?",
        tags: ["security", "upgrades", "difficulty-advanced"],
        answer: `
            <p><strong>Storage collision</strong> occurs when a proxy and implementation contract use the same storage slot for different variables.</p>
            <strong>The problem:</strong>
            <pre><code class="language-solidity">// Proxy
contract Proxy {
    address public implementation; // Slot 0
    address public admin;         // Slot 1
}

// Implementation  
contract Token {
    address public owner;     // Slot 0 - COLLIDES!
    uint256 public totalSupply; // Slot 1 - COLLIDES!
}</code></pre>
            <strong>Solution (EIP-1967 slots):</strong>
            <pre><code class="language-solidity">// Use specific, calculated slots
bytes32 constant IMPLEMENTATION_SLOT = 
    bytes32(uint256(keccak256('eip1967.proxy.implementation')) - 1);

function _setImplementation(address impl) internal {
    StorageSlot.getAddressSlot(IMPLEMENTATION_SLOT).value = impl;
}</code></pre>
            <strong>Best practice:</strong> Use OpenZeppelin's transparent or UUPS proxy
        `
    },
    {
        title: "What is the difference between delegatecall and call?",
        tags: ["security", "evm", "difficulty-advanced"],
        answer: `
            <p><strong>call</strong> and <strong>delegatecall</strong> are low-level methods to invoke other contracts, with different execution contexts.</p>
            <strong>call:</strong>
            <ul>
                <li>Executes in the context of the called contract</li>
                <li>Uses called contract's storage</li>
                <li>msg.sender is the calling contract</li>
            </ul>
            <strong>delegatecall:</strong>
            <ul>
                <li>Executes in the context of the calling contract</li>
                <li>Uses calling contract's storage</li>
                <li>msg.sender remains the original caller</li>
            </ul>
            <pre><code class="language-solidity">// With delegatecall, implementation code modifies proxy storage
contract Proxy {
    address impl;
    
    fallback() external payable {
        (bool success,) = impl.delegatecall(msg.data);
        require(success);
    }
}</code></pre>
            <strong>Danger:</strong> delegatecall to untrusted code can be catastrophic
        `
    },
    {
        title: "What is selfdestruct and its security implications?",
        tags: ["security", "evm", "difficulty-advanced"],
        answer: `
            <p><strong>selfdestruct</strong> removes a contract from the blockchain and sends remaining ETH to a specified address.</p>
            <strong>Security implications:</strong>
            <pre><code class="language-solidity">contract Vulnerable {
    uint256 public balance;
    
    function deposit() external payable {
        balance += msg.value;
    }
    
    function getBalance() public view returns (uint256) {
        return address(this).balance; // Can be forcibly increased!
    }
}

// Attack: selfdestruct sends ETH bypassing receive/fallback
contract Attacker {
    function attack(address target) external payable {
        selfdestruct(payable(target));
    }
}</code></pre>
            <strong>Issues:</strong>
            <ul>
                <li>ETH can be force-sent to contracts</li>
                <li>Can break invariants relying on balance</li>
                <li>Destroyed contracts can still receive ETH</li>
            </ul>
            <strong>Note:</strong> selfdestruct is deprecated (EIP-6049) and behavior may change
        `
    },
    {
        title: "What is a griefing attack?",
        tags: ["security", "vulnerabilities", "difficulty-advanced"],
        answer: `
            <p>A <strong>griefing attack</strong> harms others at a cost to the attacker, without direct profit motive.</p>
            <strong>Examples:</strong>
            <ul>
                <li>Always reverting when receiving ETH</li>
                <li>Filling blocks to prevent others' transactions</li>
                <li>Voting against all proposals</li>
                <li>Front-running NFT purchases to cancel sales</li>
            </ul>
            <pre><code class="language-solidity">// Griefing: attacker can block withdrawals
contract Vulnerable {
    address[] public winners;
    
    function distributeWinnings() external {
        for (uint i = 0; i < winners.length; i++) {
            // Attacker adds contract that reverts
            payable(winners[i]).transfer(prize);
        }
    }
}</code></pre>
            <strong>Mitigations:</strong>
            <ul>
                <li>Pull over push patterns</li>
                <li>Don't rely on external call success</li>
                <li>Economic incentives against griefing</li>
            </ul>
        `
    },
    {
        title: "What is a time manipulation attack?",
        tags: ["security", "vulnerabilities", "difficulty-advanced"],
        answer: `
            <p><strong>Time manipulation</strong> exploits contracts that rely on block.timestamp for critical logic.</p>
            <strong>Vulnerable pattern:</strong>
            <pre><code class="language-solidity">// VULNERABLE - randomness from timestamp
function roll() external payable {
    require(msg.value == 1 ether);
    if (block.timestamp % 2 == 0) {
        payable(msg.sender).transfer(2 ether);
    }
}

// VULNERABLE - short time window
function claim() external {
    require(block.timestamp == deadline); // Miners can manipulate
    _claim();
}</code></pre>
            <strong>Miner manipulation:</strong>
            <ul>
                <li>Can adjust timestamp within ~15 second range</li>
                <li>Can choose not to include transactions</li>
            </ul>
            <strong>Best practices:</strong>
            <ul>
                <li>Use >= or <= for time comparisons</li>
                <li>Don't use timestamp for randomness</li>
                <li>Use block numbers for longer durations</li>
            </ul>
        `
    },
    {
        title: "What is the difference between view, pure, and state-changing functions?",
        tags: ["security", "solidity", "difficulty-advanced"],
        answer: `
            <p>Function modifiers indicate what state a function can access or modify.</p>
            <strong>Comparison:</strong>
            <table>
                <tr><th>Modifier</th><th>Read State</th><th>Modify State</th><th>Gas Cost</th></tr>
                <tr><td>view</td><td>Yes</td><td>No</td><td>Free (if external call)</td></tr>
                <tr><td>pure</td><td>No</td><td>No</td><td>Free (if external call)</td></tr>
                <tr><td>none</td><td>Yes</td><td>Yes</td><td>Costs gas</td></tr>
            </table>
            <pre><code class="language-solidity">// View - reads storage
function getBalance(address user) external view returns (uint256) {
    return balances[user];
}

// Pure - no state access
function calculateFee(uint256 amount) external pure returns (uint256) {
    return amount * 3 / 100;
}

// State-changing
function transfer(address to, uint256 amount) external {
    balances[msg.sender] -= amount;
    balances[to] += amount;
}</code></pre>
            <strong>Security note:</strong> Marking incorrectly won't save gas but may confuse auditors
        `
    },
    {
        title: "What is uninitialized storage pointer vulnerability?",
        tags: ["security", "vulnerabilities", "difficulty-advanced"],
        answer: `
            <p>An <strong>uninitialized storage pointer</strong> can point to unexpected storage slots, allowing overwrites.</p>
            <strong>Vulnerable pattern (pre-0.5.0):</strong>
            <pre><code class="language-solidity">contract Vulnerable {
    address public owner;
    
    function addUser(string memory name) public {
        User user; // Uninitialized storage pointer!
        user.name = name; // Overwrites slot 0 (owner)!
    }
}</code></pre>
            <strong>Why it happens:</strong>
            <ul>
                <li>Local storage variables default to slot 0</li>
                <li>Compiler doesn't warn (older versions)</li>
                <li>Can overwrite critical state</li>
            </ul>
            <strong>Modern solution:</strong>
            <ul>
                <li>Solidity 0.5.0+ requires explicit memory/storage</li>
                <li>Always specify data location</li>
                <li>Initialize variables properly</li>
            </ul>
        `
    }
];

// Export for use in main data file
if (typeof module !== 'undefined' && module.exports) {
    module.exports = advancedSecurity;
}