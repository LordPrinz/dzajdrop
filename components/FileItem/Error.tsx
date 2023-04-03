import FailIcon from "./FailIcon";
import { useState, useEffect } from "react";
export default ({ error }) => {
	const [isVisible, setIsVisible] = useState(true);

	const deleteElement = () => {
		setIsVisible(false);
	};

	if (!isVisible) {
		return null;
	}

	return (
		<li className="file file--error" onClick={deleteElement}>
			<div className="flex justify-between items-center relative overflow-hidden py-1.5">
				<div>
					<div
						className="text-l font-bold"
						style={{
							transitionDuration: "0.3s",
							transitionDelay: "0.4s",
						}}
					>
						{typeof error === "string" ? error : "Error!"}
					</div>
				</div>

				<FailIcon />
			</div>
		</li>
	);
};
