import dbConnect from "../lib/dbConnect";
import fileSchema from "../models/file-schema";

export async function getUrl(id: string) {
	await dbConnect();
	const link = await (fileSchema as any).findById(id);

	if (!link) {
		return {
			notFound: true,
		};
	}

	await (fileSchema as any).findOneAndUpdate(
		{ _id: id },
		{ clicks: link.clicks + 1 }
	);

	return link;
}
