import type { GetServerSideProps, NextPage } from "next";
import { download } from "node-annonfiles";
import { getUrl } from "../../helpers/api-util";

const Page: NextPage = () => {
	return <div>Redirecting...</div>;
};

export default Page;

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
	const id = req.url!.slice(1);

	const link = await getUrl(id as string);

	const fileId = link.fileId;

	if (!fileId) {
		return {
			notFound: true,
		};
	}

	const downloadLink = await download(fileId);

	if (!link) {
		return {
			notFound: true,
		};
	}

	return {
		redirect: {
			destination: downloadLink,
			permanent: true,
		},
	};
};
