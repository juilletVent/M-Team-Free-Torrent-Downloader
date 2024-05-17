export interface DetailInfoStatusI {
  id: string;
  createdDate: string;
  lastModifiedDate: string;
  pickType: string;
  toppingLevel: number;
  toppingEndTime: string;
  discount: string;
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
  visible: true;
}

export interface DetailInfoI {
  id: string;
  createdDate: string;
  lastModifiedDate: string;
  name: string;
  smallDescr: string;
  imdb: string;
  imdbRating: null;
  douban: string;
  doubanRating: null;
  dmmCode: null;
  author: string;
  category: string;
  source: null;
  medium: null;
  standard: null;
  videoCodec: null;
  audioCodec: null;
  team: string;
  processing: null;
  numfiles: string;
  size: string;
  tags: string;
  labels: string;
  msUp: number;
  anonymous: boolean;
  infoHash: null;
  status: DetailInfoStatusI;
  editedBy: string;
  editDate: string;
  collection: boolean;
  inRss: boolean;
  canVote: boolean;
  imageList: null;
  resetBox: string;
  originFileName: string;
  descr: string;
  nfo: null;
  mediainfo: null;
  cids: null;
  aids: null;
  showcaseList: any[];
  tagList: any[];
  thanked: boolean;
  rewarded: boolean;
}

export interface DetailResponse {
  message: string;
  data: DetailInfoI;
  code: number;
}
