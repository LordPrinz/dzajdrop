import { NextApiRequest, NextApiResponse } from "next";
import { getInfo } from "node-annonfiles";
import dbConnect from "../../../../../lib/dbConnect";
import fileSchema from "../../../../../models/file-schema";
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

		await dbConnect();
		const link = await (fileSchema as any).findById(id);

		if (!link) {
			return res.status(404).json({ message: "Page not found!" });
		}

		const { fileId, clicks } = link;

		const additionalData = await getInfo(fileId);

		const { size, name } = additionalData.data.file.metadata;

		return res.status(200).json({ downloads: clicks, size, name });
	}

	return res.status(404).send("Not Found");
}
