import { spawn, SpawnOptions } from "child_process";
import * as fs from "fs";
import { pipelineAsync, readStream } from "./stream";
import {
  CheckResult,
  ExecuteOptions,
  ExecutionError,
  ExecutionResult,
  InitialAllocation,
  Provider,
  Receipt,
} from "./types";
import { getNormalizedContractFilePath, getTempFilePath } from "./utils";

export async function executeCommand(
  command: string,
  args: string[],
  opts?: ExecuteOptions
): Promise<ExecutionResult> {
  const spawnOpts: SpawnOptions = {};
  if (opts) {
    if (opts.cwd) {
      spawnOpts.cwd = opts.cwd;
    }
    if (opts.env) {
      spawnOpts.env = opts.env;
    }
  }
  const proc = spawn(command, args, spawnOpts);

  if (proc.stdout === null || proc.stderr === null || proc.stdin === null) {
    throw new Error("clarity-cli spawn error");
  }

  const readStdout = readStream(proc.stdout, true);
  const readStderr = readStream(proc.stderr, true);

  let writeStdin: Promise<void> = Promise.resolve();
  if (opts && opts.stdin) {
    if (typeof opts.stdin === "string") {
      proc.stdin.end(opts.stdin, "utf8");
    } else {
      writeStdin = pipelineAsync(opts.stdin, proc.stdin).catch((error: any) => {
        console.debug(`spawn stdin error: ${error}`);
      });
    }
  }

  proc.on("error", (error: any) => {
    console.error(`Unexpected process exec error: ${error}`);
  });

  const exitCode = await new Promise<number>((resolve) => {
    proc.once("close", (code: number) => {
      resolve(code);
    });
  });

  const [stdoutData, stderrData] = await Promise.all([
    readStdout,
    readStderr,
    writeStdin,
  ]);

  const stdoutStr = stdoutData.toString("utf8");
  const stderrStr = stderrData.toString("utf8");

  return {
    stdout: stdoutStr,
    stderr: stderrStr,
    exitCode: exitCode,
  };
}

export class NativeClarityBinProvider {
  public readonly dbFilePath: string;
  public readonly clarityBinPath: string;
  public readonly allocations: InitialAllocation[];
  private closeActions: ((() => Promise<any>) | (() => any))[] = [];

  /**
   * Instantiates a new executor. Before returning, ensures db is ready with `initialize`.
   * @param dbFilePath File path to the db. If not specified then a temporary file is created
   *                   and gets deleted when `close` is invoked.
   */
  static async create(
    allocations: InitialAllocation[],
    dbFilePath: string,
    clarityBinPath: string
  ): Promise<NativeClarityBinProvider> {
    const executor = new NativeClarityBinProvider(
      allocations,
      dbFilePath,
      clarityBinPath
    );
    await executor.initialize();
    return executor;
  }

  /**
   * Instantiates a new executor pointed at a new temporary database file.
   * The temp file is deleted when `close` is invoked.
   * Before returning, ensures db is ready with `initialize`.   *
   * @param allocations initializes the given accounts with amount of STXs at start.
   * @param clarityBinPath file path to the clarity binary, can be `getDefaultBinaryFilePath`.
   */
  static async createEphemeral(
    allocations: InitialAllocation[],
    clarityBinPath: string
  ): Promise<Provider> {
    const tempDbPath = getTempFilePath("blockstack-local-{uniqueID}.db");
    const instance = await this.create(allocations, tempDbPath, clarityBinPath);
    instance.closeActions.push(() => {
      try {
        fs.unlinkSync(instance.dbFilePath);
      } catch (error) {
        // console.error(error);
      }
    });
    return instance;
  }

  constructor(
    allocations: InitialAllocation[],
    dbFilePath: string,
    clarityBinPath: string
  ) {
    this.dbFilePath = dbFilePath;
    this.clarityBinPath = clarityBinPath;
    this.allocations = allocations;
  }

