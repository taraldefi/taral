import dotenv from "dotenv";

dotenv.config({ path: "./.env" });

export const COINBASE_KEY: string = process.env.COINBASE_KEY as string;
export const COINBASE_SECRET: string = process.env.COINBASE_SECRET as string;
export const COINBASE_PASSPHRASE: string = process.env
    .COINBASE_PASSPHRASE as string;
export const INFURA_API_URL: string = process.env.INFURA_API_URL as string;

export const STACKS_API_URL: string = process.env.STACKS_API_URL as string;
export const MODE: string = process.env.MODE as string;

export const ORACLE_SK: string = process.env.ORACLE_SK as string;
export const ORACLE_PK: string = process.env.ORACLE_PK as string;
export const ORACLE_STX: string = process.env.ORACLE_STX as string;
export const CONTRACT_NAME: string = process.env.CONTRACT_NAME as string;
