import { UserItemItem } from "../model/userItem";

export type UserItemJson = UserItemItem;

export function readUserItem(json: UserItemJson): UserItemItem {
  return json;
}

export function writeUserItem(obj: UserItemItem): UserItemJson {
  return obj;
}
