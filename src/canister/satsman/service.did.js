export const idlFactory = ({ IDL }) => {
  const CoinBalance = IDL.Record({ 'id' : IDL.Text, 'value' : IDL.Nat });
  const InputCoin = IDL.Record({ 'coin' : CoinBalance, 'from' : IDL.Text });
  const OutputCoin = IDL.Record({ 'to' : IDL.Text, 'coin' : CoinBalance });
  const Utxo = IDL.Record({
    'coins' : IDL.Vec(CoinBalance),
    'sats' : IDL.Nat64,
    'txid' : IDL.Text,
    'vout' : IDL.Nat32,
  });
  const Intention = IDL.Record({
    'input_coins' : IDL.Vec(InputCoin),
    'output_coins' : IDL.Vec(OutputCoin),
    'action' : IDL.Text,
    'exchange_id' : IDL.Text,
    'pool_utxo_spent' : IDL.Vec(IDL.Text),
    'action_params' : IDL.Text,
    'nonce' : IDL.Nat64,
    'pool_address' : IDL.Text,
    'pool_utxo_received' : IDL.Vec(Utxo),
  });
  const IntentionSet = IDL.Record({
    'tx_fee_in_sats' : IDL.Nat64,
    'initiator_address' : IDL.Text,
    'intentions' : IDL.Vec(Intention),
  });
  const ExecuteTxArgs = IDL.Record({
    'zero_confirmed_tx_queue_length' : IDL.Nat32,
    'txid' : IDL.Text,
    'intention_set' : IntentionSet,
    'intention_index' : IDL.Nat32,
    'psbt_hex' : IDL.Text,
  });
  const Result = IDL.Variant({ 'Ok' : IDL.Text, 'Err' : IDL.Text });
  const Result_1 = IDL.Variant({ 'Ok' : IDL.Null, 'Err' : IDL.Text });
  const Account = IDL.Record({
    'reward_from_referral_in_current_block' : IDL.Float64,
    'minted_rune_in_current_block' : IDL.Float64,
    'withdraw_txid' : IDL.Opt(IDL.Text),
    'price_in_current_block' : IDL.Float64,
    'total_paid_sats' : IDL.Nat64,
    'total_reward_from_referral' : IDL.Float64,
    'last_update_block' : IDL.Nat32,
    'total_minted_rune_amount' : IDL.Float64,
    'address' : IDL.Text,
    'sats_balance' : IDL.Nat64,
    'tune_in_current_block' : IDL.Nat8,
    'total_referral_reward' : IDL.Float64,
    'withdrawn' : IDL.Bool,
    'paid_sats_in_current_block' : IDL.Nat64,
    'total_avg_price' : IDL.Float64,
    'referral_reward_in_current_block' : IDL.Float64,
  });
  const BlockState = IDL.Record({
    'minted_rune_in_current_block' : IDL.Nat,
    'price_in_current_block' : IDL.Float64,
    'total_paid_sats' : IDL.Nat64,
    'auction_raised_amount_in_current_block' : IDL.Float64,
    'total_exchange_fee' : IDL.Float64,
    'total_minted_rune' : IDL.Nat,
    'total_auction_raised_amount' : IDL.Float64,
    'user_accounts' : IDL.Vec(IDL.Tuple(IDL.Text, Account)),
    'total_deposit_btc_balances' : IDL.Nat64,
    'total_referral_reward' : IDL.Float64,
    'avg_price' : IDL.Float64,
    'block_height' : IDL.Nat32,
    'paid_sats_in_current_block' : IDL.Nat64,
    'exchange_fee_in_current_block' : IDL.Float64,
    'referral_reward_in_current_block' : IDL.Float64,
  });
  const Config = IDL.Record({
    'minimum_extract_auction_income_percentage' : IDL.Nat8,
    'maximum_raising_target' : IDL.Nat64,
    'minimum_top_up_sats' : IDL.Nat64,
    'maximum_start_height_offset' : IDL.Nat32,
    'maximum_rune_amount' : IDL.Nat,
    'maximum_extract_auction_income_percentage' : IDL.Nat8,
    'exchange_fee_percentage' : IDL.Nat8,
    'finalize_threshold' : IDL.Nat32,
    'launch_span_options' : IDL.Vec(IDL.Nat32),
    'referral_bonus_percentage' : IDL.Nat8,
    'minimum_raising_target' : IDL.Nat64,
    'maximum_top_up_sats' : IDL.Nat64,
    'create_fee_sats' : IDL.Nat64,
    'minimum_rune_amount' : IDL.Nat,
    'minimum_start_height_offset' : IDL.Nat32,
    'minimum_launch_token_in_total_supply_percentage' : IDL.Nat8,
  });
  const CreateLaunchState = IDL.Record({
    'create_pool_fee' : IDL.Nat64,
    'min_start_block_height' : IDL.Nat32,
  });
  const ExchangeState = IDL.Record({
    'execute_distribute_failed_pools' : IDL.Vec(IDL.Text),
    'active_launch_pool_address_set' : IDL.Vec(IDL.Text),
    'uuid' : IDL.Nat64,
    'user_referral_codes' : IDL.Vec(IDL.Tuple(IDL.Text, IDL.Text)),
    'launching_rune' : IDL.Vec(IDL.Text),
    'is_task_running' : IDL.Bool,
    'rune_launch_seq' : IDL.Vec(IDL.Tuple(IDL.Text, IDL.Nat32)),
    'code_of_users' : IDL.Vec(IDL.Tuple(IDL.Text, IDL.Text)),
    'sync_block_height' : IDL.Nat32,
  });
  const HomePageBlockData = IDL.Record({
    'block_second_timestamp' : IDL.Nat64,
    'ongoing_launches_count' : IDL.Nat32,
    'total_release_rune_amount' : IDL.Nat,
  });
  const HomePageSatsmanData = IDL.Record({
    'total_btc_raised' : IDL.Nat64,
    'total_satsman_count' : IDL.Nat32,
  });
  const Filter = IDL.Variant({
    'Ongoing' : IDL.Null,
    'Completed' : IDL.Null,
    'Upcoming' : IDL.Null,
  });
  const Outcome = IDL.Variant({
    'Failed' : IDL.Null,
    'Listed' : IDL.Null,
    'Success' : IDL.Null,
  });
  const SocialInfo = IDL.Record({
    'twitter' : IDL.Opt(IDL.Text),
    'website' : IDL.Opt(IDL.Text),
    'discord' : IDL.Opt(IDL.Text),
    'telegram' : IDL.Opt(IDL.Text),
    'github' : IDL.Opt(IDL.Text),
  });
  const IncomeDistributionItem = IDL.Record({
    'label' : IDL.Text,
    'address' : IDL.Text,
    'percentage' : IDL.Nat8,
  });
  const LaunchPlan = IDL.Record({
    'start_height' : IDL.Nat32,
    'launch_token' : IDL.Text,
    'social_info' : SocialInfo,
    'rune_name' : IDL.Text,
    'banner' : IDL.Opt(IDL.Text),
    'description' : IDL.Opt(IDL.Text),
    'is_fair_launch' : IDL.Bool,
    'span_blocks' : IDL.Nat32,
    'raising_target_sats' : IDL.Nat64,
    'extract_auction_income_ratio' : IDL.Nat8,
    'rune_id' : IDL.Text,
    'income_distribution' : IDL.Vec(IncomeDistributionItem),
  });
  const PoolBusinessStateView = IDL.Record({
    'status' : Filter,
    'creator' : IDL.Text,
    'featured' : IDL.Bool,
    'start_height' : IDL.Nat32,
    'pool_name' : IDL.Text,
    'end_height' : IDL.Nat32,
    'income_distribution_list' : IDL.Vec(IDL.Tuple(IDL.Text, IDL.Nat64)),
    'pubkey' : IDL.Text,
    'btc_amount_for_lp' : IDL.Nat,
    'raising_target' : IDL.Nat64,
    'key_derivation_path' : IDL.Vec(IDL.Vec(IDL.Nat8)),
    'exchange_fee_percentage' : IDL.Nat8,
    'referral_bonus_percentage' : IDL.Nat8,
    'distribute_income_txid' : IDL.Opt(IDL.Text),
    'highest_block_states' : IDL.Opt(BlockState),
    'creator_withdraw_rune_txid' : IDL.Opt(IDL.Text),
    'total_claimed_rune' : IDL.Nat,
    'total_claimed_sats' : IDL.Nat64,
    'synced_block_height' : IDL.Nat32,
    'user_tunes' : IDL.Vec(IDL.Tuple(IDL.Text, IDL.Nat8)),
    'rune_amount_for_lp' : IDL.Nat,
    'rune_amount_for_launch' : IDL.Nat,
    'pool_address' : IDL.Text,
    'outcome' : Outcome,
    'launch_plan' : LaunchPlan,
    'rune_id' : IDL.Text,
  });
  const GetPoolInfoArgs = IDL.Record({ 'pool_address' : IDL.Text });
  const PoolInfo = IDL.Record({
    'key' : IDL.Text,
    'name' : IDL.Text,
    'btc_reserved' : IDL.Nat64,
    'key_derivation_path' : IDL.Vec(IDL.Vec(IDL.Nat8)),
    'coin_reserved' : IDL.Vec(CoinBalance),
    'attributes' : IDL.Text,
    'address' : IDL.Text,
    'nonce' : IDL.Nat64,
    'utxos' : IDL.Vec(Utxo),
  });
  const PoolBasic = IDL.Record({ 'name' : IDL.Text, 'address' : IDL.Text });
  const Event = IDL.Variant({
    'Withdraw' : IDL.Record({
      'user' : IDL.Text,
      'btc_amount' : IDL.Nat64,
      'rune_amount' : IDL.Nat,
      'pool_address' : IDL.Text,
    }),
    'CreatePool' : GetPoolInfoArgs,
    'DistributeIncome' : IDL.Record({
      'btc_amount' : IDL.Nat64,
      'rune_amount' : IDL.Nat,
      'pool_address' : IDL.Text,
    }),
    'WithdrawRune' : IDL.Record({
      'user' : IDL.Text,
      'rune_amount' : IDL.Nat,
      'pool_address' : IDL.Text,
    }),
    'TopUp' : IDL.Record({
      'user' : IDL.Text,
      'amount' : IDL.Nat64,
      'pool_address' : IDL.Text,
    }),
  });
  const LaunchpadState = IDL.Record({
    'user_balances' : IDL.Vec(IDL.Tuple(IDL.Text, IDL.Nat64)),
    'withdrawn_rune' : IDL.Bool,
    'txid' : IDL.Text,
    'utxo' : Utxo,
    'event' : Event,
    'nonce' : IDL.Nat64,
    'withdrawn_user_set' : IDL.Vec(IDL.Text),
  });
  const UserInfoOfLaunch = IDL.Record({
    'tune' : IDL.Nat8,
    'referral_reward' : IDL.Float64,
    'referral_list' : IDL.Vec(IDL.Text),
    'account' : IDL.Opt(Account),
    'balance_include_unconfirmed' : IDL.Nat64,
    'referral_address' : IDL.Opt(IDL.Text),
    'launch_pool_address' : IDL.Text,
  });
  const UserLaunchRecordPools = IDL.Record({
    'user_referral_pools' : IDL.Vec(PoolBusinessStateView),
    'user_created_pools' : IDL.Vec(PoolBusinessStateView),
    'user_joined_pools' : IDL.Vec(PoolBusinessStateView),
  });
  const NewBlockInfo = IDL.Record({
    'block_hash' : IDL.Text,
    'confirmed_txids' : IDL.Vec(IDL.Text),
    'block_timestamp' : IDL.Nat64,
    'block_height' : IDL.Nat32,
  });
  const ExchangeError = IDL.Variant({
    'RuneEntryNotFound' : IDL.Text,
    'PoolStateNotFound' : IDL.Text,
    'SetReferralCodeError' : IDL.Text,
    'PoolNotFound' : IDL.Text,
    'InvalidPageQuery' : IDL.Text,
    'UnexpectedPoolState' : IDL.Text,
    'CreatePoolFailed' : IDL.Tuple(IDL.Text, IDL.Text),
    'InvalidRuneName' : IDL.Tuple(IDL.Text, IDL.Text),
    'InvalidArgs' : IDL.Text,
    'PoolBusinessStateNotFound' : IDL.Text,
    'RuneNameExist' : IDL.Text,
    'InvalidLaunchPlan' : IDL.Text,
    'ExchangeStateNotInitialized' : IDL.Null,
    'CustomError' : IDL.Text,
  });
  const Result_2 = IDL.Variant({ 'Ok' : IDL.Text, 'Err' : ExchangeError });
  const Terms = IDL.Record({
    'cap' : IDL.Opt(IDL.Nat),
    'height' : IDL.Tuple(IDL.Opt(IDL.Nat64), IDL.Opt(IDL.Nat64)),
    'offset' : IDL.Tuple(IDL.Opt(IDL.Nat64), IDL.Opt(IDL.Nat64)),
    'amount' : IDL.Opt(IDL.Nat),
  });
  const RuneEntry = IDL.Record({
    'confirmations' : IDL.Nat32,
    'mints' : IDL.Nat,
    'terms' : IDL.Opt(Terms),
    'etching' : IDL.Text,
    'turbo' : IDL.Bool,
    'premine' : IDL.Nat,
    'divisibility' : IDL.Nat8,
    'spaced_rune' : IDL.Text,
    'number' : IDL.Nat64,
    'timestamp' : IDL.Nat64,
    'block' : IDL.Nat64,
    'burned' : IDL.Nat,
    'rune_id' : IDL.Text,
    'symbol' : IDL.Opt(IDL.Text),
  });
  const BlockAggregateData = IDL.Record({
    'total_paying_sats' : IDL.Nat64,
    'total_minted_rune' : IDL.Nat,
    'total_ongoing_launch_pools' : IDL.Nat32,
    'total_paying_users' : IDL.Nat32,
  });
  const SortBy = IDL.Variant({
    'TVL' : IDL.Null,
    'StartHeight' : IDL.Null,
    'UserCount' : IDL.Null,
    'EndHeight' : IDL.Null,
  });
  const SortOrder = IDL.Variant({ 'Asc' : IDL.Null, 'Desc' : IDL.Null });
  const OutcomeFilter = IDL.Variant({
    'NotFailed' : IDL.Null,
    'NotListed' : IDL.Null,
    'Failed' : IDL.Null,
    'Listed' : IDL.Null,
    'NotSuccess' : IDL.Null,
    'Success' : IDL.Null,
  });
  const PageQuery = IDL.Record({
    'sort_by' : IDL.Opt(SortBy),
    'featured_first' : IDL.Bool,
    'page_size' : IDL.Nat32,
    'status_filters' : IDL.Opt(Filter),
    'page' : IDL.Nat32,
    'sort_order' : IDL.Opt(SortOrder),
    'search_text' : IDL.Opt(IDL.Text),
    'outcome_filters' : IDL.Opt(OutcomeFilter),
  });
  const Page = IDL.Record({
    'page_size' : IDL.Nat32,
    'total' : IDL.Nat32,
    'page' : IDL.Nat32,
    'total_pages' : IDL.Nat32,
    'items' : IDL.Vec(PoolBusinessStateView),
    'has_next' : IDL.Bool,
    'has_prev' : IDL.Bool,
  });
  const RollbackTxArgs = IDL.Record({
    'txid' : IDL.Text,
    'reason_code' : IDL.Text,
  });
  const Result_3 = IDL.Variant({ 'Ok' : IDL.Null, 'Err' : ExchangeError });
  return IDL.Service({
    'execute_tx' : IDL.Func([ExecuteTxArgs], [Result], []),
    'feature_pool' : IDL.Func([IDL.Text], [Result_1], []),
    'generate_referral_code' : IDL.Func([IDL.Text], [IDL.Text], []),
    'get_block_state' : IDL.Func([IDL.Text], [IDL.Vec(BlockState)], ['query']),
    'get_config' : IDL.Func([], [Config], ['query']),
    'get_create_launch_info' : IDL.Func([], [CreateLaunchState], ['query']),
    'get_exchange_state' : IDL.Func([], [ExchangeState], ['query']),
    'get_home_page_block_aggregation_data' : IDL.Func(
        [IDL.Nat32, IDL.Nat32],
        [IDL.Vec(IDL.Tuple(IDL.Nat32, HomePageBlockData)), HomePageSatsmanData],
        [],
      ),
    'get_launch_pool' : IDL.Func(
        [IDL.Text],
        [IDL.Opt(PoolBusinessStateView)],
        ['query'],
      ),
    'get_launch_pool_block_states' : IDL.Func(
        [IDL.Text],
        [IDL.Vec(BlockState)],
        ['query'],
      ),
    'get_launch_pool_by_name' : IDL.Func(
        [IDL.Text],
        [IDL.Opt(PoolBusinessStateView)],
        ['query'],
      ),
    'get_launch_pools' : IDL.Func(
        [],
        [IDL.Vec(PoolBusinessStateView)],
        ['query'],
      ),
    'get_need_distribute_income_pools' : IDL.Func(
        [],
        [IDL.Vec(PoolBusinessStateView)],
        ['query'],
      ),
    'get_pool_address_by_name' : IDL.Func(
        [IDL.Text],
        [IDL.Opt(IDL.Text)],
        ['query'],
      ),
    'get_pool_info' : IDL.Func(
        [GetPoolInfoArgs],
        [IDL.Opt(PoolInfo)],
        ['query'],
      ),
    'get_pool_list' : IDL.Func([], [IDL.Vec(PoolBasic)], ['query']),
    'get_pool_with_state_and_key' : IDL.Func(
        [IDL.Text],
        [IDL.Opt(IDL.Tuple(LaunchpadState, IDL.Text))],
        ['query'],
      ),
    'get_user_info_of_launch' : IDL.Func(
        [IDL.Text, IDL.Text],
        [UserInfoOfLaunch],
        ['query'],
      ),
    'get_user_records' : IDL.Func([IDL.Text], [UserLaunchRecordPools], []),
    'get_user_withdrawable_coins' : IDL.Func(
        [IDL.Text, IDL.Text],
        [IDL.Vec(CoinBalance)],
        ['query'],
      ),
    'is_rune_id_in_launching' : IDL.Func([IDL.Text], [IDL.Bool], ['query']),
    'new_block' : IDL.Func([NewBlockInfo], [Result_1], []),
    'new_pool' : IDL.Func([IDL.Text], [Result_2], []),
    'query_all_rune_entries' : IDL.Func(
        [],
        [IDL.Vec(IDL.Tuple(IDL.Text, RuneEntry))],
        ['query'],
      ),
    'query_block_index_data' : IDL.Func(
        [IDL.Nat32, IDL.Nat32],
        [IDL.Vec(IDL.Tuple(IDL.Nat32, BlockAggregateData))],
        ['query'],
      ),
    'query_events' : IDL.Func([], [IDL.Vec(Event)], ['query']),
    'query_launch' : IDL.Func([PageQuery], [Page], []),
    'query_tx_event' : IDL.Func([IDL.Text], [IDL.Opt(Event)], ['query']),
    'reset_blocks' : IDL.Func([], [Result_1], []),
    'rollback_tx' : IDL.Func([RollbackTxArgs], [Result_1], []),
    'tune' : IDL.Func([IDL.Text, IDL.Text, IDL.Nat8], [Result_3], []),
  });
};
export const init = ({ IDL }) => { return []; };
