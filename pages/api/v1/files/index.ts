import { IncomingForm } from "formidable";
import { nanoid } from "nanoid";
import { NextApiHandler } from "next";
import { upload } from "node-annonfiles";
import path from "path";
import dbConnect from "../../../../lib/dbConnect";
import fileSchema from "../../../../models/file-schema";
import { saveFile } from "../../../../utils/database";
import generateRandom from "../../../../utils/generateRandom";
import rateLimit from "../../../../utils/rateLimit";

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

				const response = await saveFile({
					shortLink,
					fileId,
				});

				return res.status(201).json({ message: "Created", shortLink });
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
