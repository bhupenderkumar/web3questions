// Advanced Web3 Questions - EVM Internals & Low-Level Concepts
const advancedEVM = [
    {
        title: "How does the EVM execute bytecode?",
        tags: ["evm", "difficulty-advanced"],
        answer: `
            <p>The <strong>EVM</strong> is a stack-based virtual machine that executes bytecode instruction by instruction.</p>
            <strong>Execution model:</strong>
            <pre><code>// EVM State during execution:
{
    stack: [],           // LIFO, max 1024 items
    memory: bytes,       // Byte-addressable, expandable
    storage: mapping,    // Persistent key-value store
    pc: number,          // Program counter
    gas: number,         // Remaining gas
    calldata: bytes,     // Input data (read-only)
    returndata: bytes    // Output from last call
}

// Execution loop:
while (pc < code.length && gas > 0) {
    opcode = code[pc]
    executeOpcode(opcode)
    pc++
}</code></pre>
            <strong>Example bytecode:</strong>
            <pre><code>// Solidity: return 1 + 2
PUSH1 0x01  // Push 1 to stack
PUSH1 0x02  // Push 2 to stack
ADD         // Pop 2 values, push sum (3)
PUSH1 0x00  // Memory offset
MSTORE      // Store in memory
PUSH1 0x20  // Return size (32 bytes)
PUSH1 0x00  // Return offset
RETURN      // Return value</code></pre>
        `
    },
    {
        title: "What are the most important EVM opcodes?",
        tags: ["evm", "opcodes", "difficulty-advanced"],
        answer: `
            <p>EVM <strong>opcodes</strong> are the low-level instructions that smart contracts execute.</p>
            <strong>Stack operations:</strong>
            <pre><code>PUSH1-PUSH32  // Push 1-32 bytes to stack
POP           // Remove top item
DUP1-DUP16    // Duplicate nth item
SWAP1-SWAP16  // Swap top with nth item</code></pre>
            <strong>Arithmetic:</strong>
            <pre><code>ADD, SUB, MUL, DIV    // Basic math
MOD, EXP              // Modulo, exponent
ADDMOD, MULMOD        // Modular operations
SIGNEXTEND            // Sign extension</code></pre>
            <strong>Memory/Storage:</strong>
            <pre><code>MLOAD, MSTORE, MSTORE8  // Memory (temporary)
SLOAD, SSTORE           // Storage (persistent)
CALLDATALOAD           // Read input data
CODECOPY               // Copy contract code</code></pre>
            <strong>Control flow:</strong>
            <pre><code>JUMP, JUMPI    // Unconditional/conditional jump
JUMPDEST       // Valid jump destination
REVERT         // Revert with data
RETURN         // Return with data
STOP           // Halt execution</code></pre>
            <strong>Gas costs vary:</strong> ADD = 3 gas, SSTORE = 20,000 gas (new value)
        `
    },
    {
        title: "How does the EVM handle function calls?",
        tags: ["evm", "solidity", "difficulty-advanced"],
        answer: `
            <p>Function calls use a <strong>function selector</strong> (first 4 bytes of keccak256 hash) to route to the correct function.</p>
            <strong>Function selector:</strong>
            <pre><code>// Function: transfer(address,uint256)
selector = keccak256("transfer(address,uint256)")[:4]
         = 0xa9059cbb

// Calldata structure:
[4 bytes selector][32 bytes param1][32 bytes param2]...
0xa9059cbb
0000000000000000000000001234567890123456789012345678901234567890
0000000000000000000000000000000000000000000000000000000000000064</code></pre>
            <strong>Dispatcher pattern (compiled Solidity):</strong>
            <pre><code>// Pseudo-bytecode
CALLDATALOAD(0)      // Load first 32 bytes
SHR(224)             // Right shift to get 4 bytes
DUP1
PUSH4 0xa9059cbb     // transfer selector
EQ
PUSH2 [transfer_offset]
JUMPI                // Jump if match
// ... check other selectors</code></pre>
            <strong>External vs Internal calls:</strong>
            <ul>
                <li>External: CALL opcode, new context</li>
                <li>Internal: JUMP opcode, same context</li>
            </ul>
        `
    },
    {
        title: "What is the EVM memory model?",
        tags: ["evm", "memory", "difficulty-advanced"],
        answer: `
            <p>EVM <strong>memory</strong> is a byte-addressable, linear array that expands dynamically.</p>
            <strong>Memory layout:</strong>
            <pre><code>// Solidity memory layout:
0x00-0x3f (64 bytes): Scratch space
0x40-0x5f (32 bytes): Free memory pointer
0x60-0x7f (32 bytes): Zero slot
0x80+: Actual memory allocations

// Free memory pointer:
mload(0x40)  // Get current free memory position
mstore(0x40, newPtr)  // Update after allocation</code></pre>
            <strong>Memory expansion cost:</strong>
            <pre><code>// Gas cost grows quadratically
memory_cost = (memory_size_words² / 512) + (3 * memory_size_words)

// Accessing memory at offset expands if needed
MSTORE(offset, value)  // May expand memory</code></pre>
            <strong>Best practices:</strong>
            <ul>
                <li>Memory is cleared between external calls</li>
                <li>Use memory for temporary calculations</li>
                <li>Minimize memory expansion</li>
            </ul>
        `
    },
    {
        title: "How does storage work in the EVM?",
        tags: ["evm", "storage", "difficulty-advanced"],
        answer: `
            <p>EVM <strong>storage</strong> is a persistent key-value store with 256-bit keys and values.</p>
            <strong>Storage layout:</strong>
            <pre><code>// State variables get sequential slots
contract Example {
    uint256 a;        // slot 0
    uint256 b;        // slot 1
    uint128 c;        // slot 2 (first 16 bytes)
    uint128 d;        // slot 2 (next 16 bytes) - PACKED!
}

// Mappings and arrays:
mapping(address => uint) balances;
// balances[addr] stored at: keccak256(addr . slot)

uint[] dynamicArray;
// Length at slot n
// Element i at: keccak256(n) + i</code></pre>
            <strong>Gas costs:</strong>
            <pre><code>SLOAD:  2100 gas (cold), 100 gas (warm)
SSTORE: 
  - 0 → non-zero: 20,000 gas
  - non-zero → non-zero: 2,900 gas
  - non-zero → 0: 2,900 gas + 4,800 refund</code></pre>
            <strong>Optimization:</strong> Pack variables, minimize storage writes
        `
    },
    {
        title: "What is the CREATE and CREATE2 difference?",
        tags: ["evm", "deployment", "difficulty-advanced"],
        answer: `
            <p><strong>CREATE</strong> and <strong>CREATE2</strong> are opcodes for deploying contracts with different address derivation.</p>
            <strong>CREATE:</strong>
            <pre><code>// Address = keccak256(rlp([sender, nonce]))[12:]
address = keccak256(
    rlp.encode([deployer_address, deployer_nonce])
)[12:32]

// Address changes with each deployment (nonce increases)
// Cannot predict address before deployment</code></pre>
            <strong>CREATE2:</strong>
            <pre><code>// Address = keccak256(0xff ++ sender ++ salt ++ keccak256(initCode))[12:]
address = keccak256(
    0xff,
    deployer_address,
    salt,            // User-provided 32 bytes
    keccak256(bytecode)
)[12:32]

// Address is deterministic and predictable
// Same salt + same code = same address (any chain!)</code></pre>
            <strong>Use cases for CREATE2:</strong>
            <ul>
                <li>Counterfactual deployments</li>
                <li>Cross-chain same address</li>
                <li>Factory patterns</li>
                <li>Upgradeable proxies</li>
            </ul>
        `
    },
    {
        title: "How do proxy patterns work at the EVM level?",
        tags: ["evm", "upgrades", "difficulty-advanced"],
        answer: `
            <p><strong>Proxy patterns</strong> use DELEGATECALL to execute implementation logic with proxy storage.</p>
            <strong>Minimal proxy (EIP-1167):</strong>
            <pre><code>// Clone bytecode (45 bytes)
3d602d80600a3d3981f3363d3d373d3d3d363d73
<implementation_address>
5af43d82803e903d91602b57fd5bf3

// What it does:
1. Copy calldata to memory
2. DELEGATECALL to implementation
3. Copy returndata
4. Return or revert based on success</code></pre>
            <strong>Transparent Proxy:</strong>
            <pre><code>fallback() {
    if (msg.sender == admin) {
        // Admin calls go to proxy functions
        handleAdmin();
    } else {
        // User calls delegatecall to implementation
        delegateToImplementation();
    }
}</code></pre>
            <strong>UUPS (Universal Upgradeable Proxy):</strong>
            <pre><code>// Upgrade logic in implementation, not proxy
// Proxy is simpler and cheaper to deploy
function upgradeTo(address newImpl) external {
    require(msg.sender == owner);
    StorageSlot.getAddressSlot(IMPL_SLOT).value = newImpl;
}</code></pre>
        `
    },
    {
        title: "What is the EVM call stack and context?",
        tags: ["evm", "difficulty-advanced"],
        answer: `
            <p>Each <strong>call</strong> creates a new execution context on the call stack.</p>
            <strong>Context includes:</strong>
            <pre><code>CallContext {
    address: executing contract address,
    caller: msg.sender,
    value: msg.value,
    calldata: input data,
    gas: available gas,
    code: bytecode to execute,
    storage: contract's storage,
    memory: fresh memory,
    returndata: empty initially,
    stack: empty
}</code></pre>
            <strong>Call types and context:</strong>
            <table>
                <tr><th>Opcode</th><th>Storage</th><th>msg.sender</th><th>msg.value</th></tr>
                <tr><td>CALL</td><td>Callee's</td><td>Caller</td><td>Can send</td></tr>
                <tr><td>DELEGATECALL</td><td>Caller's</td><td>Original</td><td>Preserved</td></tr>
                <tr><td>STATICCALL</td><td>Callee's (read)</td><td>Caller</td><td>0</td></tr>
                <tr><td>CALLCODE</td><td>Caller's</td><td>Caller</td><td>Can send</td></tr>
            </table>
            <strong>Call stack limit:</strong> 1024 depth (causes stack overflow error)
        `
    },
    {
        title: "How does gas metering work in the EVM?",
        tags: ["evm", "gas", "difficulty-advanced"],
        answer: `
            <p><strong>Gas metering</strong> ensures execution costs are paid and prevents infinite loops.</p>
            <strong>Gas calculation:</strong>
            <pre><code>// Transaction gas
tx_gas = 21000 (base) + calldata_gas + execution_gas

// Calldata gas:
- Zero byte: 4 gas
- Non-zero byte: 16 gas

// Execution gas:
- Each opcode has specific cost
- Memory expansion adds cost
- Storage operations are expensive</code></pre>
            <strong>EIP-1559 gas model:</strong>
            <pre><code>max_fee = maxFeePerGas * gasLimit
actual_fee = (baseFee + priorityFee) * gasUsed

// Burned: baseFee * gasUsed
// To validator: priorityFee * gasUsed
// Refunded: (gasLimit - gasUsed) * effectiveGasPrice</code></pre>
            <strong>Gas optimization patterns:</strong>
            <ul>
                <li>Short-circuit evaluation</li>
                <li>Caching storage reads</li>
                <li>Packing storage variables</li>
                <li>Using unchecked for safe math</li>
            </ul>
        `
    },
    {
        title: "What are precompiled contracts?",
        tags: ["evm", "difficulty-advanced"],
        answer: `
            <p><strong>Precompiles</strong> are contracts at fixed addresses with native implementations for expensive operations.</p>
            <strong>Ethereum precompiles (addresses 0x01-0x09):</strong>
            <pre><code>0x01: ecRecover     - Recover signer from signature
0x02: SHA256        - SHA-256 hash
0x03: RIPEMD160     - RIPEMD-160 hash
0x04: identity      - Data copy
0x05: modexp        - Modular exponentiation
0x06: ecAdd         - BN256 curve point addition
0x07: ecMul         - BN256 curve point multiplication
0x08: ecPairing     - BN256 pairing check
0x09: blake2f       - BLAKE2 compression</code></pre>
            <strong>Usage:</strong>
            <pre><code class="language-solidity">// ecRecover example
function recoverSigner(bytes32 hash, bytes memory sig) 
    public pure returns (address) 
{
    (bytes32 r, bytes32 s, uint8 v) = splitSig(sig);
    // Calls precompile at 0x01
    return ecrecover(hash, v, r, s);
}</code></pre>
            <strong>Why precompiles:</strong>
            <ul>
                <li>Much cheaper than EVM implementation</li>
                <li>Enable cryptographic operations</li>
                <li>Fixed gas costs</li>
            </ul>
        `
    },
    {
        title: "How does the EVM handle errors and reverts?",
        tags: ["evm", "errors", "difficulty-advanced"],
        answer: `
            <p>The EVM has several ways to handle errors and revert state changes.</p>
            <strong>Error types:</strong>
            <pre><code>// REVERT opcode
- Returns remaining gas
- Can include error data
- State changes undone

// INVALID opcode / Assert failure
- Consumes all gas (pre-0.8.0)
- No error data
- State changes undone

// Out of gas
- No return data
- State changes undone</code></pre>
            <strong>Error encoding (Solidity 0.8+):</strong>
            <pre><code class="language-solidity">// String error
revert("Insufficient balance");
// Encoded as: Error(string)
// 0x08c379a0 + abi.encode("Insufficient balance")

// Custom error
error InsufficientBalance(uint256 available, uint256 required);
revert InsufficientBalance(100, 200);
// Encoded as: selector + abi.encode(100, 200)

// Panic codes
assert(x > 0);  // Panic(uint256)
// 0x01: Assert failure
// 0x11: Arithmetic overflow
// 0x12: Division by zero</code></pre>
        `
    },
    {
        title: "What is EVM bytecode optimization?",
        tags: ["evm", "optimization", "difficulty-advanced"],
        answer: `
            <p><strong>Bytecode optimization</strong> reduces gas costs by minimizing operations and storage access.</p>
            <strong>Compiler optimizations (solc):</strong>
            <pre><code>// Optimizer settings
{
    "optimizer": {
        "enabled": true,
        "runs": 200  // Optimize for ~200 calls
    }
}

// runs: trade-off
// Low runs: smaller bytecode, higher exec cost
// High runs: larger bytecode, lower exec cost</code></pre>
            <strong>Manual optimizations:</strong>
            <pre><code class="language-solidity">// Cache storage reads
uint256 _balance = balances[user]; // SLOAD once
require(_balance >= amount);
balances[user] = _balance - amount;

// Use unchecked for known-safe math
unchecked {
    balances[to] += amount; // Skip overflow check
}

// Short-circuit expensive operations
require(amount > 0 && balances[msg.sender] >= amount);

// Pack structs
struct Packed {
    uint128 a;  // Same slot
    uint128 b;  // Same slot
}</code></pre>
        `
    },
    {
        title: "How do events and logs work at the EVM level?",
        tags: ["evm", "events", "difficulty-advanced"],
        answer: `
            <p><strong>Events</strong> emit logs stored in transaction receipts, not contract storage.</p>
            <strong>Log structure:</strong>
            <pre><code>Log {
    address: contract address,
    topics: [topic0, topic1, topic2, topic3],  // Max 4 topics
    data: bytes  // Unlimited size
}

// topic0 = keccak256(event signature)
// indexed params → topics (max 3)
// non-indexed params → data</code></pre>
            <strong>EVM opcodes:</strong>
            <pre><code>LOG0  // No topics
LOG1  // 1 topic
LOG2  // 2 topics
LOG3  // 3 topics
LOG4  // 4 topics

// Gas cost: 375 + 375*numTopics + 8*dataSize</code></pre>
            <strong>Solidity events:</strong>
            <pre><code class="language-solidity">event Transfer(
    address indexed from,   // topic1
    address indexed to,     // topic2
    uint256 value          // data
);
// topic0 = keccak256("Transfer(address,address,uint256)")

emit Transfer(sender, recipient, amount);</code></pre>
            <strong>Note:</strong> Logs cannot be read by smart contracts, only off-chain
        `
    }
];

// Export for use in main data file
if (typeof module !== 'undefined' && module.exports) {
    module.exports = advancedEVM;
}