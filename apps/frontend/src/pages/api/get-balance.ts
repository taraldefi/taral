import { useNetworks } from "@hooks/useNetwork";
import { tokenToNumber } from "@utils/helper";
import { SUSDT_CONTRACT } from "@utils/lib/constants";
import { fetchReadOnlyFunction } from "micro-stacks/api";
import { standardPrincipalCV } from "micro-stacks/clarity";
import type { NextApiRequest, NextApiResponse } from "next";

type ResponseData = {
  message: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  const { currentStacksNetwork } = useNetworks();
  const balance: any = await fetchReadOnlyFunction({
    network: currentStacksNetwork,
    contractAddress: SUSDT_CONTRACT.split(".")[0],
    contractName: SUSDT_CONTRACT.split(".")[1],
    senderAddress: req.query.stxAddress as string,
    functionArgs: [standardPrincipalCV(req.query.stxAddress as string)],
    functionName: "get-balance",
  });
  res
    .status(200)
    .json({ message: tokenToNumber(parseInt(balance), 6).toString() });
}
