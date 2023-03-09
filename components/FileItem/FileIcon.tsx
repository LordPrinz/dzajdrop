import {
	AiOutlineFileExcel,
	AiOutlineFileGif,
	AiOutlineFileJpg,
	AiOutlineFilePdf,
	AiOutlineFilePpt,
	AiOutlineFileText,
	AiOutlineFileUnknown,
	AiOutlineFileWord,
	AiOutlineFileZip,
} from "react-icons/ai";

export default ({ extension }) => {
	switch (extension) {
		case "jpg":
			return <AiOutlineFileJpg className="file-icon" />;
		case "gif":
			return <AiOutlineFileGif className="file-icon" />;
		case "pdf":
			return <AiOutlineFilePdf className="file-icon" />;
		case "zip":
			return <AiOutlineFileZip className="file-icon" />;
		case "xls":
			return <AiOutlineFileExcel className="file-icon" />;
		case "xlsx":
			return <AiOutlineFileExcel className="file-icon" />;
		case "txt":
			return <AiOutlineFileText className="file-icon" />;
		case "ppt":
			return <AiOutlineFilePpt className="file-icon" />;
		case "docx":
			return <AiOutlineFileWord className="file-icon" />;
		default:
			return <AiOutlineFileUnknown className="file-icon" />;
	}
};
