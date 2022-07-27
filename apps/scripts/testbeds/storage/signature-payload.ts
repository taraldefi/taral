import {
  createStacksPrivateKey,
  signMessageHashRsv,
  StacksPrivateKey,
} from "lib-stacks";

export interface Signature {
  data: string;
  message: string;
}

export function sign(): Signature {
  const message = "Hello";
  const deployerPrivateKey =
    "753b7cc01a1a2e86221266a154af739463fce51219d97e4f856cd7200c3bd2a601";
  const stacksPrivateKey: StacksPrivateKey =
    createStacksPrivateKey(deployerPrivateKey);

  const signature = signMessageHashRsv({
    message: message,
    privateKey: stacksPrivateKey,
  });

  return {
    data: signature.data,
    message,
  };
}
