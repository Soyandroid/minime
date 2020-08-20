import { UserChapterItem } from "../model/userChapter";

export type UserChapterJson = UserChapterItem;

export function readUserChapter(json: UserChapterJson): UserChapterItem {
  return json;
}

export function writeUserChapter(obj: UserChapterItem): UserChapterJson {
  return obj;
}
