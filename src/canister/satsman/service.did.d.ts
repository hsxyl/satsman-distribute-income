import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';
import type { IDL } from '@dfinity/candid';

export interface Account {
  'reward_from_referral_in_current_block' : number,
  'minted_rune_in_current_block' : number,
  'withdraw_txid' : [] | [string],
  'price_in_current_block' : number,
  'total_paid_sats' : bigint,
  'total_reward_from_referral' : number,
  'last_update_block' : number,
  'total_minted_rune_amount' : number,
  'address' : string,
  'sats_balance' : bigint,
  'tune_in_current_block' : number,
  'total_referral_reward' : number,
  'withdrawn' : boolean,
  'paid_sats_in_current_block' : bigint,
  'total_avg_price' : number,
  'referral_reward_in_current_block' : number,
}
export interface BlockAggregateData {
  'total_paying_sats' : bigint,
  'total_minted_rune' : bigint,
  'total_ongoing_launch_pools' : number,
  'total_paying_users' : number,
}
export interface BlockState {
  'minted_rune_in_current_block' : bigint,
  'price_in_current_block' : number,
  'total_paid_sats' : bigint,
  'auction_raised_amount_in_current_block' : number,
  'total_exchange_fee' : number,
  'total_minted_rune' : bigint,
  'total_auction_raised_amount' : number,
  'user_accounts' : Array<[string, Account]>,
  'total_deposit_btc_balances' : bigint,
  'total_referral_reward' : number,
  'avg_price' : number,
  'block_height' : number,
  'paid_sats_in_current_block' : bigint,
  'exchange_fee_in_current_block' : number,
  'referral_reward_in_current_block' : number,
}
export interface CoinBalance { 'id' : string, 'value' : bigint }
export interface Config {
  'minimum_extract_auction_income_percentage' : number,
  'maximum_raising_target' : bigint,
  'minimum_top_up_sats' : bigint,
  'maximum_start_height_offset' : number,
  'maximum_rune_amount' : bigint,
  'maximum_extract_auction_income_percentage' : number,
  'exchange_fee_percentage' : number,
  'finalize_threshold' : number,
  'launch_span_options' : Uint32Array | number[],
  'referral_bonus_percentage' : number,
  'minimum_raising_target' : bigint,
  'maximum_top_up_sats' : bigint,
  'create_fee_sats' : bigint,
  'minimum_rune_amount' : bigint,
  'minimum_start_height_offset' : number,
  'minimum_launch_token_in_total_supply_percentage' : number,
}
export interface CreateLaunchState {
  'create_pool_fee' : bigint,
  'min_start_block_height' : number,
}
export type Event = {
    'Withdraw' : {
      'user' : string,
      'btc_amount' : bigint,
      'rune_amount' : bigint,
      'pool_address' : string,
    }
  } |
  { 'CreatePool' : GetPoolInfoArgs } |
  {
    'DistributeIncome' : {
      'btc_amount' : bigint,
      'rune_amount' : bigint,
      'pool_address' : string,
    }
  } |
  {
    'WithdrawRune' : {
      'user' : string,
      'rune_amount' : bigint,
      'pool_address' : string,
    }
  } |
  { 'TopUp' : { 'user' : string, 'amount' : bigint, 'pool_address' : string } };
export type ExchangeError = { 'RuneEntryNotFound' : string } |
  { 'PoolStateNotFound' : string } |
  { 'SetReferralCodeError' : string } |
  { 'PoolNotFound' : string } |
  { 'InvalidPageQuery' : string } |
  { 'UnexpectedPoolState' : string } |
  { 'CreatePoolFailed' : [string, string] } |
  { 'InvalidRuneName' : [string, string] } |
  { 'InvalidArgs' : string } |
  { 'PoolBusinessStateNotFound' : string } |
  { 'RuneNameExist' : string } |
  { 'InvalidLaunchPlan' : string } |
  { 'ExchangeStateNotInitialized' : null } |
  { 'CustomError' : string };
export interface ExchangeState {
  'execute_distribute_failed_pools' : Array<string>,
  'active_launch_pool_address_set' : Array<string>,
  'uuid' : bigint,
  'user_referral_codes' : Array<[string, string]>,
  'launching_rune' : Array<string>,
  'is_task_running' : boolean,
  'rune_launch_seq' : Array<[string, number]>,
  'code_of_users' : Array<[string, string]>,
  'sync_block_height' : number,
}
export interface ExecuteTxArgs {
  'zero_confirmed_tx_queue_length' : number,
  'txid' : string,
  'intention_set' : IntentionSet,
  'intention_index' : number,
  'psbt_hex' : string,
}
export type Filter = { 'Ongoing' : null } |
  { 'Completed' : null } |
  { 'Upcoming' : null };
