import Axios from "axios";

export async function downloadTorrent(url: string) {
  console.log("开始下载种子: ", url);

  const { data, status, headers } = await Axios.get(url, {
    responseType: "arraybuffer",
  });

  if (status !== 200) {
    throw new Error(`下载种子失败: ${status}`);
  }

  const fileName = Buffer.from(headers["content-disposition"], "ascii")
    .toString()
    .match(/filename=\"(.*)\"/)![1];

  return {
    data,
    fileName,
  };
}
