import { useState } from "react";
import { saveFile } from "../utils/database";

const IndexPage = () => {
	const [value, setValue] = useState(null);

	return (
		<div>
			<input
				type="file"
				name="file"
				id="file"
				onChange={(value) => {
					setValue(value.target.files[0]);
				}}
			/>
			<button
				onClick={async () => {
					await saveFile(value, {
						id: "123",
						name: "alfred",
					});
				}}
			>
				Upload
			</button>
		</div>
	);
};

export default IndexPage;