export interface GetPoolInfoArgs { 'pool_address' : string }
export interface HomePageBlockData {
  'block_second_timestamp' : bigint,
  'ongoing_launches_count' : number,
  'total_release_rune_amount' : bigint,
}
export interface HomePageSatsmanData {
  'total_btc_raised' : bigint,
  'total_satsman_count' : number,
}
export interface IncomeDistributionItem {
  'label' : string,
  'address' : string,
  'percentage' : number,
}
export interface InputCoin { 'coin' : CoinBalance, 'from' : string }
export interface Intention {
  'input_coins' : Array<InputCoin>,
  'output_coins' : Array<OutputCoin>,
  'action' : string,
  'exchange_id' : string,
  'pool_utxo_spent' : Array<string>,
  'action_params' : string,
  'nonce' : bigint,
  'pool_address' : string,
  'pool_utxo_received' : Array<Utxo>,
}
export interface IntentionSet {
  'tx_fee_in_sats' : bigint,
  'initiator_address' : string,
  'intentions' : Array<Intention>,
}
export interface LaunchPlan {
  'start_height' : number,
  'launch_token' : string,
  'social_info' : SocialInfo,
  'rune_name' : string,
  'banner' : [] | [string],
  'description' : [] | [string],
  'is_fair_launch' : boolean,
  'span_blocks' : number,
  'raising_target_sats' : bigint,
  'extract_auction_income_ratio' : number,
  'rune_id' : string,
  'income_distribution' : Array<IncomeDistributionItem>,
}
export interface LaunchpadState {
  'user_balances' : Array<[string, bigint]>,
  'withdrawn_rune' : boolean,
  'txid' : string,
  'utxo' : Utxo,
  'event' : Event,
  'nonce' : bigint,
  'withdrawn_user_set' : Array<string>,
}
export interface NewBlockInfo {
  'block_hash' : string,
  'confirmed_txids' : Array<string>,
  'block_timestamp' : bigint,
  'block_height' : number,
}
export type Outcome = { 'Failed' : null } |
  { 'Listed' : null } |
  { 'Success' : null };
export type OutcomeFilter = { 'NotFailed' : null } |
  { 'NotListed' : null } |
  { 'Failed' : null } |
  { 'Listed' : null } |
  { 'NotSuccess' : null } |
  { 'Success' : null };
export interface OutputCoin { 'to' : string, 'coin' : CoinBalance }
export interface Page {
  'page_size' : number,
  'total' : number,
  'page' : number,
  'total_pages' : number,
  'items' : Array<PoolBusinessStateView>,
  'has_next' : boolean,
  'has_prev' : boolean,
}
export interface PageQuery {
  'sort_by' : [] | [SortBy],
  'featured_first' : boolean,
  'page_size' : number,
  'status_filters' : [] | [Filter],
  'page' : number,
  'sort_order' : [] | [SortOrder],
  'search_text' : [] | [string],
  'outcome_filters' : [] | [OutcomeFilter],
}
export interface PoolBasic { 'name' : string, 'address' : string }
export interface PoolBusinessStateView {
  'status' : Filter,
  'creator' : string,
  'featured' : boolean,
  'start_height' : number,
  'pool_name' : string,
  'end_height' : number,
  'income_distribution_list' : Array<[string, bigint]>,
  'pubkey' : string,
  'btc_amount_for_lp' : bigint,
  'raising_target' : bigint,
  'key_derivation_path' : Array<Uint8Array | number[]>,
  'exchange_fee_percentage' : number,
  'referral_bonus_percentage' : number,
  'distribute_income_txid' : [] | [string],
  'highest_block_states' : [] | [BlockState],
  'creator_withdraw_rune_txid' : [] | [string],
  'total_claimed_rune' : bigint,
  'total_claimed_sats' : bigint,
  'synced_block_height' : number,
  'user_tunes' : Array<[string, number]>,
  'rune_amount_for_lp' : bigint,
  'rune_amount_for_launch' : bigint,
  'pool_address' : string,
  'outcome' : Outcome,
  'launch_plan' : LaunchPlan,
  'rune_id' : string,
}
export interface PoolInfo {
  'key' : string,
  'name' : string,
  'btc_reserved' : bigint,
  'key_derivation_path' : Array<Uint8Array | number[]>,
  'coin_reserved' : Array<CoinBalance>,
  'attributes' : string,
  'address' : string,
  'nonce' : bigint,
  'utxos' : Array<Utxo>,
}
export type PoolStatus = { 'Ongoing' : null } |
  { 'Completed' : null } |
  { 'Upcoming' : null };
export type Result = { 'Ok' : string } |
  { 'Err' : string };
export type Result_1 = { 'Ok' : null } |
  { 'Err' : string };
export type Result_2 = { 'Ok' : string } |
  { 'Err' : ExchangeError };
export type Result_3 = { 'Ok' : null } |
  { 'Err' : ExchangeError };
