import { ClarityBitcoinContract } from "../../generated/taral";
import { BaseRequest } from "./base-request";

export interface ClarityBitcoinRequest extends BaseRequest {
    contract: ClarityBitcoinContract;
}