import { ClarinetAccounts } from "../configuration";
import { IMetadata } from "../providers";

export interface BaseRequest {
    accounts: ClarinetAccounts;
}

export type RequestType = 'readonly' | 'public';

export function getPrivateKey(request: BaseRequest): string {
    var deployer = request.accounts.deployer;

    return deployer.privateKey;
}

export function getAddress(request: BaseRequest): string {
    var deployer = request.accounts.deployer;

    return deployer.address;
}

export function getMetadata(type: RequestType, request: BaseRequest): IMetadata {
    if (type == 'public') {
        return {
            discriminator: 'metadata',
            sender: getAddress(request)
        };
    }

    return {
        discriminator: 'metadata',
        sender: getPrivateKey(request)
    };
}