export interface RollbackTxArgs { 'txid' : string, 'reason_code' : string }
export interface RuneEntry {
  'confirmations' : number,
  'mints' : bigint,
  'terms' : [] | [Terms],
  'etching' : string,
  'turbo' : boolean,
  'premine' : bigint,
  'divisibility' : number,
  'spaced_rune' : string,
  'number' : bigint,
  'timestamp' : bigint,
  'block' : bigint,
  'burned' : bigint,
  'rune_id' : string,
  'symbol' : [] | [string],
}
export interface SocialInfo {
  'twitter' : [] | [string],
  'website' : [] | [string],
  'discord' : [] | [string],
  'telegram' : [] | [string],
  'github' : [] | [string],
}
export type SortBy = { 'TVL' : null } |
  { 'StartHeight' : null } |
  { 'UserCount' : null } |
  { 'EndHeight' : null };
export type SortOrder = { 'Asc' : null } |
  { 'Desc' : null };
export interface Terms {
  'cap' : [] | [bigint],
  'height' : [[] | [bigint], [] | [bigint]],
  'offset' : [[] | [bigint], [] | [bigint]],
  'amount' : [] | [bigint],
}
export interface UserInfoOfLaunch {
  'tune' : number,
  'referral_reward' : number,
  'referral_list' : Array<string>,
  'account' : [] | [Account],
  'balance_include_unconfirmed' : bigint,
  'referral_address' : [] | [string],
  'launch_pool_address' : string,
}
export interface UserLaunchRecordPools {
  'user_referral_pools' : Array<PoolBusinessStateView>,
  'user_created_pools' : Array<PoolBusinessStateView>,
  'user_joined_pools' : Array<PoolBusinessStateView>,
}
export interface Utxo {
  'coins' : Array<CoinBalance>,
  'sats' : bigint,
  'txid' : string,
  'vout' : number,
}
export interface _SERVICE {
  'execute_tx' : ActorMethod<[ExecuteTxArgs], Result>,
  'feature_pool' : ActorMethod<[string], Result_1>,
  'generate_referral_code' : ActorMethod<[string], string>,
  'get_block_state' : ActorMethod<[string], Array<BlockState>>,
  'get_config' : ActorMethod<[], Config>,
  'get_create_launch_info' : ActorMethod<[], CreateLaunchState>,
  'get_exchange_state' : ActorMethod<[], ExchangeState>,
  'get_home_page_block_aggregation_data' : ActorMethod<
    [number, number],
    [Array<[number, HomePageBlockData]>, HomePageSatsmanData]
  >,
  'get_launch_pool' : ActorMethod<[string], [] | [PoolBusinessStateView]>,
  'get_launch_pool_block_states' : ActorMethod<[string], Array<BlockState>>,
  'get_launch_pool_by_name' : ActorMethod<
    [string],
    [] | [PoolBusinessStateView]
  >,
  'get_launch_pools' : ActorMethod<[], Array<PoolBusinessStateView>>,
  'get_need_distribute_income_pools' : ActorMethod<
    [],
    Array<PoolBusinessStateView>
  >,
  'get_pool_address_by_name' : ActorMethod<[string], [] | [string]>,
  'get_pool_info' : ActorMethod<[GetPoolInfoArgs], [] | [PoolInfo]>,
  'get_pool_list' : ActorMethod<[], Array<PoolBasic>>,
  'get_pool_with_state_and_key' : ActorMethod<
    [string],
    [] | [[LaunchpadState, string]]
  >,
  'get_user_info_of_launch' : ActorMethod<[string, string], UserInfoOfLaunch>,
  'get_user_records' : ActorMethod<[string], UserLaunchRecordPools>,
  'get_user_withdrawable_coins' : ActorMethod<
    [string, string],
    Array<CoinBalance>
  >,
  'is_rune_id_in_launching' : ActorMethod<[string], boolean>,
  'new_block' : ActorMethod<[NewBlockInfo], Result_1>,
  'new_pool' : ActorMethod<[string], Result_2>,
  'query_all_rune_entries' : ActorMethod<[], Array<[string, RuneEntry]>>,
  'query_block_index_data' : ActorMethod<
    [number, number],
    Array<[number, BlockAggregateData]>
  >,
  'query_events' : ActorMethod<[], Array<Event>>,
  'query_launch' : ActorMethod<[PageQuery], Page>,
  'query_tx_event' : ActorMethod<[string], [] | [Event]>,
  'reset_blocks' : ActorMethod<[], Result_1>,
  'rollback_tx' : ActorMethod<[RollbackTxArgs], Result_1>,
  'tune' : ActorMethod<[string, string, number], Result_3>,
}
export declare const idlFactory: IDL.InterfaceFactory;
export declare const init: (args: { IDL: typeof IDL }) => IDL.Type[];
