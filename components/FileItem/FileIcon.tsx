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

import { FaJava } from "react-icons/fa";
import { IoLogoJavascript } from "react-icons/io5";
import { SiTypescript } from "react-icons/si";
import { TbBrandPhp } from "react-icons/tb";
import { DiCss3 } from "react-icons/di";

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
    case "java":
      return <FaJava className="file-icon" />;
    case "js":
      return <IoLogoJavascript className="file-icon" />;
    case "ts":
      return <SiTypescript className="file-icon" />;
    case "php":
      return <TbBrandPhp className="file-icon" />;
    case "css":
      return <DiCss3 className="file-icon" />;
    default:
      return <AiOutlineFileUnknown className="file-icon" />;
  }
};
