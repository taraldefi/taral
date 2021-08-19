import { ClarinetAccounts, getClarinetAccounts } from "../clarity/lib";

class IWalletReplace {
    originalWallet: string;
    replaceWith: string;
}

const arkadikoDeployer: string = 'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM';

const arkadikoWallets: string[] = [
    'ST1QV6WVNED49CR34E58CRGA0V58X281FAS1TFBWF',
    'ST1SJ3DTE5DN7X54YDH5D64R3BCB6A2AG2ZQ8YPD5',
    'ST2CY5V39NHDPWSXMW9QDT3HC3GD6Q6XX4CFRK9AG',
    'STB2BWB0K5XZGS3FXVTG3TKS46CQVV66NAK3YVN8'
]

const enum Mode {
    Undefined,
    TaralWallets,
    ArkadikoWallets
}

function getWalletReplaceArray(mode: Mode, clarinetAccounts: ClarinetAccounts): IWalletReplace[] {
    
    let result: IWalletReplace[] = [];

    if (mode == Mode.ArkadikoWallets) {
        // We need to switch back from taral wallets
        //
        result.push({
            originalWallet: clarinetAccounts.deployer.address,
            replaceWith: arkadikoDeployer
        });

        for (let index = 0; index < arkadikoWallets.length; index++) {
            result.push({ 
               originalWallet: clarinetAccounts[index].address,
               replaceWith: arkadikoWallets[index] 
            });
        }

    } else {
        // We need to switch from arkadiko wallets to taral wallets
        //
        result.push({
            originalWallet: arkadikoDeployer,
            replaceWith: clarinetAccounts.deployer.address
        });

        
        for (let index = 0; index < arkadikoWallets.length; index++) {
            result.push({ 
               originalWallet: arkadikoWallets[index],
               replaceWith: clarinetAccounts[index].address 
            });
        }
    }

    return result;
}

async function processWallets() {
    var args = process.argv.slice(2);

    if (args.length != 1) {
        console.error('Expecting only one argument');
        return;
    }

    var modeArguments = args[0].split('=');

    if (modeArguments.length != 2) {
        console.error('Expecting arguments of form mode=taral|arkadiko');
        return;
    }

    const cwd = `${process.cwd()}/clarity/`;
    const clarinetAccounts = await getClarinetAccounts(cwd);

    var argument = modeArguments[1];

    let mode: Mode = Mode.Undefined;

    if (argument == 'taral') {
        console.log('Changing wallets to taral wallets');
        mode = Mode.TaralWallets;
    } else if (argument == 'arkadiko') {
        console.log('Changing wallets back to original arkadiko wallets');
        mode = Mode.ArkadikoWallets;
    } else {
        console.error('Only accepting taral|arkadiko as arguments');
        return;
    }

    var replaceArray = getWalletReplaceArray(mode, clarinetAccounts);
 
    // replace these values in the external arkadiko clarity contracts
    //
}

processWallets();