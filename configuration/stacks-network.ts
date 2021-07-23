import { StacksNetwork } from "@stacks/network";
import { ChainID, TransactionVersion } from "@stacks/transactions";

export class StacksNetworkConfiguration implements StacksNetwork {
  version = TransactionVersion.Testnet;
  chainId = ChainID.Testnet;
  bnsLookupUrl = "http://localhost:3999";
  broadcastEndpoint = "/v2/transactions";
  transferFeeEstimateEndpoint = "/v2/fees/transfer";
  accountEndpoint = "/v2/accounts";
  contractAbiEndpoint = "/v2/contracts/interface";
  readOnlyFunctionCallEndpoint = "/v2/contracts/call-read";
  private _coreApiUrl: string = "http://localhost:3999";

  get coreApiUrl() {
    return this._coreApiUrl;
  }
  set coreApiUrl(_url: string) {
    throw new Error(
      "Cannot modify property `coreApiUrl` after object initialization"
    );
  }

  isMainnet = () => this.version === TransactionVersion.Mainnet;
  getBroadcastApiUrl = () => `${this.coreApiUrl}${this.broadcastEndpoint}`;
  getTransferFeeEstimateApiUrl = () =>
    `${this.coreApiUrl}${this.transferFeeEstimateEndpoint}`;
  getAccountApiUrl = (address: string) =>
    `${this.coreApiUrl}${this.accountEndpoint}/${address}?proof=0`;
  getAbiApiUrl = (address: string, contract: string) =>
    `${this.coreApiUrl}${this.contractAbiEndpoint}/${address}/${contract}`;
  getReadOnlyFunctionCallApiUrl = (
    contractAddress: string,
    contractName: string,
    functionName: string
  ) =>
    `${this.coreApiUrl}${
      this.readOnlyFunctionCallEndpoint
    }/${contractAddress}/${contractName}/${encodeURIComponent(functionName)}`;
  getInfoUrl = () => `${this.coreApiUrl}/v2/info`;
  getBlockTimeInfoUrl = () =>
    `${this.coreApiUrl}/extended/v1/info/network_block_times`;
  getPoxInfoUrl = () => `${this.coreApiUrl}/v2/pox`;
  getRewardsUrl = (address: string, options?: any) => {
    let url = `${this.coreApiUrl}/extended/v1/burnchain/rewards/${address}`;
    if (options) {
      url = `${url}?limit=${options.limit}&offset=${options.offset}`;
    }
    return url;
  };
  getRewardsTotalUrl = (address: string) =>
    `${this.coreApiUrl}/extended/v1/burnchain/rewards/${address}/total`;
  getRewardHoldersUrl = (address: string, options?: any) => {
    let url = `${this.coreApiUrl}/extended/v1/burnchain/reward_slot_holders/${address}`;
    if (options) {
      url = `${url}?limit=${options.limit}&offset=${options.offset}`;
    }
    return url;
  };
  getStackerInfoUrl = (contractAddress: string, contractName: string) =>
    `${this.coreApiUrl}${this.readOnlyFunctionCallEndpoint}
      ${contractAddress}/${contractName}/get-stacker-info`;
  getNameInfo(fullyQualifiedName: string) {
    /*
        TODO: Update to v2 API URL for name lookups
      */
    const nameLookupURL = `${this.bnsLookupUrl}/v1/names/${fullyQualifiedName}`;
    return this.fetchPrivate(nameLookupURL)
      .then((resp) => {
        if (resp.status === 404) {
          throw new Error("Name not found");
        } else if (resp.status !== 200) {
          throw new Error(`Bad response status: ${resp.status}`);
        } else {
          return resp.json();
        }
      })
      .then((nameInfo) => {
        // the returned address _should_ be in the correct network ---
        //  blockstackd gets into trouble because it tries to coerce back to mainnet
        //  and the regtest transaction generation libraries want to use testnet addresses
        if (nameInfo.address) {
          return Object.assign({}, nameInfo, { address: nameInfo.address });
        } else {
          return nameInfo;
        }
      });
  }

  async fetchPrivate(
    input: RequestInfo,
    init?: RequestInit
  ): Promise<Response> {
    const defaultFetchOpts: RequestInit = {
      referrer: "no-referrer",
      referrerPolicy: "no-referrer",
    };
    const fetchOpts = Object.assign(defaultFetchOpts, init);
    const fetchResult = await fetch(input, fetchOpts);
    return fetchResult;
  }
}
