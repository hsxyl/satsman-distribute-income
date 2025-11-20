import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';
import type { IDL } from '@dfinity/candid';

export interface BlockInfo { 'height' : number, 'hash' : string }
export interface CoinBalance { 'id' : string, 'value' : bigint }
export interface DonateIntention {
  'out_rune' : CoinBalance,
  'out_sats' : bigint,
  'nonce' : bigint,
  'input' : Utxo,
}
export type ExchangeError = { 'InvalidSignPsbtArgs' : string } |
  { 'FundsLimitExceeded' : null } |
  { 'UtxoMismatch' : null } |
  { 'InvalidNumeric' : null } |
  { 'Overflow' : null } |
  { 'Paused' : null } |
  { 'InvalidInput' : null } |
  { 'PoolAddressNotFound' : null } |
  { 'PriceImpactLimitExceeded' : null } |
  { 'RuneIndexerError' : string } |
  { 'PoolStateExpired' : bigint } |
  { 'InvalidSignature' : null } |
  { 'TooSmallFunds' : null } |
  { 'LiquidityLocked' : null } |
  { 'OnetimePool' : null } |
  { 'InvalidRuneId' : null } |
  { 'InvalidPool' : null } |
  { 'InvalidPsbt' : string } |
  { 'PoolAlreadyExists' : null } |
  { 'InvalidTxid' : null } |
  { 'InvalidLiquidity' : null } |
  { 'BlockSyncing' : null } |
  { 'EmptyPool' : null } |
  { 'InvalidLockMessage' : null } |
  { 'FetchBitcoinCanisterError' : null } |
  { 'LpNotFound' : null } |
  { 'NoConfirmedUtxos' : null } |
  { 'ChainKeyError' : null } |
  { 'FetchRuneIndexerError' : null } |
  { 'InvalidState' : string } |
  { 'InsufficientFunds' : null };
export interface ExecuteTxArgs {
  'zero_confirmed_tx_queue_length' : number,
  'txid' : string,
  'intention_set' : IntentionSet,
  'intention_index' : number,
  'psbt_hex' : string,
}
export interface ExtractFeeOffer {
  'output' : CoinBalance,
  'nonce' : bigint,
  'input' : Utxo,
}
export interface GetMinimalTxValueArgs {
  'zero_confirmed_tx_queue_length' : number,
  'pool_address' : string,
}
export interface GetPoolInfoArgs { 'pool_address' : string }
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
export interface Liquidity {
  'total_share' : bigint,
  'user_share' : bigint,
  'locked_revenue' : bigint,
  'user_incomes' : bigint,
  'lock_until' : number,
}
export interface LiquidityOffer {
  'output' : CoinBalance,
  'inputs' : [] | [Utxo],
  'nonce' : bigint,
}
export interface NewBlockInfo {
  'block_hash' : string,
  'confirmed_txids' : Array<string>,
  'block_timestamp' : bigint,
  'block_height' : number,
}
export interface OutputCoin { 'to' : string, 'coin' : CoinBalance }
export interface PoolBasic { 'name' : string, 'address' : string }
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
export interface PoolState {
  'k' : bigint,
  'id' : [] | [string],
  'lp' : Array<[string, bigint]>,
  'lp_earnings' : Array<[string, bigint]>,
  'utxo' : [] | [Utxo],
  'total_rune_donation' : bigint,
  'incomes' : bigint,
  'locked_lp_revenue' : Array<[string, bigint]>,
  'total_btc_donation' : bigint,
  'nonce' : bigint,
  'lp_locks' : Array<[string, number]>,
}
export type PoolTemplate = { 'NFTStrategy' : null } |
  { 'Satsman' : null } |
  { 'Standard' : null };
export interface PreClaimOutput {
  'nonce' : bigint,
  'claim_sats' : bigint,
  'input' : Utxo,
}
export type Result = { 'Ok' : [bigint, bigint] } |
  { 'Err' : string };
export type Result_1 = { 'Ok' : string } |
  { 'Err' : ExchangeError };
export type Result_10 = { 'Ok' : PreClaimOutput } |
  { 'Err' : ExchangeError };
export type Result_11 = { 'Ok' : ExtractFeeOffer } |
  { 'Err' : ExchangeError };
export type Result_12 = { 'Ok' : SwapOffer } |
  { 'Err' : ExchangeError };
export type Result_13 = { 'Ok' : WithdrawalOffer } |
  { 'Err' : ExchangeError };
export type Result_14 = { 'Ok' : Array<BlockInfo> } |
  { 'Err' : string };
export type Result_15 = { 'Ok' : PoolInfo } |
  { 'Err' : ExchangeError };
export type Result_16 = { 'Ok' : Array<TxRecordInfo> } |
  { 'Err' : string };
