// Advanced Web3 Questions - Layer 2 and Scaling Solutions
const advancedLayer2 = [
    {
        title: "What are Optimistic Rollups and how do they work?",
        tags: ["layer2", "rollups", "difficulty-advanced"],
        answer: `
            <p><strong>Optimistic Rollups</strong> execute transactions off-chain and post data to L1, assuming transactions are valid unless challenged.</p>
            <strong>How they work:</strong>
            <pre><code>1. Users submit transactions to L2 sequencer
2. Sequencer batches and executes transactions
3. State root posted to L1 contract
4. 7-day challenge period begins
5. If no valid fraud proof → finalized
6. If fraud proven → state reverted, prover rewarded</code></pre>
            <strong>Fraud proof process:</strong>
            <ol>
                <li>Challenger identifies invalid state transition</li>
                <li>Interactive dispute game begins</li>
                <li>Binary search to find exact invalid step</li>
                <li>L1 executes single step to verify</li>
            </ol>
            <strong>Examples:</strong> Arbitrum, Optimism, Base
            <strong>Trade-offs:</strong>
            <ul>
                <li>+ EVM compatible</li>
                <li>+ Lower fees than L1</li>
                <li>- 7-day withdrawal delay</li>
                <li>- Sequencer centralization risk</li>
            </ul>
        `
    },
    {
        title: "What are ZK-Rollups and how do they work?",
        tags: ["layer2", "rollups", "zk", "difficulty-advanced"],
        answer: `
            <p><strong>ZK-Rollups</strong> use zero-knowledge proofs to cryptographically prove transaction validity without revealing details.</p>
            <strong>How they work:</strong>
            <pre><code>1. Transactions executed off-chain
2. Prover generates validity proof (ZK-SNARK/STARK)
3. Proof + state diff posted to L1
4. L1 verifier contract validates proof
5. If valid → state updated immediately
6. No challenge period needed</code></pre>
            <strong>Types of ZK proofs:</strong>
            <table>
                <tr><th>Type</th><th>Proof Size</th><th>Prover Time</th><th>Trusted Setup</th></tr>
                <tr><td>SNARK</td><td>Small (~200B)</td><td>Slower</td><td>Required</td></tr>
                <tr><td>STARK</td><td>Larger (~50KB)</td><td>Faster</td><td>Not required</td></tr>
            </table>
            <strong>Examples:</strong> zkSync Era, Starknet, Polygon zkEVM, Scroll
            <strong>Trade-offs:</strong>
            <ul>
                <li>+ Instant finality</li>
                <li>+ Highest security</li>
                <li>- Proving is computationally expensive</li>
                <li>- EVM compatibility challenges</li>
            </ul>
        `
    },
    {
        title: "What is the difference between Optimistic and ZK Rollups?",
        tags: ["layer2", "rollups", "difficulty-advanced"],
        answer: `
            <p>Both scale Ethereum but use different approaches to ensure validity.</p>
            <table>
                <tr><th>Aspect</th><th>Optimistic</th><th>ZK</th></tr>
                <tr><td>Validity</td><td>Fraud proofs</td><td>Validity proofs</td></tr>
                <tr><td>Finality</td><td>7 days</td><td>Minutes (after proof)</td></tr>
                <tr><td>Withdrawals</td><td>7 day delay</td><td>Fast</td></tr>
                <tr><td>EVM support</td><td>Full compatibility</td><td>Challenging (zkEVM)</td></tr>
                <tr><td>Computation</td><td>Minimal off-chain</td><td>Heavy proving</td></tr>
                <tr><td>Data on L1</td><td>Full tx data</td><td>State diffs only</td></tr>
            </table>
            <strong>When to use:</strong>
            <ul>
                <li><strong>Optimistic:</strong> General purpose, dApp deployment</li>
                <li><strong>ZK:</strong> Payments, exchanges, privacy needs</li>
            </ul>
        `
    },
    {
        title: "What is EIP-4844 (Proto-Danksharding)?",
        tags: ["layer2", "ethereum", "scaling", "difficulty-advanced"],
        answer: `
            <p><strong>EIP-4844</strong> introduces "blob" transactions to dramatically reduce L2 data posting costs.</p>
            <strong>Key concepts:</strong>
            <pre><code>// Blob-carrying transaction
{
    type: 0x03,
    maxFeePerBlobGas: ...,
    blobVersionedHashes: [...],
    // Blobs attached separately, not in execution
}

// Blobs:
// - 128 KB each
// - Up to 6 per block (initially)
// - Pruned after ~18 days
// - Not accessible to EVM</code></pre>
            <strong>Benefits for L2s:</strong>
            <ul>
                <li>10-100x cheaper data availability</li>
                <li>Separate fee market from execution</li>
                <li>Path to full Danksharding</li>
            </ul>
            <strong>Impact:</strong> L2 fees dropped significantly after Dencun upgrade
        `
    },
    {
        title: "What is data availability and why does it matter?",
        tags: ["layer2", "scaling", "difficulty-advanced"],
        answer: `
            <p><strong>Data availability (DA)</strong> ensures transaction data is accessible to verify state transitions.</p>
            <strong>Why it matters:</strong>
            <ul>
                <li>Without data, can't verify fraud proofs (Optimistic)</li>
                <li>Can't reconstruct state if sequencer fails</li>
                <li>Enables trustless withdrawals</li>
            </ul>
            <strong>DA solutions:</strong>
            <table>
                <tr><th>Solution</th><th>Cost</th><th>Security</th></tr>
                <tr><td>Ethereum calldata</td><td>High</td><td>Highest</td></tr>
                <tr><td>Ethereum blobs</td><td>Medium</td><td>High</td></tr>
                <tr><td>Celestia</td><td>Low</td><td>Own security</td></tr>
                <tr><td>EigenDA</td><td>Low</td><td>Ethereum restaking</td></tr>
                <tr><td>DAC (Data Availability Committee)</td><td>Lowest</td><td>Trust assumptions</td></tr>
            </table>
            <strong>Trade-off:</strong> Cheaper DA = weaker security guarantees
        `
    },
    {
        title: "What is a sequencer and what are its risks?",
        tags: ["layer2", "rollups", "difficulty-advanced"],
        answer: `
            <p>A <strong>sequencer</strong> orders and batches transactions on L2 before posting to L1.</p>
            <strong>Sequencer responsibilities:</strong>
            <ul>
                <li>Receive user transactions</li>
                <li>Order transactions (can extract MEV)</li>
                <li>Execute and batch transactions</li>
                <li>Post batches to L1</li>
            </ul>
            <strong>Centralization risks:</strong>
            <ul>
                <li><strong>Censorship:</strong> Can refuse to include transactions</li>
                <li><strong>Liveness:</strong> Single point of failure</li>
                <li><strong>MEV extraction:</strong> Can front-run users</li>
            </ul>
            <strong>Mitigations:</strong>
            <ul>
                <li><strong>Forced inclusion:</strong> Submit tx directly to L1</li>
                <li><strong>Decentralized sequencers:</strong> In development</li>
                <li><strong>Shared sequencing:</strong> Espresso, Astria</li>
                <li><strong>Based rollups:</strong> L1 validators as sequencers</li>
            </ul>
        `
    },
    {
        title: "What are Validiums and Volitions?",
        tags: ["layer2", "scaling", "difficulty-advanced"],
        answer: `
            <p><strong>Validiums</strong> and <strong>Volitions</strong> are scaling solutions with different data availability trade-offs.</p>
            <strong>Validium:</strong>
            <ul>
                <li>Validity proofs (like ZK rollup)</li>
                <li>Data stored off-chain (DAC)</li>
                <li>Much cheaper than rollups</li>
                <li>Weaker security guarantees</li>
            </ul>
            <strong>Volition:</strong>
            <ul>
                <li>Hybrid: user chooses per-transaction</li>
                <li>Option for on-chain (rollup mode)</li>
                <li>Option for off-chain (validium mode)</li>
                <li>Flexibility vs cost trade-off</li>
            </ul>
            <pre><code>// User choice per transaction:
Rollup mode: Higher cost, full security
Validium mode: Lower cost, DA trust assumptions

// StarkEx, zkSync support this model</code></pre>
        `
    },
    {
        title: "What is account abstraction (ERC-4337)?",
        tags: ["layer2", "wallets", "difficulty-advanced"],
        answer: `
            <p><strong>Account abstraction</strong> makes smart contracts first-class accounts, enabling advanced wallet features.</p>
            <strong>ERC-4337 architecture:</strong>
            <pre><code>UserOperation (not transaction) {
    sender: smart wallet address,
    nonce: ...,
    callData: what to execute,
    callGasLimit: ...,
    verificationGasLimit: ...,
    preVerificationGas: ...,
    maxFeePerGas: ...,
    maxPriorityFeePerGas: ...,
    paymasterAndData: optional sponsor,
    signature: ...
}

Flow:
User → Bundler → EntryPoint Contract → Wallet Contract</code></pre>
            <strong>Features enabled:</strong>
            <ul>
                <li>Gasless transactions (paymasters)</li>
                <li>Social recovery</li>
                <li>Multi-sig built-in</li>
                <li>Session keys</li>
                <li>Batch transactions</li>
                <li>Any signature scheme</li>
            </ul>
        `
    },
    {
        title: "How do state channels work?",
        tags: ["layer2", "scaling", "difficulty-advanced"],
        answer: `
            <p><strong>State channels</strong> allow parties to transact off-chain with on-chain settlement only for disputes.</p>
            <strong>How they work:</strong>
            <pre><code>1. Open channel: Lock funds in multisig contract
2. Off-chain: Exchange signed state updates
3. Each update has incrementing nonce
4. Either party can submit latest state to chain
5. Challenge period for disputes
6. Close: Funds distributed per final state</code></pre>
            <strong>Lightning Network (Bitcoin):</strong>
            <ul>
                <li>Payment channels network</li>
                <li>HTLCs for multi-hop payments</li>
                <li>Instant, near-zero fees</li>
            </ul>
            <strong>Limitations:</strong>
            <ul>
                <li>Need to lock capital</li>
                <li>Both parties must be online (or watchtowers)</li>
                <li>Not suitable for general computation</li>
            </ul>
        `
    },
    {
        title: "What is cross-L2 communication?",
        tags: ["layer2", "bridges", "difficulty-advanced"],
        answer: `
            <p><strong>Cross-L2 communication</strong> enables transactions between different Layer 2 networks.</p>
            <strong>Approaches:</strong>
            <ul>
                <li><strong>Via L1:</strong> L2A → L1 → L2B (slow, secure)</li>
                <li><strong>Liquidity networks:</strong> Atomic swaps with LPs</li>
                <li><strong>Shared sequencing:</strong> Atomic cross-L2 bundles</li>
                <li><strong>Superchain:</strong> Native interop (Optimism vision)</li>
            </ul>
            <strong>Fast bridges:</strong>
            <pre><code>// Liquidity provider model
1. User wants to go L2A → L2B
2. LP has funds on both L2s
3. User sends to LP on L2A
4. LP sends to user on L2B
5. LP rebalances later via slow bridge</code></pre>
            <strong>Examples:</strong> Across, Hop, Stargate, Connext
        `
    },
    {
        title: "What is a Based Rollup?",
        tags: ["layer2", "rollups", "difficulty-advanced"],
        answer: `
            <p>A <strong>Based Rollup</strong> uses Ethereum L1 validators as the sequencer instead of a centralized sequencer.</p>
            <strong>How it works:</strong>
            <pre><code>Traditional Rollup:
User → Centralized Sequencer → L1

Based Rollup:
User → L1 Block Proposer → L1

L1 proposers include L2 transactions directly
No separate sequencer needed</code></pre>
            <strong>Benefits:</strong>
            <ul>
                <li>Inherits L1 liveness and censorship resistance</li>
                <li>No sequencer centralization</li>
                <li>L1 economic security from day 1</li>
                <li>Simpler architecture</li>
            </ul>
            <strong>Trade-offs:</strong>
            <ul>
                <li>Slower block times (L1 speed)</li>
                <li>Higher latency for users</li>
                <li>MEV flows to L1</li>
            </ul>
            <strong>Example:</strong> Taiko
        `
    },
    {
        title: "What are Plasma chains?",
        tags: ["layer2", "scaling", "difficulty-advanced"],
        answer: `
            <p><strong>Plasma</strong> is a scaling framework where child chains periodically commit to the main chain.</p>
            <strong>How it works:</strong>
            <pre><code>1. Child chain processes transactions
2. Merkle root of state committed to L1 periodically
3. Users can exit with Merkle proof
4. Challenge period for fraud
5. Mass exit problem if operator misbehaves</code></pre>
            <strong>Plasma types:</strong>
            <ul>
                <li><strong>Plasma MVP:</strong> Simple UTXO model</li>
                <li><strong>Plasma Cash:</strong> NFT-like unique tokens</li>
                <li><strong>Plasma Debit:</strong> Account-based</li>
            </ul>
            <strong>Why Plasma lost to Rollups:</strong>
            <ul>
                <li>Data availability issues</li>
                <li>Mass exit problem</li>
                <li>Complex exit games</li>
                <li>Doesn't support general smart contracts well</li>
            </ul>
        `
    }
];

// Export for use in main data file
if (typeof module !== 'undefined' && module.exports) {
    module.exports = advancedLayer2;
}