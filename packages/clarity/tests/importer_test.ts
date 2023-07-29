// deno-lint-ignore-file no-explicit-any
// @ts-ignore Suppressing "The import path cannot end with a '.ts' extension"
import { Clarinet } from "../src/dependencies.ts";
// @ts-ignore Suppressing "The import path cannot end with a '.ts' extension"
import { Tx } from "../src/dependencies.ts";
// @ts-ignore Suppressing "The import path cannot end with a '.ts' extension"
import { Chain } from "../src/dependencies.ts";
// @ts-ignore Suppressing "The import path cannot end with a '.ts' extension"
import { Account } from "../src/dependencies.ts";
// @ts-ignore Suppressing "The import path cannot end with a '.ts' extension"
import { types } from "../src/dependencies.ts";
// @ts-ignore Suppressing "The import path cannot end with a '.ts' extension"
import { assertEquals } from "../src/dependencies.ts";

Clarinet.test({
  name: "Ensure that inputs are valid",
  async fn(chain: Chain, accounts: Map<string, Account>) {
    //arrange
    let deployer = accounts.get("deployer")!;
    let importer_wallet = "ST1SJ3DTE5DN7X54YDH5D64R3BCB6A2AG2ZQ8YPD5";
    let importer_name = "ALPS Logistics";
    let importer_category = "";

    //act
    let block = chain.mineBlock([
      Tx.contractCall(
        "taral-importer",
        "register",
        [
          types.principal(importer_wallet),
          types.utf8(importer_name),
          types.utf8(importer_category),
        ],
        deployer.address
      ),
    ]);
    let [receipt] = block.receipts;

    // Assert
    receipt.result.expectErr().expectUint(100); // ERR-GENERIC
  },
});

Clarinet.test({
  name: "Ensure that importer can register only once with unique wallet id",
  async fn(chain: Chain, accounts: Map<string, Account>) {
    //arrange
    let deployer = accounts.get("deployer")!;
    let importer_wallet = "ST1SJ3DTE5DN7X54YDH5D64R3BCB6A2AG2ZQ8YPD5";
    let importer_name = "ALPS Logistics";
    let importer_category = "Merchant";

    // act
    chain.mineBlock([
      Tx.contractCall(
        "taral-importer",
        "register",
        [
          types.principal(importer_wallet),
          types.utf8(importer_name),
          types.utf8(importer_category),
        ],
        deployer.address
      ),
    ]);
    let block = chain.mineBlock([
      Tx.contractCall(
        "taral-importer",
        "register",
        [
          types.principal(importer_wallet),
          types.utf8(importer_name),
          types.utf8(importer_category),
        ],
        deployer.address
      ),
    ]);
    let [receipt] = block.receipts;

    // Assert
    receipt.result.expectErr().expectUint(102); // ERR-IMPORTER-ALREADY-REGISTERED
  },
});

Clarinet.test({
  name: "Ensure that importer registration is a success",
  async fn(chain: Chain, accounts: Map<string, Account>) {
    //arrange
    let deployer = accounts.get("deployer")!;
    let importer_wallet = "ST1SJ3DTE5DN7X54YDH5D64R3BCB6A2AG2ZQ8YPD5";
    let importer_name = "ALPS Logistics";
    let importer_category = "Merchant";

    //act
    let block = chain.mineBlock([
      Tx.contractCall(
        "taral-importer",
        "register",
        [
          types.principal(importer_wallet),
          types.utf8(importer_name),
          types.utf8(importer_category),
        ],
        deployer.address
      ),
    ]);
    let [receipt] = block.receipts;

    // Assert
    receipt.result.expectOk().expectBool(true);
  },
});

Clarinet.test({
  name: "Ensure that importer exists after registration",
  async fn(chain: Chain, accounts: Map<string, Account>) {
    //arrange
    let deployer = accounts.get("deployer")!;
    let importer_wallet = "ST1SJ3DTE5DN7X54YDH5D64R3BCB6A2AG2ZQ8YPD5";
    let importer_name = "ALPS Logistics";
    let importer_category = "Merchant";

    chain.mineBlock([
      Tx.contractCall(
        "taral-importer",
        "register",
        [
          types.principal(importer_wallet),
          types.utf8(importer_name),
          types.utf8(importer_category),
        ],
        deployer.address
      ),
    ]);

    //act
    let receipt = chain.callReadOnlyFn(
      "taral-importer",
      "get-importer-profile",
      [types.principal(importer_wallet)],
      deployer.address
    );

    // Assert
    receipt.result.expectSome();
  },
});

Clarinet.test({
  name: "Ensure that next importer id available",
  async fn(chain: Chain, accounts: Map<string, Account>) {
    //arrange
    let deployer = accounts.get("deployer")!;
    let importer_wallet = "ST1SJ3DTE5DN7X54YDH5D64R3BCB6A2AG2ZQ8YPD5";
    let importer_name = "ALPS Logistics";
    let importer_category = "Merchant";

    chain.mineBlock([
      Tx.contractCall(
        "taral-importer",
        "register",
        [
          types.principal(importer_wallet),
          types.utf8(importer_name),
          types.utf8(importer_category),
        ],
        deployer.address
      ),
    ]);

    //act
    let receipt = chain.callReadOnlyFn(
      "taral-importer",
      "get-next-importer-id",
      [],
      deployer.address
    );

    // Assert
    receipt.result.expectUint(10002);
  },
});

