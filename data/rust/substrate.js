// Rust & Web3 Questions - Substrate Framework
const rustSubstrate = [
    {
        title: "What is Substrate?",
        tags: ["substrate", "polkadot", "difficulty-intermediate"],
        answer: `
            <p><strong>Substrate</strong> is a modular blockchain framework built in Rust that allows developers to build custom blockchains.</p>
            <strong>Key features:</strong>
            <ul>
                <li><strong>Modular:</strong> Pick and choose components (pallets)</li>
                <li><strong>Forkless upgrades:</strong> Runtime upgrades without hard forks</li>
                <li><strong>Interoperable:</strong> Can connect to Polkadot as parachain</li>
                <li><strong>WASM-based:</strong> Runtime compiled to WebAssembly</li>
            </ul>
            <strong>Substrate layers:</strong>
            <pre><code>┌─────────────────────────────────┐
│          Runtime (WASM)         │ ← Your business logic
├─────────────────────────────────┤
│         Substrate Core          │ ← Networking, consensus, DB
├─────────────────────────────────┤
│              libp2p             │ ← P2P networking
└─────────────────────────────────┘</code></pre>
            <strong>Projects built with Substrate:</strong> Polkadot, Kusama, Acala, Moonbeam, Astar
        `
    },
    {
        title: "What is a Pallet in Substrate?",
        tags: ["substrate", "difficulty-intermediate"],
        answer: `
            <p>A <strong>Pallet</strong> is a modular component that encapsulates specific blockchain logic.</p>
            <strong>Pallet structure:</strong>
            <pre><code class="language-rust">#[frame_support::pallet]
pub mod pallet {
    use frame_support::pallet_prelude::*;
    use frame_system::pallet_prelude::*;

    #[pallet::pallet]
    pub struct Pallet<T>(_);

    #[pallet::config]
    pub trait Config: frame_system::Config {
        type RuntimeEvent: From<Event<Self>>;
        type MaxLength: Get<u32>;
    }

    #[pallet::storage]
    pub type Balances<T: Config> = StorageMap<_, Blake2_128Concat, T::AccountId, u128>;

    #[pallet::event]
    #[pallet::generate_deposit(pub(super) fn deposit_event)]
    pub enum Event<T: Config> {
        Transferred { from: T::AccountId, to: T::AccountId, amount: u128 },
    }

    #[pallet::error]
    pub enum Error<T> {
        InsufficientBalance,
    }

    #[pallet::call]
    impl<T: Config> Pallet<T> {
        #[pallet::weight(10_000)]
        pub fn transfer(origin: OriginFor<T>, to: T::AccountId, amount: u128) -> DispatchResult {
            let sender = ensure_signed(origin)?;
            // Logic here
            Ok(())
        }
    }
}</code></pre>
        `
    },
    {
        title: "How does Substrate storage work?",
        tags: ["substrate", "storage", "difficulty-intermediate"],
        answer: `
            <p>Substrate provides several <strong>storage primitives</strong> for persisting blockchain state.</p>
            <strong>Storage types:</strong>
            <pre><code class="language-rust">// Single value
#[pallet::storage]
pub type Counter<T> = StorageValue<_, u32, ValueQuery>;

// Key-value map
#[pallet::storage]
pub type Balances<T: Config> = StorageMap<
    _,
    Blake2_128Concat,    // Hasher
    T::AccountId,        // Key
    u128,                // Value
    ValueQuery           // Default behavior
>;

// Double map
#[pallet::storage]
pub type Allowances<T: Config> = StorageDoubleMap<
    _,
    Blake2_128Concat, T::AccountId,  // Key 1
    Blake2_128Concat, T::AccountId,  // Key 2
    u128,                             // Value
    ValueQuery
>;

// N-map for complex keys
#[pallet::storage]
pub type ComplexStorage<T: Config> = StorageNMap<
    _,
    (NMapKey<Blake2_128Concat, u32>, NMapKey<Twox64Concat, u32>),
    Vec<u8>,
>;</code></pre>
            <strong>Query types:</strong>
            <ul>
                <li><strong>ValueQuery:</strong> Returns default if not found</li>
                <li><strong>OptionQuery:</strong> Returns None if not found</li>
            </ul>
        `
    },
    {
        title: "What is FRAME in Substrate?",
        tags: ["substrate", "frame", "difficulty-intermediate"],
        answer: `
            <p><strong>FRAME</strong> (Framework for Runtime Aggregation of Modularized Entities) is the framework for building Substrate runtimes.</p>
            <strong>FRAME components:</strong>
            <ul>
                <li><strong>frame_support:</strong> Macros and utilities for pallets</li>
                <li><strong>frame_system:</strong> Core blockchain functionality</li>
                <li><strong>frame_executive:</strong> Block execution orchestration</li>
            </ul>
            <strong>Essential pallets:</strong>
            <pre><code class="language-rust">// In runtime/lib.rs
construct_runtime!(
    pub enum Runtime where
        Block = Block,
        NodeBlock = opaque::Block,
        UncheckedExtrinsic = UncheckedExtrinsic
    {
        System: frame_system,           // Core system
        Timestamp: pallet_timestamp,     // Block timestamps
        Balances: pallet_balances,       // Native token
        TransactionPayment: pallet_transaction_payment,
        Sudo: pallet_sudo,               // Superuser
        
        // Custom pallets
        MyPallet: my_pallet,
    }
);</code></pre>
        `
    },
    {
        title: "How do extrinsics work in Substrate?",
        tags: ["substrate", "transactions", "difficulty-intermediate"],
        answer: `
            <p><strong>Extrinsics</strong> are pieces of external information included in blocks - similar to transactions.</p>
            <strong>Types of extrinsics:</strong>
            <ul>
                <li><strong>Signed:</strong> Regular transactions with signature</li>
                <li><strong>Unsigned:</strong> No signature (requires validation)</li>
                <li><strong>Inherent:</strong> Data inserted by block author (timestamp)</li>
            </ul>
            <pre><code class="language-rust">#[pallet::call]
impl<T: Config> Pallet<T> {
    // Signed extrinsic (most common)
    #[pallet::weight(10_000)]
    pub fn signed_action(origin: OriginFor<T>, data: u32) -> DispatchResult {
        let who = ensure_signed(origin)?;
        // ...
        Ok(())
    }
    
    // Unsigned extrinsic (no fee, needs validation)
    #[pallet::weight(0)]
    pub fn unsigned_action(origin: OriginFor<T>, data: u32) -> DispatchResult {
        ensure_none(origin)?;
        // ...
        Ok(())
    }
}

// Unsigned validation
#[pallet::validate_unsigned]
impl<T: Config> ValidateUnsigned for Pallet<T> {
    type Call = Call<T>;
    fn validate_unsigned(_source: TransactionSource, call: &Self::Call) -> TransactionValidity {
        // Custom validation logic
        ValidTransaction::with_tag_prefix("my_pallet").build()
    }
}</code></pre>
        `
    },
    {
        title: "What is the Substrate runtime and how is it upgraded?",
        tags: ["substrate", "runtime", "difficulty-advanced"],
        answer: `
            <p>The <strong>runtime</strong> is the core business logic of a Substrate blockchain, compiled to WASM.</p>
            <strong>Runtime structure:</strong>
            <pre><code class="language-rust">#[sp_version::runtime_version]
pub const VERSION: RuntimeVersion = RuntimeVersion {
    spec_name: create_runtime_str!("my-chain"),
    impl_name: create_runtime_str!("my-chain"),
    authoring_version: 1,
    spec_version: 100,  // Increment for upgrades
    impl_version: 1,
    apis: RUNTIME_API_VERSIONS,
    transaction_version: 1,
    state_version: 1,
};</code></pre>
            <strong>Forkless upgrade process:</strong>
            <ol>
                <li>Build new runtime WASM</li>
                <li>Submit runtime upgrade extrinsic (usually via governance/sudo)</li>
                <li>New runtime stored in chain state</li>
                <li>Next block uses new runtime</li>
            </ol>
            <pre><code class="language-rust">// Using sudo for upgrade
#[pallet::call]
fn set_code(origin: OriginFor<T>, code: Vec<u8>) -> DispatchResult {
    ensure_root(origin)?;
    Self::can_set_code(&code)?;
    T::OnSetCode::on_set_code(code);
    Ok(())
}</code></pre>
        `
    },
    {
        title: "What is the difference between native and WASM runtime?",
        tags: ["substrate", "runtime", "difficulty-advanced"],
        answer: `
            <p>Substrate nodes can execute runtime in two ways: <strong>native</strong> (compiled for host) or <strong>WASM</strong> (portable).</p>
            <table>
                <tr><th>Aspect</th><th>Native</th><th>WASM</th></tr>
                <tr><td>Speed</td><td>Faster</td><td>~2x slower</td></tr>
                <tr><td>Upgrades</td><td>Requires node restart</td><td>Hot-swappable</td></tr>
                <tr><td>Consensus</td><td>May diverge</td><td>Deterministic</td></tr>
                <tr><td>Use case</td><td>Development</td><td>Production</td></tr>
            </table>
            <strong>Execution strategies:</strong>
            <pre><code class="language-bash"># In node config
--execution native     # Use native only
--execution wasm       # Use WASM only (default)
--execution both       # Execute both, compare results</code></pre>
            <strong>Why WASM matters:</strong>
            <ul>
                <li>Forkless upgrades possible</li>
                <li>Guaranteed determinism across nodes</li>
                <li>Light client execution</li>
            </ul>
        `
    },
    {
        title: "How does Substrate handle weights and fees?",
        tags: ["substrate", "fees", "difficulty-intermediate"],
        answer: `
            <p><strong>Weights</strong> represent computational cost in Substrate, translated to fees.</p>
            <strong>Weight calculation:</strong>
            <pre><code class="language-rust">// Simple constant weight
#[pallet::weight(10_000)]
pub fn simple_action(origin: OriginFor<T>) -> DispatchResult {
    // ...
}

// Dynamic weight
#[pallet::weight(T::WeightInfo::complex_action(data.len() as u32))]
pub fn complex_action(origin: OriginFor<T>, data: Vec<u8>) -> DispatchResult {
    // ...
}

// Benchmarked weights (recommended)
#[pallet::weight(T::WeightInfo::transfer())]
pub fn transfer(origin: OriginFor<T>, to: T::AccountId, amount: u128) 
    -> DispatchResultWithPostInfo 
{
    // ...
    // Return actual weight consumed
    Ok(Some(actual_weight).into())
}</code></pre>
            <strong>Fee calculation:</strong>
            <pre><code>fee = base_fee + (weight * weight_to_fee) + length_fee + tip</code></pre>
            <strong>Benchmarking:</strong>
            <pre><code class="language-rust">#[benchmarks]
mod benchmarks {
    #[benchmark]
    fn transfer() {
        let caller: T::AccountId = whitelisted_caller();
        #[extrinsic_call]
        transfer(RawOrigin::Signed(caller), recipient, 1000);
    }
}</code></pre>
        `
    },
    {
        title: "What are hooks in Substrate pallets?",
        tags: ["substrate", "hooks", "difficulty-intermediate"],
        answer: `
            <p><strong>Hooks</strong> allow pallets to execute logic at specific points in the block lifecycle.</p>
            <pre><code class="language-rust">#[pallet::hooks]
impl<T: Config> Hooks<BlockNumberFor<T>> for Pallet<T> {
    // Start of each block
    fn on_initialize(n: BlockNumberFor<T>) -> Weight {
        log::info!("Block {} starting", n);
        Weight::zero()
    }
    
    // End of each block  
    fn on_finalize(n: BlockNumberFor<T>) {
        log::info!("Block {} finalizing", n);
    }
    
    // After all extrinsics, before finalize
    fn on_idle(n: BlockNumberFor<T>, remaining_weight: Weight) -> Weight {
        // Use remaining block weight for cleanup
        Self::do_cleanup(remaining_weight)
    }
    
    // After runtime upgrade
    fn on_runtime_upgrade() -> Weight {
        migration::migrate::<T>()
    }
    
    // Check runtime invariants (dev mode)
    #[cfg(feature = "try-runtime")]
    fn try_state(_n: BlockNumberFor<T>) -> Result<(), &'static str> {
        Self::check_invariants()
    }
}</code></pre>
        `
    },
    {
        title: "How does cross-pallet communication work in Substrate?",
        tags: ["substrate", "difficulty-intermediate"],
        answer: `
            <p>Pallets can interact through <strong>tight coupling</strong> or <strong>loose coupling</strong>.</p>
            <strong>Tight coupling (direct dependency):</strong>
            <pre><code class="language-rust">// Your pallet depends on Balances
#[pallet::config]
pub trait Config: frame_system::Config + pallet_balances::Config {
    // ...
}

// Direct call to Balances pallet
impl<T: Config> Pallet<T> {
    fn pay(who: &T::AccountId, amount: T::Balance) {
        pallet_balances::Pallet::<T>::transfer(...);
    }
}</code></pre>
            <strong>Loose coupling (traits):</strong>
            <pre><code class="language-rust">// Define trait for what you need
pub trait Currency<AccountId> {
    type Balance;
    fn transfer(from: &AccountId, to: &AccountId, amount: Self::Balance);
}

// Your pallet uses the trait
#[pallet::config]
pub trait Config: frame_system::Config {
    type Currency: Currency<Self::AccountId>;
}

// In runtime, wire it up
impl my_pallet::Config for Runtime {
    type Currency = Balances;  // pallet_balances implements Currency
}</code></pre>
            <strong>Benefits of loose coupling:</strong> Testability, flexibility, cleaner dependencies
        `
    },
    {
        title: "What is an Origin in Substrate?",
        tags: ["substrate", "security", "difficulty-intermediate"],
        answer: `
            <p><strong>Origin</strong> identifies who or what is calling a dispatchable function.</p>
            <strong>Common origin types:</strong>
            <pre><code class="language-rust">// Signed - regular user
pub fn user_action(origin: OriginFor<T>) -> DispatchResult {
    let who = ensure_signed(origin)?;
    // who is the signing account
}

// Root - sudo/governance (superuser)
pub fn privileged_action(origin: OriginFor<T>) -> DispatchResult {
    ensure_root(origin)?;
    // Only root can call
}

// None - inherent or unsigned
pub fn inherent_action(origin: OriginFor<T>) -> DispatchResult {
    ensure_none(origin)?;
    // No sender
}

// Custom origins
pub fn council_action(origin: OriginFor<T>) -> DispatchResult {
    T::CouncilOrigin::ensure_origin(origin)?;
    // Only council can call
}</code></pre>
            <strong>Creating custom origins:</strong>
            <pre><code class="language-rust">#[pallet::origin]
pub enum Origin {
    Council,
    TechnicalCommittee,
}</code></pre>
        `
    },
    {
        title: "How do you write tests for Substrate pallets?",
        tags: ["substrate", "testing", "difficulty-intermediate"],
        answer: `
            <p>Substrate provides a <strong>mock runtime</strong> system for unit testing pallets.</p>
            <pre><code class="language-rust">// tests.rs or mock.rs
use crate as my_pallet;
use frame_support::{parameter_types, traits::ConstU32};
use sp_runtime::testing::Header;

type UncheckedExtrinsic = frame_system::mocking::MockUncheckedExtrinsic<Test>;
type Block = frame_system::mocking::MockBlock<Test>;

// Construct test runtime
frame_support::construct_runtime!(
    pub enum Test where
        Block = Block,
        NodeBlock = Block,
        UncheckedExtrinsic = UncheckedExtrinsic,
    {
        System: frame_system,
        Balances: pallet_balances,
        MyPallet: my_pallet,
    }
);

// Configure mock runtime
impl frame_system::Config for Test {
    type AccountId = u64;
    // ... other configs
}

impl my_pallet::Config for Test {
    type RuntimeEvent = RuntimeEvent;
}

// Test helper
fn new_test_ext() -> sp_io::TestExternalities {
    let mut t = frame_system::GenesisConfig::default().build_storage::<Test>().unwrap();
    // Add initial state
    t.into()
}

// Actual tests
#[test]
fn transfer_works() {
    new_test_ext().execute_with(|| {
        assert_ok!(MyPallet::transfer(RuntimeOrigin::signed(1), 2, 100));
        assert_eq!(MyPallet::balance(2), 100);
    });
}</code></pre>
        `
    },
    {
        title: "What is Polkadot's XCM (Cross-Consensus Messaging)?",
        tags: ["substrate", "polkadot", "xcm", "difficulty-advanced"],
        answer: `
            <p><strong>XCM</strong> is a messaging format for communication between different consensus systems (parachains, relay chain).</p>
            <strong>XCM basics:</strong>
            <pre><code class="language-rust">// XCM message structure
let message = Xcm(vec![
    WithdrawAsset((Here, 1_000_000).into()),
    BuyExecution { fees: (Here, 100_000).into(), weight_limit: Limited(1_000) },
    DepositAsset { 
        assets: All.into(), 
        beneficiary: AccountId32 { network: None, id: recipient.into() }.into() 
    },
]);

// Send XCM
pallet_xcm::Pallet::<T>::send_xcm(
    Here,
    Parachain(1000),  // Destination
    message,
)?;</code></pre>
            <strong>Key XCM instructions:</strong>
            <ul>
                <li><strong>WithdrawAsset:</strong> Take assets from origin</li>
                <li><strong>DepositAsset:</strong> Put assets somewhere</li>
                <li><strong>BuyExecution:</strong> Pay for execution</li>
                <li><strong>Transact:</strong> Execute encoded call</li>
                <li><strong>TransferAsset:</strong> Combined withdraw+deposit</li>
            </ul>
            <strong>MultiLocation:</strong> Describes locations across consensus
            <pre><code class="language-rust">// Relay chain
Parent
// Parachain 1000
Parachain(1000)
// Account on parachain
(Parachain(1000), AccountId32 { id: [1u8; 32], network: None })</code></pre>
        `
    },
    {
        title: "How do you implement a Substrate RPC extension?",
        tags: ["substrate", "rpc", "difficulty-advanced"],
        answer: `
            <p><strong>RPC extensions</strong> expose custom node APIs for external interaction.</p>
            <strong>Define RPC trait:</strong>
            <pre><code class="language-rust">// Runtime API (in runtime)
sp_api::decl_runtime_api! {
    pub trait MyApi {
        fn get_value(key: Vec<u8>) -> Option<Vec<u8>>;
    }
}

// RPC trait (in rpc crate)
#[rpc(server)]
pub trait MyRpcApi<BlockHash> {
    #[method(name = "my_getValue")]
    fn get_value(&self, key: Vec<u8>, at: Option<BlockHash>) -> RpcResult<Option<Vec<u8>>>;
}

// Implementation
pub struct MyRpc<C, Block> {
    client: Arc<C>,
    _marker: PhantomData<Block>,
}

impl<C, Block> MyRpcApiServer<<Block as BlockT>::Hash> for MyRpc<C, Block>
where
    C: ProvideRuntimeApi<Block> + Send + Sync + 'static,
    C::Api: MyApi<Block>,
    Block: BlockT,
{
    fn get_value(&self, key: Vec<u8>, at: Option<<Block as BlockT>::Hash>) -> RpcResult<Option<Vec<u8>>> {
        let api = self.client.runtime_api();
        let at = at.unwrap_or_else(|| self.client.info().best_hash);
        api.get_value(at, key).map_err(|e| Error::RuntimeError(e.to_string()))
    }
}</code></pre>
        `
    },
    {
        title: "What is off-chain workers in Substrate?",
        tags: ["substrate", "offchain", "difficulty-advanced"],
        answer: `
            <p><strong>Off-chain workers</strong> run outside the blockchain runtime but can interact with it.</p>
            <strong>Use cases:</strong>
            <ul>
                <li>Fetching external data (oracles)</li>
                <li>Expensive computations</li>
                <li>Sleeping/waiting</li>
                <li>Submitting unsigned transactions</li>
            </ul>
            <pre><code class="language-rust">#[pallet::hooks]
impl<T: Config> Hooks<BlockNumberFor<T>> for Pallet<T> {
    fn offchain_worker(block_number: BlockNumberFor<T>) {
        // Runs after block import
        log::info!("OCW running for block {:?}", block_number);
        
        // HTTP request
        let response = http::Request::get("https://api.example.com/price")
            .send()
            .unwrap();
        let price: u32 = response.body().collect().unwrap();
        
        // Submit unsigned transaction with result
        let call = Call::submit_price { price };
        SubmitTransaction::<T, Call<T>>::submit_unsigned_transaction(call.into());
    }
}

// Off-chain storage (local to node)
fn store_locally(key: &[u8], value: &[u8]) {
    sp_io::offchain::local_storage_set(StorageKind::PERSISTENT, key, value);
}</code></pre>
        `
    },
    {
        title: "What is the difference between ink! and Substrate pallets?",
        tags: ["substrate", "ink", "difficulty-intermediate"],
        answer: `
            <p><strong>ink!</strong> is for smart contracts, while <strong>pallets</strong> are for runtime modules.</p>
            <table>
                <tr><th>Aspect</th><th>ink! Contracts</th><th>Pallets</th></tr>
                <tr><td>Deployment</td><td>By users anytime</td><td>At genesis or upgrade</td></tr>
                <tr><td>Execution</td><td>In sandbox (metered)</td><td>Native runtime</td></tr>
                <tr><td>Trust level</td><td>Untrusted code</td><td>Trusted, audited</td></tr>
                <tr><td>Upgrades</td><td>User-controlled</td><td>Governance</td></tr>
                <tr><td>Gas/Weight</td><td>Gas metering</td><td>Weights (can refund)</td></tr>
                <tr><td>Storage</td><td>Per-contract</td><td>Chain-wide</td></tr>
                <tr><td>Use case</td><td>User applications</td><td>Core chain features</td></tr>
            </table>
            <strong>When to use each:</strong>
            <ul>
                <li><strong>Pallet:</strong> Core functionality, needs high performance</li>
                <li><strong>ink!:</strong> User-deployed apps, rapid iteration</li>
            </ul>
        `
    }
];

// Export for use in main data file
if (typeof module !== 'undefined' && module.exports) {
    module.exports = rustSubstrate;
}