import {
  createStacksPrivateKey,
  signMessageHashRsv,
  StacksPrivateKey,
} from "lib-stacks";

import { PrivateKey } from "./constants";

export interface Signature {
  data: string;
  message: string;
}

export function sign(): Signature {
  const message = "Hello";
  const stacksPrivateKey: StacksPrivateKey = createStacksPrivateKey(PrivateKey);

  const signature = signMessageHashRsv({
    message: message,
    privateKey: stacksPrivateKey,
  });

  return {
    data: signature.data,
    message,
  };
}
