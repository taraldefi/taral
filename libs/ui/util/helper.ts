export function truncateUuid(
	uuidStr: string,
	startLength: number,
	endLength: number,
	ellipsis: string = '...',
): string {
	if (
		typeof uuidStr !== 'string' ||
		typeof startLength !== 'number' ||
		typeof endLength !== 'number' ||
		startLength < 0 ||
		endLength < 0
	) {
		throw new Error('Invalid input');
	}

	const truncatedUuid =
		uuidStr.slice(0, startLength) + ellipsis + uuidStr.slice(-endLength);
	return truncatedUuid;
}
