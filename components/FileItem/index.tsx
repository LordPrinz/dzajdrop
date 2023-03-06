import axios from "axios";
import { useEffect, useState } from "react";
import ErrorItem from "./Error";
import Finished from "./Finished";
import ProgressItem from "./Progress";

export default ({ file }) => {
	const [isFinished, setIsFinished] = useState(false);
	const [hasError, setHasError] = useState(false);
	const [progress, setProgress] = useState(0);

	useEffect(() => {
		// const formData
	}, []);

	// useEffect(() => {
	// 	setTimeout(() => {
	// 		setProgress(10);
	// 	}, 100);
	// 	setTimeout(() => {
	// 		setProgress(30);
	// 	}, 200);
	// 	setTimeout(() => {
	// 		setProgress(50);
	// 	}, 300);
	// 	setTimeout(() => {
	// 		setProgress(60);
	// 	}, 400);
	// 	setTimeout(() => {
	// 		setProgress(80);
	// 	}, 500);
	// 	setTimeout(() => {
	// 		setProgress(90);
	// 		// setHasError(true);
	// 	}, 600);
	// 	setTimeout(() => {
	// 		setProgress(99);
	// 	}, 700);
	// 	setTimeout(() => {
	// 		setProgress(100);
	// 	}, 800);
	// }, []);

	// useEffect(() => {
	// 	if (progress === 100) {
	// 		setTimeout(() => {
	// 			setIsFinished(true);
	// 		}, 1300);
	// 	}
	// }, [progress]);

	if (hasError) {
		return <ErrorItem />;
	}

	if (!isFinished) {
		return <ProgressItem progress={progress} />;
	}

	return <Finished />;
};
