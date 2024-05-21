import { existsSync, mkdirSync, writeFileSync } from "fs";
import { join } from "path";
import { downloadTorrent } from "./lib/downloadTorrent";
import { filterRSSListByTime, getRSSList } from "./lib/getRSSList";
import { RSSItem } from "./types/RSS";
import { notDownLoaded } from "./lib/notDownLoaded";
import { Config } from "./types/Config";
import { getFreeId } from "./lib/getFreeId";

const config = require("../config.json") as Config;
const { rssURL, token, savePath, freshTime, minSize } = config;

async function main() {
  let rssItems: RSSItem[];

  try {
    console.log("[1/5] 获取最近的新鲜RSS列表");
    const rssList = await getRSSList(rssURL);
    rssItems = filterRSSListByTime(rssList, freshTime * 1000);

    // 打印出最近新鲜的RSS列表
    rssItems.forEach((item) => {
      console.log("id: %s title: %s", item.guid[0]._, item.title[0]);
    });
  } catch (error) {
    return console.error("[ERROR] 获取RSS列表失败: ", error);
  }

  // 过滤出免费的种子列表
  const allResourceId = rssItems.map((item) => item.guid[0]._);
  const freeListIds = await getFreeId(allResourceId, token, minSize);

  const freeRSSItems = rssItems.filter(
    (item) =>
      freeListIds.includes(item.guid[0]._) &&
      notDownLoaded(item.guid[0]._, savePath)
  );

  if (freeRSSItems.length === 0) {
    return console.log("[DONE] 没有需要下载的种子文件");
  }

  console.log("[3/5] 免费种子RSS列表");
  freeRSSItems.forEach((item) => {
    console.log(
      "id: %s title: %s url: %s",
      item.guid[0]._,
      item.title[0],
      item.enclosure[0].$.url
    );
  });

  console.log("[4/5] 开始下载种子文件...");

  const allTask = freeRSSItems.map((item) =>
    downloadTorrent(item.enclosure[0].$.url)
  );

  const allResult = await Promise.all(allTask);

  // 判断savePath文件夹是否存在，不存在则创建
  if (!existsSync(savePath)) {
    console.log("创建目录：%s", savePath);
    mkdirSync(savePath);
  }

  allResult.forEach((item) => {
    console.log("[5/5] 写出种子文件：%s", item.fileName);
    writeFileSync(join(savePath, item.fileName), item.data);
  });

  console.log("[DONE] 执行完成，种子文件保存在：%s", savePath);
}

main();
