import { Transaction } from "bitcoinjs-lib";
import { Logger } from "..";

export function makeBuffer(value: any): Buffer {
    return Buffer.from(value, "hex");
}

export function numberToBuffer(value: number, size: number): Buffer {
    // increase size by 1 for "too large" numbers
    const buf = Buffer.alloc(size + 1);
    if (size === 4) {
        buf.writeIntLE(value, 0, size + 1);
    } else if (size === 8) {
        buf.writeUInt32LE(value, 0);
    } else {
        Logger.error(`NumberToBuffer - unsupported size ${size}`);
        // not supported
    }
    // remove the extra byte again
    return buf.slice(0, size);
}

// return something like this
// "0200000001fbfaf2992b0ec1c24b237c7c8a8e6dfee0d19d18544e76cfa3e6ae4d20d7e2650000000000fdffffff02d8290800000000001976a914dd2c7d66ea6df0629fc222929311d0eb7d9146b588ac42a14700000000001600142a551add041ec0ffd755b5a993afa7a11ca59b0b1a900a00"
// without witness
export function txForHash(tx: string) {
    const transaction = Transaction.fromHex(tx);
    return transaction.toBuffer(undefined, undefined).toString("hex");
}

export function reverse(src: Buffer): Buffer {
    var buffer = Buffer.allocUnsafe(src.length);

    for (var i = 0, j = src.length - 1; i <= j; ++i, --j) {
        buffer[i] = src[j];
        buffer[j] = src[i];
    }

    return buffer;
}
