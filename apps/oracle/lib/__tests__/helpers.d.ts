import execa from 'execa';
declare type RunOptions = {
  nodeOptions?: string;
  nodePath?: string;
  timeout?: number;
  expectedFailure?: boolean;
};
declare type SpawnOptions = RunOptions & {
  cwd: string;
};
declare type SpawnFunction<T> = (
  execPath: string,
  args: string[],
  options: SpawnOptions
) => T;
/**
 * Helper function to run CLI command in a given folder
 */
export declare function runCLI(
  dir: string,
  args?: string[],
  options?: RunOptions
): execa.ExecaSyncReturnValue;
export declare const spawnScript: SpawnFunction<execa.ExecaSyncReturnValue>;
export {};
