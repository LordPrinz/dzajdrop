import Image from "next/image";
import React, { useState } from "react";
import { FileUploader } from "react-drag-drop-files";
import uploadIcon from "./../public/upload-file.png";

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
				<div className="upload__icon-container">
					<Image className="upload__icon" src={uploadIcon} alt="Folders icon" />
				</div>
				<p>
					Drop your file here, or <span className="text-main-blue">browse</span>
				</p>
			</div>
		</FileUploader>
	);
}

export default DragDrop;
