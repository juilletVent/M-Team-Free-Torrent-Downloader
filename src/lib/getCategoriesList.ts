import Axios from "axios";
import { CategoriesData } from "../types/Categories";

export async function getCategoriesList(categories: string[], token: string) {
  const { data } = await Axios.post(
    "https://api.m-team.cc/api/torrent/search",
    {
      mode: "normal",
      categories,
      visible: 1,
      pageNumber: 1,
      pageSize: 100,
    },
    {
      headers: {
        "x-api-key": token,
      },
    }
  );
  return data as CategoriesData;
}

export function filterCategoriesListByDiscount(
  data: CategoriesData,
  discount: string
) {
  return data.data.data.filter((item) => item.status.discount === discount);
}
