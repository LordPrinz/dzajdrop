import { useState } from "react";
import FilesList from "../components/FilesList";
import FileUpload from "../components/FileUpload";

const IndexPage = () => {
	const [files, setFiles] = useState([]);

	const addFile = (file) => {
		setFiles((files) => [...files, ...file]);
	};

	const removeFile = (id) => {
		console.log(id);
	};

	return (
		<>
			<div className="upload-container">
				<FileUpload addFile={addFile} />
				<FilesList files={files} removeFiles={removeFile} />
			</div>
		</>
	);
};

export default IndexPage;
