import { NativeClarityBinProvider } from "@blockstack/clarity";
import { TestProvider } from ".";
import {
  BnsContract,
  contracts as bootContracts,
  CostsContract,
  CostVotingContract,
  LockupContract,
  PoxContract,
} from "../test-utils/contracts/generated/boot";
import {
  contracts as testUtilsContracts,
  TestUtilsContract,
} from "../test-utils/contracts/generated/test-utils";

export class TestUtilsProvider {
  private readonly _testContract: TestUtilsContract;
  private readonly _bnsContract: BnsContract;
  private readonly _costVotingContract: CostVotingContract;
  private readonly _costsContract: CostsContract;
  private readonly _lockupContract: LockupContract;
  private readonly _poxContract: PoxContract;

  private constructor(
    testContract: TestUtilsContract,
    bns: BnsContract,
    costVoting: CostVotingContract,
    costs: CostsContract,
    lockup: LockupContract,
    pox: PoxContract
  ) {
    this._testContract = testContract;
    this._bnsContract = bns;
    this._costVotingContract = costVoting;
    this._costsContract = costs;
    this._lockupContract = lockup;
    this._poxContract = pox;
  }

  public getBnsContract(): BnsContract {
    return this._bnsContract;
  }

  public getCostVotingContract(): CostVotingContract {
    return this._costVotingContract;
  }

  public getCostsContract(): CostsContract {
    return this._costsContract;
  }

  public getLockupContract(): LockupContract {
    return this._lockupContract;
  }

  public getPoxContract(): PoxContract {
    return this._poxContract;
  }

  public getTestContract(): TestUtilsContract {
    return this._testContract;
  }

  public static async ensureTestContracts(
    clarityBin: NativeClarityBinProvider
  ): Promise<TestUtilsProvider> {
    var deployedTestUtils = await TestProvider.fromContracts(
      true,
      testUtilsContracts,
      clarityBin
    );

    var deployedBootUtils = await TestProvider.fromContracts(
      true,
      bootContracts,
      clarityBin
    );

    return new TestUtilsProvider(
      deployedTestUtils.testUtils.contract,
      deployedBootUtils.bns.contract,
      deployedBootUtils.costVoting.contract,
      deployedBootUtils.costs.contract,
      deployedBootUtils.lockup.contract,
      deployedBootUtils.pox.contract
    );
  }
}
