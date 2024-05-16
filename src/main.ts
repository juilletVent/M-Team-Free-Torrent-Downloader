import { existsSync, mkdirSync, writeFileSync } from "fs";
import { join } from "path";
import { downloadTorrent } from "./lib/downloadTorrent";
import {
  filterCategoriesListByDiscount,
  getCategoriesList,
} from "./lib/getCategoriesList";
import { filterRSSListByTime, getRSSList } from "./lib/getRSSList";
import { RSSItem } from "./types/RSS";
import { CategoriesItem } from "./types/Categories";
import { notDownLoaded } from "./lib/notDownLoaded";
import { Config } from "./types/Config";

const config = require("../config.json") as Config;
const { rssURL, token, categories, savePath, freshTime } = config;

async function main() {
  let freeList: CategoriesItem[];
  let rssItems: RSSItem[];

  try {
    const rssList = await getRSSList(rssURL);
    rssItems = filterRSSListByTime(rssList, freshTime * 1000);

    // 打印出最近15天的RSS列表
    console.log("[1/5] 最近的新鲜RSS列表");
    rssItems.forEach((item) => {
      console.log("id: %s title: %s", item.guid[0]._, item.title[0]);
    });
  } catch (error) {
    return console.error("[ERROR] 获取RSS列表失败: ", error);
  }

  try {
    const frontList = await getCategoriesList(categories, token);
    freeList = filterCategoriesListByDiscount(frontList, "FREE");

    console.log("[2/5] 免费种子列表");
    freeList.forEach((item) => {
      console.log("id: %s title: %s", item.id, item.name);
    });
  } catch (error) {
    return console.error("[ERROR] 获取免费种子列表失败: ", error);
  }

  const freeListIds = freeList.map((item) => item.id);
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
