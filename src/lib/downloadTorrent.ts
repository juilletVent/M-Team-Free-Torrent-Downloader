import Axios from "axios";

export async function downloadTorrent(url: string, id: string) {
  console.log("开始下载种子: ", url);

  const { data, status } = await Axios.get(url, {
    responseType: "arraybuffer",
  });

  if (status !== 200) {
    throw new Error(`下载种子失败: ${status}`);
  }

  return {
    data,
    fileName: `${id}.torrent`,
  };
}
