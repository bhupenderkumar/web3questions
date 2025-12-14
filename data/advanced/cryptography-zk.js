// Advanced Web3 Questions - Cryptography & Zero Knowledge
const advancedCryptography = [
    {
        title: "What are zero-knowledge proofs and how do they work?",
        tags: ["cryptography", "zk", "difficulty-advanced"],
        answer: `
            <p><strong>Zero-knowledge proofs (ZKPs)</strong> allow proving a statement is true without revealing any information beyond the statement's validity.</p>
            <strong>Properties:</strong>
            <ul>
                <li><strong>Completeness:</strong> If statement is true, honest verifier will be convinced</li>
                <li><strong>Soundness:</strong> If statement is false, no cheating prover can convince verifier</li>
                <li><strong>Zero-knowledge:</strong> Verifier learns nothing except that statement is true</li>
            </ul>
            <strong>Classic example (Ali Baba's cave):</strong>
            <pre><code>// Peggy wants to prove she knows secret password
// Without revealing the password

1. Victor waits outside, Peggy enters cave
2. Cave has two paths meeting at locked door
3. Victor shouts which path to return from
4. If Peggy knows password, she can always comply
5. Repeat many times → convinces Victor</code></pre>
            <strong>Applications:</strong> Private transactions, identity verification, rollups
        `
    },
    {
        title: "What is the difference between SNARKs and STARKs?",
        tags: ["cryptography", "zk", "difficulty-advanced"],
        answer: `
            <p><strong>SNARKs</strong> and <strong>STARKs</strong> are two types of zero-knowledge proof systems.</p>
            <table>
                <tr><th>Aspect</th><th>SNARK</th><th>STARK</th></tr>
                <tr><td>Full name</td><td>Succinct Non-interactive ARgument of Knowledge</td><td>Scalable Transparent ARgument of Knowledge</td></tr>
                <tr><td>Trusted setup</td><td>Required</td><td>Not required</td></tr>
                <tr><td>Proof size</td><td>~200 bytes</td><td>~50 KB</td></tr>
                <tr><td>Verification time</td><td>Fast</td><td>Slightly slower</td></tr>
                <tr><td>Prover time</td><td>Slower</td><td>Faster (scalable)</td></tr>
                <tr><td>Quantum resistance</td><td>No</td><td>Yes</td></tr>
                <tr><td>Cryptographic basis</td><td>Elliptic curves</td><td>Hash functions</td></tr>
            </table>
            <strong>Use cases:</strong>
            <ul>
                <li><strong>SNARKs:</strong> Zcash, zkSync, Polygon zkEVM</li>
                <li><strong>STARKs:</strong> StarkNet, StarkEx</li>
            </ul>
        `
    },
    {
        title: "What is a trusted setup and why is it needed?",
        tags: ["cryptography", "zk", "difficulty-advanced"],
        answer: `
            <p>A <strong>trusted setup</strong> is a ceremony that generates public parameters for SNARK systems.</p>
            <strong>The problem:</strong>
            <pre><code>// During setup, "toxic waste" is generated
// If anyone keeps this data, they can:
// - Create fake proofs
// - Break the entire system

// Solution: Multi-party computation (MPC)
1. Many participants contribute randomness
2. Each destroys their secret
3. System is secure if ANY ONE participant is honest</code></pre>
            <strong>Types of setups:</strong>
            <ul>
                <li><strong>Per-circuit:</strong> New setup for each program (Groth16)</li>
                <li><strong>Universal:</strong> One setup for any program (PLONK, Marlin)</li>
                <li><strong>Transparent:</strong> No trusted setup needed (STARKs)</li>
            </ul>
            <strong>Famous ceremonies:</strong>
            <ul>
                <li>Zcash Powers of Tau (87 participants)</li>
                <li>Hermez ceremony (over 100 participants)</li>
            </ul>
        `
    },
    {
        title: "How do zk-SNARKs work at a high level?",
        tags: ["cryptography", "zk", "difficulty-advanced"],
        answer: `
            <p><strong>zk-SNARKs</strong> convert computational problems into polynomial equations that can be verified efficiently.</p>
            <strong>Pipeline:</strong>
            <pre><code>1. COMPUTATION → Write program logic
   ↓
2. ARITHMETIC CIRCUIT → Gates and wires
   ↓
3. R1CS → Rank-1 Constraint System (equations)
   ↓
4. QAP → Quadratic Arithmetic Program (polynomials)
   ↓
5. PROOF → Elliptic curve cryptography
   ↓
6. VERIFY → Check polynomial relationships</code></pre>
            <strong>Key insight:</strong>
            <ul>
                <li>Polynomials are used because they have useful properties</li>
                <li>Two different polynomials rarely intersect</li>
                <li>Checking at random point is sufficient</li>
            </ul>
            <strong>Prover work:</strong> O(n log n) - must process entire computation
            <strong>Verifier work:</strong> O(1) - constant time regardless of computation size
        `
    },
    {
        title: "What is Circom and how is it used?",
        tags: ["cryptography", "zk", "development", "difficulty-advanced"],
        answer: `
            <p><strong>Circom</strong> is a domain-specific language for writing arithmetic circuits for ZK proofs.</p>
            <strong>Example circuit:</strong>
            <pre><code class="language-javascript">pragma circom 2.0.0;

template Multiplier() {
    signal input a;
    signal input b;
    signal output c;
    
    c <== a * b;  // Constraint: c must equal a * b
}

template ProveSolution() {
    signal input x;      // Private input
    signal output hash;  // Public output
    
    component hasher = Poseidon(1);
    hasher.inputs[0] <== x;
    hash <== hasher.out;
    
    // Proves: "I know x such that Poseidon(x) = hash"
}

component main = ProveSolution();</code></pre>
            <strong>Workflow:</strong>
            <ol>
                <li>Write circuit in Circom</li>
                <li>Compile to R1CS + WASM</li>
                <li>Generate proving/verification keys</li>
                <li>Create proofs with snarkjs</li>
                <li>Verify on-chain with Solidity verifier</li>
            </ol>
        `
    },
    {
        title: "What is the difference between PLONK and Groth16?",
        tags: ["cryptography", "zk", "difficulty-advanced"],
        answer: `
            <p><strong>Groth16</strong> and <strong>PLONK</strong> are different proving systems with distinct trade-offs.</p>
            <table>
                <tr><th>Aspect</th><th>Groth16</th><th>PLONK</th></tr>
                <tr><td>Trusted setup</td><td>Per circuit</td><td>Universal</td></tr>
                <tr><td>Proof size</td><td>~200 bytes (smallest)</td><td>~400 bytes</td></tr>
                <tr><td>Verification</td><td>Fastest</td><td>Fast</td></tr>
                <tr><td>Prover time</td><td>Slow</td><td>Moderate</td></tr>
                <tr><td>Flexibility</td><td>Fixed circuit</td><td>Any circuit</td></tr>
            </table>
            <strong>When to use:</strong>
            <ul>
                <li><strong>Groth16:</strong> Single, fixed application (Zcash)</li>
                <li><strong>PLONK:</strong> General purpose, upgradeable systems</li>
            </ul>
            <strong>PLONK variants:</strong> TurboPLONK, UltraPLONK, HyperPLONK
        `
    },
    {
        title: "What is recursive proof composition?",
        tags: ["cryptography", "zk", "difficulty-advanced"],
        answer: `
            <p><strong>Recursive proofs</strong> allow a proof to verify other proofs, enabling unlimited scalability.</p>
            <strong>How it works:</strong>
            <pre><code>// Instead of verifying each proof individually:
Proof1 + Proof2 + Proof3 + ... + ProofN

// Create proof that verifies proofs:
RecursiveProof = prove(
    "Proof1 is valid" AND 
    "Proof2 is valid" AND
    ...
)

// Can nest further:
FinalProof = prove("RecursiveProof is valid")</code></pre>
            <strong>Applications:</strong>
            <ul>
                <li><strong>Rollup aggregation:</strong> One proof for thousands of txs</li>
                <li><strong>Incremental computation:</strong> Verify ongoing process</li>
                <li><strong>Proof compression:</strong> Reduce on-chain verification</li>
            </ul>
            <strong>Challenge:</strong> Verifying SNARK inside SNARK is expensive
            <strong>Solution:</strong> Cycle of curves (Pasta curves, used by Mina)
        `
    },
    {
        title: "What is KZG polynomial commitment?",
        tags: ["cryptography", "difficulty-advanced"],
        answer: `
            <p><strong>KZG</strong> (Kate-Zaverucha-Goldberg) is a polynomial commitment scheme used in many ZK systems.</p>
            <strong>How it works:</strong>
            <pre><code>// Commitment
1. Have polynomial P(x)
2. Commit: C = [P(τ)]₁ (evaluate at secret τ in elliptic curve group)
3. Commitment is single group element (48 bytes)

// Opening
To prove P(z) = y:
1. Compute quotient polynomial Q(x) = (P(x) - y) / (x - z)
2. Proof: π = [Q(τ)]₁
3. Verify using pairing: e(C - [y]₁, [1]₂) = e(π, [τ - z]₂)</code></pre>
            <strong>Properties:</strong>
            <ul>
                <li>Constant size commitment (48 bytes)</li>
                <li>Constant size proofs</li>
                <li>Requires trusted setup</li>
            </ul>
            <strong>Used in:</strong> EIP-4844 blobs, PLONK, Ethereum's future data sharding
        `
    },
    {
        title: "What is elliptic curve cryptography in blockchain?",
        tags: ["cryptography", "difficulty-advanced"],
        answer: `
            <p><strong>Elliptic curve cryptography (ECC)</strong> provides the mathematical foundation for blockchain signatures and addresses.</p>
            <strong>Curve equation:</strong>
            <pre><code>y² = x³ + ax + b (mod p)

// secp256k1 (Bitcoin, Ethereum):
y² = x³ + 7 (mod p)
p = 2²⁵⁶ - 2³² - 977</code></pre>
            <strong>Key generation:</strong>
            <pre><code>1. Private key: Random 256-bit number (k)
2. Public key: k × G (scalar multiplication)
   where G is generator point
3. Address: Hash of public key</code></pre>
            <strong>ECDSA Signature:</strong>
            <pre><code>Sign(message, privateKey):
1. Hash message → z
2. Pick random k
3. R = k × G
4. r = R.x mod n
5. s = k⁻¹(z + r × privateKey) mod n
6. Signature = (r, s)</code></pre>
            <strong>Why ECC:</strong> Same security as RSA with much smaller keys
        `
    },
    {
        title: "What is BLS signature aggregation?",
        tags: ["cryptography", "difficulty-advanced"],
        answer: `
            <p><strong>BLS signatures</strong> (Boneh-Lynn-Shacham) allow multiple signatures to be aggregated into one.</p>
            <strong>Key benefit:</strong>
            <pre><code>// Traditional (n signatures):
Verify(sig₁, pk₁, msg) AND Verify(sig₂, pk₂, msg) AND ...
// n separate verifications, n signatures stored

// BLS aggregation:
aggSig = sig₁ + sig₂ + ... + sigₙ
Verify(aggSig, aggPk, msg)
// ONE verification, ONE signature stored</code></pre>
            <strong>How it works:</strong>
            <ul>
                <li>Uses pairing-friendly curves (BLS12-381)</li>
                <li>Signatures are curve points</li>
                <li>Addition of points = signature aggregation</li>
            </ul>
            <strong>Used in:</strong>
            <ul>
                <li>Ethereum 2.0 consensus (validators)</li>
                <li>Threshold signatures</li>
                <li>Multi-signatures</li>
            </ul>
            <strong>Trade-off:</strong> Slower than ECDSA for single signatures
        `
    },
    {
        title: "What is a commitment scheme?",
        tags: ["cryptography", "difficulty-advanced"],
        answer: `
            <p>A <strong>commitment scheme</strong> allows committing to a value without revealing it, then opening later.</p>
            <strong>Properties:</strong>
            <ul>
                <li><strong>Hiding:</strong> Commitment reveals nothing about value</li>
                <li><strong>Binding:</strong> Cannot change value after commitment</li>
            </ul>
            <strong>Hash commitment:</strong>
            <pre><code>// Commit
commitment = hash(value || salt)

// Open
reveal(value, salt)
verify: hash(value || salt) == commitment</code></pre>
            <strong>Pedersen commitment:</strong>
            <pre><code>// Commit
C = vG + rH
// v = value, r = random blinding factor
// G, H = generator points

// Homomorphic property:
C₁ + C₂ = (v₁ + v₂)G + (r₁ + r₂)H
// Can add commitments without opening!</code></pre>
            <strong>Uses:</strong> Voting, sealed-bid auctions, zero-knowledge proofs
        `
    },
    {
        title: "What is a Merkle-Patricia Trie?",
        tags: ["cryptography", "ethereum", "difficulty-advanced"],
        answer: `
            <p>The <strong>Merkle-Patricia Trie</strong> is Ethereum's data structure for storing state, combining Merkle trees and Patricia tries.</p>
            <strong>Structure:</strong>
            <pre><code>// Node types:
1. Null node (empty)
2. Leaf node: [encodedPath, value]
3. Extension node: [encodedPath, key to next node]
4. Branch node: [v0...v15, value] (16 children + value)

// Path encoding (hex):
Address: 0x123...
Path through trie follows hex digits</code></pre>
            <strong>Benefits:</strong>
            <ul>
                <li>Cryptographic proof of state</li>
                <li>Efficient updates (only change affected path)</li>
                <li>Light client proofs</li>
            </ul>
            <strong>Ethereum tries:</strong>
            <ul>
                <li>State trie: account data</li>
                <li>Storage trie: contract storage</li>
                <li>Transactions trie: block transactions</li>
                <li>Receipts trie: transaction receipts</li>
            </ul>
        `
    },
    {
        title: "What is Shamir's Secret Sharing?",
        tags: ["cryptography", "security", "difficulty-advanced"],
        answer: `
            <p><strong>Shamir's Secret Sharing</strong> splits a secret into n shares where k shares are needed to reconstruct.</p>
            <strong>How it works:</strong>
            <pre><code>// (k, n) threshold scheme
// k shares needed to reconstruct from n total

// Create shares:
1. Secret = s (constant term)
2. Create random polynomial of degree k-1:
   f(x) = s + a₁x + a₂x² + ... + aₖ₋₁xᵏ⁻¹
3. Shares are points on polynomial:
   Share₁ = (1, f(1))
   Share₂ = (2, f(2))
   ...

// Reconstruct:
Use Lagrange interpolation with any k shares
to find f(0) = s</code></pre>
            <strong>Properties:</strong>
            <ul>
                <li>k-1 shares reveal nothing about secret</li>
                <li>Any k shares can reconstruct</li>
                <li>Information-theoretic security</li>
            </ul>
            <strong>Uses:</strong> Multi-party key management, social recovery wallets
        `
    },
    {
        title: "What is multi-party computation (MPC)?",
        tags: ["cryptography", "security", "difficulty-advanced"],
        answer: `
            <p><strong>Multi-party computation</strong> allows multiple parties to jointly compute a function while keeping inputs private.</p>
            <strong>Example - MPC Wallet:</strong>
            <pre><code>// Traditional: Single private key → single point of failure
// MPC: Key split across multiple parties

Signing with MPC:
1. Key shares held by: User device, Server, Recovery
2. To sign, parties run MPC protocol
3. Each contributes partial signature
4. Combined into valid signature
5. No party ever has complete key</code></pre>
            <strong>Properties:</strong>
            <ul>
                <li>No single party learns others' inputs</li>
                <li>Result is correct even with malicious parties</li>
                <li>Threshold schemes (t-of-n)</li>
            </ul>
            <strong>MPC Wallet providers:</strong> Fireblocks, ZenGo, Coinbase
            <strong>Trade-offs:</strong> Communication overhead, coordination required
        `
    }
];

// Export for use in main data file
if (typeof module !== 'undefined' && module.exports) {
    module.exports = advancedCryptography;
}