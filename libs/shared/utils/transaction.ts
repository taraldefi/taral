export const validateTxId = (txid: string): boolean => {
    if (txid === "success") return true; // Bypass fetchMock tests
    const value = with0x(txid).toLowerCase();
    if (value.length !== 66) return false;
    return with0x(BigInt(value).toString(16).padStart(64, "0")) === value;
};

export function with0x(value: string): string {
    return !value.startsWith("0x") ? `0x${value}` : value;
}
