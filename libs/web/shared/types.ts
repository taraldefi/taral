import { StacksNetwork } from "@stacks/network";

export type AppDetails = {
    name: string;
    icon: string;
};

export interface WebConfig {
    network: StacksNetwork;
    appDetails: AppDetails;
}
