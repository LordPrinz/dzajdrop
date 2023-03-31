import { useEffect, useState } from "react";
import LinkCopier from "../Copier";

export default ({ link }) => {
	const [dots, setDots] = useState(0);

	useEffect(() => {
		const interval = setInterval(() => {
			setDots((dots) => (dots + 1) % 4);
		}, 400);
		return () => clearInterval(interval);
	}, []);

	return (
		<li className="file2 bg-main-lighterGrey ">
			{!link ? (
				<div className="py-3 px-5">
					Generating link{Array.from({ length: dots }).map((_, i) => ".")}
				</div>
			) : (
				<div>
					<LinkCopier url={link} />
				</div>
			)}
		</li>
	);
};
