import { useEffect, useState } from "react";
import axios from "axios";

export default (file: File) => {
	const [isFinished, setIsFinished] = useState(false);
	const [error, setError] = useState(null);
	const [progress, setProgress] = useState(0);
	const [response, setResponse] = useState(null);

	useEffect(() => {
		const formData = new FormData();
		formData.append("file", file);

		const config = {
			onUploadProgress: (progressEvent) => {
				const percentCompleted = Math.round(
					(progressEvent.loaded * 100) / progressEvent.total
				);
				setProgress(percentCompleted);
			},
		};

		axios
			.post("/api/v1/files", formData, config)
			.then((response) => {
				setResponse(response);
			})
			.catch((error) => {
				setError(error);
			});

		setIsFinished(true);
	}, [file]);

	return [isFinished, error, progress, response];
};
