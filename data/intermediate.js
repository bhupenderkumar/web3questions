// Intermediate Web3 Questions - Smart Contracts, DeFi, Token Standards - 55 questions total
const intermediateQuestions = [
    // ==================== SMART CONTRACT FUNDAMENTALS (15 questions) ====================
    {
        title: "What is a smart contract in detail?",
        tags: ["smart-contracts", "solidity", "difficulty-intermediate"],
        answer: `
            <p>A <strong>smart contract</strong> is a program stored on a blockchain that automatically executes when predetermined conditions are met. On Ethereum, smart contracts are written in Solidity and compiled to bytecode that runs on the EVM.</p>
            <strong>Anatomy of a smart contract:</strong>
            <pre><code class="language-solidity">// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract SimpleStorage {
    // State variables (stored on blockchain)
    uint256 public storedData;
    address public owner;
    
    // Events
    event DataStored(uint256 data, address indexed by);
    
    // Constructor (runs once at deployment)
    constructor() {
        owner = msg.sender;
    }
    
    // Functions
    function set(uint256 x) public {
        storedData = x;
        emit DataStored(x, msg.sender);
    }
    
    function get() public view returns (uint256) {
        return storedData;
    }
}</code></pre>
            <strong>Key components:</strong>
            <ul>
                <li><strong>State variables:</strong> Permanently stored on blockchain</li>
                <li><strong>Functions:</strong> Executable code</li>
                <li><strong>Events:</strong> Logging mechanism</li>
                <li><strong>Modifiers:</strong> Reusable function conditions</li>
            </ul>
        `
    },
    {
        title: "What is the Ethereum Virtual Machine (EVM)?",
        tags: ["evm", "ethereum", "difficulty-intermediate"],
        answer: `
            <p>The <strong>EVM</strong> (Ethereum Virtual Machine) is a stack-based virtual machine that executes smart contract bytecode on the Ethereum network.</p>
            <strong>Key characteristics:</strong>
            <ul>
                <li><strong>Turing-complete:</strong> Can compute anything computable (with gas limits)</li>
                <li><strong>Deterministic:</strong> Same input always produces same output</li>
                <li><strong>Isolated:</strong> Contracts run in sandboxed environment</li>
                <li><strong>Stack-based:</strong> Uses a stack for operations</li>
            </ul>
            <strong>EVM components:</strong>
            <ul>
                <li><strong>Stack:</strong> LIFO, 1024 elements max, 256-bit words</li>
                <li><strong>Memory:</strong> Temporary, byte-addressable, cleared between calls</li>
                <li><strong>Storage:</strong> Permanent, key-value store, expensive</li>
                <li><strong>Calldata:</strong> Read-only input data</li>
            </ul>
            <strong>EVM-compatible chains:</strong> Polygon, BSC, Avalanche, Arbitrum, Optimism
        `
    },
    {
        title: "What is bytecode and ABI?",
        tags: ["evm", "solidity", "difficulty-intermediate"],
        answer: `
            <p><strong>Bytecode</strong> and <strong>ABI</strong> are two outputs from compiling Solidity code.</p>
            <strong>Bytecode:</strong>
            <ul>
                <li>Low-level machine code that runs on the EVM</li>
                <li>Hexadecimal representation of opcodes</li>
                <li>Deployed to the blockchain</li>
            </ul>
            <pre><code>// Example bytecode (abbreviated)
0x608060405234801561001057600080fd5b50...</code></pre>
            <strong>ABI (Application Binary Interface):</strong>
            <ul>
                <li>JSON description of contract interface</li>
                <li>Defines functions, parameters, and events</li>
                <li>Used by frontends to interact with contracts</li>
            </ul>
            <pre><code class="language-json">[
  {
    "inputs": [{"name": "x", "type": "uint256"}],
    "name": "set",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }
]</code></pre>
        `
    },
    {
        title: "What is contract deployment?",
        tags: ["smart-contracts", "difficulty-intermediate"],
        answer: `
            <p><strong>Contract deployment</strong> is the process of publishing a smart contract to the blockchain, making it available for interaction.</p>
            <strong>Deployment process:</strong>
            <ol>
                <li>Write and compile Solidity code</li>
                <li>Create deployment transaction (no 'to' address)</li>
                <li>Include bytecode in transaction data</li>
                <li>Sign and broadcast transaction</li>
                <li>Contract receives unique address</li>
            </ol>
            <strong>Deployment with Ethers.js:</strong>
            <pre><code class="language-javascript">const factory = new ethers.ContractFactory(abi, bytecode, signer);
const contract = await factory.deploy(constructorArgs);
await contract.deployed();
console.log("Deployed to:", contract.address);</code></pre>
            <strong>Costs:</strong>
            <ul>
                <li>Gas for bytecode storage (200 gas per byte)</li>
                <li>Constructor execution gas</li>
                <li>More complex contracts = higher deployment cost</li>
            </ul>
        `
    },
    {
        title: "What are Solidity data types?",
        tags: ["solidity", "difficulty-intermediate"],
        answer: `
            <p>Solidity has various data types for different use cases.</p>
            <strong>Value Types:</strong>
            <ul>
                <li><strong>bool:</strong> true or false</li>
                <li><strong>uint/int:</strong> Unsigned/signed integers (uint8 to uint256)</li>
                <li><strong>address:</strong> 20-byte Ethereum address</li>
                <li><strong>bytes1-bytes32:</strong> Fixed-size byte arrays</li>
                <li><strong>enum:</strong> User-defined type with set of values</li>
            </ul>
            <strong>Reference Types:</strong>
            <ul>
                <li><strong>arrays:</strong> Fixed or dynamic size</li>
                <li><strong>struct:</strong> Custom data structures</li>
                <li><strong>mapping:</strong> Key-value storage</li>
                <li><strong>string:</strong> Dynamic UTF-8 encoded string</li>
                <li><strong>bytes:</strong> Dynamic byte array</li>
            </ul>
            <pre><code class="language-solidity">mapping(address => uint256) public balances;
struct User { string name; uint256 balance; }
uint256[] public dynamicArray;</code></pre>
        `
    },
    {
        title: "What are function visibility modifiers in Solidity?",
        tags: ["solidity", "difficulty-intermediate"],
        answer: `
            <p>Solidity functions have visibility modifiers that control access.</p>
            <strong>Visibility Types:</strong>
            <ul>
                <li><strong>public:</strong> Accessible from anywhere (internal + external)</li>
                <li><strong>external:</strong> Only callable from outside the contract</li>
                <li><strong>internal:</strong> Only from this contract or derived contracts</li>
                <li><strong>private:</strong> Only from this contract</li>
            </ul>
            <strong>State Mutability:</strong>
            <ul>
                <li><strong>view:</strong> Reads state but doesn't modify</li>
                <li><strong>pure:</strong> Doesn't read or modify state</li>
                <li><strong>payable:</strong> Can receive ETH</li>
            </ul>
            <pre><code class="language-solidity">function getBalance() public view returns (uint256) {
    return address(this).balance;
}

function calculateSum(uint a, uint b) public pure returns (uint) {
    return a + b;
}

function deposit() public payable {
    // Can receive ETH
}</code></pre>
        `
    },
    {
        title: "What are events in smart contracts?",
        tags: ["solidity", "events", "difficulty-intermediate"],
        answer: `
            <p><strong>Events</strong> are a logging mechanism in Solidity that emit data to the blockchain's transaction logs, which can be queried by off-chain applications.</p>
            <pre><code class="language-solidity">contract Token {
    event Transfer(
        address indexed from,
        address indexed to,
        uint256 value
    );
    
    function transfer(address to, uint256 amount) public {
        // ... transfer logic
        emit Transfer(msg.sender, to, amount);
    }
}</code></pre>
            <strong>Key points:</strong>
            <ul>
                <li><strong>indexed:</strong> Up to 3 parameters can be indexed for filtering</li>
                <li>Events are stored in logs, not contract storage (cheaper)</li>
                <li>Cannot be read by smart contracts, only off-chain</li>
                <li>Common for frontend updates and historical queries</li>
            </ul>
            <strong>Listening to events (JavaScript):</strong>
            <pre><code class="language-javascript">contract.on("Transfer", (from, to, value) => {
    console.log(\`\${from} sent \${value} to \${to}\`);
});</code></pre>
        `
    },
    {
        title: "What are modifiers in Solidity?",
        tags: ["solidity", "difficulty-intermediate"],
        answer: `
            <p><strong>Modifiers</strong> are reusable code that can be added to functions to add checks or modify behavior.</p>
            <pre><code class="language-solidity">contract Ownable {
    address public owner;
    
    modifier onlyOwner() {
        require(msg.sender == owner, "Not owner");
        _; // Placeholder for function body
    }
    
    modifier validAddress(address addr) {
        require(addr != address(0), "Invalid address");
        _;
    }
    
    function withdraw() public onlyOwner {
        // Only owner can call this
    }
    
    function transfer(address to) public validAddress(to) {
        // Address must be valid
    }
}</code></pre>
            <strong>Common use cases:</strong>
            <ul>
                <li>Access control (onlyOwner, onlyAdmin)</li>
                <li>Input validation</li>
                <li>Reentrancy guards</li>
                <li>Pausable functionality</li>
            </ul>
        `
    },
    {
        title: "What is the difference between require, assert, and revert?",
        tags: ["solidity", "difficulty-intermediate"],
        answer: `
            <p>Solidity provides three ways to handle errors and revert transactions.</p>
            <strong>require():</strong>
            <ul>
                <li>Used for input validation and external conditions</li>
                <li>Refunds remaining gas</li>
                <li>Can include error message</li>
            </ul>
            <pre><code class="language-solidity">require(balance >= amount, "Insufficient balance");</code></pre>
            <strong>assert():</strong>
            <ul>
                <li>Used for internal errors and invariants</li>
                <li>Consumes all remaining gas (pre-0.8.0)</li>
                <li>Should never fail in production</li>
            </ul>
            <pre><code class="language-solidity">assert(balance == previousBalance - amount);</code></pre>
            <strong>revert():</strong>
            <ul>
                <li>Explicitly reverts with optional message</li>
                <li>Useful in complex conditions</li>
                <li>Can use custom errors (gas efficient)</li>
            </ul>
            <pre><code class="language-solidity">if (amount > balance) {
    revert InsufficientBalance(balance, amount);
}</code></pre>
        `
    },
    {
        title: "What is contract inheritance in Solidity?",
        tags: ["solidity", "difficulty-intermediate"],
        answer: `
            <p>Solidity supports multiple inheritance, allowing contracts to inherit from one or more parent contracts.</p>
            <pre><code class="language-solidity">contract Ownable {
    address public owner;
    modifier onlyOwner() { require(msg.sender == owner); _; }
}

contract Pausable is Ownable {
    bool public paused;
    modifier whenNotPaused() { require(!paused); _; }
}

contract Token is Ownable, Pausable {
    // Inherits from both
    function transfer() public whenNotPaused {
        // ...
    }
}</code></pre>
            <strong>Key concepts:</strong>
            <ul>
                <li><strong>is:</strong> Keyword for inheritance</li>
                <li><strong>virtual:</strong> Function can be overridden</li>
                <li><strong>override:</strong> Function overrides parent</li>
                <li><strong>super:</strong> Call parent function</li>
            </ul>
            <strong>C3 Linearization:</strong> Determines order when multiple parents
        `
    },
    {
        title: "What is the difference between memory, storage, and calldata?",
        tags: ["solidity", "evm", "difficulty-intermediate"],
        answer: `
            <p>Solidity has three data locations for reference types.</p>
            <strong>Storage:</strong>
            <ul>
                <li>Permanent storage on blockchain</li>
                <li>State variables are storage by default</li>
                <li>Most expensive (SSTORE: 20,000 gas)</li>
                <li>Persists between function calls</li>
            </ul>
            <strong>Memory:</strong>
            <ul>
                <li>Temporary, exists during function execution</li>
                <li>Used for function parameters and local variables</li>
                <li>Cheaper than storage</li>
                <li>Mutable</li>
            </ul>
            <strong>Calldata:</strong>
            <ul>
                <li>Read-only, contains function arguments</li>
                <li>Only for external function parameters</li>
                <li>Cheapest option</li>
                <li>Immutable</li>
            </ul>
            <pre><code class="language-solidity">function process(string calldata input) external {
    string memory temp = input; // Copy to memory
    // storage would be a state variable
}</code></pre>
        `
    },
    {
        title: "What is a constructor in Solidity?",
        tags: ["solidity", "difficulty-intermediate"],
        answer: `
            <p>A <strong>constructor</strong> is a special function that executes only once when a contract is deployed.</p>
            <pre><code class="language-solidity">contract Token {
    string public name;
    address public owner;
    uint256 public totalSupply;
    
    constructor(string memory _name, uint256 _initialSupply) {
        name = _name;
        owner = msg.sender;
        totalSupply = _initialSupply;
    }
}</code></pre>
            <strong>Key points:</strong>
            <ul>
                <li>Runs exactly once at deployment</li>
                <li>Cannot be called after deployment</li>
                <li>Can accept parameters</li>
                <li>Used to set initial state and owner</li>
                <li>No function name or visibility keyword needed</li>
            </ul>
        `
    },
    {
        title: "What are interfaces in Solidity?",
        tags: ["solidity", "difficulty-intermediate"],
        answer: `
            <p><strong>Interfaces</strong> define a contract's external functions without implementation, enabling contract-to-contract interaction.</p>
            <pre><code class="language-solidity">interface IERC20 {
    function transfer(address to, uint256 amount) external returns (bool);
    function balanceOf(address account) external view returns (uint256);
    event Transfer(address indexed from, address indexed to, uint256 value);
}

contract MyContract {
    IERC20 public token;
    
    constructor(address tokenAddress) {
        token = IERC20(tokenAddress);
    }
    
    function checkBalance(address user) public view returns (uint256) {
        return token.balanceOf(user);
    }
}</code></pre>
            <strong>Interface rules:</strong>
            <ul>
                <li>Cannot have state variables</li>
                <li>Cannot have constructors</li>
                <li>All functions must be external</li>
                <li>Cannot implement any functions</li>
            </ul>
        `
    },
    {
        title: "What are libraries in Solidity?",
        tags: ["solidity", "difficulty-intermediate"],
        answer: `
            <p><strong>Libraries</strong> are reusable code deployed once and called by multiple contracts, saving gas.</p>
            <pre><code class="language-solidity">library SafeMath {
    function add(uint256 a, uint256 b) internal pure returns (uint256) {
        uint256 c = a + b;
        require(c >= a, "Overflow");
        return c;
    }
}

contract Token {
    using SafeMath for uint256;
    
    mapping(address => uint256) balances;
    
    function transfer(address to, uint256 amount) public {
        balances[msg.sender] = balances[msg.sender].sub(amount);
        balances[to] = balances[to].add(amount);
    }
}</code></pre>
            <strong>Key points:</strong>
            <ul>
                <li><strong>using for:</strong> Attaches library functions to types</li>
                <li>Libraries cannot have state variables</li>
                <li>Internal functions are inlined</li>
                <li>Common examples: SafeMath, Address, Strings</li>
            </ul>
        `
    },
    {
        title: "What is the receive and fallback function?",
        tags: ["solidity", "difficulty-intermediate"],
        answer: `
            <p>Special functions that handle ETH transfers and unknown function calls.</p>
            <pre><code class="language-solidity">contract Receiver {
    event Received(address sender, uint256 amount);
    event FallbackCalled(address sender, bytes data);
    
    // Called when ETH is sent with empty calldata
    receive() external payable {
        emit Received(msg.sender, msg.value);
    }
    
    // Called when no function matches or when ETH sent with data
    fallback() external payable {
        emit FallbackCalled(msg.sender, msg.data);
    }
}</code></pre>
            <strong>Call order:</strong>
            <ol>
                <li>If calldata is empty and receive exists → receive()</li>
                <li>Otherwise → fallback()</li>
            </ol>
            <strong>Use cases:</strong>
            <ul>
                <li>Receiving ETH</li>
                <li>Proxy contracts</li>
                <li>Handling unknown calls</li>
            </ul>
        `
    },

    // ==================== TOKEN STANDARDS (10 questions) ====================
    {
        title: "What is ERC-20?",
        tags: ["tokens", "erc20", "difficulty-intermediate"],
        answer: `
            <p><strong>ERC-20</strong> is the standard interface for fungible tokens on Ethereum.</p>
            <strong>Required functions:</strong>
            <pre><code class="language-solidity">interface IERC20 {
    function totalSupply() external view returns (uint256);
    function balanceOf(address account) external view returns (uint256);
    function transfer(address to, uint256 amount) external returns (bool);
    function allowance(address owner, address spender) external view returns (uint256);
    function approve(address spender, uint256 amount) external returns (bool);
    function transferFrom(address from, address to, uint256 amount) external returns (bool);
    
    event Transfer(address indexed from, address indexed to, uint256 value);
    event Approval(address indexed owner, address indexed spender, uint256 value);
}</code></pre>
            <strong>Key concepts:</strong>
            <ul>
                <li><strong>Fungible:</strong> Each token is identical and interchangeable</li>
                <li><strong>Approve/TransferFrom:</strong> Allows delegated transfers</li>
                <li><strong>Examples:</strong> USDC, LINK, UNI, AAVE</li>
            </ul>
        `
    },
    {
        title: "What is ERC-721?",
        tags: ["tokens", "nft", "difficulty-intermediate"],
        answer: `
            <p><strong>ERC-721</strong> is the standard for non-fungible tokens (NFTs) on Ethereum.</p>
            <strong>Key functions:</strong>
            <pre><code class="language-solidity">interface IERC721 {
    function balanceOf(address owner) external view returns (uint256);
    function ownerOf(uint256 tokenId) external view returns (address);
    function safeTransferFrom(address from, address to, uint256 tokenId) external;
    function transferFrom(address from, address to, uint256 tokenId) external;
    function approve(address to, uint256 tokenId) external;
    function setApprovalForAll(address operator, bool approved) external;
    function getApproved(uint256 tokenId) external view returns (address);
    function isApprovedForAll(address owner, address operator) external view returns (bool);
}</code></pre>
            <strong>Key concepts:</strong>
            <ul>
                <li>Each token has a unique tokenId</li>
                <li>Non-fungible: Each token is unique</li>
                <li>Often includes tokenURI for metadata</li>
                <li><strong>Examples:</strong> CryptoPunks, BAYC, Art Blocks</li>
            </ul>
        `
    },
    {
        title: "What is ERC-1155?",
        tags: ["tokens", "nft", "difficulty-intermediate"],
        answer: `
            <p><strong>ERC-1155</strong> is a multi-token standard that supports both fungible and non-fungible tokens in a single contract.</p>
            <pre><code class="language-solidity">interface IERC1155 {
    function balanceOf(address account, uint256 id) external view returns (uint256);
    function balanceOfBatch(address[] calldata accounts, uint256[] calldata ids) 
        external view returns (uint256[] memory);
    function safeTransferFrom(address from, address to, uint256 id, uint256 amount, bytes calldata data) external;
    function safeBatchTransferFrom(
        address from, address to, uint256[] calldata ids, uint256[] calldata amounts, bytes calldata data
    ) external;
}</code></pre>
            <strong>Benefits:</strong>
            <ul>
                <li>Single contract for multiple token types</li>
                <li>Batch transfers (gas efficient)</li>
                <li>Supports fungible, non-fungible, and semi-fungible</li>
                <li>Popular for gaming items</li>
            </ul>
        `
    },
    {
        title: "What is token approval and allowance?",
        tags: ["tokens", "erc20", "difficulty-intermediate"],
        answer: `
            <p>The <strong>approve/allowance</strong> pattern allows a spender to transfer tokens on behalf of the owner.</p>
            <strong>How it works:</strong>
            <ol>
                <li>Owner calls approve(spender, amount)</li>
                <li>Spender can now call transferFrom(owner, recipient, amount)</li>
                <li>Allowance decreases by transferred amount</li>
            </ol>
            <pre><code class="language-solidity">// User approves Uniswap to spend 100 USDC
usdc.approve(uniswapRouter, 100 * 10**6);

// Uniswap can now transfer user's USDC
usdc.transferFrom(user, pool, 100 * 10**6);</code></pre>
            <strong>Security concerns:</strong>
            <ul>
                <li>Infinite approvals are risky</li>
                <li>Approve to 0 before setting new amount</li>
                <li>Use increaseAllowance/decreaseAllowance when available</li>
            </ul>
        `
    },
    {
        title: "What is ERC-4626?",
        tags: ["tokens", "defi", "difficulty-intermediate"],
        answer: `
            <p><strong>ERC-4626</strong> is the tokenized vault standard for yield-bearing tokens.</p>
            <pre><code class="language-solidity">interface IERC4626 is IERC20 {
    function asset() external view returns (address);
    function totalAssets() external view returns (uint256);
    function deposit(uint256 assets, address receiver) external returns (uint256 shares);
    function withdraw(uint256 assets, address receiver, address owner) external returns (uint256 shares);
    function convertToShares(uint256 assets) external view returns (uint256);
    function convertToAssets(uint256 shares) external view returns (uint256);
}</code></pre>
            <strong>Use cases:</strong>
            <ul>
                <li>Yield aggregators (Yearn vaults)</li>
                <li>Lending protocols (aTokens, cTokens)</li>
                <li>Staking derivatives</li>
                <li>Composable DeFi integrations</li>
            </ul>
        `
    },
    {
        title: "What is token minting and burning?",
        tags: ["tokens", "difficulty-intermediate"],
        answer: `
            <p><strong>Minting</strong> creates new tokens, while <strong>burning</strong> permanently removes tokens from circulation.</p>
            <pre><code class="language-solidity">contract Token is ERC20 {
    address public minter;
    
    function mint(address to, uint256 amount) external {
        require(msg.sender == minter, "Not minter");
        _mint(to, amount); // Creates new tokens
    }
    
    function burn(uint256 amount) external {
        _burn(msg.sender, amount); // Destroys tokens
    }
}</code></pre>
            <strong>Use cases:</strong>
            <ul>
                <li><strong>Minting:</strong> Token rewards, initial distribution, bridging</li>
                <li><strong>Burning:</strong> Fee burns (EIP-1559), buybacks, deflationary mechanisms</li>
            </ul>
        `
    },
    {
        title: "What are wrapped tokens?",
        tags: ["tokens", "defi", "difficulty-intermediate"],
        answer: `
            <p><strong>Wrapped tokens</strong> are tokens that represent another asset at a 1:1 ratio, making them compatible with different protocols or chains.</p>
            <strong>Examples:</strong>
            <ul>
                <li><strong>WETH:</strong> Wrapped Ether (ETH → ERC-20)</li>
                <li><strong>WBTC:</strong> Wrapped Bitcoin (BTC on Ethereum)</li>
                <li><strong>stETH:</strong> Wrapped staked ETH</li>
            </ul>
            <pre><code class="language-solidity">contract WETH {
    function deposit() public payable {
        balanceOf[msg.sender] += msg.value;
    }
    
    function withdraw(uint256 amount) public {
        require(balanceOf[msg.sender] >= amount);
        balanceOf[msg.sender] -= amount;
        payable(msg.sender).transfer(amount);
    }
}</code></pre>
            <strong>Why wrap?</strong> ETH isn't ERC-20 compliant, so WETH allows ETH to be used in DeFi
        `
    },
    {
        title: "What is a token URI and metadata?",
        tags: ["tokens", "nft", "difficulty-intermediate"],
        answer: `
            <p><strong>Token URI</strong> points to metadata describing an NFT (image, attributes, description).</p>
            <pre><code class="language-solidity">function tokenURI(uint256 tokenId) public view returns (string memory) {
    return string(abi.encodePacked(baseURI, tokenId.toString(), ".json"));
}</code></pre>
            <strong>Metadata JSON format:</strong>
            <pre><code class="language-json">{
    "name": "Cool NFT #123",
    "description": "A very cool NFT",
    "image": "ipfs://Qm.../123.png",
    "attributes": [
        {"trait_type": "Background", "value": "Blue"},
        {"trait_type": "Rarity", "value": "Rare"}
    ]
}</code></pre>
            <strong>Storage options:</strong>
            <ul>
                <li>IPFS (decentralized, immutable)</li>
                <li>Arweave (permanent storage)</li>
                <li>On-chain (expensive but fully decentralized)</li>
                <li>Centralized servers (not recommended)</li>
            </ul>
        `
    },
    {
        title: "What is ERC-2981 (NFT Royalties)?",
        tags: ["tokens", "nft", "difficulty-intermediate"],
        answer: `
            <p><strong>ERC-2981</strong> is a standard for NFT royalty information, allowing creators to receive a percentage of secondary sales.</p>
            <pre><code class="language-solidity">interface IERC2981 {
    function royaltyInfo(uint256 tokenId, uint256 salePrice) 
        external view returns (address receiver, uint256 royaltyAmount);
}

contract NFT is ERC721, ERC2981 {
    constructor() {
        _setDefaultRoyalty(msg.sender, 500); // 5% royalty
    }
}</code></pre>
            <strong>Key points:</strong>
            <ul>
                <li>Returns royalty recipient and amount</li>
                <li>Not enforced on-chain (marketplace must honor)</li>
                <li>Typically 2.5-10% of sale price</li>
                <li>Supported by OpenSea, Rarible, etc.</li>
            </ul>
        `
    },
    {
        title: "What is a soulbound token (SBT)?",
        tags: ["tokens", "difficulty-intermediate"],
        answer: `
            <p><strong>Soulbound tokens</strong> are non-transferable tokens that represent identity, credentials, or achievements.</p>
            <pre><code class="language-solidity">contract SoulboundToken is ERC721 {
    error SoulboundTransferDisabled();
    
    function _beforeTokenTransfer(
        address from, address to, uint256 tokenId
    ) internal override {
        // Allow minting (from = 0) but not transfers
        if (from != address(0)) {
            revert SoulboundTransferDisabled();
        }
    }
}</code></pre>
            <strong>Use cases:</strong>
            <ul>
                <li>Educational credentials and certifications</li>
                <li>Proof of attendance (POAPs)</li>
                <li>Reputation and identity</li>
                <li>DAO membership badges</li>
                <li>Credit scores and trust</li>
            </ul>
        `
    },

    // ==================== DEFI FUNDAMENTALS (15 questions) ====================
    {
        title: "What is DeFi (Decentralized Finance)?",
        tags: ["defi", "difficulty-intermediate"],
        answer: `
            <p><strong>DeFi</strong> is a financial system built on blockchain that provides traditional financial services without intermediaries.</p>
            <strong>Key characteristics:</strong>
            <ul>
                <li><strong>Permissionless:</strong> Anyone can participate</li>
                <li><strong>Transparent:</strong> All code and transactions visible</li>
                <li><strong>Composable:</strong> Protocols can be combined (money legos)</li>
                <li><strong>Non-custodial:</strong> Users maintain control of funds</li>
            </ul>
            <strong>DeFi categories:</strong>
            <ul>
                <li>Decentralized Exchanges (Uniswap, Curve)</li>
                <li>Lending/Borrowing (Aave, Compound)</li>
                <li>Yield Aggregators (Yearn)</li>
                <li>Derivatives (dYdX, GMX)</li>
                <li>Stablecoins (MakerDAO, Frax)</li>
            </ul>
        `
    },
    {
        title: "What is a DEX (Decentralized Exchange)?",
        tags: ["defi", "dex", "difficulty-intermediate"],
        answer: `
            <p>A <strong>DEX</strong> is a peer-to-peer marketplace for trading cryptocurrencies without a central authority.</p>
            <strong>Types of DEXs:</strong>
            <ul>
                <li><strong>AMM (Automated Market Maker):</strong> Uniswap, Curve, Balancer</li>
                <li><strong>Order Book:</strong> dYdX, Serum</li>
                <li><strong>Aggregators:</strong> 1inch, Paraswap</li>
            </ul>
            <strong>How AMMs work:</strong>
            <ul>
                <li>Liquidity providers deposit token pairs into pools</li>
                <li>Traders swap against these pools</li>
                <li>Prices determined by mathematical formula</li>
                <li>LPs earn fees from trades</li>
            </ul>
            <strong>DEX vs CEX:</strong>
            <table>
                <tr><th>Aspect</th><th>DEX</th><th>CEX</th></tr>
                <tr><td>Custody</td><td>Non-custodial</td><td>Custodial</td></tr>
                <tr><td>KYC</td><td>None</td><td>Required</td></tr>
                <tr><td>Speed</td><td>Blockchain speed</td><td>Instant</td></tr>
            </table>
        `
    },
    {
        title: "What is an AMM (Automated Market Maker)?",
        tags: ["defi", "dex", "difficulty-intermediate"],
        answer: `
            <p>An <strong>AMM</strong> is a type of DEX that uses mathematical formulas to price assets instead of order books.</p>
            <strong>Constant Product Formula (Uniswap v2):</strong>
            <pre><code>x * y = k
// x = token A reserves
// y = token B reserves
// k = constant</code></pre>
            <strong>How it works:</strong>
            <ol>
                <li>Liquidity providers deposit equal value of two tokens</li>
                <li>Trades change the ratio of tokens in pool</li>
                <li>Price adjusts based on supply and demand</li>
                <li>Larger trades have more price impact (slippage)</li>
            </ol>
            <strong>Popular AMM designs:</strong>
            <ul>
                <li><strong>Uniswap:</strong> Constant product (x*y=k)</li>
                <li><strong>Curve:</strong> StableSwap (optimized for pegged assets)</li>
                <li><strong>Balancer:</strong> Weighted pools (any ratio)</li>
            </ul>
        `
    },
    {
        title: "What is liquidity provision and LP tokens?",
        tags: ["defi", "dex", "difficulty-intermediate"],
        answer: `
            <p><strong>Liquidity provision</strong> is depositing tokens into a DEX pool to enable trading. LPs receive <strong>LP tokens</strong> representing their share.</p>
            <strong>How it works:</strong>
            <ol>
                <li>Deposit equal value of two tokens (e.g., ETH/USDC)</li>
                <li>Receive LP tokens representing pool share</li>
                <li>Earn trading fees proportional to share</li>
                <li>Burn LP tokens to withdraw liquidity + fees</li>
            </ol>
            <pre><code class="language-solidity">// Simplified LP token logic
function addLiquidity(uint amountA, uint amountB) external {
    // Transfer tokens to pool
    // Mint LP tokens to user
    uint shares = calculateShares(amountA, amountB);
    _mint(msg.sender, shares);
}</code></pre>
            <strong>Risks:</strong>
            <ul>
                <li>Impermanent loss</li>
                <li>Smart contract risk</li>
                <li>Token price volatility</li>
            </ul>
        `
    },
    {
        title: "What is impermanent loss?",
        tags: ["defi", "dex", "difficulty-intermediate"],
        answer: `
            <p><strong>Impermanent loss</strong> occurs when the price of tokens in a liquidity pool changes compared to when you deposited them.</p>
            <strong>Example:</strong>
            <ul>
                <li>Deposit: 1 ETH + 2000 USDC (ETH = $2000)</li>
                <li>ETH price doubles to $4000</li>
                <li>Pool rebalances: 0.707 ETH + 2828 USDC</li>
                <li>If held: 1 ETH + 2000 USDC = $6000</li>
                <li>In pool: 0.707 ETH + 2828 USDC = $5656</li>
                <li>Loss: ~5.7%</li>
            </ul>
            <strong>Key points:</strong>
            <ul>
                <li>Called "impermanent" because it reverses if prices return</li>
                <li>Greater price divergence = greater loss</li>
                <li>Trading fees may offset the loss</li>
                <li>Stablecoin pairs have minimal IL</li>
            </ul>
        `
    },
    {
        title: "What is lending and borrowing in DeFi?",
        tags: ["defi", "lending", "difficulty-intermediate"],
        answer: `
            <p>DeFi <strong>lending protocols</strong> allow users to lend assets to earn interest or borrow against collateral.</p>
            <strong>How it works:</strong>
            <ol>
                <li><strong>Suppliers:</strong> Deposit assets, receive interest-bearing tokens</li>
                <li><strong>Borrowers:</strong> Deposit collateral, borrow up to a limit</li>
                <li>Interest rates set algorithmically based on utilization</li>
                <li>Collateral liquidated if health factor drops too low</li>
            </ol>
            <strong>Key metrics:</strong>
            <ul>
                <li><strong>LTV (Loan-to-Value):</strong> Max borrow vs collateral</li>
                <li><strong>Liquidation Threshold:</strong> Point at which liquidation occurs</li>
                <li><strong>Health Factor:</strong> Risk metric (liquidation if < 1)</li>
                <li><strong>Utilization Rate:</strong> Borrowed / Total supplied</li>
            </ul>
            <strong>Popular protocols:</strong> Aave, Compound, MakerDAO
        `
    },
    {
        title: "What is collateralization and liquidation?",
        tags: ["defi", "lending", "difficulty-intermediate"],
        answer: `
            <p><strong>Collateralization</strong> is depositing assets to secure a loan. <strong>Liquidation</strong> occurs when collateral value falls below requirements.</p>
            <strong>Over-collateralization:</strong>
            <ul>
                <li>Must deposit more value than you borrow</li>
                <li>Typical ratio: 150% (borrow $100, need $150 collateral)</li>
                <li>Protects lenders from defaults</li>
            </ul>
            <strong>Liquidation process:</strong>
            <ol>
                <li>Collateral value drops below threshold</li>
                <li>Position becomes eligible for liquidation</li>
                <li>Liquidator repays debt, receives collateral + bonus</li>
                <li>Remaining collateral returned to borrower</li>
            </ol>
            <pre><code>Health Factor = (Collateral * Liquidation Threshold) / Debt
If Health Factor < 1 → Liquidation</code></pre>
        `
    },
    {
        title: "What is yield farming?",
        tags: ["defi", "difficulty-intermediate"],
        answer: `
            <p><strong>Yield farming</strong> is the practice of moving crypto between DeFi protocols to maximize returns.</p>
            <strong>Common strategies:</strong>
            <ul>
                <li>Providing liquidity to DEXs for trading fees</li>
                <li>Lending assets for interest</li>
                <li>Staking LP tokens for additional rewards</li>
                <li>Leveraged farming (borrow to farm more)</li>
            </ul>
            <strong>Reward sources:</strong>
            <ul>
                <li>Trading fees</li>
                <li>Interest from lending</li>
                <li>Protocol token incentives</li>
                <li>Governance rewards</li>
            </ul>
            <strong>Risks:</strong>
            <ul>
                <li>Impermanent loss</li>
                <li>Smart contract bugs</li>
                <li>Token price crashes</li>
                <li>Rug pulls</li>
            </ul>
        `
    },
    {
        title: "What is TVL (Total Value Locked)?",
        tags: ["defi", "metrics", "difficulty-intermediate"],
        answer: `
            <p><strong>TVL</strong> measures the total value of assets deposited in a DeFi protocol, indicating its size and trust.</p>
            <strong>What TVL includes:</strong>
            <ul>
                <li>Liquidity in DEX pools</li>
                <li>Collateral in lending protocols</li>
                <li>Assets in vaults and yield aggregators</li>
                <li>Staked tokens</li>
            </ul>
            <strong>Interpreting TVL:</strong>
            <ul>
                <li>Higher TVL = more trusted/used protocol</li>
                <li>Can be inflated by token prices rising</li>
                <li>Compare to market cap for valuation</li>
            </ul>
            <strong>Top protocols by TVL:</strong> Lido, Aave, MakerDAO, Uniswap
        `
    },
    {
        title: "What is a flash loan?",
        tags: ["defi", "difficulty-intermediate"],
        answer: `
            <p>A <strong>flash loan</strong> is an uncollateralized loan that must be borrowed and repaid within a single transaction.</p>
            <pre><code class="language-solidity">contract FlashLoanExample {
    function executeFlashLoan(uint256 amount) external {
        // 1. Borrow from Aave
        pool.flashLoan(address(this), token, amount, "");
        // Control returns to executeOperation()
    }
    
    function executeOperation(
        address asset, uint256 amount, uint256 premium, bytes calldata
    ) external returns (bool) {
        // 2. Use the borrowed funds
        // Arbitrage, liquidation, collateral swap, etc.
        
        // 3. Repay loan + fee
        IERC20(asset).approve(pool, amount + premium);
        return true;
    }
}</code></pre>
            <strong>Use cases:</strong>
            <ul>
                <li>Arbitrage opportunities</li>
                <li>Collateral swaps</li>
                <li>Self-liquidation</li>
                <li>One-click leverage</li>
            </ul>
            <strong>Risk:</strong> Transaction reverts if loan isn't repaid
        `
    },
    {
        title: "What is slippage in DeFi?",
        tags: ["defi", "dex", "difficulty-intermediate"],
        answer: `
            <p><strong>Slippage</strong> is the difference between the expected price and the actual execution price of a trade.</p>
            <strong>Causes:</strong>
            <ul>
                <li>Trade size relative to liquidity (price impact)</li>
                <li>Price movement between submission and execution</li>
                <li>MEV/frontrunning attacks</li>
            </ul>
            <strong>Slippage tolerance:</strong>
            <pre><code class="language-solidity">// User expects 100 tokens, accepts 1% slippage
uint256 amountOutMin = expectedAmount * 99 / 100;
router.swapExactTokensForTokens(
    amountIn, amountOutMin, path, to, deadline
);</code></pre>
            <strong>Best practices:</strong>
            <ul>
                <li>Set appropriate slippage tolerance (0.5-1% typical)</li>
                <li>Use DEX aggregators for better prices</li>
                <li>Split large trades</li>
                <li>Trade in liquid pools</li>
            </ul>
        `
    },
    {
        title: "What is a stablecoin and how do they work?",
        tags: ["defi", "stablecoin", "difficulty-intermediate"],
        answer: `
            <p>A <strong>stablecoin</strong> maintains a stable value, usually pegged to USD. Different mechanisms achieve this stability.</p>
            <strong>Types:</strong>
            <ul>
                <li><strong>Fiat-backed (USDC, USDT):</strong> $1 reserve per token</li>
                <li><strong>Crypto-backed (DAI):</strong> Over-collateralized by crypto</li>
                <li><strong>Algorithmic (FRAX):</strong> Uses algorithms + partial collateral</li>
            </ul>
            <strong>DAI mechanism:</strong>
            <ol>
                <li>Deposit ETH as collateral (150% min)</li>
                <li>Borrow DAI against collateral</li>
                <li>If collateral drops, position liquidated</li>
                <li>Stability fees maintain peg</li>
            </ol>
            <strong>Risks:</strong>
            <ul>
                <li>Depegging events</li>
                <li>Counterparty risk (fiat-backed)</li>
                <li>Collateral volatility (crypto-backed)</li>
            </ul>
        `
    },
    {
        title: "What is a DAO (Decentralized Autonomous Organization)?",
        tags: ["defi", "governance", "difficulty-intermediate"],
        answer: `
            <p>A <strong>DAO</strong> is an organization governed by smart contracts and token holder votes rather than traditional management.</p>
            <strong>Governance process:</strong>
            <ol>
                <li>Token holders create proposals</li>
                <li>Community discusses and votes</li>
                <li>If passed, proposal executed on-chain</li>
            </ol>
            <pre><code class="language-solidity">contract DAO {
    function propose(address target, bytes calldata data) external {
        require(token.balanceOf(msg.sender) >= proposalThreshold);
        proposals[proposalId] = Proposal(target, data);
    }
    
    function vote(uint256 proposalId, bool support) external {
        uint256 weight = token.balanceOf(msg.sender);
        proposals[proposalId].votes += support ? weight : -weight;
    }
    
    function execute(uint256 proposalId) external {
        require(proposals[proposalId].votes > quorum);
        target.call(proposals[proposalId].data);
    }
}</code></pre>
            <strong>Examples:</strong> MakerDAO, Uniswap, Aave, Compound
        `
    },
    {
        title: "What is a governance token?",
        tags: ["defi", "governance", "difficulty-intermediate"],
        answer: `
            <p>A <strong>governance token</strong> gives holders voting power over protocol decisions.</p>
            <strong>Rights typically include:</strong>
            <ul>
                <li>Voting on protocol upgrades</li>
                <li>Parameter changes (fees, rates)</li>
                <li>Treasury allocation</li>
                <li>Adding new features or assets</li>
            </ul>
            <strong>Popular governance tokens:</strong>
            <ul>
                <li><strong>UNI:</strong> Uniswap governance</li>
                <li><strong>AAVE:</strong> Aave lending protocol</li>
                <li><strong>MKR:</strong> MakerDAO governance</li>
                <li><strong>COMP:</strong> Compound governance</li>
            </ul>
            <strong>Vote delegation:</strong> Many protocols allow delegating voting power to others
        `
    },
    {
        title: "What is a liquidity pool?",
        tags: ["defi", "dex", "difficulty-intermediate"],
        answer: `
            <p>A <strong>liquidity pool</strong> is a smart contract containing locked tokens that facilitate trading on a DEX.</p>
            <strong>Components:</strong>
            <ul>
                <li>Token pair (e.g., ETH/USDC)</li>
                <li>Reserves of each token</li>
                <li>Pricing algorithm</li>
                <li>LP token for tracking ownership</li>
            </ul>
            <pre><code class="language-solidity">contract LiquidityPool {
    uint256 public reserveA;
    uint256 public reserveB;
    
    function swap(address tokenIn, uint256 amountIn) external {
        // Calculate output using constant product formula
        uint256 amountOut = getAmountOut(amountIn, reserveA, reserveB);
        // Update reserves and transfer tokens
    }
    
    function getAmountOut(uint256 amountIn, uint256 resIn, uint256 resOut) 
        internal pure returns (uint256) {
        uint256 amountInWithFee = amountIn * 997; // 0.3% fee
        return (amountInWithFee * resOut) / (resIn * 1000 + amountInWithFee);
    }
}</code></pre>
        `
    },

    // ==================== DEVELOPMENT TOOLS (5 questions) ====================
    {
        title: "What is Hardhat?",
        tags: ["development", "tools", "difficulty-intermediate"],
        answer: `
            <p><strong>Hardhat</strong> is a popular Ethereum development environment for compiling, testing, and deploying smart contracts.</p>
            <strong>Key features:</strong>
            <ul>
                <li>Local Ethereum network for testing</li>
                <li>Built-in Solidity compiler</li>
                <li>Debugging with console.log</li>
                <li>Plugin ecosystem (ethers, waffle, etc.)</li>
            </ul>
            <pre><code class="language-javascript">// hardhat.config.js
module.exports = {
    solidity: "0.8.19",
    networks: {
        hardhat: {},
        sepolia: {
            url: process.env.SEPOLIA_RPC,
            accounts: [process.env.PRIVATE_KEY]
        }
    }
};

// Deploy script
async function main() {
    const Contract = await ethers.getContractFactory("MyContract");
    const contract = await Contract.deploy();
    console.log("Deployed to:", contract.address);
}</code></pre>
        `
    },
    {
        title: "What is Foundry?",
        tags: ["development", "tools", "difficulty-intermediate"],
        answer: `
            <p><strong>Foundry</strong> is a fast, portable Ethereum development toolkit written in Rust.</p>
            <strong>Components:</strong>
            <ul>
                <li><strong>Forge:</strong> Testing and building</li>
                <li><strong>Cast:</strong> CLI for interacting with contracts</li>
                <li><strong>Anvil:</strong> Local Ethereum node</li>
                <li><strong>Chisel:</strong> Solidity REPL</li>
            </ul>
            <strong>Testing in Solidity:</strong>
            <pre><code class="language-solidity">contract TokenTest is Test {
    Token token;
    
    function setUp() public {
        token = new Token();
    }
    
    function testTransfer() public {
        token.mint(address(this), 100);
        token.transfer(address(1), 50);
        assertEq(token.balanceOf(address(1)), 50);
    }
    
    function testFuzz_Transfer(uint256 amount) public {
        vm.assume(amount <= 100);
        // Fuzz testing with random inputs
    }
}</code></pre>
        `
    },
    {
        title: "What is ethers.js?",
        tags: ["development", "javascript", "difficulty-intermediate"],
        answer: `
            <p><strong>ethers.js</strong> is a JavaScript library for interacting with Ethereum.</p>
            <pre><code class="language-javascript">import { ethers } from 'ethers';

// Connect to provider
const provider = new ethers.providers.Web3Provider(window.ethereum);

// Get signer
const signer = provider.getSigner();

// Connect to contract
const contract = new ethers.Contract(address, abi, signer);

// Read data
const balance = await contract.balanceOf(address);

// Write transaction
const tx = await contract.transfer(recipient, amount);
await tx.wait(); // Wait for confirmation

// Parse units
const oneEth = ethers.utils.parseEther("1.0");
const formatted = ethers.utils.formatEther(balance);</code></pre>
            <strong>Key classes:</strong>
            <ul>
                <li><strong>Provider:</strong> Read-only blockchain access</li>
                <li><strong>Signer:</strong> Can sign transactions</li>
                <li><strong>Contract:</strong> Interface to smart contracts</li>
            </ul>
        `
    },
    {
        title: "What is web3.js vs ethers.js?",
        tags: ["development", "javascript", "difficulty-intermediate"],
        answer: `
            <p>Both are JavaScript libraries for Ethereum, but have different designs.</p>
            <table>
                <tr><th>Aspect</th><th>web3.js</th><th>ethers.js</th></tr>
                <tr><td>Size</td><td>Larger</td><td>Smaller</td></tr>
                <tr><td>Architecture</td><td>Single object</td><td>Modular (Provider/Signer)</td></tr>
                <tr><td>TypeScript</td><td>Add-on</td><td>Native</td></tr>
                <tr><td>Maintenance</td><td>Ethereum Foundation</td><td>Richard Moore</td></tr>
                <tr><td>ENS</td><td>Manual</td><td>Built-in</td></tr>
            </table>
            <strong>ethers.js is generally preferred for:</strong>
            <ul>
                <li>Smaller bundle size</li>
                <li>Better TypeScript support</li>
                <li>Cleaner API design</li>
                <li>Built-in ENS and utilities</li>
            </ul>
        `
    },
    {
        title: "What is IPFS?",
        tags: ["storage", "decentralized", "difficulty-intermediate"],
        answer: `
            <p><strong>IPFS</strong> (InterPlanetary File System) is a decentralized storage protocol for storing and sharing files.</p>
            <strong>How it works:</strong>
            <ul>
                <li>Content is addressed by its hash (CID)</li>
                <li>Same content always has same address</li>
                <li>Files distributed across network nodes</li>
                <li>No central server</li>
            </ul>
            <strong>Use in Web3:</strong>
            <ul>
                <li>NFT metadata and images</li>
                <li>dApp frontends</li>
                <li>Document storage</li>
            </ul>
            <pre><code>// IPFS URL format
ipfs://QmPK1s3pNYLi9ERiq3BDxKa4XosgWwFRQUydHUtz4YgpqB

// Gateway URL
https://ipfs.io/ipfs/QmPK1s3pNYLi9ERiq3BDxKa4XosgWwFRQUydHUtz4YgpqB</code></pre>
            <strong>Pinning services:</strong> Pinata, Infura, NFT.Storage
        `
    }
];

// Export for use in main data.js
if (typeof module !== 'undefined' && module.exports) {
    module.exports = intermediateQuestions;
}