import { useEffect, useState } from "react";
import axios from "axios";

export default (file: File) => {
	const [error, setError] = useState(null);
	const [progress, setProgress] = useState(0);
	const [response, setResponse] = useState(null);

	useEffect(() => {
		const url = "/api/upload";

		const formData = new FormData();
		formData.append("file", file);

		axios
			.post(url, formData, {
				onUploadProgress: (progressEvent) => {
					const progress = Math.round(
						(progressEvent.loaded / progressEvent.total) * 100
					);
					setProgress(progress);
				},
			})
			.then((response) => {
				setResponse(response.data.data.file);
			})
			.catch((error) => {
				setError(error);
			});
	}, [file]);

	return [error, progress, response];
};
