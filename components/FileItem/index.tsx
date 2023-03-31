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
	const [showFinished, setShowFinished] = useState(false);

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

	useEffect(() => {
		if (progress === 100) {
			setTimeout(() => setShowFinished(true), 1800);
		}
	}, [progress]);

	let component = <ProgressItem progress={progress} link={shortLink} />;

	if (showFinished) {
		component = <Finished link={shortLink} />;
	} else if (error) {
		component = <ErrorItem error={error} />;
	} else if (linkError) {
		component = <ErrorItem error={linkError} />;
	}

	return component;
};
