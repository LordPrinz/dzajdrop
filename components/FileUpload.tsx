import React, { useState } from "react";
import { FileUploader } from "react-drag-drop-files";

function DragDrop() {
	const [file, setFile] = useState([]);
	const handleChange = (file) => {
		setFile((files) => [...files, file]);
	};

	console.log(file);
	return (
		<FileUploader
			className="upload-input"
			handleChange={handleChange}
			name="file"
			maxSize={20480}
		/>
	);
}

export default DragDrop;
