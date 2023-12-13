export function fastForwardMonths(months: number) {
    const blocksPerMonth = 6 * 24 * 31; // 6 blocks per hour, 24 hours per day, 31 days per month
    const blocksToFastForward = months * blocksPerMonth;

    for (let i = 0; i < blocksToFastForward; i++) {
        simnet.mineEmptyBlock();
    }
}