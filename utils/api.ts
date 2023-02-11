import { Error, Success } from "../interfaces/api";

export const upload = async (
	file: File
): Promise<Success | Error | Response> => {
	const endpoint = "https://api.anonfiles.com/upload";

	const body = new FormData();

	body.append("file", file, file.name);

	const response = await fetch(endpoint, {
		method: "POST",
		body,
		mode: "no-cors",
		headers: {
			"Content-Type": "multipart/form-data",
		},
		redirect: "follow",
	});

	console.log(response);

	return response as any;
};

export const getInfo = async (id: string) => {
	const endpoint = `https://api.anonfiles.com/v2/file/${id}/info`;

	const response = await fetch(endpoint);

	console.log(response);
};

// 	return (await (
// 		await fetch(endpoint, {
// 			mode: "no-cors",
// 		})
// 	).json()) as any;
// };
