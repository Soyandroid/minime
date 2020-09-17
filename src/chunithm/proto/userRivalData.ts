import { Crush, readBoolean, writeObject } from "./base";
import { UserRivalDataItem } from "../model/userRivalData";

export type UserRivalDataJson = Crush<UserRivalDataItem>;

export function readUserRivalData(json: UserRivalDataJson): UserRivalDataItem {
  return {
    rivalId: parseInt(json.rivalId),
    rivalName: json.rivalName,
  };
}

export function writeUserRivalData(obj: UserRivalDataItem): UserRivalDataJson {
  return writeObject(obj);
}
