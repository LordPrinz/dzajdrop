import type { NextPage, GetServerSideProps } from "next";
import Head from "next/head";

import { download, getInfo } from "node-annonfiles";
import FileIcon from "../../components/FileItem/FileIcon";
import dbConnect from "../../lib/dbConnect";
import fileSchema from "../../models/file-schema";

type Props = {
  size: string;
  name: string;
  downloadLink: string;
  extension: string;
};

const StatsPage: NextPage<Props> = (props) => {
  const downloadClickHandler = async () => {
    location.href = props.downloadLink;
  };

  return (
    <>
      <Head>
        <title>File info</title>
      </Head>
      <div className="file-container">
        <div className="items-center  flex rounded-r-full rounded-l-lg tablet:pt-7 tablet:pr-7">
          <FileIcon extension={props.extension} />
          <span className=" pr-4 pl-5">{props.name}</span>
          <span className=" pr-4 pl-4">{props.size}</span>
          <span className="uppercase pl-3">{props.extension}</span>
        </div>
        <button
          className="ml-3 text-[#f8f8f8] pr-6 py-5 rounded-r-full  pl-12 bg-[#4762FB] overflow-hidden relative download-button tablet:py-2 tablet:rounded-full tablet:pl-6 tablet:mb-4 tablet:mt-4"
          onClick={downloadClickHandler}
        >
          Download
        </button>
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

  const { name, size } = fetchedData.data.file.metadata;

  const extensionParts = name.split("_");

  const extension = extensionParts[extensionParts.length - 1];

  const downloadLink = await download(fileId);

  return {
    props: {
      size: size.readable,
      name,
      downloadLink,
      extension,
    },
  };
};
