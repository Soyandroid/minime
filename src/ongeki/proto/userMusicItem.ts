import { UserMusicItemItem } from "../model/userMusicItem";

export type UserMusicItemJson = UserMusicItemItem;

export function readUserMusicItem(json: UserMusicItemJson): UserMusicItemItem {
  return json;
}

export function writeUserMusicItem(obj: UserMusicItemItem): UserMusicItemJson {
  return obj;
}