  async initialize(): Promise<void> {
    const allocations = JSON.stringify(this.allocations);

    console.log(`Initializing database at ${this.dbFilePath}`);
    console.log(`Allocations: ${allocations}`);

    const result = await this.runCommand(["initialize", "-", this.dbFilePath], {
      stdin: allocations,
    });

    if (result.exitCode !== 0) {
      console.log(JSON.stringify(result, null, 2));

      throw new ExecutionError(
        `Initialize failed with bad exit code ${result.exitCode}: ${result.stderr}`,
        result.exitCode,
        result.stdout,
        result.stderr
      );
    }
    if (result.stdout.indexOf("Database created.") < 0) {
      throw new ExecutionError(
        `Initialize failed with bad output: ${result.stdout}`,
        result.exitCode,
        result.stdout,
        result.stderr
      );
    }
  }

  /**
   * Run command against a local Stacks node VM.
   * Uses `clarity-cli` with the configured native bin path.
   * @param args clarity-cli commands.
   */
  async runCommand(args: string[], opts?: { stdin: string }) {
    const result = await executeCommand(this.clarityBinPath, [...args], {
      stdin: opts && opts.stdin,
    });

    // Normalize first EOL, and trim the trailing EOL.
    result.stdout = result.stdout
      .replace(/\r\n|\r|\n/, "\n")
      .replace(/\r\n|\r|\n$/, "");

    // Normalize all stderr EOLs, trim the trailing EOL.
    result.stderr = result.stderr
      .replace(/\r\n|\r|\n/g, "\n")
      .replace(/\r\n|\r|\n$/, "");

    return result;
  }

  async checkContract(contractFilePath: string): Promise<CheckResult> {
    const filePath = getNormalizedContractFilePath(contractFilePath);
    const result = await this.runCommand([
      "check",
      filePath,
      this.dbFilePath,
      "--output_analysis",
    ]);
    if (result.exitCode !== 0) {
      return {
        success: false,
        error: result.stdout + "\n" + result.stderr,
      };
    } else {
      const contractInterface = JSON.parse(result.stdout);
      return {
        success: true,
        result: contractInterface,
      };
    }
  }

  async launchContract(
    contractName: string,
    contractFilePath: string
  ): Promise<Receipt> {
    const filePath = getNormalizedContractFilePath(contractFilePath);

    const result = await this.runCommand([
      "launch",
      contractName,
      filePath,
      this.dbFilePath,
    ]);

    if (result.exitCode !== 0) {
      throw new ExecutionError(
        `Launch contract failed with bad exit code ${result.exitCode}: ${result.stderr}`,
        result.exitCode,
        result.stdout,
        result.stderr
      );
    }
    if (result.stdout !== "Contract initialized!") {
      throw new ExecutionError(
        `Launch contract failed with bad output: ${result.stdout}`,
        result.exitCode,
        result.stdout,
        result.stderr
      );
    }
    return {
      success: true,
      debugOutput: result.stderr,
    };
  }

  async execute(
    contractName: string,
    functionName: string,
    senderAddress: string,
    ...args: string[]
  ): Promise<Receipt> {
    const result = await this.runCommand([
      "execute",
      this.dbFilePath,
      contractName,
      functionName,
      senderAddress,
      ...args,
    ]);
    if (result.exitCode !== 0) {
      throw new ExecutionError(
        `Execute expression on contract failed with bad exit code ${result.exitCode}: ${result.stderr}`,
        result.exitCode,
        result.stdout,
        result.stderr
      );
    }
    const executed = result.stdout.startsWith(
      "Transaction executed and committed."
    );
    const didReturnErr = result.stdout.includes(" Returned: (err");
    if (!executed || didReturnErr) {
      throw new ExecutionError(
        `Execute expression on contract failed with bad output: ${result.stdout}`,
        result.exitCode,
        result.stdout,
        result.stderr
      );
    }
    return {
      success: true,
      result: result.stdout,
      debugOutput: result.stderr,
    };
  }

  async evalRaw(evalStatement: string): Promise<Receipt> {
    const result = await this.runCommand(["eval_raw", this.dbFilePath], {
      stdin: evalStatement,
    });
    if (result.exitCode !== 0) {
      throw new ExecutionError(
        `Eval raw expression failed with bad exit code ${result.exitCode}: ${result.stderr}`,
        result.exitCode,
        result.stdout,
        result.stderr
      );
    }
    // Check and trim success prefix line.
    const successPrefix =
      /(Program executed successfully! Output: (\r\n|\r|\n))/.exec(
        result.stdout
      );
    if (!successPrefix || successPrefix.length < 1) {
      throw new ExecutionError(
        `Eval raw expression failed with bad output: ${result.stdout}`,
        result.exitCode,
        result.stdout,
        result.stderr
      );
    }
    // Get the output string with the prefix message and last EOL trimmed.
    const outputResult = result.stdout.substr(successPrefix[0].length);
    return {
      success: true,
      result: outputResult,
      debugOutput: result.stderr,
    };
  }

