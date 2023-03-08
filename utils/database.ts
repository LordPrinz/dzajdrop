import fileSchema from "../models/file-schema";

type data = {
	fileId: string;
	shortLink: string;
};

export const saveFile = async (data: data) => {
	if (!data) {
		throw new Error("No file provided!");
	}

	if (!data?.fileId) {
		throw new Error("No fullLink provided!");
	}

	if (!data?.shortLink) {
		throw new Error("No shortLink provided!");
	}

	// console.log(data.fileId, data.shortLink);

	const response = await (fileSchema as any).insertMany([
		{
			_id: data.shortLink,
			fileId: data.fileId,
		},
	]);

	return response;
};
