## `M-Team Free Torrent Downloader`

### 项目简介

`M-Team Free Torrent Downloader` 是一个基于 Nodejs 实现的 M-Team 免费种子下载器，可以帮助用户快速下载 M-Team 网站上的免费种子。

开发目标：自动化下载 M-Team 网站上新鲜发布的免费种子，自动下载到指定位置，配合下载工具实现自动对免费种子的下载。

### 使用方法

1. 安装 Nodejs 环境（自行安装，不低于 14 版本）
2. 安装依赖执行：`npm install` 或者 `yarn install`
3. 修改 config.json 文件，填入关键信息：

```json
{
  // RSS 订阅地址
  "rssURL": "你的RSS地址",
  // 网站ApiToken身份牌
  "token": "你的网站ApiToken",
  // 保存种子文件的目录，绝对路径
  "savePath": "C:\\Users\\Administrator\\Desktop\\A",
  // "savePath": "/usr/local/torrent",
  // 新鲜时间（单位：秒，此处为两小时，两个小时内发布的免费种子，就下载，超过的就不下载，自行修改）
  "freshTime": 7200
}
```

4. 首次编译执行：`npm run build` 或者 `yarn build`
5. 获取命令，执行：`npm run start` 或者 `yarn start`
6. 将 **获取命令** 加入到定时任务中，实现定时刷新
7. 将保存路径添加到下载工具的监控目录中，实现自动下载

Tips：本项目仅供学习交流使用，不得用于恶意用途，更新周期请不要设置的过短，减小对 PT 源站的服务器压力，爱护环境，人人有责。

### License

`M-Team Free Torrent Downloader` is [MIT licensed](./LICENSE).
