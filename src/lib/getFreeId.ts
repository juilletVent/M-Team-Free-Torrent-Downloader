import Axios from "axios";
import { stringify } from "querystring";
var FormData = require("form-data");
import moment from "moment";
import _ from "lodash";
import { DetailInfoI, DetailResponse } from "../types/DetailInfo";

export async function getFreeId(
  idList: string[],
  token: string,
  minSize: number
) {
  const result: DetailInfoI[] = [];

  try {
    for (let i = 0; i < idList.length; i++) {
      const id = idList[i];

      const data = new FormData();
      data.append("id", id);

      const response = await Axios.post<DetailResponse>(
        "https://api.m-team.cc/api/torrent/detail",
        data,
        {
          headers: {
            "Cache-Control": "no-cache",
            "x-api-key": token,
          },
        }
      );

      await new Promise((resolve) => setTimeout(resolve, 1000));

      if (
        response.status === 200 &&
        !_.isNil(_.get(response, "data.data.status"))
      ) {
        console.log(
          "获取种子信息成功: %s \t %s \t %s",
          id,
          response.data.data.status.discount,
          response.data.data.smallDescr
        );

        // 符合大小要求的种子
        if (+response.data.data.size >= minSize) {
          result.push(response.data.data);
        }
      } else {
        console.error("[ERROR] 获取种子信息失败: ", response.data);
      }
    }
  } catch (error) {
    console.error("[ERROR] 获取种子信息失败: ", error);
  }

  return result
    .filter((data) => {
      const { status } = data;
      const inFreeTimeRange =
        _.isNil(status.discountEndTime) ||
        moment(status.discountEndTime).isAfter(moment());
      // 免费，且在免费时间范围内
      return status.discount === "FREE" && inFreeTimeRange;
    })
    .map((item) => item.id);
}
