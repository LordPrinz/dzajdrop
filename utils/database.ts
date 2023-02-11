// import { upload } from "./api";

type data = {
	id: string;
	path?: string;
};

export const saveFile = async (file: File, data: data) => {
	if (!file) {
		throw new Error("No file provided!");
	}

	if (!data?.id) {
		throw new Error("No id provided!");
	}

	// const response = await upload(file);

	// if (!response.status) {
	// throw new Error((response as any).error.message);
	// }

	// console.log(response);

	// save to mongo
};
