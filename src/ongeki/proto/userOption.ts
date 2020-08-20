import { UserOptionItem } from "../model/userOption";

export type UserOptionJson = UserOptionItem;

export function readUserOption(json: UserOptionJson): UserOptionItem {
  return json;
}

export function writeUserOption(obj: UserOptionItem): UserOptionJson {
  return obj;
}
