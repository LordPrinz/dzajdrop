import ErrorItem from "./Error";
import Finished from "./Finished";
import ProgressItem from "./Progress";
import useUpload from "./../../hooks/useUpload";
import { useEffect, useState } from "react";
import axios from "axios";
export default ({ file }) => {
	const [error, progress, response] = useUpload(file);

	const [shortLink, setShortLink] = useState("");

	useEffect(() => {
		if (!response) {
			return;
		}
		axios
			.post("/api/v1/files", {
				id: response.metadata.id,
			})
			.then((response) => {
				console.log(response);
			});
	}, [response]);

	if (error) {
		return <ErrorItem error={error} />;
	}

	return <ProgressItem progress={progress} />;
};
