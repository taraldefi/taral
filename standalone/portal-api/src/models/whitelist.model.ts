import { Action } from "./action.model";
import { Whitelisted } from "./whitelisted.model";

export interface Whitelist {
    action: Action;
    "asset-contract": Action;
    type: Action;
    whitelisted: Whitelisted;
}