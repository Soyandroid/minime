import { UserBpBaseItem } from "../model/userBpBase";

export type UserBpBaseJson = UserBpBaseItem;

export function readUserBpBase(json: UserBpBaseJson): UserBpBaseItem {
  return json;
}

export function writeUserBpBase(obj: UserBpBaseItem): UserBpBaseJson {
  return obj;
}
