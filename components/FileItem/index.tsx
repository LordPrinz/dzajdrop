import ErrorItem from "./Error";
import Finished from "./Finished";
import ProgressItem from "./Progress";
import useUpload from "./../../hooks/useUpload";

export default ({ file }) => {
	const [error, progress, response] = useUpload(file);

	if (response) {
		console.log(response);
	}

	if (error) {
		return <ErrorItem error={error} />;
	}

	return <ProgressItem progress={progress} />;
};
