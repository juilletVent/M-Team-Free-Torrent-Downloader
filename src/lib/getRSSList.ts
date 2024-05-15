import Axios from "axios";
import { parseString as xmlParser } from "xml2js";
import { RSSData } from "../types/RSS";

export async function getRSSList(url: string) {
  const xmlData = await Axios.get(url);

  let jsonData = {};

  xmlParser(xmlData.data, function (err: any, result: any) {
    if (err) {
      throw err;
    }
    jsonData = result;
  });

  return jsonData as RSSData;
}

// 获取两个小时内的数据
export function filterRSSListByTime(rssData: RSSData, time: number) {
  const rssList = rssData.rss.channel[0].item;
  const currentTime = new Date().getTime();
  return rssList.filter((item) => {
    const pubDate = new Date(item.pubDate[0]).getTime();
    return currentTime - pubDate < time;
  });
}
