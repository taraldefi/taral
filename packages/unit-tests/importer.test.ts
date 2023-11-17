import { TestProvider } from "lib-testing";
import {
  TaralImporterContract,
  nodeTaralContracts,
  ImporterStorageContract,
} from "taral-contracts";
import { clarinetAccounts, clarityBin } from "./jest-setup";
import { hashStacksMessage, utf8ToBytes } from "lib-stacks";
import { tx } from "lib-shared";

describe("Taral Importer", () => {
  let taral_importer: TaralImporterContract;
  let taral_importer_storage: ImporterStorageContract;
  beforeAll(async () => {
    const taralImporterInfo = nodeTaralContracts.nodeTaralImporter;
    const ImporterStorageInfo = nodeTaralContracts.nodeImporterStorage;
    const ImporterContractInfo = await TestProvider.fromContracts(
      false,
      {
        taralImporterInfo,
      },
      clarityBin,
    );
    const ImporterStorageContractInfo = await TestProvider.fromContracts(
      false,
      {
        ImporterStorageInfo,
      },
      clarityBin,
    );

    const ImporterContract = ImporterContractInfo.taralImporterInfo.contract;
    const ImporterStorageContract =
      ImporterStorageContractInfo.ImporterStorageInfo.contract;

    taral_importer = ImporterContract(clarinetAccounts.deployer);
    taral_importer_storage = ImporterStorageContract(clarinetAccounts.deployer);
  });
  test("Get importer contract version", async () => {
    const result = await taral_importer.getVersion();

    console.log("result: -------->", result);
  }, 3000000);

  test("Ensure that inputs are valid", async () => {
    const message = "This is a test message";
    const messageHex = hashStacksMessage({ message });
    const importer_wallet = "ST1SJ3DTE5DN7X54YDH5D64R3BCB6A2AG2ZQ8YPD5";
    const importer_name = "ALPS Logistics";
    const importer_category = "";
    const buffer = Buffer.from(utf8ToBytes(messageHex));
    const result = await tx(
      taral_importer.register(
        importer_wallet,
        importer_name,
        buffer,
        importer_category,
      ),
    );
    expect(result.value).toEqual(100n);
  }, 3000000);

  test("Ensure that importer registration is a success", async () => {
    const message = "This is a test message";
    const messageHex = hashStacksMessage({ message });
    const importer_wallet = clarinetAccounts.wallet_1.address;
    const importer_name = "ALPS Logistics";
    const importer_category = "Merchant";
    const buffer = Buffer.from(utf8ToBytes(messageHex));

    const block_1 = await tx(
      taral_importer.register(
        importer_wallet,
        importer_name,
        buffer,
        importer_category,
      ),
    );

    expect(block_1.value).toEqual(10001n); //REGISTERED SUCCESSFULLY
  }, 3000000);

  test("Ensure that importer hash getter function works", async () => {
    const message = "This is a test message";
    const messageHex = hashStacksMessage({ message });
    const importer_wallet = clarinetAccounts.wallet_1.address;
    const buffer = Buffer.from(utf8ToBytes(messageHex));
    const block_1 = (
      await taral_importer.getImporterHash(importer_wallet)
    ).unwrapOr(null);

    expect(block_1).not.toEqual(null);

    const nonNullBlock = block_1 as Buffer;

    expect(nonNullBlock).toEqual(`0x${buffer.toString("hex")}`);
  }, 3000000);

  test("Ensure that importer can register only once with unique wallet id", async () => {
    const message = "This is also a test message";
    const messageHex = hashStacksMessage({ message });
    const importer_wallet = clarinetAccounts.wallet_2.address;
    const importer_name = "MX Roadways";
    const importer_category = "Project";
    const buffer = Buffer.from(utf8ToBytes(messageHex));

    const block_1 = await tx(
      taral_importer.register(
        importer_wallet,
        importer_name,
        buffer,
        importer_category,
      ),
    );

    expect(block_1.value).toEqual(10002n); //REGISTERED SUCCESSFULLY

    const block_2 = await tx(
      taral_importer.register(
        importer_wallet,
        importer_name,
        buffer,
        importer_category,
      ),
    );
    expect(block_2.value).toEqual(105n); //IMPORTER ALREADY REGISTERED
  }, 3000000);

  test("Ensure that importer storage function works", async () => {
    const importer_wallet = clarinetAccounts.wallet_3.address;

    const response =
      await taral_importer_storage.getImporterByPrincipal(importer_wallet);

    expect(response).toEqual(null);
  }, 3000000);

  test("Ensure that importer exists after registration", async () => {
    const importer_wallet = clarinetAccounts.wallet_2.address;

    const response =
      await taral_importer_storage.getImporterProfile(importer_wallet);
    expect(response?.category).toEqual("Project");
  }, 3000000);

  test("Ensure that next importer id available", async () => {
    const response = await taral_importer_storage.getImporterIdNonce();
    expect(response).toEqual(10003n); //Wallet 1 and wallet 2 registered
  }, 3000000);

  test("Ensure that to get importers profile", async () => {
    const importer1_wallet = clarinetAccounts.wallet_1.address;
    const importer2_wallet = clarinetAccounts.wallet_2.address;
    const importer3_wallet = clarinetAccounts.wallet_3.address;

    const response = await taral_importer_storage.getImporters([
      importer1_wallet,
      importer2_wallet,
      importer3_wallet,
    ]);

    expect(response).not.toEqual(null);

    const responseNotNull = response as any as {
      category: string;
      created: bigint;
      hash: Buffer;
      name: string;
      "orders-next-avail-id": bigint;
    }[];

    expect(responseNotNull.length).toEqual(3);
  }, 3000000);

  test("Ensure that order inputs are valid", async () => {
    const importer3_wallet = clarinetAccounts.wallet_3.address;
    const new_order_id = 2001;

    const response = await tx(
      taral_importer.appendOrder(new_order_id, importer3_wallet),
    );

    expect(response.value).toEqual(102n); // ERR-IMPORTER-NOT-REGISTERED
  }, 3000000);

  test("Ensure that adding order is a success", async () => {
    const importer_wallet = clarinetAccounts.wallet_1.address;
    const new_order_id = 2001;
    const response = await tx(
      taral_importer.appendOrder(new_order_id, importer_wallet),
    );

    expect(response.value).toEqual(0n); // Succesfully added order
  }, 3000000);

  test("Ensure that order exists after registration", async () => {
    const importer_wallet = clarinetAccounts.wallet_1.address;
    const response = await taral_importer_storage.getImporterOrder(
      0,
      importer_wallet,
    );

    expect(response?.["order-id"]).toEqual(2001n);
  }, 3000000);

  //TODO(doru): fix this test
  // test("Ensure that to get orders list of importers", async () => {
  //   const importer1_wallet = clarinetAccounts.wallet_1.address;
  //   const importer2_wallet = clarinetAccounts.wallet_2.address;
  //   const response_order2 = await tx(
  //     taral_importer.appendOrder(2002, importer1_wallet)
  //   );
  //   expect(response_order2.value).toEqual(true); // Succesfully added order

  //   const response_order3 = await tx(
  //     taral_importer.appendOrder(2003, importer2_wallet)
  //   );
  //   expect(response_order3.value).toEqual(true); // Succesfully added order

  //   const response_order4 = await tx(
  //     taral_importer.appendOrder(2004, importer2_wallet)
  //   );
  //   expect(response_order4.value).toEqual(true); // Succesfully added order

  //   const importerList = [
  //     importer1_wallet,
  //     importer1_wallet,
  //     importer2_wallet,
  //     importer2_wallet,
  //   ];

  //   const orderList = [0n, 1n, 0n, 0n];
  //   const response = await taral_importer_storage.getImporterOrders(
  //     orderList,
  //     importerList
  //   );
  //   expect(response.length).toEqual(4);
  // }, 3000000);
});
