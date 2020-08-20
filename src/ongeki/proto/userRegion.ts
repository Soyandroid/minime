import { Crush, readDate, writeObject } from "./base";
import { UserRegionItem } from "../model/userRegion";

export interface UserRegionJson {
  regionId: number;
  playCount: number;
  created: string;
}

export function readUserRegion(json: UserRegionJson): UserRegionItem {
  return {
    regionId: json.regionId,
    playCount: json.playCount,
    created: readDate(json.created)!,
  };
}

export function writeUserRegion(obj: UserRegionItem): Crush<UserRegionItem> {
  return writeObject(obj);
}
