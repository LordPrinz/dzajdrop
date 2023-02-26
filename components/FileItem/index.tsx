import { useEffect, useState } from "react";
import ErrorItem from "./Error";
import Finished from "./Finished";
import ProgressItem from "./Progress";

export default () => {
	const [isFinished, setIsFinished] = useState(false);
	const [hasError, setHasError] = useState(false);
	const [progress, setProgress] = useState(100);

	// useEffect(() => {
	// 	const interval = setInterval(() => {
	// 		if (progress < 100) {
	// 			setProgress((progress) => progress + 1);
	// 		}
	// 	}, 100);
	// }, []);

	if (!isFinished) {
		if (hasError) {
			return <ErrorItem />;
		}
		return <ProgressItem progress={progress} />;
	}

	return <Finished />;
};
