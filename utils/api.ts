import { Error, Success } from "../interfaces/api";

// export const upload = async (file: File): Promise<Success | Error> => {
//   const endpoint = "https://api.anonfiles.com/upload";

//   const data = new FormData();

//   // console.log(file);

//   data.append("file", file);

//   // console.log(data);

//   const res = await fetch(endpoint, {
//     method: "POST",
//     body: data,
//     headers: {
//       "Content-Type": "multipart/form-data",
//     },
//   }).then((data) => data.json());

//   console.log(data);

//   return null;
// };

export const getInfo = async (id: string): Promise<Success | Error> => {
  const endpoint = `https://api.anonfiles.com/v2/file/${id}/info`;

  const res = await fetch(endpoint).then((data) => data.json());

  return res;
};