Clarinet.test({
  name: "Ensure that to get importers profile",
  async fn(chain: Chain, accounts: Map<string, Account>) {
    //arrange
    let deployer = accounts.get("deployer")!;
    let importer1_wallet = "ST1SJ3DTE5DN7X54YDH5D64R3BCB6A2AG2ZQ8YPD5";
    let importer1_name = "ALPS Logistics";
    let importer1_category = "Merchant";

    chain.mineBlock([
      Tx.contractCall(
        "taral-importer",
        "register",
        [
          types.principal(importer1_wallet),
          types.utf8(importer1_name),
          types.utf8(importer1_category),
        ],
        deployer.address
      ),
    ]);

    let importer2_wallet = "ST2CY5V39NHDPWSXMW9QDT3HC3GD6Q6XX4CFRK9AG";
    let importer2_name = "MX Roadways";
    let importer2_category = "PROJECT";

    chain.mineBlock([
      Tx.contractCall(
        "taral-importer",
        "register",
        [
          types.principal(importer2_wallet),
          types.utf8(importer2_name),
          types.utf8(importer2_category),
        ],
        deployer.address
      ),
    ]);
    let importer3_wallet = "ST2JHG361ZXG51QTKY2NQCVBPPRRE2KZB1HR05NNC";

    //act
    const importerList = types.list([
      types.principal(importer1_wallet),
      types.principal(importer2_wallet),
      types.principal(importer3_wallet),
    ]);

    let receipt = chain.callReadOnlyFn(
      "taral-importer",
      "get-importers",
      [importerList],
      deployer.address
    );

    // Assert
    let arrSome = receipt.result.matchAll(/some/gi); // RegExpMatchArray
    let arrSomeCount = 0;
    for (let arr of arrSome) {
      arrSomeCount += 1;
    }
    assertEquals(arrSomeCount, 2);

    let arrNone = receipt.result.matchAll(/none/gi);
    let arrNoneCount = 0;
    for (let arr of arrNone) {
      arrNoneCount += 1;
    }
    assertEquals(arrNoneCount, 1);
  },
});

Clarinet.test({
  name: "Ensure that order inputs are valid",
  async fn(chain: Chain, accounts: Map<string, Account>) {
    //arrange
    let deployer = accounts.get("deployer")!;
    let importer_wallet = "ST1SJ3DTE5DN7X54YDH5D64R3BCB6A2AG2ZQ8YPD5";
    let new_order_id = 2001;

    //act
    let block = chain.mineBlock([
      Tx.contractCall(
        "taral-importer",
        "append-order",
        [types.uint(new_order_id), types.principal(importer_wallet)],
        deployer.address
      ),
    ]);
    // console.log(block.receipts)
    let receipt = block.receipts[0];

    // Assert
    receipt.result.expectErr().expectUint(121); // ERR-IMPORTER-NOT-REGISTERED
  },
});

// Clarinet.test({
//   name: "Ensure that importer-order key is unique",
//   async fn(chain: Chain, accounts: Map<string, Account>) {

//     //arrange
//     let deployer = accounts.get('deployer')!;

//     let importer_wallet = 'ST1SJ3DTE5DN7X54YDH5D64R3BCB6A2AG2ZQ8YPD5'
//     let importer_name = "ALPS Logistics";
//     let importer_category = "Merchant";

//     let new_order_id = 2001;
//     let importer_wallet = 'ST1SJ3DTE5DN7X54YDH5D64R3BCB6A2AG2ZQ8YPD5'
//     let payment_term_code = "60 Days";

//     // act
//     chain.mineBlock([

//       Tx.contractCall(
//           'taral-importer',
//           'register',
//           [
//             types.principal(importer_wallet),
//             types.utf8(importer_name),
//             types.utf8(importer_category)
//           ],
//           deployer.address
//       )
//     ]);

//     let block = chain.mineBlock([

//       Tx.contractCall(
//         'taral-importer',
//         'append-order',
//         [
//           types.uint(new_order_id),
//           types.principal(importer_wallet),
//           types.principal(importer_wallet),
//           types.utf8(payment_term_code)
//         ],
//         deployer.address
//       ),

//       Tx.contractCall(
//         'taral-importer',
//         'append-order',
//         [
//           types.uint(new_order_id),
//           types.principal(importer_wallet),
//           types.principal(importer_wallet),
//           types.utf8(payment_term_code)
//         ],
//         deployer.address
//       )

//     ]);

//     console.log(block.receipts)
//     let receipt = block.receipts[1];
//     // Assert
//     receipt.result.expectErr().expectUint(3); // ERR-IMPORTER-ORDER-ALREADY-EXISTS
//   },
// });

