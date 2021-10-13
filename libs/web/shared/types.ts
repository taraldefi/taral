import { StacksNetworkConfiguration } from "taral-configuration";

export type AppDetails = {
  name: string;
  icon: string;
};

export interface WebConfig {
  network: StacksNetworkConfiguration;
  appDetails: AppDetails;
}
