const EMPTY_BUFFER =
    "0000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000";

export function convertSig(sig: string) {
    const buffer = Buffer.from(EMPTY_BUFFER, "hex");
    const sig_buffer = Buffer.from(sig.slice(2), "hex");

    sig_buffer.copy(buffer, 0, 0, 64);

    const v_offset_dest = 64;
    const v_offset_src = 95;
    const verification_byte = sig_buffer.readInt8(v_offset_src);
    if (verification_byte === 0x1b) {
        buffer.writeInt8(0x00, v_offset_dest);
    } else {
        buffer.writeInt8(0x01, v_offset_dest);
    }
    return buffer;
}
