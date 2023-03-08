import { IncomingForm } from "formidable";
import { NextApiHandler } from "next";
import { upload } from "node-annonfiles";
import path from "path";
import dbConnect from "../../../../lib/dbConnect";
import { saveFile } from "../../../../utils/database";
import { generateShortLink } from "../../../../utils/shorter";

export const config = {
	api: {
		bodyParser: false,
	},
};

const handler: NextApiHandler = async (req, res) => {
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

				const fullLink = fileData.data.file.url.short;

				const shortLink = generateShortLink(fullLink);

				// console.log(shortLink);

				const response = await saveFile({
					fullLink,
					shortLink,
				});

				console.log(response);

				return res.status(201).send({
					url: shortLink,
				});
			} catch (err) {
				return console.error(err);
			}
		});
	}

	// const url = `${req.headers.host}/404`;
	// const fetchRes = await fetch(`https://${url}`);
	// const notFoundPage = await fetchRes.text();
	// return res.status(404).send(notFoundPage);
};

export default handler;
