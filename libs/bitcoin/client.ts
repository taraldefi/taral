import { RPCClient } from "rpc-bitcoin";

export function getRpcClient(): RPCClient {
  const client = new RPCClient({
    url: "http://localhost",
    port: parsePort("18443"),
    user: "blockstack",
    pass: "blockstacksystem",
    timeout: 120000,
  });

  return client;
}

function parsePort(portVal: number | string | undefined): number | undefined {
  if (portVal === undefined) {
    return undefined;
  }
  if (/^[-+]?(\d+|Infinity)$/.test(portVal.toString())) {
    const port = Number(portVal);
    if (port < 1 || port > 65535) {
      throw new Error(`Port ${port} is invalid`);
    }
    return port;
  } else {
    throw new Error(`Port ${portVal} is invalid`);
  }
}
