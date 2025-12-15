// Rust & Web3 Questions - NEAR Protocol Development
const rustNear = [
    {
        title: "What is NEAR Protocol's programming model?",
        tags: ["near", "difficulty-intermediate"],
        answer: `
            <p><strong>NEAR Protocol</strong> uses a sharded, proof-of-stake blockchain with smart contracts written in Rust or AssemblyScript.</p>
            <strong>Key concepts:</strong>
            <ul>
                <li><strong>Accounts:</strong> Human-readable names (alice.near)</li>
                <li><strong>Access Keys:</strong> Full-access and function-call keys</li>
                <li><strong>Sharding:</strong> Nightshade dynamic sharding</li>
                <li><strong>Gas:</strong> Prepaid compute in NEAR tokens</li>
            </ul>
            <strong>Account structure:</strong>
            <pre><code class="language-rust">// NEAR accounts can have:
// - Balance (NEAR tokens)
// - Contract code (WASM)
// - Storage (key-value)
// - Access keys (for signing)

// Account naming:
// Top-level: alice.near
// Sub-accounts: app.alice.near</code></pre>
            <strong>Contract example:</strong>
            <pre><code class="language-rust">use near_sdk::borsh::{self, BorshDeserialize, BorshSerialize};
use near_sdk::{near_bindgen, env};

#[near_bindgen]
#[derive(BorshDeserialize, BorshSerialize, Default)]
pub struct Contract {
    greeting: String,
}

#[near_bindgen]
impl Contract {
    #[init]
    pub fn new(greeting: String) -> Self {
        Self { greeting }
    }
    
    pub fn get_greeting(&self) -> String {
        self.greeting.clone()
    }
    
    pub fn set_greeting(&mut self, greeting: String) {
        self.greeting = greeting;
    }
}</code></pre>
        `
    },
    {
        title: "How do cross-contract calls work in NEAR?",
        tags: ["near", "cross-contract", "difficulty-intermediate"],
        answer: `
            <p>NEAR supports <strong>asynchronous cross-contract calls</strong> with promises.</p>
            <strong>Cross-contract call pattern:</strong>
            <pre><code class="language-rust">use near_sdk::{ext_contract, Promise, Gas, Balance};

const TGAS: Gas = Gas(10u64.pow(12));
const NO_DEPOSIT: Balance = 0;

// Define external contract interface
#[ext_contract(ext_ft)]
pub trait FungibleToken {
    fn ft_transfer(&mut self, receiver_id: AccountId, amount: U128);
    fn ft_balance_of(&self, account_id: AccountId) -> U128;
}

// Define callback interface
#[ext_contract(ext_self)]
pub trait ExtSelf {
    fn callback_after_transfer(&self) -> bool;
}

#[near_bindgen]
impl Contract {
    pub fn transfer_tokens(&self, token: AccountId, to: AccountId, amount: U128) -> Promise {
        ext_ft::ext(token)
            .with_attached_deposit(1)
            .with_static_gas(Gas(5 * TGAS))
            .ft_transfer(to, amount)
            .then(
                ext_self::ext(env::current_account_id())
                    .with_static_gas(Gas(5 * TGAS))
                    .callback_after_transfer()
            )
    }
    
    #[private]  // Only callable by this contract
    pub fn callback_after_transfer(&self) -> bool {
        match env::promise_result(0) {
            PromiseResult::Successful(_) => true,
            _ => false,
        }
    }
}</code></pre>
        `
    },
    {
        title: "What is NEAR's storage staking model?",
        tags: ["near", "storage", "difficulty-intermediate"],
        answer: `
            <p>NEAR uses <strong>storage staking</strong> where accounts lock NEAR tokens proportional to storage used.</p>
            <strong>Storage costs:</strong>
            <pre><code class="language-rust">// 1 NEAR = 10 KB of storage
// 0.00001 NEAR per byte

// Managing storage in contracts
use near_sdk::collections::{LookupMap, UnorderedMap};

#[near_bindgen]
#[derive(BorshDeserialize, BorshSerialize)]
pub struct Contract {
    // Efficient storage collections
    records: LookupMap<AccountId, Record>,
    items: UnorderedMap<String, Item>,
}

impl Contract {
    // Storage deposit pattern
    #[payable]
    pub fn storage_deposit(&mut self) {
        let account_id = env::predecessor_account_id();
        let deposit = env::attached_deposit();
        
        // Track storage per user
        let storage_before = env::storage_usage();
        self.internal_register_account(&account_id);
        let storage_after = env::storage_usage();
        
        let storage_cost = (storage_after - storage_before) as u128 
            * env::storage_byte_cost();
        
        assert!(deposit >= storage_cost, "Insufficient deposit");
        
        // Refund excess
        if deposit > storage_cost {
            Promise::new(account_id).transfer(deposit - storage_cost);
        }
    }
}</code></pre>
        `
    },
    {
        title: "How do you implement NEP-141 (Fungible Token) in NEAR?",
        tags: ["near", "tokens", "difficulty-intermediate"],
        answer: `
            <p><strong>NEP-141</strong> is NEAR's fungible token standard, similar to ERC-20.</p>
            <pre><code class="language-rust">use near_sdk::json_types::U128;
use near_sdk::{near_bindgen, AccountId, Balance, Promise};

// Core trait
pub trait FungibleTokenCore {
    fn ft_transfer(&mut self, receiver_id: AccountId, amount: U128, memo: Option<String>);
    fn ft_transfer_call(&mut self, receiver_id: AccountId, amount: U128, 
                        memo: Option<String>, msg: String) -> Promise;
    fn ft_total_supply(&self) -> U128;
    fn ft_balance_of(&self, account_id: AccountId) -> U128;
}

#[near_bindgen]
impl FungibleTokenCore for Contract {
    #[payable]
    fn ft_transfer(&mut self, receiver_id: AccountId, amount: U128, memo: Option<String>) {
        assert_one_yocto();  // Require 1 yoctoNEAR for security
        let sender_id = env::predecessor_account_id();
        let amount: Balance = amount.into();
        
        self.internal_transfer(&sender_id, &receiver_id, amount, memo);
    }
    
    fn ft_balance_of(&self, account_id: AccountId) -> U128 {
        self.accounts.get(&account_id).unwrap_or(0).into()
    }
    
    fn ft_total_supply(&self) -> U128 {
        self.total_supply.into()
    }
}</code></pre>
            <strong>Using the SDK:</strong>
            <pre><code class="language-rust">use near_contract_standards::fungible_token::FungibleToken;

#[near_bindgen]
#[derive(BorshDeserialize, BorshSerialize, PanicOnDefault)]
pub struct Contract {
    token: FungibleToken,
}

#[near_bindgen]
impl Contract {
    #[init]
    pub fn new(total_supply: U128) -> Self {
        let mut token = FungibleToken::new(b"t".to_vec());
        token.internal_register_account(&env::predecessor_account_id());
        token.internal_deposit(&env::predecessor_account_id(), total_supply.into());
        Self { token }
    }
}</code></pre>
        `
    },
    {
        title: "What are NEAR access keys and how do they work?",
        tags: ["near", "security", "difficulty-intermediate"],
        answer: `
            <p>NEAR has a unique <strong>access key</strong> system for flexible account security.</p>
            <strong>Access key types:</strong>
            <pre><code class="language-rust">// Full Access Key
// - Can do anything: transfer, deploy, delete account
// - Like a master key

// Function Call Key
// - Limited to specific contract methods
// - Optional allowance (gas budget)
// - Great for dApp sessions

// Adding keys programmatically
#[near_bindgen]
impl Contract {
    pub fn add_access_key(&self, public_key: PublicKey) -> Promise {
        Promise::new(env::current_account_id()).add_access_key(
            public_key,
            250000000000000000000000,  // Allowance: 0.25 NEAR
            env::current_account_id(),  // Receiver
            "increment,decrement".to_string(),  // Methods
        )
    }
    
    // Remove access key
    pub fn remove_access_key(&self, public_key: PublicKey) -> Promise {
        Promise::new(env::current_account_id()).delete_key(public_key)
    }
}</code></pre>
            <strong>Use cases:</strong>
            <ul>
                <li>Session keys for games (no popup per action)</li>
                <li>Limited access for team members</li>
                <li>Subscription services with allowance</li>
            </ul>
        `
    },
    {
        title: "How do you test NEAR smart contracts?",
        tags: ["near", "testing", "difficulty-intermediate"],
        answer: `
            <p>NEAR provides unit testing and simulation testing frameworks.</p>
            <strong>Unit tests:</strong>
            <pre><code class="language-rust">#[cfg(test)]
mod tests {
    use super::*;
    use near_sdk::test_utils::{accounts, VMContextBuilder};
    use near_sdk::testing_env;

    fn get_context(predecessor: AccountId) -> VMContextBuilder {
        let mut builder = VMContextBuilder::new();
        builder
            .predecessor_account_id(predecessor)
            .current_account_id(accounts(0))
            .signer_account_id(predecessor)
            .attached_deposit(1);
        builder
    }

    #[test]
    fn test_transfer() {
        let context = get_context(accounts(1));
        testing_env!(context.build());
        
        let mut contract = Contract::new(U128(1000));
        
        contract.ft_transfer(accounts(2), U128(100), None);
        
        assert_eq!(contract.ft_balance_of(accounts(1)), U128(900));
        assert_eq!(contract.ft_balance_of(accounts(2)), U128(100));
    }
    
    #[test]
    #[should_panic(expected = "Insufficient balance")]
    fn test_transfer_insufficient_balance() {
        let context = get_context(accounts(1));
        testing_env!(context.build());
        
        let mut contract = Contract::new(U128(100));
        contract.ft_transfer(accounts(2), U128(200), None);
    }
}</code></pre>
            <strong>Workspaces-rs (simulation testing):</strong>
            <pre><code class="language-rust">use near_workspaces::{Account, Contract, Worker};

#[tokio::test]
async fn test_cross_contract() -> anyhow::Result<()> {
    let worker = near_workspaces::sandbox().await?;
    let contract = worker.dev_deploy(include_bytes!("../out/contract.wasm")).await?;
    
    let result = contract.call("set_greeting")
        .args_json(json!({"greeting": "Hello"}))
        .transact()
        .await?;
    
    assert!(result.is_success());
    Ok(())
}</code></pre>
        `
    },
    {
        title: "What is NEAR's upgrade pattern for contracts?",
        tags: ["near", "upgrades", "difficulty-advanced"],
        answer: `
            <p>NEAR contracts can be upgraded by redeploying code, but state migration needs care.</p>
            <strong>Upgrade pattern:</strong>
            <pre><code class="language-rust">// Version 1
#[near_bindgen]
#[derive(BorshDeserialize, BorshSerialize)]
pub struct ContractV1 {
    data: String,
}

// Version 2 - Added new field
#[near_bindgen]
#[derive(BorshDeserialize, BorshSerialize)]
pub struct ContractV2 {
    data: String,
    new_field: u64,  // New!
}

// Migration
impl Contract {
    #[private]
    #[init(ignore_state)]
    pub fn migrate() -> Self {
        let old_state: ContractV1 = env::state_read().expect("failed to read state");
        
        Self {
            data: old_state.data,
            new_field: 0,  // Default for new field
        }
    }
}

// Deployment script
near deploy --wasmFile new_contract.wasm --initFunction migrate --initArgs '{}' --accountId contract.near</code></pre>
            <strong>Upgrade patterns:</strong>
            <ul>
                <li><strong>Lazy migration:</strong> Migrate records on access</li>
                <li><strong>Versioned enums:</strong> Store state version</li>
                <li><strong>Separate data contract:</strong> Logic upgrades easier</li>
            </ul>
        `
    },
    {
        title: "How does NEAR handle errors and panics?",
        tags: ["near", "errors", "difficulty-intermediate"],
        answer: `
            <p>NEAR contracts can panic (abort transaction) or return Result types.</p>
            <strong>Error handling:</strong>
            <pre><code class="language-rust">use near_sdk::FunctionError;

// Custom error enum
#[derive(FunctionError, BorshSerialize)]
pub enum ContractError {
    InsufficientBalance { required: u128, available: u128 },
    Unauthorized,
    InvalidInput(String),
}

#[near_bindgen]
impl Contract {
    // Using require! macro (panics with message)
    pub fn transfer(&mut self, to: AccountId, amount: U128) {
        let sender = env::predecessor_account_id();
        let balance = self.get_balance(&sender);
        
        require!(amount.0 <= balance, "Insufficient balance");
        require!(amount.0 > 0, "Amount must be positive");
        
        self.internal_transfer(&sender, &to, amount.0);
    }
    
    // Using Result type
    pub fn safe_transfer(&mut self, to: AccountId, amount: U128) -> Result<(), ContractError> {
        let sender = env::predecessor_account_id();
        let balance = self.get_balance(&sender);
        
        if amount.0 > balance {
            return Err(ContractError::InsufficientBalance {
                required: amount.0,
                available: balance,
            });
        }
        
        self.internal_transfer(&sender, &to, amount.0);
        Ok(())
    }
}

// Assert macros
assert!(condition, "message");
assert_eq!(a, b, "a should equal b");
require!(condition, "message");  // NEAR-specific</code></pre>
        `
    }
];

// Export for use in main data file
if (typeof module !== 'undefined' && module.exports) {
    module.exports = rustNear;
}