// Basic Web3 Questions - Wallet Concepts
const basicWallets = [
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
    {
        title: "What is a paper wallet?",
        tags: ["wallets", "security", "difficulty-basic"],
        answer: `
            <p>A <strong>paper wallet</strong> is a physical document containing your private key and/or seed phrase.</p>
            <strong>Pros:</strong>
            <ul>
                <li>Completely offline (air-gapped)</li>
                <li>Immune to digital attacks</li>
                <li>Simple to create</li>
            </ul>
            <strong>Cons:</strong>
            <ul>
                <li>Vulnerable to physical damage (fire, water)</li>
                <li>Can be lost or stolen</li>
                <li>Difficult to use for transactions</li>
            </ul>
            <strong>Best practice:</strong> Use metal backups like Cryptosteel for durability
        `
    },
    {
        title: "What is a multi-signature wallet?",
        tags: ["wallets", "security", "difficulty-basic"],
        answer: `
            <p>A <strong>multi-signature (multi-sig) wallet</strong> requires multiple private keys to authorize a transaction.</p>
            <strong>Common configurations:</strong>
            <ul>
                <li><strong>2-of-3:</strong> 2 signatures needed from 3 possible signers</li>
                <li><strong>3-of-5:</strong> 3 signatures needed from 5 possible signers</li>
            </ul>
            <strong>Use cases:</strong>
            <ul>
                <li>Corporate treasury management</li>
                <li>DAO governance</li>
                <li>Enhanced personal security</li>
                <li>Escrow services</li>
            </ul>
            <strong>Popular multi-sig wallets:</strong> Gnosis Safe, Armory, Electrum
        `
    },
    {
        title: "What is wallet connect?",
        tags: ["wallets", "dapps", "difficulty-basic"],
        answer: `
            <p><strong>WalletConnect</strong> is an open protocol for connecting wallets to dApps securely.</p>
            <strong>How it works:</strong>
            <ul>
                <li>Scan QR code or click deep link</li>
                <li>Establishes encrypted connection</li>
                <li>dApp can request transactions</li>
                <li>User approves on their wallet</li>
            </ul>
            <strong>Benefits:</strong>
            <ul>
                <li>Works with many wallets</li>
                <li>Connect mobile wallet to desktop dApp</li>
                <li>End-to-end encryption</li>
                <li>No browser extension needed</li>
            </ul>
        `
    },
    {
        title: "What is address poisoning?",
        tags: ["wallets", "security", "difficulty-basic"],
        answer: `
            <p><strong>Address poisoning</strong> is a scam where attackers send small transactions from addresses that look similar to ones you've used.</p>
            <strong>How it works:</strong>
            <ul>
                <li>Scammer generates address with similar start/end characters</li>
                <li>Sends tiny transaction to appear in your history</li>
                <li>Victim copies wrong address from history</li>
                <li>Funds sent to scammer's address</li>
            </ul>
            <strong>Prevention:</strong>
            <ul>
                <li>Always verify FULL address</li>
                <li>Use address book/contacts feature</li>
                <li>Don't copy addresses from transaction history</li>
            </ul>
        `
    },
    {
        title: "What is a vanity address?",
        tags: ["wallets", "difficulty-basic"],
        answer: `
            <p>A <strong>vanity address</strong> is a cryptocurrency address customized to contain specific characters or words.</p>
            <strong>Examples:</strong>
            <ul>
                <li>0xDEAD... (starts with "DEAD")</li>
                <li>0x...1234 (ends with specific numbers)</li>
                <li>vitalik.eth (ENS name)</li>
            </ul>
            <strong>How they're created:</strong>
            <ul>
                <li>Generate millions of addresses</li>
                <li>Check each for desired pattern</li>
                <li>Longer patterns take exponentially longer</li>
            </ul>
            <strong>Caution:</strong> Never use online vanity generators - they may steal your keys
        `
    }
];

// Export for use in main data file
if (typeof module !== 'undefined' && module.exports) {
    module.exports = basicWallets;
}