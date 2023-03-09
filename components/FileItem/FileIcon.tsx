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
			return <AiOutlineFileGif />;
		case "pdf":
			return <AiOutlineFilePdf />;
		case "zip":
			return <AiOutlineFileZip />;
		case "xls":
			return <AiOutlineFileExcel />;
		case "xlsx":
			return <AiOutlineFileExcel />;
		case "txt":
			return <AiOutlineFileText />;
		case "ppt":
			return <AiOutlineFilePpt />;
		case "docx":
			return <AiOutlineFileWord />;
		default:
			return <AiOutlineFileUnknown />;
	}
};
