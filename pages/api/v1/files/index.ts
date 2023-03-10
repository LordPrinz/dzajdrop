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
import fs from "fs";
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

		form.on("fileBegin", async (name, file) => {
			const baseDirectory = path.dirname(file.filepath);
			const dateFolder = Date.now().toString();

			const destDirectory = path.join(baseDirectory, dateFolder);

			fs.mkdir(destDirectory, (err) => {
				if (err) {
					console.log(err);
				}
			});
			file.filepath = path.join(destDirectory, file.originalFilename);
		});

		form.parse(req, async (err, fields, files) => {
			if (err) {
				console.error(err);
				return;
			}

			const fPath = (files.file as any).filepath;

			const dirname = path.dirname(fPath);

			try {
				const fileData = await upload({
					file: fPath,
					key: null,
				});

				(fs as any).rm(dirname, { recursive: true }, (err) => {
					// deprecationWarning forced me to use rm but its not in the types
					if (err) {
						console.log(err);
					}
				});

				if (!fileData.status) {
					throw new Error("Upload failed!");
				}

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
