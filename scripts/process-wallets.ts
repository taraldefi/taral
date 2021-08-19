import { ClarinetAccounts, getClarinetAccounts } from "../clarity/lib";
import * as fileSystem from "fs";

interface IWalletReplace {
  originalWallet: string;
  replaceWith: string;
}

const arkadikoDeployer: string = "ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM";

const arkadikoWallets: string[] = [
  "ST1QV6WVNED49CR34E58CRGA0V58X281FAS1TFBWF",
  "ST1SJ3DTE5DN7X54YDH5D64R3BCB6A2AG2ZQ8YPD5",
  "ST2CY5V39NHDPWSXMW9QDT3HC3GD6Q6XX4CFRK9AG",
  "STB2BWB0K5XZGS3FXVTG3TKS46CQVV66NAK3YVN8",
  "ST2JHG361ZXG51QTKY2NQCVBPPRRE2KZB1HR05NNC"
];

const enum Mode {
  Undefined,
  TaralWallets,
  ArkadikoWallets,
}

export function getWalletReplaceArray(
  mode: Mode,
  clarinetAccounts: ClarinetAccounts
): IWalletReplace[] {
  let result: IWalletReplace[] = [];

  if (mode == Mode.ArkadikoWallets) {
    // We need to switch back from taral wallets
    //
    result.push({
      originalWallet: clarinetAccounts.deployer.address,
      replaceWith: arkadikoDeployer,
    });

    for (let index = 0; index < arkadikoWallets.length; index++) {
      result.push({
        originalWallet: clarinetAccounts[`wallet_${index + 1}`].address,
        replaceWith: arkadikoWallets[index],
      });
    }
  } else {
    // We need to switch from arkadiko wallets to taral wallets
    //
    result.push({
      originalWallet: arkadikoDeployer,
      replaceWith: clarinetAccounts.deployer.address,
    });

    for (let index = 0; index < arkadikoWallets.length; index++) {
      result.push({
        originalWallet: arkadikoWallets[index],
        replaceWith: clarinetAccounts[`wallet_${index + 1}`].address,
      });
    }
  }

  return result;
}

async function processWallets() {
  var args = process.argv.slice(2);

  if (args.length != 1) {
    console.error("Expecting only one argument");
    return;
  }

  var modeArguments = args[0].split("=");

  if (modeArguments.length != 2) {
    console.error("Expecting arguments of form mode=taral|arkadiko");
    return;
  }

  const cwd = `${process.cwd()}/clarity/`;
  const clarinetAccounts = await getClarinetAccounts(cwd);

  var argument = modeArguments[1];

  let mode: Mode = Mode.Undefined;

  if (argument == "taral") {
    console.log("Changing wallets to taral wallets");
    mode = Mode.TaralWallets;
  } else if (argument == "arkadiko") {
    console.log("Changing wallets back to original arkadiko wallets");
    mode = Mode.ArkadikoWallets;
  } else {
    console.error("Only accepting taral|arkadiko as arguments");
    return;
  }

  var replaceArray = getWalletReplaceArray(mode, clarinetAccounts);

  console.log(replaceArray);

  // replace these values in the external arkadiko clarity contracts
  //
  const testFolder = `${cwd}/contracts/external/arkadiko`;
  fileSystem.readdirSync(testFolder).forEach((filename) => {
    console.log(`Processing file ${filename}`);

    var file = `${testFolder}/${filename}`;
    fileSystem.readFile(file, "utf8", function (err, data) {
      if (err) {
        return console.log(err);
      }

      let result = data;

      for (let index = 0; index < replaceArray.length; index++) {
        var regexExpression = new RegExp(
          replaceArray[index].originalWallet,
          "g"
        );
        result = result.replace(
          regexExpression,
          replaceArray[index].replaceWith
        );
      }

      fileSystem.writeFile(file, result, "utf8", function (err) {
        if (err) return console.log(err);
      });
    });
  });
}

processWallets();
