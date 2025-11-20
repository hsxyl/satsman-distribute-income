import { Actor, ActorSubclass, HttpAgent, Identity } from "@dfinity/agent";
import { idlFactory, Outcome, PoolStatus, _SERVICE as SatsmanService } from "./service.did.js";
import { ICP_HOST } from "../../index.js";

export const SATSMAN_CANISTER_ID = "ord5m-xaaaa-aaaao-qkg5a-cai"
export const SATSMAN_EXCHANGE_ID = "satsman"


export const satsmanActor = Actor.createActor<SatsmanService>(idlFactory, {
  agent: HttpAgent.createSync({
    host: ICP_HOST,
  }),
  canisterId: SATSMAN_CANISTER_ID,
});

export function satsmanActorWithIdentity(
  identity: Identity
): ActorSubclass<SatsmanService>{
  return Actor.createActor<SatsmanService>(idlFactory, {
    agent: HttpAgent.createSync({
      host: ICP_HOST,
      identity
    }),
    canisterId: SATSMAN_CANISTER_ID,
  })
}

export type PoolStatusStr = "Upcoming"  | "Ongoing" | "Completed"
export type PoolOutcomeStr = "Success" | "Failed" | "Listed"

export function pool_status_str(launch_status: PoolStatus): PoolStatusStr {
  let s = Object.entries(launch_status)[0]![0];
  if(["Upcoming" , "Ongoing" , "Completed"].includes(s)) {
    return s as PoolStatusStr;
  } else {
    throw new Error(`Invalid game status: ${s}`);
  }
}

export function pool_outcome_str(launch_status: Outcome): PoolOutcomeStr {
  let s = Object.entries(launch_status)[0]![0];
  if(["Success" , "Failed" , "Listed"].includes(s)) {
    return s as PoolOutcomeStr;
  } else {
    throw new Error(`Invalid game status: ${s}`);
  }
}

export function pool_status_number(launch_status: PoolStatus): number {
  let s = Object.entries(launch_status)[0]![0];
  let status_vec = ["Upcoming" , "Ongoing" , "Completed"];
  let idx = status_vec.indexOf(s);
  if(idx >= 0) {
    return idx;
  } else {
    throw new Error(`Invalid game status: ${s}`);
  }
}