export type Result_2 = { 'Ok' : null } |
  { 'Err' : ExchangeError };
export type Result_3 = { 'Ok' : string } |
  { 'Err' : string };
export type Result_4 = { 'Ok' : Array<[string, Liquidity]> } |
  { 'Err' : ExchangeError };
export type Result_5 = { 'Ok' : Liquidity } |
  { 'Err' : ExchangeError };
export type Result_6 = { 'Ok' : [] | [[[] | [PoolState], PoolState]] } |
  { 'Err' : string };
export type Result_7 = { 'Ok' : null } |
  { 'Err' : string };
export type Result_8 = { 'Ok' : LiquidityOffer } |
  { 'Err' : ExchangeError };
export type Result_9 = { 'Ok' : DonateIntention } |
  { 'Err' : ExchangeError };
export interface RollbackTxArgs { 'txid' : string }
export interface SwapOffer {
  'output' : CoinBalance,
  'nonce' : bigint,
  'price_impact' : number,
  'input' : Utxo,
}
export interface TxRecord { 'pools' : Array<string> }
export interface TxRecordInfo {
  'records' : Array<string>,
  'txid' : string,
  'confirmed' : boolean,
}
export interface Utxo {
  'coins' : Array<CoinBalance>,
  'sats' : bigint,
  'txid' : string,
  'vout' : number,
}
export interface WithdrawalOffer {
  'nonce' : bigint,
  'input' : Utxo,
  'user_outputs' : Array<CoinBalance>,
}
export interface _SERVICE {
  'add_pool_creator_principal' : ActorMethod<[Principal], undefined>,
  'blocks_tx_records_count' : ActorMethod<[], Result>,
  'create' : ActorMethod<[string], Result_1>,
  'create_with_template' : ActorMethod<[string, PoolTemplate], Result_1>,
  'donate_rich_protocol_revenue' : ActorMethod<[], Result_2>,
  'escape_hatch' : ActorMethod<[string, string, bigint], Result_3>,
  'execute_tx' : ActorMethod<[ExecuteTxArgs], Result_3>,
  'get_all_lp' : ActorMethod<[string], Result_4>,
  'get_block' : ActorMethod<[number], [] | [NewBlockInfo]>,
  'get_execute_log' : ActorMethod<[string], string>,
  'get_fee_collector' : ActorMethod<[], string>,
  'get_lp' : ActorMethod<[string, string], Result_5>,
  'get_max_block' : ActorMethod<[], [] | [NewBlockInfo]>,
  'get_minimal_tx_value' : ActorMethod<[GetMinimalTxValueArgs], bigint>,
  'get_pool_info' : ActorMethod<[GetPoolInfoArgs], [] | [PoolInfo]>,
  'get_pool_list' : ActorMethod<[], Array<PoolBasic>>,
  'get_pool_state_chain' : ActorMethod<[string, string], Result_6>,
  'get_tx_affected' : ActorMethod<[string], [] | [TxRecord]>,
  'list_pools' : ActorMethod<[[] | [string], bigint], Array<PoolInfo>>,
  'lock_lp' : ActorMethod<[string, string, string], Result_2>,
  'new_block' : ActorMethod<[NewBlockInfo], Result_7>,
  'pause' : ActorMethod<[], undefined>,
  'pre_add_liquidity' : ActorMethod<[string, CoinBalance], Result_8>,
  'pre_bi_donate' : ActorMethod<[string, bigint, CoinBalance], Result_9>,
  'pre_claim_revenue' : ActorMethod<[string, string], Result_10>,
  'pre_donate' : ActorMethod<[string, bigint], Result_9>,
  'pre_extract_fee' : ActorMethod<[string], Result_11>,
  'pre_self_donate' : ActorMethod<[], Result_9>,
  'pre_swap' : ActorMethod<[string, CoinBalance], Result_12>,
  'pre_withdraw_liquidity' : ActorMethod<[string, string, bigint], Result_13>,
  'query_blocks' : ActorMethod<[], Result_14>,
  'query_pool' : ActorMethod<[string], Result_15>,
  'query_tx_records' : ActorMethod<[], Result_16>,
  'recover' : ActorMethod<[], undefined>,
  'rollback_tx' : ActorMethod<[RollbackTxArgs], Result_7>,
  'set_donation_amount' : ActorMethod<[string, bigint, bigint], Result_2>,
  'set_orchestrator' : ActorMethod<[Principal], undefined>,
  'sync_with_btc' : ActorMethod<[string, bigint], Result_1>,
}
export declare const idlFactory: IDL.InterfaceFactory;
export declare const init: (args: { IDL: typeof IDL }) => IDL.Type[];
