import { UserRatinglogItem } from "../model/userRatinglog";

export type UserRatinglogJson = UserRatinglogItem;

export function readUserRatinglog(json: UserRatinglogJson): UserRatinglogItem {
  return json;
}

export function writeUserRatinglog(obj: UserRatinglogItem): UserRatinglogJson {
  return obj;
}
