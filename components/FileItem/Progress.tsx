import { useEffect, useState } from "react";

export default ({ progress }) => {
	const [isEndAnimation, setIsEndAnimation] = useState(false);

	useEffect(() => {
		if (progress === 100) {
			setTimeout(() => {
				setIsEndAnimation(true);
			}, 50);
		}
	}, [progress]);

	if (isEndAnimation) {
		console.log("XD");
	}

	return (
		<li className="file">
			<div
				className="absolute top-0 -left-full w-full h-full bg-main-lighterGrey -z-10 transition"
				style={{
					transform: `translateX(${progress}%)`,
				}}
			></div>
			<div className="flex justify-between items-center relative overflow-hidden pb-3">
				<div>
					<div className="text-sm mb-1 font-bold">Uploading...</div>
					<div className="text-xs font-normal text-main-grey">
						{progress}% &#183; 10 seconds left
					</div>
				</div>
				<div>PAUSE</div>
				<div
					className="absolute bg-main-blue w-full bottom-1 -left-[110%] h-0.5 transition"
					style={{
						transform: `translateX(${
							isEndAnimation
								? "210"
								: progress < 30
								? progress * 1.1
								: progress * 1.1
						}%)`,
						transitionDuration: "0.4s",
					}}
				></div>
			</div>
		</li>
	);
};
