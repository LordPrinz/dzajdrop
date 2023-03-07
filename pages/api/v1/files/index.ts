import { IncomingForm } from "formidable";
import { NextApiHandler } from "next";
import { upload, download } from "node-annonfiles";
import fs from "fs";
import path from "path";
import { saveFile } from "../../../../utils/database";
import { generateShortLink } from "../../../../utils/shorter";

export const config = {
	api: {
		bodyParser: false,
	},
};

const handler: NextApiHandler = async (req, res) => {
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

			res.send({
				fullLink,
			});

			const shortLink = generateShortLink(fullLink);

			const response = await saveFile({
				fullLink,
				shortLink: "",
			});
		} catch (err) {
			console.error(err);
		}
	});
};

export default handler;