  async eval(
    contractName: string,
    evalStatement: string,
    includeDebugOutput?: boolean,
    atChaintip = true
  ): Promise<Receipt> {
    const result = await this.runCommand(
      [
        `eval${atChaintip ? "_at_chaintip" : ""}`,
        contractName,
        this.dbFilePath,
      ],
      {
        stdin: evalStatement,
      }
    );
    if (result.exitCode !== 0) {
      throw new ExecutionError(
        // tslint:disable-next-line: max-line-length
        `Eval expression on contract failed with bad exit code ${result.exitCode}: ${result.stderr}`,
        result.exitCode,
        result.stdout,
        result.stderr
      );
    }
    // Check and trim success prefix line.
    const successPrefix =
      /(Program executed successfully! Output: (\r\n|\r|\n))/.exec(
        result.stdout
      );
    if (!successPrefix || successPrefix.length < 1) {
      throw new ExecutionError(
        `Eval expression on contract failed with bad output: ${result.stdout}`,
        result.exitCode,
        result.stdout,
        result.stderr
      );
    }
    // Get the output string with the prefix message and last EOL trimmed.
    const outputResult = result.stdout.substr(successPrefix[0].length);
    if (includeDebugOutput) {
      return {
        success: true,
        result: outputResult,
        debugOutput: result.stderr,
      };
    } else {
      return {
        success: true,
        result: outputResult,
      };
    }
  }

  async mineBlock(time?: number | bigint): Promise<void> {
    const args = ["mine_block"];
    const timeArg = time || Math.round(Date.now() / 1000);
    args.push(timeArg.toString());
    args.push(this.dbFilePath);
    const result = await this.runCommand(args);

    if (result.exitCode !== 0) {
      throw new ExecutionError(
        `Mine block failed with bad exit code ${result.exitCode}: ${result.stderr}`,
        result.exitCode,
        result.stdout,
        result.stderr
      );
    }
    if (result.stdout !== "Simulated block mine!") {
      throw new ExecutionError(
        `Mine block failed with bad output: ${result.stdout}`,
        result.exitCode,
        result.stdout,
        result.stderr
      );
    }
  }

  async mineBlocks(count: number | bigint): Promise<void> {
    const result = await this.runCommand([
      "mine_blocks",
      `--data=${this.dbFilePath}`,
      `--count=${count.toString()}`,
    ]);

    if (result.exitCode !== 0) {
      throw new ExecutionError(
        `Mine blocks failed with bad exit code ${result.exitCode}: ${result.stderr}`,
        result.exitCode,
        result.stdout,
        result.stderr
      );
    }
    if (result.stdout !== "Simulated block mine!") {
      throw new ExecutionError(
        `Mine blocks failed with bad output: ${result.stdout}`,
        result.exitCode,
        result.stdout,
        result.stderr
      );
    }
  }

  async getBlockHeight(): Promise<bigint> {
    const result = await this.runCommand(["get_block_height", this.dbFilePath]);

    if (result.exitCode !== 0) {
      throw new ExecutionError(
        `Get block height failed with bad exit code ${result.exitCode}: ${result.stderr}`,
        result.exitCode,
        result.stdout,
        result.stderr
      );
    }
    // Check and trim success prefix line.
    const successPrefix = /(Simulated block height: (\r\n|\r|\n))/.exec(
      result.stdout
    );
    if (!successPrefix || successPrefix.length < 1) {
      throw new ExecutionError(
        `Get block height failed with bad output: ${result.stdout}`,
        result.exitCode,
        result.stdout,
        result.stderr
      );
    }
    // Get the output string with the prefix message and last EOL trimmed.
    const outputResult = result.stdout.substr(successPrefix[0].length);
    const heightInt = BigInt(outputResult);
    return heightInt;
  }

  async close(): Promise<void> {
    for (const closeAction of this.closeActions) {
      await Promise.resolve(closeAction());
    }
  }
}
