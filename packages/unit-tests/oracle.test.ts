import { Logger, txErr, txOk } from "lib-shared";
import { clarinetAccounts, taralOracle } from "./jest-setup";
import { publicKeyFromPrivKey } from "lib-stacks";
import {
  retrieveOKCoinOracleFeed,
  retrieveBinanceFeed,
  retrieveOKCoinFeed,
  IOraclePriceFeed,
  addPrices,
  getPrice,
} from "lib-oracle";

const INFURA_API_URL =
  "https://mainnet.infura.io/v3/ad2e183a77d0483a8cb3cc31cb467496";

test("Oracle tests", async () => {
  const zoe = clarinetAccounts.deployer;
  const bob = clarinetAccounts["wallet_1"];

  const oracleZoe = taralOracle(zoe);
  const oracleBob = taralOracle(bob);

  const bobsPrivateKey = Buffer.from(
    publicKeyFromPrivKey(bob.privateKey).data.toString("hex"),
    "hex"
  );

  const zoesPrivateKey = Buffer.from(
    publicKeyFromPrivKey(zoe.privateKey).data.toString("hex"),
    "hex"
  );

  await txOk(oracleZoe.addSource("source1", zoesPrivateKey));
  await txOk(oracleZoe.revokeSource("source1"));
  let error = await txErr(oracleBob.addSource("source2", bobsPrivateKey));

  // (define-constant err-not-owner (err u63))
  expect(error.value).toEqual(63n);

  error = await txErr(oracleBob.revokeSource("source2"));

  // (define-constant err-not-owner (err u63))
  expect(error.value).toEqual(63n);

  const okcoin_oracle_feed = await retrieveOKCoinOracleFeed();

  const binance_feed = await retrieveBinanceFeed({
    infuraApiKey: INFURA_API_URL,
    oracleSecretKey: zoe.privateKey,
  });

  const okcoin_feed = await retrieveOKCoinFeed({
    infuraApiKey: INFURA_API_URL,
    oracleSecretKey: zoe.privateKey,
  });

  const feed: IOraclePriceFeed[] = okcoin_oracle_feed.concat(
    binance_feed.concat(okcoin_feed)
  );

  const priceAddResult = await addPrices({
    contract: oracleZoe,
    priceFeed: feed,
  });

  expect(priceAddResult).toBe(true);

  const okCoinBTC = await getPrice({
    contract: oracleZoe,
    source: "okcoin",
    symbol: "BTC",
  });

  expect(okCoinBTC).toBeTruthy();

  Logger.debug("ORACLE", "OKCOIN.BTC", okCoinBTC);
}, 3000000);
