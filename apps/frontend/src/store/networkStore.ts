import {
  //CoreNodeInfoResponse,
  ServerStatusResponse,
} from "@stacks/stacks-blockchain-api-types";
import { atom } from "jotai";
import { atomFamily, atomWithStorage } from "jotai/utils";
import { StacksMainnet } from "micro-stacks/network";
import {
  DEFAULT_NETWORK_LIST,
  DEFAULT_NETWORK_INDEX,
} from "@utils/lib/constants";
import { atomsWithQuery } from "@utils/lib/atomWithQuery";

export interface Network {
  name: string;
  label: string;
  chain: string;
  url: string;
}

export enum NetworkModes {
  Testnet = "testnet",
  Mainnet = "mainnet",
}

export type NetworkMode = NetworkModes.Mainnet | NetworkModes.Testnet | null;

export const networkModeState = atom<NetworkMode>(NetworkModes.Mainnet);

export const customNetworksAtom = atomWithStorage(
  "customNetworks",
  <Network[]>[]
);

export const networksAtom = atom<Network[]>((get) => {
  const customItems = get(customNetworksAtom);
  return [...DEFAULT_NETWORK_LIST, ...customItems];
});

export const currentNetworkIndexAtom = atomWithStorage(
  "currentNetworkIndex",
  DEFAULT_NETWORK_INDEX
);

export const currentNetworkAtom = atom<Network>((get) => {
  const networks = get(networksAtom);
  const index = get(currentNetworkIndexAtom);
  return networks[index];
});

export const currentStacksNetworkAtom = atomWithStorage(
  "currentNetwork",
  new StacksMainnet()
);

export const anyNetworkStatusAtom = atomFamily(
  (networkName: string) =>
    atomsWithQuery((get) => ({
      queryKey: ["any-network-status", networkName],
      queryFn: async () => {
        const networks = get(networksAtom);
        const network = networks.find(function (net) {
          return net["name"] === networkName;
        }) || { url: "" };
        const networkUrl = network.url || "";
        try {
          const res = await fetch(networkUrl);
          return res.json();
        } catch (error) {
          console.log(error);
        }
        return {} as ServerStatusResponse;
      },
    }))[1]
);

export const anyNetworkIsLoadingFamily = atomFamily(() => atom(false));

export const currentNetworkIsSwitchingAtom = atom(false);
