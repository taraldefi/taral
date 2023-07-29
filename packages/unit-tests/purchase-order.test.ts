/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { TestProvider } from "lib-testing";
import {
  TaralExporterV1Contract,
  TaralImporterV1Contract,
  TaralPurchaseOrderV1Contract,
  ExporterStorageContract,
  TaralCoinContract,
  nodeTaralContracts,
} from "taral-contracts";
import { clarinetAccounts, clarityBin } from "./jest-setup";

import { hashStacksMessage, utf8ToBytes } from "lib-stacks";
import { tx } from "lib-shared";

describe("Taral Purchase Order", () => {
  let taral_exporter: TaralExporterV1Contract;
  let taral_importer: TaralImporterV1Contract;
  let taral_purchase_order: TaralPurchaseOrderV1Contract;
  let taral_coin: TaralCoinContract;
  let taral_exporter_storage: ExporterStorageContract;
  beforeAll(async () => {
    const taralExporterInfo = nodeTaralContracts.nodeTaralExporterV1;
    const taralExporterStorageInfo = nodeTaralContracts.nodeExporterStorage;
    const taralImporterInfo = nodeTaralContracts.nodeTaralImporterV1;
    const taralPurchaseOrderInfo = nodeTaralContracts.nodeTaralPurchaseOrderV1;
    const taralCoinInfo = nodeTaralContracts.nodeTaralCoin;
    const ExporterContractInfo = await TestProvider.fromContracts(
      false,
      {
        taralExporterInfo,
      },
      clarityBin
    );
    const ExporterStorageContractInfo = await TestProvider.fromContracts(
      false,
      {
        taralExporterStorageInfo,
      },
      clarityBin
    );
    const ImporterContractInfo = await TestProvider.fromContracts(
      false,
      {
        taralImporterInfo,
      },
      clarityBin
    );
    const PurchaseOrderContractInfo = await TestProvider.fromContracts(
      false,
      {
        taralPurchaseOrderInfo,
      },
      clarityBin
    );
    const TaralCoinContractInfo = await TestProvider.fromContracts(
      false,
      {
        taralCoinInfo,
      },
      clarityBin
    );

    const ExporterContract = ExporterContractInfo.taralExporterInfo.contract;
    const ExporterStorageContract =
      ExporterStorageContractInfo.taralExporterStorageInfo.contract;
    const ImporterContract = ImporterContractInfo.taralImporterInfo.contract;
    const PurchaseOrderContract =
      PurchaseOrderContractInfo.taralPurchaseOrderInfo.contract;
    const TaralCoinContract = TaralCoinContractInfo.taralCoinInfo.contract;

    taral_exporter = ExporterContract(clarinetAccounts.deployer);
    taral_importer = ImporterContract(clarinetAccounts.deployer);
    taral_purchase_order = PurchaseOrderContract(clarinetAccounts.deployer);
    taral_coin = TaralCoinContract(clarinetAccounts.deployer);
    taral_exporter_storage = ExporterStorageContract(clarinetAccounts.deployer);
  });
  test("Get purchase order contract version", async () => {
    const result = await taral_purchase_order.getVersion();
    console.log("result: -------->", result);
  }, 3000000);

  test("Check if User holds TAL token", async () => {
    const exporter_wallet = clarinetAccounts.wallet_6.address;
    const exporter2_wallet = clarinetAccounts.wallet_7.address;
    const block_1 = await tx(
      taral_purchase_order.checkIfUserHoldsTalToken(exporter_wallet)
    );

    const block_2 = await tx(taral_coin.mint(exporter_wallet, 10));
    const block_3 = await tx(
      taral_purchase_order.checkIfUserHoldsTalToken(exporter_wallet)
    );
    const block_4 = await tx(
      taral_purchase_order.checkIfUserHoldsTalToken(exporter2_wallet)
    );
    expect(block_1.value).toEqual(false);
    expect(block_2.value).toEqual(true);
    expect(block_3.value).toEqual(true);
    expect(block_4.value).toEqual(false);
  }, 3000000);

  test("Ensure that inputs are valid", async () => {
    //First register exporter and importer
    const exporter_message = "This is the data containing exporter details";
    const exporter_messageHex = hashStacksMessage({
      message: exporter_message,
    });
    const exporter_wallet = clarinetAccounts.wallet_1.address;
    const importer_wallet = clarinetAccounts.wallet_2.address;
    const exporter_name = "ALPS Logistics";
    const exporter_category = "Merchant";
    const exporter_buffer = Buffer.from(utf8ToBytes(exporter_messageHex));

    const block_1 = await tx(
      taral_exporter.register(
        exporter_wallet,
        exporter_name,
        exporter_buffer,
        exporter_category
      )
    );

    expect(block_1.value).toEqual(true); //REGISTERED SUCCESSFULLY

    const importer_message = "This is the data containing importer details";
    const importer_messageHex = hashStacksMessage({
      message: importer_message,
    });
    const importer_name = "XYZ Company";
    const importer_category = "Merchant";
    const importer_buffer = Buffer.from(utf8ToBytes(importer_messageHex));

    const block_2 = await tx(
      taral_importer.register(
        importer_wallet,
        importer_name,
        importer_buffer,
        importer_category
      )
    );

    expect(block_2.value).toEqual(true); //REGISTERED SUCCESSFULLY

    const order =
      '{deliveryCountry: "Germany","dispathMethod: "air",shipmentType:"LCL"}';
    const orderDetails =
      '{shippingRoute: ["Loading Port", "Discharge Port"],"items: ["item1", "item2"]}';
    const orderHex = hashStacksMessage({ message: order });
    const orderDetailsHex = hashStacksMessage({ message: orderDetails });

    const paymentTerm = ""; // this should throw error
    const amount = 10000;
    const deliveryTerm = "CFR";
    const orderBuffer = Buffer.from(utf8ToBytes(orderHex));
    const orderDetailsBuffer = Buffer.from(utf8ToBytes(orderDetailsHex));
    const result = await tx(
      taral_purchase_order.initialize(
        exporter_wallet,
        importer_wallet,
        orderBuffer,
        orderDetailsBuffer,
        paymentTerm,
        amount,
        deliveryTerm
      )
    );
    expect(result.value).toEqual(100n);
  }, 3000000);

  test("Ensure the initialization works", async () => {
    const exporter_wallet = clarinetAccounts.wallet_1.address;
    const importer_wallet = clarinetAccounts.wallet_2.address;
    const order =
      '{deliveryCountry: "Germany","dispathMethod: "air",shipmentType:"LCL"}';
    const orderDetails =
      '{shippingRoute: ["Loading Port", "Discharge Port"],"items: ["item1", "item2"]}';
    const orderHex = hashStacksMessage({ message: order });
    const orderDetailsHex = hashStacksMessage({ message: orderDetails });

    const paymentTerm = "60 Days";
    const amount = 10000;
    const deliveryTerm = "CFR";
    const orderBuffer = Buffer.from(utf8ToBytes(orderHex));
    const orderDetailsBuffer = Buffer.from(utf8ToBytes(orderDetailsHex));
    const result = await tx(
      taral_purchase_order.initialize(
        exporter_wallet,
        importer_wallet,
        orderBuffer,
        orderDetailsBuffer,
        paymentTerm,
        amount,
        deliveryTerm
      )
    );
    expect(result.value).toEqual(true); // INITIALIZED SUCCESSFULLY

    const appended_order = await taral_exporter_storage.getExporterOrder(
      0n,
      exporter_wallet
    );
    expect(appended_order?.["order-id"]).toEqual(10001n);
  }, 3000000);
});
