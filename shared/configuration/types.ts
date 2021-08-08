export interface ClarinetConfigAccount {
  mnemonic: string;
  balance: bigint;
}

export interface ClarinetDevConfig {
  network: {
    name: string;
  };
  accounts: {
    deployer: ClarinetConfigAccount;
    [key: string]: ClarinetConfigAccount;
  };
}

export interface ClarinetConfig {
  contracts: {
    [name: string]: {
      path: string;
      dependsOn: string[];
    };
  };
}

export interface ClarinetAccount extends ClarinetConfigAccount {
  address: string;
}

export interface ClarinetAccounts {
  deployer: ClarinetAccount;
  [name: string]: ClarinetAccount;
}

export interface ConfigContract {
  address: string;
  file: string;
}
