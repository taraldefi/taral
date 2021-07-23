import { contracts } from "./contracts";
import { generateAbis } from "./generate-abi";
import { generateProjectIndexFile } from "./generate-project";

console.log("Generating abis");
generateAbis();

console.log("Generating index file");
generateProjectIndexFile(contracts);
