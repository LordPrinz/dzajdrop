import FileItem from "./FileItem";

export default ({ files, removeFiles }) => {
	const filesList = (
		<ul className="list-none">
			{files.map((file, index) => (
				<FileItem key={index} />
			))}
		</ul>
	);
	return filesList;
};
