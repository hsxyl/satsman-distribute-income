import * as bitcoin from "bitcoinjs-lib";
import { Utxo } from "../canister/satsman/service.did.js";
import { Utxo as ReeUtxo } from "@omnity/ree-client-ts-sdk";


export function hexToBytes(hex: string) {
  const cleanHex = hex.replace(/^0x/, "").replace(/\s/g, "");
  if (cleanHex.length % 2 !== 0) {
    throw new Error(`Invalid hex string length: ${cleanHex.length}`);
  }
  const bytes = new Uint8Array(cleanHex.length / 2);
  for (let i = 0; i < bytes.length; i++) {
    const byte = parseInt(cleanHex.substr(i * 2, 2), 16);
    if (isNaN(byte)) {
      throw new Error(`Invalid hex string at position ${i * 2}`);
    }
    bytes[i] = byte;
  }
  return bytes;
}

export function bytesToHex(bytes: Uint8Array) {
  const hexes = Array.from({ length: 256 }, (_, i) =>
    i.toString(16).padStart(2, "0")
  );
  let hex = "";
  for (const byte of bytes) {
		hex += hexes[byte]
	}
  return hex;
}


export function getP2trAressAndScript(pubkey: string, network: bitcoin.Network) {
  const { address, output } = bitcoin.payments.p2tr({
    internalPubkey: hexToBytes(pubkey),
    network: network,
  });

  return { address, output: output ? bytesToHex(output) : "" };
}

export function convertUtxo(utxo: Utxo, untweaked_key: string, network: bitcoin.Network ): ReeUtxo {
  const { address: poolAddress, output } = getP2trAressAndScript(untweaked_key, network);
  return {
    txid: utxo.txid,
    vout: utxo.vout,
    satoshis: utxo.sats.toString(),
    scriptPk: output,
    address: poolAddress!,
    runes: utxo.coins
		.filter(e=>e.id!=="0:0")
		.map(rune => ({
			id: rune.id,
			amount: rune.value.toString()
		}))
  }
}
