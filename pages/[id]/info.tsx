import type { NextPage, GetServerSideProps } from "next";
import Head from "next/head";
import { getInfo } from "node-annonfiles";
import FileIcon from "../../components/FileItem/FileIcon";
import dbConnect from "../../lib/dbConnect";
import fileSchema from "../../models/file-schema";

type Props = {
	size: string;
	name: string;
	id: string;
	extension: string;
};

const StatsPage: NextPage<Props> = (props) => {
	const downloadClickHandler = () => {
		console.log("XD");
	};

	return (
		<>
			<Head>
				<title>{props.name} | info</title>
			</Head>
			<div className="file-container">
				<FileIcon extension={props.extension} />
				<span>{props.name}</span>
				<span>{props.size}</span>
				<span>{props.extension}</span>
				<button onClick={downloadClickHandler}>Download</button>
			</div>
		</>
	);
};

export default StatsPage;

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
	const url = req.url?.slice(1).split("/")[0];

	await dbConnect();

	const link = await (fileSchema as any).findById(url);

	if (!link) {
		return {
			notFound: true,
		};
	}

	const { fileId } = link;

	const fetchedData = await getInfo(fileId);

	const { name, id, size } = fetchedData.data.file.metadata;

	const extensionParts = name.split("_");

	const extension = extensionParts[extensionParts.length - 1];

	return {
		props: {
			size: size.readable,
			name,
			id,
			extension,
		},
	};
};
