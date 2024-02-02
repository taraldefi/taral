import { ParsedTransactionResult } from '@hirosystems/clarinet-sdk';
import { ClarityValue } from '@stacks/transactions';

interface WrappedCallPublicFnResult {
	parsedTransactionResult: ParsedTransactionResult;
	blockHeight: number; // Block height as a number
}

export function wrappedCallPublicFn(
	contract: string,
	method: string,
	args: ClarityValue[],
	sender: string,
): WrappedCallPublicFnResult {
	const parsedTransactionResult = simnet.callPublicFn(
		contract,
		method,
		args,
		sender,
	);
	const blockHeight = simnet.blockHeight;
	return { parsedTransactionResult, blockHeight };
}
