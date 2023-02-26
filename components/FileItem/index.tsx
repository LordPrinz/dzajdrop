import { useState } from "react";
import ErrorItem from "./Error";
import Finished from "./Finished";
import ProgressItem from "./Progress";

export default () => {
	const [isFinished, setIsFinished] = useState(false);
	const [hasError, setHasError] = useState(false);
	const [progress, setProgress] = useState(0);

	if (!isFinished) {
		if (hasError) {
			return <ErrorItem />;
		}
		return <ProgressItem progress={progress} />;
	}

	return <Finished />;
};
