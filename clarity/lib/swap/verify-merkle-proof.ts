import { Logger } from "../logger";
import { ClarityBitcoinRequest, getMetadata } from "./base-request";
import MerkleTree from 'merkletreejs';
import { HeaderPartsType, ProofCvType } from "./types";
import { getReversedTxId } from "./get-txid";
import { makeBuffer, reverse } from "./utils";


export interface VerifyMerkleProofRequest extends ClarityBitcoinRequest {
    txId: string;
    merkleRoot: string;
    proofCV: ProofCvType;
}

export interface VerifyMerkleProof2Request extends ClarityBitcoinRequest {
    txCV: Buffer;
    headerPartsCV: HeaderPartsType;
    proofCV: ProofCvType;
}

export async function verifyMerkleProof(request: VerifyMerkleProofRequest): Promise<string> {
    // Call readonly function
    //

    const bufferedTxId = reverse(MerkleTree.bufferify(request.txId));
    const bufferedMerkleRoot = reverse(MerkleTree.bufferify(request.merkleRoot));

    let response = await request.contract.verifyMerkleProof(bufferedTxId, bufferedMerkleRoot, request.proofCV, getMetadata('readonly', request));
    let result = response.toString();

    Logger.debug(`verify-merkle-proof result: ${JSON.stringify(result)}, ${result}`);

    return result;
}

export async function verifyMerkleProof2(request: VerifyMerkleProof2Request): Promise<string> {
    // Call readonly function
    //

    const reversedTxId = await getReversedTxId({
        accounts: request.accounts,
        contract: request.contract,
        txCv: request.txCV
    });

    const reversedTxIdBuffer = makeBuffer(reversedTxId);
    const merkleRootBuffer = request.headerPartsCV['merkle-root'];

    let response = await request.contract.verifyMerkleProof(reversedTxIdBuffer, merkleRootBuffer, request.proofCV, getMetadata('readonly', request));
    let result = response.toString();

    Logger.debug(`verify-merkle-proof2 result: ${JSON.stringify(result)}, ${result}`);

    return result;
}

