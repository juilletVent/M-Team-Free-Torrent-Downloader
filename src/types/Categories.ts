export type CategoriesItemStatus = {
  id: string;
  createdDate: string;
  lastModifiedDate: string;
  pickType: string;
  toppingLevel: number;
  toppingEndTime: string;
  /** 折扣，如果是免费，则为FREE */
  discount: string;
  /** 折扣结束时间 */
  discountEndTime: string;
  timesCompleted: string;
  comments: string;
  lastAction: string;
  views: string;
  hits: string;
  support: number;
  oppose: number;
  status: string;
  seeders: string;
  leechers: string;
  banned: boolean;
  visible: boolean;
};

export type CategoriesItem = {
  id: string;
  createdDate: string;
  lastModifiedDate: string;
  name: string;
  smallDescr: string;
  imdb: string;
  imdbRating: any;
  douban: string;
  doubanRating: any;
  dmmCode: any;
  author: string;
  category: string;
  source: any;
  medium: any;
  standard: any;
  videoCodec: any;
  audioCodec: any;
  team: any;
  processing: any;
  numfiles: string;
  size: string;
  tags: string;
  labels: string;
  msUp: number;
  anonymous: boolean;
  infoHash: any;
  status: CategoriesItemStatus;
  editedBy: any;
  editDate: any;
  collection: boolean;
  inRss: boolean;
  canVote: boolean;
  imageList: string[];
  resetBox: any;
};

export type CategoriesData = {
  data: {
    data: CategoriesItem[];
  };
};
