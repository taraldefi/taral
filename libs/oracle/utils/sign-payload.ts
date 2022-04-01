import Web3 from "web3";
import { INFURA_API_URL } from "../config";
// Show web3 where it needs to look for the Ethereum node.
const web3 = new Web3(new Web3.providers.HttpProvider(INFURA_API_URL));

const EMPTY_BUFFER =
  "0000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000";

export function signPayload(msg: Buffer, secret_key: string) {
  // console.log("=====> signPayload", msg, secret_key)

  // signature is 96 bytes (check is either 1b or 1c, but on 32 bytes)
  const buffer = Buffer.from(EMPTY_BUFFER, "hex");

  const r_offset = 0;
  const s_offset = 32;
  const v_offset_src = 0;
  const v_offset_dest = 64;

  // console.log("signing", `0x${msg.toString('hex')}`, `0x${secret_key}`)

  const hash = web3.utils.keccak256(`0x${msg.toString("hex")}`);
  const signed = web3.eth.accounts.sign(hash, `0x${secret_key.slice(0, 64)}`); // remove compression byte

  const r_buffer = Buffer.from(signed.r.slice(2), "hex");
  const s_buffer = Buffer.from(signed.s.slice(2), "hex");
  const v_buffer = Buffer.from(signed.v.slice(2), "hex");

  const verification_byte = v_buffer.readInt8(v_offset_src);

  r_buffer.copy(buffer, r_offset);
  s_buffer.copy(buffer, s_offset);

  // adjust 32 bytes to stacks compatible signature with 0x1b => 0, 0x1c => 1
  if (verification_byte === 0x1b) {
    buffer.writeInt8(0x00, v_offset_dest);
  } else {
    buffer.writeInt8(0x01, v_offset_dest);
  }

  // console.log(signed)
  // console.log("signature", buffer.toString('hex'))
  return buffer;
}
