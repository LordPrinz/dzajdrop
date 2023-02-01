import fileSchema from "../models/file-schema";
import { upload } from "./api";

type data = {
	id: string;
	path?: string;
	name: string;
};

export const saveFile = async (file: File, data: data) => {
	if (!file) {
		throw new Error("No file provided!");
	}

	if (!data?.id) {
		throw new Error("No id provided!");
	}

	const response = await upload(file);

	if (!response.status) {
		throw new Error((response as any).error.message);
	}

	await (fileSchema as any).insertMany([
		{
			id: (response as any).data.metadata.id as string,
			name: data.name,
			path: data.path || "/",
			userId: data.id,
		},
	]);
};
