import formidable from "formidable";
import { NextApiHandler } from "next";

export const config = {
	api: {
		bodyParser: false,
	},
};

const handler: NextApiHandler = (req, res) => {
	const form = formidable();

	form.parse(req, (err, fields, files) => {
		console.log(files);
	});
};

export default handler;
