import { Actor, HttpAgent } from "@dfinity/agent";
import { idlFactory, _SERVICE as RichSwapService } from "./service.did.js";
import { ICP_HOST } from "../../index.js";

const RICHSWAP_CANISTER_ID = "h43eb-lqaaa-aaaao-qjxgq-cai"
const RICHSWAP_EXCHANGE_ID = "RICH_SWAP"

export const swapActor = Actor.createActor<RichSwapService>(idlFactory, {
  agent: HttpAgent.createSync({
    host: ICP_HOST,
  }),
  canisterId: RICHSWAP_CANISTER_ID,
});