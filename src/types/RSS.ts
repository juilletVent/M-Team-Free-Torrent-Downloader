export type RSSEnclosure = {
  $: {
    url: string;
    length: string;
    type: string;
  };
};

export type RSSItem = {
  title: string[];
  link: string[];
  description: string[];
  enclosure: any;
  category: any;
  pubDate: any;
  comments: string[];
  "dc:creator": string[];
  "dc:date": string[];
  guid: {
    _: string;
  }[];
};

export type RSSData = {
  rss: {
    channel: {
      title: string;
      link: string;
      description: string;
      item: RSSItem[];
    }[];
  };
};
