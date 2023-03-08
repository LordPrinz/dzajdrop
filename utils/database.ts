import fileSchema from "../models/file-schema";

type data = {
	fullLink: string;
	shortLink: string;
};

export const saveFile = async (data: data) => {
	if (!data) {
		throw new Error("No file provided!");
	}

	if (!data?.fullLink) {
		throw new Error("No fullLink provided!");
	}

	if (!data?.shortLink) {
		throw new Error("No shortLink provided!");
	}

	const response = await (fileSchema as any).insertMany([
		{
			_id: data.shortLink,
			full: data.fullLink,
		},
	]);

	return response;
};
