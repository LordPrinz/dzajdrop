import { useEffect, useState } from "react";
import axios, { CancelTokenSource } from "axios";
import { AnnonResponse } from "../interfaces/api";

const useUpload = (file: File) => {
	const [error, setError] = useState<Error | null>(null);
	const [progress, setProgress] = useState(0);
	const [response, setResponse] = useState<AnnonResponse | null>(null);
	const [isPaused, setIsPaused] = useState(false);
	const [cancelToken, setCancelToken] = useState<CancelTokenSource | null>(
		null
	);

	const pauseUpload = () => {
		if (cancelToken) {
			cancelToken.cancel("Upload paused");
			setCancelToken(null);
			setIsPaused(true);
		}
	};

	const resumeUpload = () => {
		const newCancelToken = axios.CancelToken.source();
		setCancelToken(newCancelToken);
		setIsPaused(false);

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
				cancelToken: newCancelToken.token,
			})
			.then((response) => {
				setResponse(response.data.data.file);
			})
			.catch((error) => {
				if (!axios.isCancel(error)) {
					setError(error);
				}
			});
	};

	const cancelUpload = () => {
		if (cancelToken) {
			cancelToken.cancel("Upload cancelled");
			setCancelToken(null);
			setIsPaused(false);
			setProgress(0);
		}
	};

	useEffect(() => {
		const newCancelToken = axios.CancelToken.source();
		setCancelToken(newCancelToken);

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
				cancelToken: newCancelToken.token,
			})
			.then((response) => {
				setResponse(response.data.data.file);
			})
			.catch((error) => {
				if (!axios.isCancel(error)) {
					setError(error);
				}
			});

		return () => {
			if (newCancelToken) {
				newCancelToken.cancel("Upload cancelled");
			}
		};
	}, [file]);

	return {
		error,
		progress,
		response,
		isPaused,
		pauseUpload,
		resumeUpload,
		cancelUpload,
	};
};

export default useUpload;