Clarinet.test({
  name: "Ensure that adding order is a success",
  async fn(chain: Chain, accounts: Map<string, Account>) {
    //arrange
    let deployer = accounts.get("deployer")!;
    let importer_wallet = "ST1SJ3DTE5DN7X54YDH5D64R3BCB6A2AG2ZQ8YPD5";
    let importer_name = "ALPS Logistics";
    let importer_category = "Merchant";
    let new_order_id = 2001;

    //act
    let block = chain.mineBlock([
      Tx.contractCall(
        "taral-importer",
        "register",
        [
          types.principal(importer_wallet),
          types.utf8(importer_name),
          types.utf8(importer_category),
        ],
        deployer.address
      ),
      Tx.contractCall(
        "taral-importer",
        "append-order",
        [types.uint(new_order_id), types.principal(importer_wallet)],
        deployer.address
      ),
    ]);
    let receipt = block.receipts[1];

    // Assert
    receipt.result.expectOk().expectBool(true);
  },
});

Clarinet.test({
  name: "Ensure that order exists after registration",
  async fn(chain: Chain, accounts: Map<string, Account>) {
    //arrange
    let deployer = accounts.get("deployer")!;
    let importer_wallet = "ST1SJ3DTE5DN7X54YDH5D64R3BCB6A2AG2ZQ8YPD5";
    let importer_name = "ALPS Logistics";
    let importer_category = "Merchant";
    let new_order_id = 2001;

    chain.mineBlock([
      Tx.contractCall(
        "taral-importer",
        "register",
        [
          types.principal(importer_wallet),
          types.utf8(importer_name),
          types.utf8(importer_category),
        ],
        deployer.address
      ),
      Tx.contractCall(
        "taral-importer",
        "append-order",
        [types.uint(new_order_id), types.principal(importer_wallet)],
        deployer.address
      ),
    ]);

    //act
    let receipt = chain.callReadOnlyFn(
      "taral-importer",
      "get-importer-order",
      [types.uint(0), types.principal(importer_wallet)],
      deployer.address
    );

    // Assert
    receipt.result.expectSome();
  },
});

Clarinet.test({
  name: "Ensure that to get orders list of importers",
  async fn(chain: Chain, accounts: Map<string, Account>) {
    //arrange
    let deployer = accounts.get("deployer")!;
    let importer1_wallet = "ST1SJ3DTE5DN7X54YDH5D64R3BCB6A2AG2ZQ8YPD5";
    let importer1_name = "ALPS Logistics";
    let importer1_category = "Merchant";

    chain.mineBlock([
      Tx.contractCall(
        "taral-importer",
        "register",
        [
          types.principal(importer1_wallet),
          types.utf8(importer1_name),
          types.utf8(importer1_category),
        ],
        deployer.address
      ),
    ]);
    let importer2_wallet = "ST2CY5V39NHDPWSXMW9QDT3HC3GD6Q6XX4CFRK9AG";
    let importer2_name = "MX Roadways";
    let importer2_category = "PROJECT";

    chain.mineBlock([
      Tx.contractCall(
        "taral-importer",
        "register",
        [
          types.principal(importer2_wallet),
          types.utf8(importer2_name),
          types.utf8(importer2_category),
        ],
        deployer.address
      ),
    ]);
    let importer3_wallet = "ST2JHG361ZXG51QTKY2NQCVBPPRRE2KZB1HR05NNC";
    let new1_order_id = 2001;

    chain.mineBlock([
      Tx.contractCall(
        "taral-importer",
        "append-order",
        [types.uint(new1_order_id), types.principal(importer1_wallet)],
        deployer.address
      ),
    ]);
    let new2_order_id = 2002;

    chain.mineBlock([
      Tx.contractCall(
        "taral-importer",
        "append-order",
        [types.uint(new2_order_id), types.principal(importer1_wallet)],
        deployer.address
      ),
    ]);
    let new3_order_id = 2003;

    chain.mineBlock([
      Tx.contractCall(
        "taral-importer",
        "append-order",
        [types.uint(new3_order_id), types.principal(importer2_wallet)],
        deployer.address
      ),
    ]);
    let new4_order_id = 2004;

    chain.mineBlock([
      Tx.contractCall(
        "taral-importer",
        "append-order",
        [types.uint(new4_order_id), types.principal(importer2_wallet)],
        deployer.address
      ),
    ]);

    //act
    const importerList = types.list([
      types.principal(importer1_wallet),
      types.principal(importer1_wallet),
      types.principal(importer2_wallet),
      types.principal(importer3_wallet),
    ]);

    const orderList = types.list([
      types.uint(0),
      types.uint(1),
      types.uint(0),
      types.uint(0),
    ]);

    let receipt = chain.callReadOnlyFn(
      "taral-importer",
      "get-importer-orders",
      [orderList, importerList],
      deployer.address
    );

    // Assert
    console.log("----------OLD CONTRACT------------", receipt);

    let arrSome = receipt.result.matchAll(/some/gi); // RegExpMatchArray
    let arrSomeCount = 0;
    for (let arr of arrSome) {
      arrSomeCount += 1;
    }
    assertEquals(arrSomeCount, 3);
  },
});
