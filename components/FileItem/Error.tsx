import { RxCross2 } from "react-icons/rx";
import FailIcon from "./FailIcon";

export default ({ error }) => {
	console.log(error);
	return (
		<li className="file file--error">
			<div className="flex justify-between items-center relative overflow-hidden py-1.5">
				<div>
					<div
						className="text-l font-bold"
						style={{
							transitionDuration: "0.3s",
							transitionDelay: "0.4s",
						}}
					>
						Error
					</div>
				</div>

				<FailIcon />
			</div>
		</li>
	);
};
