export const getExplorerLink = (txId: string) => {
  return process.env.NODE_ENV !== "production"
    ? `http://localhost:8000/txid/${txId}?chain=testnet`
    : `https://explorer.stacks.co/txid/${txId}?chain=mainnet`;
};
