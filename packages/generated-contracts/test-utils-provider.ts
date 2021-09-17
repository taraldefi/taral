import { ClarinetAccount, NativeClarityBinProvider, TestProvider } from "taral-shared";
import {
    BnsContract,
    bootContracts,
    CostsContract,
    CostVotingContract,
    LockupContract,
    PoxContract, TestUtilsContract, testutilsContracts
} from ".";

export class TestUtilsProvider {
    private readonly _testContract: (
        caller: ClarinetAccount
    ) => TestUtilsContract;
    private readonly _bnsContract: (caller: ClarinetAccount) => BnsContract;
    private readonly _costVotingContract: (
        caller: ClarinetAccount
    ) => CostVotingContract;
    private readonly _costsContract: (caller: ClarinetAccount) => CostsContract;
    private readonly _lockupContract: (caller: ClarinetAccount) => LockupContract;
    private readonly _poxContract: (caller: ClarinetAccount) => PoxContract;
    private constructor(
        testContract: (caller: ClarinetAccount) => TestUtilsContract,
        bns: (caller: ClarinetAccount) => BnsContract,
        costVoting: (caller: ClarinetAccount) => CostVotingContract,
        costs: (caller: ClarinetAccount) => CostsContract,
        lockup: (caller: ClarinetAccount) => LockupContract,
        pox: (caller: ClarinetAccount) => PoxContract
    ) {
        this._testContract = testContract;
        this._bnsContract = bns;
        this._costVotingContract = costVoting;
        this._costsContract = costs;
        this._lockupContract = lockup;
        this._poxContract = pox;
    }
    public getBnsContract(): (caller: ClarinetAccount) => BnsContract {
        return this._bnsContract;
    }
    public getCostVotingContract(): (
        caller: ClarinetAccount
    ) => CostVotingContract {
        return this._costVotingContract;
    }
    public getCostsContract(): (caller: ClarinetAccount) => CostsContract {
        return this._costsContract;
    }
    public getLockupContract(): (caller: ClarinetAccount) => LockupContract {
        return this._lockupContract;
    }
    public getPoxContract(): (caller: ClarinetAccount) => PoxContract {
        return this._poxContract;
    }
    public getTestContract(): (caller: ClarinetAccount) => TestUtilsContract {
        return this._testContract;
    }

    public static async ensureTestContracts(
        clarityBin: NativeClarityBinProvider
    ): Promise<TestUtilsProvider> {
        var deployedTestUtils = await TestProvider.fromContracts(
            true,
            testutilsContracts,
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
