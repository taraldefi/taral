import { StacksNetworkConfiguration } from "taral-configuration";

export type AppDetails = {
  name: string;
  icon: string;
};

export interface WebConfig {
  stxAddress: string;
  network: StacksNetworkConfiguration;
  appDetails: AppDetails;
}

