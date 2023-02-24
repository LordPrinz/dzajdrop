import { NextApiRequest, NextApiResponse } from "next";
import { getInfo } from "../../../../../utils/api";
import rateLimit from "../../../../../utils/rateLimit";

const limiter = rateLimit({
	interval: 1000,
	uniqueTokenPerInterval: 500,
});

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	if (req.method === "GET") {
		const { id } = req.query;
		const info = await getInfo(id);

		if (info.status === 404) {
			res.status(404).send("Not Found");
		}
	}

	return res.status(404).send("Not Found");
}
