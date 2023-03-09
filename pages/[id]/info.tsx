import type { NextPage, GetServerSideProps } from "next";
import Head from "next/head";
import { getInfo } from "node-annonfiles";
import dbConnect from "../../lib/dbConnect";
import fileSchema from "../../models/file-schema";

type Props = {
	size: string;
	name: string;
	id: string;
};

const StatsPage: NextPage<Props> = (props) => {
	return (
		<>
			<Head>
				<title>D</title>
			</Head>
			<div className="upload-container">Less go</div>
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

	const info = fetchedData.data.file.metadata;

	return {
		props: {
			size: info.size.readable,
			name: info.name,
			id: info.id,
		},
	};
};
