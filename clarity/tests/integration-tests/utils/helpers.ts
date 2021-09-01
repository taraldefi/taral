import { StacksNetwork } from "@stacks/network";
import { TransactionVersion } from "@stacks/transactions";


export function stopwatch(): {
    /** Milliseconds since stopwatch was created. */
    getElapsed: () => number;
} {
    const start = process.hrtime();
    return {
        getElapsed: () => {
            const hrend = process.hrtime(start);
            return hrend[0] * 1000 + hrend[1] / 1000000;
        },
    };
}

export async function time<T>(
    fn: () => Promise<T>,
    onFinish: (elapsedMs: number) => void
): Promise<T> {
    const watch = stopwatch();
    try {
        return await fn();
    } finally {
        onFinish(watch.getElapsed());
    }
}


export function generateExplorerTxPageUrl(
    txid: string,
    network: StacksNetwork
): string {
    if (network.version === TransactionVersion.Testnet) {
        return `http://localhost:3000/txid/0x${txid}?chain=testnet`;
    } else {
        return `http://localhost:3000/txid/0x${txid}?chain=mainnet`;
    }
}