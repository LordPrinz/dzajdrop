import ErrorItem from "./Error";
import Finished from "./Finished";
import ProgressItem from "./Progress";
import useUpload from "./../../hooks/useUpload";
import { useEffect, useState } from "react";
import axios from "axios";
export default ({ file }) => {
	const [error, progress, response] = useUpload(file);

	const [shortLink, setShortLink] = useState("");
	const [linkError, setLinkError] = useState(null);

	useEffect(() => {
		if (!response) {
			return;
		}
		axios
			.post("/api/v1/files", {
				id: response.metadata.id,
			})
			.then((response) => {
				setShortLink(response.data.shortLink);
			})
			.catch((err) => {
				setLinkError("Error while creating link!");
			});
	}, [response]);

	let component = <ProgressItem progress={progress} />;

	if (progress === 100) {
		component = <Finished link={shortLink} />;
	}

	if (error) {
		component = <ErrorItem error={error} />;
	}

	if (linkError) {
		component = <ErrorItem error={linkError} />;
	}

	return <ProgressItem progress={progress} />;
};
