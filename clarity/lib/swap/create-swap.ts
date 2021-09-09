import { FtSwapRequest, getAddress, getMetadata } from "./base-request";
import { address } from 'bitcoinjs-lib';
import { txOk } from "..";

export interface BtcFtSwapRequest extends FtSwapRequest {
    txCV: Buffer;
    payer: string;
    receiver: string;
    btcAmount: number;
    ftAmount: number;
    ftContract: string;
}

function btcToSats(btcAmount: number): number {
    return btcAmount * 100_000_000;
}

export async function createBtcFtSwap(request: BtcFtSwapRequest): Promise<number> {
    const sats = btcToSats(request.btcAmount);

    const btcReceiver = address.toOutputScript(request.payer);

    let result = await txOk(
        request.contract.createSwap(sats, btcReceiver, request.ftAmount, request.receiver, request.ftContract, getMetadata('public', request)),
        getAddress(request)
    );

    return result.value;
}