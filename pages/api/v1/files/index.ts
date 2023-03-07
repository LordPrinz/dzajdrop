import { NextApiRequest, NextApiResponse } from "next";
import rateLimit from "../../../../utils/rateLimit";
import axios from "axios";

const limiter = rateLimit({
	interval: 1000,
	uniqueTokenPerInterval: 500,
});

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	if (req.method === "POST") {
		const form = axios.toFormData({
			file: "text.txt",
		});

		const response = await axios.post("https://api.anonfiles.com/upload", form);

		console.log(response);
	}
}
