
import { describe } from "vitest";

/**
 * A factory function that returns either describe or describe.skip 
 * based on a condition.
 * @param shouldRun - A boolean determining whether to run the suite.
 * @returns - The describe or describe.skip function.
 */
export function describeConditional(shouldRun: boolean) {
    return shouldRun ? describe : describe.skip;
}