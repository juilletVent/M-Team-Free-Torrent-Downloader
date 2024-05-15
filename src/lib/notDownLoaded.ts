import { existsSync } from "fs";

export function notDownLoaded(id: string, savePath: string): boolean {
  return !existsSync(`${savePath}/${id}.torrent`);
}
