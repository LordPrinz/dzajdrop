export const upload = async (file: File) => {
	const endpoint = "https://api.anonfiles.com/upload";

	const body = new FormData();

	body.append("file", file);

	return await fetch(endpoint, {
		method: "POST",
		body,
		headers: {
			Accept: "application/json",
			"Content-Type": "multipart/form-data",
		},
	});
};

export const getInfo = async (id: string) => {
	const endpoint = `https://api.anonfiles.com/v2/file/${id}/info`;

	return await fetch(endpoint);
};
