// Rust & Web3 Questions - Rust Basics for Blockchain Development
const rustBasics = [
    {
        title: "Why is Rust popular for blockchain development?",
        tags: ["rust", "blockchain", "difficulty-intermediate"],
        answer: `
            <p><strong>Rust</strong> has become the preferred language for blockchain development due to its unique combination of safety and performance.</p>
            <strong>Key advantages:</strong>
            <ul>
                <li><strong>Memory safety:</strong> No null pointers, buffer overflows, or data races</li>
                <li><strong>Zero-cost abstractions:</strong> High-level features compile to efficient code</li>
                <li><strong>No garbage collector:</strong> Predictable performance, crucial for consensus</li>
                <li><strong>Strong type system:</strong> Catches bugs at compile time</li>
                <li><strong>Concurrency:</strong> Fearless concurrency with ownership model</li>
            </ul>
            <strong>Major blockchain projects in Rust:</strong>
            <ul>
                <li>Solana</li>
                <li>Polkadot/Substrate</li>
                <li>Near Protocol</li>
                <li>Cosmos SDK (some components)</li>
                <li>Aptos, Sui (Move VM is Rust-based)</li>
            </ul>
        `
    },
    {
        title: "What is ownership in Rust and why does it matter?",
        tags: ["rust", "difficulty-intermediate"],
        answer: `
            <p><strong>Ownership</strong> is Rust's core concept that enables memory safety without garbage collection.</p>
            <strong>Ownership rules:</strong>
            <ol>
                <li>Each value has exactly one owner</li>
                <li>When owner goes out of scope, value is dropped</li>
                <li>Ownership can be transferred (moved)</li>
            </ol>
            <pre><code class="language-rust">fn main() {
    let s1 = String::from("hello");
    let s2 = s1;  // s1 is MOVED to s2
    // println!("{}", s1);  // ERROR: s1 no longer valid
    
    let s3 = s2.clone();  // Deep copy
    println!("{} {}", s2, s3);  // Both valid
}

fn takes_ownership(s: String) {
    println!("{}", s);
}  // s is dropped here

fn main() {
    let s = String::from("hello");
    takes_ownership(s);
    // s is no longer valid here
}</code></pre>
            <strong>Why it matters for blockchain:</strong>
            <ul>
                <li>Prevents double-spending bugs at compile time</li>
                <li>No memory leaks in long-running nodes</li>
                <li>Predictable resource cleanup</li>
            </ul>
        `
    },
    {
        title: "What are borrowing and references in Rust?",
        tags: ["rust", "difficulty-intermediate"],
        answer: `
            <p><strong>Borrowing</strong> allows accessing data without taking ownership, using references.</p>
            <strong>Reference rules:</strong>
            <ul>
                <li>Many immutable references OR one mutable reference (not both)</li>
                <li>References must always be valid (no dangling)</li>
            </ul>
            <pre><code class="language-rust">fn main() {
    let mut s = String::from("hello");
    
    // Immutable borrow
    let len = calculate_length(&s);
    println!("Length: {}", len);
    
    // Mutable borrow
    change(&mut s);
    println!("{}", s);
}

fn calculate_length(s: &String) -> usize {
    s.len()  // Can read, cannot modify
}

fn change(s: &mut String) {
    s.push_str(", world");  // Can modify
}

// This won't compile:
fn bad() {
    let mut s = String::from("hello");
    let r1 = &s;
    let r2 = &s;      // OK: multiple immutable
    let r3 = &mut s;  // ERROR: can't borrow mutably
}</code></pre>
        `
    },
    {
        title: "What are lifetimes in Rust?",
        tags: ["rust", "difficulty-advanced"],
        answer: `
            <p><strong>Lifetimes</strong> are Rust's way of ensuring references are valid for as long as they're used.</p>
            <strong>Lifetime annotations:</strong>
            <pre><code class="language-rust">// Lifetime parameter 'a
fn longest<'a>(x: &'a str, y: &'a str) -> &'a str {
    if x.len() > y.len() { x } else { y }
}

// Tells compiler: returned reference lives as long as
// the shorter of x or y

fn main() {
    let s1 = String::from("long");
    let result;
    {
        let s2 = String::from("short");
        result = longest(&s1, &s2);
        println!("{}", result);  // OK here
    }
    // println!("{}", result);  // ERROR: s2 dropped
}</code></pre>
            <strong>Struct lifetimes:</strong>
            <pre><code class="language-rust">struct Transaction<'a> {
    sender: &'a str,
    receiver: &'a str,
    amount: u64,
}

// Transaction can't outlive the strings it references</code></pre>
        `
    },
    {
        title: "What are traits in Rust?",
        tags: ["rust", "difficulty-intermediate"],
        answer: `
            <p><strong>Traits</strong> define shared behavior, similar to interfaces in other languages.</p>
            <pre><code class="language-rust">// Define a trait
trait Hashable {
    fn hash(&self) -> Vec<u8>;
    
    // Default implementation
    fn hash_hex(&self) -> String {
        hex::encode(self.hash())
    }
}

// Implement for a struct
struct Transaction {
    from: String,
    to: String,
    amount: u64,
}

impl Hashable for Transaction {
    fn hash(&self) -> Vec<u8> {
        use sha2::{Sha256, Digest};
        let data = format!("{}{}{}", self.from, self.to, self.amount);
        Sha256::digest(data.as_bytes()).to_vec()
    }
}

// Trait bounds
fn process<T: Hashable>(item: T) {
    println!("Hash: {}", item.hash_hex());
}

// Multiple bounds
fn complex<T: Hashable + Clone + Send>(item: T) { }</code></pre>
            <strong>Common traits:</strong> Clone, Copy, Debug, Default, Send, Sync
        `
    },
    {
        title: "What is Result and Option in Rust?",
        tags: ["rust", "difficulty-intermediate"],
        answer: `
            <p><strong>Result</strong> and <strong>Option</strong> are enums for handling errors and optional values safely.</p>
            <strong>Option - for optional values:</strong>
            <pre><code class="language-rust">enum Option<T> {
    Some(T),
    None,
}

fn find_balance(address: &str) -> Option<u64> {
    if address == "0x123" {
        Some(1000)
    } else {
        None
    }
}

fn main() {
    match find_balance("0x123") {
        Some(balance) => println!("Balance: {}", balance),
        None => println!("Address not found"),
    }
    
    // Or use combinators
    let balance = find_balance("0x123").unwrap_or(0);
}</code></pre>
            <strong>Result - for errors:</strong>
            <pre><code class="language-rust">enum Result<T, E> {
    Ok(T),
    Err(E),
}

fn transfer(amount: u64) -> Result<(), TransferError> {
    if amount == 0 {
        return Err(TransferError::ZeroAmount);
    }
    Ok(())
}

// ? operator for propagation
fn process() -> Result<(), Error> {
    let balance = get_balance()?;  // Returns early if Err
    transfer(balance)?;
    Ok(())
}</code></pre>
        `
    },
    {
        title: "What are enums and pattern matching in Rust?",
        tags: ["rust", "difficulty-intermediate"],
        answer: `
            <p><strong>Enums</strong> in Rust can hold data and are matched exhaustively with <strong>pattern matching</strong>.</p>
            <pre><code class="language-rust">// Enum with variants holding data
enum Transaction {
    Transfer { from: String, to: String, amount: u64 },
    Stake { validator: String, amount: u64 },
    Unstake { validator: String },
    Governance { proposal_id: u32, vote: bool },
}

fn process(tx: Transaction) {
    match tx {
        Transaction::Transfer { from, to, amount } => {
            println!("{} sends {} to {}", from, amount, to);
        }
        Transaction::Stake { validator, amount } => {
            println!("Staking {} to {}", amount, validator);
        }
        Transaction::Unstake { validator } => {
            println!("Unstaking from {}", validator);
        }
        Transaction::Governance { proposal_id, vote } => {
            let v = if vote { "yes" } else { "no" };
            println!("Vote {} on proposal {}", v, proposal_id);
        }
    }
}

// if let for single pattern
if let Transaction::Transfer { amount, .. } = tx {
    println!("Transfer of {}", amount);
}</code></pre>
        `
    },
    {
        title: "What is async/await in Rust?",
        tags: ["rust", "async", "difficulty-intermediate"],
        answer: `
            <p><strong>Async/await</strong> enables non-blocking concurrent programming in Rust.</p>
            <pre><code class="language-rust">use tokio;

// Async function
async fn fetch_block(height: u64) -> Result<Block, Error> {
    let response = client.get(&format!("/block/{}", height)).await?;
    let block: Block = response.json().await?;
    Ok(block)
}

// Main with tokio runtime
#[tokio::main]
async fn main() {
    // Sequential
    let block1 = fetch_block(1).await.unwrap();
    let block2 = fetch_block(2).await.unwrap();
    
    // Concurrent
    let (b1, b2) = tokio::join!(
        fetch_block(1),
        fetch_block(2)
    );
    
    // Spawn tasks
    let handle = tokio::spawn(async {
        fetch_block(100).await
    });
    let result = handle.await.unwrap();
}</code></pre>
            <strong>Async runtimes:</strong>
            <ul>
                <li><strong>Tokio:</strong> Most popular, used by many blockchain clients</li>
                <li><strong>async-std:</strong> Standard library-like API</li>
                <li><strong>smol:</strong> Lightweight</li>
            </ul>
        `
    },
    {
        title: "What are macros in Rust?",
        tags: ["rust", "difficulty-advanced"],
        answer: `
            <p><strong>Macros</strong> are code that writes code, enabling metaprogramming.</p>
            <strong>Declarative macros (macro_rules!):</strong>
            <pre><code class="language-rust">// Simple macro
macro_rules! vec_of_strings {
    ($($x:expr),*) => {
        vec![$($x.to_string()),*]
    };
}

let strings = vec_of_strings!["a", "b", "c"];

// Pattern matching in macros
macro_rules! hash_map {
    ($($key:expr => $value:expr),* $(,)?) => {{
        let mut map = std::collections::HashMap::new();
        $(map.insert($key, $value);)*
        map
    }};
}

let balances = hash_map! {
    "alice" => 100,
    "bob" => 200,
};</code></pre>
            <strong>Procedural macros:</strong>
            <pre><code class="language-rust">// Derive macros (like in Substrate)
#[derive(Debug, Clone, Encode, Decode)]
struct Block {
    number: u64,
    hash: Hash,
}

// Attribute macros
#[pallet::call]
impl<T: Config> Pallet<T> {
    #[pallet::weight(10_000)]
    pub fn transfer(origin: OriginFor<T>) -> DispatchResult {
        // ...
    }
}</code></pre>
        `
    },
    {
        title: "What is Cargo and how is it used?",
        tags: ["rust", "tools", "difficulty-basic"],
        answer: `
            <p><strong>Cargo</strong> is Rust's package manager and build system.</p>
            <strong>Common commands:</strong>
            <pre><code class="language-bash"># Create new project
cargo new my_project
cargo new --lib my_library

# Build
cargo build           # Debug build
cargo build --release # Optimized build

# Run
cargo run
cargo run --release

# Test
cargo test
cargo test specific_test

# Check without building
cargo check

# Format and lint
cargo fmt
cargo clippy</code></pre>
            <strong>Cargo.toml:</strong>
            <pre><code class="language-toml">[package]
name = "my_project"
version = "0.1.0"
edition = "2021"

[dependencies]
tokio = { version = "1", features = ["full"] }
serde = { version = "1", features = ["derive"] }
sha2 = "0.10"

[dev-dependencies]
criterion = "0.4"</code></pre>
        `
    },
    {
        title: "How do you handle serialization in Rust for blockchain?",
        tags: ["rust", "serialization", "difficulty-intermediate"],
        answer: `
            <p>Blockchain data requires efficient serialization. Rust offers several options.</p>
            <strong>Serde (most common):</strong>
            <pre><code class="language-rust">use serde::{Serialize, Deserialize};

#[derive(Serialize, Deserialize)]
struct Transaction {
    from: String,
    to: String,
    amount: u64,
    #[serde(skip_serializing_if = "Option::is_none")]
    memo: Option<String>,
}

// JSON
let json = serde_json::to_string(&tx)?;
let tx: Transaction = serde_json::from_str(&json)?;

// Binary (more compact)
let bytes = bincode::serialize(&tx)?;
let tx: Transaction = bincode::deserialize(&bytes)?;</code></pre>
            <strong>SCALE (Substrate):</strong>
            <pre><code class="language-rust">use parity_scale_codec::{Encode, Decode};

#[derive(Encode, Decode)]
struct Block {
    number: u32,
    parent_hash: [u8; 32],
}

let encoded: Vec<u8> = block.encode();
let decoded = Block::decode(&mut &encoded[..])?;</code></pre>
            <strong>Why different formats:</strong>
            <ul>
                <li>JSON: Human readable, APIs</li>
                <li>Bincode: Compact, fast</li>
                <li>SCALE: Substrate-specific, compact</li>
            </ul>
        `
    },
    {
        title: "What is the Rust standard library's relevance to blockchain?",
        tags: ["rust", "difficulty-intermediate"],
        answer: `
            <p>Rust's <strong>standard library</strong> provides essential types, but blockchain development often uses <code>no_std</code> for constrained environments.</p>
            <strong>Key std types used:</strong>
            <pre><code class="language-rust">use std::collections::{HashMap, HashSet, BTreeMap};
use std::sync::{Arc, Mutex, RwLock};
use std::vec::Vec;

// Collections for state
let mut balances: HashMap<Address, u64> = HashMap::new();

// Thread-safe shared state
let state = Arc::new(RwLock::new(ChainState::default()));

// Clone for multiple ownership
let state_clone = Arc::clone(&state);</code></pre>
            <strong>no_std for blockchain runtimes:</strong>
            <pre><code class="language-rust">#![no_std]
// No heap allocations, no std

extern crate alloc;
use alloc::vec::Vec;  // Vec from alloc crate
use alloc::string::String;

// Substrate pallets are no_std
// Allows running in WASM</code></pre>
            <strong>Why no_std:</strong>
            <ul>
                <li>WASM runtime compatibility</li>
                <li>Deterministic execution</li>
                <li>Smaller binary size</li>
            </ul>
        `
    }
];

// Export for use in main data file
if (typeof module !== 'undefined' && module.exports) {
    module.exports = rustBasics;
}