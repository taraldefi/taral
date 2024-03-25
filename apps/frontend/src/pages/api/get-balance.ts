import type { NextApiRequest, NextApiResponse } from "next";
import { SUSDT_CONTRACT, stacksNetwork } from "@utils/lib/constants";
import { tokenToNumber } from "@utils/helper";
import { fetchReadOnlyFunction } from "micro-stacks/api";
import { standardPrincipalCV } from "micro-stacks/clarity";
import { NextRequest, NextResponse } from "next/server";

type ResponseData = {
  message: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  const balance: any = await fetchReadOnlyFunction({
    network: new stacksNetwork(),
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
