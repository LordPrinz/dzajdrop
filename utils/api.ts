import { Error, Success } from "../interfaces/api";

export const upload = async (
	file: File
): Promise<Success | Error | Response> => {
	const endpoint = "https://api.anonfiles.com/upload";

	const body = new FormData();

	body.append("file", file);

	return (await (
		await fetch(endpoint, {
			method: "POST",
			body,
			headers: {
				Accept: "application/json",
				"Content-Type": "multipart/form-data",
			},
		})
	).json()) as any;
};

export const getInfo = async (
	id: string
): Promise<Success | Error | Response> => {
	const endpoint = `https://api.anonfiles.com/v2/file/${id}/info`;

	return (await (await fetch(endpoint)).json()) as any;
};
