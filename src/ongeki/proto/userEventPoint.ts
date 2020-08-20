import { UserEventPointItem } from "../model/userEventPoint";

export type UserEventPointJson = UserEventPointItem;

export function readUserEventPoint(json: UserEventPointJson): UserEventPointItem {
  return json;
}

export function writeUserEventPoint(obj: UserEventPointItem): UserEventPointJson {
  return obj;
}
