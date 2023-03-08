import { NextApiRequest, NextApiResponse } from "next";
import { download } from "node-annonfiles";
import { getUrl } from "../../../../../helpers/api-util";
import rateLimit from "../../../../../utils/rateLimit";

const limiter = rateLimit({
	interval: 1000,
	uniqueTokenPerInterval: 500,
});

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	try {
		await limiter.check(res, 3, process.env.token!); // 3 requests per secound
	} catch {
		return res.status(429).json({ error: "Rate limit exceeded" });
	}

	if (req.method === "GET") {
		const { id } = req.query;

		const link = await getUrl(id as string);

		const fileId = link.fileId;

		if (!fileId) {
			return res.status(404).json({ message: "Page not found!" });
		}

		const downloadLink = await download(fileId);

		return res.status(200).json({ downloadLink });
	}
}
