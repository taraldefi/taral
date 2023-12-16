import { expect } from "vitest";
import { MICRO_MULTIPLIER } from "./currency";

const accounts = simnet.getAccounts();
const DEPLOYER = accounts.get("deployer")!;

/*
     * Helper function to assert that a transfer event is a USDa transfer 
    */
export function expectSUSDTTransfer(transferEvent: any, sender: string, recipient: string, amount: any) {

    let senderAddress = sender;
    if (sender === DEPLOYER) {
        senderAddress = `${sender}.taral-bank`;
    }

    let recipientAddress = recipient;
    if (recipient === DEPLOYER) {
        recipientAddress = `${recipient}.taral-bank`;
    }


    expect(transferEvent.asset_identifier).toStrictEqual(
        `${DEPLOYER}.token-susdt::bridged-usdt`,
    );

    expect(transferEvent.sender).toStrictEqual(senderAddress);
    expect(transferEvent.recipient).toStrictEqual(recipientAddress);
    expect(transferEvent.amount).toStrictEqual(`${amount * MICRO_MULTIPLIER}`);
}