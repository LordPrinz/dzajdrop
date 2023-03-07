// import { upload } from "./api";

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

	// save to mongo
};
