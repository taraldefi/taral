export const getExplorerLink = (txId: string) => {
  return process.env.NODE_ENV !== "production"
    ? `http://localhost:8000/txid/${txId}?chain=testnet`
    : `https://explorer.stacks.co/txid/${txId}?chain=mainnet`;
};

export const ustxToStx = (uStx: string) => {
  return (parseInt(uStx) / 1000000).toLocaleString("en-US");
};

export const tokenToNumber = (amount: number, decimals: number) => {
  const convertWithDecimals = 10 ** decimals;
  return amount / convertWithDecimals;
};

export function truncateUuid(
  uuidStr: string,
  startLength: number,
  endLength: number,
  ellipsis: string = "..."
): string {
  if (
    typeof uuidStr !== "string" ||
    typeof startLength !== "number" ||
    typeof endLength !== "number" ||
    startLength < 0 ||
    endLength < 0
  ) {
    throw new Error("Invalid input");
  }

  const truncatedUuid =
    uuidStr.slice(0, startLength) + ellipsis + uuidStr.slice(-endLength);
  return truncatedUuid;
}
