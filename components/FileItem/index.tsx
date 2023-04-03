import ErrorItem from "./Error";
import Finished from "./Finished";
import ProgressItem from "./Progress";
import useUpload from "./../../hooks/useUpload";
import { useEffect, useState } from "react";
import axios from "axios";

export default ({ file }) => {
	const {
		error,
		progress,
		response,
		isPaused,
		pauseUpload,
		cancelUpload,
		resumeUpload,
	} = useUpload(file);

	const [shortLink, setShortLink] = useState("");
	const [linkError, setLinkError] = useState(null);
	const [showFinished, setShowFinished] = useState(false);
	const [isCancelled, setIsCancelled] = useState(false);

	const cancelHandler = () => {
		cancelUpload();
		setIsCancelled(true);
	};

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

	let component = (
		<ProgressItem
			progress={progress}
			isPaused={isPaused}
			pauseUpload={pauseUpload}
			cancelUpload={cancelHandler}
			resumeUpload={resumeUpload}
		/>
	);

	if (isCancelled) {
		return <ErrorItem error={"Upload cancelled!"} />;
	}

	if (error) {
		component = <ErrorItem error={error} />;
		return component;
	}

	if (showFinished) {
		component = <Finished link={shortLink} />;
	} else if (error) {
		component = <ErrorItem error={error} />;
	} else if (linkError) {
		component = <ErrorItem error={linkError} />;
	}

	return component;
};
