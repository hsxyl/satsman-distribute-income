import * as bitcoin from 'bitcoinjs-lib';
import { ECPairFactory, ECPairInterface } from 'ecpair';
import * as tinysecp from 'tiny-secp256k1';

// 全局初始化 ECC
const ECPair = ECPairFactory(tinysecp);
try {
    bitcoin.initEccLib(tinysecp);
} catch (e) {}

const toXOnly = (pubKey: Buffer) => (pubKey.length === 32 ? pubKey : pubKey.subarray(1, 33));

export interface SignResult {
    txId: string;
    txHex: string;
}

export function signAndFinalizePsbt(psbtBase64: string, wif: string): SignResult {
    if (!wif) throw new Error("WIF key is empty");
    
    const network = (wif.startsWith('c') || wif.startsWith('9')) 
        ? bitcoin.networks.testnet 
        : bitcoin.networks.bitcoin;

    const keyPair = ECPair.fromWIF(wif, network);

    let psbt: bitcoin.Psbt;
    try {
        psbt = bitcoin.Psbt.fromBase64(psbtBase64, { network });
    } catch (e) {
        throw new Error("Invalid PSBT Base64 string");
    }

    // 预计算脚本 (Output Script)
    const xOnlyPubkey = toXOnly(keyPair.publicKey);
    const p2trPayment = bitcoin.payments.p2tr({ internalPubkey: xOnlyPubkey, network });
    const p2wpkhPayment = bitcoin.payments.p2wpkh({ pubkey: keyPair.publicKey, network });

    let signedCount = 0;

    psbt.data.inputs.forEach((input, index) => {
        const witnessUtxo = input.witnessUtxo;
        if (!witnessUtxo) return;
        
        // ============================================================
        // 【修复点】将 Uint8Array 转为 Buffer 以使用 .equals()
        // ============================================================
        const scriptBuf = Buffer.from(witnessUtxo.script);

        // A. 判断是否是 P2TR (Taproot)
        // 同样需要把 p2trPayment.output 转为 Buffer 再比较
        if (p2trPayment.output && scriptBuf.equals(Buffer.from(p2trPayment.output))) {
            const tapInternalKey = toXOnly(keyPair.publicKey);
            const tapTweakHash = bitcoin.crypto.taggedHash('TapTweak', tapInternalKey);
            const tweakedKeyPair = keyPair.tweak(tapTweakHash);
            
            psbt.signInput(index, tweakedKeyPair);
            signedCount++;
        } 
        // B. 判断是否是 P2WPKH (SegWit)
        else if (p2wpkhPayment.output && scriptBuf.equals(Buffer.from(p2wpkhPayment.output))) {
            psbt.signInput(index, keyPair);
            signedCount++;
        }
    });

    if (signedCount === 0) {
        throw new Error("No inputs matched the provided private key");
    }

    psbt.finalizeAllInputs();
    const tx = psbt.extractTransaction();
    
    return {
        txId: tx.getId(),
        txHex: tx.toHex()
    };
}