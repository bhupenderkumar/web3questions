// Rust & Web3 Questions - CosmWasm Development (Cosmos)
const rustCosmWasm = [
    {
        title: "What is CosmWasm?",
        tags: ["cosmwasm", "cosmos", "difficulty-intermediate"],
        answer: `
            <p><strong>CosmWasm</strong> is a smart contract platform for the Cosmos ecosystem, using Rust compiled to WebAssembly.</p>
            <strong>Key features:</strong>
            <ul>
                <li><strong>Multi-chain:</strong> Deploy same contract across Cosmos chains</li>
                <li><strong>Actor model:</strong> Contracts communicate via messages</li>
                <li><strong>Capabilities:</strong> Fine-grained permissions system</li>
                <li><strong>IBC-enabled:</strong> Cross-chain contract calls</li>
            </ul>
            <strong>Contract lifecycle:</strong>
            <pre><code class="language-rust">// 1. Store code on chain
wasmd tx wasm store contract.wasm --from wallet

// 2. Instantiate contract
wasmd tx wasm instantiate $CODE_ID '{"count": 0}' --label "counter"

// 3. Execute messages
wasmd tx wasm execute $CONTRACT '{"increment": {}}'

// 4. Query state
wasmd query wasm contract-state smart $CONTRACT '{"get_count": {}}'</code></pre>
            <strong>Chains using CosmWasm:</strong> Osmosis, Juno, Terra, Neutron, Injective
        `
    },
    {
        title: "What is the basic structure of a CosmWasm contract?",
        tags: ["cosmwasm", "difficulty-intermediate"],
        answer: `
            <p>CosmWasm contracts have three entry points: <strong>instantiate</strong>, <strong>execute</strong>, and <strong>query</strong>.</p>
            <pre><code class="language-rust">use cosmwasm_std::{
    entry_point, Binary, Deps, DepsMut, Env, MessageInfo, Response, StdResult,
};

// Contract state
#[cw_serde]
pub struct State {
    pub count: i32,
    pub owner: Addr,
}

// Messages
#[cw_serde]
pub struct InstantiateMsg {
    pub count: i32,
}

#[cw_serde]
pub enum ExecuteMsg {
    Increment {},
    Reset { count: i32 },
}

#[cw_serde]
pub enum QueryMsg {
    GetCount {},
}

// Entry points
#[entry_point]
pub fn instantiate(
    deps: DepsMut,
    _env: Env,
    info: MessageInfo,
    msg: InstantiateMsg,
) -> StdResult<Response> {
    let state = State {
        count: msg.count,
        owner: info.sender.clone(),
    };
    STATE.save(deps.storage, &state)?;
    Ok(Response::new().add_attribute("method", "instantiate"))
}

#[entry_point]
pub fn execute(
    deps: DepsMut,
    _env: Env,
    info: MessageInfo,
    msg: ExecuteMsg,
) -> StdResult<Response> {
    match msg {
        ExecuteMsg::Increment {} => execute_increment(deps),
        ExecuteMsg::Reset { count } => execute_reset(deps, info, count),
    }
}

#[entry_point]
pub fn query(deps: Deps, _env: Env, msg: QueryMsg) -> StdResult<Binary> {
    match msg {
        QueryMsg::GetCount {} => to_binary(&query_count(deps)?),
    }
}</code></pre>
        `
    },
    {
        title: "How does CosmWasm storage work?",
        tags: ["cosmwasm", "storage", "difficulty-intermediate"],
        answer: `
            <p>CosmWasm provides storage primitives through <strong>cw-storage-plus</strong>.</p>
            <pre><code class="language-rust">use cw_storage_plus::{Item, Map, IndexedMap, MultiIndex, Index};

// Simple item (single value)
pub const CONFIG: Item<Config> = Item::new("config");

// Map (key-value)
pub const BALANCES: Map<&Addr, Uint128> = Map::new("balances");

// Map with tuple key
pub const ALLOWANCES: Map<(&Addr, &Addr), Uint128> = Map::new("allowances");

// Usage
fn example(deps: DepsMut) -> StdResult<()> {
    // Save item
    CONFIG.save(deps.storage, &config)?;
    
    // Load item
    let config = CONFIG.load(deps.storage)?;
    let config_maybe = CONFIG.may_load(deps.storage)?; // Returns Option
    
    // Map operations
    BALANCES.save(deps.storage, &addr, &Uint128::new(1000))?;
    let balance = BALANCES.load(deps.storage, &addr)?;
    
    // Update
    BALANCES.update(deps.storage, &addr, |bal| -> StdResult<_> {
        Ok(bal.unwrap_or_default() + amount)
    })?;
    
    // Iterate
    let all: StdResult<Vec<_>> = BALANCES
        .range(deps.storage, None, None, Order::Ascending)
        .collect();
    
    Ok(())
}</code></pre>
            <strong>Indexed maps for complex queries:</strong>
            <pre><code class="language-rust">pub struct TokenIndexes<'a> {
    pub owner: MultiIndex<'a, Addr, TokenInfo, String>,
}

impl<'a> IndexList<TokenInfo> for TokenIndexes<'a> {
    fn get_indexes(&'_ self) -> Box<dyn Iterator<Item = &'_ dyn Index<TokenInfo>> + '_> {
        let v: Vec<&dyn Index<TokenInfo>> = vec![&self.owner];
        Box::new(v.into_iter())
    }
}

pub fn tokens<'a>() -> IndexedMap<'a, &'a str, TokenInfo, TokenIndexes<'a>> {
    let indexes = TokenIndexes {
        owner: MultiIndex::new(|_, d| d.owner.clone(), "tokens", "tokens__owner"),
    };
    IndexedMap::new("tokens", indexes)
}</code></pre>
        `
    },
    {
        title: "How do you handle funds in CosmWasm?",
        tags: ["cosmwasm", "funds", "difficulty-intermediate"],
        answer: `
            <p>CosmWasm contracts can receive and send native tokens through <strong>MessageInfo</strong> and <strong>BankMsg</strong>.</p>
            <pre><code class="language-rust">use cosmwasm_std::{BankMsg, Coin, coins, Uint128};

#[entry_point]
pub fn execute(
    deps: DepsMut,
    _env: Env,
    info: MessageInfo,  // Contains sender and funds
    msg: ExecuteMsg,
) -> Result<Response, ContractError> {
    match msg {
        ExecuteMsg::Deposit {} => {
            // Check received funds
            let payment = info
                .funds
                .iter()
                .find(|c| c.denom == "uatom")
                .ok_or(ContractError::NoFunds {})?;
            
            // Must be exactly 1 ATOM
            if payment.amount != Uint128::new(1_000_000) {
                return Err(ContractError::InvalidAmount {});
            }
            
            // Store deposit...
            Ok(Response::new())
        }
        
        ExecuteMsg::Withdraw { amount } => {
            // Send funds to caller
            let msg = BankMsg::Send {
                to_address: info.sender.to_string(),
                amount: coins(amount.u128(), "uatom"),
            };
            
            Ok(Response::new().add_message(msg))
        }
        
        ExecuteMsg::Burn { amount } => {
            // Burn tokens (send to module)
            let msg = BankMsg::Burn {
                amount: coins(amount.u128(), "uatom"),
            };
            
            Ok(Response::new().add_message(msg))
        }
    }
}

// Query contract balance
fn query_balance(deps: Deps, env: Env) -> StdResult<Coin> {
    deps.querier.query_balance(env.contract.address, "uatom")
}</code></pre>
        `
    },
    {
        title: "What is submessage and reply pattern in CosmWasm?",
        tags: ["cosmwasm", "submessages", "difficulty-advanced"],
        answer: `
            <p><strong>Submessages</strong> allow contracts to get callbacks after executing messages.</p>
            <pre><code class="language-rust">use cosmwasm_std::{SubMsg, Reply, ReplyOn};

const INSTANTIATE_REPLY_ID: u64 = 1;

pub fn execute_create_token(deps: DepsMut, env: Env) -> Result<Response, ContractError> {
    let instantiate_msg = WasmMsg::Instantiate {
        admin: Some(env.contract.address.to_string()),
        code_id: CW20_CODE_ID,
        msg: to_binary(&cw20_msg)?,
        funds: vec![],
        label: "My Token".to_string(),
    };
    
    // SubMsg with reply
    let submsg = SubMsg {
        id: INSTANTIATE_REPLY_ID,
        msg: instantiate_msg.into(),
        gas_limit: None,
        reply_on: ReplyOn::Success,  // Only reply on success
    };
    
    Ok(Response::new().add_submessage(submsg))
}

#[entry_point]
pub fn reply(deps: DepsMut, _env: Env, msg: Reply) -> Result<Response, ContractError> {
    match msg.id {
        INSTANTIATE_REPLY_ID => {
            // Parse the instantiation response
            let res = parse_reply_instantiate_data(msg)?;
            let token_addr = deps.api.addr_validate(&res.contract_address)?;
            
            // Store the new token address
            TOKEN_ADDR.save(deps.storage, &token_addr)?;
            
            Ok(Response::new()
                .add_attribute("token_address", token_addr))
        }
        _ => Err(ContractError::UnknownReplyId { id: msg.id }),
    }
}</code></pre>
            <strong>ReplyOn options:</strong>
            <ul>
                <li><strong>Always:</strong> Reply on success or error</li>
                <li><strong>Success:</strong> Only reply on success</li>
                <li><strong>Error:</strong> Only reply on error</li>
                <li><strong>Never:</strong> Fire and forget</li>
            </ul>
        `
    },
    {
        title: "How do you implement CW20 (fungible token) in CosmWasm?",
        tags: ["cosmwasm", "cw20", "tokens", "difficulty-intermediate"],
        answer: `
            <p><strong>CW20</strong> is the CosmWasm standard for fungible tokens, similar to ERC-20.</p>
            <pre><code class="language-rust">// Using cw20-base as foundation
use cw20_base::contract::{execute as cw20_execute, query as cw20_query};
use cw20_base::msg::{ExecuteMsg as Cw20ExecuteMsg, QueryMsg as Cw20QueryMsg};

// Custom wrapper with additional functionality
#[entry_point]
pub fn execute(
    deps: DepsMut,
    env: Env,
    info: MessageInfo,
    msg: ExecuteMsg,
) -> Result<Response, ContractError> {
    match msg {
        // Handle CW20 standard messages
        ExecuteMsg::Transfer { recipient, amount } => {
            cw20_execute(deps, env, info, Cw20ExecuteMsg::Transfer { recipient, amount })
                .map_err(Into::into)
        }
        // Custom message
        ExecuteMsg::Mint { recipient, amount } => execute_mint(deps, env, info, recipient, amount),
    }
}

// Or implement from scratch
#[cw_serde]
pub struct TokenInfo {
    pub name: String,
    pub symbol: String,
    pub decimals: u8,
    pub total_supply: Uint128,
}

pub fn execute_transfer(
    deps: DepsMut,
    _env: Env,
    info: MessageInfo,
    recipient: String,
    amount: Uint128,
) -> Result<Response, ContractError> {
    let recipient = deps.api.addr_validate(&recipient)?;
    
    BALANCES.update(deps.storage, &info.sender, |bal| -> StdResult<_> {
        Ok(bal.unwrap_or_default().checked_sub(amount)?)
    })?;
    
    BALANCES.update(deps.storage, &recipient, |bal| -> StdResult<_> {
        Ok(bal.unwrap_or_default() + amount)
    })?;
    
    Ok(Response::new()
        .add_attribute("action", "transfer")
        .add_attribute("from", info.sender)
        .add_attribute("to", recipient)
        .add_attribute("amount", amount))
}</code></pre>
        `
    },
    {
        title: "What is IBC in CosmWasm and how do you use it?",
        tags: ["cosmwasm", "ibc", "difficulty-advanced"],
        answer: `
            <p><strong>IBC (Inter-Blockchain Communication)</strong> enables cross-chain communication in Cosmos.</p>
            <pre><code class="language-rust">use cosmwasm_std::{IbcMsg, IbcTimeout, IbcChannel};

// Send IBC packet
pub fn execute_send_ibc(
    deps: DepsMut,
    env: Env,
    channel_id: String,
    data: Binary,
) -> Result<Response, ContractError> {
    let timeout = IbcTimeout::with_timestamp(env.block.time.plus_seconds(300));
    
    let msg = IbcMsg::SendPacket {
        channel_id,
        data,
        timeout,
    };
    
    Ok(Response::new().add_message(msg))
}

// IBC entry points
#[entry_point]
pub fn ibc_channel_open(
    _deps: DepsMut,
    _env: Env,
    msg: IbcChannelOpenMsg,
) -> Result<IbcChannelOpenResponse, ContractError> {
    // Validate channel parameters
    let channel = msg.channel();
    if channel.order != IbcOrder::Unordered {
        return Err(ContractError::OnlyUnorderedChannel {});
    }
    Ok(None)  // Accept channel
}

#[entry_point]
pub fn ibc_packet_receive(
    deps: DepsMut,
    _env: Env,
    msg: IbcPacketReceiveMsg,
) -> Result<IbcReceiveResponse, ContractError> {
    let packet = msg.packet;
    let data: PacketData = from_binary(&packet.data)?;
    
    // Process received data
    let response = process_packet(deps, data)?;
    
    Ok(IbcReceiveResponse::new()
        .add_attribute("action", "receive")
        .set_ack(to_binary(&Ack::Success)?))
}

#[entry_point]
pub fn ibc_packet_ack(
    deps: DepsMut,
    _env: Env,
    msg: IbcPacketAckMsg,
) -> Result<Response, ContractError> {
    // Handle acknowledgement
    let ack: Ack = from_binary(&msg.acknowledgement.data)?;
    match ack {
        Ack::Success => { /* Success handling */ }
        Ack::Error(err) => { /* Rollback on error */ }
    }
    Ok(Response::new())
}</code></pre>
        `
    },
    {
        title: "How do you test CosmWasm contracts?",
        tags: ["cosmwasm", "testing", "difficulty-intermediate"],
        answer: `
            <p>CosmWasm provides <strong>cw-multi-test</strong> for integration testing.</p>
            <pre><code class="language-rust">#[cfg(test)]
mod tests {
    use cosmwasm_std::testing::{mock_dependencies, mock_env, mock_info};
    use cosmwasm_std::{coins, from_binary};
    use cw_multi_test::{App, ContractWrapper, Executor};

    // Unit test with mocks
    #[test]
    fn proper_initialization() {
        let mut deps = mock_dependencies();
        let msg = InstantiateMsg { count: 17 };
        let info = mock_info("creator", &coins(1000, "earth"));
        
        let res = instantiate(deps.as_mut(), mock_env(), info, msg).unwrap();
        assert_eq!(0, res.messages.len());
        
        // Query state
        let res = query(deps.as_ref(), mock_env(), QueryMsg::GetCount {}).unwrap();
        let value: CountResponse = from_binary(&res).unwrap();
        assert_eq!(17, value.count);
    }

    // Integration test with multi-test
    #[test]
    fn multi_contract_interaction() {
        let mut app = App::default();
        
        // Upload contracts
        let counter_code = ContractWrapper::new(execute, instantiate, query);
        let counter_id = app.store_code(Box::new(counter_code));
        
        // Instantiate
        let counter_addr = app
            .instantiate_contract(
                counter_id,
                Addr::unchecked("owner"),
                &InstantiateMsg { count: 0 },
                &[],
                "Counter",
                None,
            )
            .unwrap();
        
        // Execute
        app.execute_contract(
            Addr::unchecked("anyone"),
            counter_addr.clone(),
            &ExecuteMsg::Increment {},
            &[],
        ).unwrap();
        
        // Query
        let resp: CountResponse = app
            .wrap()
            .query_wasm_smart(counter_addr, &QueryMsg::GetCount {})
            .unwrap();
        assert_eq!(resp.count, 1);
    }
}</code></pre>
        `
    },
    {
        title: "What are admin and migration patterns in CosmWasm?",
        tags: ["cosmwasm", "upgrades", "difficulty-advanced"],
        answer: `
            <p>CosmWasm contracts can have an <strong>admin</strong> for upgrades and a <strong>migrate</strong> entry point.</p>
            <pre><code class="language-rust">// Set admin during instantiation
wasmd tx wasm instantiate $CODE_ID '{}' --admin $ADMIN_ADDR

// Migration entry point
#[entry_point]
pub fn migrate(deps: DepsMut, _env: Env, msg: MigrateMsg) -> Result<Response, ContractError> {
    // Check contract version
    let version: ContractVersion = get_contract_version(deps.storage)?;
    if version.contract != CONTRACT_NAME {
        return Err(ContractError::CannotMigrate {
            previous_contract: version.contract,
        });
    }
    
    // Version check
    let old_version: Version = version.version.parse()?;
    let new_version: Version = CONTRACT_VERSION.parse()?;
    
    if old_version >= new_version {
        return Err(ContractError::CannotMigrate {
            previous_contract: version.version,
        });
    }
    
    // Perform migration
    migrate_state_v1_to_v2(deps.storage)?;
    
    // Update version
    set_contract_version(deps.storage, CONTRACT_NAME, CONTRACT_VERSION)?;
    
    Ok(Response::new()
        .add_attribute("action", "migrate")
        .add_attribute("from_version", version.version)
        .add_attribute("to_version", CONTRACT_VERSION))
}

// State migration helper
fn migrate_state_v1_to_v2(storage: &mut dyn Storage) -> StdResult<()> {
    #[cw_serde]
    struct OldState { value: u32 }
    
    let old_state: OldState = Item::new("state").load(storage)?;
    
    let new_state = State { 
        value: old_state.value,
        new_field: Default::default(),
    };
    
    STATE.save(storage, &new_state)
}</code></pre>
            <strong>Migrate command:</strong>
            <pre><code class="language-bash">wasmd tx wasm migrate $CONTRACT $NEW_CODE_ID '{"new_param": "value"}'</code></pre>
        `
    }
];

// Export for use in main data file
if (typeof module !== 'undefined' && module.exports) {
    module.exports = rustCosmWasm;
}