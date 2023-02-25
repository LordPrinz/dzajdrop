import Image from "next/image";
import React, { useState } from "react";
import { FileUploader } from "react-drag-drop-files";
import uploadIcon from "./../public/upload-file.png";

function DragDrop() {
	const [files, setFiles] = useState([]);
	const [isDragging, setIsDragging] = useState(false);

	const handleChange = (file) => {
		setFiles((files) => [...files, ...file]);
	};

	const dragChangeHandler = (isDragging) => {
		setIsDragging(isDragging);
	};

	return (
		<FileUploader
			label="Drop your file here, or browse"
			handleChange={handleChange}
			name="file"
			maxSize={20480}
			hoverTitle={" "}
			multiple={true}
			dropMessageStyle={{
				backgroundColor: "transparent",
				border: 0,
			}}
			classes="file-uploader-cleaner"
			onDraggingStateChange={dragChangeHandler}
		>
			<div
				className={`upload-input ${
					isDragging
						? "bg-main-lighterBlue !border-main-darkBlue transition"
						: ""
				}`}
			>
				<div
					className={`upload__icon-container ${
						isDragging ? "-translate-y-1.5 transition" : ""
					}`}
				>
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
