import { nanoid } from "nanoid";
import { NextApiHandler } from "next";
import dbConnect from "../../../../lib/dbConnect";
import fileSchema from "../../../../models/file-schema";
import { saveFile } from "../../../../utils/database";
import generateRandom from "../../../../utils/generateRandom";
import rateLimit from "../../../../utils/rateLimit";

const limiter = rateLimit({
	interval: 1000,
	uniqueTokenPerInterval: 500,
});

const handler: NextApiHandler = async (req, res) => {
	try {
		await limiter.check(res, 20, process.env.token!); // 20 requests per secound
	} catch {
		return res.status(429).json({ error: "Rate limit exceeded" });
	}

	if (req.method !== "POST") {
		return res.status(405).json({ error: "Method Not Allowed" });
	}

	await dbConnect();

	const fileId = req.body.id;

	const link = await (fileSchema as any).findOne({ fileId });

	if (link) {
		return res.status(201).json({ message: "Created", url: link._id });
	}

	let isGenerated = false;
	let shortLink: string;

	while (!isGenerated) {
		shortLink = nanoid(generateRandom(3, 8));
		const link = await (fileSchema as any).findOne({ _id: shortLink });
		if (link) {
			continue;
		}

		isGenerated = true;
	}

	await saveFile({
		shortLink,
		fileId,
	});

	return res.status(201).json({ message: "Created", shortLink });
};

export default handler;
