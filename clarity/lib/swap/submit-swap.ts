import { txOk } from "..";
import { FtSwapRequest, getAddress, getMetadata } from "./base-request";
import { HeaderPartsType, ProofCvType, TxPartsCvType } from "./types";

export interface SubmitSwapRequest extends FtSwapRequest {
    swapId: number;
    headerPartsCv: HeaderPartsType;
    txPartsCv: TxPartsCvType;
    proofCv: ProofCvType;
    ftContract: string;
}

export async function submitSwap(request: SubmitSwapRequest): Promise<boolean> {
    const result = await txOk(
        request.contract.submitSwap(
            request.swapId, 
            request.headerPartsCv, 
            request.txPartsCv, 
            request.proofCv, 
            request.ftContract, 
            getMetadata('public', request)
        ), 
        getAddress(request)
    );

    return result.value;
}
