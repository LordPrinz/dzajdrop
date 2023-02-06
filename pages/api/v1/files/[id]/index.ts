import { NextApiRequest, NextApiResponse } from "next";
import rateLimit from "../../../../../utils/rateLimit";

const limiter = rateLimit({
  interval: 1000,
  uniqueTokenPerInterval: 500,
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {}
