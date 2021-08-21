import { validateStacksAddress } from '../../lib';
import { deployer } from './jest-setup';

test("Address should be valid", async () => {
    let stacksAddress = deployer.address;
    let isValid = validateStacksAddress(stacksAddress);
    expect(isValid).toBe(true);
  });