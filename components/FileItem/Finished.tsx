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
		<li className="file">
			{!link ? (
				<span>
					Generating link{Array.from({ length: dots }).map((_, i) => ".")}
				</span>
			) : (
				<div>
					<LinkCopier url={link} />
				</div>
			)}
		</li>
	);
};
