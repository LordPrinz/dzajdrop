import { useEffect } from "react";

export default ({ link }) => {
	let response = "Generating...";

	if (link) {
		response = link;
	}

	return <li className="file">{response}</li>;
};
