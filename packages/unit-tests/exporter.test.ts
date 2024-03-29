import { TestProvider } from "lib-testing";
import {
  TaralExporterContract,
  nodeTaralContracts,
  ExporterStorageContract,
} from "taral-contracts";
import { clarinetAccounts, clarityBin } from "./jest-setup";
import { hashStacksMessage, utf8ToBytes } from "lib-stacks";
import { tx } from "lib-shared";

describe("Taral Exporter", () => {
  let taral_exporter: TaralExporterContract;
  let taral_exporter_storage: ExporterStorageContract;
  beforeAll(async () => {
    const taralExporterInfo = nodeTaralContracts.nodeTaralExporter;
    const ExporterStorageInfo = nodeTaralContracts.nodeExporterStorage;
    const ExporterContractInfo = await TestProvider.fromContracts(
      false,
      {
        taralExporterInfo,
      },
      clarityBin,
    );
    const ExporterStorageContractInfo = await TestProvider.fromContracts(
      false,
      {
        ExporterStorageInfo,
      },
      clarityBin,
    );

    const ExporterContract = ExporterContractInfo.taralExporterInfo.contract;
    const ExporterStorageContract =
      ExporterStorageContractInfo.ExporterStorageInfo.contract;

    taral_exporter = ExporterContract(clarinetAccounts.deployer);
    taral_exporter_storage = ExporterStorageContract(clarinetAccounts.deployer);
  });
  test("Get exporter contract version", async () => {
    const result = await taral_exporter.getVersion();

    console.log("result: -------->", result);
  }, 3000000);

  test("Ensure that inputs are valid", async () => {
    const message = "This is a test message";
    const messageHex = hashStacksMessage({ message });
    const exporter_wallet = "ST1SJ3DTE5DN7X54YDH5D64R3BCB6A2AG2ZQ8YPD5";
    const exporter_name = "ALPS Logistics";
    const exporter_category = "";
    const buffer = Buffer.from(utf8ToBytes(messageHex));
    const result = await tx(
      taral_exporter.register(
        exporter_wallet,
        exporter_name,
        buffer,
        exporter_category,
      ),
    );
    expect(result.value).toEqual(100n);
  }, 3000000);

  test("Ensure that exporter registration is a success", async () => {
    const message = "This is a test message";
    const messageHex = hashStacksMessage({ message });
    const exporter_wallet = clarinetAccounts.wallet_1.address;
    const exporter_name = "ALPS Logistics";
    const exporter_category = "Merchant";
    const buffer = Buffer.from(utf8ToBytes(messageHex));

    const block_1 = await tx(
      taral_exporter.register(
        exporter_wallet,
        exporter_name,
        buffer,
        exporter_category,
      ),
    );

    expect(block_1.value).toEqual(10001n); //REGISTERED SUCCESSFULLY
  }, 3000000);

  test("Ensure that exporter hash getter function works", async () => {
    const message = "This is a test message";
    const messageHex = hashStacksMessage({ message });
    const exporter_wallet = clarinetAccounts.wallet_1.address;
    const buffer = Buffer.from(utf8ToBytes(messageHex));

    const block_1 = (
      await taral_exporter.getExporterHash(exporter_wallet)
    ).unwrapOr(null);

    expect(block_1).not.toEqual(null);

    const nonNullBlock = block_1 as Buffer;

    expect(nonNullBlock).toEqual(`0x${buffer.toString("hex")}`);
  }, 3000000);

  test("Ensure that exporter can register only once with unique wallet id", async () => {
    const message = "This is also a test message";
    const messageHex = hashStacksMessage({ message });
    const exporter_wallet = clarinetAccounts.wallet_2.address;
    const exporter_name = "MX Roadways";
    const exporter_category = "Project";
    const buffer = Buffer.from(utf8ToBytes(messageHex));

    const block_1 = await tx(
      taral_exporter.register(
        exporter_wallet,
        exporter_name,
        buffer,
        exporter_category,
      ),
    );

    expect(block_1.value).toEqual(10002n); //REGISTERED SUCCESSFULLY

    const block_2 = await tx(
      taral_exporter.register(
        exporter_wallet,
        exporter_name,
        buffer,
        exporter_category,
      ),
    );
    expect(block_2.value).toEqual(105n); //EXPORTER ALREADY REGISTERED
  }, 3000000);

  test("Ensure that exporter storage function works", async () => {
    const exporter_wallet = clarinetAccounts.wallet_3.address;

    const response =
      await taral_exporter_storage.getExporterByPrincipal(exporter_wallet);

    expect(response).toEqual(null);
  }, 3000000);

  test("Ensure that exporter exists after registration", async () => {
    const exporter_wallet = clarinetAccounts.wallet_2.address;

    const response =
      await taral_exporter_storage.getExporterProfile(exporter_wallet);
    expect(response?.category).toEqual("Project");
  }, 3000000);

  test("Ensure that next exporter id available", async () => {
    const response = await taral_exporter_storage.getExporterIdNonce();
    expect(response).toEqual(10003n); //Wallet 1 and wallet 2 registered
  }, 3000000);

  test("Ensure that to get exporters profile", async () => {
    const exporter1_wallet = clarinetAccounts.wallet_1.address;
    const exporter2_wallet = clarinetAccounts.wallet_2.address;
    const exporter3_wallet = clarinetAccounts.wallet_3.address;

    const response = await taral_exporter_storage.getExporters([
      exporter1_wallet,
      exporter2_wallet,
      exporter3_wallet,
    ]);

    expect(response).not.toBe(null);

    const nonNullResponse = response as any as {
      category: string;
      created: bigint;
      hash: Buffer;
      name: string;
      "orders-next-avail-id": bigint;
    }[];

    expect(nonNullResponse.length).toEqual(3);
  }, 3000000);

  test("Ensure that order inputs are valid", async () => {
    const exporter3_wallet = clarinetAccounts.wallet_3.address;
    const new_order_id = 2001;
    const response = await tx(
      taral_exporter.appendOrder(new_order_id, exporter3_wallet),
    );

    expect(response.value).toEqual(102n); // ERR-EXPORTER-NOT-REGISTERED
  }, 3000000);

  test("Ensure that adding order is a success", async () => {
    const exporter_wallet = clarinetAccounts.wallet_1.address;
    const new_order_id = 2001;

    const response = await tx(
      taral_exporter.appendOrder(new_order_id, exporter_wallet),
    );

    expect(response.value).toEqual(0n); // Succesfully added order
  }, 3000000);

  test("Ensure that order exists after registration", async () => {
    const exporter_wallet = clarinetAccounts.wallet_1.address;

    const response = await taral_exporter_storage.getExporterOrder(
      0,
      exporter_wallet,
    );

    expect(response?.["order-id"]).toEqual(2001n);
  }, 3000000);

  //TODO(doru): Fix this test
  // test("Ensure that to get orders list of exporters", async () => {
  //   const exporter1_wallet = clarinetAccounts.wallet_1.address;
  //   const exporter2_wallet = clarinetAccounts.wallet_2.address;
  //   const response_order2 = await tx(
  //     taral_exporter.appendOrder(2002, exporter1_wallet)
  //   );
  //   expect(response_order2.value).toEqual(true); // Succesfully added order

  //   const response_order3 = await tx(
  //     taral_exporter.appendOrder(2003, exporter2_wallet)
  //   );
  //   expect(response_order3.value).toEqual(true); // Succesfully added order

  //   const response_order4 = await tx(
  //     taral_exporter.appendOrder(2004, exporter2_wallet)
  //   );
  //   expect(response_order4.value).toEqual(true); // Succesfully added order

  //   const exporterList = [
  //     exporter1_wallet,
  //     exporter1_wallet,
  //     exporter2_wallet,
  //     exporter2_wallet,
  //   ];

  //   const orderList = [0n, 1n, 0n, 0n];
  //   const response = await taral_exporter_storage.getExporterOrders(
  //     orderList,
  //     exporterList
  //   );

  //   expect(response).not.toBe(null);

  //   const nonNullResponse = response as {
  //     "order-id": bigint;
  //   };

  //   expect(response.length).toEqual(4);
  // }, 3000000);
});
