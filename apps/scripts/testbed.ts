import { getDeployerPublicKey } from './testbeds/public-key-testbed';
import { storageManualTest } from './testbeds/storage';

async function main() {
	const cwd = `${process.cwd()}`;
	console.log('Taral testbed');
	console.log('A place to quickly prototype and test things.');
	console.log(`Ran from ${cwd}`);
	// await storageManualTest(true);
	await storageManualTest(true);
}

main();
