import {
  Intention,
  ReeClient,
  Network as ReeNetwork,
  type Config,
} from "@omnity/ree-client-ts-sdk";
import {
  idlFactory,
  PoolBusinessStateView,
  Utxo,
} from "./canister/satsman/service.did.js";
import ECPairFactory from "ecpair";
import * as tinysecp from "tiny-secp256k1";
import * as bitcoin from "bitcoinjs-lib";
import { satsmanActor } from "./canister/satsman/actor";
import { Utxo as ReeUtxo } from "@omnity/ree-client-ts-sdk";
import { swapActor } from "./canister/rich-swap/actor.js";
import { convertUtxo } from "./utils/common.js";
import { sign } from "crypto";
import { signAndFinalizePsbt } from "./utils/signer.js";

const ECPair = ECPairFactory(tinysecp);
bitcoin.initEccLib(tinysecp);

export const TESTNET_SATSMAN_EXCHANGE_ID = "satsman";
export const TESTNET_SATSMAN_CANISTER_ID = "ord5m-xaaaa-aaaao-qkg5a-cai";
export const ICP_HOST = "https://icp-api.io";

type DistributeIncomeContext = {
  network: bitcoin.Network;
  reeNetwork: ReeNetwork;
  maestroApiKey: string;
  satsmanCanisterId: string;
  satsmanExchangeId: string;
  orchestratorCanisterId: string;
  richswapCanisterId: string;
  richswapExchangeId: string;
  wif: string;
};

// const config: Config = {
//   network: ReeNetwork.Testnet, // or ReeNetwork.Mainnet
//   maestroApiKey: "your-maestro-api-key",
//   exchangeIdlFactory: idlFactory,
//   exchangeCanisterId: "your-exchange-canister-id",
//   exchangeId: "your-exchange-id",
// };

console.log(process.env.PORT);

async function main() {
  const wif = process.env.BTC_WIF_KEY_TESTNET;
  if (!wif) {
    throw new Error("BTC_WIF_KEY_TESTNET environment variable is not set");
  }

  satsman_distribute_job({
    network: bitcoin.networks.testnet,
    reeNetwork: ReeNetwork.Testnet,
    maestroApiKey: "f3nf6OqNEoWy7PtdtXqzP0SWyJZxtWYf",
    satsmanCanisterId: "ord5m-xaaaa-aaaao-qkg5a-cai",
    satsmanExchangeId: "satsman",
    orchestratorCanisterId:
      process.env.ORCHESTRATOR_CANISTER_ID_TESTNET ||
      "orchestrator-canister-id",
    richswapCanisterId: "h43eb-lqaaa-aaaao-qjxgq-cai",
    richswapExchangeId: "RICH_SWAP", 
    wif: wif,
  });
}

async function satsman_distribute_job(context: DistributeIncomeContext) {

  const pbs_list = await satsmanActor.get_need_distribute_income_pools();
  console.log(`Found ${pbs_list.length} pools need distribute income.`);

  for (const pbs of pbs_list) {
    await distribute_income_for_pool(context, pbs);
  }
}

async function distribute_income_for_pool(
  context: DistributeIncomeContext,
  pool_business_state: PoolBusinessStateView
) {
  const config: Config = {
    network: context.reeNetwork,
    maestroApiKey: context.maestroApiKey,
    exchangeIdlFactory: idlFactory,
    exchangeCanisterId: context.satsmanCanisterId,
    exchangeId: context.satsmanExchangeId,
  };

  const wif = context.wif;

  const keyPair = ECPair.fromWIF(wif, context.network);

  const xOnlyPubkey = keyPair.publicKey.subarray(1, 33);
  const payment = bitcoin.payments.p2tr({
    internalPubkey: xOnlyPubkey,
    network: context.network,
  });

  let pool_state_res = await satsmanActor.get_pool_with_state_and_key(
    pool_business_state.pool_address!
  );

  let pool_state = pool_state_res[0]![0]!;
  let key = pool_state_res[0]![1]!;
  let richswap_pool_info = await swapActor
    .query_pool(pool_business_state.rune_id)
    .then((res) => {
      if ("Ok" in res) {
        return res.Ok;
      } else {
        throw new Error(res.Err ? Object.keys(res.Err)[0] : "Unknown Error");
      }
    });
  let liquidityOffer = await swapActor
    .pre_add_liquidity(richswap_pool_info!.address, {
      id: pool_business_state.rune_id,
      value: pool_business_state.rune_amount_for_lp, //rune_amount_for_lp[0]!,
    })
    .then((res) => {
      if ("Ok" in res) {
        return res.Ok;
      } else {
        throw new Error(res.Err ? Object.keys(res.Err)[0] : "Unknown Error");
      }
    });

  let client = new ReeClient(config);

  const tx = await client.createTransaction({
    address: payment.address!,
    paymentAddress: payment.address!,
  });

  let intentiont1: Intention = {
    exchangeId: context.satsmanExchangeId,
    poolAddress: pool_business_state.pool_address!,
    poolUtxos: [convertUtxo(pool_state.utxo, key, context.network)],
    action: "distribute_income",
    inputCoins: [],
    outputCoins: [
      {
        to: richswap_pool_info!.address,
        coin: {
          id: "0:0",
          value: pool_business_state.btc_amount_for_lp,
        },
      },
      {
        to: richswap_pool_info!.address,
        coin: {
          id: pool_business_state.rune_id,
          value: pool_business_state.rune_amount_for_lp,
        },
      },

      ...pool_business_state.income_distribution_list.map((e) => {
        return {
          to: e[0],
          coin: {
            id: "0:0",
            value: e[1],
          },
        };
      }),
    ],
    nonce: pool_state.nonce + BigInt(1),
  };
  tx.addIntention(intentiont1);

  let intention2 = {
    exchangeId: context.richswapExchangeId,
    poolAddress: richswap_pool_info!.address,
    poolUtxos: [],
    action: "add_liquidity",
    inputCoins: [
      {
        from: pool_business_state.pool_address!,
        coin: {
          id: "0:0",
          value: pool_business_state.btc_amount_for_lp,
        },
      },
      {
        from: pool_business_state.pool_address!,
        coin: {
          id: pool_business_state.rune_id,
          value: pool_business_state.rune_amount_for_lp,
        },
      },
    ],
    outputCoins: [],
    nonce: liquidityOffer.nonce,
  };

  // execute add_liquidity on swap canister
  tx.addIntention(intention2);

  const { psbt } = await tx.build();

  const {txId, txHex  } = signAndFinalizePsbt(psbt.toBase64(), wif);

  const txid = await tx.send(txHex);

  console.log(`Distributed income for pool ${pool_business_state.pool_address}, txid: ${txid}`);

}



main().catch((error) => {
  console.error("Unhandled error in main:", error);
});
