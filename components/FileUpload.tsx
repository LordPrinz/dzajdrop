import React, { useState } from "react";
import { FileUploader } from "react-drag-drop-files";

function DragDrop() {
	const [file, setFile] = useState([]);
	const handleChange = (file) => {
		setFile((files) => [...files, file]);
	};

	return (
		<FileUploader
			label="Drop your file here, or browse"
			handleChange={handleChange}
			name="file"
			maxSize={20480}
		>
			<div className="upload-input">
				<p>
					Drop your file here, or <span className="text-main-blue">browse</span>
				</p>
			</div>
		</FileUploader>
	);
}

export default DragDrop;
