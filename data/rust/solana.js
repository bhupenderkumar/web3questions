// Rust & Web3 Questions - Solana Development
const rustSolana = [
    {
        title: "What is Solana's programming model?",
        tags: ["solana", "difficulty-intermediate"],
        answer: `
            <p><strong>Solana</strong> uses a unique account-based programming model with programs written in Rust.</p>
            <strong>Key concepts:</strong>
            <ul>
                <li><strong>Programs:</strong> Stateless executable code (smart contracts)</li>
                <li><strong>Accounts:</strong> Store state and SOL balances</li>
                <li><strong>Instructions:</strong> Commands to programs with accounts</li>
                <li><strong>Transactions:</strong> Bundles of instructions</li>
            </ul>
            <strong>Account structure:</strong>
            <pre><code class="language-rust">pub struct Account {
    pub lamports: u64,          // Balance (1 SOL = 1B lamports)
    pub data: Vec<u8>,          // Arbitrary data
    pub owner: Pubkey,          // Program that owns this account
    pub executable: bool,        // Is this a program?
    pub rent_epoch: u64,        // Rent tracking
}</code></pre>
            <strong>Key differences from Ethereum:</strong>
            <ul>
                <li>State stored in accounts, not in programs</li>
                <li>Programs are stateless</li>
                <li>Parallel transaction execution</li>
            </ul>
        `
    },
    {
        title: "How do you create a Solana program with Anchor?",
        tags: ["solana", "anchor", "difficulty-intermediate"],
        answer: `
            <p><strong>Anchor</strong> is a framework for Solana that simplifies program development.</p>
            <strong>Basic Anchor program:</strong>
            <pre><code class="language-rust">use anchor_lang::prelude::*;

declare_id!("Fg6PaFpoGXkYsidMpWTK6W2BeZ7FEfcYkg476zPFsLnS");

#[program]
pub mod my_program {
    use super::*;
    
    pub fn initialize(ctx: Context<Initialize>, data: u64) -> Result<()> {
        let my_account = &mut ctx.accounts.my_account;
        my_account.data = data;
        my_account.authority = ctx.accounts.authority.key();
        Ok(())
    }
    
    pub fn update(ctx: Context<Update>, new_data: u64) -> Result<()> {
        let my_account = &mut ctx.accounts.my_account;
        my_account.data = new_data;
        Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize<'info> {
    #[account(init, payer = authority, space = 8 + 8 + 32)]
    pub my_account: Account<'info, MyAccount>,
    #[account(mut)]
    pub authority: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct Update<'info> {
    #[account(mut, has_one = authority)]
    pub my_account: Account<'info, MyAccount>,
    pub authority: Signer<'info>,
}

#[account]
pub struct MyAccount {
    pub data: u64,
    pub authority: Pubkey,
}</code></pre>
        `
    },
    {
        title: "What are PDAs (Program Derived Addresses) in Solana?",
        tags: ["solana", "pda", "difficulty-intermediate"],
        answer: `
            <p><strong>PDAs</strong> are deterministic addresses that programs can sign for, enabling program-owned accounts.</p>
            <strong>Creating a PDA:</strong>
            <pre><code class="language-rust">// Finding a PDA
let (pda, bump) = Pubkey::find_program_address(
    &[
        b"my_seed",
        user.key().as_ref(),
    ],
    program_id
);

// In Anchor
#[derive(Accounts)]
pub struct CreateVault<'info> {
    #[account(
        init,
        seeds = [b"vault", user.key().as_ref()],
        bump,
        payer = user,
        space = 8 + 32 + 8
    )]
    pub vault: Account<'info, Vault>,
    #[account(mut)]
    pub user: Signer<'info>,
    pub system_program: Program<'info, System>,
}

// Using PDA to sign
let seeds = &[b"vault", user.key().as_ref(), &[bump]];
let signer_seeds = &[&seeds[..]];

invoke_signed(
    &transfer_instruction,
    &[vault.to_account_info(), destination.to_account_info()],
    signer_seeds
)?;</code></pre>
            <strong>Use cases:</strong> Vaults, escrows, token accounts, program configuration
        `
    },
    {
        title: "How does Solana's rent system work?",
        tags: ["solana", "rent", "difficulty-intermediate"],
        answer: `
            <p><strong>Rent</strong> is the fee for storing data on Solana. Accounts must maintain minimum balance or be rent-exempt.</p>
            <strong>Rent calculation:</strong>
            <pre><code class="language-rust">// Minimum rent-exempt balance
let rent = Rent::get()?;
let min_balance = rent.minimum_balance(account_data_size);

// In Anchor - automatic calculation
#[account(init, payer = user, space = 8 + 32 + 8)]
pub my_account: Account<'info, MyAccount>,
// Space: 8 (discriminator) + 32 (Pubkey) + 8 (u64)</code></pre>
            <strong>Rent rules:</strong>
            <ul>
                <li><strong>Rent-exempt:</strong> Hold 2 years of rent (permanent)</li>
                <li><strong>Rent collection:</strong> Deducted on transaction touch</li>
                <li><strong>Account deletion:</strong> Balance hits 0, account removed</li>
            </ul>
            <strong>Space calculation:</strong>
            <pre><code class="language-rust">// Common type sizes
Pubkey: 32 bytes
u64: 8 bytes
bool: 1 byte
String: 4 + length bytes
Vec<T>: 4 + (length * size_of::<T>())
Option<T>: 1 + size_of::<T>()</code></pre>
        `
    },
    {
        title: "What is CPIs (Cross-Program Invocations) in Solana?",
        tags: ["solana", "cpi", "difficulty-intermediate"],
        answer: `
            <p><strong>CPI</strong> allows a Solana program to call another program's instructions.</p>
            <strong>Basic CPI:</strong>
            <pre><code class="language-rust">use anchor_lang::prelude::*;
use anchor_spl::token::{self, Transfer, Token, TokenAccount};

// CPI to transfer tokens
pub fn transfer_tokens(ctx: Context<TransferTokens>, amount: u64) -> Result<()> {
    let cpi_accounts = Transfer {
        from: ctx.accounts.from.to_account_info(),
        to: ctx.accounts.to.to_account_info(),
        authority: ctx.accounts.authority.to_account_info(),
    };
    let cpi_program = ctx.accounts.token_program.to_account_info();
    let cpi_ctx = CpiContext::new(cpi_program, cpi_accounts);
    
    token::transfer(cpi_ctx, amount)?;
    Ok(())
}

// CPI with PDA signer
pub fn transfer_from_vault(ctx: Context<TransferFromVault>, amount: u64) -> Result<()> {
    let seeds = &[b"vault", ctx.accounts.user.key().as_ref(), &[ctx.bumps.vault]];
    let signer_seeds = &[&seeds[..]];
    
    let cpi_ctx = CpiContext::new_with_signer(
        ctx.accounts.token_program.to_account_info(),
        Transfer {
            from: ctx.accounts.vault_token.to_account_info(),
            to: ctx.accounts.user_token.to_account_info(),
            authority: ctx.accounts.vault.to_account_info(),
        },
        signer_seeds
    );
    
    token::transfer(cpi_ctx, amount)
}</code></pre>
        `
    },
    {
        title: "How do you handle errors in Solana/Anchor programs?",
        tags: ["solana", "anchor", "errors", "difficulty-intermediate"],
        answer: `
            <p>Anchor provides structured error handling with custom error codes.</p>
            <strong>Defining errors:</strong>
            <pre><code class="language-rust">#[error_code]
pub enum MyError {
    #[msg("You are not authorized to perform this action")]
    Unauthorized,
    #[msg("Insufficient funds: required {required}, available {available}")]
    InsufficientFunds { required: u64, available: u64 },
    #[msg("Invalid parameter provided")]
    InvalidParameter,
    #[msg("Account already initialized")]
    AlreadyInitialized,
}

// Using errors
pub fn withdraw(ctx: Context<Withdraw>, amount: u64) -> Result<()> {
    require!(
        ctx.accounts.vault.authority == ctx.accounts.user.key(),
        MyError::Unauthorized
    );
    
    require_gte!(
        ctx.accounts.vault.balance,
        amount,
        MyError::InsufficientFunds { 
            required: amount, 
            available: ctx.accounts.vault.balance 
        }
    );
    
    // Proceed with withdrawal
    Ok(())
}</code></pre>
            <strong>Anchor constraints as validation:</strong>
            <pre><code class="language-rust">#[derive(Accounts)]
pub struct Withdraw<'info> {
    #[account(
        mut,
        constraint = vault.authority == user.key() @ MyError::Unauthorized
    )]
    pub vault: Account<'info, Vault>,
    pub user: Signer<'info>,
}</code></pre>
        `
    },
    {
        title: "What are Solana's account constraints in Anchor?",
        tags: ["solana", "anchor", "difficulty-intermediate"],
        answer: `
            <p>Anchor <strong>constraints</strong> validate accounts before instruction execution.</p>
            <strong>Common constraints:</strong>
            <pre><code class="language-rust">#[derive(Accounts)]
pub struct MyInstruction<'info> {
    // Initialize new account
    #[account(init, payer = user, space = 8 + 32)]
    pub new_account: Account<'info, MyAccount>,
    
    // Mutable account
    #[account(mut)]
    pub mutable_account: Account<'info, MyAccount>,
    
    // PDA with seeds
    #[account(
        seeds = [b"config", user.key().as_ref()],
        bump
    )]
    pub config: Account<'info, Config>,
    
    // Ownership check
    #[account(has_one = authority)]
    pub owned_account: Account<'info, MyAccount>,
    
    // Custom constraint
    #[account(constraint = amount > 0 @ MyError::InvalidAmount)]
    pub data_account: Account<'info, Data>,
    
    // Close account (send lamports to user)
    #[account(mut, close = user)]
    pub closeable: Account<'info, Temp>,
    
    // Realloc (resize account)
    #[account(mut, realloc = 100, realloc::payer = user, realloc::zero = true)]
    pub resizable: Account<'info, Resizable>,
    
    #[account(mut)]
    pub user: Signer<'info>,
    pub authority: Signer<'info>,
    pub system_program: Program<'info, System>,
}</code></pre>
        `
    },
    {
        title: "How do you create SPL tokens with Rust?",
        tags: ["solana", "tokens", "difficulty-intermediate"],
        answer: `
            <p><strong>SPL Token</strong> is Solana's token standard, similar to ERC-20.</p>
            <strong>Creating a token mint:</strong>
            <pre><code class="language-rust">use anchor_spl::token::{Mint, Token, TokenAccount, MintTo};

#[derive(Accounts)]
pub struct CreateToken<'info> {
    #[account(
        init,
        payer = authority,
        mint::decimals = 9,
        mint::authority = authority,
    )]
    pub mint: Account<'info, Mint>,
    #[account(mut)]
    pub authority: Signer<'info>,
    pub token_program: Program<'info, Token>,
    pub system_program: Program<'info, System>,
    pub rent: Sysvar<'info, Rent>,
}

// Minting tokens
pub fn mint_tokens(ctx: Context<MintTokens>, amount: u64) -> Result<()> {
    let cpi_accounts = MintTo {
        mint: ctx.accounts.mint.to_account_info(),
        to: ctx.accounts.token_account.to_account_info(),
        authority: ctx.accounts.authority.to_account_info(),
    };
    let cpi_ctx = CpiContext::new(
        ctx.accounts.token_program.to_account_info(), 
        cpi_accounts
    );
    token::mint_to(cpi_ctx, amount)
}

#[derive(Accounts)]
pub struct MintTokens<'info> {
    #[account(mut)]
    pub mint: Account<'info, Mint>,
    #[account(mut)]
    pub token_account: Account<'info, TokenAccount>,
    pub authority: Signer<'info>,
    pub token_program: Program<'info, Token>,
}</code></pre>
        `
    },
    {
        title: "What is Solana's transaction structure?",
        tags: ["solana", "transactions", "difficulty-intermediate"],
        answer: `
            <p>Solana transactions bundle multiple instructions with signatures and account references.</p>
            <strong>Transaction anatomy:</strong>
            <pre><code class="language-rust">// Transaction structure
struct Transaction {
    signatures: Vec<Signature>,     // All required signatures
    message: Message {
        header: MessageHeader {
            num_required_signatures: u8,
            num_readonly_signed: u8,
            num_readonly_unsigned: u8,
        },
        account_keys: Vec<Pubkey>,  // All accounts used
        recent_blockhash: Hash,      // For replay protection
        instructions: Vec<CompiledInstruction>,
    }
}

// Building a transaction in Anchor client
let tx = Transaction::new_signed_with_payer(
    &[
        instruction1,
        instruction2,  // Multiple instructions
    ],
    Some(&payer.pubkey()),
    &[&payer, &other_signer],
    recent_blockhash,
);</code></pre>
            <strong>Transaction limits:</strong>
            <ul>
                <li>Max 1232 bytes per transaction</li>
                <li>Max 64 accounts per transaction</li>
                <li>Max 200k compute units (default)</li>
            </ul>
        `
    },
    {
        title: "How does Solana achieve parallel execution?",
        tags: ["solana", "sealevel", "difficulty-advanced"],
        answer: `
            <p><strong>Sealevel</strong> is Solana's parallel smart contract runtime.</p>
            <strong>How it works:</strong>
            <ul>
                <li>Transactions declare accounts upfront</li>
                <li>Non-overlapping transactions run in parallel</li>
                <li>Overlapping transactions run sequentially</li>
            </ul>
            <pre><code class="language-rust">// Tx1: Uses accounts [A, B]
// Tx2: Uses accounts [C, D]
// Tx3: Uses accounts [A, C]

// Execution:
// Parallel:   Tx1 || Tx2  (no overlap)
// Sequential: Tx3 after Tx1 and Tx2 (overlaps with both)</code></pre>
            <strong>Optimization tips:</strong>
            <pre><code class="language-rust">// Bad: Single global account bottleneck
#[account(mut)]
pub global_state: Account<'info, GlobalState>,

// Good: Per-user accounts (parallelizable)
#[account(
    seeds = [b"user_state", user.key().as_ref()],
    bump
)]
pub user_state: Account<'info, UserState>,</code></pre>
            <strong>Account locking:</strong> Read-only accounts can be shared, writable accounts are exclusive
        `
    }
];

// Export for use in main data file
if (typeof module !== 'undefined' && module.exports) {
    module.exports = rustSolana;
}