import { useEffect, useState } from "react";

export default () => {
	const [opacity, setOpacity] = useState(0);

	useEffect(() => {
		setTimeout(() => {
			setOpacity(1);
		}, 250);
	}, []);

	return (
		<div
			className="rounded-full bg-[#FFCDD2] p-2 text-[#e6f8f0]"
			style={{ opacity, transition: "0.3s" }}
		>
			<div className="w-5 h-5 border-2 border-[#F44336] rounded-full p-  relative">
				<div className="w-0.5 h-[17px] bg-[#F44336] left-1/2 top-0 translate-x-0  -translate-y-0.5 absolute rotate-[45deg] z-10"></div>
				<div className="w-1.5 h-2.5 bg-[#FFCDD2] left-1/2 top-0.5 translate-x-[3px] -translate-y-[5px] absolute rotate-[35deg] z-0"></div>
				<div className="w-0.5 h-3 bg-[#F44336] left-1/2 top-1/2 -translate-x-[1px] -translate-y-1/2 absolute rotate-[135deg] z-0"></div>
			</div>
		</div>
	);
};
