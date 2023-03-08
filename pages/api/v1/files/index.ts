import { IncomingForm } from "formidable";
import { NextApiHandler } from "next";
import { upload } from "node-annonfiles";
import path from "path";
import dbConnect from "../../../../lib/dbConnect";
import { saveFile } from "../../../../utils/database";
import rateLimit from "../../../../utils/rateLimit";
import { generateShortLink } from "../../../../utils/shorter";

export const config = {
	api: {
		bodyParser: false,
	},
};

const limiter = rateLimit({
	interval: 1000,
	uniqueTokenPerInterval: 500,
});

const handler: NextApiHandler = async (req, res) => {
	try {
		await limiter.check(res, 3, process.env.token!); // 3 requests per secound
	} catch {
		return res.status(429).json({ error: "Rate limit exceeded" });
	}

	if (req.method === "POST") {
		await dbConnect();

		const form = new IncomingForm();

		form.on("fileBegin", (name, file) => {
			const newPath = file.filepath.slice(0, -25);
			file.filepath = path.join(newPath, file.originalFilename);
		});

		form.parse(req, async (err, fields, files) => {
			if (err) {
				console.error(err);
				return;
			}

			const path = (files.file as any).filepath;

			try {
				const fileData = await upload({
					file: path,
					key: null,
				});
				if (!fileData.status) {
					throw new Error("Upload failed!");
				}
				console.log(fileData);

				const fileId = fileData.data.file.metadata.id;

				const shortLink = generateShortLink(fileId);

				// console.log(shortLink);

				const response = await saveFile({
					fileId,
					shortLink,
				});

				console.log(response);

				return res.status(201).send({
					url: shortLink,
				});
			} catch (err) {
				console.error(err);
				return res.status(500).send({
					message: "Something went wrong!",
				});
			}
		});
		return;
	}

	const url = `${req.headers.host}/404`;
	const fetchRes = await fetch(`https://${url}`);
	const notFoundPage = await fetchRes.text();
	return res.status(404).send(notFoundPage);
};

export default handler;
